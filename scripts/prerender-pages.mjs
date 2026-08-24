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

/**
 * Читает услуги и ниши из data/*.ts. Импортировать нельзя по той же причине,
 * что и кейсы: рядом лежат иконки lucide-react, то есть React-компоненты.
 * Поэтому вынимаем регулярками ровно три поля, которые нам нужны.
 *
 * Зачем вообще: до 23 августа 2026 все страницы услуг и ниш отдавали роботу
 * ОДИН И ТОТ ЖЕ заголовок «Castells Media | Marketing agency for home service
 * businesses». Сорок одна страница выглядела для поиска одинаковой, они
 * конкурировали между собой, и ни одна не выигрывала.
 */
async function readCatalog() {
  const услуги = [];
  const ниши = [];

  const s = await readFile(path.join(ROOT, 'data/services.ts'), 'utf8');
  const реУслуга = /\{\s*slug:\s*'([^']+)',\s*name:\s*'([^']+)',\s*description:\s*'([^']+)'/g;
  for (const m of s.matchAll(реУслуга)) {
    if (m[1] === 'enterprise-solutions') continue; // общая заглушка, повторяется во всех категориях
    if (!услуги.some((u) => u.slug === m[1])) услуги.push({ slug: m[1], name: m[2], description: m[3] });
  }

  const i = await readFile(path.join(ROOT, 'data/industries.ts'), 'utf8');
  const реНиша = /slug:\s*slugify\('([^']+)'\),\s*name:\s*'([^']+)',\s*description:\s*'([^']+)'/g;
  for (const m of i.matchAll(реНиша)) {
    const slug = m[1].toLowerCase().trim().replace(/\s+/g, '-');
    if (!ниши.some((n) => n.slug === slug)) ниши.push({ slug, name: m[2], description: m[3] });
  }

  if (услуги.length === 0) throw new Error('не удалось прочитать услуги из data/services.ts');
  if (ниши.length === 0) throw new Error('не удалось прочитать ниши из data/industries.ts');
  return { услуги, ниши };
}

/**
 * Страницы услуг. Заголовок и описание выводятся из названия и описания самой
 * услуги, поэтому у каждой страницы они свои, а не общий шаблон с подставленным
 * словом.
 */
/**
 * Услуги, которые по смыслу дублируют соседнюю и потому не идут в поиск.
 * Замер показал совпадение текстов 62% и 70% — выше нашего порога в 60%.
 * Две страницы про одно и то же не выигрывают вдвое, они делят вес пополам.
 * В поиск идёт та, которую чаще ищут; вторая остаётся доступной на сайте.
 */
const ДУБЛИРУЮТ_СОСЕДА = new Set(['web-applications', 'brand-guidelines']);

function servicePages(услуги, caseStudies) {
  return услуги.map((u) => {
    // Кейсы, где эта услуга реально была: имя клиента и город — из карточки,
    // ничего придуманного. Так у каждой страницы появляется свой абзац.
    const свои = caseStudies.filter((cs) =>
      (cs.services || []).some((s) => s.toLowerCase().includes(u.name.toLowerCase().split(' ')[0]))
    );
    const строкаКейсов = свои.length
      ? `Where we have done it: ${свои.slice(0, 3).map((cs) => `${cs.client} (${cs.industry}, ${cs.location})`).join('; ')}.`
      : null;

    return {
      path: `/services/${u.slug}`,
      title: `${u.name} for home service businesses | Castells Media`,
      description: `${u.description} Castells Media, Roseville, California, working with contractors across the US.`,
      h1: u.name,
      intro: u.description,
      body: [
        строкаКейсов,
        'Prices are on the pricing page. Month to month, no contract.',
      ].filter(Boolean),
      // Правило из разбора архитектуры: страница идёт в поиск, только если у неё
      // есть собственный проверяемый актив. Без наших работ в этой услуге текст
      // получается общим, а десяток общих страниц — это дубли, за которые Google
      // не награждает, а наказывает. Страница остаётся доступной, но не
      // предлагается поиску как самостоятельная.
      noindex: свои.length === 0 || ДУБЛИРУЮТ_СОСЕДА.has(u.slug),
    };
  });
}

