/**
 * Один источник правды для того, что видит робот и мессенджер.
 *
 * Сегодня сайт рисуется скриптами: сервер отдаёт роботу 42 символа текста,
 * один и тот же заголовок на все адреса и ни одного тега превью. Поэтому
 * ссылка в мессенджере не собирает карточку — а это единственный сценарий,
 * который владелец назвал главным.
 *
 * Отсюда правило: заголовок, описание, канонический адрес и превью живут
 * ЗДЕСЬ, попадают в HTML на сборке, и только потом React их подтверждает.
 *
 * Каждое утверждение в текстах ниже опирается на проверяемый факт: имена
 * клиентов из наших кейсов, живые ссылки на их сайты, юрлицо и город.
 * Числа без источника сюда не попадают — это то, за что мы только что
 * вычистили полсайта.
 */

// 14 ноября 2026: цены на сайте больше не публикуются, владелец называет их
// на созвоне. Вместо цен описания страниц берут условия и состав ведения из
// config/offer.mjs — тот же источник, что у главной и страницы услуг.
import { OFFER, TERMS_SENTENCE, PARTS_SENTENCE } from '../config/offer.mjs';

export const SITE = {
  origin: 'https://www.castells.media',
  name: 'Castells Media',
  legalName: 'Castells Media Inc',
  city: '1298 Antelope Creek Drive, Roseville, California',
  ogImage: '/og-image.png',
};

