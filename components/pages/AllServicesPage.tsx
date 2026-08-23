import React from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight, Globe, Megaphone, MapPin, Workflow } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import { SERVICE_CATEGORIES, type ServiceCategoryId } from '../../data/services';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';

/*
  Страница услуг, переписана 23 августа 2026.

  Что было. Заголовок «Everything you need to dominate», подзаголовок про
  «инфраструктуру, которая превращает местный бизнес в лидера рынка», кнопка
  «Watch Showreel», которая не делала ничего (ни ссылки, ни обработчика), и
  тот самый шестишаговый процесс с выдуманными сроками — «Day 1», «Week 1»,
  «Week 5-6», — который владелец попросил убрать с главной. Страница на
  7767 пикселей, девять секций, и ни одной цены. При этом в заголовке
  страницы для поисковиков уже было написано «Services and prices».

  Что стало. Четыре направления, у каждого сказано, что человек получит, что
  входит и сколько это стоит. Ниже — цены отдельным блоком, включая строку
  про рекламный бюджет. Цены только те, что подтвердил владелец 22 августа:
  два месячных тарифа, сайты от $1,750, настройка автоматизации от $1,500.
  Там, где подтверждённой цены нет, честно сказано, как считаем.
*/

interface AllServicesPageProps {
  onBack: () => void;
  onNavigate: (page: PageView, data?: NavigationData) => void;
}

const DIRECTIONS: {
  id: ServiceCategoryId;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  promise: string;
  price: string;
  priceNote: string;
}[] = [
  {
    id: 'development',
    icon: Globe,
    title: 'Website that gets you called',
    promise: 'A site where a visitor sees what you do, where you work, and calls you in two taps.',
    price: '$1,750',
    priceNote: 'one-time, from',
  },
  {
    id: 'advertising',
    icon: Megaphone,
    title: 'Ads that bring calls',
    promise: 'Google, Meta and Yelp running for your service area, checked every week.',
    price: '$590',
    priceNote: 'monthly, from',
  },
  {
    id: 'branding',
    icon: MapPin,
    title: 'Brand people remember',
    promise: 'Logo, colours and templates, so your truck, your site and your invoice look like one company.',
    price: 'Quoted per project',
    priceNote: 'usually with a website',
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'Nothing gets lost',
    promise: 'Calls, forms and messages land in one place, and no request sits unanswered.',
    price: '$1,500',
    priceNote: 'setup, from',
  },
];

const AllServicesPage: React.FC<AllServicesPageProps> = ({ onNavigate }) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.castells.media';

  return (
    <>
      <SEO
        title="Services and prices | Castells Media"
        description="Websites, Google and Meta ads, local presence, automation and CRM for home service businesses. Monthly plans from $590, websites from $1,750."
        canonical="/services"
        keywords="marketing services for contractors, HVAC marketing, Google Ads management, Meta Ads management, local SEO, CRM setup"
        geoRegion="US-CA"
        geoPlacename="1298 Antelope Creek Drive, Roseville, California"
        summary="Services by Castells Media: websites and branding, paid media on Google and Meta, local presence on Google and Yelp, automation and CRM. Monthly plans from $590, project work from $1,750."
        mainEntity="Marketing Services"
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { name: 'Home', item: `${siteUrl}/` },
            { name: 'Services', item: `${siteUrl}/services` },
          ],
        }}
      />

      <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
        <div className="container mx-auto px-6 pt-4 md:pt-6">
          <PageHeader
            breadcrumbs={[
              { label: 'Home', action: () => onNavigate('home') },
              { label: 'Services', active: true },
            ]}
            badge="Services"
            title="What we do and what it costs"
            description="Take one direction or all four. Prices are on this page, you do not need a call to hear them."
            onNavigate={onNavigate}
          />

          <div className="flex flex-col gap-4 md:gap-6 mb-16">
            {DIRECTIONS.map((direction, index) => {
              const category = SERVICE_CATEGORIES.find((c) => c.id === direction.id);
              const Icon = direction.icon;
              /* «Enterprise Solutions» повторяется в каждой категории — общий
                 пункт-заглушка, в списке услуг он только шумит. */
              const items = (category?.items ?? []).filter((i) => i.slug !== 'enterprise-solutions');

              return (
                <motion.section
                  key={direction.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: Math.min(index, 3) * 0.05 }}
                  className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-10 bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-8"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-element bg-coral-gradient-subtle flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-coral-text" aria-hidden="true" />
                      </div>
                      <h2 className="font-display text-xl md:text-2xl font-semibold text-text-primary dark:text-white">
                        {direction.title}
                      </h2>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl md:text-3xl text-text-primary dark:text-white leading-tight">
                        {direction.price}
                      </span>
                      <span className="text-[11px] uppercase tracking-widest text-text-secondary dark:text-white/55">
                        {direction.priceNote}
                      </span>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="text-text-secondary dark:text-white/65 text-base leading-relaxed mb-5">
                      {direction.promise}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                      {items.map((item) => (
                        <li key={item.slug}>
                          <button
                            type="button"
                            onClick={() => onNavigate('service', { id: item.slug, name: item.name })}
                            className="group flex items-start gap-3 text-left text-text-secondary dark:text-white/60 hover:text-text-primary dark:hover:text-white transition-colors cursor-pointer"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-coral shrink-0 mt-2"
                              aria-hidden="true"
                            />
                            <span className="text-sm md:text-base">
                              {item.name}
                              <span className="block text-xs text-text-secondary/70 dark:text-white/40 mt-0.5">
                                {item.description}
                              </span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.section>
              );
            })}
          </div>

          {/* Цены отдельным блоком: их спрашивают первым делом */}
          <section className="bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-10 mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary dark:text-white mb-8">
              Prices, in plain numbers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-8">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-coral-text mb-3">
                  Monthly
                </div>
                <p className="font-display text-2xl text-text-primary dark:text-white mb-1">$590 / month</p>
                <p className="text-sm text-text-secondary dark:text-white/60 mb-4">
                  One channel, run and reported weekly.
                </p>
                <p className="font-display text-2xl text-text-primary dark:text-white mb-1">$1,490 / month</p>
                <p className="text-sm text-text-secondary dark:text-white/60">
                  Several channels at once, with local presence and reviews.
                </p>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-coral-text mb-3">
                  One-time work
                </div>
                <p className="font-display text-2xl text-text-primary dark:text-white mb-1">From $1,750</p>
                <p className="text-sm text-text-secondary dark:text-white/60 mb-4">
                  Website or landing page, depending on how many pages you need.
                </p>
                <p className="font-display text-2xl text-text-primary dark:text-white mb-1">From $1,500</p>
                <p className="text-sm text-text-secondary dark:text-white/60">
                  CRM and follow-up set up on our own platform, Mosco.
                </p>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-coral-text mb-3">
                  What is not included
                </div>
                <p className="text-sm text-text-secondary dark:text-white/60 leading-relaxed">
                  The ad budget itself. It goes straight to Google, Meta and Yelp from your own account, and
                  you see every dollar of it. We never take a cut of it.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-black/5 dark:border-white/10">
              <p className="text-sm text-text-secondary dark:text-white/60 grow">
                Not sure which one you need? Tell us what your business does and where, and we will say
                plainly what we would start with.
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
          </section>
        </div>
      </div>
    </>
  );
};

export default AllServicesPage;
