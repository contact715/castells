import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import SEO from '../ui/SEO';
import { ACADEMY_MODULES, lessonsOfModule, readingMinutes } from '../../data/academy';
import { PageView } from '../../App';
import { NavigationData } from '../../types';

/*
  Хаб академии, /academy. Заведён 26 августа 2026.

  Модули показываются ВСЕ, включая те, где урок ещё не написан, и такой модуль
  честно помечен. Прятать ненаписанное нельзя: человек, увидев шесть модулей и
  шесть уроков, решит, что программа целиком перед ним. Показать модуль без
  урока и сказать об этом — честно; показать и промолчать — нет.

  Разметку для поиска эта страница не рисует: она уже есть в готовом HTML,
  который отдаёт scripts/prerender-pages.mjs. Вторая копия дала бы дубли —
  ровно то, что убирали 26 августа на семи блоках.
*/

interface AcademyPageProps {
  onNavigate: (page: PageView, data?: NavigationData) => void;
}

const AcademyPage: React.FC<AcademyPageProps> = ({ onNavigate }) => (
  <>
    <SEO
      title="Academy for contractors | Castells Media"
      description="A free course for home service business owners: registering the business, brand, website, marketing budgets, getting found, and following up on the work you already have."
      canonical="/academy"
      summary="Free plain-text course from Castells Media for contractors and home service business owners, covering business setup, brand, websites, marketing budgets, lead sources and follow-up."
    />

    <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
      <div className="container mx-auto px-6 pt-4 md:pt-6">
        <PageHeader
          breadcrumbs={[
            { label: 'Home', action: () => onNavigate('home') },
            { label: 'Academy' },
          ]}
          badge="Academy"
          title="A course for contractors"
          description="Written from the work we do for clients, not from someone else's textbook. No numbers we cannot show you the source of, and nothing here is behind a form."
          onNavigate={onNavigate}
        />

        <div className="max-w-4xl space-y-10">
          {ACADEMY_MODULES.map((модуль) => {
            const уроки = lessonsOfModule(модуль.number);
            return (
              <section key={модуль.number}>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-[11px] font-semibold tracking-wide text-accent-text">
                    Module {модуль.number}
                  </span>
                  <h2 className="font-display text-xl md:text-2xl font-normal text-text-primary dark:text-white">
                    {модуль.name}
                  </h2>
                </div>
                <p className="text-text-secondary dark:text-white/65 mb-4">{модуль.about}</p>

                {уроки.length === 0 ? (
                  /* Модуль без урока называется вслух, а не прячется */
                  <p className="text-sm text-text-secondary dark:text-white/50 border border-dashed border-black/15 dark:border-white/15 rounded-card px-5 py-4">
                    Not written yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {уроки.map((урок) => (
                      <button
                        key={урок.slug}
                        type="button"
                        onClick={() => onNavigate('academy-lesson', { id: урок.slug })}
                        className="group w-full text-left bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 hover:border-black/20 dark:hover:border-white/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-display text-lg font-semibold text-text-primary dark:text-white">
                            {урок.title}
                          </h3>
                          <ArrowUpRight
                            className="w-4 h-4 shrink-0 mt-1 text-text-secondary dark:text-white/50 group-hover:text-accent-text transition-colors"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="text-text-secondary dark:text-white/65 leading-relaxed mb-3">
                          {урок.summary}
                        </p>
                        <span className="text-xs text-text-secondary dark:text-white/45">
                          {readingMinutes(урок)} min read
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  </>
);

export default AcademyPage;
