import React from 'react';
import { m as motion } from 'framer-motion';
import { Target, Zap, Users, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
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

const AboutPage: React.FC<AboutPageProps> = React.memo(({ onNavigate }) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.castells.media';

  return (
    <div className="bg-ivory dark:bg-[#191919] min-h-screen pt-16 md:pt-20 pb-20 animate-in fade-in duration-500">
      <SEO
        title="About Castells Media | Roseville marketing agency"
        description="Castells Media Inc, a marketing agency in Roseville, California, working with home service businesses across the United States."
        canonical="/about"
        keywords="marketing agency Roseville, home service marketing, HVAC marketing agency, local marketing California"
        geoRegion="US-CA"
        geoPlacename="1298 Antelope Creek Drive, Roseville, California"
        summary="Castells Media Inc is a marketing agency based in Roseville, California. It builds websites, runs Google and Meta ads and sets up automation for home service businesses across the US."
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
          description="Castells Media Inc works out of Roseville, California, with home service businesses across the US: HVAC, appliance repair, plumbing, remodeling. We build the site, run the ads and set up the follow-up, so a job that was going to be lost gets booked instead."
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
          Здесь стоял список сайтов клиентов со ссылками. Он повторял кейсы:
          те же клиенты, те же адреса. Владелец на главной уже поймал этот
          дубль («это должно быть в кейсах»), и здесь ровно то же самое.
          Теперь страница «о нас» связывает разделы, а не пересказывает их.
        */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-16">
          <button
            type="button"
            onClick={() => onNavigate('work')}
            className="group text-left bg-white dark:bg-surface p-8 rounded-card border border-black/5 dark:border-white/10 hover:border-coral/50 transition-colors cursor-pointer"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              Our work
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary dark:text-white mt-3 mb-3">
              Clients you can look up
            </h2>
            <p className="text-text-secondary dark:text-white/65 leading-relaxed mb-5">
              Real companies with names and cities. Where we built the site, the link on the case opens
              it — check the work before you talk to us.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-primary dark:text-white group-hover:text-coral-text transition-colors">
              See the work
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="group text-left bg-white dark:bg-surface p-8 rounded-card border border-black/5 dark:border-white/10 hover:border-coral/50 transition-colors cursor-pointer"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              Services and prices
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary dark:text-white mt-3 mb-3">
              What we do and what it costs
            </h2>
            <p className="text-text-secondary dark:text-white/65 leading-relaxed mb-5">
              Websites, ads on Google and Meta, local presence, and follow-up that catches every request.
              Prices are on the page: monthly from $590, websites from $1,750.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-primary dark:text-white group-hover:text-coral-text transition-colors">
              See prices
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </button>
        </section>

        {/*
          Контакты целиком, а не одна строка адреса: человек, дочитавший
          страницу «о нас», уже решает, писать нам или нет, и искать телефон
          в подвале ему не нужно.
        */}
        <section className="mb-10">
          <div className="bg-white dark:bg-surface p-8 md:p-10 rounded-card border border-black/5 dark:border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-normal text-text-primary dark:text-white mb-5">
                  Where to find us
                </h2>

                <div className="flex flex-col gap-3">
                  <a
                    href="tel:+19166196006"
                    className="inline-flex items-center gap-3 text-text-primary dark:text-white hover:text-coral-text transition-colors"
                  >
                    <Phone className="w-4 h-4 shrink-0 text-text-secondary" aria-hidden="true" />
                    +1 (916) 619-6006
                  </a>
                  <a
                    href="mailto:contact@castells.media"
                    className="inline-flex items-center gap-3 text-text-primary dark:text-white hover:text-coral-text transition-colors"
                  >
                    <Mail className="w-4 h-4 shrink-0 text-text-secondary" aria-hidden="true" />
                    contact@castells.media
                  </a>
                  <address className="not-italic inline-flex items-start gap-3 text-text-secondary dark:text-white/70 leading-relaxed">
                    <MapPin className="w-4 h-4 shrink-0 mt-1" aria-hidden="true" />
                    <span>
                      Castells Media Inc
                      <br />
                      1298 Antelope Creek Drive, Roseville, California
                    </span>
                  </address>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 shrink-0 px-6 py-3 rounded-pill bg-black text-white dark:bg-white dark:text-black font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
              >
                Talk to us
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});

AboutPage.displayName = 'AboutPage';

export default AboutPage;
