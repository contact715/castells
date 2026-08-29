/*
  HP Tinting — тонировка, защитная плёнка и керамика.

  ГОРОД ПОКА НЕ СХОДИТСЯ, И ЭТО НАДО ЗНАТЬ. Внутри самого Monday два разных
  ответа:
    — папка в рабочем пространстве называется «HP Tinting | Vancouver»;
    — сами проекты на доске Projects называются «HP Tinting | Burbank |
      Google Local» и «HP Tinting | Burbank | Meta Ads», созданы 9 февраля
      2026.

  Поставлен Burbank: названия проектов конкретнее и свежее названия папки, а
  папку могли завести под другого клиента и переиспользовать. Но это мой
  выбор из двух, а не установленный факт — подтвердить у владельца до того,
  как под этот город пойдут страницы. Публичный поиск город не разрешил:
  сайт hptinting.com нашёлся, привязки к Burbank в выдаче нет.

  Что мы делали (Monday, доска Projects):
    — Google Local: статус «Активный», период 30 января — 28 февраля 2026;
    — Meta Ads: «Выполнено», тот же период. Есть отдельные доски с дневными
      записями по рекламе и доска лидов с живыми обращениями за февраль.
*/

export default {
  id: 'hp-tinting',
  name: 'HP Tinting',
  site: 'https://hptinting.com/',

  /* Тонировка, плёнка и керамика — ровно тот набор, под который у нас есть курс. */
  trade: 'automotive',

  cms: 'unknown',
  hosting: 'unknown',

  tagline: 'Window tinting, paint protection and ceramic coating',

  about: 'Window tinting, paint protection film and ceramic coating for cars, homes and businesses.',

  differentiator: '',

  /* Три направления с их собственного сайта, ничего не додумано. */
  services: [
    { name: 'Window Tinting', description: 'Window film for cars, homes and businesses.' },
    { name: 'Paint Protection Film', description: 'Protective film for vehicle paint.' },
    { name: 'Ceramic Coating', description: 'Ceramic protective coating.' },
  ],

  /*
    Burbank — по названиям проектов в Monday. См. оговорку в шапке файла: пока
    город не подтверждён владельцем, страницы под него делать рано.
  */
  cities: [
    { name: 'Burbank', state: 'CA' },
  ],

  contact: {
    phone: '',
    address: '',
    hours: '',
  },

  facts: [
    {
      claim: 'Google Local work is running',
      source: 'Monday, «HP Tinting | Burbank | Google Local», статус «Активный», период 2026-01-30 — 2026-02-28',
    },
    {
      claim: 'Meta Ads campaign completed',
      source: 'Monday, «HP Tinting | Burbank | Meta Ads», статус «Выполнено», тот же период',
    },
    {
      claim: 'Leads came in through the campaign',
      source: 'Monday, доска «HP Tinting | Leads» — живые обращения за февраль 2026',
    },
    {
      claim: 'Window tinting, paint protection film and ceramic coating',
      source: 'их собственный сайт hptinting.com; у клиента напрямую не подтверждено',
    },
  ],

  engaged: {
    local: 'ведём',
    metaAds: 'завершено',
  },

  /*
    Доступы. Здесь единственный случай среди наших проектов, где доступ
    проставлен true: работа по Google Local числится АКТИВНОЙ, а не закрытой,
    и вести её без доступа к профилю невозможно. У AAA Brothers тот же доступ
    стоит false именно потому, что там проект закрыт.

    Кабинет Meta не отмечен: кампания завершена, и сохранился ли доступ —
    вопрос того же порядка.
  */
  access: {
    siteAdmin: false,
    hosting: false,
    domainDns: false,
    searchConsole: false,
    bingWebmaster: false,
    googleBusiness: true,   // работа по Google Local активна — без доступа её не вести
    analytics: false,
    callTracking: false,
    googleAds: false,
    metaAds: false,         // кампания завершена, доступ переподтвердить
    emailSending: false,
    crm: false,
  },
};