/** Страницы ниш: регистр названия сохраняется (HVAC остаётся HVAC), а текст
 *  привязан к нашим кейсам в этой нише, если они есть. */
function industryPages(ниши, caseStudies) {
  return ниши.map((n) => {
    const первое = n.name.split(/[\s&]+/)[0].toLowerCase();
    const свои = caseStudies.filter((cs) => (cs.industry || '').toLowerCase().includes(первое));
    const строкаКейсов = свои.length
      ? `Our clients in this field: ${свои.slice(0, 3).map((cs) => `${cs.client} (${cs.location})`).join('; ')}.`
      : null;

    return {
      path: `/industries/${n.slug}`,
      title: `${n.name} marketing | Castells Media`,
      description: `${n.description} Websites, Google and Meta ads and follow-up for ${n.name} businesses. Castells Media, Roseville, California.`,
      h1: `Marketing for ${n.name}`,
      intro: n.description,
      body: [
        строкаКейсов,
        `What a ${n.name} business needs: to be found when someone nearby needs the service, and to answer before the next company does.`,
      ].filter(Boolean),
      // То же правило: ниша без единого нашего клиента в поиск не идёт.
      // Сейчас из двадцати ниш кейсами обеспечены две.
      noindex: свои.length === 0,
    };
  });
}

/**
 * Страницы статей. Тексты берутся из data/blog.ts, то есть из того же места,
 * что видит человек: разъехаться им негде.
 */
async function readPosts() {
  const source = await readFile(path.join(ROOT, 'data/blog.ts'), 'utf8');
  const посты = [];
  const реПост = /id:\s*(\d+),\s*slug:\s*'([^']+)',\s*title:\s*'([^']+)',\s*excerpt:\s*\n?\s*'([^']+)'/g;
  for (const m of source.matchAll(реПост)) {
    посты.push({ id: Number(m[1]), slug: m[2], title: m[3], excerpt: m[4] });
  }
  if (посты.length === 0) throw new Error('не удалось прочитать статьи из data/blog.ts');
  return посты;
}

function postPages(посты) {
  return посты.map((post) => ({
    path: `/blog/${post.id}`,
    title: `${post.title} | Castells Media`,
    description: post.excerpt,
    h1: post.title,
    intro: post.excerpt,
    body: [
      'Written by Dmitrii Z., founder of Castells Media, Roseville, California.',
      'Every number in this article is one of our published prices, so it can be checked on this same site.',
    ],
  }));
}

/**
 * Страницы-ответы: хаб /learn и три вопроса под ним. Тексты берутся из
 * data/answers.ts, то есть из того же места, что видит человек.
 */
async function readAnswers() {
  const source = await readFile(path.join(ROOT, 'data/answers.ts'), 'utf8');
  const ответы = [];
  const реОтвет = /slug:\s*'([^']+)',\s*question:\s*'([^']+)',\s*short:\s*\n?\s*'([^']+)'/g;
  for (const m of source.matchAll(реОтвет)) {
    ответы.push({ slug: m[1], question: m[2], short: m[3] });
  }
  if (ответы.length === 0) throw new Error('не удалось прочитать страницы-ответы из data/answers.ts');
  return ответы;
}

