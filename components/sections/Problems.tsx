import React from 'react';

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
    title: 'Three vendors, nobody responsible',
    situation:
      'One person built the site, another runs the ads, a third set up the CRM. When the calls drop, each of them points at the other two.',
    reason:
      'Nobody owns the whole path from the search to the booked job, so nobody can say where it broke.',
  },
  {
    title: 'You paid for a setup, and then it sat there',
    situation:
      'The campaign was launched, the invoice was paid, and nobody has opened the account since. The site still shows last year’s services.',
    reason:
      'A setup is a one-time job. Marketing is a weekly one. Buying the first without the second is paying for a start with no one driving.',
  },
  {
    title: 'The ads work, and the requests still get lost',
    situation:
      'A call comes in while you are on a job. A form arrives in the evening. By the time someone calls back, the customer has booked someone else.',
    reason:
      'The ad did its part. The answer and the follow-up belong to no one, because they were never part of what you bought.',
  },
  {
    title: 'You became the marketing department',
    situation:
      'You answer reviews at night, check the ad account between jobs and remind the web person about the same fix for the third time.',
    reason:
      'Managing vendors is a job in itself, and it is not the one your customers pay you for.',
  },
];

const Problems: React.FC = () => (
  <section className="pt-12 md:pt-16 pb-12 md:pb-16 bg-ivory dark:bg-[#191919] relative">
    <div className="container mx-auto px-6">
      <div className="mb-10 md:mb-12 max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-accent-gradient shrink-0" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-wide text-text-secondary dark:text-white/50">Sound familiar?</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-text-primary dark:text-white">
          Marketing bought in pieces
          <br />
          <span className="text-text-secondary dark:text-white/50">breaks between the pieces</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {PROBLEMS.map((problem, index) => (
          <div
            key={problem.title}
            className="bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-8"
          >
            <span className="text-[11px] font-semibold tracking-wide text-accent-text">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary dark:text-white mt-2 mb-3">
              {problem.title}
            </h3>
            <p className="text-text-secondary dark:text-white/65 text-base leading-relaxed mb-4">{problem.situation}</p>
            <p className="text-sm text-text-secondary dark:text-white/55 leading-relaxed pt-4 border-t border-black/5 dark:border-white/10">
              <span className="font-semibold text-text-primary dark:text-white/80">Why it happens: </span>
              {problem.reason}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 md:mt-10 font-display text-xl md:text-2xl text-text-primary dark:text-white max-w-3xl leading-snug">
        So we stopped selling pieces. One team builds all of it and runs all of it, and answers for
        the whole path.
      </p>
    </div>
  </section>
);

export default React.memo(Problems);
