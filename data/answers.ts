/**
 * Страницы-ответы: /learn/{вопрос}.
 *
 * Правило создания, из разбора архитектуры: страница появляется, только если
 * внутри есть НАШ собственный проверяемый факт. Без факта это пересказ чужих
 * советов, каких в интернете и так тысяча.
 *
 * Темы подобраны так, чтобы не столкнуться с блогом. Там уже разобраны цены,
 * владение рекламным кабинетом и «телефон замолчал»; повторять их здесь значит
 * делить вес между двумя своими же страницами.
 *
 * Что считается нашим фактом:
 *   - живые сайты клиентов, которые можно открыть прямо сейчас;
 *   - наши опубликованные цены и условия работы;
 *   - состав работ, который мы правда делаем каждый месяц.
 *
 * Числа без источника сюда не идут.
 */

export interface Answer {
  slug: string;
  /** Вопрос так, как его задаёт человек. Он же заголовок страницы. */
  question: string;
  /** Короткий ответ, который годится и в описание для поиска. */
  short: string;
  /** Разделы ответа. */
  sections: { heading: string; body: string[] }[];
  /** Наш факт, на котором держится страница. Без него страницы бы не было. */
  ourEvidence: string;
  /** Куда человеку идти дальше. */
  next: { label: string; page: 'services' | 'pricing' | 'work' | 'contact' };
}

export const ANSWERS: Answer[] = [
  {
    slug: 'website-or-facebook-page',
    question: 'Do I need a website if I already have a Facebook page?',
    short:
      'A Facebook page is where people check that you exist. A website is where they decide to call. For a home service business you need the second one, and it does not have to be big.',
    sections: [
      {
        heading: 'What a Facebook page cannot do',
        body: [
          'It cannot show your service area, your licence, your prices or your hours in a way a stranger can scan in ten seconds. It cannot rank for "AC repair near me". And it cannot be sent as a link to someone who is comparing three companies at once, because they land in a feed instead of an answer.',
          'It also is not yours. The page lives by rules you do not control, and a suspended account takes your phone number with it.',
        ],
      },
      {
        heading: 'What the website has to do, and nothing more',
        body: [
          'Say what you do and where. Show the phone number so it can be tapped. Have one form with three fields. List the services people actually search for, each on its own page. Show a few jobs you have done.',
          'That is all of it. A home service site does not need a blog, a video background or an animated hero. It needs to answer the question and get out of the way.',
        ],
      },
      {
        heading: 'What it costs',
        body: [
          'Ours start at $1,750 as a one-time project, depending on how many pages you need. Month to month after that, no contract. It is the same number published on our prices page, not something invented for this article.',
        ],
      },
    ],
    ourEvidence:
      'Two sites we built are live right now and you can open them: acromanservice.com (Roman Service, HVAC, North Port, Florida) and fivestarcomfort.com (heating and air conditioning, Bothell, Washington). Both are the kind of site described above.',
    next: { label: 'See what a website costs', page: 'pricing' },
  },
  {
    slug: 'what-an-agency-does-every-month',
    question: 'What does a marketing agency actually do every month?',
    short:
      'On a monthly plan the work is the same four things: watch the ads, fix what is losing money, keep the local profiles current, and send you a report you can read without a dictionary.',
    sections: [
      {
        heading: 'The honest answer',
        body: [
          'Most of the month is not creative work. It is checking which searches brought calls and which burned budget, turning off the second kind, and moving money to the first. On a small account that is a few hours a week done properly, not forty.',
          'Anyone promising daily heroics on a $590 plan is either not doing them or not doing them on your account.',
        ],
      },
      {
        heading: 'What is in our monthly plans',
        body: [
          'The $590 plan is one channel, Google or Meta or Yelp, built, launched, checked weekly and adjusted. The $1,490 plan is several channels at once, plus the local presence: Google Business Profile, Yelp, and getting and answering reviews.',
          'Both are month to month with no contract, and the ad budget goes straight to Google, Meta and Yelp from your own account. We never take a cut of it, so we have no reason to talk you into spending more.',
        ],
      },
      {
        heading: 'What you should get every month, from anyone',
        body: [
          'A report in plain numbers: how many calls and forms came in, what they cost, and what changed since last month. Access to your own ad accounts. A person who answers when you write.',
          'If a report shows impressions and clicks but not calls, it is measuring the wrong thing.',
        ],
      },
    ],
    ourEvidence:
      'Our plans and what is inside them are published on the prices page: $590 for one channel, $1,490 for several channels with local presence, month to month, ad budget paid directly by you. Nothing on this page is a number invented for the article.',
    next: { label: 'See the plans', page: 'pricing' },
  },
  {
    slug: 'contract-with-a-marketing-agency',
    question: 'Do I have to sign a long contract with a marketing agency?',
    short:
      'No, and you should be careful with anyone who insists. We work month to month. A contract that locks you in for a year protects the agency, not you.',
    sections: [
      {
        heading: 'Why long contracts exist',
        body: [
          'They exist because the first two months of a new account are the expensive ones for the agency: setting things up, learning what converts, spending budget on tests. A twelve-month term guarantees that effort gets paid back even if the results never arrive.',
          'It is a real problem for the agency. It is just not yours to solve with your own money.',
        ],
      },
      {
        heading: 'What to check instead of the term',
        body: [
          'Whose name is on the ad accounts. If the agency owns them, leaving means starting from zero: history, audiences, learning, all gone. Yours should be yours from day one.',
          'Where the ad budget goes. It should be billed by Google, Meta and Yelp to your card, not paid to the agency and passed along. You want to see every dollar.',
          'What happens on the last day. Ask directly: if I leave next month, what do I keep? The answer should be everything: accounts, website, profiles, phone number.',
        ],
      },
      {
        heading: 'How we work',
        body: [
          'Month to month, no contract, no setup fee for the monthly plans. The accounts are yours. The ad budget is billed to you by the platforms directly.',
          'If we are not earning the money, stopping should be easy. That is the point of not having one.',
        ],
      },
    ],
    ourEvidence:
      'These are our published terms, on the prices page of this site: month to month, no contract, and the ad budget goes straight to Google, Meta and Yelp from your own account with no cut taken by us.',
    next: { label: 'See our terms and prices', page: 'pricing' },
  },
];

export const findAnswer = (slug?: string) => ANSWERS.find((a) => a.slug === slug);
