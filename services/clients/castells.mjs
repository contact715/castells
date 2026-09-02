/*
  Первый проект в цикле — мы сами.

  Так и задумано: прежде чем продавать цикл SEO клиенту, он должен отработать
  на нашем собственном сайте. Это же и защита от лицемерия, которое в
  разборе стратегии 28 августа названо прямо: мы продаём измеримость и не
  измеряем себя, продаём приём заявок при неработающей форме. Пока Castells
  стоит первым в списке, любой незакрытый доступ виден нам раньше, чем
  клиенту.

  ВСЁ НИЖЕ — ИЗ РЕПОЗИТОРИЯ, НЕ ИЗ ГОЛОВЫ. Услуги взяты из карты сайта (те
  шесть, что реально отдаются в поиск), контакты из config/business.ts, факты
  с указанием источника. Ничего не додумано.
*/

export default {
  id: 'castells',
  name: 'Castells Media',
  site: 'https://www.castells.media',

  /*
    Ремесло: 'other'. Мы не подрядчик и ни под один из пяти курсов академии не
    попадаем — там ремёсла клиентов. Ставить 'professional' было бы натяжкой
    ради красивой строки: тот курс про страхование, юристов и мед-спа.
  */
  trade: 'other',

  /* Сайт наш, лежит в этом же репозитории — публикация полностью в наших руках. */
  cms: 'ours',

  /* Выкладывается на Vercel, проект castells, команда «Dmitrii's projects». */
  hosting: 'vercel',

  /* Заголовок первого экрана живого сайта. Без чисел. */
  tagline: 'Marketing for home service businesses',

  /* Заголовок страницы /about на живом сайте. */
  about: 'A small agency for businesses that live on the phone ringing',

  differentiator: '',

  /*
    Шесть услуг, которые реально отдаются в поиск, — взяты из dist/sitemap.xml,
    а не из списка на странице услуг. Разница существенная: правило «нет актива
    — нет страницы в поиске» (23 августа) оставило в индексе 6 услуг из 20, и
    профиль обязан отражать то, что есть, а не то, что заявлено.
  */
  services: [
    { name: 'Brand Identity', description: 'Logo, colors, typography and how the business looks everywhere.' },
    { name: 'Web Development', description: 'Sites built to be found and to answer the visitor.' },
    { name: 'CRM Pipelines', description: 'Where a lead goes after it arrives, and how it gets followed up.' },
    { name: 'Google Ads PPC', description: 'Paid search for people already looking for the service.' },
    { name: 'SEO Content', description: 'Pages that earn search traffic without paying per click.' },
    { name: 'Meta Ads', description: 'Paid social for demand that has not formed yet.' },
  ],

  /*
    Один город, и это осознанно. На сайте есть ровно одна местная страница —
    /roseville-marketing-agency. Лос-Анджелес в профиль НЕ вписан, хотя
    калифорнийские клиенты именно оттуда: на самой странице прямым текстом
    сказано, что они не из Roseville. Город в этом списке означает «мы
    заявляем зону обслуживания и делаем под неё страницу», а не «здесь есть
    клиент». Вписать ЛА значило бы пообещать то, чего мы не заявляем.
  */
  cities: [
    { name: 'Roseville', state: 'CA', path: '/roseville-marketing-agency' },
  ],

  /*
    Найдено 2 сентября 2026: без этого флага план требовал связки
    /services/{услуга}/roseville — шесть адресов, которых на сайте никогда не
    было и не будет. Наш сайт строится по своей схеме (наш код: lib/routes.ts),
    а не по программатик-перемножению услуга×город, поэтому связки выключены
    прямо в профиле, а не патчем в общем коде плана.
  */
  programmaticPages: false,

  /* Из config/business.ts — единственного источника контактов на сайте. */
  contact: {
    phone: '+1 (916) 619-6006',
    address: '1298 Antelope Creek Drive, Roseville, California',
    hours: '',
  },

  /*
    Факты — только с источником. Это то же правило, что стоит в валидаторе, и
    оно же трижды нарушалось на нашем собственном сайте до чисток.
  */
  facts: [
    {
      claim: 'Agency work since June 2017',
      source: 'назвал владелец 27 августа 2026; источник записан рядом с текстом на странице /about',
    },
    {
      claim: 'Castells Media Inc., California',
      source: 'config/business.ts; адрес подтверждён владельцем 22 августа 2026',
    },
    {
      claim: 'Prices are published on the site, no call required to see them',
      source: 'config/pricing.mjs — единственный источник цен, читают 10 файлов',
    },
  ],

  /*
    Наши услуги, подключённые на этом проекте. Мы сами себе клиент, поэтому
    здесь только то, что действительно делаем для своего сайта.
  */
  engaged: {
    website: 'ведём',   // сайт в нашем репозитории, выкатываем сами
    seo: 'ведём',       // 123 страницы, утренняя смена
    brand: 'ведём',     // свой стиль, шрифты и картинка для соцсетей
  },

  /*
    Доступы на 29 августа 2026.

    Открыты только те, где мы сами себе хозяева: сайт в нашем репозитории и
    выкладка на Vercel. Всё остальное закрыто, и это честная картина, а не
    недоделка: ключевые из недостающих открываются по ТЗ браузерному агенту
    (docs/TZ_BROWSER_AGENT_2026-08-29.md). Как Search Console подтвердится и
    появится счётчик — правим здесь, и стадии 1 и 6 перестают быть
    заблокированными.
  */
  access: {
    // Инфраструктура — здесь мы хозяева, сайт в нашем репозитории.
    siteAdmin: true,
    hosting: true,
    domainDns: false,      // запись в DNS ставит владелец; без неё встаёт Search Console

    // Поиск
    searchConsole: false,
    bingWebmaster: false,
    googleBusiness: false,

    // Измерение
    analytics: true,       // счётчик Castells стоит на сайте с 30.08.2026, данные идут
    callTracking: false,

    // Реклама — кабинеты есть у владельца, доступа у цикла нет
    googleAds: false,
    metaAds: false,

    // Заявки
    emailSending: false,   // форма честно отвечает «напишите в WhatsApp»
    crm: false,
  },
};
