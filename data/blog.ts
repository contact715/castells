/**
 * Статьи блога.
 *
 * До 23 августа 2026 здесь лежали девять текстов из шаблона, среди них
 * «Legal Tech: How AI Transforms Contract Review» и «Behind every pixel lies
 * purpose passion and powerful brand» — к нашему делу отношения не имеющие.
 * Подписаны они были пятью несуществующими авторами с фотографиями со стока,
 * а внутри шли обороты вроде «ROI soars» и «dominate map packs».
 *
 * Владелец решил блог не удалять, а наполнить своими: «оставить, напишу
 * две-три своих».
 *
 * Правило для этого файла: в статье не появляется число, у которого нет
 * источника. Все цифры ниже — наши опубликованные цены со страницы /pricing,
 * то есть проверяются на этом же сайте. Ни одного результата клиента, ни
 * одного «в среднем по рынку» здесь нет и не будет, пока не появится замер,
 * на который можно сослаться.
 */

export interface BlogSection {
  heading: string;
  body: string[];
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  category: string;
  author: string;
  authorRole: string;
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'what-marketing-costs-home-service-business',
    title: 'What marketing actually costs for a home service business',
    excerpt:
      'Nobody publishes prices, so every call starts with guessing. Here are ours, and what the money is actually spent on.',
    date: 'August 23, 2026',
    readingMinutes: 4,
    category: 'Money',
    author: 'Dmitrii Z.',
    authorRole: 'Founder, Castells Media',
    sections: [
      {
        heading: 'Why nobody tells you the price',
        body: [
          'Look up ten marketing agencies and you will find ten contact forms and no numbers. The reasoning is always the same: every business is different, so we need a call first. Some of that is fair. Most of it is a sales tactic, because once you are on the call it is harder to walk away.',
          'The cost of that tactic is your time. You sit through four calls to learn that two of them were never in your range.',
        ],
      },
      {
        heading: 'What we charge',
        body: [
          'Running one channel for you, whether that is Google, Meta or Yelp, is $590 a month. That covers building the campaigns, launching them, checking them every week and sending you a report you can read without a glossary.',
          'Running several channels together, plus your Google Business Profile and reviews, is $1,490 a month.',
          'A website is one-time work, from $1,750, depending on how many pages you need and whether we also write the text and handle photos. Setting up a CRM so calls and forms stop getting lost is from $1,500.',
        ],
      },
      {
        heading: 'The part that is not our fee',
        body: [
          'The ad budget is separate, and it should never touch our account. You pay Google, Meta and Yelp directly from your own card. You see every dollar in your own dashboard, and we take no percentage of it.',
          'This matters more than it sounds. When an agency runs the budget through its own account, you cannot check what was actually spent, and you cannot leave without losing the history.',
        ],
      },
      {
        heading: 'How much budget you actually need',
        body: [
          'That depends on your city and your trade, and anyone who gives you a number before asking those two things is guessing. What we can say is how to think about it: your budget has to be big enough to buy a meaningful number of clicks in your service area every week. If it is so small that your ads run for three days and stop, the data never adds up to anything and nobody learns anything.',
          'Tell us your city and your service, and we will say plainly what a starting budget looks like there, and whether it makes sense to start with ads at all or fix the site first.',
        ],
      },
      {
        heading: 'What to ask any agency before you sign',
        body: [
          'Is there a contract or a minimum term? Ours is month to month, and you can stop in any month.',
          'Whose name is on the ad account? It should be yours, on day one.',
          'Is there a setup fee on top of the monthly price? Sometimes there is, when there is a lot to build first, but you should hear the number before you pay anything.',
          'What happens if we stop working together? Everything built for you, the accounts, the site, the CRM, the data, should stay with you.',
        ],
      },
    ],
  },
  {
    id: 2,
    slug: 'who-should-own-your-google-ads-account',
    title: 'Who should own your Google Ads account, and why it is you',
    excerpt:
      'The fastest way to get trapped with an agency you have outgrown is to let them keep the account in their name.',
    date: 'August 23, 2026',
    readingMinutes: 3,
    category: 'How we work',
    author: 'Dmitrii Z.',
    authorRole: 'Founder, Castells Media',
    sections: [
      {
        heading: 'How people end up locked in',
        body: [
          'An agency offers to get you started quickly. They create the Google Ads account, the Meta account, sometimes the Google Business Profile too, all under their own login. Everything works, calls come in, nobody thinks about it again.',
          'A year later you want to try someone else. Now you find out that the campaigns, the conversion history, the audiences and the reviews you collected are not yours to take. Starting over means the new account has no history, which means it costs more per click until it learns again. That cost is exactly what keeps people paying an agency they have stopped trusting.',
        ],
      },
      {
        heading: 'How it should be set up',
        body: [
          'You create the accounts, or they are created in your name. Then you give the agency access as a user. Access can be removed in one click, ownership cannot be taken away.',
          'The same goes for the website, the domain and the CRM. If your site sits on hosting the agency controls, under a domain the agency registered, you do not own your own address.',
        ],
      },
      {
        heading: 'How we do it',
        body: [
          'Every account is in your name from the start, and we work inside it as a user. The ad budget is charged to your card, not ours.',
          'If you decide to leave, you remove our access and everything keeps running. No handover fee, no negotiation, no waiting.',
        ],
      },
      {
        heading: 'What to check today',
        body: [
          'Open your Google Ads account and look at the admin section: it lists who owns it and who has access. Do the same in Meta Business Manager. Then check where your domain is registered and whose email is on it.',
          'If any of those answers is your agency instead of you, that is worth fixing now, while everyone is still on good terms.',
        ],
      },
    ],
  },
  {
    id: 3,
    slug: 'phone-is-quiet-what-to-fix-first',
    title: 'The phone went quiet. What to fix first',
    excerpt:
      'Before you spend anything on ads, there are three cheaper things that are usually broken.',
    date: 'August 23, 2026',
    readingMinutes: 4,
    category: 'Getting more jobs',
    author: 'Dmitrii Z.',
    authorRole: 'Founder, Castells Media',
    sections: [
      {
        heading: 'First: answer what you already get',
        body: [
          'Most contractors we talk to are losing jobs they already paid for. A call comes in during a job, nobody picks up, and nobody calls back that evening. The customer called the next company on the list twenty minutes later.',
          'Before spending a dollar on new traffic, count what happens to the calls you get now. Whoever calls you back first usually gets the job, and that has nothing to do with advertising.',
        ],
      },
      {
        heading: 'Second: fix your Google profile',
        body: [
          'For local trades, the map results sit above everything else, and they are free. A profile with the right categories, real photos of your own work, your service area and recent reviews will bring calls without any ad budget.',
          'Two things people skip: asking for reviews after every good job, and answering the reviews you already have, including the bad ones. A calm reply to a complaint reads better to the next customer than ten five star ratings with no text.',
        ],
      },
      {
        heading: 'Third: give people somewhere to land',
        body: [
          'If your only presence is a Facebook page, every ad you run sends people to a place where they cannot see your prices, your service area, or a way to call you in one tap.',
          'A site does not need to be big. It needs to say what you do, where you work, what it roughly costs, and give a phone number and a form. Anything past that is decoration.',
        ],
      },
      {
        heading: 'Then, and only then, ads',
        body: [
          'Ads make an existing system busier. They do not create one. If calls go unanswered, if your profile is thin, if there is nowhere to send people, ads will simply make those problems more expensive.',
          'Fix the three things above and a modest budget starts working. Skip them and no budget is enough.',
        ],
      },
    ],
  },
];

export const findPostBySlug = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
export const findPostById = (id: number) => BLOG_POSTS.find((p) => p.id === id);
