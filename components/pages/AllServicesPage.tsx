import React from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight, Globe, Megaphone, Workflow, BarChart3 } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import { findServiceBySlug } from '../../data/services';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import { OFFER_PARTS, OFFER_STEPS, OFFER_TERMS } from '../../config/offer.mjs';

/*
  Страница услуг.

  23 августа 2026 она была переписана из «Everything you need to dominate» в
  четыре направления с ценами: бери одно или все четыре.

  14 ноября 2026 владелец сменил модель: «мы теперь не продаём услуги по
  настройке, а предлагаем полностью комплексное ведение ежемесячно, от нуля
  до единицы». Поэтому страница больше не каталог и не прайс. Она отвечает
  на один вопрос: что именно входит в ведение.

  Четыре части, шаги и условия читаются из config/offer.mjs, те же самые
  стоят на главной и на странице /pricing. Под каждой частью ссылки на
  страницы, где она разобрана подробно. Цен нет: их называют на созвоне.
*/

interface AllServicesPageProps {
  onBack: () => void;
  onNavigate: (page: PageView, data?: NavigationData) => void;
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  found: Globe,
  ads: Megaphone,
  'follow-up': Workflow,
  numbers: BarChart3,
};

const AllServicesPage: React.FC<AllServicesPageProps> = ({ onNavigate }) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.castells.media';

  return (
    <>
      <SEO
        title="What is included | Castells Media"
        description="Full-service marketing for home service businesses: website and local profiles, Google and Meta ads, CRM and follow-up, tracking and weekly reporting. One monthly fee."
        canonical="/services"
        keywords="full-service marketing for contractors, HVAC marketing, Google Ads management, Meta Ads management, local SEO, CRM"
        geoRegion="US-CA"
        geoPlacename="1298 Antelope Creek Drive, Roseville, California"
        summary="Castells Media runs all marketing for a home service business every month: website and local profiles, ads on Google, Meta and Yelp, CRM and follow-up, tracking and weekly reporting. One monthly fee, no setup fee, no contract."
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
            title="Everything we run for you, every month"
            description="We do not sell these one by one. You get all four parts for one monthly fee: we build what is missing and then run all of it."
            onNavigate={onNavigate}
          />

          <div className="flex flex-col gap-4 md:gap-6 mb-6">
            {OFFER_PARTS.map((part, index) => {
              const Icon = ICONS[part.id] ?? Globe;
              const pages = part.slugs
                .map((slug) => findServiceBySlug(slug)?.item)
                .filter((item): item is NonNullable<typeof item> => Boolean(item));

              return (
                <motion.section
                  key={part.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: Math.min(index, 3) * 0.05 }}
                  className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-10 bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-8"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-element bg-accent-gradient-subtle flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-accent-text" aria-hidden="true" />
                      </div>
                      <h2 className="font-display text-xl md:text-2xl font-semibold text-text-primary dark:text-white">
                        {part.title}
                      </h2>
                    </div>
                    <span className="text-[11px] tracking-wide text-text-secondary dark:text-white/55">
                      Part {index + 1} of {OFFER_PARTS.length}, included
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-text-secondary dark:text-white/65 text-base leading-relaxed mb-5">
                      {part.promise}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-5">
                      {part.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-text-secondary dark:text-white/60 text-sm md:text-base">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {pages.length > 0 && (
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-black/5 dark:border-white/10">
                        <span className="text-xs font-semibold tracking-wide text-text-secondary dark:text-white/50">
                          In detail
                        </span>
                        {pages.map((item) => (
                          <button
                            key={item.slug}
                            type="button"
                            onClick={() => onNavigate('service', { id: item.slug, name: item.name })}
                            className="inline-flex items-center gap-1 text-sm text-text-primary dark:text-white/80 hover:text-accent-text transition-colors cursor-pointer"
                          >
                            {item.name}
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.section>
              );
            })}
          </div>

          {/* Как начинаем: те же четыре шага, что на главной */}
          <section className="bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-10 mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary dark:text-white mb-8">
              How we start
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {OFFER_STEPS.map((step, index) => (
                <li key={step.title}>
                  <span className="font-display text-3xl text-accent-text leading-none">{index + 1}</span>
                  <h3 className="font-display text-xl font-semibold text-text-primary dark:text-white mt-3 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-white/60 leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Условия вместо прайса */}
          <section className="bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-10 mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary dark:text-white mb-8">
              The terms, in plain words
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {OFFER_TERMS.map((term) => (
                <div key={term.title}>
                  <h3 className="font-display text-lg font-semibold text-text-primary dark:text-white mb-2">
                    {term.title}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-white/60 leading-relaxed">{term.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-black/5 dark:border-white/10">
              <p className="text-sm text-text-secondary dark:text-white/60 grow">
                Tell us what your business does and where. On the first call we will say plainly what
                we would build, what we would run, and what the monthly fee is.
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
          </section>
        </div>
      </div>
    </>
  );
};

export default AllServicesPage;
