import React from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';

/*
  Страница цен, создана 23 августа 2026.

  Зачем отдельная страница, когда цены уже есть на /services: цену ищут
  адресно, и запрос «how much does marketing cost per month» человек задаёт
  до того, как выбрал подрядчика. Почти никто из агентств цену не публикует
  — у конкурента prosbuddy.com это самый сильный элемент страницы, там
  первым же вопросом раскрыта вилка месячного чека, и человек сам себя
  квалифицирует до звонка.

  Все числа и условия подтверждены владельцем:
  22 августа — тарифы $590 и $1,490, сайт от $1,750, настройка от $1,500;
  23 августа — договора и минимального срока нет, плата за запуск считается
  по объёму, кабинеты и сайт остаются клиенту.

  Вёрстка намеренно НЕ тремя равными колонками: так страница читается как
  тариф на программу, и нас сравнивают с чужой подпиской за $97, только
  дороже. Тарифы идут парой, разница объяснена порогом роста, а не длиной
  списка функций.
*/

interface PricingPageProps {
  onNavigate: (page: PageView, data?: NavigationData) => void;
}

const PLANS = [
  {
    name: 'One channel',
    price: '$590',
    period: 'per month',
    forWhom: 'You want to start with one thing and see whether the calls come.',
    includes: [
      'One channel: Google, Meta or Yelp',
      'Campaigns built and launched',
      'Weekly check and adjustments',
      'A report you can actually read',
    ],
  },
  {
    name: 'Several channels',
    price: '$1,490',
    period: 'per month',
    forWhom: 'You already have a flow of jobs and want more, from several places at once.',
    includes: [
      'Google, Meta and Yelp together',
      'Google Business Profile and reviews',
      'Landing pages for the campaigns',
      'Weekly check and adjustments',
      'Faster answer when something breaks',
    ],
  },
];

const PROJECTS = [
  {
    name: 'Website or landing page',
    price: 'from $1,750',
    note: 'Depends on how many pages and whether you need texts and photos.',
  },
  {
    name: 'Brand: logo, colours, templates',
    price: 'quoted per project',
    note: 'Usually goes together with a website, so it is priced as one job.',
  },
  {
    name: 'CRM and follow-up setup',
    price: 'from $1,500',
    note: 'Calls, forms and messages in one inbox, on our own platform, Mosco.',
  },
];

const MONEY_QUESTIONS = [
  {
    q: 'How much does it usually come to per month?',
    a: 'Most of the businesses we work with land between $590 and $1,490 a month for the work, plus whatever they decide to spend on ads. If you tell us your city and your service, we will say which of the two makes sense for you.',
  },
  {
    q: 'Is there a contract or a minimum term?',
    a: 'No. It is month to month. If a month goes badly and you want to stop, you stop — no notice period, no cancellation fee.',
  },
  {
    q: 'Do you charge a setup fee?',
    a: 'It depends on the work. Sometimes launching campaigns is part of the monthly price, sometimes it is a separate one-time job because there is a lot to build first. We tell you which one it is before you pay anything.',
  },
  {
    q: 'What happens to my ad accounts and my site if we stop working together?',
    a: 'They stay yours. The ad accounts, the website, the CRM and all the data are in your name from day one. We do not hold them, and you do not need our permission to keep running them.',
  },
  {
    q: 'Is the ad budget included in the price?',
    a: 'No, and that is on purpose. The budget goes straight from your card to Google, Meta or Yelp. You see every dollar of it in your own account, and we never take a cut of it.',
  },
];

const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.castells.media';

  return (
    <>
      <SEO
        title="Prices | Castells Media"
        description="What marketing costs with Castells Media: monthly plans at $590 and $1,490, websites from $1,750, CRM setup from $1,500. Month to month, no contract, ad budget paid straight to Google and Meta."
        canonical="/pricing"
        keywords="marketing agency prices, how much does marketing cost per month, Google Ads management cost, HVAC marketing cost"
        geoRegion="US-CA"
        geoPlacename="1298 Antelope Creek Drive, Roseville, California"
        summary="Castells Media prices: monthly plans $590 and $1,490, websites from $1,750, CRM setup from $1,500. Month to month with no contract. The ad budget is paid directly to Google, Meta and Yelp and is not part of the fee."
        mainEntity="Pricing"
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { name: 'Home', item: `${siteUrl}/` },
            { name: 'Prices', item: `${siteUrl}/pricing` },
          ],
        }}
      />
      <SchemaMarkup
        type="FAQPage"
        data={{
          mainEntity: MONEY_QUESTIONS.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }}
      />

      <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
        <div className="container mx-auto px-6 pt-4 md:pt-6">
          <PageHeader
            breadcrumbs={[
              { label: 'Home', action: () => onNavigate('home') },
              { label: 'Prices', active: true },
            ]}
            badge="Prices"
            title="What this costs"
            description="Month to month, no contract. The ad budget is yours and goes straight to Google, Meta and Yelp — we never take a cut of it."
            onNavigate={onNavigate}
          />

          {/* Два тарифа парой, а не тремя равными колонками */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            {PLANS.map((plan, index) => (
              <motion.section
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-8"
              >
                <div className="text-[11px] font-bold uppercase tracking-widest text-coral-text mb-4">
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-display text-4xl md:text-5xl text-text-primary dark:text-white leading-none">
                    {plan.price}
                  </span>
                  <span className="text-sm text-text-secondary dark:text-white/55">{plan.period}</span>
                </div>
                <p className="text-text-secondary dark:text-white/65 text-base leading-relaxed mb-6">
                  {plan.forWhom}
                </p>
                <ul className="space-y-2.5 mb-8">
                  {plan.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-text-secondary dark:text-white/65 text-sm md:text-base"
                    >
                      <Check className="w-4 h-4 text-coral-text shrink-0 mt-1" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-pill bg-black text-white dark:bg-white dark:text-black font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Talk to us
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </motion.section>
            ))}
          </div>

          {/* Разовые работы */}
          <section className="bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-8 mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary dark:text-white mb-6">
              One-time work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {PROJECTS.map((project) => (
                <div key={project.name}>
                  <p className="font-display text-xl text-text-primary dark:text-white mb-1">
                    {project.price}
                  </p>
                  <p className="text-sm font-semibold text-text-primary dark:text-white/85 mb-2">
                    {project.name}
                  </p>
                  <p className="text-sm text-text-secondary dark:text-white/60 leading-relaxed">
                    {project.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Вопросы про деньги, включая те, что обычно задают на звонке */}
          <section className="bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-10 mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary dark:text-white mb-8">
              The money questions, answered
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
              {MONEY_QUESTIONS.map((item) => (
                <div key={item.q}>
                  <h3 className="font-display text-lg md:text-xl font-semibold text-text-primary dark:text-white mb-2">
                    {item.q}
                  </h3>
                  <p className="text-text-secondary dark:text-white/65 text-base leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-t border-black/5 dark:border-white/10 pt-8">
            <p className="text-text-secondary dark:text-white/60 max-w-xl leading-relaxed">
              Tell us what your business does and where you work. We will say plainly which plan fits,
              what we would start with, and what it comes to — before any call.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 self-start sm:self-auto shrink-0 px-6 py-3 rounded-pill bg-black text-white dark:bg-white dark:text-black font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
            >
              Talk to us
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;
