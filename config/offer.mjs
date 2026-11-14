/*
  Оффер Castells Media. ОДИН источник на весь сайт.

  Почему файл появился 14 ноября 2026. Владелец сменил позиционирование:
  мы больше не продаём отдельные услуги и разовые настройки («сайт от»,
  «настройка CRM от», «один канал»). Мы продаём одно: полное ведение
  маркетинга каждый месяц. Строим с нуля всё, чего у клиента нет, и дальше
  ведём всё сами.

  Решения владельца от 14 ноября 2026:
  1. Цена на сайте не публикуется, её называют на созвоне.
  2. Платы за запуск нет: сайт, кабинеты и CRM строятся в счёт месячной платы.
  3. Страницы отдельных услуг остаются, но описывают часть ведения, а не
     отдельную покупку.

  Состав ведения один и тот же на главной, на странице услуг, на странице
  «как считается цена», в описаниях для поиска и в файле для нейросетей.
  Чтобы он не разъехался так же, как когда-то разъехались цены и меню, все
  эти места читают его отсюда.

  Файл в формате .mjs по той же причине, что config/pricing.mjs: его читает и
  приложение в браузере, и генератор статических страниц в Node.

  ЧТО СЮДА НЕ КЛАДЁМ. Сроки, проценты, число заявок и любые обещания
  результата. Здесь только то, что мы делаем, и условия, которые подтвердил
  владелец.
*/

/** Одной строкой: что мы продаём. */
export const OFFER = {
  name: 'Full-service marketing',
  line: 'One team runs all of your marketing, every month.',
  audience: 'HVAC, plumbing, appliance repair and remodeling companies',
  /** Что стоит под заголовком первого экрана и в описании для поиска. */
  summary:
    'Website, ads on Google and Meta, local profiles, follow-up and reporting. ' +
    'We build what is missing from zero and then run all of it every month, so you can stay on the job.',
};

/**
 * Четыре части ведения. Это НЕ отдельные продукты: клиент получает все
 * четыре. Поле slugs называет страницы из data/services.ts, где часть
 * разобрана подробно.
 */
export const OFFER_PARTS = [
  {
    id: 'found',
    slugs: ['web-development', 'landing-pages', 'seo-content', 'brand-identity'],
    title: 'People find you',
    short: 'Website and local profiles',
    promise:
      'We build your website and your Google and Yelp profiles, then keep them current, so a search in your city leads to you.',
    includes: [
      'Website and landing pages, built and kept up to date',
      'Google Business Profile and Yelp profile',
      'Local search pages for your services and cities',
      'Logo, colours and templates when you need them',
    ],
    forYou: 'someone two blocks away searches for your service and finds someone else',
  },
  {
    id: 'ads',
    slugs: ['google-ads-ppc', 'meta-ads'],
    title: 'Ads bring calls',
    short: 'Google, Meta and Yelp ads',
    promise:
      'Google, Meta and Yelp ads for your service area, built by us and checked every week, not launched once and left alone.',
    includes: [
      'Google Ads',
      'Meta Ads (Facebook, Instagram)',
      'Yelp Ads',
      'Ad texts, images and video edits from your job footage',
    ],
    forYou: 'the phone goes quiet out of season and you just wait it out',
  },
  {
    id: 'follow-up',
    slugs: ['crm-pipelines', 'workflow-automation', 'field-ops'],
    title: 'No request gets lost',
    short: 'CRM and follow-up',
    promise:
      'Calls, forms and messages land in one place, and every one of them gets an answer and a follow-up.',
    includes: [
      'CRM on our own platform, Mosco',
      'Calls, forms and messages in one inbox',
      'Follow-up reminders after a call or an estimate',
      'Asking for reviews and answering them',
    ],
    forYou: 'a missed call means a lost job and nobody calls back',
  },
  {
    id: 'numbers',
    slugs: ['advanced-tracking'],
    title: 'You see what it brings',
    short: 'Tracking and a weekly report',
    promise:
      'One report covers every channel, so you see where the calls came from without logging in anywhere.',
    includes: [
      'Call and form tracking',
      'A weekly report in plain numbers',
      'One plan for all channels, adjusted as we learn',
      'You talk to the person doing the work',
    ],
    forYou: 'you pay for marketing every month and cannot say what it brought',
  },
];

/** Условия. Каждое подтверждено владельцем. */
export const OFFER_TERMS = [
  {
    title: 'One monthly fee',
    text: 'One fee covers all of the work. We name it on the first call, once we know your trade, your city and what you already have.',
  },
  {
    title: 'No setup fee',
    text: 'The website, the ad accounts and the CRM are built as part of the monthly work, not billed as separate projects.',
  },
  {
    title: 'Month to month',
    text: 'No contract and no minimum term. If you want to stop, you stop: no notice period, no cancellation fee.',
  },
  {
    title: 'Everything is yours',
    text: 'The website, the domain, the ad accounts and the customer list are in your name from day one, and they stay with you.',
  },
  {
    title: 'Ad budget is separate',
    text: 'It goes straight from your card to Google, Meta and Yelp. You see every dollar in your own account, and we never take a cut of it.',
  },
];

/** Как начинается работа. Без сроков: срок зависит от того, что уже есть. */
export const OFFER_STEPS = [
  {
    title: 'A call',
    text: 'We look at your trade, your city and what you already have: site, profiles, ads, how requests get answered.',
  },
  {
    title: 'A plan and one price',
    text: 'We say what we would build first, what we would run, and what the monthly fee is. You hear all of it before you pay anything.',
  },
  {
    title: 'We build what is missing',
    text: 'Website, profiles, ad accounts, tracking and CRM. All of it in your name, all of it inside the monthly fee.',
  },
  {
    title: 'We run it every month',
    text: 'Ads, site, profiles, follow-up and reviews stay with us. You get a report every week and keep doing the jobs.',
  },
];

/** Готовое предложение об условиях для описаний страниц и текстов. */
export const TERMS_SENTENCE =
  'One monthly fee, named on the first call. No setup fee, no contract. ' +
  'The ad budget goes straight to Google, Meta and Yelp.';

/** Короткий список частей одной строкой — для описаний и файла для нейросетей. */
export const PARTS_SENTENCE =
  'website and local profiles, ads on Google, Meta and Yelp, CRM and follow-up, tracking and weekly reporting';
