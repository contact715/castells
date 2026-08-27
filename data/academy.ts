import { PRICES } from '../config/pricing.mjs';

/*
  Академия для подрядчиков. Заведена 26 августа 2026 по решению владельца:
  раздел на сайте, статьи простым текстом, адрес academy.castells.media.

  ОТКУДА БЕРЁТСЯ СОДЕРЖАНИЕ. Структура модулей — из docs/ACADEMY_DRAFT.md,
  который собран из брифа владельца и разделов клиентского предложения. Тексты
  уроков написаны из того, что мы делаем сами: как строим сайты, как ведём
  рекламу, как настраиваем обработку заявок.

  ЧЕГО ЗДЕСЬ НЕТ И НЕ БУДЕТ. Цифр результата: ни процентов роста, ни средних
  по рынку, ни «клиенты обычно получают». Подтверждённых замеров у нас нет, а
  выдуманное число на учебной странице хуже отсутствующего — по нему человек
  примет решение о своих деньгах. Проверяемые числа тут только одного рода:
  наши собственные опубликованные цены, и они берутся из config/pricing.mjs,
  а не переписываются сюда.

  Юридических советов тоже нет. Про регистрацию и лицензии написано, КАКОЕ
  решение предстоит принять и на что оно влияет, а не «делайте так»: правила
  различаются по штатам и меняются, а мы не юристы.

  Модуль 7 из черновика («базовые основы») здесь отсутствует: владелец не
  уточнил, что в него входит, а придумывать содержание учебной программы
  нельзя.
*/

/*
  РАЗДЕЛЫ ПО РЕМЕСЛУ, заведены 26 августа 2026 по решению владельца: «разделение
  на констракшен, хвак и прочее, а курс для контрактора уже в разделе
  контрактор, и там всё, что касается этой ниши, от и до».

  Названия взяты так, как подрядчики называют СЕБЯ, а не по внутренней
  разбивке сайта. У нас ниши сгруппированы в четыре категории (Construction,
  Home Services, Automotive, Professional), и HVAC там внутри Home Services.
  Но человек, который ставит кондиционеры, ищет курс для HVAC, а не для
  «домашних услуг», поэтому HVAC вынесен отдельным разделом.

  СОДЕРЖАНИЕ СЕГОДНЯ ЕСТЬ ОДНО, и это названо вслух на самой странице. Раздел
  без уроков показывается с пометкой, а не прячется: спрятанный раздел создаёт
  впечатление, что программа перед вами целиком.
*/
export interface AcademyTrack {
  slug: string;
  name: string;
  /** Кому этот раздел, одной строкой. */
  about: string;
}

export const ACADEMY_TRACKS: AcademyTrack[] = [
  {
    slug: 'contractors',
    name: 'General contractors',
    about: 'The foundation every trade needs: setting the business up, getting found, and not losing the work you already have.',
  },
  {
    slug: 'hvac',
    name: 'HVAC',
    about: 'Heating and air conditioning: seasonal demand, emergency calls, and maintenance plans.',
  },
  {
    slug: 'remodeling',
    name: 'Remodeling and construction',
    about: 'Kitchens, bathrooms, additions, roofing: long sales cycles and large tickets.',
  },
  {
    slug: 'automotive',
    name: 'Automotive services',
    about: 'Detailing, wraps, tint, ceramic coating: a shop with a physical location and repeat customers.',
  },
  {
    slug: 'professional',
    name: 'Professional services',
    about: 'Insurance, legal, consulting, financial planning, med spas: licensed practices selling trust.',
  },
];

export const findTrack = (slug?: string) => ACADEMY_TRACKS.find((t) => t.slug === slug);

export interface AcademySection {
  heading: string;
  body: string[];
}

export interface AcademyLesson {
  slug: string;
  /** Раздел по ремеслу, к которому относится урок. */
  track: string;
  /** Номер модуля, к которому относится урок. */
  module: number;
  /** Заголовок урока — он же заголовок страницы. */
  title: string;
  /** Короткое описание: идёт на карточку и в описание для поиска. */
  summary: string;
  sections: AcademySection[];
  /**
   * Заглавное изображение. Файл в public/academy, рисуется
   * scripts/make-academy-images.mjs. Подпись обязательна: картинка без
   * подписи для читалки экрана — пустое место.
   */
  image?: { src: string; alt: string };
  /**
   * Схема к уроку, из components/ui/AcademyDiagram.tsx. Ставится ТОЛЬКО если
   * добавляет к тексту то, чего в нём нет. Украшение, которое надо
   * разглядывать, хуже пустого места.
   */
  diagram?: string;
  /**
   * Пример из НАШЕЙ практики. Только проверяемое: живой сайт клиента, город,
   * ремесло. Ни цифр результата, ни «клиент получил рост»: подтверждённых
   * замеров у нас нет, а на учебной странице выдуманное число опаснее всего.
   * Оба адреса проверены 26 августа 2026, оба отвечают 200.
   */
  ourWork?: string;
  /**
   * Счёт: арифметика урока на числах.
   *
   * ЭТО НЕ СТАТИСТИКА И НЕ ОБЕЩАНИЕ. Все числа здесь либо НАШИ опубликованные
   * цены, либо явно названные примерными, чтобы читатель подставил свои. На
   * странице так и написано. Придумать «средний подрядчик получает X» нельзя:
   * замеров у нас нет, а на учебной странице выдуманное число опаснее всего —
   * по нему человек примет решение о своих деньгах.
   *
   * Показывать формулу с примерными числами честно и полезно: так учат считать.
   * Выдавать пример за среднее по рынку — нет.
   */
  numbers?: {
    title: string;
    /** Строки расчёта: что берём и откуда. */
    rows: { label: string; value: string }[];
    /** Итог расчёта. */
    result: { label: string; value: string };
    /** Что это число означает и что с ним делать. */
    after: string;
  };
  /** Что сделать после чтения. Одно действие, а не список пожеланий. */
  takeaway: string;
}

