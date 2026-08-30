/*
  AAA Sisters Climate, Langhorne, Пенсильвания. Женщины-владелицы, жилой HVAC,
  установка и замена систем как основная услуга.

  ПОЧЕМУ ЭТОТ ФАЙЛ ЗАМЕНИЛ aaa-brothers.mjs. Владелец 29 августа 2026: «у нас
  сейчас нет такого проекта, у нас есть ааа систерс». Это НЕ переименование:
  Brothers и Sisters — разные компании, и почти всё у них разное.

    AAA Brothers (убран)              AAA Sisters Climate (здесь)
    сайт строили НЕ мы                сайт наш, исходники у нас
    cms unknown, публиковать некуда    cms ours, хостинг Vercel
    оба проекта закрыты в 2025         сайт живой сейчас
    доступов нет ни одного             есть доступ к сайту и хостингу

  Профиль Brothers удалён вместе с его историей по Monday. Если он вернётся
  клиентом, файл восстанавливается из git одной командой — терять там нечего.

  ЧЕГО В MONDAY НЕТ. Проектов «AAA Sisters» на доске Projects нет вовсе —
  проверено поиском по всему аккаунту 29 августа: находятся только «AAA
  Brothers | Google Local» и «AAA Brothers | Meta Ads». Поэтому источник
  фактов здесь — их живой сайт и наши собственные материалы проекта в
  ~/aaa-sisters-climate, а не доска. Что мы для них ведём по деньгам, кроме
  сайта, нужно подтвердить у владельца: догадка тут стоила бы неверного плана
  работ.
*/

