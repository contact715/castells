import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { NavigateFn } from '../../types';
import { BUSINESS } from '../../config/business';
import { SectionMark } from '../ui/SectionMark';

/*
  Последний экран главной, добавлен 14 ноября 2026.

  Главная заканчивалась списком вопросов и подвалом: человек, дочитавший до
  конца, не получал следующего шага. Здесь он один: написать или позвонить.
  Что будет на созвоне, сказано словами из config/offer.mjs, без обещаний
  результата и без срока.
*/

interface FinalCTAProps {
  onNavigate?: NavigateFn;
}

const ON_THE_CALL = [
  'What we would build first, and what you already have that works',
  'Which channels make sense for your trade and your city',
  'The monthly fee, before you pay anything',
];

const FinalCTA: React.FC<FinalCTAProps> = ({ onNavigate }) => {
  const goToContact = (event: React.MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate('contact');
  };

  return (
    <section className="py-16 md:py-24 bg-forest text-white relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-1/4 slash-stripes-light opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <SectionMark onDark>Next step</SectionMark>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight mb-5">
              Tell us where
              <br />
              <span className="text-lime italic font-semibold">you are starting from</span>
            </h2>
            <p className="text-lg text-white/75 leading-relaxed max-w-xl">
              No site and no ads, or a setup that stopped bringing calls: both are fine. One call, and
              you know what we would do and what it costs.
            </p>
          </div>

          <div className="bg-white/[0.06] border border-white/15 rounded-card p-6 md:p-8">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-lime mb-4">On the first call you hear</p>
            <ol className="space-y-3 mb-8">
              {ON_THE_CALL.map((item, index) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="font-display text-2xl text-lime leading-none w-6 shrink-0">{index + 1}</span>
                  <span className="text-white/90 leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/contact"
                onClick={goToContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-button bg-lime text-forest font-semibold text-[15px] hover:bg-white transition-colors"
              >
                Talk to us
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href={`tel:${BUSINESS.phone}`} className="text-white font-medium hover:text-lime transition-colors">
                {BUSINESS.phoneFormatted}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(FinalCTA);
