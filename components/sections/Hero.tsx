import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { ContactButtons } from '../ui/ContactButtons';
import { BUILT_SITES } from '../../constants';
import type { NavigateFn } from '../../types';

/*
  Первый экран, переписан 22 августа 2026.

  Что здесь было и почему заменено:

  1. Заголовок «We dominate local markets». Он про нас и наши амбиции.
     Человек, который ищет, кто наладит ему поток заявок, такого не
     набирает в поиске и по такой строке не понимает, туда ли попал.
     Единственное место, где было сказано, чем мы занимаемся, — мелкая
     надпись сверху.

  2. Подзаголовок «From MVP to scalable results people actually want» —
     лексика стартапов. Владелец HVAC-компании так не говорит.

  3. Кнопка «Contact us» вела на якорь #audit. Блок с этим якорем живёт в
     CTA.tsx, а он на главной не выводится вообще. То есть единственная
     крупная кнопка первого экрана не делала ничего. Проверено на проде:
     элемента #audit на странице нет.

  4. Заголовок анимировался с задержкой почти в секунду — первые секунды
     человек видел пустое поле вместо ответа на вопрос «куда я попал».
     Анимация снята: текст стоит на месте сразу.

  5. Разметка VideoObject сообщала поисковикам о видео с Vimeo, а сам
     блок с видео закомментирован с прошлых правок. Разметка обещала то,
     чего на странице нет; вместе с ней убран весь мёртвый код плеера
     (три эффекта, загрузка чужого скрипта, управление звуком).

  Главный аргумент первого экрана владелец выбрал сам: живые сайты
  клиентов, которые можно открыть и проверить за десять секунд. Список
  живёт в constants.ts → BUILT_SITES, туда попадает только проект с
  карточкой web-development в Monday и отвечающим адресом.
*/

interface HeroProps {
  onNavigate?: NavigateFn;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const goToContact = (event: React.MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate('contact');
  };

  return (
    <div className="pt-16 md:pt-20 pb-0 relative z-2 bg-transparent">
      <div className="container mx-auto px-6 relative z-10 pt-4 md:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-12">

          <div>
            <div className="text-xs font-bold uppercase text-text-secondary mb-4">
              <span className="tracking-widest">Castells Media · Santa Monica, California</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-text-primary mb-0">
              Marketing for
              <br />
              <span className="text-coral-text italic font-semibold">home service businesses</span>
            </h1>
          </div>

          <div className="flex flex-col justify-end">
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8">
              We build the site, run the ads on Google and Meta, and set up the follow-up, so the
              phone rings and no job gets lost. HVAC, plumbing, appliance repair, remodeling.
            </p>
            <div className="flex gap-4 items-center">
              <Button
                href="/contact"
                onClick={goToContact}
                size="md"
                className="inline-flex items-center gap-2 group"
              >
                Talk to us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <ContactButtons defaultExpanded={null} />
            </div>
          </div>
        </div>

        {/*
          Проверяемое отличие. Не обещание и не число без источника —
          адреса, которые человек открывает в соседней вкладке и видит
          нашу работу.
        */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pb-12 md:pb-16 border-b border-black/5 dark:border-white/10">
          <span className="text-xs font-bold uppercase tracking-widest text-text-secondary shrink-0">
            Sites we built, live right now
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {BUILT_SITES.map((site) => (
              <a
                key={site.client}
                href={site.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm md:text-base text-text-primary dark:text-white hover:text-coral-text transition-colors"
              >
                {site.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                <ArrowUpRight
                  className="w-3.5 h-3.5 text-text-secondary group-hover:text-coral-text transition-colors"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
