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
    title: 'Castells Media | Marketing agency for home service businesses',
    description:
      'We build websites, run ads and set up automation for HVAC, plumbing and other home service companies. Roseville, CA. Real clients, real sites you can open.',
    h1: 'Marketing for home service businesses',
    intro:
      'We build the website, run the ads and set up the follow-up, so the phone rings and nothing gets lost. Based in 1298 Antelope Creek Drive, Roseville, California, working with contractors across the US.',
    body: [
      'What we do: websites and branding, paid ads on Google and Meta, local presence on Google and Yelp, and automation that answers and books the job.',
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
    title: 'Services and prices | Castells Media',
    description:
      'Websites and branding, Google and Meta ads, local presence, automation and CRM. Monthly plans from $590. Project work from $1,750.',
    h1: 'What we do and what it costs',
    intro:
      'Four things a home service business needs to get booked: a site that converts, ads that bring calls, a local profile people find, and automation that answers.',
  },
  {
    path: '/about',
    title: 'About Castells Media | Roseville marketing agency',
    description:
      'Castells Media Inc, a marketing agency in 1298 Antelope Creek Drive, Roseville, California, working with home service businesses across the United States.',
    h1: 'About us',
    intro:
      'Castells Media Inc is a marketing agency based in 1298 Antelope Creek Drive, Roseville, California. We work with home service businesses — HVAC, plumbing, appliance repair, remodeling — across the United States.',
  },
  {
    path: '/contact',
    title: 'Contact Castells Media | Roseville, CA',
    description:
      'Talk to us about your business. WhatsApp, Telegram, phone or the form. 1298 Antelope Creek Drive, Roseville, California.',
    h1: 'Talk to us',
    intro:
      'Tell us what your business does and where, and we will say plainly whether we can help. WhatsApp and Telegram get the fastest answer.',
    // /contact обслуживается отдельной статической страницей public/contact.html
    // (правило в vercel.json). Свой файл ей не подкладываем, иначе неясно, что
    // победит; в карту сайта адрес по-прежнему попадает.
    staticFile: true,
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
    description: 'Notes on marketing for home service businesses.',
    h1: 'Notes',
    intro: 'What we learn while running ads and building sites for service businesses.',
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
export const NOT_FOUND = {
  path: '/404',
  title: 'Page not found | Castells Media',
  description: 'This page does not exist.',
  h1: 'Page not found',
  intro: 'This address does not exist. The work is at /work, the services at /services.',
  noindex: true,
};
