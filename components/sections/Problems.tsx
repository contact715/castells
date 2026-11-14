import React from 'react';
import { SectionMark } from '../ui/SectionMark';
import { ProblemArt } from '../ui/ProblemArt';

/*
  Блок «узнаёте себя?», добавлен 14 ноября 2026 вместе со сменой
  позиционирования на полное ежемесячное ведение.

  Зачем он. Первый экран говорит, что мы продаём. Этот блок отвечает на
  вопрос «а мне это зачем»: называет четыре ситуации, в которых владелец
  уже побывал, покупая маркетинг по частям. Именно из них следует, почему
  мы больше не продаём отдельные настройки.

  Чего здесь нет намеренно: чисел. Ни «80 заявок по 15 долларов», ни
  процентов потерянных звонков. Правило сайта прежнее: число без источника
  на страницу не попадает. Ситуации описаны словами.
*/

const PROBLEMS = [
  {
    art: 'vendors',
    title: 'Three vendors, nobody responsible',
    situation:
      'One person built the site, another runs the ads, a third set up the CRM. When the calls drop, each of them points at the other two.',
    reason:
      'Nobody owns the whole path from the search to the booked job, so nobody can say where it broke.',
  },
  {
    art: 'abandoned',
    title: 'You paid for a setup, and then it sat there',
    situation:
      'The campaign was launched, the invoice was paid, and nobody has opened the account since. The site still shows last year’s services.',
    reason:
      'A setup is a one-time job. Marketing is a weekly one. Buying the first without the second is paying for a start with no one driving.',
  },
  {
    art: 'missed',
    title: 'The ads work, and the requests still get lost',
    situation:
      'A call comes in while you are on a job. A form arrives in the evening. By the time someone calls back, the customer has booked someone else.',
    reason:
      'The ad did its part. The answer and the follow-up belong to no one, because they were never part of what you bought.',
  },
  {
    art: 'juggling',
    title: 'You became the marketing department',
    situation:
      'You answer reviews at night, check the ad account between jobs and remind the web person about the same fix for the third time.',
    reason:
      'Managing vendors is a job in itself, and it is not the one your customers pay you for.',
  },
];

const Problems: React.FC = () => (
  <section className="py-16 md:py-24 bg-mint dark:bg-[#12241d] relative">
    <div className="container mx-auto px-6">
      <div className="mb-10 md:mb-12 max-w-2xl">
        <SectionMark>Sound familiar?</SectionMark>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-text-primary dark:text-white">
          Marketing bought in pieces
          <br />
          <span className="text-accent-text italic font-semibold">breaks between the pieces</span>
        </h2>
        <p className="text-lg text-text-secondary dark:text-white/60 leading-relaxed mt-4">
          Four things home service owners tell us on the first call.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {PROBLEMS.map((problem, index) => (
          <div
            key={problem.title}
            className="bg-white dark:bg-white/[0.04] border border-forest/15 dark:border-white/10 rounded-card overflow-hidden flex flex-col"
          >
            {/*
              Рисунок сверху: ситуацию видно раньше, чем прочитано. Подложка
              светлая в обеих темах: линии рисунка тёмные, и на тёмном фоне
              половина схемы пропадала.
            */}
            <div className="bg-ivory border-b border-forest/10 dark:border-white/10 h-44 md:h-52 px-6 py-4">
              <ProblemArt name={problem.art} />
            </div>
            <div className="p-6 md:p-8 flex flex-col grow">
              <span className="font-display italic text-accent-text text-lg leading-none">
                {String(index + 1).padStart(2, '0')}
                <span className="text-text-secondary/50 not-italic text-sm"> / {String(PROBLEMS.length).padStart(2, '0')}</span>
              </span>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary dark:text-white mt-3 mb-3">
                {problem.title}
              </h3>
              <p className="text-text-secondary dark:text-white/65 text-base leading-relaxed mb-4">{problem.situation}</p>
              <p className="text-sm text-text-secondary dark:text-white/55 leading-relaxed pt-4 mt-auto border-t border-black/5 dark:border-white/10">
                <span className="font-semibold text-text-primary dark:text-white/80">Why it happens: </span>
                {problem.reason}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-10 bg-forest text-white rounded-card p-6 md:p-10 relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/4 slash-stripes-light opacity-60 pointer-events-none" aria-hidden="true" />
        <p className="relative font-display text-2xl md:text-3xl leading-snug max-w-3xl">
          So we stopped selling pieces. <span className="text-lime italic">One team builds all of it and runs all
          of it,</span> and answers for the whole path.
        </p>
      </div>
    </div>
  </section>
);

export default React.memo(Problems);
