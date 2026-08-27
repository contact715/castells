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
      'Two very thick horizontal bars that together fill most of the frame height, one directly above the other, both spanning the full width. The upper bar is green and grows steadily thicker from left to right, from thin at the left edge to very thick at the right. The lower bar is off-white and keeps exactly the same thickness along its entire length. Nothing else in the frame.',
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
    /*
      Первая версия была ОДНОЙ тонкой строкой точек: на странице она давала
      полосу, заполненную на треть, и остальное пустотой. Сюжет тот же, но
      строк теперь несколько, и они заполняют кадр по высоте.
    */
    сюжет:
      'Four horizontal rows of large evenly spaced green dots, stacked one under another and together filling the whole frame from top to bottom edge. In every row one dot near the middle is missing, and all dots to the right of that gap get progressively dimmer towards the right edge.',
    alt: 'Four rows of dots, each with one missing near the middle, the dots dimming after the gap',
  },
  {
    slug: 'hvac-what-you-need-before-the-first-call',
    сюжет:
      'A simple bar chart of twelve bars representing a year, drawn in flat green on a dark background. Two bars near the middle are very tall and the rest are short. Nothing else in the frame, no text, no labels.',
    alt: 'Twelve bars for a year, two of them far taller than the rest',
  },
  {
    slug: 'hvac-the-van-is-the-billboard',
    сюжет:
      'A plain green service van seen from the side, parked in a driveway, drawn as a flat simple shape on a dark background. Faint outlines of three houses stand behind it. No text on the van, no logo, no people.',
    alt: 'A service van parked in a driveway with houses behind it',
  },
  {
    slug: 'hvac-what-your-site-must-answer',
    сюжет:
      'A tall phone-shaped rectangle filling most of the frame height, drawn in flat off-white on a dark background, with five green horizontal bars stacked inside it from top to bottom, the top bar widest. Nothing else in the frame, no text.',
    alt: 'A phone shape with five stacked bars inside, the top one widest',
  },
  {
    slug: 'hvac-when-to-spend',
    сюжет:
      'Two smooth green curves across a dark background, both rising and falling twice like waves. One curve peaks slightly before the other. Nothing else in the frame, no axes, no text.',
    alt: 'Two wave curves, one peaking slightly before the other',
  },
  {
    slug: 'hvac-how-they-find-you-in-an-emergency',
    сюжет:
      'A green map pin at the centre of a dark frame with three concentric rings spreading out from it, and a few small flat house shapes sitting on the outer ring. No text, no labels.',
    alt: 'A map pin with rings spreading out and houses on the outer ring',
  },
  {
    slug: 'hvac-maintenance-plans',
    сюжет:
      'A simple green circular arrow forming a closed loop in the centre of a dark frame, with two small flat house shapes on the loop at opposite points. Nothing else in the frame, no text.',
    alt: 'A closed circular loop with two houses on it at opposite points',
  },
  {
    slug: 'remodel-money-before-the-first-swing',
    сюжет:
      'A green line crossing a dark frame from left to right, rising in three steps then dipping well below its starting level in the middle before rising again. Nothing else in the frame, no axes, no text.',
    alt: 'A stepped line that dips below its start in the middle before rising again',
  },
  {
    slug: 'remodel-the-jobsite-is-the-showroom',
    сюжет:
      'One flat green house shape open on the front like a doll house, standing among four plain off-white outline houses on a dark background. No text, no people.',
    alt: 'One open house among four closed ones',
  },
  {
    slug: 'remodel-portfolio-is-the-site',
    сюжет:
      'Two large flat rectangles side by side filling the frame on a dark background, the left one plain off-white and the right one green with a few simple internal lines. No text, no labels.',
    alt: 'Two panels side by side, one plain and one detailed',
  },
  {
    slug: 'remodel-the-long-sales-cycle',
    сюжет:
      'A long green horizontal arrow spanning the full width of a dark frame, with four small off-white dots spaced far apart along it, the gaps between them growing wider towards the right. No text.',
    alt: 'A long arrow with four dots spaced increasingly far apart',
  },
  {
    slug: 'remodel-where-they-look',
    сюжет:
      'Five green lines of different lengths entering a dark frame from the left edge and converging on a single flat off-white house shape at the right. No text, no labels.',
    alt: 'Five lines of different lengths converging on one house',
  },
  {
    slug: 'remodel-the-estimate-is-a-document',
    сюжет:
      'Two flat document shapes side by side on a dark background. The left one is off-white and almost empty with a single short green line on it. The right one is off-white and filled with many green horizontal lines from top to bottom. No text.',
    alt: 'Two documents, one nearly empty and one filled with lines',
  },
  {
    slug: 'pro-what-you-are-actually-selling',
    сюжет:
      'A flat off-white closed box shape filling the centre of a dark frame, with a green question mark shape beside it, both simple and geometric. No text besides the question mark shape itself.',
    alt: 'A closed box beside a question mark',
  },

  {
    slug: 'pro-trust-is-the-brand',
    сюжет:
      'Five identical flat green document or card shapes lined up in a row across a dark frame, all perfectly aligned except one which is slightly rotated and off the line. No text.',
    alt: 'Five aligned cards with one slightly out of line',
  },

  {
    slug: 'pro-the-site-answers-the-worry',
    сюжет:
      'A tall off-white page shape filling most of the frame height on a dark background, with one thick green band across its upper third and thin green lines below it. No text.',
    alt: 'A page with one thick band near the top and thin lines below',
  },

  {
    slug: 'pro-marketing-inside-the-rules',
    сюжет:
      'A flat green shape filling the centre of a dark frame, contained inside a plain off-white rectangular outline that fits it closely on all sides. No text.',
    alt: 'A shape held closely inside a rectangular boundary',
  },

  {
    slug: 'pro-where-clients-come-from',
    сюжет:
      'Three flat green arrows of very different thickness pointing at a single small off-white circle at the right of a dark frame, the thickest arrow entering from the top. No text.',
    alt: 'Three arrows of different thickness pointing at one circle',
  },

  {
    slug: 'pro-the-first-response-is-the-service',
    сюжет:
      'Three flat green horizontal bars stacked on a dark background, each shorter than the one above it, with a clear gap between the first and the second. No text.',
    alt: 'Three bars of decreasing length with a gap after the first',
  },
  {
    slug: 'gtm-seven-questions',
    сюжет:
      'Seven flat green squares of equal size in a single row across a dark frame, each one slightly larger than the previous from left to right. No text, no numbers.',
    alt: 'Seven squares in a row, each slightly larger than the last',
  },
  {
    slug: 'gtm-hvac-two-businesses',
    сюжет:
      'Two flat green house shapes side by side on a dark background, the left one with a small flame shape inside and the right one with a small snowflake shape inside. No text.',
    alt: 'Two houses side by side, one with a flame and one with a snowflake',
  },
  {
    slug: 'gtm-remodel-two-streams',
    сюжет:
      'Two green streams flowing from opposite top corners of a dark frame and joining into one wider stream at the bottom centre. Flat shapes, no text.',
    alt: 'Two streams from opposite corners joining into one',
  },
  {
    slug: 'gtm-auto-who-you-are-for',
    сюжет:
      'Two flat car shapes on a dark background, the left one large and green with fine detail lines, the right one small and plain off-white. No text.',
    alt: 'Two cars, one large and detailed and one small and plain',
  },
  {
    slug: 'gtm-pro-positioning-inside-the-rules',
    сюжет:
      'A small flat green circle placed precisely inside a much larger plain off-white circular outline on a dark background, the small circle off to one side rather than centred. No text.',
    alt: 'A small circle placed off-centre inside a much larger outline',
  },
  {
    slug: 'automation-what-to-automate-first',
    сюжет:
      'A green funnel shape on a dark background with several small off-white dots falling into its wide top, and a few dots escaping through small gaps in its sides. Flat shapes, no text.',
    alt: 'A funnel with dots falling in and a few escaping through gaps in its sides',
  },
  {
    slug: 'automation-hvac-after-hours',
    сюжет:
      'A dark frame split into a light left half and a very dark right half, with a small green phone shape sitting in the dark half. Flat simple shapes, no text.',
    alt: 'A frame split into day and night, with a phone in the dark half',
  },
  {
    slug: 'automation-remodel-the-long-follow-up',
    сюжет:
      'A long horizontal green line across a dark frame with five small off-white vertical marks along it at widening intervals. Flat shapes, no text, no labels.',
    alt: 'A long line with five marks along it at widening intervals',
  },
  {
    slug: 'automation-auto-booking-and-return',
    сюжет:
      'A green calendar grid filling the centre of a dark frame with two of its squares marked by small off-white circles far apart from each other. Flat shapes, no text or numbers.',
    alt: 'A calendar grid with two squares marked far apart',
  },
  {
    slug: 'automation-pro-intake-and-privacy',
    сюжет:
      'A flat green envelope shape at the centre of a dark frame, enclosed by a plain off-white circular outline that surrounds it completely. No text.',
    alt: 'An envelope enclosed inside a protective circle',
  },
  {
    slug: 'track-contractors',
    сюжет:
      'A wide construction scene spanning the full frame from the left edge to the right edge: three house frames of bare structural beams at different stages of completion, standing side by side on one flat ground line. All subject matter sits in the central horizontal band of the frame, nothing important near the top or bottom edge. No text, no people.',
    alt: 'Three bare house frames at different stages, side by side',
  },
  {
    slug: 'track-hvac',
    сюжет:
      'A wide scene spanning the full frame from the left edge to the right edge: a row of four outdoor air conditioning condenser units of equal size standing side by side on one flat ground line, each with a circular fan grille on its front. All subject matter sits in the central horizontal band, nothing important near the top or bottom edge. No text.',
    alt: 'A row of four outdoor air conditioning units side by side',
  },
  {
    slug: 'track-remodeling',
    сюжет:
      'A wide interior elevation spanning the full frame from the left edge to the right edge: the left third is bare wall studs, the middle third is partly finished, the right third is a completed fitted kitchen with cabinets and a counter. All subject matter sits in the central horizontal band, nothing important near the top or bottom edge. No text.',
    alt: 'A wall shown in three stages across the frame, from bare studs to finished kitchen',
  },
  {
    slug: 'track-automotive',
    сюжет:
      'A wide workshop scene spanning the full frame from the left edge to the right edge: three cars seen from the side, evenly spaced in a row inside a service bay, standing on one flat floor line. All subject matter sits in the central horizontal band, nothing important near the top or bottom edge. No text, no people.',
    alt: 'Three cars in a row inside a service bay',
  },
  {
    slug: 'track-professional',
    сюжет:
      'A wide street scene spanning the full frame from the left edge to the right edge: five small office and clinic storefronts standing side by side along one pavement line, each with a plain rectangular sign board above its door and a window beside it. All subject matter sits in the central horizontal band, nothing important near the top or bottom edge. No text, no lettering on the signs, no people.',
    alt: 'A row of five small office and clinic storefronts along a street',
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
