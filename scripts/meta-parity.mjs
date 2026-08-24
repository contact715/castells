#!/usr/bin/env node
/**
 * meta-parity — сверяет ГОЛОВУ, которую посчитает браузер, с той, что лежит
 * в готовом HTML. Заголовок вкладки, описание и канонический адрес.
 *
 * ЗАЧЕМ. У сайта две стороны, и обе объявляют одно и то же. Генератор
 * статических страниц кладёт теги в HTML для каждого из 75 адресов; браузер
 * при переходе внутри сайта пересчитывает их сам. Если стороны разойдутся,
 * человек увидит одно, а робот другое — тот же класс дефекта, что 24 августа
 * дал три разных меню на одном сайте и отключённый компонент SEO, который
 * перебивал верные теги своими устаревшими.
 *
 * Разойтись им нечем ровно до тех пор, пока шаблоны общие: TITLE и
 * DESCRIPTION живут в scripts/page-meta.mjs, и читают их обе стороны. Этот
 * прибор доказывает, что так и есть, а не предполагает.
 *
 * ПОЧЕМУ НЕ В КАЖДОЙ СБОРКЕ. Чтобы посчитать сторону браузера, надо собрать
 * TypeScript, а собирается он через esbuild, которого в зависимостях нет.
 * Ставить сборщик ради одной проверки дорого, поэтому прибор запускается по
 * требованию (npm run check:meta), а в сборке стоит его дешёвая половина:
 * самопроверка генератора следит, чтобы шаблоны не расползлись обратно по
 * коду. Дешёвая ловит вероятную поломку, эта — доказывает совпадение.
 *
 * Запуск:
 *   npm run check:meta
 *   node scripts/meta-parity.mjs <папка dist>
 *
 * Разэкранирование обязательно: HTML пишет амперсанд как &amp;, а браузер
 * при разборе возвращает его обратно. Сравнивать надо то, что ВИДИТ браузер,
 * а не байты файла. Первая версия этого не делала и показала девять ложных
 * расхождений подряд — все на нишах, в названии которых есть амперсанд.
 */
// Сверка: то, что посчитает браузер при переходе, против того, что лежит в
// готовом HTML. Расхождение здесь означает, что человек увидит одно, а робот
// другое — ровно тот дефект, который чинили 24 августа в другом месте.
import { readFile, readdir, mkdtemp, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import path from 'node:path';

const КОРЕНЬ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = process.argv[2] ? path.resolve(process.argv[2]) : path.join(КОРЕНЬ, 'dist');

/**
 * Собирает сторону браузера в модуль, который можно позвать из Node.
 * Отсутствие сборщика — НЕ провал: прибор говорит об этом вслух и выходит с
 * нулём. Гейт, который валится из-за отсутствия инструмента, снимают целиком,
 * и тогда он не защищает вообще ничего.
 */
async function собратьСторонуБраузера() {
  const врем = await mkdtemp(path.join(os.tmpdir(), 'meta-parity-'));
  const файл = path.join(врем, 'bundle.mjs');
  try {
    execFileSync('npx', ['--no-install', 'esbuild', path.join(КОРЕНЬ, 'lib/pageMeta.ts'),
      '--bundle', '--format=esm', '--platform=node', `--outfile=${файл}`, '--log-level=error'],
      { cwd: КОРЕНЬ, stdio: ['ignore', 'ignore', 'pipe'] });
  } catch {
    await rm(врем, { recursive: true, force: true });
    return null;
  }
  const модуль = await import(`file://${файл}`);
  return { metaForPath: модуль.metaForPath, убрать: () => rm(врем, { recursive: true, force: true }) };
}

const собрано = await собратьСторонуБраузера();
if (!собрано) {
  console.log('[meta-parity] пропуск: esbuild недоступен (npx --no-install esbuild).');
  console.log('  Поставить разово: npx esbuild --version');
  console.log('  Сверка НЕ выполнена — это не «всё сошлось».');
  process.exit(0);
}
const { metaForPath, убрать } = собрано;

async function собрать(dir, база = '') {
  const из = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const п = path.join(dir, e.name);
    if (e.isDirectory()) из.push(...await собрать(п, `${база}/${e.name}`));
    else if (e.name === 'index.html') из.push({ путь: база || '/', файл: п });
  }
  return из;
}

// HTML экранирует амперсанд и кавычки; браузер их разэкранирует при разборе.
// Сравнивать надо то, что ВИДИТ браузер, а не байты файла.
const разэкранировать = (t) => t
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&amp;/g, '&');

const страницы = await собрать(DIST);
let сошлось = 0;
const расхождения = [];

for (const { путь, файл } of страницы) {
  const html = await readFile(файл, 'utf8');
  const t = разэкранировать(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '');
  const d = разэкранировать(html.match(/<meta name="description" content="([\s\S]*?)"/)?.[1] ?? '');
  const c = разэкранировать(html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '');
  const наше = metaForPath(путь);
  const бедыСтраницы = [];
  if (наше.title !== t) бедыСтраницы.push(`заголовок:\n      HTML: ${t}\n      браузер: ${наше.title}`);
  if (наше.description !== d) бедыСтраницы.push(`описание:\n      HTML: ${d.slice(0,70)}\n      браузер: ${наше.description.slice(0,70)}`);
  if (наше.canonical !== c) бедыСтраницы.push(`canonical:\n      HTML: ${c}\n      браузер: ${наше.canonical}`);
  if (бедыСтраницы.length) расхождения.push({ путь, бедыСтраницы });
  else сошлось++;
}

await убрать();

console.log(`страниц проверено: ${страницы.length}`);
console.log(`совпало полностью: ${сошлось}`);
console.log(`разошлось: ${расхождения.length}`);
if (страницы.length === 0) {
  console.log('[meta-parity] в dist нет страниц — сначала npm run build');
  process.exit(1);
}
for (const р of расхождения.slice(0, 12)) {
  console.log(`\n  ${р.путь}`);
  for (const б of р.бедыСтраницы) console.log(`    ${б}`);
}
process.exit(расхождения.length ? 1 : 0);