/** Страницы, у которых есть собственный смысл и собственный текст. */
export const PAGES = [
  {
    path: '/',
    title: 'Castells Media | Full-service marketing for home service businesses',
    description:
      'One team runs all of your marketing every month: website, Google and Meta ads, local profiles and follow-up. For home service companies. Roseville, CA.',
    h1: 'All your marketing, run for you every month',
    intro:
      `${OFFER.summary} For ${OFFER.audience}. Based in Roseville, California, working with contractors across the US.`,
    body: [
      'Working with estimate-driven businesses since June 2017: kitchen and furniture manufacturing first, then HVAC. Five sales departments built from nothing, six furniture showrooms opened.',
      `What we run for you every month: ${PARTS_SENTENCE}. We do not sell these one by one or as one-time setups.`,
      TERMS_SENTENCE,
      'Clients whose sites we built: Roman Service (HVAC, North Port, Florida) — acromanservice.com.',
      'Roman, owner of Roman Service LLC: "I honestly didn\'t expect it to work so fast. I was always skeptical about advertising because before it just ate up the budget with no result. But here I see real calls, requests, people who really need HVAC system installation."',
    ],
  },
  {
    path: '/work',
    title: 'Our work | Castells Media',
    description:
      'Real clients with names and live sites: HVAC, automotive, remodeling and dental businesses across the US. Open any of them and see the work.',
    h1: 'Clients you can look up',
    intro:
      'Every company here is real. Where we built the site, the link opens it — check it yourself before you talk to us.',
  },
  {
    path: '/services',
    title: 'What is included | Castells Media',
    description:
      'Full-service marketing, run every month: website and local profiles, Google and Meta ads, CRM and follow-up, tracking and a weekly report. One monthly fee.',
    h1: 'Everything we run for you, every month',
    intro:
      'We do not sell these one by one. You get all four parts for one monthly fee: we build what is missing and then run all of it.',
  },
  {
    path: '/pricing',
    title: 'Pricing | Castells Media',
    description:
      'One monthly fee for all of your marketing, named on the first call. No setup fee, no contract. The ad budget goes straight to Google, Meta and Yelp.',
    h1: 'One monthly fee for all of it',
    intro:
      'No setup fee, no contract. You hear the number on the first call, before you pay anything. The ad budget is yours and goes straight to Google, Meta and Yelp.',
  },
  {
    path: '/roseville-marketing-agency',
    title: 'Marketing agency in Roseville, California | Castells Media',
    description:
      'Marketing agency in Roseville, California. We run all marketing for home service businesses every month: website, ads, local profiles and follow-up.',
    h1: 'Marketing agency in Roseville',
    intro:
      'We work out of Roseville and run all of the marketing for home service businesses, every month. You can walk in, call, or write — all three reach the same people.',
    body: [
      'Castells Media Inc, 1298 Antelope Creek Drive, Roseville, California. Phone +1 (916) 619-6006, email contact@castells.media. The fastest answer is WhatsApp or Telegram on the same number.',
      'Who we work with: heating and air conditioning, plumbing, appliance repair, remodeling, auto detailing — companies where the money arrives as a phone call.',
      'Our clients in California: Cool Doc (HVAC, Los Angeles); Appliance Repair Clinic (home services, Los Angeles); Drive Car Studio (automotive, Los Angeles). None of them are in Roseville itself, and we are not going to pretend otherwise.',
      `Pricing: ${TERMS_SENTENCE}`,
    ],
  },
  {
    path: '/about',
    title: 'About Castells Media | Roseville marketing agency',
    description:
      'Castells Media Inc, a marketing agency in Roseville, California, working with home service businesses across the United States.',
    h1: 'A small agency for businesses that live on the phone ringing',
    intro:
      'Castells Media Inc works out of Roseville, California, with home service businesses across the US: HVAC, appliance repair, plumbing, remodeling. One team builds the site, runs the ads and handles the follow-up every month, so a job that was going to be lost gets booked instead.',
    body: [
      'Working in businesses that sell from an estimate since June 2017. Most of those years went into kitchen and furniture manufacturing, and after that into HVAC. Both sell from an estimate, with long decisions and large tickets, which is why the same playbook moves between them.',
      'Along the way: five sales departments built from nothing, and six furniture showrooms opened. That is where the parts of this business that are not advertising come from — what a sales process looks like on paper, who answers the phone, and what happens to a quote after it is sent.',
    ],
  },
  {
    path: '/contact',
    title: 'Contact Castells Media | Roseville, CA',
    description:
      'Talk to us about your business. WhatsApp, Telegram, phone or the form. 1298 Antelope Creek Drive, Roseville, California.',
    h1: 'Talk to us',
    intro:
      'Tell us what your business does and where, and we will say plainly whether we can help. WhatsApp and Telegram get the fastest answer.',
  },
  {
    path: '/industries',
    title: 'Industries we work with | Castells Media',
    description:
      'HVAC and appliance repair, automotive, remodeling and other high-ticket service industries across the US.',
    h1: 'Industries we work with',
    intro: 'High-ticket service businesses where a single job is worth the marketing that brought it.',
  },
  {
    path: '/blog',
    title: 'Notes | Castells Media',
    description:
      'Short, plain articles for home service business owners: what marketing costs, who should own your ad accounts, and what to fix before you spend on ads.',
    h1: 'Things worth knowing before you hire anyone',
    intro:
      'Short and plain, written from our own work. No trend pieces, no numbers we cannot show you the source for.',
  },
  {
    path: '/team',
    title: 'Team | Castells Media',
    description: 'The people behind Castells Media, 1298 Antelope Creek Drive, Roseville, California.',
    h1: 'Team',
    intro: 'The people who do the work.',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy policy | Castells Media',
    description: 'How Castells Media Inc collects, uses and protects your data.',
    h1: 'Privacy policy',
    intro: 'How we handle the data you leave with us.',
  },
  {
    path: '/terms',
    title: 'Terms of service | Castells Media',
    description: 'Terms of service for Castells Media Inc.',
    h1: 'Terms of service',
    intro: 'The terms under which we work together.',
  },
  {
    path: '/cookie-policy',
    title: 'Cookie policy | Castells Media',
    description: 'Which cookies this site uses and why.',
    h1: 'Cookie policy',
    intro: 'Which cookies we use and what you can turn off.',
  },
  {
    path: '/thank-you',
    title: 'Thank you | Castells Media',
    description: 'We got your request and will be in touch shortly.',
    h1: 'Thank you',
    intro: 'We got your request. We will be in touch shortly.',
    noindex: true,
  },
  {
    path: '/lead-form',
    title: 'Get a quote | Castells Media',
    description: 'Tell us about your business and we will come back with a plan and a price.',
    h1: 'Get a quote',
    intro: 'Three fields. We answer the same day.',
    noindex: true,
  },
  {
    path: '/lead-form/thank-you',
    title: 'Thank you | Castells Media',
    description: 'We got your request and will be in touch shortly.',
    h1: 'Thank you',
    intro: 'We got your request. We will be in touch shortly.',
    noindex: true,
  },
];

