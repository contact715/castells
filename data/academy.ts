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
    name: 'Go to market',
    about: 'Seven questions to answer before you design, build or advertise anything.',
  },
  {
    number: 3,
    name: 'Brand and identity',
    about: 'What makes people recognize you on the second look.',
  },
  {
    number: 4,
    name: 'The website',
    about: 'Three kinds of site, and which one your business actually needs.',
  },
  {
    number: 5,
    name: 'Marketing basics',
    about: 'Where the money goes and what each part is supposed to do.',
  },
  {
    number: 6,
    name: 'Getting found',
    about: 'How people look for a contractor, in the order it actually happens.',
  },
  {
    number: 7,
    name: 'Sales and follow-up',
    about: 'The work that turns a phone call into a paid job.',
  },
  {
    number: 8,
    name: 'Automation',
    about: 'Making the previous seven modules happen without you remembering to do them.',
  },
];

export const ACADEMY_LESSONS: AcademyLesson[] = [
  {
    slug: 'before-you-spend-on-marketing',
    track: 'contractors',
    module: 1,
    title: 'What has to be true before marketing works',
    summary:
      'Marketing sends people to your business. If it is not ready, the money goes out and nothing comes back. Here is the short list of what has to exist first.',
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
    module: 3,
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
    module: 4,
    title: 'Three kinds of website, and which you need',
    summary:
      'A one-page card, a landing page built for ads, and a full site built for search. They cost different amounts because they do different jobs, not one being better.',
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
    module: 5,
    title: 'Where the marketing money actually goes',
    summary:
      'Two different kinds of cost get called "marketing budget," and confusing them is why owners cannot tell whether it works. Here is the split, and what each part buys.',
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
    module: 6,
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
    module: 7,
    title: 'The job you lose is the call nobody returned',
    summary:
      'Most lost work is not lost to a competitor with better prices. It is lost between the phone ringing and someone following up: the part of marketing skipped most.',
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
    title: 'What HVAC needs before the first call',
    summary:
      'Two licences, one federal, and a cash cycle that punishes anyone who plans for an average month. What has to be true before advertising can help you.',
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
    module: 3,
    title: 'In HVAC the van is the billboard',
    summary:
      'Your van parks in a driveway for hours, in the neighbourhood where you want the next job. No other trade gets an ad surface that well targeted, and most waste it.',
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
    module: 4,
    title: 'Five questions an HVAC site must answer',
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
    module: 5,
    title: 'When to spend in a business with two seasons',
    summary:
      'Every HVAC owner asks whether to advertise into the peak season or the quiet months. Here is how to think about it, and what the money actually buys in each case.',
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
    module: 6,
    title: 'How people find HVAC help in an emergency',
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
    module: 7,
    title: 'Maintenance plans do not depend on weather',
    summary:
      'The follow-up problem in HVAC has an answer other trades do not get: a recurring visit that pays during the quiet months and turns strangers into repeat callers.',
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
  {
    slug: 'remodel-money-before-the-first-swing',
    track: 'remodeling',
    module: 1,
    title: 'The money structure of a remodel job',
    summary:
      'Remodeling rarely fails from lack of work. It fails from cash: a deposit spent on the last job, an unwritten change order, a schedule paying the contractor last.',
    image: {
      src: '/academy/remodel-money-before-the-first-swing.webp',
      alt: 'A stepped line that dips below its start in the middle before rising again',
    },
    diagram: 'six-things',
    sections: [
      {
        heading: 'The licence, and the threshold that matters',
        body: [
          'Most states license contractors above a job-size threshold, and remodels cross it easily. Check your own state board directly rather than any summary, this one included.',
          'The licence number belongs on the estimate and on the website. Remodel buyers check it more than emergency buyers do, because they have weeks to think and a large sum to spend.',
        ],
      },
      {
        heading: 'The payment schedule is the business model',
        body: [
          'A remodel is not paid at the end. It is paid in stages, and how those stages are drawn decides whether you are financing the customer project out of your own pocket.',
          'The failure pattern is simple and common: the deposit from the new job pays for materials on the old one. It works until one job stalls, and then everything behind it stalls too.',
          'Whatever schedule you use, the test is the same: at every point in the job, has the customer paid for the work already done and the materials already bought.',
        ],
      },
      {
        heading: 'Change orders in writing, every time',
        body: [
          'A remodel changes. The customer sees the space open and wants the doorway moved. That is normal and it is fine, as long as it is written down with a price and a signature before the work happens.',
          'Undocumented changes are the single largest source of both lost margin and disputes in this trade. The conversation at the end, when the customer remembers a favour and you remember a change order, has no good ending.',
        ],
      },
      {
        heading: 'Insurance and the paperwork nobody reads until it matters',
        body: [
          'General liability and workers comp, and lien rights, which vary by state and have deadlines. This is a lawyer conversation, not a marketing one, and it is worth having before you need it rather than after.',
        ],
      },
    ],
    numbers: {
      title: 'Where the cash actually sits mid-job',
      rows: [
        { label: 'Contract value', value: 'say $60,000' },
        { label: 'Paid so far, at the halfway point', value: 'say $30,000' },
        { label: 'Materials bought and labour paid by then', value: 'say $38,000' },
      ],
      result: { label: 'You are financing', value: '$8,000, out of your own money' },
      after:
        'Put your own numbers in for your last job. If the answer is positive at every stage, the schedule is fine. If it goes negative in the middle, that gap is what a single stalled job turns into a crisis.',
    },
    takeaway:
      'Take your last finished remodel and plot payments against costs by week. The lowest point on that line is what your business has to be able to survive.',
  },
  {
    slug: 'remodel-the-jobsite-is-the-showroom',
    track: 'remodeling',
    module: 3,
    title: 'The jobsite is your showroom',
    summary:
      'A remodeler has no shop window. What people see instead is the site: the sign out front, the driveway, and the photographs that come out of it afterwards.',
    image: {
      src: '/academy/remodel-the-jobsite-is-the-showroom.webp',
      alt: 'One open house among four closed ones',
    },
    diagram: 'three-encounters',
    sections: [
      {
        heading: 'What the neighbours are watching',
        body: [
          'A kitchen remodel takes weeks in a street where several houses were built at the same time and have the same tired kitchen. Those neighbours watch the whole thing: the trucks, the dumpster, whether the crew cleans up, whether the driveway is blocked at school pickup.',
          'That is a weeks-long advertisement to precisely the households most likely to buy the same job. It is free and most of it is decided by habits, not budget.',
        ],
      },
      {
        heading: 'The sign, and what goes on it',
        body: [
          'Company name, trade, phone number, licence number. Readable from a car moving at twenty miles an hour, which means larger type than feels necessary.',
          'Ask the customer before putting it up, and take it down when you finish. A sign left standing for months after the job reads as neglect, which is the opposite of the message.',
        ],
      },
      {
        heading: 'Photographs are the product',
        body: [
          'In remodeling, the photographs are not marketing material, they are the only evidence of what you sell. A customer cannot inspect the framing behind a wall. They can look at a finished bathroom.',
          'Which means: photograph before, photograph during at least once, and photograph after in daylight with the site clean. The before shot is what makes the after shot mean anything, and it is the one everybody forgets to take.',
        ],
      },
      {
        heading: 'The consistency part',
        body: [
          'Same name on the sign, the truck, the estimate, the invoice, the website and the Google profile. A homeowner who watched your crew for three weeks and later searches the name should land on you, not on a similarly named company two towns over.',
        ],
      },
    ],
    numbers: {
      title: 'What one jobsite is worth as advertising',
      rows: [
        { label: 'Weeks the job runs', value: 'say 4' },
        { label: 'Houses that pass it daily', value: 'say 40' },
        { label: 'Of those, how many have the same tired kitchen', value: 'your guess' },
      ],
      result: { label: 'Impressions to the right audience', value: 'weeks of them, at no extra cost' },
      after:
        'This is not a statistic, it is arithmetic on your own street. The point is that the surface is already paid for. Whether it works depends on the sign, the tidiness and the photographs, all of which are habits rather than budget.',
    },
    takeaway:
      'On your next job, take the before photographs before anyone touches anything. That one habit changes what you are able to sell for years afterwards.',
  },
  {
    slug: 'remodel-portfolio-is-the-site',
    track: 'remodeling',
    module: 4,
    title: 'For a remodeler, the portfolio is the website',
    summary:
      'Emergency trades sell availability. Remodelers sell evidence. That changes what the site is for and what has to be on it.',
    image: {
      src: '/academy/remodel-portfolio-is-the-site.webp',
      alt: 'Two panels side by side, one plain and one detailed',
    },
    diagram: 'three-sites',
    sections: [
      {
        heading: 'What the visitor is actually doing',
        body: [
          'They are not in a hurry. They have been thinking about this kitchen for two years and they will think for two more months. They are looking for two things: proof you can do it, and a reason to trust you in their house for a month.',
          'That means the site is not a card with a phone number. It is a portfolio, and everything else supports it.',
        ],
      },
      {
        heading: 'A page per project, not a gallery of tiles',
        body: [
          'A wall of thumbnails proves you did a lot of work and tells nobody anything about any of it. A page per project can carry what the buyer wants: what the house was, what they wanted, what it cost roughly, how long it took, and what was difficult.',
          'The difficult part is what wins the job. Anyone can show a finished bathroom. Explaining what you found behind the old tile and how you dealt with it is what makes a stranger believe you.',
        ],
      },
      {
        heading: 'Ranges, not silence, on price',
        body: [
          'You cannot quote a remodel from a web page. You can say what a bathroom in your area typically runs, as a range, with what moves it up and down.',
          'Silence on price does not protect you. It filters out the serious buyer who wants to know they are in the right place, and lets through everyone whose budget is a third of the number.',
        ],
      },
      {
        heading: 'The trust column',
        body: [
          'Licence number, insurance, how long you have worked, the towns you serve, and reviews with names. Plus, if you have them, the designers, architects or suppliers you work with regularly.',
          'For a job that puts strangers in the house for weeks, this column does as much work as the photographs.',
        ],
      },
    ],
    numbers: {
      title: 'What one project page has to carry',
      rows: [
        { label: 'Before photographs', value: 'yes / no' },
        { label: 'After photographs, daylight, clean site', value: 'yes / no' },
        { label: 'What the customer wanted, in words', value: 'yes / no' },
        { label: 'Rough cost range and duration', value: 'yes / no' },
        { label: 'What was difficult and how it was solved', value: 'yes / no' },
      ],
      result: { label: 'Your score, per project', value: 'out of 5' },
      after:
        'Score your three best projects. A remodeler with three complete project pages outsells one with thirty thumbnails, because the buyer is looking for evidence, not volume.',
    },
    takeaway:
      'Pick your single best finished job and write its page properly, all five parts. Then do the next one. Three complete pages beat a gallery.',
  },
  {
    slug: 'remodel-the-long-sales-cycle',
    track: 'remodeling',
    module: 5,
    title: 'Marketing for a decision that takes months',
    summary:
      'Someone searching for a kitchen remodel today may sign in the spring. Advertising built for same-day calls fails at this, and the owner concludes it does not work.',
    image: {
      src: '/academy/remodel-the-long-sales-cycle.webp',
      alt: 'A long arrow with four dots spaced increasingly far apart',
    },
    diagram: 'two-costs',
    sections: [
      {
        heading: 'Why the emergency playbook fails here',
        body: [
          'In an emergency trade the click and the job are days apart. In remodeling they can be months apart, and the customer will meet three companies, talk to a spouse, look at financing, and change their mind twice.',
          'That means a click that does not become a call this week has not failed. But it also means the reporting that says otherwise will lie to you, and the ads will be switched off before they had a chance.',
        ],
      },
      {
        heading: 'What to measure instead',
        body: [
          'Not calls this month. Consultations booked, estimates given, and jobs signed, with the month they started tracked separately from the month they closed.',
          'A signed remodel in April may trace back to a January click. If nobody records that, January looks like a wasted month and the budget gets cut in the exact season when people start planning.',
        ],
      },
      {
        heading: 'The two costs, in a slow trade',
        body: [
          'The ad budget scales; the work of running it is roughly flat. In remodeling the flat part matters more, because the value comes from patience and from following up, not from switching the budget on and off.',
          'And as everywhere: the account should be in your name. Two seasons of data about which searches turn into signed contracts is worth more than any month of management, and in a slow trade it takes a year to accumulate one usable cycle.',
        ],
      },
      {
        heading: 'Seasonality is real here too',
        body: [
          'Interior work fills the cold months, exterior fills the warm ones, and the planning happens before both. The advertising should lead the season, not follow it.',
        ],
      },
    ],
    numbers: {
      title: 'What a signed job cost, counted properly',
      rows: [
        { label: 'Spent over three months', value: 'say $3,200' },
        { label: 'Consultations booked from it', value: 'say 12' },
        { label: 'Estimates given', value: 'say 6' },
        { label: 'Signed, some of them months later', value: 'say 2' },
      ],
      result: { label: 'Cost per signed job', value: '$3,200 ÷ 2 = $1,600' },
      after:
        'Compare that with what a remodel leaves you, not with what a click cost. A $1,600 acquisition cost is terrible for a service call and can be excellent for a $60,000 kitchen. Counting by month instead of by cohort is how owners get this backwards.',
    },
    takeaway:
      'Write down, for your last five signed jobs, when the customer first contacted you. If the gap is months, your reporting has to work in months too.',
  },
  {
    slug: 'remodel-where-they-look',
    track: 'remodeling',
    module: 6,
    title: 'Where remodel customers actually look',
    summary:
      'The channels differ from an emergency trade, and so does the order. Pictures matter more, urgency matters less, and other professionals send more work than any ad.',
    image: {
      src: '/academy/remodel-where-they-look.webp',
      alt: 'Five lines of different lengths converging on one house',
    },
    diagram: 'channels',
    sections: [
      {
        heading: 'People who already trust someone else',
        body: [
          'Designers, architects, realtors, kitchen and bath showrooms, plumbers and electricians. Each of them meets homeowners who are about to remodel, and each of them needs someone reliable to recommend.',
          'This is the highest-value channel in the trade and it costs nothing but showing up, doing clean work and being easy to deal with. It is also slow: the first referral from a new relationship can take a year.',
        ],
      },
      {
        heading: 'Search, and what people type',
        body: [
          'Not "remodeling contractor". They search the specific job and the place: bathroom remodel plus their town, kitchen contractor plus their town. Sometimes they search a style or a material.',
          'Which means a page for each type of job you do, and each area you serve, will be found for things a single homepage never will.',
        ],
      },
      {
        heading: 'The picture platforms',
        body: [
          'Unlike an emergency trade, remodeling has real audiences on the visual platforms, because people collect ideas for months before they call anyone. If you have good photographs, they work here.',
          'If you do not have good photographs, nothing on these platforms will work, which puts you back in module 2.',
        ],
      },
      {
        heading: 'The map, still',
        body: [
          'The Google Business Profile matters here too, just less decisively than in an emergency trade. Claim it, fill it, and put project photographs in it, because it is often the first place someone checks after hearing your name from a neighbour.',
        ],
      },
    ],
    numbers: {
      title: 'What each channel charges you for',
      rows: [
        { label: 'Referrals from designers and trades', value: 'nothing per job, slow to build' },
        { label: 'Past customers and neighbours', value: 'nothing per job' },
        { label: 'Google Business Profile', value: 'nothing, an hour to set up' },
        { label: 'Search ads on job-plus-town', value: 'per click' },
        { label: 'Picture platforms', value: 'per view, needs photographs first' },
      ],
      result: { label: 'The three that cost nothing per job', value: 'the first three' },
      after:
        'The structure, not the price: what a click costs depends on your market. Note that the two strongest channels here are both slow. That is why remodelers who start marketing when work goes quiet are always late.',
    },
    takeaway:
      'List every designer, realtor and trade you have worked with in the past year. That list is your cheapest source of the next job, and most of them have not heard from you since.',
  },
  {
    slug: 'remodel-the-estimate-is-a-document',
    track: 'remodeling',
    module: 7,
    title: 'The estimate is a document, not a number',
    summary:
      'Two contractors quote the same kitchen. One sends a figure in a text, the other sends four pages. The second wins more often, and not because of the price.',
    image: {
      src: '/academy/remodel-the-estimate-is-a-document.webp',
      alt: 'Two documents, one nearly empty and one filled with lines',
    },
    diagram: 'follow-up',
    sections: [
      {
        heading: 'What the customer is really comparing',
        body: [
          'They cannot judge your framing. They can judge whether you understood what they asked for, whether you thought about the parts they are worried about, and whether you seem likely to finish.',
          'The estimate is the only evidence of that they have before signing. A bare number gives them nothing to compare except the number, which is exactly the comparison you lose.',
        ],
      },
      {
        heading: 'What goes in it',
        body: [
          'What is included, in plain language, room by room or stage by stage. What is excluded, explicitly, because that is where disputes start. Allowances for the things not chosen yet: tile, fixtures, appliances.',
          'A schedule with real dates, the payment stages, and how change orders will be handled. Your licence and insurance.',
          'And one paragraph in your own words about what you noticed in their house and how you plan to handle it. That paragraph is the difference between a bid and a proposal.',
        ],
      },
      {
        heading: 'Following up over months, not days',
        body: [
          'A remodel estimate is not rejected, it is deferred. The spouse, the budget, the spring. The contractor who checks in politely every few weeks is the one who is still in the conversation when the decision finally happens.',
          'A workable rhythm: a few days after sending, a couple of weeks later, then once a month with something useful rather than a nudge. Stop after a few months and mark it closed.',
        ],
      },
      {
        heading: 'And after the job',
        body: [
          'A finished remodel customer is worth more than a new one. They have the rest of the house, they talk to neighbours who watched the work, and they can be asked for the review that wins the next job.',
          'Ask at the moment the site is clean and they are happy, not in an email six weeks later.',
        ],
      },
    ],
    numbers: {
      title: 'The four numbers of a slow pipeline',
      rows: [
        { label: 'Enquiries in the last three months', value: 'say 20' },
        { label: 'Turned into a consultation', value: 'say 10' },
        { label: 'Turned into a written estimate', value: 'say 6' },
        { label: 'Signed', value: 'say 2' },
      ],
      result: { label: 'Estimates still open, not lost', value: '6 − 2 = 4 to follow up' },
      after:
        'In a fast trade an unanswered quote is dead. Here it is usually just waiting. Those four are the cheapest work available to you, and most contractors write them off after a week of silence.',
    },
    takeaway:
      'Find every estimate you sent in the last three months that never got a yes or a no, and contact each one this week. That list is your pipeline.',
  },
  {
    slug: 'auto-what-you-need-before-the-first-car',
    track: 'automotive',
    module: 1,
    title: 'What a detail or wrap shop needs to start',
    summary:
      'This trade takes custody of something worth thousands and hands it back changed. That changes what has to be ready before marketing sends anyone through the door.',
    image: {
      src: '/academy/auto-what-you-need-before-the-first-car.webp',
      alt: 'A large empty bay outline with one small car in a corner',
    },
    diagram: 'six-things',
    sections: [
      {
        heading: 'You are responsible for the car while it is yours',
        body: [
          'A missed call costs every trade a job. A scratched panel, a chemical burn on paint, a stripped tint from a window that would not roll down right costs you the job, the repair, and often the review that keeps the next ten customers away.',
          'That is the fact this module is built around: for the hours a vehicle is in your bay, it is your liability, not the owner\'s.',
        ],
      },
      {
        heading: 'The license, and what it does not cover',
        body: [
          'A general business license is the baseline in most cities, the same as any shop. Window tint has its own layer on top of that in many states: a legal limit on how dark a film can be, sometimes a separate installer registration. Look up the rule in your own state before you install anything, because the fine for an illegal tint job lands on the car owner, and they will remember whose shop sold it to them.',
          'Wrap and ceramic coating work is not separately licensed in most places, but it is still work performed on someone else\'s property, which is the point of the next section.',
        ],
      },
      {
        heading: 'Garagekeepers coverage, not just general liability',
        body: [
          'General liability covers your shop. It does not automatically cover a customer\'s car while it sits in your care. The policy that does is usually called garagekeepers or bailee\'s customers coverage, and it is a separate line an insurance broker has to be asked for by name.',
          'Ask what it actually pays for: paint damage, theft from the lot, a fire that reaches parked cars. A shop that has never had to file that claim is the shop that has not been open long enough yet.',
        ],
      },
      {
        heading: 'A booking system, before a phone number',
        body: [
          'Almost none of this work happens on a walk-in basis. A full detail or a wrap ties up a bay for hours, sometimes days, so the business runs on a calendar, not a queue.',
          'Decide before you advertise: how a slot is held, whether a deposit is required for the larger jobs, and what happens on a no-show. Writing this down once means every future booking follows the same rule instead of being negotiated car by car.',
        ],
      },
      {
        heading: 'A phone, an email and a bank account that belong to the business',
        body: [
          'The same rule as any trade, worth repeating here because the ticket sizes are larger. A ceramic coating job can run into four figures, and a deposit paid to a personal account instead of a business one is a bookkeeping problem the day taxes are due, and a trust problem the day a customer asks for a refund.',
        ],
      },
    ],
    numbers: {
      title: 'What one empty bay costs',
      rows: [
        { label: 'Average job value in your bay', value: 'say $250' },
        { label: 'Bays you run', value: 'say 2' },
        { label: 'Hours a full detail occupies one', value: 'say 3' },
      ],
      result: { label: 'One no-show on a 3-hour job', value: 'a bay earning nothing for that window' },
      after:
        'Put your own numbers in. A missed appointment in this trade is not just a lost customer, it is time on a piece of equipment (the bay, the lift, the booth) that cannot be sold again once the hour has passed.',
    },
    takeaway:
      'Call your insurance broker this week and ask, by name, whether your policy includes garagekeepers or bailee\'s customers coverage. If you are not sure, you probably do not have it.',
  },
  {
    slug: 'auto-the-lot-is-the-billboard',
    track: 'automotive',
    module: 3,
    title: 'The car in the lot is the billboard',
    summary:
      'Most trades have to describe the result. This one can point at it: a finished car in the lot is the clearest ad a shop has, and most park or photograph it wrong.',
    image: {
      src: '/academy/auto-the-lot-is-the-billboard.webp',
      alt: 'Five cars arranged in a circle facing a square at the centre',
    },
    diagram: 'three-encounters',
    sections: [
      {
        heading: 'The work is visible in a way most trades envy',
        body: [
          'Nobody can see a repaired HVAC system from the street. Everybody can see a wrapped car, a set of tinted windows or a ceramic-coated hood catching light in the sun. That is a real advantage, and it is wasted the moment the finished car is parked around back to make room for the next one.',
          'Put finished cars where the street sees them, even for twenty minutes before the customer picks up. It is the one piece of marketing that costs nothing and happens automatically if you let it.',
        ],
      },
      {
        heading: 'Five places, one spelling',
        body: [
          'Google Business Profile, the website, the Instagram handle, the sign on the building and the invoice you hand over. If the business is "AAA Detailing" on one and "Triple A Auto Detail" on another, a customer searching later to leave a review or book again may not connect the two.',
          'Check your own five right now. It takes ten minutes and it is the kind of small mismatch that is invisible until someone else finds it first.',
        ],
      },
      {
        heading: 'The photo is part of the brand, not an afterthought',
        body: [
          'A wrap, a tint or a ceramic coat only reads correctly in the right light. A phone photo taken in a dim bay under fluorescent tube lighting makes a $2,000 wrap look like a $200 one. This is the one trade where the difference between a good and a bad photo of the same work is the difference between a customer sharing it and a customer never mentioning it.',
          'Shoot outside, or under even light, at the same angle every time. Consistency across a portfolio reads as professionalism even before anyone reads a word of text.',
        ],
      },
      {
        heading: 'Watermark it, politely',
        body: [
          'A small logo in the corner of a finished-car photo is not vanity, it is attribution. Customers repost their own cars. Other shops screenshot competitors\' work for inspiration. A watermark is the only thing that keeps a good photo pointing back at the business that did the work.',
        ],
      },
      {
        heading: 'The shop vehicle, if you have one',
        body: [
          'A van, trailer or truck that goes to shows, picks up cars, or simply sits in the lot is a second sign, parked wherever the business happens to be that day. The same rule as the finished cars applies: name, phone number and what you do, readable from across the lot, not squeezed into a corner.',
        ],
      },
    ],
    numbers: {
      title: 'The five-places count',
      rows: [
        { label: 'Google Business Profile', value: 'check' },
        { label: 'Website', value: 'check' },
        { label: 'Instagram handle', value: 'check' },
        { label: 'Sign on the building', value: 'check' },
        { label: 'Invoice or receipt', value: 'check' },
      ],
      result: { label: 'Places the exact same name has to appear', value: '5' },
      after:
        'Anything under five spellings matching means some customers are one search away from not finding you again, or leaving a review under a name that does not match what shows up in a map search.',
    },
    takeaway:
      'Take one finished car outside this week, in daylight, and shoot it the same way you plan to shoot every car after it. That one photo sets the standard for the whole portfolio.',
  },
  {
    slug: 'auto-the-photo-is-the-product',
    track: 'automotive',
    module: 4,
    title: 'For a detail shop, the photo is the product',
    summary:
      'A customer cannot feel a coating or run a hand under a wrap edge before buying. What they can do is look at photos of other cars. The site exists to earn that trust.',
    image: {
      src: '/academy/auto-the-photo-is-the-product.webp',
      alt: 'A car split down the middle, dull on one side and bright on the other',
    },
    diagram: 'three-sites',
    sections: [
      {
        heading: 'Three kinds of site, and this trade usually needs the middle one',
        body: [
          'A business card site: hours, services, phone number, a handful of photos. Enough if referrals and walk-by traffic already fill the calendar.',
          'A landing page built around one service: a single page that answers what a package includes, what it costs, and how to book it, aimed at people already searching "ceramic coating" or "car wrap" in their city. This is usually the right size for a shop running paid search, because it matches one ad to one clear offer instead of asking a stranger to explore a whole site.',
          'A full site with a real portfolio: galleries organized by service, filterable by car type or wrap color, with a booking calendar built in. Worth the cost once the shop has enough finished work to fill it and enough volume to justify the calendar integration.',
        ],
      },
      {
        heading: 'Before and after is the whole argument',
        body: [
          'Not one photo of the finished car: the same angle, the same lighting, before and after, side by side. That pairing does more selling in five seconds than a paragraph of description does in five minutes, because it is proof rather than a claim.',
          'For paint correction and ceramic coating especially, the "before" photo is uncomfortable to publish and is exactly why it works. It is the evidence that the shine in the "after" is a result, not a marketing photo taken under good light.',
        ],
      },
      {
        heading: 'The booking calendar belongs on the site, not in a phone tag',
        body: [
          'A booking form or embedded calendar that shows real availability turns browsing into a held appointment before the customer has time to call three competitors instead. For jobs that take a bay for hours, this also does the work of setting expectations about how far out the calendar runs.',
        ],
      },
      {
        heading: 'Package pricing, shown, not hidden behind "call for quote"',
        body: [
          'Detailing and coating work is usually sold in tiers: a basic wash and vacuum, a full interior and exterior detail, a paint correction and coating package. Showing what each tier includes and roughly what it costs filters out the calls that were never going to book and gives serious buyers what they need to compare you against the next shop\'s tab.',
          'Wraps and larger jobs vary too much by vehicle for a fixed price, and that is fine to say directly: show a realistic range and explain what changes it, rather than leaving the page blank.',
        ],
      },
    ],
    numbers: {
      title: 'How many jobs pay for a site',
      rows: [
        { label: 'A landing page for one service', value: `${PRICES.websiteFrom}` },
        { label: 'Your average job value', value: 'say $350' },
      ],
      result: { label: 'Jobs needed to cover the build', value: `${PRICES.websiteFrom} ÷ $350 ≈ 5 jobs` },
      after:
        'A page built around one clear offer usually pays for itself within the first month of paid search running against it, because it is doing one job well instead of a whole site doing many jobs loosely.',
    },
    takeaway:
      'Pick your five best finished cars and find the "before" photo for each one. If it does not exist, start shooting a before photo on every car starting today. In six months you will have a portfolio that argues for itself.',
  },
  {
    slug: 'auto-where-the-marketing-money-goes',
    track: 'automotive',
    module: 5,
    title: 'Where the marketing money goes for auto shops',
    summary:
      'The same split applies to every trade, with one wrinkle: a bay hour that goes unsold is gone forever. That makes booking, not just leads, the number worth watching.',
    image: {
      src: '/academy/auto-where-the-marketing-money-goes.webp',
      alt: 'Two stacks of the same height, one of many thin blocks and one of three thick ones',
    },
    diagram: 'two-costs',
    sections: [
      {
        heading: 'Two costs, not one',
        body: [
          'The ad budget, money handed to Google, Meta or Yelp that turns into clicks and impressions. And the work: building the pages, writing the ads, watching results, changing what is not performing. The second is roughly flat whether the ad budget is small or large, and the two should always be billed as separate line items so a bad month can be traced to the right cause.',
        ],
      },
      {
        heading: 'The account is yours, always',
        body: [
          'Whoever runs the advertising, the account itself sits under your name and your billing. It holds the history: which searches turned into bookings, what a customer cost to acquire over a year, which season needed more spend and which did not. Losing that history by handing the account to an agency is the most expensive mistake in this list, and it is invisible until the day you try to leave.',
        ],
      },
      {
        heading: 'Found, contacted, booked, in that order',
        body: [
          'Get found: show up where someone is already searching for detailing, wraps or tint in their city. Get contacted: make the call, form or booking link obvious. Get booked: a held appointment, not a maybe.',
          'For this trade, "booked" has an extra step most others skip: confirming the appointment 24 to 48 hours ahead. A held slot on a calendar that nobody confirms is the single most common way a bay sits empty on a day that looked fully booked the week before.',
        ],
      },
      {
        heading: 'Why lead count is the wrong number here specifically',
        body: [
          'A form that asks nothing about the vehicle produces more leads and more time wasted quoting jobs that were never realistic. Asking for the make, model and what service they want before they can submit filters weak leads before they reach the phone, which matters more in a trade where a real quote takes ten minutes to prepare.',
        ],
      },
      {
        heading: 'What a budget cannot buy',
        body: [
          'A booking calendar that fills itself if the confirmation step above is skipped. A fix for a portfolio with no before-and-after photos, no matter how much is spent sending people to look at it. And, same as every trade, a guarantee: anybody promising a specific number of bookings for a specific spend is guessing.',
        ],
      },
    ],
    numbers: {
      title: 'What a booked job actually cost you',
      rows: [
        { label: 'Ad budget last month', value: 'say $800' },
        { label: 'What you paid for the work', value: `our plans start at ${PRICES.monthlyOneChannel}` },
        { label: 'Jobs booked from it', value: 'say 6' },
      ],
      result: { label: 'Cost per booked job', value: `($800 + ${PRICES.monthlyOneChannel}) ÷ 6 ≈ $232` },
      after:
        'Compare that against what the average job leaves after materials and labor. If it clears more than the cost per booking, the month worked. Almost nobody runs this comparison, and it is the only one that tells you whether marketing is paying for itself.',
    },
    takeaway:
      'Ask whoever runs your ads for two separate numbers this month: what went to the platforms, and what went to the work. If those two numbers cannot be pulled apart, that is the first thing to fix.',
  },
  {
    slug: 'auto-how-people-find-a-detail-shop',
    track: 'automotive',
    module: 6,
    title: 'How people find a detailer or wrap shop',
    summary:
      'The channels in the order they usually pay off for this trade, and why the mix leans more on photos and reviews than almost any other business the agency works with.',
    image: {
      src: '/academy/auto-how-people-find-a-detail-shop.webp',
      alt: 'A grid of six squares, one of them holding a car outline',
    },
    diagram: 'channels',
    sections: [
      {
        heading: 'The map, first',
        body: [
          'A search for "auto detailing near me" or "ceramic coating [city]" puts the map results above everything else, and a claimed, complete Google Business Profile with real photos of your own finished cars is free to set up and the single highest-value thing on this list.',
          'Reviews carry unusual weight in this trade because the buyer cannot inspect the work in advance. Ask every satisfied customer, at pickup, while the car is still shining in the lot.',
        ],
      },
      {
        heading: 'Instagram functions as a second website',
        body: [
          'This is one of the few trades where a well-run Instagram account brings in bookings on its own, because the work is inherently visual and the audience is already there looking at cars. A grid of consistent before-and-afters, posted on a schedule, does real work that a static photo gallery on a website cannot: it reaches people who were not searching yet.',
          'The same rule from module 3 applies here even more: same lighting, same angle, every time. An inconsistent feed reads as an inconsistent shop.',
        ],
      },
      {
        heading: 'Paid search, for the buyers already deciding',
        body: [
          'Someone searching "ceramic coating cost" or "vinyl wrap near me" already knows what they want and is comparing shops. That makes the click expensive and usually worth it, provided it lands on the service-specific page from module 3 rather than a general homepage.',
        ],
      },
      {
        heading: 'Referral, and the community around cars specifically',
        body: [
          'Car meets, local enthusiast groups, and forums built around a specific make or model are a channel most trades do not have. A shop that does good work on a well-known local car gets talked about inside that community in a way no ad can replicate. It costs nothing but showing up.',
        ],
      },
      {
        heading: 'What to do first',
        body: [
          'Claim and complete the Google Business Profile with your own photos, not stock images. Ask your last ten customers for a review. Then commit to posting one consistent before-and-after a week, even before spending a dollar on ads.',
        ],
      },
    ],
    numbers: {
      title: 'What each channel charges you for',
      rows: [
        { label: 'Google Business Profile', value: 'nothing, takes an hour to set up' },
        { label: 'Instagram, posted consistently', value: 'nothing but time' },
        { label: 'Referral and car communities', value: 'nothing per job' },
        { label: 'Paid search', value: 'per click, whether or not they book' },
      ],
      result: { label: 'Channels that cost nothing per job', value: 'the first three' },
      after:
        'This is the structure, not a promise: how much any of these produce depends on your city and how much competition already occupies the map results there. Start with the three that cost nothing and add paid search once the free ones are actually complete.',
    },
    takeaway:
      'Search your main service plus your city on a phone this week. Whatever sits above the regular results, map pack or ads, is where your next customer is looking first. Make sure you are actually there.',
  },
  {
    slug: 'auto-the-membership-that-fills-the-week',
    track: 'automotive',
    module: 7,
    title: 'The membership that fills the slow week',
    summary:
      'A finished job is not the end: coatings need maintenance, tints need checking, cars need washing. A plan around that keeps the calendar full when bookings run thin.',
    image: {
      src: '/academy/auto-the-membership-that-fills-the-week.webp',
      alt: 'A car with two arrows looping around it in a closed cycle',
    },
    diagram: 'follow-up',
    sections: [
      {
        heading: 'A ceramic coat is not "done" once it is applied',
        body: [
          'Most coatings are sold with a recommended maintenance interval and a warranty that depends on it being followed. That is a built-in reason to bring the same car back on a schedule, and most shops never mention it after the invoice is paid.',
          'A membership or maintenance plan, a recurring wash and inspection sold as a package rather than booked one visit at a time, turns that maintenance requirement into predictable, recurring revenue instead of a one-time job.',
        ],
      },
      {
        heading: 'What a plan actually needs to include',
        body: [
          'What is covered, on what schedule, and what is not included and priced separately. Whether it can be paused for a car sold or a customer moving. And what happens if a visit is missed: most plans should roll forward, not simply forfeit the payment, or customers cancel out of frustration rather than genuine dissatisfaction with the work.',
        ],
      },
      {
        heading: 'The estimate you sent for the bigger job',
        body: [
          'A full wrap or a paint correction and coating package is a larger decision than a wash, and it is common for a customer to ask for a quote and go quiet for weeks while they decide. That is not a lost job, it is a deferred one, and a light follow-up (a message a few days after quoting, another a few weeks later) is the cheapest work available and the most commonly skipped.',
        ],
      },
      {
        heading: 'Track what happens after the quote, not just how many you send',
        body: [
          'How many quotes went out, how many turned into a booking, and for the ones that did not, whether they went quiet or went to a competitor. Without that, a slow month looks identical whether the problem was too few quotes or too many unfollowed ones, and the fix for each is completely different.',
        ],
      },
    ],
    numbers: {
      title: 'What a maintenance plan does to a slow month',
      rows: [
        { label: 'Cars on a maintenance plan', value: 'say 30' },
        { label: 'Plan price per visit', value: 'say $60' },
        { label: 'Visits scheduled in a slow month', value: 'say 30' },
      ],
      result: { label: 'Booked revenue before a single new customer walks in', value: '30 × $60 = $1,800' },
      after:
        'Put your own numbers in. The point is not the total, it is that this revenue is already scheduled before the month starts, in a business where every other job has to be won from nothing each time.',
    },
    takeaway:
      'List every ceramic coating or paint correction job from the last six months and check whether the customer was ever offered a maintenance plan. For the ones who were not, that is this week\'s calls.',
  },
  {
    slug: 'pro-what-you-are-actually-selling',
    track: 'professional',
    module: 1,
    title: 'You are selling a decision, not a service',
    summary:
      'The client cannot judge the work before buying it, and often not afterwards either. That changes everything about how a practice is marketed.',
    image: {
      src: '/academy/pro-what-you-are-actually-selling.webp',
      alt: 'A closed box beside a question mark',
    },
    diagram: 'six-things',
    sections: [
      {
        heading: 'The evaluation problem',
        body: [
          'A homeowner can see a finished bathroom. A client cannot see whether your advice was the best available advice. They will judge you on the things they can judge: whether you explained clearly, whether you answered, whether you seemed to have done this before.',
          'That is not a cynical observation, it is the practical basis for everything a practice does in public. The signals people can read are the ones worth investing in.',
        ],
      },
      {
        heading: 'Licensing is the entry ticket and the first proof',
        body: [
          'Every practice in this group is licensed or certified by somebody: a state bar, an insurance department, a medical board, a certifying body. The requirements differ enormously and change, so check your own regulator directly.',
          'For marketing the point is constant: the credential is public, checkable, and the first thing a careful client verifies. Publish it clearly.',
        ],
      },
      {
        heading: 'What you are allowed to say is regulated too',
        body: [
          'This is the sharpest difference from every other course here. Advertising rules vary by profession and by state: what claims you may make, whether testimonials are permitted, what disclaimers must appear, how results may be described.',
          'A medical practice, a law firm and an insurance agency each operate under different limits. Before writing a word of advertising, find out what your regulator permits, from the regulator.',
          'We are not that authority and neither is any agency. An agency that writes claims for a regulated practice without checking is creating a problem the practice will own, not the agency.',
        ],
      },
      {
        heading: 'Insurance and the paperwork',
        body: [
          'Professional liability, and whatever your profession additionally requires. In practices handling health information there are privacy obligations that reach into marketing itself: what you may store, what you may put in an email, what a booking form may collect.',
          'That is a compliance conversation to have before building anything, not after.',
        ],
      },
    ],
    numbers: {
      title: 'What a client can actually judge',
      rows: [
        { label: 'Credential public and checkable', value: 'yes / no' },
        { label: 'Someone answers within a day', value: 'yes / no' },
        { label: 'The first conversation is clear, not jargon', value: 'yes / no' },
        { label: 'Reviews from people like them', value: 'yes / no' },
        { label: 'You have handled their situation before', value: 'yes / no' },
      ],
      result: { label: 'Your score', value: 'out of 5' },
      after:
        'These five are what a prospective client uses instead of judging the work itself. Every one of them is within your control, and none of them is about the quality of your advice.',
    },
    takeaway:
      'Before writing any advertising, read your regulator current rules on it. Everything else in this course assumes you have done that first.',
  },
  {
    slug: 'pro-trust-is-the-brand',
    track: 'professional',
    module: 3,
    title: 'What a practice brand is made of',
    summary:
      'Nobody picks a lawyer for the logo. They pick whoever looked competent and reachable at the moment they were worried.',
    image: {
      src: '/academy/pro-trust-is-the-brand.webp',
      alt: 'Five aligned cards with one slightly out of line',
    },
    diagram: 'three-encounters',
    sections: [
      {
        heading: 'What competence looks like from outside',
        body: [
          'A photograph of an actual person rather than a stock handshake. A name and a face on the page they will call.',
          'Writing without jargon. In these professions jargon reads as distance, and distance is exactly what a worried client is trying to avoid.',
          'Consistency across everything: the letterhead, the email signature, the website, the profile on the regulator directory. A mismatch in a profession built on precision reads as carelessness about precision.',
        ],
      },
      {
        heading: 'The physical space, where there is one',
        body: [
          'Clinics and offices are judged in the first ten seconds of the waiting room, and med spas most of all, because the client is comparing your space to what a medical setting should look like.',
          'This is not decoration spending. It is the same signal as a clean van in a home trade.',
        ],
      },
      {
        heading: 'Photographs, with the rules attached',
        body: [
          'Before-and-after imagery is central to some of these practices and tightly regulated in others. Where it is permitted, the requirements usually cover consent, whether images may be retouched, and what disclaimers must appear.',
          'Get the consent in writing regardless of what the rules require. A client whose face appears in your advertising without a signature is a problem waiting.',
        ],
      },
    ],
    numbers: {
      title: 'The consistency count',
      rows: [
        { label: 'Website', value: 'match / does not' },
        { label: 'Email signature and letterhead', value: 'match / does not' },
        { label: 'Regulator or association directory listing', value: 'match / does not' },
        { label: 'Google Business Profile', value: 'match / does not' },
        { label: 'Office or clinic signage', value: 'match / does not' },
      ],
      result: { label: 'Your score', value: 'out of 5' },
      after:
        'In a profession sold on precision, the directory listing with an old address does more damage than in any other trade on this site. It is also the one nobody checks.',
    },
    takeaway:
      'Look up your own practice in your regulator public directory and check every field against your website. Fix whatever disagrees.',
  },
  {
    slug: 'pro-the-site-answers-the-worry',
    track: 'professional',
    module: 4,
    title: 'Answer the worry, not the service',
    summary:
      'People arrive after a bad week, a renewal notice, or months of thinking. The page that speaks to that moment wins.',
    image: {
      src: '/academy/pro-the-site-answers-the-worry.webp',
      alt: 'A page with one thick band near the top and thin lines below',
    },
    diagram: 'three-sites',
    sections: [
      {
        heading: 'Start where the visitor is',
        body: [
          'Not with your years of experience. With their situation, named plainly: what happened to them, what they are afraid of, and what happens next if they call.',
          'A visitor who recognises their own circumstance in the first two lines will read the rest. One who meets a paragraph about your commitment to excellence will not.',
        ],
      },
      {
        heading: 'A page per situation, not per service',
        body: [
          'People search their problem, not your service name. A page written for one situation can be found and can speak directly; a single services page cannot do either.',
          'This is also the honest version of search work in a regulated field: you are answering real questions, which is what people are looking for and what regulators generally have no issue with.',
        ],
      },
      {
        heading: 'What it costs, or at least how pricing works',
        body: [
          'You may not be able to publish a price. You can almost always publish the structure: hourly or fixed, consultation free or paid, contingency, payment plans, what insurance covers.',
          'Silence on this is read as expensive. Explaining the structure removes the reason people delay calling.',
        ],
      },
      {
        heading: 'The proof column',
        body: [
          'Credential, years, the association memberships that mean something, the situations you handle regularly, and reviews if your profession permits them.',
          'Where testimonials are restricted, substitute what is allowed: case types handled, publications, teaching, speaking. Do not quietly ignore a restriction because a competitor does.',
        ],
      },
      {
        heading: 'Reaching a human',
        body: [
          'A phone number, a form, and a stated response time you actually meet. In a worried-client profession, the answer speed is the service, and it starts before anyone becomes a client.',
        ],
      },
    ],
    numbers: {
      title: 'What the anxious visitor came for',
      rows: [
        { label: 'Their situation named in the first two lines', value: 'yes / no' },
        { label: 'What happens after they contact you', value: 'yes / no' },
        { label: 'How pricing works, even without a number', value: 'yes / no' },
        { label: 'Credential visible', value: 'yes / no' },
        { label: 'A stated response time you meet', value: 'yes / no' },
      ],
      result: { label: 'Your score', value: 'out of 5' },
      after:
        'Read your own homepage as somebody having the worst week of their year. Whatever you could not find in ten seconds is what they did not find either.',
    },
    takeaway:
      'Write one page for the single situation clients bring you most often, in their words. It will outperform your services page within a season.',
  },
  {
    slug: 'pro-marketing-inside-the-rules',
    track: 'professional',
    module: 5,
    title: 'Marketing a practice inside the rules',
    summary:
      'Every other course here can say whatever is true. A regulated practice cannot, and the limits differ by profession.',
    image: {
      src: '/academy/pro-marketing-inside-the-rules.webp',
      alt: 'A shape held closely inside a rectangular boundary',
    },
    diagram: 'two-costs',
    sections: [
      {
        heading: 'Find out before you write, not after',
        body: [
          'The rules cover what claims may be made, whether client testimonials are permitted, what results may be described, what disclaimers are required and where, and sometimes whether particular words may be used at all.',
          'They are set by your regulator and they change. Read the current version from the source. This applies to whoever writes your advertising too, and it is a reasonable thing to ask an agency about before hiring them.',
        ],
      },
      {
        heading: 'Two costs, and one extra',
        body: [
          'The ad budget scales; the work of running it is roughly flat. In a regulated practice there is a third: review, whether by you or by counsel, before anything goes out.',
          'Budget for it. A campaign pulled after a complaint costs more than the review would have.',
        ],
      },
      {
        heading: 'What a client is worth changes the arithmetic',
        body: [
          'These practices often have high lifetime values and long relationships. That makes an acquisition cost that would be absurd for a service call entirely sensible here.',
          'Which means the number to compare against is not the first transaction, it is what a client is worth over the relationship. Practices that judge advertising on the first invoice cut budgets that were working.',
        ],
      },
      {
        heading: 'The account is yours',
        body: [
          'In your name, your billing, whoever runs it gets access. Same rule as everywhere, with an extra reason: in a regulated field the advertising history may matter if anyone ever asks what you published and when.',
        ],
      },
    ],
    numbers: {
      title: 'What a client is worth over the relationship',
      rows: [
        { label: 'First engagement', value: 'say $1,200' },
        { label: 'Times they return, or years retained', value: 'say 4' },
        { label: 'Referrals a satisfied client sends', value: 'say 1' },
      ],
      result: { label: 'Relationship value', value: 'roughly $9,600, not $1,200' },
      after:
        'Put your own numbers in. Judged against the first invoice, most advertising in these professions looks unaffordable. Judged against the relationship, the same number is often cheap. Which comparison you use decides the budget.',
    },
    takeaway:
      'Work out what a client is worth over the whole relationship, not the first engagement. Then look again at what you can afford to spend to get one.',
  },
  {
    slug: 'pro-where-clients-come-from',
    track: 'professional',
    module: 6,
    title: 'Where clients actually come from',
    summary:
      'Referral from someone trusted, then reputation you can look up, then search. In that order, and the first one is far larger than practices expect.',
    image: {
      src: '/academy/pro-where-clients-come-from.webp',
      alt: 'Three arrows of different thickness pointing at one circle',
    },
    diagram: 'channels',
    sections: [
      {
        heading: 'Referral is the channel',
        body: [
          'From past clients, and from other professionals whose clients need what you do: the accountant who meets a business needing legal work, the realtor whose buyer needs insurance, the doctor whose patient asks about a cosmetic procedure.',
          'This is the largest source of work in most practices and the one with the least deliberate effort behind it. Building it means being known, being easy to refer to, and closing the loop when someone sends you a client.',
        ],
      },
      {
        heading: 'Reputation people can look up',
        body: [
          'Regulator directories, association listings, review platforms where your profession permits them, and the Google Business Profile.',
          'Someone given your name will look you up before calling. What they find at that moment either confirms the referral or quietly kills it, and most practices have never checked what that search returns.',
        ],
      },
      {
        heading: 'Search, for the situation',
        body: [
          'People search their problem: what happens if, do I need a lawyer for, how much does it cost to. Pages that answer those questions are found by exactly the people who need them.',
          'This is slow and it compounds, and in a profession where trust decides, being the source of a clear answer is a better introduction than an advertisement.',
        ],
      },
      {
        heading: 'Paid, and its limits',
        body: [
          'Paid search works for high-intent searches with a place attached. It is expensive in these professions because a client is worth a lot, and in some of them what the ad may say is restricted.',
          'It is worth it when the pipeline needs filling now, and it will not substitute for the reputation work above.',
        ],
      },
    ],
    numbers: {
      title: 'What each source charges you for',
      rows: [
        { label: 'Referrals from clients and professionals', value: 'nothing per client, slow to build' },
        { label: 'Directory and profile listings', value: 'nothing, hours to set up' },
        { label: 'Pages answering real questions', value: 'time, then free for years' },
        { label: 'Paid search', value: 'per click, high in these fields' },
      ],
      result: { label: 'The three that cost nothing per client', value: 'the first three' },
      after:
        'Structure, not price. Note that all three of the free sources are slow, which is why practices that start marketing when the pipeline empties are always six months late.',
    },
    takeaway:
      'Search your own name and your practice name the way a referred client would, and look at what comes back. Fix whatever is wrong or missing before spending anything on advertising.',
  },
  {
    slug: 'pro-the-first-response-is-the-service',
    track: 'professional',
    module: 7,
    title: 'The first response is the service',
    summary:
      'Somebody worried enough to contact a professional is comparing not expertise but responsiveness, because it is the only thing they can assess before hiring you.',
    image: {
      src: '/academy/pro-the-first-response-is-the-service.webp',
      alt: 'Three bars of decreasing length with a gap after the first',
    },
    diagram: 'follow-up',
    sections: [
      {
        heading: 'Speed is judged, expertise is not',
        body: [
          'A person who left messages with three practices will hear back from one first, and that one starts with an advantage the others rarely overcome.',
          'They are not measuring your knowledge. They cannot. They are measuring whether you replied, which they read as whether you will reply later, when they are a client and it matters.',
        ],
      },
      {
        heading: 'What has to happen when you cannot answer',
        body: [
          'An acknowledgement within minutes, a human within hours. Whether that is a receptionist, a service, or a message that states a real response time, it beats silence.',
          'Be careful what an automated reply collects and stores: in practices handling health or financial information, an intake form is subject to the same privacy obligations as the rest of the practice.',
        ],
      },
      {
        heading: 'One place where every enquiry lives',
        body: [
          'Who, what they need, when they contacted you, what was said last, and what happens next with a date. Wherever it lives, it has to be the only place, and it has to meet your professions confidentiality requirements.',
          'A note in a personal phone is neither.',
        ],
      },
      {
        heading: 'Following up, and the referral loop',
        body: [
          'Consultations that did not become engagements are usually deferred, not refused. A polite check some weeks later recovers work that was never actually lost.',
          'And when a client finishes: ask, if your profession permits, for the review. Thank whoever referred them, always. A referral thanked is a referral repeated; one that vanishes into silence usually is not.',
        ],
      },
    ],
    numbers: {
      title: 'The four numbers of a practice pipeline',
      rows: [
        { label: 'Enquiries last month', value: 'say 25' },
        { label: 'Answered within a day', value: 'say 15' },
        { label: 'Became a consultation', value: 'say 10' },
        { label: 'Became a client', value: 'say 4' },
      ],
      result: { label: 'Lost before anyone spoke to them', value: '25 − 15 = 10' },
      after:
        'The largest single loss in most practices happens before any professional judgement is involved. It is also the cheapest to fix, and it requires no marketing budget at all.',
    },
    takeaway:
      'Count how many enquiries last month never got a reply within a day. That number is your practice cheapest available growth.',
  },
  {
    slug: 'gtm-seven-questions',
    track: 'contractors',
    module: 2,
    title: 'Seven questions before you build anything',
    summary:
      'Who you are for, what you actually sell, what makes you different, what you must not be mistaken for, and how you will know it worked.',
    image: {
      src: '/academy/gtm-seven-questions.webp',
      alt: 'Seven squares in a row, each slightly larger than the last',
    },
    diagram: 'six-things',
    sections: [
      {
        heading: 'Why this comes before the logo',
        body: [
          'A website, a brand and an advertising budget are all answers. If the questions underneath them have not been answered, you are paying to build the answer to a question nobody asked.',
          'These seven take an afternoon. Everything after them is faster and cheaper because of it.',
        ],
      },
      {
        heading: '1. Who is this for',
        body: [
          'Not everyone within driving distance. The specific customer you want more of: what kind of house, what kind of budget, what kind of job.',
          'Write it as a sentence you could read to a stranger and have them picture the same person.',
        ],
      },
      {
        heading: '2. What are you actually selling',
        body: [
          'Almost never the work itself. People do not buy a repair, they buy the problem being gone and not having to think about it again.',
          'The distinction matters because it decides every word you write afterwards. A page about your equipment sells the work. A page about the customer getting their weekend back sells what they are buying.',
        ],
      },
      {
        heading: '3. What makes you different',
        body: [
          'Three things, concrete enough that a competitor could not put the same three on their own page.',
          'Not "quality workmanship" and not "customer focused". Something like: you explain what the last three contractors did not, you handle permits where others improvise, you turn down work that will not come out right.',
          'If you cannot fill all three, that is worth knowing now rather than after the website is built.',
        ],
      },
      {
        heading: '4. How do you sound',
        body: [
          'Pick the three words a happy customer would use describing you to a neighbour. Then check that everything you publish sounds like those three words.',
          'And pick the words you will not use. Cheap and affordable pull you towards the customer who chooses on price alone, and that customer is usually the one you regret.',
        ],
      },
      {
        heading: '5. What must you not be mistaken for',
        body: [
          'This is the question most people skip and it saves the most time. A remodeler who does not want handyman calls has to say so, on the site, in the profile, in the ads.',
          'Otherwise you spend the year politely declining work you were never going to take, and paying for the clicks that brought it.',
        ],
      },
      {
        heading: '6. Where do people find you',
        body: [
          'Today, honestly: name the channels and roughly what share each brings. Then the target picture: what you want that list to look like in six months.',
          'The gap between those two lists is your marketing plan. Most of the time the honest answer is that everything comes from one place, which is the real risk.',
        ],
      },
      {
        heading: '7. How will you know it worked',
        body: [
          'Decide the numbers before you spend, because after you spend you will pick whichever number looks best.',
          'What a lead costs by channel, what a signed job costs by channel, what share of quotes become jobs, and how many came back after follow-up. Those four beat any advertising report.',
        ],
      },
    ],
    numbers: {
      title: 'The one-channel test',
      rows: [
        { label: 'Jobs last quarter from your biggest source', value: 'say 30 of 40' },
        { label: 'That is what share', value: '75%' },
        { label: 'If that source doubled its price tomorrow', value: 'what happens' },
      ],
      result: { label: 'Your exposure', value: 'the share above, in one number' },
      after:
        'Put your own split in. A single channel above roughly half is the largest risk most service businesses carry and the one nobody has on a page anywhere. The point of question 6 is to see it before it becomes urgent.',
    },
    ourWork:
      'This is the framework we use when we write a strategy for a client, and it is the same seven headings every time. The order matters: each answer constrains the next, which is why the logo is not first.',
    takeaway:
      'Answer all seven in writing this week, badly if necessary. A bad written answer can be improved; an unwritten one gets decided by accident.',
  },
  {
    slug: 'gtm-hvac-two-businesses',
    track: 'hvac',
    module: 2,
    title: 'You run two businesses, not one',
    summary:
      'Emergency repair and planned replacement share a van and nothing else. Same seven questions, answered twice, because the customer is a different person in each.',
    image: {
      src: '/academy/gtm-hvac-two-businesses.webp',
      alt: 'Two houses side by side, one with a flame and one with a snowflake',
    },
    diagram: 'six-things',
    sections: [
      {
        heading: 'The two customers',
        body: [
          'The emergency customer has a dead system and a hot house. They decide in minutes, they are not comparing craftsmanship, and they will call whoever answers.',
          'The replacement customer has a system that still works and is thinking about the four-figure cost. They will take weeks, get three quotes, and talk to a spouse.',
          'One marketing plan for both produces material that fits neither.',
        ],
      },
      {
        heading: 'What each is actually buying',
        body: [
          'The emergency customer buys speed and relief. Everything they read should answer whether you can come and when.',
          'The replacement customer buys not being wrong. They are afraid of paying too much, of the wrong size unit, of a contractor who disappears. Everything they read should reduce that fear: what you inspect, how you size it, what the warranty covers, what it costs to run.',
        ],
      },
      {
        heading: 'What you must not be mistaken for',
        body: [
          'The cheapest tune-up in town, if that is not the business you want. Advertising a low-priced seasonal check brings exactly that customer and fills the calendar with it.',
          'It is a legitimate strategy when the plan is to convert those visits into replacements. It is a trap when it is done because everyone else does it.',
        ],
      },
      {
        heading: 'How you sound, to two audiences',
        body: [
          'To the emergency customer: short, direct, available. Anything decorative reads as delay.',
          'To the replacement customer: patient and explanatory. This is where the reputation for being the one who explains gets built, and it is what makes the third quote win against two cheaper ones.',
        ],
      },
      {
        heading: 'Where each one finds you',
        body: [
          'Emergency: the map, then paid search, decided by reviews and by who answers.',
          'Replacement: search over weeks, your own past customers, and the neighbour who had you out last summer. Almost none of it is the same channel.',
        ],
      },
    ],
    numbers: {
      title: 'Which half of the business is which',
      rows: [
        { label: 'Jobs last year: emergency repair', value: 'say 180' },
        { label: 'Jobs last year: replacement and install', value: 'say 25' },
        { label: 'Revenue split between them', value: 'count it' },
      ],
      result: { label: 'Where the calls are against where the money is', value: 'usually opposite' },
      after:
        'Put your own numbers in. In most HVAC businesses the calls come overwhelmingly from one half and the revenue from the other, and the marketing is built for the half that produces calls.',
    },
    takeaway:
      'Answer the seven questions twice, once for emergency and once for replacement. If the two answers look the same, one of them is wrong.',
  },
  {
    slug: 'gtm-remodel-two-streams',
    track: 'remodeling',
    module: 2,
    title: 'Planned work and insurance work',
    summary:
      'Someone spending their own savings on a kitchen and someone whose house just flooded are not the same customer and do not decide the same way.',
    image: {
      src: '/academy/gtm-remodel-two-streams.webp',
      alt: 'Two streams from opposite corners joining into one',
    },
    diagram: 'six-things',
    sections: [
      {
        heading: 'The planned customer',
        body: [
          'Paying out of their own money, for something they want rather than need. They will take months, compare several contractors, and their main fear is being cheated or abandoned halfway.',
          'What wins them: evidence, clarity, and the sense that you have done this exact thing before. Photographs, a real estimate document, and a contractor who explains rather than reassures.',
        ],
      },
      {
        heading: 'The insurance customer',
        body: [
          'Their house was damaged. The money is coming from an insurer, so there is little haggling over price, and they want one thing: their home back.',
          'What wins them: speed, and the sense that you know how to deal with the insurer. This is a real and separate skill, and to the customer it is worth more than your tile work.',
          'The finish expectations are usually lower than a planned remodel and the work is often better paid. Contractors who have both streams frequently say the insurance side is the better business.',
        ],
      },
      {
        heading: 'The third customer nobody markets to',
        body: [
          'Somebody who already has two or three estimates and does not trust any of them. They are looking for a fourth opinion.',
          'This is the most underrated segment in remodeling. You arrive, explain what is actually going on, and often the honest answer is cheaper and simpler than what the others quoted. That is where the trust that wins the job comes from, and almost nobody puts it in their marketing.',
        ],
      },
      {
        heading: 'Who you do not want',
        body: [
          'Handyman-level work, if you are a remodeler. Say it plainly or spend the year declining it.',
          'And the customer who is buying on price alone. Letting a job go to somebody half your price is a good outcome; the mistake is finding that out after two site visits instead of on the phone.',
        ],
      },
      {
        heading: 'Where each stream comes from',
        body: [
          'Planned work: search on job plus town, referrals from designers and realtors, and the neighbours who watched your last job.',
          'Insurance work: relationships with adjusters and restoration networks, plus content that shows you handle the process. Different channel, different message, same company.',
        ],
      },
    ],
    numbers: {
      title: 'Which stream is which for you',
      rows: [
        { label: 'Signed jobs last year: planned', value: 'count it' },
        { label: 'Signed jobs last year: insurance', value: 'count it' },
        { label: 'What each left you, on average', value: 'count it' },
      ],
      result: { label: 'The one you are better at', value: 'usually not the one you market' },
      after:
        'Put your own numbers in. Most remodelers with both streams have never compared them, and the comparison usually reorders the marketing plan on the spot.',
    },
    takeaway:
      'Split last year jobs into planned and insurance, and compare what each left you. Then decide which one your website is actually written for.',
  },
  {
    slug: 'gtm-auto-who-you-are-for',
    track: 'automotive',
    module: 2,
    title: 'Deciding which cars you want in your bay',
    summary:
      'The enthusiast with a car they love and the person who wants a cheap wash are both customers, and they cannot be sold to with the same page.',
    image: {
      src: '/academy/gtm-auto-who-you-are-for.webp',
      alt: 'Two cars, one large and detailed and one small and plain',
    },
    diagram: 'six-things',
    sections: [
      {
        heading: 'Two audiences, one bay',
        body: [
          'The enthusiast researches for weeks, follows shops, reads about products, and will pay well for work done properly on a car that matters to them.',
          'The commodity customer wants clean and cheap, decides in minutes, and compares on price alone.',
          'Both are legitimate businesses. Trying to be both, with one price list and one set of photographs, usually means being chosen by the second and priced by the first.',
        ],
      },
      {
        heading: 'What the enthusiast is buying',
        body: [
          'Not a clean car. The knowledge that a person who cares as much as they do handled it, used the right product, and did not cut corners where it does not show.',
          'That is why process content works so well in this trade: showing the steps is showing the thing they are actually paying for.',
        ],
      },
      {
        heading: 'What you must not be mistaken for',
        body: [
          'If you are a correction and coating shop, being taken for a car wash costs you the whole positioning, and it happens through a single cheap package on the price list.',
          'Decide which end of the market you want, then look at your own site and see which one it is currently advertising.',
        ],
      },
      {
        heading: 'How you sound',
        body: [
          'To the enthusiast, product names and process steps are not jargon, they are proof. To the commodity customer they are noise.',
          'You cannot write for both in the same paragraph. Choose, and be consistent everywhere.',
        ],
      },
      {
        heading: 'Where each one is',
        body: [
          'The enthusiast: picture platforms, owners groups, model-specific forums, and search for the specific service.',
          'The commodity customer: the map, price comparison, and whoever is closest.',
          'These barely overlap, which is convenient: it means your channel choice follows directly from your positioning choice.',
        ],
      },
    ],
    numbers: {
      title: 'What your bay hours are currently sold to',
      rows: [
        { label: 'Bay hours last month on high-value work', value: 'count it' },
        { label: 'Bay hours on cheap packages', value: 'count it' },
        { label: 'What each left you per hour', value: 'count it' },
      ],
      result: { label: 'Which customer your bay actually serves', value: 'the one with more hours' },
      after:
        'Put your own numbers in. If most hours go to the low-value work while the marketing talks about correction and coating, the positioning and the reality have come apart, and the bay is deciding, not you.',
    },
    takeaway:
      'Decide which end of the market you are for, then read your own price list and ask which customer it was written to attract.',
  },
  {
    slug: 'gtm-pro-positioning-inside-the-rules',
    track: 'professional',
    module: 2,
    title: 'Positioning a practice inside the rules',
    summary:
      'The same seven questions, with one difference that changes all of them: what you are permitted to say about yourself is decided by somebody else.',
    image: {
      src: '/academy/gtm-pro-positioning-inside-the-rules.webp',
      alt: 'A small circle placed off-centre inside a much larger outline',
    },
    diagram: 'six-things',
    sections: [
      {
        heading: 'The constraint that comes first',
        body: [
          'In every other trade, positioning is limited only by what is true. In a regulated practice it is limited by what your regulator permits you to claim, and those rules differ by profession and by state.',
          'Which means the seven questions are answered inside a boundary you have to know before you start. Read the current rules from the source, not from a competitor site that may itself be in breach.',
        ],
      },
      {
        heading: 'Who this is for, narrowly',
        body: [
          'In professional services the win comes from being specific. A lawyer for small construction businesses beats a lawyer for everyone, because the client with a construction dispute recognises themselves in the first and not the second.',
          'Narrow feels like turning away work. It usually produces more of it, because a referral is far easier to make when the person can be described in one sentence.',
        ],
      },
      {
        heading: 'What you actually sell',
        body: [
          'Not hours of expertise. The removal of a specific worry, on a specific timeline, by someone who has handled it before.',
          'The client cannot evaluate your judgement. They can evaluate whether you understood their situation in the first conversation, which is why that conversation is the product as much as the work is.',
        ],
      },
      {
        heading: 'What you must not be mistaken for',
        body: [
          'The cheapest option, if you are not. The general practitioner, if you are a specialist. The place that handles the thing next door to what you do, if that thing brings enquiries you cannot serve.',
          'Say it plainly where people look. In a referral-driven business, being described wrongly by a well-meaning referrer costs more than an advertisement can recover.',
        ],
      },
      {
        heading: 'How you will know it worked',
        body: [
          'Enquiries by source, how many became consultations, how many became clients, and what a client is worth across the whole relationship rather than the first invoice.',
          'That last number is the one that changes decisions, because in these professions the first engagement is usually a fraction of what a retained client is worth.',
        ],
      },
    ],
    numbers: {
      title: 'How specific is your description',
      rows: [
        { label: 'Can a referrer describe you in one sentence', value: 'yes / no' },
        { label: 'Does that sentence name a client type', value: 'yes / no' },
        { label: 'Does it name a situation, not a service', value: 'yes / no' },
        { label: 'Would a competitor be unable to reuse it', value: 'yes / no' },
      ],
      result: { label: 'Your score', value: 'out of 4' },
      after:
        'Ask three people who have referred you to write that sentence without help, and compare it with your own. The gap between what you think you are known for and what you are actually known for is the most useful thing you will learn this quarter.',
    },
    takeaway:
      'Read your regulator current advertising rules, then write the one sentence you want referrers to use. Check that the sentence is inside the rules before you publish it anywhere.',
  },
  {
    slug: 'automation-what-to-automate-first',
    track: 'contractors',
    module: 8,
    title: 'Automate the losses first, not the growth',
    summary:
      'Every automation list starts with the exciting things. The ones that pay are boring: answering, reminding, and following up on work you already have.',
    image: {
      src: '/academy/automation-what-to-automate-first.webp',
      alt: 'A funnel with dots falling in and a few escaping through gaps in its sides',
    },
    diagram: 'follow-up',
    sections: [
      {
        heading: 'The rule that decides the order',
        body: [
          'Automate what you are already losing before you automate what you hope to gain. A missed call is a job that was yours and left; a better ad is a job that might exist.',
          'That single rule puts the list in order and it is almost always the reverse of the order people start in.',
        ],
      },
      {
        heading: 'First: nobody waits without an answer',
        body: [
          'An automatic reply within seconds on whatever channel they used, saying you got it and when a human will call. Then the request lands somewhere a human will actually see it.',
          'This is the cheapest automation there is and the one that recovers the most, because the customer with a problem is calling three companies and the first reply wins an advantage price rarely overcomes.',
        ],
      },
      {
        heading: 'Second: the appointment does not get forgotten',
        body: [
          'A confirmation when it is booked, a reminder the day before, and a message when the crew is on the way. Each one removes a no-show, and a no-show is a paid hour thrown away.',
        ],
      },
      {
        heading: 'Third: the quote gets followed up',
        body: [
          'Two or three scheduled touches after an estimate, spaced out, that stop when the customer answers. Quotes are forgotten far more often than they are refused, and forgotten is recoverable.',
        ],
      },
      {
        heading: 'Fourth: the review gets asked for',
        body: [
          'A request sent at the moment the job is finished, not weeks later, with a link that takes one tap. Reviews decide who gets called next, and asking manually means asking sometimes.',
        ],
      },
      {
        heading: 'What not to automate',
        body: [
          'The quote itself, on anything but the simplest repeat work. A number produced without seeing the job is a number you will regret.',
          'The apology when something goes wrong. Automated regret reads as no regret at all.',
          'And anything that pretends to be a person when it is not. Say plainly that it is an automatic reply; people mind being handled far more than they mind a robot.',
        ],
      },
      {
        heading: 'What it connects to',
        body: [
          'Automation is only worth having if it writes into the place your work already lives: the scheduling and invoicing system you use, the calendar the crew looks at, the phone number customers already call.',
          'An automation that lives in its own separate app produces a second place to check, which is a new way to lose things rather than a way to stop losing them.',
        ],
      },
      {
        heading: 'What we use, and the disclosure that goes with it',
        body: [
          'When we set this up for clients we use Mosco, which is our own product. We say that plainly rather than presenting it as a neutral recommendation.',
          'What it does: one inbox for calls, texts, WhatsApp, email and the social channels; automatic first replies and follow-up sequences; booking and reminders; review requests after a finished job; and connections into the tools home service businesses already run, including Jobber, Housecall Pro, Zoho, Google Calendar, Google Reviews, Google Ads and Meta.',
          'You do not need us or it to do any of this. The order in the sections above is what matters, and a notebook plus a phone reminder beats a platform nobody set up.',
        ],
      },
    ],
    numbers: {
      title: 'Which automation to build first',
      rows: [
        { label: 'Requests last month that got no reply within an hour', value: 'count it' },
        { label: 'Appointments that no-showed', value: 'count it' },
        { label: 'Quotes sent with no answer either way', value: 'count it' },
      ],
      result: { label: 'Build in that order', value: 'largest number first' },
      after:
        'Put your own three numbers in. Whichever is biggest is the automation to build this month, and it is almost never the one that sounded most interesting.',
    },
    takeaway:
      'Count those three numbers before buying any tool. The biggest one is your first automation, and you may find a phone reminder fixes it.',
  },
  {
    slug: 'automation-hvac-after-hours',
    track: 'hvac',
    module: 8,
    title: 'The calls that arrive while you are on a roof',
    summary:
      'HVAC demand ignores office hours, and the emergency customer calls three companies. Automation here is mostly about the hours you are away.',
    image: {
      src: '/academy/automation-hvac-after-hours.webp',
      alt: 'A frame split into day and night, with a phone in the dark half',
    },
    diagram: 'follow-up',
    sections: [
      {
        heading: 'After hours is where the trade is lost',
        body: [
          'A system dies at seven in the evening in August. The homeowner searches, calls, and takes whoever responds. If your phone rings out, the automation you needed was an instant reply, not a smarter ad.',
          'An automatic text within seconds — we have your request, here is when someone will call, here is what to do meanwhile if water is leaking — holds the customer long enough for a human to reach them.',
        ],
      },
      {
        heading: 'Triage before dispatch',
        body: [
          'Not every after-hours call is an emergency, and sending a technician out at night to a problem that could wait until morning costs more than it earns.',
          'A few automated questions on the first reply — no cooling at all or weak, water present, system age — sort urgent from tomorrow before anyone gets in a van.',
        ],
      },
      {
        heading: 'The seasonal reminders that fill the quiet months',
        body: [
          'Maintenance visits scheduled from the last visit date, sent automatically before each season rather than when someone remembers.',
          'This is the automation with the clearest return in the trade, because it produces booked work in the exact weeks when nothing else is happening.',
        ],
      },
      {
        heading: 'The replacement conversation, followed up over months',
        body: [
          'A quote for a system replacement is a four-figure decision that a household takes weeks over. Two or three scheduled touches, stopping the moment they reply, recover work that was deferred rather than refused.',
        ],
      },
      {
        heading: 'The review, at the right minute',
        body: [
          'Sent when the job is closed and the house is cooling down. In a trade where the map result decides who gets called, recent reviews are the asset, and asking automatically means asking every time.',
        ],
      },
      {
        heading: 'What we use, and the disclosure',
        body: [
          'We set this up with Mosco, our own product. Saying so plainly is the point: this is not a neutral recommendation.',
          'For HVAC it covers the after-hours reply on calls, texts and WhatsApp, the triage questions, seasonal maintenance reminders from the last visit, follow-up on replacement quotes, and review requests on job close. It connects into Jobber and Housecall Pro, which is where most HVAC businesses already keep their jobs, plus Google Calendar and Google Reviews.',
          'The order above matters more than the tool. A pre-written text you send by hand within two minutes beats a platform you never configured.',
        ],
      },
    ],
    numbers: {
      title: 'What after hours is costing',
      rows: [
        { label: 'Calls outside business hours last month', value: 'count it' },
        { label: 'How many got a reply that evening', value: 'count it' },
        { label: 'Your average emergency job', value: 'say $450' },
      ],
      result: { label: 'The gap, times your average job', value: 'your after-hours cost' },
      after:
        'Put your own numbers in. This is usually the single largest recoverable number in an HVAC business, and it is recovered by an automatic text rather than by any advertising.',
    },
    takeaway:
      'Look at your call log for last month after six in the evening. Count how many got any response that night. That count is your first automation.',
  },
  {
    slug: 'automation-remodel-the-long-follow-up',
    track: 'remodeling',
    module: 8,
    title: 'Automating a decision that takes months',
    summary:
      'Remodel estimates are deferred, not refused, and the contractor still in the conversation three months later is the one who signs. Nobody keeps that up by memory.',
    image: {
      src: '/academy/automation-remodel-the-long-follow-up.webp',
      alt: 'A long line with five marks along it at widening intervals',
    },
    diagram: 'follow-up',
    sections: [
      {
        heading: 'Memory is the thing that fails',
        body: [
          'A remodeler sends an estimate in March and means to check in. Two jobs start, a supplier lets them down, and it is June. The customer signed with somebody who called in April.',
          'This is not a discipline problem, it is a memory problem, and memory is exactly what should be automated.',
        ],
      },
      {
        heading: 'The sequence that works',
        body: [
          'A few days after the estimate: did anything need explaining. A couple of weeks later: still available for the dates discussed. Then monthly with something useful rather than a nudge — a similar job just finished, a material now in stock.',
          'Every touch stops the moment they reply, because the point is to stay present, not to pester. After a few months, mark it closed and stop.',
        ],
      },
      {
        heading: 'Capturing the enquiry properly in the first place',
        body: [
          'A form that asks the four things that decide whether this is your customer: what job, roughly when, roughly what budget, and where. It saves a site visit to a project that was never yours.',
          'Then an instant reply confirming it arrived and when you will call. Remodel buyers are patient, but not with silence.',
        ],
      },
      {
        heading: 'After the job, which most contractors skip entirely',
        body: [
          'A review request while the site is clean and they are happy. Photographs filed against the project rather than lost in a phone. And a note to check back in a year, because the customer who did the kitchen has a bathroom.',
        ],
      },
      {
        heading: 'What not to automate here',
        body: [
          'The estimate. A remodel quote produced without seeing the house is a number you will lose money on, and the customer knows it.',
          'The relationship with designers and realtors who refer you. That is a phone call and a coffee, and automating it is how it stops working.',
        ],
      },
      {
        heading: 'What we use, and the disclosure',
        body: [
          'Mosco, our own product, stated plainly rather than dressed up as a recommendation.',
          'For remodeling it covers the qualifying form, the instant reply, the multi-month follow-up sequence that stops on any answer, review requests on completion, and the reminder to check back later. It connects into Jobber, Housecall Pro and Zoho, plus Google Calendar, Google Reviews, Google Ads and Meta.',
          'A spreadsheet with a date column and a weekly habit does the same job. The automation matters because the habit is the part that fails in a busy month.',
        ],
      },
    ],
    numbers: {
      title: 'The estimates still waiting',
      rows: [
        { label: 'Estimates sent in the last six months', value: 'count it' },
        { label: 'Signed', value: 'count it' },
        { label: 'Refused outright', value: 'count it' },
      ],
      result: { label: 'Neither signed nor refused', value: 'the remainder, still open' },
      after:
        'Put your own numbers in. That remainder is not a lost pile, it is a queue nobody is working. It is also, for most remodelers, larger than the signed column.',
    },
    takeaway:
      'List every estimate from the last six months with no yes and no no. Contact all of them this week, then set up the sequence so it never builds up again.',
  },
  {
    slug: 'automation-auto-booking-and-return',
    track: 'automotive',
    module: 8,
    title: 'Booking, reminding, and getting the car back',
    summary:
      'A shop lives on booked bay hours and returning customers. Both are automation problems, and both are usually handled by memory and a paper diary.',
    image: {
      src: '/academy/automation-auto-booking-and-return.webp',
      alt: 'A calendar grid with two squares marked far apart',
    },
    diagram: 'follow-up',
    sections: [
      {
        heading: 'Booking at eleven at night',
        body: [
          'A significant share of this audience decides after an hour of looking at photographs, long after you have closed. If the only way to book is a phone call in the morning, some of them are gone by morning.',
          'Online booking with your real availability, plus an instant confirmation, captures the decision at the moment it is made.',
        ],
      },
      {
        heading: 'The reminder that protects the bay',
        body: [
          'A confirmation when booked, a reminder the day before, and instructions if there are any. A no-show in a shop is not a missed appointment, it is a paid empty bay, and the reminder is the cheapest insurance against it.',
        ],
      },
      {
        heading: 'Quotes for expensive work, followed up',
        body: [
          'A full correction or a coating is a considered purchase. Somebody who asked in March and went quiet was usually waiting for money or a season. Two or three scheduled touches recover a real share of them.',
        ],
      },
      {
        heading: 'The maintenance return, which the trade is built for',
        body: [
          'Coatings need maintenance, often annually, and many warranties depend on it. That is a booking you are entitled to ask for, on a date you already know.',
          'Scheduling that reminder from the service date is the highest-return automation in this trade, and almost no shop does it.',
        ],
      },
      {
        heading: 'The review, at handover',
        body: [
          'While they are looking at their own car looking better than it has in years. Not an email a week later, when the feeling has faded and the car is dirty again.',
        ],
      },
      {
        heading: 'What we use, and the disclosure',
        body: [
          'Mosco is our own product and we say so plainly.',
          'For a shop it covers online booking against real availability, confirmations and reminders, follow-up on high-value quotes, maintenance reminders scheduled from the service date, and a review request at handover. Calls, texts, WhatsApp, email, Instagram and Facebook messages land in one inbox rather than five apps, and it connects to Google Calendar, Google Reviews, Google Ads and Meta.',
          'None of this requires us. A calendar with reminders set on the day of service does the maintenance part, which is the part that pays.',
        ],
      },
    ],
    numbers: {
      title: 'The returns you are entitled to ask for',
      rows: [
        { label: 'Coating or protection jobs last year', value: 'count it' },
        { label: 'How many came back for maintenance', value: 'count it' },
        { label: 'Your maintenance service price', value: 'count it' },
      ],
      result: { label: 'The gap, times the price', value: 'money you were owed and did not ask for' },
      after:
        'Put your own numbers in. Unlike almost every other line in this course, this one requires no marketing at all: the customers already chose you and the visit is already part of what they bought.',
    },
    takeaway:
      'Pull every coating job from last year and set a reminder for each one twelve months from its service date. That single afternoon is worth more than a month of advertising.',
  },
  {
    slug: 'automation-pro-intake-and-privacy',
    track: 'professional',
    module: 8,
    title: 'Automating intake without breaking the rules',
    summary:
      'The first response is the service and can be automated. What people send in that first message often cannot be stored anywhere you like.',
    image: {
      src: '/academy/automation-pro-intake-and-privacy.webp',
      alt: 'An envelope enclosed inside a protective circle',
    },
    diagram: 'follow-up',
    sections: [
      {
        heading: 'The acknowledgement that has to be instant',
        body: [
          'Somebody contacting a professional is worried and comparing responsiveness, because it is the only thing they can assess. An automatic acknowledgement within seconds, stating a real response time you meet, is the highest-value automation in a practice.',
          'It has to state a time you actually keep. A promise of one hour, missed, is worse than a promise of one business day, kept.',
        ],
      },
      {
        heading: 'What the first message may collect',
        body: [
          'This is where these professions differ from every other trade in the course. A form that asks for medical details, financial details or the specifics of a legal matter is collecting regulated information, and where it is stored and who can read it is subject to obligations your practice carries.',
          'The safe pattern is to collect the minimum that lets a human call back — name, contact, and the general area of the matter — and take the detail in the conversation.',
          'Confirm the specifics with your regulator and, where health information is involved, with somebody who knows the privacy rules. We are not that authority.',
        ],
      },
      {
        heading: 'Consultations that do not get forgotten',
        body: [
          'Confirmation, reminder, and a way to reschedule without a phone call. A missed consultation in a practice is an hour of the most expensive time in the business.',
        ],
      },
      {
        heading: 'Following up on the deferred',
        body: [
          'A consultation that did not become an engagement is usually waiting, not refused. A polite check some weeks later recovers work, and the tone matters more here than anywhere else in this course.',
        ],
      },
      {
        heading: 'The referral loop, which is not automatable',
        body: [
          'Thanking whoever sent you a client is a personal act. What can be automated is the reminder to do it, and the record of who sent what, which is the part that gets lost.',
          'Reviews follow the same rule: whether you may ask at all depends on your profession. Check before automating the request.',
        ],
      },
      {
        heading: 'What we use, and the disclosure',
        body: [
          'Mosco is our own product. Stating that is not a formality: a course that quietly recommends its own author is not a course.',
          'For a practice it covers the instant acknowledgement across calls, texts, WhatsApp and email in one inbox, consultation booking with confirmations and reminders, follow-up sequences that stop on any reply, and a record of who referred whom. It connects to Zoho, Google Calendar and Google Reviews.',
          'The compliance question is yours regardless of the tool. Any platform can be configured in a way your regulator would not accept, and the obligation sits with the practice, not the software.',
        ],
      },
    ],
    numbers: {
      title: 'Where the practice is losing people',
      rows: [
        { label: 'Enquiries last month', value: 'count it' },
        { label: 'Acknowledged within an hour', value: 'count it' },
        { label: 'Became a consultation', value: 'count it' },
      ],
      result: { label: 'Lost before anyone spoke to them', value: 'the first gap' },
      after:
        'Put your own numbers in. In most practices the largest single loss happens before any professional judgement is involved, and it is closed by an automatic acknowledgement rather than by anything expensive.',
    },
    takeaway:
      'Decide the response time you can actually keep, then automate an acknowledgement that promises exactly that. Keeping a modest promise beats missing an ambitious one.',
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
