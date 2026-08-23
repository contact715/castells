/**
 * Делает сайт видимым для роботов и мессенджеров, не переписывая его.
 *
 * Что было: один HTML на все ~81 адрес. Один заголовок «Castells Media |
 * Dominate Your Market» на весь сайт, ноль тегов превью, ноль текста —
 * сервер отдавал роботу 42 символа. Любой несуществующий адрес отвечал 200.
 * Карта сайта вела на castells.studio, а этот домен отдаёт 404 целиком.
 *
 * Что делает скрипт после сборки:
 *   1. Для каждого известного адреса кладёт свой index.html — со своим
 *      заголовком, описанием, каноническим адресом и тегами превью.
 *   2. Внутрь <div id="root"> вкладывает короткий честный текст страницы:
 *      H1 и пару абзацев. Робот и мессенджер видят их сразу, React стирает
 *      их при запуске и рисует настоящую страницу.
 *   3. Кладёт 404.html — теперь несуществующий адрес отвечает 404.
 *   4. Пересобирает sitemap.xml из фактического списка страниц.
 *   5. Чинит robots.txt: карта сайта на живом домене.
 *
 * Проверка себя: node scripts/prerender-pages.mjs --self-test
 */

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE, PAGES, NOT_FOUND } from './page-meta.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const escape = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Читает CASE_STUDIES прямо из constants.ts — второй список данных
 * неизбежно разъедется с первым.
 *
 * Импортировать файл целиком нельзя: рядом лежат SERVICES с иконками
 * lucide-react, то есть React-компонентами, которым в сборочном скрипте
 * делать нечего. Поэтому вырезаем ровно один массив — это чистые данные,
 * без импортов и без вычислений.
 */
async function readCaseStudies() {
  const source = await readFile(path.join(ROOT, 'constants.ts'), 'utf8');
  const marker = /export const CASE_STUDIES[^=]*=\s*/;
  const m = source.match(marker);
  if (!m) throw new Error('в constants.ts не найден CASE_STUDIES');

  const from = m.index + m[0].length;
  const rest = source.slice(from);
  const endIdx = rest.indexOf('\n];');
  if (endIdx === -1) throw new Error('не найден конец массива CASE_STUDIES');

  const literal = rest.slice(0, endIdx + 2); // включая закрывающую скобку
  return new Function(`return ${literal}`)();
}

/** Страницы кейсов: имя клиента, ниша и город — всё из карточки, ничего придуманного. */
function caseStudyPages(caseStudies) {
  return caseStudies.map((cs) => {
    const where = [cs.industry, cs.location].filter(Boolean).join(', ');
    return {
      path: `/case-studies/${cs.id}`,
      title: `${cs.client} — ${cs.industry} | Castells Media`,
      description: cs.description || `${cs.client}: ${where}.`,
      h1: cs.client,
      intro: `${where}${cs.year ? `, ${cs.year}` : ''}.`,
      body: [
        cs.description,
        cs.services?.length ? `What we did: ${cs.services.join(', ')}.` : null,
        cs.website ? `Their site: ${cs.website}` : null,
        cs.testimonial?.quote ? `${cs.testimonial.author}, ${cs.testimonial.role}: "${cs.testimonial.quote}"` : null,
      ].filter(Boolean),
    };
  });
}

/** Голова страницы: то, что читают Google, ChatGPT и WhatsApp. */
function buildHead(page) {
  const url = `${SITE.origin}${page.path === '/' ? '/' : page.path}`;
  const image = `${SITE.origin}${SITE.ogImage}`;
  const robots = page.noindex ? 'noindex, follow' : 'index, follow';

  return `    <title>${escape(page.title)}</title>
    <meta name="description" content="${escape(page.description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escape(SITE.name)}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(page.title)}" />
    <meta name="twitter:description" content="${escape(page.description)}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="geo.region" content="US-CA" />
    <meta name="geo.placename" content="${escape(SITE.city)}" />`;
}

/**
 * Тело, которое видит робот до запуска скриптов. React стирает его при
 * монтировании, поэтому текст обязан совпадать с тем, что человек увидит
 * на настоящей странице — иначе это подмена содержимого для поисковика.
 */
function buildBody(page) {
  const paragraphs = [page.intro, ...(page.body ?? [])]
    .filter(Boolean)
    .map((p) => `      <p>${escape(p)}</p>`)
    .join('\n');

  return `    <div id="prerendered-content">
      <h1>${escape(page.h1)}</h1>
${paragraphs}
      <nav aria-label="Main">
        <a href="/">Home</a>
        <a href="/work">Work</a>
        <a href="/services">Services</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
      <address>${escape(SITE.legalName)}, ${escape(SITE.city)}</address>
    </div>`;
}