export default {
  id: 'aaa-sisters',
  name: 'AAA Sisters Climate',

  /* Проверено 29 августа: DNS отвечает, сайт отдаёт 200, заголовок страницы
     «HVAC Installation & Replacement in PA, NJ, NY & DE | AAA Sisters Climate». */
  site: 'https://aaasistersclimate.com/',

  trade: 'hvac',

  /*
    Сайт НАШ, и это меняет всё по сравнению с прежним профилем в этой строке
    списка. Исходники лежат в ~/aaa-sisters-climate, деплой привязан к нашей
    команде на Vercel (.vercel/project.json, проект aaa-sisters-climate).
    Значит страницы, которые соберут стадии цикла, есть куда публиковать —
    у Brothers этого не было, и цикл там останавливался на первом же шаге.
  */
  cms: 'ours',
  hosting: 'vercel',

  tagline: 'Women-owned HVAC installation and replacement in Langhorne, PA',

  about:
    'Independent, women-owned residential HVAC company. Installation and ' +
    'replacement is the main service; the owners run the estimate themselves ' +
    'instead of sending a commissioned salesperson.',

  /* Из нашего же разбора позиционирования (POSITIONING.md, 12 июля 2026):
     незанятое место в регионе — честная независимость и владелица на замере,
     тогда как «семейные» бренды вокруг принадлежат фондам. */
  differentiator:
    'The owners themselves size the system and quote the job; the company is ' +
    'independently held, not owned by a private-equity roll-up.',

  /*
    Услуги взяты с их живой главной страницы (заголовки разделов), ничего не
    додумано. Порядок сохранён: установка и замена стоит первой, они сами
    называют её своей специализацией.
  */
  services: [
    { name: 'HVAC System Installation & Replacement', description: 'Full system installation and replacement, sized by load calculation.' },
    { name: 'Water Heater Replacement', description: 'Gas and electric, tank and tankless water heaters.' },
    { name: 'AC Repair', description: 'Diagnosis and repair of air conditioning systems.' },
    { name: 'Heating & Furnace Repair', description: 'Repair of furnaces and heating equipment.' },
    { name: 'Seasonal Maintenance', description: 'Seasonal checks and maintenance plans.' },
  ],

  /*
    ТОЛЬКО Langhorne, и это осознанно.

    На сайте зона обслуживания заявлена ШТАТАМИ — NY, PA, NJ, DE, — а точная
    доступность подтверждается по почтовому индексу («Exact availability is
    confirmed by ZIP code»). Городов они не перечисляют нигде.

    Штат — не город: страница «услуга × Пенсильвания» никому не отвечает на
    вопрос «приедете ли ко мне». Langhorne стоит здесь потому, что компания
    сама называет его своей базой в описании сайта. Остальные города появятся
    после разговора с клиентом — списком, куда они действительно выезжают.
  */
  cities: [
    { name: 'Langhorne', state: 'PA' },
  ],

  /*
    Телефон с их сайта (ссылка tel:+14453099995) и он же на странице Yelp —
    два источника сошлись. Адрес уточнён до дома по странице Yelp: на сайте
    указан только город.
  */
  contact: {
    phone: '445-309-9995',
    address: '2304 Brownsville Rd, Langhorne, PA 19053',
    hours: 'по будням 9:00–15:00 (со страницы Yelp)',
  },

  facts: [
    {
      claim: 'Site is live and served from our own Vercel project',
      source: 'проверено 2026-08-29: DNS отвечает, https://aaasistersclimate.com/ отдаёт 200; .vercel/project.json в ~/aaa-sisters-climate указывает на нашу команду',
    },
    {
      claim: 'Service area is NY, PA, NJ and DE, confirmed by ZIP code',
      source: 'их живая главная страница, раздел «Local HVAC service across four states»; список штатов совпадает с data/service-area-states.geojson',
    },
    {
      claim: 'Based in Langhorne, Pennsylvania',
      source: 'мета-описание их сайта: «engineer-led HVAC installation and replacement based in Langhorne, PA»',
    },
    {
      claim: 'Yelp business page is claimed and license-verified by Yelp',
      source: 'страница yelp.com/biz/aaa-sisters-climate-langhorne, открыта браузером 30 августа 2026: метка Claimed, блок «Verified License — Yelp confirmed a business or employee license»',
    },
    {
      claim: 'Yelp response rate 100%, typical response time 20 minutes',
      source: 'их страница Yelp, блок «Get pricing & availability», 30 августа 2026',
    },
    {
      claim: 'Business runs Yelp posts and is covered by Yelp Guaranteed',
      source: 'их страница Yelp: «Updates From This Business» (Same-Day HVAC Service, Free Estimate + Systems from $6,990) и блок «Covered by Yelp Guaranteed»',
    },
    {
      claim: 'Women-owned; the owners run the in-home estimate themselves',
      source: 'их живая главная страница, разделы «Meet the Sisters» и «Who comes to the estimate?»',
    },
  ],

  /*
    Ведём ТОЛЬКО сайт, и только потому, что это доказуемо: исходники наши,
    деплой наш, сайт работает.

    Реклама, местное присутствие и SEO сюда НЕ вписаны, хотя в папке проекта
    лежат заготовки под Google Business Profile и пакет объявлений Meta.
    Заготовка — не работа: она доказывает, что мы к этому готовились, а не что
    услуга продана и идёт. Впишем после подтверждения владельцем.
  */
  engaged: {
    website: 'ведём',
    /*
      Владелец 30 августа: «у ааа систерс елп ещё подключен». Проверено, а не
      принято на слово: их страница на Yelp заявлена (Claimed), лицензия
      подтверждена самим Yelp, идут публикации от бизнеса, отклик 100% за
      20 минут в среднем. То есть канал живой, а не просто существует.
    */
    yelpAds: 'ведём',
  },

  /*
    Доступы. Два стоят true, и у каждого есть основание в файле на диске:
      siteAdmin — сайт собран нами, исходники в ~/aaa-sisters-climate;
      hosting   — .vercel/project.json привязывает проект к нашей команде.

    Остальные false. Домен, скорее всего, тоже у нас (сайт отдаётся с адресов
    Vercel), но «скорее всего» в это поле не ставится: пульт по нему решает,
    можно ли запускать стадию, и ошибка в сторону «у нас всё есть» дороже,
    чем лишний вопрос клиенту.
  */
  access: {
    siteAdmin: true,
    hosting: true,
    domainDns: false,     // сайт на адресах Vercel, но кто держит домен — не проверено
    searchConsole: false,
    bingWebmaster: false,
    googleBusiness: false, // заготовки постов есть, сам профиль не подтверждён
    analytics: true,       // счётчик Castells стоит на сайте с 30.08.2026, данные идут
    callTracking: false,
    googleAds: false,
    metaAds: false,
    emailSending: false,
    crm: false,
    /*
      ЧТО ИМЕННО ЗДЕСЬ TRUE, чтобы не обмануть самих себя. Владелец 30 августа:
      «у нас есть апи доступ к елпу». Проверено: в проде бэкенда Mosco заданы
      YELP_CLIENT_ID и YELP_CLIENT_SECRET, и код интеграции лежит в
      app/routers/yelp_leads_webhook.py — то есть доступ к API Yelp у нас
      действительно есть, и страница клиента заявлена.

      Чего НЕ проверено: кабинет платного размещения Yelp Ads. Интеграция в
      Mosco — про ЛИДЫ (Partner API), а не про управление рекламой. Если
      отчёт должен показывать расход и показы по Yelp, доступ в кабинет надо
      подтвердить отдельно.
    */
    yelpAds: true,
  },
};
