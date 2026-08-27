import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '../ui/Breadcrumbs';
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
        {/*
          ОДНА колонка на всю страницу, по центру.

          До 26 августа вечера содержимое прижималось к левому краю широкого
          контейнера. Замер на живом сайте при окне 1615: колонка текста 672
          точки, справа 840 точек пустоты — больше половины ширины мертво. То
          же самое было на статьях блога и на страницах-ответах, то есть это
          не беда академии, а общая раскладка чтения.

          Ширина 2xl (672) выбрана по длине строки, а не по вкусу: при 17px
          это около 70 знаков в строке, что и считается удобным для чтения.
          Шире колонка — глаз теряет начало следующей строки.

          Заголовок, текст и карточки внизу теперь делят ОДИН левый и правый
          край. Раньше шапка была шире текста, и края не совпадали.
        */}
        <div className="container mx-auto px-6 pt-4 md:pt-6">
          <div className="mx-auto w-full max-w-2xl">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: 'Home', action: () => onNavigate('home') },
              { label: 'Academy', action: () => onNavigate('academy') },
              { label: `Module ${урок.module}` },
            ]}
          />

          {/*
            ШАПКА УРОКА: заголовок ЛЕЖИТ НА картинке, а не под ней.

            Три предыдущие правки этого места были попытками уместить картинку
            рядом с текстом, и все три давали одно и то же: отдельную плиту,
            которая забирает первый экран и ничего не объясняет. Сначала 16:9 во
            всю ширину, потом полоса 5:2 — плита просто становилась ниже.

            Правильный ответ оказался другой: картинка не соседствует с
            заголовком, она под ним. Тогда она перестаёт быть самостоятельным
            объектом, который надо разглядывать, и становится фоном — работает
            на страницу, а не спорит с ней.

            Тёмная заливка снизу обязательна и держит контраст: у картинок есть
            светлые фигуры (#EEF1F0), и белый заголовок на них без заливки
            читался бы хуже нормы. Замер худшего случая (белый текст ровно над
            светлой фигурой): заголовок 17.76 при пороге 3.0, подпись модуля
            9.15 при пороге 4.5.

            Рамки нет намеренно: у фона рамка обводит его как картину и
            возвращает ровно то ощущение отдельной плиты, от которого уходим.
          */}
          <header className="relative w-full aspect-[16/6] md:aspect-[16/5] rounded-card overflow-hidden mb-10">
            {урок.image ? (
              <img
                src={урок.image.src}
                alt=""
                width={1376}
                height={768}
                loading="eager"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            ) : (
              <div className="absolute inset-0 bg-black/90" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/30" />
            <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
              <span className="text-[11px] font-semibold tracking-wide text-white/70 mb-2">
                Module {урок.module}{модуль ? ` · ${модуль.name}` : ''}
              </span>
              <h1 className="font-display text-2xl md:text-4xl font-normal text-white leading-tight">
                {урок.title}
              </h1>
            </div>
          </header>

          <p className="text-text-secondary dark:text-white/70 text-base md:text-[17px] leading-relaxed mb-3">
            {урок.summary}
          </p>
          <p className="text-xs text-text-secondary dark:text-white/45 mb-10">
            {readingMinutes(урок)} min read
          </p>

          <article>

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

          <section className="border-t border-black/5 dark:border-white/10 pt-10">
            <h2 className="font-display text-xl md:text-2xl font-normal text-text-primary dark:text-white mb-6">
              The rest of the course
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>
    </>
  );
};

export default AcademyLessonPage;
