/*
  AAA Brothers Heating & Air Conditioning, Huntingdon Valley, Пенсильвания.
  Второй проект в цикле.

  ВАЖНО ПРО САЙТ, И ЭТО НЕ ПРИДИРКА. Сайт aaabrothers.com строили НЕ мы. Это
  клиент по рекламе и местному присутствию. Проверено в двух местах, которые
  сходятся:

    1. constants.ts, комментарий к BUILT_SITES от 22 августа 2026, дословно:
       «НЕ добавлять сюда … aaabrothers.com: это клиенты по рекламе, сайты
       строили не мы. Увидеть свой сайт в чужом портфолио — то, за что клиент
       перестаёт быть клиентом.»
    2. Monday, доска Projects: у клиента два проекта — «AAA Brothers | Google
       Local» и «AAA Brothers | Meta Ads». Проекта на разработку сайта нет.

  Отсюда `cms: 'unknown'` и `siteAdmin: false`. Это меняет весь план работ:
  страницы мы предложить можем, а выложить их сами — нет, пока не появится
  доступ.

  ЧТО МЫ ДЛЯ НИХ ДЕЛАЛИ (Monday, оба проекта в статусе «Выполнено», отметка
  «Полностью доволен»):
    — Google Local, включая верификацию профиля Google и Google Guaranteed;
    — реклама в Meta, период 8 сентября — 27 октября 2025.
*/

export default {
  id: 'aaa-brothers',
  name: 'AAA Brothers Heating & Air Conditioning',
  site: 'https://aaabrothers.com/',

  /* Ниша подтверждена их собственным сайтом и профилем BBB. */
  trade: 'hvac',

  /*
    Не выяснено, на чём сделан сайт. Поле честно стоит в 'unknown', и цикл на
    этом останавливается — это и есть его работа. Пока не выясним, план страниц
    некуда публиковать, как бы хорошо он ни был собран.
  */
  cms: 'unknown',
  hosting: 'unknown',

  tagline: 'Heating and air conditioning in Huntingdon Valley',

  about: 'Family-owned heating and air conditioning company serving Huntingdon Valley and the surrounding area.',

  differentiator: '',

  /*
    Услуги взяты с их собственного сайта: у каждой ниже есть отдельная живая
    страница (heating-installation, heater-repair, heating-maintenance,
    ac-maintenance) либо она названа в описании компании. Ничего не додумано.

    Отдельно стоит заметить: у них УЖЕ есть страницы вида «услуга + город»
    (/heating-installation-huntingdon-valley/ и подобные). То есть структура,
    которую собирает стадия 2, у них частично построена, и наша работа начнётся
    со сверки с тем, что есть, а не с чистого листа.
  */
  services: [
    { name: 'Heating Installation', description: 'Furnace and heating system installation.' },
    { name: 'Heater Repair', description: 'Repair of heating equipment.' },
    { name: 'Heating Maintenance', description: 'Scheduled maintenance of heating systems.' },
    { name: 'AC Maintenance', description: 'Scheduled maintenance of air conditioning.' },
    { name: 'Indoor Air Quality', description: 'Air quality equipment and filtration.' },
    { name: 'Water Heaters', description: 'Water heaters, boilers and radiant heat.' },
  ],

  /*
    Только Huntingdon Valley. В описании компании упоминается «большая
    Филадельфия», но это описание со стороны, а не подтверждённая зона
    обслуживания. Правило то же, что применено к нашему собственному профилю:
    город здесь означает «заявляем зону и делаем под неё страницу». Расширять —
    после разговора с клиентом.
  */
  cities: [
    { name: 'Huntingdon Valley', state: 'PA' },
  ],

  /* Из Monday: место ведения проектов. Телефон в наших записях не хранится. */
  contact: {
    phone: '',
    address: 'Huntingdon Valley, PA',
    hours: '',
  },

  /*
    Факты с источниками. Разделены намеренно: то, что мы знаем сами (наша
    работа по Monday), и то, что взято из публичных источников и у клиента НЕ
    подтверждено. Второе на сайт не идёт, пока клиент не подтвердит.
  */
  facts: [
    {
      claim: 'Google Local project completed, client marked fully satisfied',
      source: 'Monday, доска Projects, «AAA Brothers | Google Local», статус «Выполнено», отметка «Полностью доволен»',
    },
    {
      claim: 'Meta Ads campaign ran September to October 2025',
      source: 'Monday, доска Projects, «AAA Brothers | Meta Ads», период 2025-09-08 — 2025-10-27',
    },
    {
      claim: 'Google Business Profile verified and Google Guaranteed set up',
      source: 'Monday, задача «Google Guaranteed и GMB верификация + запуск - AAA Brothers»',
    },
    {
      claim: 'Family-owned HVAC company in Huntingdon Valley, PA',
      source: 'их собственный сайт aaabrothers.com и публичный профиль BBB; у клиента напрямую НЕ подтверждено',
    },
  ],

  /*
    Доступы. Все false, и это осознанно, а не по лени.

    Мы делали им профиль Google и рекламу в Meta, то есть доступы у нас
    когда-то были. Но оба проекта закрыты (Monday, статус «Выполнено»,
    последнее изменение февраль 2026), и сохранились ли доступы сейчас — не
    проверено. Поставить true значило бы сказать пульту «стадия 5 идёт», и мы
    запланировали бы работу, которую не сможем сделать.

    Ошибиться в сторону «надо переспросить» дешевле, чем в сторону «у нас всё
    есть». Поэтому здесь false, а в разговоре с клиентом — переподтвердить.
  */
  access: {
    siteAdmin: false,      // сайт строили не мы, доступа нет
    hosting: false,        // где лежит сайт — не выяснено
    domainDns: false,
    searchConsole: false,
    bingWebmaster: false,
    googleBusiness: false, // делали верификацию, но проект закрыт — переподтвердить
    analytics: false,
    callTracking: false,
    googleAds: false,
    metaAds: false,        // рекламу вели, но кампания завершена в октябре 2025
    emailSending: false,
    crm: false,
  },
};
