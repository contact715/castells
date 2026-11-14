import React from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import { OFFER_PARTS, OFFER_TERMS } from '../../config/offer.mjs';

/*
  Страница цен. Создана 23 августа 2026 с двумя тарифами и списком разовых
  работ; тогда расчёт был на то, что человек сам себя квалифицирует по
  опубликованной цене.

  14 ноября 2026 владелец сменил модель: продаём одно полное ведение, цену
  называем на созвоне, платы за запуск нет. Страница осталась по трём
  причинам. Адрес /pricing стоит в меню и в поиске. Запрос «сколько стоит
  маркетинг в месяц» никуда не делся. И человеку, которому не назвали число,
  тем более нужно знать, из чего оно складывается и на каких условиях.

  Поэтому страница теперь отвечает на вопрос «как считается цена», а не
  «сколько». Числа на ней нет ни одного: ни нашего, ни чужого.

  Риск, о котором владелец знает: раньше «цены опубликованы» было одним из
  четырёх обещаний сайта. Оно снято везде, где стояло.
*/

interface PricingPageProps {
  onNavigate: (page: PageView, data?: NavigationData) => void;
}

/** От чего зависит месячная плата. Три вещи, которые мы спрашиваем на созвоне. */
const DEPENDS_ON = [
  {
    name: 'What has to be built first',
    note: 'A business with a working site and profiles starts closer to the finish than one that starts from zero. The build is inside the monthly fee, so it affects the number.',
  },
  {
    name: 'How many channels we run',
    note: 'Google alone is less work than Google, Meta and Yelp together. We run what your trade and city need, not everything that exists.',
  },
  {
    name: 'How many services and cities',
    note: 'One service in one city is one set of pages and campaigns. Five services across a metro area is several.',
  },
];

const MONEY_QUESTIONS = [
  {
    q: 'Why is the price not on the page?',
    a: 'Because it is one fee for all of the work, and the work is different for every business. A number that fits a company with a finished site would be wrong for one starting from zero. You hear your number on the first call, before you pay anything.',
  },
  {
    q: 'Is there a setup fee?',
    a: 'No. The website, the ad accounts, tracking and the CRM are built as part of the monthly work. We do not bill them as separate projects.',
  },
  {
    q: 'Is there a contract or a minimum term?',
    a: 'No. It is month to month. If a month goes badly and you want to stop, you stop: no notice period, no cancellation fee.',
  },
  {
    q: 'What happens to my ad accounts and my site if we stop working together?',
    a: 'They stay yours. The ad accounts, the website, the CRM and all the data are in your name from day one. We do not hold them, and you do not need our permission to keep running them.',
  },
  {
    q: 'Is the ad budget included in the fee?',
    a: 'No, and that is on purpose. The budget goes straight from your card to Google, Meta or Yelp. You see every dollar of it in your own account, and we never take a cut of it.',
  },
  {
    q: 'Can I pay for one part only?',
    a: 'No. We do not sell a website, an ad setup or a CRM on their own. The fee covers the whole path, because that is the only way we can answer for the result of it.',
  },
];

const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.castells.media';

  return (
    <>
      <SEO
        title="Pricing | Castells Media"
        description="How pricing works at Castells Media: one monthly fee for all of your marketing, named on the first call. No setup fee, no contract. The ad budget is paid straight to Google and Meta."
        canonical="/pricing"
        keywords="marketing agency pricing, how much does marketing cost per month, full-service marketing for contractors"
        geoRegion="US-CA"
        geoPlacename="1298 Antelope Creek Drive, Roseville, California"
        summary="Castells Media charges one monthly fee for full-service marketing. No setup fee, month to month with no contract. The ad budget is paid directly to Google, Meta and Yelp and is not part of the fee."
        mainEntity="Pricing"
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { name: 'Home', item: `${siteUrl}/` },
            { name: 'Pricing', item: `${siteUrl}/pricing` },
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
              { label: 'Pricing', active: true },
            ]}
            badge="Pricing"
            title="One monthly fee for all of it"
            description="No setup fee, no contract. You hear the number on the first call, before you pay anything. The ad budget is yours and goes straight to Google, Meta and Yelp."
            onNavigate={onNavigate}
          />

          {/* Условия: то, что человек должен знать до созвона */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-8 mb-6">
            {OFFER_TERMS.map((term, index) => (
              <motion.div
                key={term.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <h2 className="font-display text-lg md:text-xl font-semibold text-text-primary dark:text-white mb-2">
                  {term.title}
                </h2>
                <p className="text-sm text-text-secondary dark:text-white/60 leading-relaxed">{term.text}</p>
              </motion.div>
            ))}
          </section>

          {/* Что входит в плату */}
          <section className="bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-8 mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary dark:text-white mb-6">
              What the fee covers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {OFFER_PARTS.map((part) => (
                <div key={part.id}>
                  <h3 className="font-display text-xl font-semibold text-text-primary dark:text-white mb-3">
                    {part.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {part.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-text-secondary dark:text-white/65 text-sm md:text-base"
                      >
                        <Check className="w-4 h-4 text-accent-text shrink-0 mt-1" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-text-primary dark:text-white hover:text-accent-text transition-colors cursor-pointer"
            >
              See each part in detail
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </section>

          {/* От чего зависит число */}
          <section className="bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-8 mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary dark:text-white mb-6">
              What the number depends on
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {DEPENDS_ON.map((item) => (
                <div key={item.name}>
                  <p className="font-display text-xl text-text-primary dark:text-white mb-2">{item.name}</p>
                  <p className="text-sm text-text-secondary dark:text-white/60 leading-relaxed">{item.note}</p>
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
              Tell us what your business does and where you work. On the first call we will say plainly
              what we would build, what we would run, and what the monthly fee is.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 self-start sm:self-auto shrink-0 px-6 py-3 rounded-button bg-black text-white dark:bg-white dark:text-black font-medium text-[15px] hover:opacity-90 transition-opacity cursor-pointer"
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
