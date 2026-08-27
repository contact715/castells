import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import AcademyDiagram from '../ui/AcademyDiagram';
import SEO from '../ui/SEO';
import {
  ACADEMY_LESSONS,
  ACADEMY_MODULES,
  findLesson,
  readingMinutes,
} from '../../data/academy';
import { PageView } from '../../App';
import { NavigationData } from '../../types';

/*
  Один урок академии, /academy/{урок}. Заведён 26 августа 2026.

  Ограничение по ширине строки стоит намеренно: читать длинный текст во всю
  ширину экрана тяжело, и это единственная причина, по которой здесь есть
  max-w. Схема и картинка шире текста сознательно — они читаются взглядом
  целиком, а не построчно.

  На странице три разных вида вставок, и у каждой своя работа:
    заглавная картинка — чтобы страница не выглядела стеной букв;
    схема — то, чего в тексте нет: соотношения, порядок, пропорции;
    блок «из нашей практики» — проверяемый факт, живой сайт клиента.

  Разметку для поиска страница не рисует: она уже в готовом HTML.
*/

interface AcademyLessonPageProps {
  slug?: string;
  onNavigate: (page: PageView, data?: NavigationData) => void;
}

const AcademyLessonPage: React.FC<AcademyLessonPageProps> = ({ slug, onNavigate }) => {
  const урок = findLesson(slug) || ACADEMY_LESSONS[0];
  const модуль = ACADEMY_MODULES.find((m) => m.number === урок.module);

  // Следующий урок — по порядку модулей, а не по порядку в файле.
  const порядок = [...ACADEMY_LESSONS].sort((a, b) => a.module - b.module);
  const место = порядок.findIndex((l) => l.slug === урок.slug);
  const следующий = порядок[место + 1];

  return (
    <>
      <SEO
        title={`${урок.title} | Castells Media Academy`}
        description={урок.summary}
        canonical={`/academy/${урок.slug}`}
        summary={урок.summary}
      />

      <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
        <div className="container mx-auto px-6 pt-4 md:pt-6">
          <PageHeader
            breadcrumbs={[
              { label: 'Home', action: () => onNavigate('home') },
              { label: 'Academy', action: () => onNavigate('academy') },
              { label: `Module ${урок.module}` },
            ]}
            badge={модуль ? `Module ${урок.module} · ${модуль.name}` : 'Academy'}
            title={урок.title}
            description={урок.summary}
            onNavigate={onNavigate}
          />

          {урок.image && (
            /*
              Заглавная картинка. width и height проставлены, чтобы страница не
              прыгала при её загрузке; loading="eager" потому что она первая на
              экране, и ленивая загрузка тут дала бы мигание, а не экономию.
            */
            <img
              src={урок.image.src}
              alt={урок.image.alt}
              width={1376}
              height={768}
              loading="eager"
              decoding="async"
              className="w-full max-w-3xl rounded-card mb-12 border border-black/5 dark:border-white/10"
            />
          )}

          <article className="max-w-2xl">
            <p className="text-xs text-text-secondary dark:text-white/45 mb-10">
              {readingMinutes(урок)} min read
            </p>

            {урок.sections.map((раздел, номер) => (
              <section key={раздел.heading} className="mb-10">
                <h2 className="font-display text-xl md:text-2xl font-semibold text-text-primary dark:text-white mb-4">
                  {раздел.heading}
                </h2>
                {раздел.body.map((абзац) => (
                  <p
                    key={абзац.slice(0, 40)}
                    className="text-text-secondary dark:text-white/70 text-base md:text-[17px] leading-relaxed mb-4"
                  >
                    {абзац}
                  </p>
                ))}
                {/*
                  Схема ставится после ВТОРОГО раздела, а не в начале: к этому
                  месту человек уже знает, о чём речь, и схема ему подсказка, а
                  не ребус. В начале страницы она была бы украшением.
                */}
                {номер === 1 && урок.diagram && <AcademyDiagram kind={урок.diagram} />}
              </section>
            ))}

            {урок.ourWork && (
              /*
                Пример из собственной практики. Стоит ПЕРЕД «что делать
                дальше»: сначала человек видит, что мы это правда делаем, и
                только потом получает задание. Обратный порядок читался бы как
                реклама в конце урока.
              */
              <aside className="border-l-2 border-accent pl-5 mb-10">
                <h2 className="text-[11px] font-semibold tracking-wide text-accent-text mb-2">
                  From our own work
                </h2>
                <p className="text-text-secondary dark:text-white/70 text-base leading-relaxed">
                  {урок.ourWork}
                </p>
              </aside>
            )}

            <aside className="bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-7 mb-12">
              <h2 className="text-[11px] font-semibold tracking-wide text-accent-text mb-3">
                Do this next
              </h2>
              <p className="text-text-secondary dark:text-white/70 text-base leading-relaxed">
                {урок.takeaway}
              </p>
            </aside>

            <div className="flex flex-col sm:flex-row gap-3 mb-16">
              {следующий ? (
                <button
                  type="button"
                  onClick={() => onNavigate('academy-lesson', { id: следующий.slug })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-button bg-black text-white dark:bg-white dark:text-black font-medium text-[15px] hover:opacity-90 transition-opacity"
                >
                  Next: {следующий.title}
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate('academy')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-button bg-black text-white dark:bg-white dark:text-black font-medium text-[15px] hover:opacity-90 transition-opacity"
                >
                  Back to the course
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              )}
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-button border border-black/15 dark:border-white/25 text-text-primary dark:text-white font-medium text-[15px] hover:border-black/40 dark:hover:border-white/50 transition-colors"
              >
                Ask us about your business
              </button>
            </div>
          </article>

          <section className="border-t border-black/5 dark:border-white/10 pt-10 max-w-4xl">
            <h2 className="font-display text-xl md:text-2xl font-normal text-text-primary dark:text-white mb-6">
              The rest of the course
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {порядок
                .filter((l) => l.slug !== урок.slug)
                .map((l) => (
                  <button
                    key={l.slug}
                    type="button"
                    onClick={() => onNavigate('academy-lesson', { id: l.slug })}
                    className="group text-left bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 hover:border-black/20 dark:hover:border-white/30 transition-colors"
                  >
                    <span className="text-[11px] font-semibold tracking-wide text-accent-text">
                      Module {l.module}
                    </span>
                    <div className="flex items-start justify-between gap-4 mt-1">
                      <h3 className="font-display text-lg font-semibold text-text-primary dark:text-white">
                        {l.title}
                      </h3>
                      <ArrowUpRight
                        className="w-4 h-4 shrink-0 mt-1 text-text-secondary dark:text-white/50 group-hover:text-accent-text transition-colors"
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AcademyLessonPage;
