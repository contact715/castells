import React from 'react';
import { Check, X } from 'lucide-react';
import { SectionMark } from '../ui/SectionMark';

/*
  Таблица «по частям или целиком», добавлена 14 ноября 2026.

  Сравниваем не себя с «типичным агентством», а два способа покупать
  маркетинг: по частям у разных людей и целиком у одной команды. Левый
  столбец описывает то, что следует из самой схемы «каждый отвечает за своё»,
  а не чьи-то грехи. Правый — только наши условия из config/offer.mjs и то,
  что уже обещано на странице цен.

  Чужих цен, чужих сроков и слов «обычно берут N долларов» здесь нет: такие
  числа нам нечем подтвердить.
*/

const ROWS = [
  {
    topic: 'Who answers for the result',
    pieces: 'Each vendor for their own piece. Nobody for the booked job.',
    whole: 'One team, for the whole path from the search to the booked job.',
  },
  {
    topic: 'Who you talk to',
    pieces: 'A web person, an ads person, a CRM person, each with their own schedule.',
    whole: 'One person who does the work. The same one every week.',
  },
  {
    topic: 'What you pay',
    pieces: 'A setup fee for each piece, then several monthly bills.',
    whole: 'One monthly fee. No setup fee: the build is inside it.',
  },
  {
    topic: 'After the launch',
    pieces: 'The setup is delivered. Running it is a separate conversation.',
    whole: 'We run all of it every month. That is the product.',
  },
  {
    topic: 'When the calls drop',
    pieces: 'You find out which vendor to ask, and each points at the others.',
    whole: 'We already see it in the weekly report, and it is ours to fix.',
  },
  {
    topic: 'Your time',
    pieces: 'You manage the vendors between jobs.',
    whole: 'A few minutes a week to read one report.',
  },
  {
    topic: 'If you stop',
    pieces: 'Depends on whose name the site and the accounts are in.',
    whole: 'Month to month. The site, accounts and customer list are yours.',
  },
];

const Compare: React.FC = () => (
  <section className="py-16 md:py-24 bg-forest text-white relative overflow-hidden">
    <div className="container mx-auto px-6 relative">
      <div className="mb-10 md:mb-12 max-w-2xl">
        <SectionMark onDark>Two ways to buy marketing</SectionMark>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight">
          In pieces from three vendors,
          <br />
          <span className="text-lime italic font-semibold">or all of it from one team</span>
        </h2>
      </div>

      {/* На телефоне каждая строка складывается в карточку */}
      <div className="rounded-card overflow-hidden border border-white/15">
        <div className="hidden md:grid grid-cols-[0.8fr_1fr_1fr] text-xs font-semibold tracking-[0.12em] uppercase">
          <div className="p-5 bg-forest-deep text-white/50" />
          <div className="p-5 bg-forest-deep text-white/70 border-l border-white/10">Bought in pieces</div>
          <div className="p-5 bg-lime text-forest">Full-service with Castells</div>
        </div>
        {ROWS.map((row) => (
          <div key={row.topic} className="grid grid-cols-1 md:grid-cols-[0.8fr_1fr_1fr] border-t border-white/10 first:border-t-0 md:first:border-t">
            <div className="p-5 pb-2 md:pb-5 font-display text-lg font-semibold">{row.topic}</div>
            <div className="px-5 py-2 md:p-5 md:border-l border-white/10 flex items-start gap-3 text-white/70">
              <X className="w-4 h-4 shrink-0 mt-1 text-white/40" aria-hidden="true" />
              <span><span className="md:hidden block text-[11px] font-semibold tracking-[0.12em] uppercase text-white/45 mb-1">Bought in pieces</span>{row.pieces}</span>
            </div>
            <div className="px-5 pt-2 pb-5 md:p-5 bg-white/[0.07] md:bg-lime/95 md:text-forest flex items-start gap-3 font-medium">
              <Check className="w-4 h-4 shrink-0 mt-1 text-lime md:text-forest" aria-hidden="true" />
              <span><span className="md:hidden block text-[11px] font-semibold tracking-[0.12em] uppercase text-lime mb-1">Full-service with Castells</span>{row.whole}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default React.memo(Compare);