export interface AcademyModule {
  number: number;
  name: string;
  /** О чём модуль, одной строкой. */
  about: string;
}

export const ACADEMY_MODULES: AcademyModule[] = [
  {
    number: 1,
    name: 'Starting the business',
    about: 'The decisions you make before marketing can do anything for you.',
  },
  {
    number: 2,
    name: 'Brand and identity',
    about: 'What makes people recognize you on the second look.',
  },
  {
    number: 3,
    name: 'The website',
    about: 'Three kinds of site, and which one your business actually needs.',
  },
  {
    number: 4,
    name: 'Marketing basics',
    about: 'Where the money goes and what each part is supposed to do.',
  },
  {
    number: 5,
    name: 'Getting found',
    about: 'How people look for a contractor, in the order it actually happens.',
  },
  {
    number: 6,
    name: 'Sales and follow-up',
    about: 'The work that turns a phone call into a paid job.',
  },
];

export const ACADEMY_LESSONS: AcademyLesson[] = [
  {
    slug: 'before-you-spend-on-marketing',
    track: 'contractors',
    module: 1,
    title: 'What has to be in place before marketing can work',
    summary:
      'Marketing sends people to your business. If the business is not ready to receive them, the money goes out and nothing comes back. Here is the short list of what has to exist first.',
    image: {
      src: '/academy/before-you-spend-on-marketing.webp',
      alt: 'A bare foundation slab with a single marker stake, nothing built on it yet',
    },
    diagram: 'six-things',
    sections: [
      {
        heading: 'Marketing does not fix a business that is not set up',
        body: [
          'Advertising is a multiplier. It takes whatever your business already does and does more of it, faster. If a customer calls and nobody picks up, advertising buys you more missed calls. If your license is not current, advertising buys you more people who check and walk away.',
          'That is why the first module is not about marketing at all. It is about the things that have to be true before spending on ads makes any sense.',
        ],
      },
      {
        heading: 'The legal form you register under',
        body: [
          'Sole proprietor, LLC, corporation. The choice changes three things: what happens to your personal assets if a job goes wrong, how you file taxes, and how easy it is to bring on a partner or sell later.',
          'We are not lawyers and the rules differ by state, so we will not tell you which to pick. What we will say is that this is one of the few decisions that is expensive to reverse, and it is worth an hour with an accountant before you register rather than after.',
        ],
      },
      {
        heading: 'The license, and why customers check it',
        body: [
          'Most trades need a state license to work legally above a certain job size. In California that is the CSLB. Other states have their own board. Look it up directly rather than trusting a summary, including this one, because requirements change.',
          'The reason this belongs in a marketing course: your license number is a trust signal. Customers comparing three quotes will check the number on the state site. A contractor whose license is current and searchable wins that comparison against one who left it off the website.',
        ],
      },
      {
        heading: 'Insurance',
        body: [
          'General liability, and workers comp if you have employees. Some commercial clients will not accept a bid without a certificate. Some ad platforms and lead marketplaces ask for it too.',
          'It is what decides whether one bad day ends the business or is just a bad day.',
        ],
      },
      {
        heading: 'A phone number and an email that belong to the business',
        body: [
          'Not your personal cell as the only line, and not a free email address at the domain of your email provider. Two reasons, one practical and one about how you are seen.',
          'The practical one: a business number can be forwarded, recorded, tracked, and handed to whoever is on call. A personal cell cannot be handed over without handing over your phone.',
          'The other one: an estimate that arrives from a business address at your own domain reads differently from one that arrives from a free mailbox. It costs very little and it is visible on every single message you send for the rest of the business.',
        ],
      },
      {
        heading: 'A place for the money to be counted',
        body: [
          'A separate business bank account, from day one. Mixing personal and business money makes taxes painful and makes it impossible to answer the question that decides every marketing budget: what did a job actually cost me, and what did I keep.',
          'You cannot decide whether advertising is working if you cannot tell what a job is worth.',
        ],
      },
    ],
    numbers: {
      title: 'What one missed call costs',
      rows: [
        { label: 'Your average job, before costs', value: 'say $600' },
        { label: 'Calls you miss in a week', value: 'say 3' },
        { label: 'Of those, how many would have booked', value: 'say 1' },
      ],
      result: { label: 'One booked job a week, not taken', value: '$600 × 52 = $31,200 a year' },
      after:
        'Put your own three numbers in. Whatever comes out is what you are paying, every year, for a phone nobody answers — before you have spent a dollar on advertising.',
    },
    takeaway:
      'Before you budget a dollar for ads, check the six things above. If any is missing, fix that first. It will make every dollar after it work harder.',
  },
  {
    slug: 'what-a-brand-is-for-a-contractor',
    track: 'contractors',
    module: 2,
    title: 'What a brand actually is for a contractor',
    summary:
      'A brand is not a logo. For a home service business it is the set of things that make a stranger recognize you on the second encounter and remember you on the third.',
    image: {
      src: '/academy/what-a-brand-is-for-a-contractor.webp',
      alt: 'Three identical shapes at different angles gradually lining up into one',
    },
    diagram: 'three-encounters',
    sections: [
      {
        heading: 'The job a brand does',
        body: [
          'Almost nobody hires a contractor the first time they see the name. They see the truck on a street, then the yard sign at a neighbor house, then the search result, and by then the name is familiar enough to call.',
          'A brand is what makes those three encounters add up to one memory instead of staying three strangers. That is the whole job. Everything else is decoration.',
        ],
      },
      {
        heading: 'What it is made of, in order of how much it matters',
        body: [
          'The name, spelled and used the same way everywhere. If the truck says one thing, the invoice another, and the Google listing a third, the three encounters never join up.',
          'One color that is yours. Not a palette of six. One color that shows up on the truck, the shirt, the yard sign, the website button, the estimate. Colors are how people recognize things before they read them.',
          'A logo that survives being small and being one color. It will be embroidered on a shirt, printed on a magnet, and shown at the size of a thumbnail in a search result. A logo that only looks right at full size on a white background is a logo that will not be seen.',
          'Photographs of your own work. This is the part contractors skip and it is the part that does the most. Stock photos of somebody else kitchen tell a customer nothing about you.',
        ],
      },
      {
        heading: 'Consistency beats cleverness',
        body: [
          'A plain name used identically in twelve places will outperform a clever name used four different ways. The reason is boring: recognition is a memory task, and memory rewards repetition, not wit.',
          'This is also why changing your look every two years is expensive in a way that does not show up on any invoice. You are resetting the count each time.',
        ],
      },
      {
        heading: 'What we actually produce when a client asks for identity',
        body: [
          'A logo in the formats it will really be used in, including one-color and small. A color and a typeface with the rule for where each goes. A basic set of applications: truck, shirt, yard sign, estimate, website header.',
          'The point of the last part is that identity that only exists as a file is not identity. It becomes identity when it is on the things a customer sees.',
        ],
      },
    ],
    ourWork:
      'Open acromanservice.com and fivestarcomfort.com. Both are sites we built, and on both the business name is spelled the same way in the header, the page title and the footer. That sounds too obvious to mention until you check your own five places and find three spellings.',
    numbers: {
      title: 'The five-places count',
      rows: [
        { label: 'Truck or van', value: 'match / does not' },
        { label: 'Invoice or estimate', value: 'match / does not' },
        { label: 'Google Business Profile', value: 'match / does not' },
        { label: 'Website header', value: 'match / does not' },
        { label: 'Shirt, card or yard sign', value: 'match / does not' },
      ],
      result: { label: 'Your score', value: 'out of 5' },
      after:
        'Count the places where the name is spelled and styled identically. Anything under five means a customer who saw you twice may not know it was twice. This is the cheapest number on this page to fix.',
    },
    takeaway:
      'Open the last five places your business name appears: truck, invoice, Google listing, website, a shirt. If they do not match, that is the first job, before any new design.',
  },
  {
    slug: 'three-kinds-of-website',
    track: 'contractors',
    module: 3,
    title: 'Three kinds of website, and which one you need',
    summary:
      'A one-page card, a landing page built for ads, and a full site built to be found in search. They cost different amounts because they do different jobs, not because one is a better version of another.',
    image: {
      src: '/academy/three-kinds-of-website.webp',
      alt: 'Three panels of increasing height and detail, side by side',
    },
    diagram: 'three-sites',
    sections: [
      {
        heading: 'The one-page card',
        body: [
          'What you do, where you work, a phone number, a few photos of your own jobs, and the license number. One screen of scrolling.',
          'It is for the customer who already has your name, from a neighbor or a truck or a yard sign, and is checking that you are real before calling. That is a large share of how home service work is actually won, and this page does that job completely.',
          'What it cannot do: bring you people who have never heard of you. It is not built to rank in search and it is not built to convert paid traffic.',
        ],
      },
      {
        heading: 'The landing page for ads',
        body: [
          'One service, one area, one action. No menu to wander off into. Everything on the page exists to get the visitor to call or submit the form.',
          'This is what paid traffic should land on. Sending ad clicks to a homepage is the most common and most expensive mistake we see: you paid for the click, then gave the visitor six other things to click instead.',
          'What it cannot do: represent the whole business. It deliberately hides most of what you offer.',
        ],
      },
      {
        heading: 'The full site built to be found',
        body: [
          'A page for each service, a page for each area you serve, real project pages, and the writing to support them. This is the one that earns search traffic over months rather than buying it by the click.',
          'It is slower and it costs more, and it is the only one of the three that keeps working after you stop paying.',
          'What it cannot do: produce results next week. Search is a patient channel. If you need the phone to ring this month, that is the landing page and paid traffic, and the full site is what you build alongside it.',
        ],
      },
      {
        heading: 'What all three need',
        body: [
          'The phone number visible without scrolling, and tappable on a phone. Most home service traffic is on a phone, often standing in the problem.',
          'What you do and where, in words a person would actually search. Not "comprehensive residential solutions". "AC repair in Roseville".',
          'Proof: your own photos, your license number, your real reviews if you have them. If you have none of these yet, say less rather than making something up. A thin honest page outperforms a padded one, because the padding is recognizable.',
        ],
      },
      {
        heading: 'How to choose',
        body: [
          'If the phone rings from word of mouth and you need people to check you out: the card.',
          'If you are about to spend on ads: the landing page, before the ads, not after.',
          'If you want the phone to ring in a year without paying per click: the full site, and start now, because the clock is the expensive part.',
        ],
      },
    ],
    ourWork:
      'Two of ours are live if you want to see the third kind up close: acromanservice.com for Roman Service, an HVAC company in North Port, Florida, and fivestarcomfort.com for a heating and air conditioning business in Bothell, Washington. Both have pages for individual services rather than one page listing everything, which is what makes them findable in search.',
    numbers: {
      title: 'How many jobs pay for a site',
      rows: [
        { label: 'Our published price for a website', value: `from ${PRICES.websiteFrom}, one time` },
        { label: 'Your average job, before costs', value: 'say $600' },
        { label: 'What you keep from a job', value: 'say a third, $200' },
      ],
      result: { label: 'Jobs needed to cover the site', value: `${PRICES.websiteFrom} ÷ $200 ≈ 9` },
      after:
        'Nine jobs across the life of the site, and a site lives for years. The price is on our prices page, so this line can be checked. The other two numbers are yours to fill in.',
    },
    takeaway:
      'Decide which of the three jobs you need done this quarter, and build only that one. Building all three at once is how a website takes eight months and launches wrong.',
  },
  {
    slug: 'where-the-marketing-money-goes',
    track: 'contractors',
    module: 4,
    title: 'Where the marketing money actually goes',
    summary:
      'Two different kinds of cost get called "marketing budget" and confusing them is why owners cannot tell whether it is working. Here is the split, and what each part is supposed to buy.',
    image: {
      src: '/academy/where-the-marketing-money-goes.webp',
      alt: 'Two horizontal bars: the upper one widens from left to right, the lower one stays the same thickness',
    },
    diagram: 'two-costs',
    sections: [
      {
        heading: 'Two costs, not one',
        body: [
          'The first is the ad budget: money you hand to Google, Meta or Yelp, which they turn into clicks or impressions. It scales with how much you want.',
          'The second is the work: someone builds the pages, writes the ads, watches what happens, and changes it. That cost is roughly flat whether you spend five hundred a month on ads or five thousand.',
          'They should be billed separately and visibly. When they are bundled into one number, you cannot tell whether a bad month was a bad ad budget or bad work. Neither can whoever you hired.',
        ],
      },
      {
        heading: 'Who should own the ad account',
        body: [
          'You. The account should be in your name, with your billing, and whoever runs it gets access to it.',
          'The account holds the history: which keywords converted, which audiences worked, what a lead cost across two years. That history is worth more than any single month of management. If the account belongs to the agency, you start from zero when you leave, and the cost of leaving is exactly what keeps people in bad arrangements.',
          'This is our own rule and we apply it to our own clients. We have written about it separately in the notes.',
        ],
      },
      {
        heading: 'The three things marketing has to do, in order',
        body: [
          'Get found: be present where someone is already looking for what you do.',
          'Get contacted: make it obvious and easy to call, and give enough reason to.',
          'Get booked: answer, quote, and follow up until it is a yes or a no.',
          'Money spent on the first while the third is broken is money burned. This is the most common way a marketing budget produces nothing while every report looks fine.',
        ],
      },
      {
        heading: 'Why "leads" alone is the wrong number',
        body: [
          'A lead count can be moved by lowering quality. Broader keywords, looser targeting, a form with fewer fields. All of them produce more leads and can produce less work.',
          'The numbers worth watching are further down: how many leads turned into booked jobs, and what those jobs were worth. That requires knowing what happened after the phone rang, which is the subject of module 6.',
        ],
      },
      {
        heading: 'What a budget cannot buy',
        body: [
          'Speed in a channel that is slow. Search rankings take months regardless of spend.',
          'A fix for a business that cannot take the work. If you are already booked out four weeks, more leads mostly produce annoyed strangers.',
          'A guarantee. Anybody promising a specific number of jobs for a specific spend is either guessing or has found a way to count something other than jobs.',
        ],
      },
    ],
    numbers: {
      title: 'What a booked job actually cost you',
      rows: [
        { label: 'Ad budget last month', value: 'say $1,000' },
        { label: 'What you paid for the work', value: `our plans start at ${PRICES.monthlyOneChannel}` },
        { label: 'Jobs booked from it', value: 'say 4' },
      ],
      result: { label: 'Cost per booked job', value: `($1,000 + ${PRICES.monthlyOneChannel}) ÷ 4 ≈ $398` },
      after:
        'Compare that with what you keep from a job. If a job leaves you $200, this month lost money; if it leaves you $900, it made money. That single comparison decides the budget, and almost nobody runs it.',
    },
    takeaway:
      'Ask whoever runs your marketing for two separate numbers this month: what went to the platforms, and what went to the work. If they cannot separate them, that is the first thing to fix.',
  },
  {
    slug: 'how-people-find-a-contractor',
    track: 'contractors',
    module: 5,
    title: 'How people actually find a contractor',
    summary:
      'The channels in the order they matter for home service work, what each one costs in money and in time, and which to set up first.',
    image: {
      src: '/academy/how-people-find-a-contractor.webp',
      alt: 'Several paths of different lengths converging on a single house shape',
    },
    diagram: 'channels',
    sections: [
      {
        heading: 'Someone they know',
        body: [
          'Referrals and repeat customers are still the largest source of work for most home service businesses, and they cost nothing per job.',
          'They are also the channel owners neglect, because there is nothing to buy. What there is to do: ask, at the moment the customer is happiest, which is when the job is finished and works. And make it easy to pass your name along with a card left behind, a magnet, a yard sign.',
        ],
      },
      {
        heading: 'The map',
        body: [
          'When someone searches a service plus a place, the map results sit above everything else. Being in them is free and it is the single highest-value unpaid thing a local business can do.',
          'It needs a Google Business Profile that is claimed, verified, and complete: the categories right, the service area right, hours correct, and photos that are yours. Reviews matter here more than anywhere else, and they are the reason to ask every finished customer.',
          'If you do one thing after reading this course, do this one.',
        ],
      },
      {
        heading: 'Search, paid',
        body: [
          'Ads on searches like "water heater repair near me". The person is looking for exactly what you sell, right now. That is why it is the most expensive click and often the most valuable one.',
          'It turns on immediately and stops immediately. Useful when you need work this month, or to fill a slow season.',
          'It needs the landing page from module 3. Paid clicks landing on a general homepage is where most of a small budget disappears.',
        ],
      },
      {
        heading: 'Search, unpaid',
        body: [
          'Pages that rank on their own for the services and areas you cover. Slow to build, and it keeps working when you stop paying.',
          'This is the channel that rewards starting early and punishes starting late, because the delay is fixed and does not shorten with budget.',
        ],
      },
      {
        heading: 'Social and marketplaces',
        body: [
          'Paid social reaches people who were not looking. It works better for jobs people can be talked into, like remodels and upgrades, than for emergencies.',
          'Lead marketplaces sell the same lead to several contractors. That can be worth it when you are starting and have capacity to fill, and it gets expensive once you are established, because you are competing on speed and price with everyone else who bought the same name.',
        ],
      },
      {
        heading: 'What to do first',
        body: [
          'Claim and complete the Google Business Profile. Ask your last ten finished customers for a review.',
          'Then, if you need work sooner than search can deliver, a landing page and a small paid search budget in your actual service area.',
          'Then the slower work: real pages for your services and areas.',
        ],
      },
    ],
    ourWork:
      'Our own clients are spread across HVAC in Florida and Washington, appliance repair and automotive work in California and Oregon, and remodeling in Florida. The mix of channels that works is not the same in a Los Angeles suburb and a small Florida town, and the only way to know which is yours is to search your own service in your own city and look at what comes up.',
    numbers: {
      title: 'What each channel charges you for',
      rows: [
        { label: 'Referrals and repeat customers', value: 'nothing per job' },
        { label: 'Google Business Profile', value: 'nothing, takes an hour to set up' },
        { label: 'Paid search', value: 'per click, whether or not they call' },
        { label: 'Paid social', value: 'per view or per click' },
        { label: 'Lead marketplaces', value: 'per lead, shared with competitors' },
      ],
      result: { label: 'The only two that cost nothing per job', value: 'the first two' },
      after:
        'This is the structure, not the price: what a click costs depends on your trade and your city, and anybody quoting you a single number for that is guessing. Start with the two that charge nothing.',
    },
    takeaway:
      'Open Google and search your main service plus your city, on a phone, not a computer. Whatever you see above the regular results is where your next customer is looking. Start there.',
  },
  {
    slug: 'the-job-you-lose',
    track: 'contractors',
    module: 6,
    title: 'The job you lose is usually the one nobody called back',
    summary:
      'Most lost work is not lost to a competitor with better prices. It is lost between the phone ringing and someone following up. This is the part of marketing that costs nothing and is skipped most.',
    image: {
      src: '/academy/the-job-you-lose.webp',
      alt: 'A row of evenly spaced dots with one missing, the row fading after the gap',
    },
    diagram: 'follow-up',
    sections: [
      {
        heading: 'The gap where jobs disappear',
        body: [
          'A customer with a problem calls three contractors. The one who answers, or calls back first, has an advantage that price often cannot overcome, because the customer wants the problem gone more than they want to shop.',
          'You are on a roof. You cannot answer. That is not the failure. The failure is that nothing happened afterward.',
        ],
      },
      {
        heading: 'Who answers when you cannot',
        body: [
          'The options, cheapest first: a voicemail that says when you will call back and actually gets checked; a family member or office person; an answering service; an automated first response by text.',
          'Any of them beats a phone ringing out. What matters is that the customer gets an acknowledgment within minutes and a real human within hours.',
        ],
      },
      {
        heading: 'One place where every request lives',
        body: [
          'Calls, texts, form submissions, marketplace leads. They arrive in four different places and that is why they get lost. Pick one place where every one of them is written down.',
          'It can start as a notebook. It works better as a simple CRM, because a CRM can remind you, and a notebook cannot.',
          'What it needs to hold: who, what they want, when they contacted you, what you said last, and what happens next with a date. Five fields. Anything more elaborate than that will not get filled in on a Tuesday.',
        ],
      },
      {
        heading: 'Follow-up is where the money is',
        body: [
          'A quote sent and never mentioned again is a quote the customer forgot about. Not rejected. Forgotten. Those are different, and the second one is recoverable.',
          'A simple rhythm most owners can keep: follow up the day after the quote, again about a week later, and once more a few weeks after that. Then stop. Three touches, politely, and then it is a no and you move on.',
          'None of this is interesting work. It is also the cheapest work in this course, because those customers are already yours and already interested.',
        ],
      },
      {
        heading: 'What to measure',
        body: [
          'How many requests came in, how many you answered within an hour, how many became a quote, and how many became a job.',
          'You will learn more from those four numbers than from any advertising report, because they tell you whether the problem is that not enough people are calling or that the calls are not turning into work. Those two problems have opposite solutions, and spending on the wrong one is the most expensive mistake in small business marketing.',
        ],
      },
    ],
    numbers: {
      title: 'The four numbers worth counting',
      rows: [
        { label: 'Requests that came in last month', value: 'say 20' },
        { label: 'Answered within an hour', value: 'say 12' },
        { label: 'Turned into a quote', value: 'say 10' },
        { label: 'Turned into a job', value: 'say 3' },
      ],
      result: { label: 'Quotes sent and never followed up', value: '10 − 3 = 7 to chase' },
      after:
        'Two problems live in these four numbers and they have opposite fixes. If few requests come in, spend on being found. If plenty come in and few become jobs, spending more is throwing money at the wrong end. Count yours before deciding.',
    },
    takeaway:
      'Look at every request you got in the last two weeks and mark which ones you never replied to again. That number is your cheapest source of new work.',
  },
  {
    slug: 'hvac-what-you-need-before-the-first-call',
    track: 'hvac',
    module: 1,
    title: 'What an HVAC business needs before the first call',
    summary:
      'Two licences, one of them federal, and a cash cycle that punishes anyone who plans for an average month. This is what has to be true before advertising can do anything for you.',
    image: {
      src: '/academy/hvac-what-you-need-before-the-first-call.webp',
      alt: 'Twelve bars for a year, two of them far taller than the rest',
    },
    diagram: 'six-things',
    sections: [
      {
        heading: 'The federal one people forget',
        body: [
          'Anyone who buys, handles or disposes of refrigerant needs EPA Section 608 certification. It is federal, it does not expire, and it is separate from whatever your state requires. Type II covers high-pressure systems, which is most residential air conditioning; Universal covers all of them.',
          'Check the current requirement on the EPA site itself rather than trusting a summary, including this one. Rules change and we are not the authority on them.',
        ],
      },
      {
        heading: 'The state one, which is where the money is',
        body: [
          'Most states also license HVAC contractors, usually above a job-size threshold, and the licence number is what a customer types into the state lookup while deciding between you and two others.',
          'This matters more in HVAC than in most trades because the jobs are large and the customer is often replacing a system that cost thousands. They check. Put the number on the site, on the estimate, and in the Google profile.',
        ],
      },
      {
        heading: 'The cash cycle nobody warns you about',
        body: [
          'HVAC does not earn evenly. The first hot week and the first cold week produce more calls than the six weeks before them combined, and the shoulder seasons are quiet.',
          'That means a business planned around an average month runs out of money in April and turns down work in July because it cannot staff up fast enough. The planning unit in this trade is the year, not the month.',
          'Everything in module 6 about maintenance plans exists because of this paragraph: they are the part of the revenue that does not care what the weather did.',
        ],
      },
      {
        heading: 'The rest of the list',
        body: [
          'General liability and workers comp, because you are working in people homes with equipment that can flood a basement.',
          'A business number that can be forwarded and answered by someone other than you, because in this trade the calls arrive when you are on a roof in August.',
          'A separate bank account, so that when you decide whether an advertising month worked you can actually tell what a job left you.',
        ],
      },
    ],
    numbers: {
      title: 'What a seasonal year does to a monthly plan',
      rows: [
        { label: 'What you expect in an average month', value: 'say $40,000' },
        { label: 'What the two peak months do', value: 'say $80,000 each' },
        { label: 'What the four quiet months do', value: 'say $15,000 each' },
      ],
      result: { label: 'Two months carry the year', value: '$160,000 of $480,000, a third' },
      after:
        'Put your own months in. If a third of the year arrives in two months, the question is not how to spend evenly, it is how to be visible before the peak and how to earn something during the quiet part. That is the whole marketing problem in this trade.',
    },
    ourWork:
      'Two HVAC sites we built are live right now: acromanservice.com for Roman Service in North Port, Florida, and fivestarcomfort.com in Bothell, Washington. Two very different climates, and the seasonal shape of the business is the first thing that differs between them.',
    takeaway:
      'Write down your last twelve months by month, from the bank account, not from memory. Everything else in this course is easier once you can see the shape of your own year.',
  },
  {
    slug: 'hvac-the-van-is-the-billboard',
    track: 'hvac',
    module: 2,
    title: 'In HVAC the van is the billboard',
    summary:
      'Your van parks in a driveway for three hours, in the exact neighbourhood where you want the next job. No other trade gets an advertising surface that well targeted, and most waste it.',
    image: {
      src: '/academy/hvac-the-van-is-the-billboard.webp',
      alt: 'A service van parked in a driveway with houses behind it',
    },
    diagram: 'three-encounters',
    sections: [
      {
        heading: 'Why the van matters more here than elsewhere',
        body: [
          'An HVAC call is not fifteen minutes. A repair is hours, an install can be a full day, and the whole time the van sits in a driveway in a neighbourhood of houses with systems of the same age, installed by the same builder, failing on roughly the same schedule.',
          'The neighbours see it. Some of them are two months from the same problem. That is a targeted advertisement that you are already paying for, and it costs nothing extra to make it work.',
        ],
      },
      {
        heading: 'What has to be on it',
        body: [
          'The phone number, big enough to read from across a street. This is the most common mistake: beautiful wrap, phone number in small type near the wheel arch.',
          'What you do, in words, not just a logo. "Heating and air conditioning" reads at a glance; a stylised flame does not.',
          'The licence number, because it is required in some states and because it signals the same thing to a neighbour that it signals on the website.',
        ],
      },
      {
        heading: 'The rest of the surface',
        body: [
          'A shirt with the same name and the same colour as the van. A customer who lets a stranger into the house is looking for exactly one thing at the door: that this person matches the company they called.',
          'Shoe covers and a floor mat. This is not decoration, it is the detail people mention in reviews, and reviews are how the next customer chooses you.',
          'A yard sign after an install, if the customer agrees. The system is now invisible; the sign is the only evidence that the work happened at all.',
        ],
      },
    ],
    numbers: {
      title: 'The five-surface count',
      rows: [
        { label: 'Van', value: 'name, phone, trade readable' },
        { label: 'Shirt or uniform', value: 'matches the van' },
        { label: 'Estimate and invoice', value: 'same name, same look' },
        { label: 'Google Business Profile', value: 'same name exactly' },
        { label: 'Website header', value: 'same name exactly' },
      ],
      result: { label: 'Your score', value: 'out of 5' },
      after:
        'Anything under five means a homeowner who saw your van on Tuesday and your search result on Friday may not know it was the same company. In a trade where the buying decision takes weeks of dread about a dying system, that gap is expensive.',
    },
    takeaway:
      'Stand across the street from your own van and read the phone number. If you cannot, that is the first thing to fix, before any website work.',
  },
  {
    slug: 'hvac-what-your-site-must-answer',
    track: 'hvac',
    module: 3,
    title: 'The five questions an HVAC site has to answer in ten seconds',
    summary:
      'Someone is standing in a hot house with a dead system. They are not reading your About page. Here is what they need to find, in the order they look for it.',
    image: {
      src: '/academy/hvac-what-your-site-must-answer.webp',
      alt: 'A phone shape with five stacked bars inside, the top one widest',
    },
    diagram: 'three-sites',
    sections: [
      {
        heading: 'Can you come today',
        body: [
          'The most valuable HVAC visitor is the one whose system just died. They are not comparing three companies on craftsmanship. They want to know whether someone will come out.',
          'Say it plainly and near the top: whether you do emergency calls, what hours, and how fast you usually get there. If you do not do same-day, say that too — an honest no costs you a call you could not have served anyway.',
        ],
      },
      {
        heading: 'Do you serve my area',
        body: [
          'Name the towns. Not "the greater metro area" — the actual list of towns and, if it helps, the zip codes.',
          'This is also the single easiest thing to get right for search: those town names are exactly what people type, and a page that names them can be found for them.',
        ],
      },
      {
        heading: 'Are you licensed and insured',
        body: [
          'Licence number, visible, not buried in the footer. Insurance stated. For a job that costs several thousand dollars in a stranger house, this is the second thing a careful buyer checks after price.',
        ],
      },
      {
        heading: 'What does it cost, roughly',
        body: [
          'You cannot quote a system replacement from a web page, and nobody expects you to. What you can publish is the diagnostic fee, whether it is waived if they go ahead, and whether you offer financing.',
          'Financing belongs on the page in this trade specifically. A failed system is an unplanned four-figure expense, and for many households the question is not which company, it is whether they can afford it this month.',
        ],
      },
      {
        heading: 'Have you done this before',
        body: [
          'Photographs of your own installs. Reviews with names and towns. The brands you service, because a homeowner with a Trane wants to know you work on Trane.',
          'Not stock photos of somebody else equipment. In a trade where the customer cannot judge the work quality themselves, the evidence they can judge is whether you look like you have done it.',
        ],
      },
    ],
    numbers: {
      title: 'The ten-second test',
      rows: [
        { label: 'Emergency availability visible without scrolling', value: 'yes / no' },
        { label: 'Towns named on the page', value: 'yes / no' },
        { label: 'Licence number visible', value: 'yes / no' },
        { label: 'Diagnostic fee or financing stated', value: 'yes / no' },
        { label: 'Your own photos and real reviews', value: 'yes / no' },
      ],
      result: { label: 'Your score', value: 'out of 5' },
      after:
        'Open your site on a phone, count out ten seconds, and mark what you found in that time. Whatever is missing is what a panicking homeowner did not find either.',
    },
    ourWork:
      'Both HVAC sites we built are live: acromanservice.com and fivestarcomfort.com. Open either on a phone and time how long it takes to find the phone number and the service area.',
    takeaway:
      'Do the ten-second test on your own site, on a phone, not a computer. Fix whatever you could not find in time before touching anything else.',
  },
  {
    slug: 'hvac-when-to-spend',
    track: 'hvac',
    module: 4,
    title: 'When to spend in a business with two seasons',
    summary:
      'Every HVAC owner eventually asks whether to advertise into the peak, when everyone is searching, or during the quiet months, when nobody is competing. Here is how to think about it, and what the money is actually buying in each case.',
    image: {
      src: '/academy/hvac-when-to-spend.webp',
      alt: 'Two wave curves, one peaking slightly before the other',
    },
    diagram: 'two-costs',
    sections: [
      {
        heading: 'What the peak buys',
        body: [
          'During the first hot week, people are searching whether or not you advertise. Ads put you in front of demand that already exists. Clicks cost more because every competitor is bidding for the same searches, and the calls convert quickly because the problem is urgent.',
          'The trap is capacity. If you are already booked out a week, buying more emergency calls produces annoyed strangers and one-star reviews about a company that never called back.',
        ],
      },
      {
        heading: 'What the quiet season buys',
        body: [
          'Nobody is searching for emergency repair in a mild October. What people can be persuaded to buy in that window is the thing that prevents the emergency: a tune-up, a maintenance plan, a system replaced on a schedule rather than on a Sunday in August.',
          'That is a different message and a different kind of ad. Running your July emergency ads in October produces clicks and no calls, and the owner concludes advertising does not work.',
        ],
      },
      {
        heading: 'The two costs, again',
        body: [
          'The ad budget scales with how much demand you want to buy. The work of running it is roughly flat. In a seasonal trade the temptation is to cancel everything during the quiet months, which saves the smaller of the two numbers and loses the accumulated learning of the account.',
          'A better shape: keep the account running with a small budget and a maintenance message during the quiet part, and raise the budget going into the peak — before the first hot week, not after it, because by then the searches are already happening.',
        ],
      },
      {
        heading: 'The account is yours either way',
        body: [
          'Whoever runs it, the account should be in your name with your billing. Two seasons of data about which searches turn into installs is worth more than any single month of management, and in a seasonal business it takes a full year to accumulate one usable cycle of it.',
        ],
      },
    ],
    numbers: {
      title: 'What a booked job cost you, by season',
      rows: [
        { label: 'Peak month ad budget', value: 'say $2,000' },
        { label: 'Jobs booked from it', value: 'say 8' },
        { label: 'Quiet month ad budget', value: 'say $500' },
        { label: 'Jobs booked from it', value: 'say 1' },
      ],
      result: { label: 'Cost per job', value: 'peak $250, quiet $500' },
      after:
        'The quiet month looks worse per job and may still be worth it, because a maintenance plan sold in October is a customer who calls you in July instead of searching. Compare against what a job leaves you, not against the other month.',
    },
    takeaway:
      'Look at your last twelve months and mark the two weeks when the phone went from quiet to loud. Your budget should rise before those weeks, not during them.',
  },
  {
    slug: 'hvac-how-they-find-you-in-an-emergency',
    track: 'hvac',
    module: 5,
    title: 'How people find an HVAC company when the system just died',
    summary:
      'Emergency search behaves differently from every other kind. The decision takes minutes, the map decides most of it, and the reviews do the rest.',
    image: {
      src: '/academy/hvac-how-they-find-you-in-an-emergency.webp',
      alt: 'A map pin with rings spreading out and houses on the outer ring',
    },
    diagram: 'channels',
    sections: [
      {
        heading: 'The map, and why it decides more here',
        body: [
          'Someone with a dead system searches on a phone, sees the map results first, and calls one of the top few. There is no comparison shopping, no reading of About pages, no second visit a week later.',
          'That makes the Google Business Profile the single most valuable unpaid asset an HVAC company has. Claimed, verified, the right categories, correct hours including whether you are open now, the service area right, and photographs that are yours.',
        ],
      },
      {
        heading: 'Reviews are the tiebreaker, and they decay',
        body: [
          'Between three companies in the map, the one with recent reviews wins. Recent matters: a five-star average from three years ago reads as a company that stopped working.',
          'In HVAC the moment to ask is exact: the system is running again, the house is cooling down, and the customer is relieved. Ask then, in person, before you leave. An email two weeks later asks someone who has already forgotten the discomfort.',
        ],
      },
      {
        heading: 'Paid search, and what it is for',
        body: [
          'Ads on emergency searches are expensive because everyone wants them and the job is worth a lot. They are worth it when you have capacity and want it filled today.',
          'They are not the channel for maintenance plans or replacements — those buyers are not in a hurry and will not convert from an emergency ad.',
        ],
      },
      {
        heading: 'The customers you already have',
        body: [
          'The cheapest HVAC job is the one from a house you have already been to. You know the equipment, the age, and the history, and they know you.',
          'Most companies in this trade have no way to contact past customers at all. A list of names, addresses, install dates and equipment ages is a marketing asset, and it costs nothing but the discipline of writing it down.',
        ],
      },
    ],
    numbers: {
      title: 'What each channel charges you for',
      rows: [
        { label: 'Past customers and referrals', value: 'nothing per job' },
        { label: 'Google Business Profile', value: 'nothing, an hour to set up' },
        { label: 'Emergency paid search', value: 'per click, highest in the peak' },
        { label: 'Lead marketplaces', value: 'per lead, shared with competitors' },
      ],
      result: { label: 'The two that cost nothing per job', value: 'the first two' },
      after:
        'This is the structure, not the price. What a click costs depends on your city and your season, and anybody quoting a single number for that is guessing. Start with the two that charge nothing.',
    },
    takeaway:
      'Search your own trade plus your town on a phone right now. If you are not in the map results, that is the most valuable unpaid thing you can fix this week.',
  },
  {
    slug: 'hvac-maintenance-plans',
    track: 'hvac',
    module: 6,
    title: 'Maintenance plans are the part that does not depend on the weather',
    summary:
      'The follow-up problem in HVAC has a specific answer that other trades do not get: a recurring visit that pays during the quiet months and turns strangers into people who call you first.',
    image: {
      src: '/academy/hvac-maintenance-plans.webp',
      alt: 'A closed circular loop with two houses on it at opposite points',
    },
    diagram: 'follow-up',
    sections: [
      {
        heading: 'What a plan actually does for the business',
        body: [
          'It fills the quiet season with scheduled work at a time when nothing else is happening.',
          'It puts you inside the house twice a year, which is how you see the ageing system before it fails and how the customer sees you before they need to search for anyone.',
          'It converts an emergency customer, who is loyal to whoever answers, into a repeat customer, who is loyal to you.',
        ],
      },
      {
        heading: 'Why the emergency customer needs converting',
        body: [
          'A customer who found you in a panic did not choose you, they chose whoever was available. Next August they will search again, and whoever is available then will get the job.',
          'The maintenance plan is the mechanism that ends that cycle. It is not an upsell, it is the difference between a business that starts from zero every summer and one that does not.',
        ],
      },
      {
        heading: 'Selling it at the right moment',
        body: [
          'The moment is the end of the repair, when the house is cooling down and the customer is thinking about how much they hated the last two days.',
          'What convinces is not a discount, it is the specific thing you just saw: the age of the unit, the state of the coil, what is likely to fail next and when. You have that information and nobody else does.',
        ],
      },
      {
        heading: 'The follow-up that is still missing',
        body: [
          'Everything from the general course applies here too: quotes that are never mentioned again are forgotten, not rejected. In HVAC the quotes are large and the deciding takes weeks, which makes the follow-up more valuable and the silence more expensive.',
          'A replacement quote sent in June and never followed up is a customer who bought from someone else in July.',
        ],
      },
    ],
    numbers: {
      title: 'What plans do to a quiet month',
      rows: [
        { label: 'Plan price per year', value: 'say $200' },
        { label: 'Customers on a plan', value: 'say 150' },
        { label: 'Visits that produces', value: '300 a year, schedulable' },
      ],
      result: { label: 'Revenue that ignores the weather', value: '$30,000 a year' },
      after:
        'Put your own numbers in. The revenue is the smaller half of the point: those 150 houses are also 150 systems whose age you know, in a trade where the replacement is worth many times the plan.',
    },
    takeaway:
      'Count how many of last year customers you could contact today if you wanted to. If the answer is none, building that list is worth more than any advertising you could buy this month.',
  },
];

export const findLesson = (slug?: string) =>
  ACADEMY_LESSONS.find((l) => l.slug === slug);

export const lessonsOfTrack = (track: string) =>
  ACADEMY_LESSONS.filter((l) => l.track === track);

export const lessonsOfModule = (track: string, module: number) =>
  ACADEMY_LESSONS.filter((l) => l.track === track && l.module === module);

/**
 * Время чтения считается по тексту, а не назначается. Назначенное число рано
 * или поздно разойдётся с текстом, и заметить это будет некому.
 * 200 слов в минуту — общепринятая оценка для чтения с экрана.
 */
export const readingMinutes = (lesson: AcademyLesson): number => {
  const слов = lesson.sections
    .flatMap((s) => [s.heading, ...s.body])
    .join(' ')
    .trim()
    .split(/\s+/).length;
  return Math.max(1, Math.round(слов / 200));
};
