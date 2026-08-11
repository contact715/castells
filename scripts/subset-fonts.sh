#!/usr/bin/env bash
# Пересборка шрифтов: обрезает их до символов, которые реально нужны сайту.
#
# Зачем: полные файлы содержат сотни знаков для языков, которых на сайте нет.
# Newsreader курсив весил 63 КБ ради двух слов «local markets» и был самым
# длинным звеном критической цепочки (1192 мс в замере PageSpeed).
#
# Когда запускать: если на сайте появился новый язык, новые символы или курсив
# другого начертания. Обычные правки текста на английском пересборки не требуют.
#
# Что нужно: python3. Скрипт сам поставит fonttools в отдельное окружение.
#
# Проверка после запуска: открыть сайт и убедиться, что нет «квадратиков»
# вместо букв. Список символов сайта можно снять так (в консоли браузера):
#   new Set(document.body.innerText).size
set -euo pipefail

cd "$(dirname "$0")/.."
ENV_DIR="${TMPDIR:-/tmp}/castells-fontenv"

# Набор символов: базовая латиница плюс типографика, которая встречается
# в текстах (кавычки, тире, многоточие, стрелка, знак градуса, буллит).
UNICODES="U+0020-007E,U+00A0,U+2018,U+2019,U+201C,U+201D,U+2013,U+2014,U+2026,U+00A9,U+00AE,U+2122,U+2192,U+00B0,U+2022"
FEATURES='kern,liga,clig,calt'

if [ ! -x "$ENV_DIR/bin/pyftsubset" ]; then
  echo "ставлю fonttools в $ENV_DIR"
  python3 -m venv "$ENV_DIR"
  "$ENV_DIR/bin/pip" install --quiet "fonttools[woff]" brotli
fi

# ИСХОДНИКИ: положите сюда полные файлы шрифтов перед пересборкой.
# Newsreader — Google Fonts (Open Font License), Manrope — Google Fonts (OFL).
SRC="${1:-}"
if [ -z "$SRC" ]; then
  echo "использование: scripts/subset-fonts.sh <папка-с-полными-woff2>"
  echo "ожидаются файлы: newsreader-variable.woff2, newsreader-variable-italic.woff2, manrope-variable.woff2"
  exit 1
fi

echo "обрезаю обычные начертания (веса сохраняются переменными)"
for name in newsreader-variable manrope-variable; do
  "$ENV_DIR/bin/pyftsubset" "$SRC/$name.woff2" \
    --output-file="public/fonts/$name.woff2" \
    --flavor=woff2 --layout-features="$FEATURES" \
    --unicodes="$UNICODES" --no-hinting --desubroutinize
  printf "  %-22s %6.1f КБ\n" "$name" "$(stat -f%z "public/fonts/$name.woff2" | awk '{print $1/1024}')"
done

echo "обрезаю курсив и фиксирую вес 600 (единственный курсив на сайте — полужирный)"
"$ENV_DIR/bin/python" - "$SRC/newsreader-variable-italic.woff2" <<'PY'
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
f = TTFont(sys.argv[1])
inst = instancer.instantiateVariableFont(f, {'wght': 600}, inplace=False, updateFontNames=False)
inst.flavor = 'woff2'
inst.save('/tmp/_italic_w600.woff2')
PY
"$ENV_DIR/bin/pyftsubset" /tmp/_italic_w600.woff2 \
  --output-file=public/fonts/newsreader-italic.woff2 \
  --flavor=woff2 --layout-features="$FEATURES" \
  --unicodes="$UNICODES" --no-hinting --desubroutinize
printf "  %-22s %6.1f КБ\n" "newsreader-italic" "$(stat -f%z public/fonts/newsreader-italic.woff2 | awk '{print $1/1024}')"

echo "готово. Проверьте сайт на отсутствие «квадратиков» вместо букв."
