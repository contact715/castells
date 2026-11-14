import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { ContactButtons } from '../ui/ContactButtons';
import type { NavigateFn } from '../../types';
import { OFFER, OFFER_PARTS } from '../../config/offer.mjs';
import { SectionMark } from '../ui/SectionMark';

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

  Живые сайты клиентов сначала стояли отдельной строкой здесь, но их место
  в кейсах: те же клиенты идут блоком ниже. Ссылки переехали на карточки.

  14 ноября 2026: смена позиционирования. Прежний заголовок «Marketing for
  home service businesses» называл нишу, но не говорил, что именно мы
  продаём, а подзаголовок перечислял три отдельные работы. Теперь продаём
  одно: полное ведение маркетинга каждый месяц. Заголовок говорит это прямо,
  текст под ним берётся из config/offer.mjs, чтобы первый экран, описание
  для поиска и страница услуг говорили одно и то же.
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
    <div className="pt-16 md:pt-20 pb-12 md:pb-20 relative z-2 bg-transparent">
      <div className="container mx-auto px-6 relative z-10 pt-4 md:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">

          <div>
            <SectionMark>Castells Media · Roseville, California</SectionMark>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-text-primary mb-6">
              All your marketing,
              <br />
              <span className="text-accent-text italic font-semibold">run for you every month</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-xl">
              {OFFER.summary} For {OFFER.audience}.
            </p>
            <div className="flex flex-wrap gap-4 items-center mb-8">
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
            {/* Условия одной строкой: то, что у конкурентов узнают на третьем звонке */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-secondary">
              {['One monthly fee', 'No setup fee', 'No contract', 'Everything in your name'].map((term) => (
                <li key={term} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent-text shrink-0" aria-hidden="true" />
                  {term}
                </li>
              ))}
            </ul>
          </div>

          {/*
            Правая колонка, добавлена 14 ноября 2026. Раньше первый экран был
            чистым текстом: ни лица, ни картинки. Человек, который нанимает
            подрядчика на свой маркетинг, первым делом хочет видеть, с кем он
            будет говорить. Фото основателя настоящее, из папки public.
            Список справа называет то, что мы ведём, и не обещает результата.
          */}
          <div className="relative max-w-md w-full mx-auto lg:mx-0 lg:ml-auto">
            <div className="absolute -top-5 -right-5 w-2/3 h-2/3 rounded-card slash-stripes" aria-hidden="true" />
            <div className="relative rounded-card overflow-hidden bg-forest aspect-[4/5]">
              <img
                src="/team/dmitrii-z.webp"
                alt="Dmitrii Z., founder of Castells Media"
                width={720}
                height={720}
                className="w-full h-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 pt-16 bg-linear-to-t from-forest-deep via-forest-deep/80 to-transparent">
                <p className="font-display text-xl text-white leading-tight">Dmitrii Z.</p>
                <p className="text-sm text-white/75">Founder. Write to us and you are talking to him.</p>
              </div>
            </div>
            <div className="relative sm:absolute sm:-left-14 sm:bottom-28 mt-4 sm:mt-0 bg-white dark:bg-[#222] border border-black/10 dark:border-white/10 rounded-inner shadow-spatial-xl p-4 w-full sm:w-56">
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-text-secondary dark:text-white/60 mb-3">
                We run for you
              </p>
              <ul className="space-y-2">
                {OFFER_PARTS.map((part) => (
                  <li key={part.id} className="flex items-start gap-2 text-sm text-text-primary dark:text-white">
                    <Check className="w-4 h-4 text-accent-text shrink-0 mt-0.5" aria-hidden="true" />
                    {part.short}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
