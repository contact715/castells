import React from 'react';
import { Globe, Megaphone, MapPin, Workflow, ArrowRight } from 'lucide-react';
import type { NavigateFn } from '../../types';

/*
  Здесь была схема-созвездие: SVG на 1000x800 с центром, четырьмя лучами,
  двадцатью подписями по кругу, отдельной веткой на Mosco AI с модулями
  (AI Lead Profiler, Smart Forms, AI Chat, Speed-Dialer), кривыми Безье,
  анимацией прорисовки и 576 строками кода.

  Владелец: «переделай её, чтобы она была простой и понятной».

  Человек, который открыл сайт с телефона, хочет за пять секунд понять:
  что вы делаете, что я получу и сколько это стоит. Схема отвечала на
  первый вопрос через двадцать подписей мелким шрифтом и не отвечала на
  два других.

  Теперь четыре карточки: что делаем, что это даёт, из чего состоит,
  сколько стоит. Цены подтверждены владельцем 22 августа 2026.
*/

interface ServicesProps {
  onNavigate?: NavigateFn;
}

const SERVICES = [
  {
    icon: Globe,
    title: 'Website and branding',
    promise: 'A site where a visitor can see what you do and call you in two taps.',
    includes: ['Website or landing page', 'Brand identity and logo', 'Brand guidelines', 'Photo and copy for the pages'],
    price: 'One-time, from $1,750',
  },
  {
    icon: Megaphone,
    title: 'Ads that bring calls',
    promise: 'Google and Meta running for your service area, watched every week.',
    includes: ['Google Ads', 'Meta Ads (Facebook, Instagram)', 'Yelp Ads', 'Weekly reports in plain numbers'],
    price: 'Monthly, from $590',
  },
  {
    icon: MapPin,
    title: 'Found nearby',
    promise: 'People searching for your service in your city find you, not a competitor.',
    includes: ['Google Business Profile', 'Yelp profile', 'Local search pages', 'Getting and answering reviews'],
    price: 'Monthly, from $590',
  },
  {
    icon: Workflow,
    title: 'Nothing gets lost',
    promise: 'Calls, forms and messages land in one place, and no request sits unanswered.',
    includes: ['CRM setup', 'Calls and forms in one inbox', 'Follow-up reminders', 'Set up on our own platform, Mosco'],
    price: 'Setup from $1,500',
  },
];

const ServicesConstellationSection: React.FC<ServicesProps> = ({ onNavigate }) => {
  return (
    <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-[#191919] dark:bg-[#191919] relative">
      <div className="container mx-auto px-6 relative z-content">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-coral-gradient shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">What we do</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-white">
            Four things a service business
            <br />
            <span className="text-white/40">needs to get booked</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed mt-4">
            You can take one of them or all four. Prices are below, no call needed to hear them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="flex flex-col bg-white/[0.03] border border-white/10 rounded-card p-6 md:p-8 hover:border-white/25 transition-colors duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-element bg-coral-gradient-subtle flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-coral-text" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-white">
                    {service.title}
                  </h3>
                </div>

                <p className="text-white/60 text-base leading-relaxed mb-6">{service.promise}</p>

                <ul className="space-y-2 mb-6">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/50 text-sm md:text-base">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-coral shrink-0 mt-2"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5 border-t border-white/10">
                  <span className="text-white font-semibold text-base md:text-lg">{service.price}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/*
          Без этой строки цена читается как полная, и разговор о деньгах
          начинается со спора. Пусть человек узнает про рекламный бюджет
          здесь, а не на звонке.
        */}
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="text-white/40 text-sm leading-relaxed max-w-xl">
            Monthly plans: $590 and $1,490 depending on how many channels we run. Ad budget goes
            straight to Google, Meta and Yelp and is not part of this.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.('services')}
            className="inline-flex items-center gap-2 self-start sm:self-auto shrink-0 px-6 py-3 rounded-pill bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-white/90 transition-colors"
          >
            All services and prices
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ServicesConstellationSection);