/** Страница, которой нет. Отдаётся с кодом 404, в карту сайта не попадает. */
/*
  Заголовки и описания страниц, которых нет в списке PAGES: услуги, ниши,
  статьи, ответы, кейсы. Они создаются на лету из данных проекта.

  Почему шаблоны вынесены сюда, 24 августа 2026. Раньше они были вписаны прямо
  в генератор статических страниц, и приложение в браузере не могло их знать.
  Из-за этого при переходе по меню название вкладки, описание и канонический
  адрес оставались от той страницы, с которой человек начал: открыл главную,
  дошёл до контактов — во вкладке по-прежнему главная, и canonical объявляет
  контакты главной страницей.

  Чинить это возвратом старого компонента SEO было нельзя: 24 августа его
  отключили ровно потому, что он перебивал верные теги своими устаревшими.
  Вторая копия заголовков разошлась бы с первой так же, как разошлись три меню
  днём раньше. Поэтому шаблон один, и его читают обе стороны: генератор
  статических страниц и приложение.
*/

const МАРКА = 'Castells Media';

export const TITLE = {
  service: (name) => `${name} for home service businesses | ${МАРКА}`,
  industry: (name) => `${name} marketing | ${МАРКА}`,
  post: (title) => `${title} | ${МАРКА}`,
  answer: (question) => `${question} | ${МАРКА}`,
  caseStudy: (client, industry) => `${client} — ${industry} | ${МАРКА}`,
  academyLesson: (title) => `${title} | ${МАРКА} Academy`,
  academyTrack: (name) => `${name} marketing course | ${МАРКА}`,
};

/*
  Хабы, которых нет в списке PAGES: их страницы генератор собирает на лету.
  Раньше их заголовки были вписаны ДВАЖДЫ — в генераторе и в стороне браузера,
  и 26 августа сверка это поймала на академии. Держим здесь, читают обе стороны.
*/
export const HUBS = {
  learn: {
    path: '/learn',
    title: `Questions we get asked | ${МАРКА}`,
    description:
      'Straight answers to the questions home service business owners ask us: is a website needed, what an agency does every month, and whether a long contract is normal.',
  },
  academy: {
    path: '/academy',
    title: `Academy for contractors | ${МАРКА}`,
    description:
      'A free course for home service business owners: the business itself, brand, website, marketing budgets, getting found, and following up on work you already have.',
  },
};

export const DESCRIPTION = {
  service: (description) =>
    `${description} ${МАРКА}, Roseville, California, working with contractors across the US.`,
  // До 27 августа 2026 здесь стояла фраза «Websites, Google and Meta ads and
  // follow-up for X businesses» перед адресом — общие слова, которые сами по
  // себе занимали больше ста символов и толкали 18 из 20 ниш за порог в 165.
  // Короче и по факту то же самое, что у услуг (DESCRIPTION.service выше).
  industry: (description) => `${description} ${МАРКА}, Roseville, California, working with contractors across the US.`,
  post: (excerpt) => excerpt,
  answer: (short) => short,
  caseStudy: (description, client, where) => description || `${client}: ${where}.`,
  academyLesson: (summary) => summary,
  academyTrack: (about) => about,
};

export const NOT_FOUND = {
  path: '/404',
  title: 'Page not found | Castells Media',
  description: 'This page does not exist.',
  h1: 'Page not found',
  intro: 'This address does not exist. The work is at /work, the services at /services.',
  noindex: true,
};
