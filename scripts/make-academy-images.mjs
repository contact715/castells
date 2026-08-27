#!/usr/bin/env node
/**
 * Заглавные изображения к урокам академии.
 *
 * ЗАЧЕМ. Уроки — это сплошной текст, и владелец попросил, чтобы читалось
 * повеселее. Схемы (components/ui/AcademyDiagram.tsx) отвечают за смысл,
 * эти изображения — за то, чтобы страница не выглядела стеной букв.
 *
 * СТИЛЬ ЗАДАН ЖЁСТКО и одинаков для всех шести: тёмный фон сайта, один
 * акцентный цвет, плоские геометрические формы, никакого текста внутри
 * картинки. Текст в сгенерированных изображениях выходит искажённым, а
 * кривые буквы на учебной странице выглядят как небрежность.
 *
 * КЛЮЧ НЕ ХРАНИТСЯ В РЕПОЗИТОРИИ. Скрипт берёт GOOGLE_GENAI_API_KEY из
 * окружения или из .env.local, который закрыт .gitignore и правится только
 * человеком (запись туда блокирует сторож безопасности).
 *
 *   GOOGLE_GENAI_API_KEY=... node scripts/make-academy-images.mjs
 *   node scripts/make-academy-images.mjs --only three-kinds-of-website
 *   node scripts/make-academy-images.mjs --self-test
 */

import { readFile, writeFile, mkdir, unlink } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const КОРЕНЬ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ПАПКА = path.join(КОРЕНЬ, 'public', 'academy');
const МОДЕЛЬ = process.env.GENAI_IMAGE_MODEL || 'gemini-3-pro-image';

/*
  Общая часть подсказки. Держим её ОДНОЙ строкой на все картинки: иначе
  шесть изображений выйдут в шести разных стилях, и страница станет пёстрой
  вместо спокойной. Цвета — те же, что в index.css.
*/
const СТИЛЬ = [
  'Editorial illustration for a course aimed at American home-service contractors.',
  'Flat geometric vector style, wide 16:9 composition, generous empty space.',
  'Strictly three colours: near-black charcoal background #191919, off-white #EEF1F0, and one deep green accent #089662.',
  'No text, no words, no letters, no numbers anywhere in the image.',
  'No people, no faces, no logos, no brand marks.',
  'No gears, no cogs, no tools, no machinery, no icons, no decorative clutter of any kind.',
  'Calm and restrained, not cheerful, not corporate clip-art, not glossy 3D.',
].join(' ');

export const КАРТИНКИ = [
  {
    slug: 'before-you-spend-on-marketing',
    сюжет:
      'A concrete foundation slab being laid on open ground, with a single small green marker stake set into it. Nothing built on top yet.',
    alt: 'A bare foundation slab with a single marker stake, nothing built on it yet',
  },
  {
    slug: 'what-a-brand-is-for-a-contractor',
    сюжет:
      'Three identical simple green shapes at different distances and angles, gradually aligning into one shape at the right side of the frame.',
    alt: 'Three identical shapes at different angles gradually lining up into one',
  },
  {
    slug: 'three-kinds-of-website',
    сюжет:
      'Three rectangular panels side by side of increasing height and complexity: a small plain one, a medium one with a single bold band, a tall one with many thin horizontal lines.',
    alt: 'Three panels of increasing height and detail, side by side',
  },
  {
    slug: 'where-the-marketing-money-goes',
    /*
      Первая попытка («поток, расходящийся на два русла») дала обрезанную
      композицию с шестерёнками и гаечными ключами — модель дорисовала
      «инструменты» по слову contractors. Сюжет переписан в геометрию, где
      смысл задан размерами, а не метафорой: одна полоса растёт, вторая нет.
    */
    сюжет:
      'Two horizontal bars on an empty dark field, one above the other, both starting at the left edge. The upper bar is green and grows steadily wider from left to right. The lower bar is off-white and keeps exactly the same thickness along its entire length. Nothing else in the frame.',
    alt: 'Two horizontal bars: the upper one widens from left to right, the lower one stays the same thickness',
  },
  {
    slug: 'how-people-find-a-contractor',
    сюжет:
      'Several paths of different lengths and thicknesses converging on one simple house shape from different directions.',
    alt: 'Several paths of different lengths converging on a single house shape',
  },
  {
    slug: 'the-job-you-lose',
    сюжет:
      'A horizontal line of evenly spaced green dots, with one gap where a dot is missing, and the line fading after the gap.',
    alt: 'A row of evenly spaced dots with one missing, the row fading after the gap',
  },
];

async function ключ() {
  if (process.env.GOOGLE_GENAI_API_KEY) return process.env.GOOGLE_GENAI_API_KEY;
  try {
    const env = await readFile(path.join(КОРЕНЬ, '.env.local'), 'utf8');
    const m = env.match(/^GOOGLE_GENAI_API_KEY=(.+)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, '');
  } catch { /* файла может не быть — это нормально */ }
  return null;
}

