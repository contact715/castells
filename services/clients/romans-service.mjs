/*
  Roman's Service Cooling & Heating, North Port, Флорида.

  ЭТОТ САЙТ СТРОИЛИ МЫ — и это редкий случай, когда так можно сказать. Он в
  коротком списке `BUILT_SITES` (constants.ts), куда 22 августа 2026 попали
  только два клиента из одиннадцати, по строгому правилу: у клиента есть
  карточка Web-Development И адрес отвечает 200. Проверено тогда же:
  acromanservice.com, North Port FL, совпадает с городом в Monday.

  Что мы делали (Monday, доска Projects):
    — Web Development: «Выполнено», отметка «Полностью доволен»,
      11 августа — 30 октября 2025;
    — Yelp: статус «Активный», отметка «Нейтрально (средне)».
*/

export default {
  id: 'romans-service',
  name: "Roman's Service Cooling & Heating",
  site: 'https://www.acromanservice.com/',

  trade: 'hvac',

  /*
    Стек не записан В ЭТОМ репозитории, поэтому 'unknown'. Мы сайт строили, то
    есть стек знаем — но знание лежит не здесь, и пока оно не проставлено,
    цикл честно останавливается на публикации. Выяснить и заменить одним
    словом.
  */
  cms: 'unknown',
  hosting: 'unknown',

  tagline: 'Heating and cooling in southwest Florida',

  about: 'Licensed and insured heating and cooling company serving North Port and the surrounding counties.',

  differentiator: '',

  /*
    Услуги с их живого сайта: у каждой есть своя страница либо она названа в
    описании компании (ремонт и обслуживание кондиционеров, отопление,
    качество воздуха, коммерческий сегмент отдельной страницей).
  */
  services: [
    { name: 'AC Repair', description: 'Air conditioning diagnosis and repair.' },
    { name: 'AC Installation', description: 'New system installation and replacement.' },
    { name: 'AC Maintenance', description: 'Scheduled maintenance and tune-ups.' },
    { name: 'Heating Repair', description: 'Heating system repair and service.' },
    { name: 'Air Quality', description: 'Indoor air quality equipment.' },
    { name: 'Commercial HVAC Repair', description: 'Heating and cooling for commercial buildings.' },
  ],

  /*
    North Port — база компании. По их описанию они обслуживают пять округов
    (Charlotte, Lee, Sarasota, Manatee, DeSoto), но округ это не город, и
    страницу под округ надо решать отдельно. Расширять после разговора: город
    в этом списке означает «делаем под него страницу».
  */
  cities: [
    { name: 'North Port', state: 'FL' },
  ],

  contact: {
    phone: '(941) 207-8587',
    address: '2735 Commerce Pkwy, North Port, FL 34289',
    hours: '',
  },

  /*
    Про стаж намеренно НЕТ факта. В публичных источниках он назван двумя
    разными числами — «14 лет опыта» в одном месте и «более 21 года» в
    другом. Оба со стороны, и оба не подтверждены владельцем. Пока не
    спросим, на сайт не идёт ни одно: два разных числа об одном и том же —
    это ровно та ошибка, из-за которой мы чистили собственный сайт.
  */
  facts: [
    {
      claim: 'We built this website',
      source: 'constants.ts → BUILT_SITES, проверено 22 августа 2026: адрес отвечает 200, город совпадает с Monday',
    },
    {
      claim: 'Website project completed, client marked fully satisfied',
      source: 'Monday, «Roman\'s Service | Web Development», статус «Выполнено», 2025-08-11 — 2025-10-30',
    },
    {
      claim: 'Licensed and insured, trade license CAc1818567',
      source: 'их собственный сайт acromanservice.com; у клиента напрямую не подтверждено',
    },
  ],

  /*
    Услуги. Сайт сдан, Yelp по доске числится активным.

    Оговорка по Yelp: статус «Активный», но последний записанный период —
    февраль 2026. Либо доску не обновляли, либо работа идёт без записей.
    Поставил «ведём» по статусу, но при первом же разговоре это стоит
    сверить.
  */
  engaged: {
    website: 'завершено',
    yelpAds: 'ведём',
  },

  /*
    Доступы. Сайт мы строили, но проект закрыт в октябре 2025, и сохранился
    ли доступ — не проверено. Правило то же, что у остальных: ошибиться в
    сторону «надо переспросить» дешевле, чем в сторону «у нас всё есть».
  */
  access: {
    siteAdmin: false,      // строили мы, но проект закрыт — переподтвердить
    hosting: false,
    domainDns: false,
    searchConsole: false,
    bingWebmaster: false,
    googleBusiness: false,
    analytics: false,
    callTracking: false,
    googleAds: false,
    metaAds: false,
    emailSending: false,
    crm: false,
  },
};
