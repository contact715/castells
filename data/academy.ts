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
