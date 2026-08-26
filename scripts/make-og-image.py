#!/usr/bin/env python3
"""
Картинка, которую показывают соцсети и мессенджеры при отправке ссылки.

ЗАЧЕМ ПЕРЕДЕЛЫВАЛОСЬ 26 августа 2026. Прежняя была нарисована при старом
акцентном цвете: слова «service businesses» на ней кораллово-розовые, а сайт
с 24 августа зелёный. Ссылка на сайт выглядела как ссылка на чужой сайт.
Вдобавок нижняя половина пустовала — текст жался к верхнему краю.

ПОЧЕМУ СКРИПТ, А НЕ ОДИН PNG В ПАПКЕ. Картинка повторяет главный экран сайта,
то есть у неё есть источник правды: заголовок, цвета и шрифты. Пока она
рисуется руками, она снова разъедется с сайтом при следующей смене цвета — и
никто этого не заметит, потому что видна она только снаружи, в чужой ленте.
Шрифты берутся ТЕ ЖЕ, что на сайте, из public/fonts.

Запуск:  python3 scripts/make-og-image.py
Проверка: python3 scripts/make-og-image.py --self-test
"""

import os
import subprocess
import sys
import tempfile
from pathlib import Path

# ── самоподъём окружения ──────────────────────────────────────────────────
# Pillow и fontTools не входят в системный python и ставить их туда нельзя.
# Скрипт сам заводит себе окружение и перезапускается в нём — по образцу
# соседнего scripts/subset-fonts.sh. Папка постоянная, а не временная:
# у соседа она в TMPDIR и вычищается системой, из-за чего он переставляет
# библиотеки на каждом запуске.
_ОКРУЖЕНИЕ = Path.home() / ".cache" / "castells-fonttools"
_PY = _ОКРУЖЕНИЕ / "bin" / "python"

if not os.environ.get("OG_IMAGE_В_ОКРУЖЕНИИ"):
    try:
        import PIL  # noqa: F401
        import fontTools  # noqa: F401
    except ImportError:
        if not _PY.exists():
            print(f"ставлю Pillow и fonttools в {_ОКРУЖЕНИЕ}")
            subprocess.run([sys.executable, "-m", "venv", str(_ОКРУЖЕНИЕ)], check=True)
            subprocess.run([str(_ОКРУЖЕНИЕ / "bin" / "pip"), "install", "--quiet",
                            "fonttools[woff]", "brotli", "Pillow"], check=True)
        среда = {**os.environ, "OG_IMAGE_В_ОКРУЖЕНИИ": "1"}
        sys.exit(subprocess.run([str(_PY), __file__, *sys.argv[1:]], env=среда).returncode)

from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

КОРЕНЬ = Path(__file__).resolve().parent.parent
ШРИФТЫ = КОРЕНЬ / "public" / "fonts"
ВЫХОД = КОРЕНЬ / "public" / "og-image.png"

# Размер, который ждут соцсети. Меньше — размывает, больше — режут края.
ШИРИНА, ВЫСОТА = 1200, 630

# Цвета берутся из index.css, блок @theme. Тёмная тема: сайт при отправке
# ссылки чаще открывают с телефона, а там тёмная чаще включена.
ФОН = (25, 25, 25)
БЕЛЫЙ = (255, 255, 255)
АКЦЕНТ = (8, 150, 98)      # --color-accent, на тёмном даёт 4.65 — проходит
ПРИГЛУШЁННЫЙ = (150, 150, 150)

ПОЛЕ = 72


def распаковать(имя: str, вес: int | None, папка: Path) -> Path:
    """
    woff2 Pillow не читает, поэтому распаковываем в ttf. У переменных шрифтов
    заодно закрепляем нужную насыщенность: без этого берётся значение по
    умолчанию, а оно у Literata тоньше, чем на сайте.
    """
    ttf = TTFont(ШРИФТЫ / имя)
    if вес is not None and "fvar" in ttf:
        оси = {a.axisTag for a in ttf["fvar"].axes}
        закрепить = {}
        if "wght" in оси:
            закрепить["wght"] = вес
        if "opsz" in оси:
            закрепить["opsz"] = 36  # оптический размер под крупный заголовок
        if закрепить:
            ttf = instancer.instantiateVariableFont(ttf, закрепить)
    путь = папка / (имя.replace(".woff2", "") + ".ttf")
    ttf.flavor = None
    ttf.save(путь)
    return путь


