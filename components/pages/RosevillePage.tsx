import React from 'react';
import { m as motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import { BUSINESS } from '../../config/business';
import { CASE_STUDIES } from '../../constants';
import { PageView } from '../../App';
import { NavigationData } from '../../types';

/*
  Локальная страница, 23 августа 2026.

  Зачем именно она, а не пачка городских под копирку: у этой страницы есть
  собственный проверяемый актив — наш офис по адресу 1298 Antelope Creek Drive
  в Roseville, юрлицо Castells Media Inc и телефон, по которому отвечают. По
  правилу из разбора архитектуры страница создаётся только при таком активе,
  поэтому городов-двойников вроде «marketing agency in Sacramento» здесь не
  будет: офиса там нет, и страница была бы пустой.

  Отдельно про честность. Наши клиенты в Калифорнии сидят в Лос-Анджелесе, а
  не в Roseville. Выдавать их за местных нельзя, поэтому в тексте прямо
  сказано: работаем из Roseville, клиенты по всей Калифорнии и стране.
*/

interface RosevillePageProps {
  onNavigate: (page: PageView, data?: NavigationData) => void;
}

const РАБОТЫ = [
  {
    заголовок: 'A website that turns a search into a call',
    текст:
      'Someone who found you on their phone should see what you do, where you work and how to reach you without pinching the screen. That is the whole job of the site.',
    услуга: 'web-development',
  },
  {
    заголовок: 'Google and Meta running for your service area',
    текст:
      'Ads set to the towns you actually drive to, watched every week, with a report in plain numbers instead of a dashboard nobody opens.',
    услуга: 'google-ads-ppc',
  },
  {
    заголовок: 'Found on the map, not just in search',
    текст:
      'Google Business Profile and Yelp filled in properly, with reviews collected and answered. For a local trade this is often the cheapest source of calls.',
    услуга: 'seo-content',
  },
  {
    заголовок: 'Nothing sits unanswered',
    текст:
      'Calls, forms and messages land in one place, and a missed call gets followed up instead of turning into a job for the next company.',
    услуга: 'crm-pipelines',
  },
];

const RosevillePage: React.FC<RosevillePageProps> = ({ onNavigate }) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.castells.media';
  const адрес = `${BUSINESS.street}, ${BUSINESS.city}, ${BUSINESS.state}`;

  /* Клиенты в Калифорнии, взятые из карточек кейсов. Городá настоящие,
     поэтому в тексте они и названы как есть, без «местных под Roseville». */
  const калифорнийские = CASE_STUDIES.filter((cs) => (cs.location || '').includes('California')).slice(0, 3);

  return (
    <>
      <SEO
        title="Marketing agency in Roseville, California | Castells Media"
        description={`Castells Media is a marketing agency at ${адрес}. Websites, Google and Meta ads, local presence and follow-up for home service businesses. Monthly plans from $590.`}
        canonical="/roseville-marketing-agency"
        keywords="marketing agency Roseville, Roseville CA marketing, HVAC marketing Roseville, Google Ads Roseville, local SEO Roseville"
        geoRegion="US-CA"
        geoPlacename={адрес}
        summary={`Castells Media, a marketing agency based at ${адрес}, working with home service businesses across California and the US.`}
        mainEntity="Local Marketing Agency"
      />
      <SchemaMarkup
        type="LocalBusiness"
        data={{
          name: BUSINESS.legalName,
          telephone: BUSINESS.phoneSchema,
          email: BUSINESS.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: BUSINESS.street,
            addressLocality: BUSINESS.city,
            addressRegion: BUSINESS.state,
            addressCountry: BUSINESS.country,
          },
          areaServed: 'United States',
          url: `${siteUrl}/roseville-marketing-agency`,
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { name: 'Home', item: `${siteUrl}/` },
            { name: 'Roseville', item: `${siteUrl}/roseville-marketing-agency` },
          ],
        }}
      />

      <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
        <div className="container mx-auto px-6 pt-4 md:pt-6">
          <PageHeader
            breadcrumbs={[
              { label: 'Home', action: () => onNavigate('home') },
              { label: 'Roseville', active: true },
            ]}
            badge="Roseville, California"
            title="Marketing agency in Roseville"
            description="We work out of Roseville and run websites, ads and follow-up for home service businesses. You can walk in, call, or write — all three reach the same people."
            onNavigate={onNavigate}
          />

          {/* Где мы и как связаться: главное, ради чего человек открывает локальную страницу */}
          <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 md:gap-6 mb-16">
            <div className="bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-8">
              <h2 className="font-display text-xl md:text-2xl font-semibold text-text-primary dark:text-white mb-5">
                Where we are
              </h2>
              <div className="flex flex-col gap-3.5">
                <p className="flex items-start gap-3 text-text-secondary dark:text-white/70 text-base">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-accent-text" aria-hidden="true" />
                  {BUSINESS.street}
                  <br />
                  {BUSINESS.city}, {BUSINESS.state}
                </p>
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="flex items-center gap-3 text-text-primary dark:text-white text-base hover:text-accent-text dark:hover:text-accent-text transition-colors"
                >
                  <Phone className="w-5 h-5 shrink-0 text-accent-text" aria-hidden="true" />
                  {BUSINESS.phoneFormatted}
                </a>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-center gap-3 text-text-primary dark:text-white text-base hover:text-accent-text dark:hover:text-accent-text transition-colors"
                >
                  <Mail className="w-5 h-5 shrink-0 text-accent-text" aria-hidden="true" />
                  {BUSINESS.email}
                </a>
              </div>
              <p className="text-text-secondary dark:text-white/55 text-sm leading-relaxed mt-6 pt-5 border-t border-black/5 dark:border-white/10">
                {BUSINESS.legalName} Registered in California. The fastest answer is WhatsApp or Telegram
                on the same number.
              </p>
            </div>

            <div className="bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-8 flex flex-col">
              <h2 className="font-display text-xl md:text-2xl font-semibold text-text-primary dark:text-white mb-5">
                Who we work with
              </h2>
              <p className="text-text-secondary dark:text-white/70 text-base leading-relaxed mb-4">
                Home service businesses: heating and air conditioning, plumbing, appliance repair,
                remodeling, auto detailing. Companies where the money arrives as a phone call.
              </p>
              <p className="text-text-secondary dark:text-white/70 text-base leading-relaxed">
                We are based here in Roseville, and our clients are spread across California and the rest
                of the country. Distance has not been a problem: the work is the site, the ad accounts and
                the follow-up, and all three are done wherever the business is.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="mt-auto pt-6 inline-flex items-center gap-2 text-accent-text font-medium text-[15px] self-start hover:gap-3 transition-all"
              >
                Talk to us
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </section>

          {/* Что именно делаем */}
          <section className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary dark:text-white mb-8">
              What we do for a local trade
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {РАБОТЫ.map((работа, i) => (
                <motion.button
                  key={работа.заголовок}
                  type="button"
                  onClick={() => onNavigate('service', { id: работа.услуга })}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.35, delay: Math.min(i, 3) * 0.05 }}
                  className="group text-left bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-7 hover:border-black/20 dark:hover:border-white/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-display text-lg md:text-xl font-semibold text-text-primary dark:text-white">
                      {работа.заголовок}
                    </h3>
                    <ArrowUpRight
                      className="w-4 h-4 shrink-0 mt-1 text-text-secondary dark:text-white/50 group-hover:text-accent-text transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-text-secondary dark:text-white/65 text-base leading-relaxed">
                    {работа.текст}
                  </p>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Кейсы в Калифорнии, с настоящими городами */}
          {калифорнийские.length > 0 && (
            <section className="mb-16">
              <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary dark:text-white mb-3">
                Our clients in California
              </h2>
              <p className="text-text-secondary dark:text-white/60 text-base mb-8 max-w-2xl">
                Real companies with real names. None of them are in Roseville itself, and we are not going
                to pretend otherwise.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {калифорнийские.map((cs) => (
                  <button
                    key={cs.id}
                    type="button"
                    onClick={() => onNavigate('case-study', { id: cs.id, name: cs.client })}
                    className="group text-left bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 hover:border-black/20 dark:hover:border-white/30 transition-colors"
                  >
                    <div className="text-[11px] tracking-wide text-accent-text font-semibold mb-2">
                      {cs.industry}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-text-primary dark:text-white mb-1">
                      {cs.client}
                    </h3>
                    <p className="text-text-secondary dark:text-white/55 text-sm">{cs.location}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Цены и переход к разговору */}
          <section className="bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
              <div className="grow">
                <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary dark:text-white mb-3">
                  What it costs
                </h2>
                <p className="text-text-secondary dark:text-white/65 text-base leading-relaxed max-w-2xl">
                  Monthly plans start at $590, websites at $1,750, automation setup at $1,500. Month to
                  month, no contract. The ad budget goes straight to Google, Meta and Yelp from your own
                  account and we never take a cut of it.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate('pricing')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-button bg-black text-white dark:bg-white dark:text-black font-medium text-[15px] hover:opacity-90 transition-opacity"
                >
                  See prices
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-button border border-black/15 dark:border-white/25 text-text-primary dark:text-white font-medium text-[15px] hover:border-black/40 dark:hover:border-white/50 transition-colors"
                >
                  Talk to us
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default RosevillePage;