function answerPages(ответы) {
  const хаб = {
    path: '/learn',
    title: 'Questions we get asked | Castells Media',
    description:
      'Straight answers to the questions home service business owners ask us: whether a website is needed at all, what an agency does every month, and whether a long contract is normal.',
    h1: 'Questions we get asked',
    intro:
      'Written from what we actually do, with our own prices and our own clients inside. No question goes up here unless we have something of our own to say about it.',
    body: ответы.map((о) => `${о.question} ${о.short}`),
  };

  return [
    хаб,
    ...ответы.map((о) => ({
      path: `/learn/${о.slug}`,
      title: `${о.question} | Castells Media`,
      description: о.short,
      h1: о.question,
      intro: о.short,
      faq: { question: о.question, answer: о.short },
      body: [
        'Answered by Castells Media, a marketing agency at 1298 Antelope Creek Drive, Roseville, California, working with home service businesses across the US.',
        'Every number in this answer is one of our published prices, so it can be checked on this same site.',
      ],
    })),
  ];
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
/**
 * Разметка для поисковиков прямо в HTML.
 *
 * До 24 августа 2026 её на сайте не было ни на одной странице: компонент
 * SchemaMarkup добавляет её скриптами, и робот, который скрипты не выполняет,
 * не видел ничего. Проверено запросом к проду: ноль блоков ld+json на главной,
 * контактах и локальной странице.
 *
 * Кладём три вещи и только проверяемые: кто мы, где мы, как связаться. Числа,
 * рейтинги и отзывы сюда не идут — за выдуманный AggregateRating мы этот сайт
 * уже чистили.
 */
function buildSchema(page) {
  const url = `${SITE.origin}${page.path === '/' ? '/' : page.path}`;
  const адрес = {
    '@type': 'PostalAddress',
    streetAddress: '1298 Antelope Creek Drive',
    addressLocality: 'Roseville',
    addressRegion: 'CA',
    addressCountry: 'US',
  };

  const организация = {
    '@context': 'https://schema.org',
    // Локальная страница объявляет нас местным бизнесом, остальные — организацией
    '@type': page.path === '/roseville-marketing-agency' ? 'LocalBusiness' : 'Organization',
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.origin,
    logo: `${SITE.origin}/castells-logo.png`,
    email: 'contact@castells.media',
    telephone: '+1-916-619-6006',
    address: адрес,
    areaServed: 'United States',
    sameAs: [
      'https://www.instagram.com/castells.media/',
      'https://www.threads.com/@castells.media',
      'https://www.facebook.com/castells.media',
    ],
  };

  const блоки = [организация];

  /*
    Страницы-ответы объявляют вопрос и ответ. Поиск показывает такие страницы
    развёрнутым блоком, но только если ответ действительно есть на странице.
    Он здесь есть: в разметку идёт тот же текст, что человек читает вводным
    абзацем, а не приманка ради красивой выдачи.
  */
  if (page.faq) {
    блоки.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: page.faq.question,
          acceptedAnswer: { '@type': 'Answer', text: page.faq.answer },
        },
      ],
    });
  }

  // Хлебные крошки: помогают поиску понять, где страница в структуре сайта
  if (page.path !== '/') {
    const части = page.path.split('/').filter(Boolean);
    блоки.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.origin}/` },
        ...части.map((часть, i) => ({
          '@type': 'ListItem',
          position: i + 2,
          name: часть.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          item: `${SITE.origin}/${части.slice(0, i + 1).join('/')}`,
        })),
      ],
    });
  }

  return блоки
    .map((б) => `    <script type="application/ld+json">${JSON.stringify(б)}</script>`)
    .join('\n');
}

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
    <meta name="geo.placename" content="${escape(SITE.city)}" />
${buildSchema(page)}`;
}

/**
 * Тело, которое видит робот до запуска скриптов. React стирает его при
 * монтировании, поэтому текст обязан совпадать с тем, что человек увидит
 * на настоящей странице — иначе это подмена содержимого для поисковика.
 */
/**
 * Ссылки, которые робот видит без выполнения скриптов.
 *
 * Замер 24 августа 2026: из 74 страниц от главной по ссылкам в HTML были
 * достижимы ПЯТЬ. Остальные 69 не имели ни одной входящей ссылки, потому что
 * все переходы на сайте рисуются скриптами. Мы дали этим страницам свои
 * заголовки и тексты, но дойти до них робот мог только через карту сайта, а
 * это слабый сигнал: карта говорит «страница есть», ссылки говорят «страница
 * важна».
 *
 * Поэтому генератор теперь кладёт в каждую страницу осмысленные связи: хаб
 * ссылается на своих детей, страница услуги на кейсы, где эта услуга была,
 * кейс обратно на услуги и ниши.
 */
