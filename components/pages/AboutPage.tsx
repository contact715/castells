import React from 'react';
import { m as motion } from 'framer-motion';
import { Target, Zap, Users } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import { CASE_STUDIES } from '../../constants';
import type { NavigateFn } from '../../types';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';

/*
  Что здесь стояло до 22 августа 2026 и почему это убрано.

  Лента истории на семь лет: «Agency of the Year 2021» от Growth Marketing
  Awards, публикация в Forbes, офисы в Нью-Йорке и Лондоне, клиенты в
  15 странах, «$500M milestone», «выросли с 5 до 25 человек», «наняли
  людей из Google и Meta». Ни одно из этих событий не подтверждено ничем.

  Плюс три стоковые фотографии с чужого фотобанка, одна из них подписана
  «Global HQ — Santa Monica» — то есть чужой офис выдан за наш.

  Плюс «основана в 2012» и «12+ years», при том что на других страницах
  сайта стояли 2017 и 2018. Год основания владельцем не подтверждён, и
  пока он не подтверждён, мы его не называем вовсе.

  Осталось то, что можно проверить: юрлицо, город, чем занимаемся, для
  кого, и клиенты, которых можно открыть и посмотреть.
*/

interface AboutPageProps {
  onBack: () => void;
  onNavigate: NavigateFn;
}

const HOW_WE_WORK = [
  {
    icon: Target,
    title: 'We test, not guess',
    desc: 'Small budget first, then scale what actually brings calls. No six-month contracts before the first result.',
  },
  {
    icon: Zap,
    title: 'We move fast',
    desc: 'A landing page and a first campaign go live in days. Waiting a month to launch costs more than launching imperfectly.',
  },
  {
    icon: Users,
    title: 'One team, one owner',
    desc: 'You talk to the people doing the work, not to an account manager who forwards your questions.',
  },
];

/** Клиенты, у которых есть живой сайт нашей работы — их можно открыть и проверить. */
const CLIENTS_WITH_SITES = CASE_STUDIES.filter((cs) => cs.website);

const AboutPage: React.FC<AboutPageProps> = React.memo(({ onNavigate }) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.castells.media';

  return (
    <div className="bg-ivory dark:bg-[#191919] min-h-screen pt-16 md:pt-20 pb-20 animate-in fade-in duration-500">
      <SEO
        title="About Castells Media | Santa Monica marketing agency"
        description="Castells Media Inc, a marketing agency in Santa Monica, California, working with home service businesses across the United States."
        canonical="/about"
        keywords="marketing agency Santa Monica, home service marketing, HVAC marketing agency, local marketing California"
        geoRegion="US-CA"
        geoPlacename="Santa Monica, California"
        summary="Castells Media Inc is a marketing agency based in Santa Monica, California. It builds websites, runs Google and Meta ads and sets up automation for home service businesses across the US."
        mainEntity="Marketing Agency"
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { name: 'Home', item: `${siteUrl}/` },
            { name: 'About', item: `${siteUrl}/about` },
          ],
        }}
      />

      <div className="container mx-auto px-6 pt-4 md:pt-6">
        <PageHeader
          breadcrumbs={[
            { label: 'Home', action: () => onNavigate('home') },
            { label: 'About', active: true },
          ]}
          badge="About"
          title="A small agency for businesses that live on the phone ringing."
          description="Castells Media Inc works out of Santa Monica, California, with home service businesses across the US: HVAC, appliance repair, plumbing, remodeling. We build the site, run the ads and set up the follow-up, so a job that was going to be lost gets booked instead."
          onNavigate={onNavigate}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {HOW_WE_WORK.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-surface p-10 rounded-card shadow-spatial-card border border-black/5 dark:border-white/10 hover:border-coral/50 dark:hover:border-coral/40 hover:shadow-spatial-md transition-[border-color,box-shadow] duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <Icon className="w-10 h-10 text-coral-text shrink-0" />
                  <h3 className="font-display text-2xl font-semibold text-text-primary dark:text-white">
                    {value.title}
                  </h3>
                </div>
                <p className="text-text-secondary dark:text-white/70">{value.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/*
          Вместо ленты выдуманных достижений — то, что человек может открыть
          в соседней вкладке и убедиться сам.
        */}
        <section className="mb-24">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-coral-gradient shrink-0" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                Check us
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-text-primary dark:text-white mb-3">
              Sites we built, live right now
            </h2>
            <p className="text-text-secondary dark:text-white/70">
              Open any of them. That is the whole proof we offer, and it is the kind you can verify without asking us.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CLIENTS_WITH_SITES.map((client) => (
              <li key={client.id}>
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white dark:bg-surface p-6 rounded-card border border-black/5 dark:border-white/10 hover:border-coral/50 transition-colors"
                >
                  <span className="block font-display text-xl font-semibold text-text-primary dark:text-white">
                    {client.client}
                  </span>
                  <span className="block text-sm text-text-secondary dark:text-white/60 mt-1">
                    {client.industry}
                    {client.location ? ` · ${client.location}` : ''}
                  </span>
                  <span className="block text-sm text-coral-text mt-3 break-all">
                    {client.website?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <div className="bg-white dark:bg-surface p-8 md:p-10 rounded-card border border-black/5 dark:border-white/10">
            <h2 className="font-display text-2xl font-semibold text-text-primary dark:text-white mb-4">
              Where to find us
            </h2>
            <address className="not-italic text-text-secondary dark:text-white/70 leading-relaxed">
              Castells Media Inc
              <br />
              Santa Monica, California
            </address>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="mt-6 inline-flex items-center gap-2 text-coral-text font-semibold hover:underline"
            >
              Talk to us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
});

AboutPage.displayName = 'AboutPage';

export default AboutPage;
