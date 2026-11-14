import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { NavigateFn } from '../../types';
import { OFFER_STEPS } from '../../config/offer.mjs';

/*
  Блок «как начинаем», добавлен 14 ноября 2026.

  Когда-то на главной стоял процесс из шести шагов с выдуманными сроками
  («Day 1», «Week 1», «Week 5-6»), и владелец попросил его убрать. Этот блок
  не возвращает то же самое: в нём четыре шага и ни одного срока. Срок
  зависит от того, что у клиента уже есть, и называть его до разговора
  значит гадать.

  Шаги читаются из config/offer.mjs, тот же список стоит на странице услуг.
*/

interface HowWeStartProps {
  onNavigate?: NavigateFn;
}

const HowWeStart: React.FC<HowWeStartProps> = ({ onNavigate }) => {
  const goToContact = (event: React.MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate('contact');
  };

  return (
    <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-ivory dark:bg-[#191919] relative">
      <div className="container mx-auto px-6">
        <div className="mb-10 md:mb-12 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent-gradient shrink-0" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide text-text-secondary dark:text-white/50">How we start</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-text-primary dark:text-white">
            From nothing
            <br />
            <span className="text-text-secondary dark:text-white/50">to marketing that runs every month</span>
          </h2>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {OFFER_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-8"
            >
              <span className="font-display text-3xl text-accent-text leading-none">{index + 1}</span>
              <h3 className="font-display text-xl font-semibold text-text-primary dark:text-white mt-4 mb-2">
                {step.title}
              </h3>
              <p className="text-sm md:text-base text-text-secondary dark:text-white/60 leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="text-text-secondary dark:text-white/60 leading-relaxed max-w-xl">
            Already have a site or running ads? Then we start from what you have and build only what
            is missing.
          </p>
          <a
            href="/contact"
            onClick={goToContact}
            className="inline-flex items-center gap-2 self-start sm:self-auto shrink-0 px-6 py-3 rounded-button bg-black text-white dark:bg-white dark:text-black font-medium text-[15px] hover:opacity-90 transition-opacity"
          >
            Talk to us
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HowWeStart);