def нарисовать(выход: Path = ВЫХОД) -> Path:
    with tempfile.TemporaryDirectory() as врем:
        п = Path(врем)
        заголовок = ImageFont.truetype(str(распаковать("literata-variable.woff2", 600, п)), 76)
        курсив = ImageFont.truetype(str(распаковать("literata-italic.woff2", 600, п)), 76)
        подпись = ImageFont.truetype(str(распаковать("figtree-variable.woff2", 400, п)), 28)
        мелкий = ImageFont.truetype(str(распаковать("figtree-variable.woff2", 500, п)), 24)

        холст = Image.new("RGB", (ШИРИНА, ВЫСОТА), ФОН)
        рис = ImageDraw.Draw(холст)

        # Заголовок повторяет первый экран сайта, включая курсивную вторую
        # строку акцентным цветом — так ссылка узнаётся до перехода.
        строки = [
            ("Marketing for", заголовок, БЕЛЫЙ),
            ("home service", курсив, АКЦЕНТ),
            ("businesses", курсив, АКЦЕНТ),
        ]
        межстрочный = 92
        блок = межстрочный * len(строки)

        # Блок ставим по вертикальной оси, а не к верхнему краю: у прежней
        # картинки нижняя половина пустовала и она читалась как обрезанная.
        верх = (ВЫСОТА - блок) // 2 - 40
        for i, (текст, шрифт, цвет) in enumerate(строки):
            рис.text((ПОЛЕ, верх + i * межстрочный), текст, font=шрифт, fill=цвет)

        # Разделитель — запятая, а не средняя точка. Средней точки НЕТ в наших
        # шрифтах: они урезаны до 108 символов ради веса, и U+00B7 в набор не
        # попал. На сайте она поэтому рисуется системным шрифтом-заменителем,
        # а здесь рисовать нечем — вышла бы дыра. Проверено по таблице шрифта.
        низ = верх + блок + 46
        рис.text((ПОЛЕ, низ), "Castells Media, Roseville, California", font=подпись, fill=ПРИГЛУШЁННЫЙ)

        # Полоса акцентного цвета у нижнего края: заполняет пустоту и держит
        # композицию, ничего при этом не утверждая.
        рис.rectangle([0, ВЫСОТА - 8, ШИРИНА, ВЫСОТА], fill=АКЦЕНТ)
        рис.text((ПОЛЕ, ВЫСОТА - 8 - 46), "www.castells.media", font=мелкий, fill=ПРИГЛУШЁННЫЙ)

        холст.save(выход, "PNG", optimize=True)
    return выход


def самопроверка() -> int:
    проверки = []

    def t(имя, условие):
        проверки.append((имя, bool(условие)))

    for имя in ("literata-variable.woff2", "literata-italic.woff2", "figtree-variable.woff2"):
        t(f"шрифт сайта на месте: {имя}", (ШРИФТЫ / имя).exists())

    with tempfile.TemporaryDirectory() as врем:
        путь = нарисовать(Path(врем) / "og.png")
        t("файл создан", путь.exists())
        img = Image.open(путь)
        t("размер 1200x630, как ждут соцсети", img.size == (ШИРИНА, ВЫСОТА))
        цвета = {c for _, c in img.convert("RGB").getcolors(maxcolors=1_000_000)}

        def близко(цель, допуск=26):
            return any(sum(abs(a - b) for a, b in zip(цвет, цель)) <= допуск for цвет in цвета)

        t("акцентный цвет сайта присутствует", близко(АКЦЕНТ))
        t("белый текст присутствует", близко(БЕЛЫЙ))
        t("фон тёмный, как у сайта", близко(ФОН))
        # Главное, ради чего всё затевалось: старого кораллового быть не должно
        коралл = (232, 131, 111)
        t("старого кораллового цвета НЕТ", not близко(коралл, допуск=60))
        # Нижняя половина не должна пустовать
        низ = img.crop((0, ВЫСОТА // 2, ШИРИНА, ВЫСОТА)).convert("RGB")
        небазовых = sum(n for n, c in низ.getcolors(maxcolors=1_000_000) if sum(abs(a - b) for a, b in zip(c, ФОН)) > 30)
        t("нижняя половина не пустая", небазовых > 4000)

        # Символы подписи обязаны быть В шрифте: иначе на месте буквы дыра,
        # и заметит её только тот, кто увидит ссылку в чужой ленте.
        from fontTools.ttLib import TTFont as _TT
        набор = set(_TT(ШРИФТЫ / "figtree-variable.woff2").getBestCmap().keys())
        подписи = ["Castells Media, Roseville, California", "www.castells.media"]
        нет = {c for т in подписи for c in т if ord(c) not in набор}
        t(f"все символы подписи есть в шрифте{'' if not нет else ' — нет: ' + repr(нет)}", not нет)

    for имя, ок in проверки:
        print(f"  {'ok  ' if ок else 'ПЛОХО'} {имя}")
    плохо = [и for и, о in проверки if not о]
    print(f"\n{len(проверки) - len(плохо)}/{len(проверки)} проверок пройдено")
    return 1 if плохо else 0


if __name__ == "__main__":
    if "--self-test" in sys.argv:
        sys.exit(самопроверка())
    путь = нарисовать()
    размер = путь.stat().st_size
    print(f"og-image: {путь.relative_to(КОРЕНЬ)} — {ШИРИНА}x{ВЫСОТА}, {размер // 1024} КБ")
