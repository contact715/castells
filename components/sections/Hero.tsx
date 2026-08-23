import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { ContactButtons } from '../ui/ContactButtons';
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

  Живые сайты клиентов сначала стояли отдельной строкой здесь, но их место
  в кейсах: те же клиенты идут блоком ниже. Ссылки переехали на карточки.
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
              <span className="tracking-widest">Castells Media · Roseville, California</span>
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
          Здесь стояла строка «Sites we built, live right now» со ссылками на
          сайты клиентов. Владелец: «это должно быть в кейсах, что за ссылки на
          главном экране, если ниже те же самые кейсы». Он прав: те же клиенты
          идут блоком ниже, и ссылка на живой сайт — часть кейса, а не отдельная
          строка над ним. Ссылки переехали на карточки кейсов.
        */}
      </div>
    </div>
  );
};

export default Hero;
