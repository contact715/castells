import { PRICES } from '../config/pricing.mjs';
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
    title: 'What marketing actually costs a home service business',
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
          `Running one channel for you, whether that is Google, Meta or Yelp, is ${PRICES.monthlyOneChannel} a month. That covers building the campaigns, launching them, checking them every week and sending you a report you can read without a glossary.`,
          `Running several channels together, plus your Google Business Profile and reviews, is ${PRICES.monthlySeveralChannels} a month.`,
          `A website is one-time work, from ${PRICES.websiteFrom}, depending on how many pages you need and whether we also write the text and handle photos. Setting up a CRM so calls and forms stop getting lost is from ${PRICES.crmSetupFrom}.`,
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
    title: 'Why you should own your Google Ads account',
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
  {
    id: 4,
    slug: 'is-your-site-in-google',
    title: 'Was our own site in Google? We checked.',
    excerpt:
      'A five-minute check any owner can run on their own site, and what we found when we ran it on ours: not a single page in the index.',
    date: 'August 24, 2026',
    readingMinutes: 5,
    category: 'Search',
    author: 'Dmitrii Z.',
    authorRole: 'Founder, Castells Media',
    sections: [
      {
        heading: 'The check takes five minutes',
        body: [
          'Open Google and type site: followed by your domain, with no space. For us that is site:castells.media. What comes back is roughly what Google has stored about your site.',
          'If you see your pages, fine. If you see a handful when you have thirty, most of your site is invisible. If you see nothing at all, your site is not in the index, and every dollar you spend on content is going into a room nobody can enter.',
        ],
      },
      {
        heading: 'What we found on ours',
        body: [
          'Nothing. Not one page. The results were a book about a sociologist with the same surname, Catalan human towers, and our own company filing in the California business registry.',
          'Our name found the registry entry and a few other agencies called Castells. Our site was not there. Searching for what we actually do, marketing for HVAC contractors in our area, returned two competitors and no us.',
          'This is an agency that sells search work. It is not a comfortable thing to publish. It is also the reason this article exists: the same three problems sit on a lot of contractor sites, and they are easier to find in someone else\'s house than your own.',
        ],
      },
      {
        heading: 'Problem one: the site answered on two addresses',
        body: [
          'Our site loaded at castells.media and at www.castells.media, both returning a normal page, with nothing telling anyone which one was real. To a search engine that is two sites with identical content competing with each other.',
          'Check yours: type your domain with www and without. If both open and neither jumps to the other, that is the same problem. It is fixed in one line of server configuration.',
        ],
      },
      {
        heading: 'Problem two: every page had the same title',
        body: [
          'Forty of our pages shared one title. Services, industries, all of them identical in the eyes of a crawler. Forty pages that look the same are not forty chances to be found, they are forty pages competing for the same slot and none of them winning.',
          'Check yours: open two different service pages and look at the browser tab. Different text? Good. Same text? There is your problem.',
        ],
      },
      {
        heading: 'Problem three: the links only existed for humans',
        body: [
          'Our menu worked perfectly when you clicked it, because it was built with scripts. A crawler that does not run scripts saw five pages out of seventy-four. Everything else had no way in.',
          'This one is harder to check yourself, but there is a rough version: open your site with JavaScript disabled in your browser settings. Whatever disappears is roughly what a crawler may be missing.',
        ],
      },
      {
        heading: 'What we still do not know',
        body: [
          'Whether Google ever tried to crawl us and failed, or simply has not come around yet. That answer lives in Google Search Console, and we do not have access to it on this domain yet. Anyone telling you they know the cause without looking at Search Console is guessing.',
          'So this is not a story with a happy ending attached. We found three real problems, we fixed all three, and now we wait and check again in a month. If it works, we will publish that too, with the same screenshots and the same dates.',
        ],
      },
      {
        heading: 'If you run the check on your own site',
        body: [
          'Three things worth looking at, in order: does site:yourdomain.com return your pages, do two different pages have two different titles, and does your site load on one address instead of two.',
          'None of that requires an agency. If the answers come back badly and you want a hand, our prices are on this site and the phone number is at the bottom of every page.',
        ],
      },
    ],
  },
  {
    id: 5,
    slug: 'local-services-ads-moving-into-google-ads',
    title: 'Local Services Ads are moving into Google Ads',
    excerpt:
      'Google is folding Local Services Ads into regular Google Ads this month, starting with plumbing, HVAC and roofing. One part of the change is easy to miss.',
    date: 'August 26, 2026',
    readingMinutes: 4,
    category: 'Ads',
    author: 'Dmitrii Z.',
    authorRole: 'Founder, Castells Media',
    sections: [
      {
        heading: 'What is changing',
        body: [
          'Local Services Ads, the pay-per-lead program behind the Google Guaranteed badge, is moving inside regular Google Ads. Google describes the change in its own Ads Help documentation, at support.google.com/google-ads/answer/17213585, and the rollout started in early August 2026.',
          'The separate Local Services app and dashboard goes away for migrated accounts. Campaigns continue as a Google Ads campaign type built for pay-per-lead, managed from the same place as any other Google Ads campaign.',
        ],
      },
      {
        heading: 'Who is first',
        body: [
          'The first wave is a set of US home and storefront trades: plumbing, HVAC, electrical, appliance repair, house cleaning, lawn care, roofing, pest control and moving. Most of the industries this agency works in are on that list.',
          'Service-area businesses without a storefront, and accounts with custom bidding, come later in 2026. Everything outside the US follows in 2027.',
        ],
      },
      {
        heading: 'What stays the same',
        body: [
          'The parts that made Local Services Ads simple are not changing. Ads still only show on Search and Maps. Campaigns are still built from your Google Business Profile instead of keywords you pick. You still pay for a lead, a call, a message or a booking, not for a click that goes nowhere.',
        ],
      },
      {
        heading: 'The one thing to do this week',
        body: [
          'Google says historical performance reports do not carry over in the migration. Budgets, settings and creative move automatically. Your record of what already happened does not.',
          'If you or whoever runs your ads has a Local Services account in one of the trades above, download the reporting now, before the account switches. Waiting until after the migration means that history is simply gone.',
        ],
      },
      {
        heading: 'Our take',
        body: [
          'Local Services Ads was built to be the easy option: Google runs it, you barely touch the settings. Folding it into Google Ads puts it next to a platform with a lot more knobs, which is either an upgrade or a way to make a simple thing complicated, depending on who is managing the account.',
          'If an agency runs your ads, ask them directly whether your account has received the migration yet and whether they pulled your report history. If nobody runs it but you, the ten minutes it takes to check and export is worth more than the ten minutes it takes to read this paragraph.',
        ],
      },
    ],
  },
  {
    id: 6,
    slug: 'fake-rating-on-our-own-site',
    title: 'We had a fake five-star rating on our own site',
    excerpt:
      'Every visitor who submitted our contact form saw five stars and a 5.0 score. We have zero published reviews. Here is what happened and what we fixed.',
    date: 'August 30, 2026',
    readingMinutes: 4,
    category: 'How we work',
    author: 'Dmitrii Z.',
    authorRole: 'Founder, Castells Media',
    sections: [
      {
        heading: 'What every visitor saw',
        body: [
          'Fill out the contact form on our site and the page that loaded next used to show five filled-in stars and the number 5.0, next to a line promising a response within 24 hours. It looked exactly like a review score.',
          'We do not have a single published review on this site. Not one. Asking real clients for a quote is still an open item on our own list. The stars and the score were never connected to anything real.',
        ],
      },
      {
        heading: 'Where it came from',
        body: [
          'This site started from a commercial template, the kind a lot of small agencies and contractors buy to launch quickly. Templates ship with placeholder trust signals built in: star ratings, client counts, years in business, testimonials with stock photos. We found and removed a batch of that weeks ago, on the pages a search engine actually crawls.',
          'This block was not on one of those pages. It was on the thank you page, the one that only appears after someone submits a form, so it never showed up in that pass.',
        ],
      },
      {
        heading: 'The part worth remembering',
        body: [
          'A rating on a homepage gets checked because it is visible and public. A rating on a thank you page is seen only by the people who just trusted you with their contact details, and it gets checked by almost nobody, including, for a while, us.',
          'Right next to the stars sat a second problem: "Response within 24 hours," a specific promise with no process behind it that would make it reliably true. It came out too, replaced with "we reply personally," which is what actually happens.',
        ],
      },
      {
        heading: 'Why it matters more on a small site',
        body: [
          'A company with thousands of real reviews can round a 4.87 up to a 4.9 and call it rounding. We have zero reviews. There is no rounding version of zero. It is either honest or it is not, and for a while, on one page, it was not.',
          'We have a rule for this site: no number goes up without a source we can point to. It held on every page we had checked. It did not hold on a page we had not checked, which in practice is the same as not having the rule at all.',
        ],
      },
      {
        heading: 'Check the pages nobody checks',
        body: [
          'If you run your own site or paid someone to build it, the pages worth a second look are not the ones you show people, they are the ones your own customers land on without you watching: order confirmations, thank you pages, booking confirmations, receipt emails. Anything built from a template inherits whatever was in the template, stars included.',
          'Submit your own form. Book your own slot. Read what comes back as if you were the customer, not the owner. If a number or a rating appears, ask where it came from. If you cannot answer that in one sentence, it should not be there.',
        ],
      },
      {
        heading: 'Where we actually stand',
        body: [
          'We have real clients and have not yet asked most of them for a written review, so until we have some, this site says nothing about ratings. When we do have reviews, they will be actual quotes with the actual client\'s name, not five stars generated on page load.',
        ],
      },
    ],
  },
];

export const findPostBySlug = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
export const findPostById = (id: number) => BLOG_POSTS.find((p) => p.id === id);
