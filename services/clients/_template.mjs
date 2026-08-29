/*
  ОБРАЗЕЦ профиля клиента. Это не клиент — файлы с подчёркиванием в начале
  оркестратор в список клиентов не берёт.

  Чтобы завести настоящего клиента: скопировать в `<id>.mjs`, заполнить и
  прогнать `node services/seo/run.mjs <id>`. Пока профиль не проходит
  проверку, стадии не запускаются.

  ГЛАВНОЕ ПРАВИЛО ЭТОГО ФАЙЛА: сюда попадает только то, что мы знаем. Не
  «примерно так обычно бывает у подрядчиков», не «наверное, они это делают».
  Пустое поле честнее заполненного наугад: стадия, наткнувшись на пустоту,
  остановится и спросит, а наткнувшись на выдумку — уверенно построит на ней
  страницу, и выдумка уедет на сайт клиента.
*/

export default {
  /** Слаг: латиница, цифры и дефис. Должен совпадать с именем файла. */
  id: 'template',

  /** Как компания называется в документах. */
  name: 'Example Contractor Inc',

  /** Адрес сайта. null, если сайта ещё нет — это нормальное состояние. */
  site: null,

  /**
   * Ремесло: hvac | remodeling | roofing | automotive | professional | other.
   * От него зависит, какой курс академии и какие приёмы подходят.
   */
  trade: 'hvac',

  /**
   * Где лежит сайт. Определяет, можно ли публиковать машиной:
   * ours | wordpress | webflow | strapi | ghost | squarespace | wix | none | unknown
   *
   * Это поле обязательное не для порядка. Владелец сам поставил вопрос
   * 29 августа: если сайт клиента на конструкторе без доступа, никакой
   * автоматизации не будет, как бы хорошо ни работали агенты.
   */
  cms: 'none',

  /*
    Хостинг: vercel | railway | hostinger | netlify | cpanel | wordpressHost |
    other | unknown | none. От него зависит, что просить у клиента: «доступ к
    хостингу» звучит одинаково, а на Railway это приглашение в проект, а на
    Hostinger — панель hPanel и файловый доступ.
  */
  hosting: 'none',

  /** Короткая строка о бизнесе. Без чисел — для чисел есть facts. */
  tagline: 'Heating and cooling for homes',

  /** Пара предложений о компании. Тоже без чисел без источника. */
  about: 'Family-run heating and cooling company serving the local area.',

  /** Чем отличается от соседей. Без превосходных степеней и без чисел. */
  differentiator: '',

  /**
   * Услуги. Строка или объект { name, description }.
   * Из них собираются адреса /services/<slug>.
   */
  services: [
    { name: 'AC Repair', description: 'Diagnosis and repair of air conditioning systems.' },
    { name: 'Heating Repair', description: 'Furnace and heat pump repair.' },
    { name: 'Installation', description: 'New system installation and replacement.' },
  ],

  /**
   * Города обслуживания. Строка или объект { name, state }.
   * Из них собираются адреса /areas/<slug> и связки «услуга × город».
   *
   * Не выдумывать: город попадает сюда, только если клиент действительно туда
   * выезжает. Страница про город, куда не ездят, — обещание, которое компания
   * не выполнит, и это хуже отсутствия страницы.
   */
  cities: [
    { name: 'Roseville', state: 'CA' },
    { name: 'Sacramento', state: 'CA' },
  ],

  /** Для разметки LocalBusiness. Пусто — значит разметка будет неполной. */
  contact: {
    phone: '',
    address: '',
    hours: '',
  },

  /**
   * Проверяемые факты. У КАЖДОГО обязателен источник — это проверяет
   * валидатор, а не совесть.
   *
   * Источник — это откуда мы это знаем: «сказал владелец 29 августа»,
   * «лицензия CSLB #123456», «замер такой-то». Если источника нет, факт не
   * едет на сайт. На собственном сайте это правило нарушалось трижды, и
   * каждый раз выдумку находили и вычищали задним числом.
   */
  facts: [
    // { claim: 'Licensed and insured in California', source: 'лицензия CSLB, номер такой-то' },
    // { claim: 'В деле с 2011 года', source: 'сказал владелец компании 29 августа' },
  ],

  /*
    Какие НАШИ услуги подключены на этом проекте и в каком состоянии:
    'ведём' | 'завершено' | 'обсуждаем'.

    Ключи — из каталога lib/catalog.mjs: website, brand, seo, local, googleAds,
    googleLsa, metaAds, yelpAds, tiktokAds, chatgptAds, crm.

    Не путать с полем services выше: там услуги САМОГО клиента, из которых
    строятся страницы его сайта.
  */
  engaged: {
    // seo: 'обсуждаем',
  },

  /**
   * Доступы. Пока false — стадии, которым доступ нужен, честно
   * останавливаются и говорят, чего им не хватает.
   */
  access: {
    siteAdmin: false,
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
