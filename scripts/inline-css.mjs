import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

/*
  Вшивает стили прямо в index.html.

  Зачем: сайт рисуется скриптами, внутри <div id="root"> пусто, поэтому обычные
  инструменты выделения «критических» стилей здесь бесполезны — им не по чему
  считать. При этом браузер не может начать отрисовку, пока не скачает файл
  стилей: сначала HTML, потом запрос за CSS, и только потом первый кадр.
  На медленной сети это лишний круг запроса. PageSpeed оценивал его в 220 мс.

  Вшитые стили убирают этот круг: страница приходит одним куском.
  Плата — стили больше не кэшируются отдельно между визитами. Для сайта, куда
  человек приходит один раз с рекламы, первый заход важнее повторного.
*/

const DIST = process.argv[2] || 'dist';
const htmlPath = path.join(DIST, 'index.html');

if (!fs.existsSync(htmlPath)) {
  console.error(`inline-css: не найден ${htmlPath}`);
  process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf8');
const before = Buffer.byteLength(html);

// Только те таблицы стилей, что лежат у нас и грузятся синхронно.
// Внешние (fontshare) не трогаем: их содержимое нам не принадлежит.
const linkRe = /<link[^>]*rel="stylesheet"[^>]*href="(\/assets\/css\/[^"]+\.css)"[^>]*>/g;

const inlined = [];
html = html.replace(linkRe, (tag, href) => {
  const cssPath = path.join(DIST, href.replace(/^\//, ''));
  if (!fs.existsSync(cssPath)) return tag;
  const css = fs.readFileSync(cssPath, 'utf8');
  inlined.push({ href, kb: (Buffer.byteLength(css) / 1024).toFixed(1) });
  return `<style>${css}</style>`;
});

if (!inlined.length) {
  console.log('inline-css: синхронных таблиц стилей не найдено, менять нечего');
  process.exit(0);
}

fs.writeFileSync(htmlPath, html);

const after = Buffer.byteLength(html);
const gz = (buf) => (zlib.gzipSync(buf).length / 1024).toFixed(1);

console.log('inline-css: вшито таблиц стилей —', inlined.length);
inlined.forEach((i) => console.log(`  ${i.kb} КБ  ${i.href}`));
console.log(`  index.html: ${(before / 1024).toFixed(1)} КБ → ${(after / 1024).toFixed(1)} КБ`);
console.log(`  в сжатом виде: ${gz(Buffer.from(html))} КБ (столько поедет по сети)`);