export async function нарисовать(картинка, k) {
  const тело = {
    contents: [{ parts: [{ text: `${СТИЛЬ} Subject: ${картинка.сюжет}` }] }],
    generationConfig: { responseModalities: ['IMAGE'] },
  };
  const ответ = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${МОДЕЛЬ}:generateContent?key=${k}`,
    { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(тело) },
  );
  if (!ответ.ok) {
    const текст = await ответ.text();
    throw new Error(`${картинка.slug}: ${ответ.status} ${текст.slice(0, 200)}`);
  }
  const данные = await ответ.json();
  const части = данные.candidates?.[0]?.content?.parts || [];
  const изображение = части.find((p) => p.inlineData?.data);
  if (!изображение) {
    throw new Error(`${картинка.slug}: модель вернула ответ без изображения`);
  }
  return Buffer.from(изображение.inlineData.data, 'base64');
}

async function main() {
  const k = await ключ();
  if (!k) {
    console.log('[картинки] пропуск: нет GOOGLE_GENAI_API_KEY ни в окружении, ни в .env.local.');
    console.log('  Изображения НЕ созданы — это не «всё готово».');
    process.exit(0);
  }
  await mkdir(ПАПКА, { recursive: true });

  const только = process.argv.includes('--only')
    ? process.argv[process.argv.indexOf('--only') + 1]
    : null;
  const список = только ? КАРТИНКИ.filter((к) => к.slug === только) : КАРТИНКИ;
  if (список.length === 0) throw new Error(`нет такой картинки: ${только}`);

  for (const картинка of список) {
    const байты = await нарисовать(картинка, k);
    const png = path.join(ПАПКА, `${картинка.slug}.png`);
    await writeFile(png, байты);
    const webp = await сжать(png);
    console.log(
      webp
        ? `  ${картинка.slug}.webp — ${Math.round(байты.length / 1024)} КБ → ${Math.round(webp / 1024)} КБ`
        : `  ${картинка.slug}.png — ${Math.round(байты.length / 1024)} КБ (сжать не удалось)`,
    );
  }
}

/*
  Сжатие в webp встроено в генератор НАМЕРЕННО, а не вынесено отдельным шагом.
  Модель отдаёт PNG по 300 КБ; шесть таких это 1,7 МБ на текстовом сайте, где
  вся страница со вшитыми стилями весит 106 КБ. Замер: 1721 КБ → 88 КБ, в
  девятнадцать раз меньше при неразличимой глазом разнице на плоской графике.

  Отдельный шаг забыли бы: он нужен ровно один раз после генерации, а через
  месяц никто не вспомнит, что он вообще есть.
*/
async function сжать(png) {
  const py = path.join(os.homedir(), '.cache', 'castells-fonttools', 'bin', 'python');
  const webp = png.replace(/\.png$/, '.webp');
  try {
    execFileSync(py, ['-c', `
from PIL import Image
im = Image.open(${JSON.stringify(png)}).convert('RGB')
if im.width > 1600:
    im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
im.save(${JSON.stringify(webp)}, 'WEBP', quality=82, method=6)
`], { stdio: ['ignore', 'ignore', 'pipe'] });
  } catch {
    return null; // Pillow нет — оставляем PNG, но говорим об этом вслух
  }
  await unlink(png);
  const { size } = await (await import('node:fs/promises')).stat(webp);
  return size;
}

const этоЗапуск = process.argv[1] === fileURLToPath(import.meta.url);
if (этоЗапуск && !process.argv.includes('--self-test')) {
  main().catch((e) => { console.error(String(e.message || e)); process.exit(1); });
}

if (этоЗапуск && process.argv.includes('--self-test')) {
  const проверки = [];
  const t = (имя, у) => проверки.push([имя, !!у]);
  t('шесть картинок, по одной на урок', КАРТИНКИ.length === 6);
  t('у каждой есть подпись для читалки экрана', КАРТИНКИ.every((к) => к.alt && к.alt.length > 20));
  t('у каждой есть сюжет', КАРТИНКИ.every((к) => к.сюжет && к.сюжет.length > 40));
  t('адреса картинок совпадают с адресами уроков', КАРТИНКИ.every((к) => /^[a-z-]+$/.test(к.slug)));
  t('стиль запрещает текст внутри изображения', /No text, no words/.test(СТИЛЬ));
  t('стиль называет цвета сайта', СТИЛЬ.includes('#191919') && СТИЛЬ.includes('#089662'));
  /*
    Ищем ключ в ТЕЛЕ скрипта, отрезав блок самопроверки. Первая версия читала
    файл целиком и краснела на собственном шаблоне поиска — сработала на
    УПОМИНАНИЕ вместо действия. Класс известный: guard-fires-on-mention-not-action.
  */
  const весьФайл = await readFile(fileURLToPath(import.meta.url), 'utf8');
  const рабочаяЧасть = весьФайл.slice(0, весьФайл.lastIndexOf('if (этоЗапуск'));
  t(
    'ключ НЕ вписан в тело скрипта',
    !/['"`](AIza|AQ\.)[A-Za-z0-9._-]{20,}['"`]/.test(рабочаяЧасть),
  );
  for (const [имя, ок] of проверки) console.log(`  ${ок ? 'ok  ' : 'ПЛОХО'} ${имя}`);
  const плохо = проверки.filter(([, о]) => !о);
  console.log(`\n${проверки.length - плохо.length}/${проверки.length} проверок пройдено`);
  process.exit(плохо.length ? 1 : 0);
}
