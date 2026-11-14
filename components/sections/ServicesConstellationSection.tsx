import React from 'react';
import { Globe, Megaphone, Workflow, BarChart3, ArrowUpRight, ArrowRight } from 'lucide-react';
import type { NavigateFn } from '../../types';
import { OFFER_PARTS, OFFER_TERMS } from '../../config/offer.mjs';

/*
  История блока коротко. Сначала здесь была схема-созвездие на 576 строк с
  двадцатью подписями по кругу; владелец попросил сделать просто и понятно.
  Потом четыре карточки с ценами: сайт «от», реклама «в месяц, от»,
  настройка CRM «от». Карточка на всю ширину, а не сетка два на два, тоже
  решение владельца («в ряд 1 блок, а не два»). Цвета парами «светлая тема /
  тёмная»: когда-то секция была чёрным прямоугольником в светлой теме.

  14 ноября 2026: смена позиционирования. Владелец: «мы теперь не продаём
  услуги по настройке, а предлагаем полностью комплексное ведение
  ежемесячно». Поэтому:

  1. Четыре карточки больше не четыре товара. Это четыре части одного
     ведения, клиент получает все. Заголовок и вводная строка говорят это
     прямо, фраза «Take one of them or all four» убрана.
  2. Цен в карточках нет. Владелец решил называть цену на созвоне. Вместо
     цены внизу стоят условия: одна месячная плата, без платы за запуск,
     без договора, всё оформлено на клиента, рекламный бюджет отдельно.
  3. Состав читается из config/offer.mjs. Тот же список стоит на странице
     услуг и в описаниях для поиска, и расходиться ему нельзя.

  Строка «это про вас, если…» осталась: она называет ситуацию, в которой
  человек себя узнаёт, а не обещает результат.
*/

interface ServicesProps {
  onNavigate?: NavigateFn;
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  found: Globe,
  ads: Megaphone,
  'follow-up': Workflow,
  numbers: BarChart3,
};

const ServicesConstellationSection: React.FC<ServicesProps> = ({ onNavigate }) => {
  const goToServices = (event: React.MouseEvent) => {
    event.preventDefault();
    onNavigate?.('services');
  };

  return (
    <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-ivory dark:bg-[#191919] relative">
      <div className="container mx-auto px-6 relative z-content">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent-gradient shrink-0" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide text-text-secondary dark:text-white/50">What we take over</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-text-primary dark:text-white">
            Four parts,
            <br />
            <span className="text-text-secondary dark:text-white/50">one team, one monthly fee</span>
          </h2>
          <p className="text-lg text-text-secondary dark:text-white/60 leading-relaxed mt-4">
            These are not four products to pick from. You get all four, because each one stops working
            when the one next to it is missing.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {OFFER_PARTS.map((part, index) => {
            const Icon = ICONS[part.id] ?? Globe;
            return (
              <a
                key={part.id}
                href="/services"
                onClick={goToServices}
                className="group grid grid-cols-1 lg:grid-cols-[220px_1fr_auto] gap-6 lg:gap-10 items-start bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-8 hover:border-black/20 dark:hover:border-white/30 transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-element bg-accent-gradient-subtle flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-accent-text" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary dark:text-white">
                      {part.title}
                    </h3>
                  </div>
                  <span className="text-[11px] tracking-wide text-text-secondary dark:text-white/55">
                    Part {index + 1} of {OFFER_PARTS.length}, included
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-text-secondary dark:text-white/65 text-base leading-relaxed mb-5">{part.promise}</p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-5">
                    {part.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-text-secondary dark:text-white/60 text-sm md:text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="text-text-secondary dark:text-white/50 text-sm leading-relaxed pt-4 border-t border-black/5 dark:border-white/10">
                    <span className="text-text-secondary dark:text-white/50">You know this one if </span>
                    <span className="font-display italic text-text-primary dark:text-white/70 text-base">{part.forYou}</span>
                  </p>
                </div>

                <span
                  className="hidden lg:flex w-9 h-9 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 items-center justify-center shrink-0 group-hover:bg-black dark:group-hover:bg-white group-hover:border-black dark:group-hover:border-white transition-colors duration-300"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="w-4 h-4 text-text-secondary dark:text-white/60 group-hover:text-white dark:group-hover:text-black transition-colors duration-300" />
                </span>
              </a>
            );
          })}
        </div>

        {/*
          Условия вместо цены. Раньше здесь стояла строка с двумя тарифами.
          Цену теперь называют на созвоне, но условия человек должен знать до
          него: иначе разговор о деньгах начинается с недоверия.
        */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-8">
          {OFFER_TERMS.map((term) => (
            <div key={term.title}>
              <h3 className="font-display text-lg font-semibold text-text-primary dark:text-white mb-2">{term.title}</h3>
              <p className="text-sm text-text-secondary dark:text-white/60 leading-relaxed">{term.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="text-text-secondary dark:text-white/50 text-sm leading-relaxed max-w-xl">
            We do not sell a website on its own or a one-time ad setup. A setup with nobody running it
            afterwards is how most marketing budgets get wasted.
          </p>
          <button
            type="button"
            onClick={() => onNavigate?.('services')}
            className="inline-flex items-center gap-2 self-start sm:self-auto shrink-0 px-6 py-3 rounded-button bg-black text-white dark:bg-white dark:text-black font-medium text-[15px] hover:opacity-90 transition-opacity"
          >
            Everything that is included
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ServicesConstellationSection);