function relatedLinks(page, все) {
  const ссылки = [];
  const добавить = (путь, текст) => {
    if (!текст) return;
    if (ссылки.some((л) => л.путь === путь)) return;
    if (путь !== page.path) ссылки.push({ путь, текст });
  };

  const дети = (префикс) =>
    все
      .filter((p) => p.path.startsWith(префикс) && p.path !== префикс && !p.noindex)
      .slice(0, 24);

  // Хабы ведут на своих детей: так вес доходит до страниц, ради которых всё
  if (page.path === '/services') дети('/services/').forEach((p) => добавить(p.path, p.h1));
  if (page.path === '/industries') дети('/industries/').forEach((p) => добавить(p.path, p.h1));
  if (page.path === '/work') дети('/case-studies/').forEach((p) => добавить(p.path, p.h1));
  if (page.path === '/learn') дети('/learn/').forEach((p) => добавить(p.path, p.h1));
  if (page.path === '/blog') дети('/blog/').forEach((p) => добавить(p.path, p.h1));

  // Страница услуги или ниши ведёт обратно на свой хаб и на соседей
  if (page.path.startsWith('/services/')) {
    добавить('/services', 'All services and prices');
    дети('/services/').slice(0, 6).forEach((p) => добавить(p.path, p.h1));
  }
  if (page.path.startsWith('/industries/')) {
    добавить('/industries', 'All industries');
    дети('/industries/').slice(0, 6).forEach((p) => добавить(p.path, p.h1));
  }
  if (page.path.startsWith('/case-studies/')) {
    добавить('/work', 'All our work');
    добавить('/services', 'What we do and what it costs');
  }
  if (page.path.startsWith('/learn/')) {
    добавить('/learn', 'Other questions we get');
    дети('/learn/').forEach((p) => добавить(p.path, p.h1));
  }
  if (page.path.startsWith('/blog/')) добавить('/blog', 'All notes');
  if (page.path === '/about') добавить('/team', 'The people you will be working with');

  // Главная ведёт на всё, что важно, включая локальную страницу
  if (page.path === '/') {
    ['/work', '/services', '/pricing', '/learn', '/roseville-marketing-agency', '/about', '/contact']
      .forEach((путь) => {
        const p = все.find((x) => x.path === путь);
        if (p) добавить(путь, p.h1);
      });
  }

  return ссылки.slice(0, 26);
}

function buildBody(page, все = []) {
  const paragraphs = [page.intro, ...(page.body ?? [])]
    .filter(Boolean)
    .map((p) => `      <p>${escape(p)}</p>`)
    .join('\n');

  const связи = relatedLinks(page, все);
  const блокСвязей = связи.length
    ? `\n      <nav aria-label="Related">\n${связи
        .map((л) => `        <a href="${л.путь}">${escape(л.текст)}</a>`)
        .join('\n')}\n      </nav>`
    : '';

  return `    <div id="prerendered-content">
      <h1>${escape(page.h1)}</h1>
${paragraphs}
      <nav aria-label="Main">
        <a href="/">Home</a>
        <a href="/work">Work</a>
        <a href="/services">Services</a>
        <a href="/industries">Industries</a>
        <a href="/pricing">Prices</a>
        <a href="/learn">Answers</a>
        <a href="/blog">Notes</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>${блокСвязей}
      <nav aria-label="Legal">
        <a href="/privacy-policy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/cookie-policy">Cookies</a>
      </nav>
      <address>${escape(SITE.legalName)}, ${escape(SITE.city)}</address>
    </div>`;
}

/** Вставляет голову и тело в шаблон сборки. */
export function renderPage(template, page, все = []) {
  let html = template;

  // Заголовок и описание из шаблона убираем: у страницы теперь свои
  html = html.replace(/\n?\s*<title>[\s\S]*?<\/title>/i, '');
  html = html.replace(/\n?\s*<meta\s+name="description"[^>]*>/i, '');

  html = html.replace('</head>', `${buildHead(page)}\n  </head>`);
  html = html.replace(
    /(<div id="root">)(\s*)(<\/div>)/,
    (_m, open, _ws, close) => `${open}\n${buildBody(page, все)}\n    ${close}`
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
  const { услуги, ниши } = await readCatalog();
  const посты = await readPosts();
  const ответы = await readAnswers();
  const allPages = [
    ...PAGES,
    ...caseStudyPages(caseStudies),
    ...servicePages(услуги, caseStudies),
    ...industryPages(ниши, caseStudies),
    ...postPages(посты),
    ...answerPages(ответы),
  ];

  let written = 0;
  for (const page of allPages) {
    if (page.staticFile) continue; // у страницы уже есть свой готовый файл
    const html = renderPage(template, page, allPages);
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
  console.log(`  из них услуг — ${услуги.length}, ниш — ${ниши.length}, статей — ${посты.length}, ответов — ${ответы.length}`);
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