/** Вставляет голову и тело в шаблон сборки. */
export function renderPage(template, page) {
  let html = template;

  // Заголовок и описание из шаблона убираем: у страницы теперь свои
  html = html.replace(/\n?\s*<title>[\s\S]*?<\/title>/i, '');
  html = html.replace(/\n?\s*<meta\s+name="description"[^>]*>/i, '');

  html = html.replace('</head>', `${buildHead(page)}\n  </head>`);
  html = html.replace(
    /(<div id="root">)(\s*)(<\/div>)/,
    (_m, open, _ws, close) => `${open}\n${buildBody(page)}\n    ${close}`
  );

  return html;
}

function buildSitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((p) => !p.noindex)
    .map((p) => {
      const loc = `${SITE.origin}${p.path === '/' ? '/' : p.path}`;
      const priority = p.path === '/' ? '1.0' : p.path.split('/').length > 2 ? '0.6' : '0.8';
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  if (!existsSync(path.join(DIST, 'index.html'))) {
    console.error('prerender: нет dist/index.html — сначала сборка');
    process.exit(1);
  }

  const template = await readFile(path.join(DIST, 'index.html'), 'utf8');
  const caseStudies = await readCaseStudies();
  const allPages = [...PAGES, ...caseStudyPages(caseStudies)];

  let written = 0;
  for (const page of allPages) {
    if (page.staticFile) continue; // у страницы уже есть свой готовый файл
    const html = renderPage(template, page);
    const dir = page.path === '/' ? DIST : path.join(DIST, page.path);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), html);
    written += 1;
  }

  // Страница, которой нет. Vercel отдаёт её с кодом 404.
  await writeFile(path.join(DIST, '404.html'), renderPage(template, NOT_FOUND));

  await writeFile(path.join(DIST, 'sitemap.xml'), buildSitemap(allPages));
  await writeFile(
    path.join(DIST, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE.origin}/sitemap.xml\n`
  );

  console.log(`prerender: страниц с собственными тегами — ${written}`);
  console.log(`  из них кейсов — ${caseStudies.length}`);
  console.log(`  404.html, sitemap.xml (${allPages.filter((p) => !p.noindex).length} адресов) и robots.txt пересобраны`);
}

/* --- самопроверка: гоняется без сборки и ничего не пишет в dist --- */
async function selfTest() {
  const checks = [];
  const t = (name, fn) => {
    try {
      const ok = fn();
      checks.push([name, ok === true]);
    } catch (e) {
      checks.push([`${name} (${e.message})`, false]);
    }
  };

  const template =
    '<!DOCTYPE html><html><head><meta name="description" content="old" /><title>Old</title></head><body><div id="root"></div></body></html>';
  const page = PAGES[0];
  const out = renderPage(template, page);

  t('старый заголовок убран', () => !out.includes('<title>Old</title>'));
  t('старое описание убрано', () => !out.includes('content="old"'));
  t('свой заголовок на месте', () => out.includes(`<title>${page.title}</title>`));
  t('канонический адрес на живом домене', () => out.includes(`<link rel="canonical" href="${SITE.origin}/"`));
  t('адрес превью абсолютный', () => out.includes(`og:image" content="${SITE.origin}${SITE.ogImage}"`));
  t('H1 попал в тело', () => out.includes(`<h1>${page.h1}</h1>`));
  t('текст попал в тело', () => out.includes(page.intro.slice(0, 30)));
  t('юрлицо названо', () => out.includes(SITE.legalName));
  t('корень остаётся пустым для React', () => /<div id="root">[\s\S]*<\/div>/.test(out));

  const noindexPage = PAGES.find((p) => p.noindex);
  t('служебные страницы закрыты от поиска', () =>
    renderPage(template, noindexPage).includes('content="noindex, follow"'));

  const sitemap = buildSitemap(PAGES);
  t('карта сайта на живом домене', () => sitemap.includes(`${SITE.origin}/work`));
  t('закрытые страницы не в карте', () => !sitemap.includes('/lead-form/thank-you'));
  t('в карте нет мёртвого домена', () => !sitemap.includes('castells.studio'));
  t('кавычки экранируются', () => !renderPage(template, {
    ...page, title: 'a "b" c', description: 'd', h1: 'e', intro: 'f',
  }).includes('content="a "b" c"'));
  t('у каждой страницы уникальный адрес', () => new Set(PAGES.map((p) => p.path)).size === PAGES.length);
  t('у каждой страницы есть заголовок и описание', () =>
    PAGES.every((p) => p.title?.length > 10 && p.description?.length > 30));
  t('заголовки не длиннее 70 знаков', () => PAGES.every((p) => p.title.length <= 70));
  t('описания не длиннее 165 знаков', () => PAGES.every((p) => p.description.length <= 165));

  const failed = checks.filter(([, ok]) => !ok);
  for (const [name, ok] of checks) console.log(`${ok ? '  ok' : 'FAIL'}  ${name}`);
  console.log(`\n${checks.length - failed.length}/${checks.length} проверок пройдено`);
  process.exit(failed.length ? 1 : 0);
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  if (process.argv.includes('--self-test')) await selfTest();
  else await main();
}
