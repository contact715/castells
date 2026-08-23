import React from 'react';
import { Globe, Megaphone, MapPin, Workflow, ArrowUpRight, ArrowRight } from 'lucide-react';
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

  Второй заход, по просьбе владельца «проработай по умному». Что изменилось
  и почему:

  1. Цена переехала наверх, к заголовку. Это первый вопрос человека, а она
     лежала последней строкой карточки — то есть ответ приходил после того,
     как он дочитал список работ.
  2. Появилась строка «это про вас, если…». Список работ отвечает на вопрос
     «что вы делаете», но не на «мне-то это зачем». Названа ситуация, в
     которой человек себя узнаёт, а не обещание результата: обещания на
     этом сайте мы сегодня как раз вычищали.
  3. Метка «разово» или «в месяц» стоит рядом с ценой. Без неё $1,750 и
     $590 читаются как один тип чека, и разговор о деньгах начинается с
     недоразумения.
  4. Карточка стала ссылкой на страницу услуг: раньше человек, которому
     стало интересно, упирался в тупик — нажимать было некуда.

  Третий заход, владелец: «в ряд 1 блок, а не два». Карточки шли сеткой
  два на два, и каждая была узкой: список входящего вытягивался в одну
  длинную колонку, а цена жалась к названию. Теперь одна карточка на всю
  ширину, а внутри три зоны — название с ценой, содержимое двумя
  колонками, переход. Список стал таблицей, а не лентой.

  Цены подтверждены владельцем 22 августа 2026.
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
    price: '$1,750',
    priceNote: 'one-time, from',
    forYou: 'people find you on Facebook or Yelp and there is nowhere to send them',
  },
  {
    icon: Megaphone,
    title: 'Ads that bring calls',
    promise: 'Google and Meta running for your service area, watched every week.',
    includes: ['Google Ads', 'Meta Ads (Facebook, Instagram)', 'Yelp Ads', 'Weekly reports in plain numbers'],
    price: '$590',
    priceNote: 'monthly, from',
    forYou: 'the phone goes quiet out of season and you just wait it out',
  },
  {
    icon: MapPin,
    title: 'Found nearby',
    promise: 'People searching for your service in your city find you, not a competitor.',
    includes: ['Google Business Profile', 'Yelp profile', 'Local search pages', 'Getting and answering reviews'],
    price: '$590',
    priceNote: 'monthly, from',
    forYou: 'someone two blocks away searches for your service and finds someone else',
  },
  {
    icon: Workflow,
    title: 'Nothing gets lost',
    promise: 'Calls, forms and messages land in one place, and no request sits unanswered.',
    includes: ['CRM setup', 'Calls and forms in one inbox', 'Follow-up reminders', 'Set up on our own platform, Mosco'],
    price: '$1,500',
    priceNote: 'setup, from',
    forYou: 'a missed call means a lost job and nobody calls back',
  },
];

const ServicesConstellationSection: React.FC<ServicesProps> = ({ onNavigate }) => {
  const goToServices = (event: React.MouseEvent) => {
    event.preventDefault();
    onNavigate?.('services');
  };

  return (
    <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-[#191919] dark:bg-[#191919] relative">
      <div className="container mx-auto px-6 relative z-content">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-coral-gradient shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">What we do</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-white">
            Four things a service business
            <br />
            <span className="text-white/50">needs to get booked</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mt-4">
            Take one of them or all four. Prices are right here, you do not need a call to hear them.
          </p>
        </div>

        {/*
          Одна карточка в ряд, а не две. На всю ширину помещается разбор
          услуги: слева название и цена, в середине что входит — двумя
          колонками, а не одной длинной лентой, справа переход.
        */}
        <div className="flex flex-col gap-4">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <a
                key={service.title}
                href="/services"
                onClick={goToServices}
                className="group grid grid-cols-1 lg:grid-cols-[220px_1fr_auto] gap-6 lg:gap-10 items-start bg-white/[0.03] border border-white/10 rounded-card p-6 md:p-8 hover:border-white/30 hover:bg-white/[0.05] transition-colors duration-300"
              >
                {/* Название и цена: то, ради чего человек скользит взглядом по списку */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-element bg-coral-gradient-subtle flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-coral-text" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-white">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl md:text-3xl text-white leading-tight">
                      {service.price}
                    </span>
                    <span className="text-[11px] uppercase tracking-widest text-white/55">
                      {service.priceNote}
                    </span>
                  </div>
                </div>

                {/* Что это даёт и что входит */}
                <div className="min-w-0">
                  <p className="text-white/65 text-base leading-relaxed mb-5">{service.promise}</p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-5">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-white/60 text-sm md:text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0 mt-2" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/*
                    Строка про ситуацию, а не про результат. Человек должен узнать
                    здесь себя; обещать ему цифры мы не будем.
                  */}
                  <p className="text-white/50 text-sm leading-relaxed pt-4 border-t border-white/10">
                    <span className="text-white/50">This is for you if </span>
                    <span className="font-display italic text-white/70 text-base">{service.forYou}</span>
                  </p>
                </div>

                <span
                  className="hidden lg:flex w-9 h-9 rounded-full bg-white/5 border border-white/10 items-center justify-center shrink-0 group-hover:bg-white group-hover:border-white transition-colors duration-300"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-black transition-colors duration-300" />
                </span>
              </a>
            );
          })}
        </div>

        {/*
          Без этой строки цена читается как полная, и разговор о деньгах
          начинается со спора. Пусть человек узнает про рекламный бюджет
          здесь, а не на звонке.
        */}
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="text-white/50 text-sm leading-relaxed max-w-xl">
            Monthly plans are $590 and $1,490 depending on how many channels we run. Ad budget goes
            straight to Google, Meta and Yelp and is not part of this.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.('services')}
            className="inline-flex items-center gap-2 self-start sm:self-auto shrink-0 px-6 py-3 rounded-pill bg-white text-black font-medium text-[15px] hover:bg-white/90 transition-colors"
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
