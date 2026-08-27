import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import AcademyDiagram from '../ui/AcademyDiagram';
import AcademyOutline from '../ui/AcademyOutline';
import SEO from '../ui/SEO';
import {
  ACADEMY_MODULES,
  findLesson,
  findTrack,
  lessonsOfTrack,
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
  const урок = findLesson(slug) || lessonsOfTrack('contractors')[0];
  const модуль = ACADEMY_MODULES.find((m) => m.number === урок.module);
  const раздел = findTrack(урок.track);

  // Следующий урок — внутри СВОЕГО раздела, по порядку модулей.
  const порядок = [...lessonsOfTrack(урок.track)].sort((a, b) => a.module - b.module);
  const место = порядок.findIndex((l) => l.slug === урок.slug);
  const следующий = порядок[место + 1];

  return (
    <>
      <SEO
        title={`${урок.title} | Castells Media Academy`}
        description={урок.summary}
        canonical={`/academy/${урок.track}/${урок.slug}`}
        summary={урок.summary}
      />

      <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
        {/*
          ОДНА колонка на всю страницу, по ЛЕВОМУ краю.

          Колонку в тот же день попробовали центрировать: справа при окне 1615
          пустовало 840 точек, больше половины ширины. Владелец посмотрел и
          вернул выравнивание по левому краю — пустое поле справа устраивает
          его больше, чем колонка посреди экрана. Это его решение, не забыть
          при следующей правке раскладки.

          Ширина 2xl (672) выбрана по длине строки, а не по вкусу: при 17px
          это около 70 знаков в строке, что и считается удобным для чтения.
          Шире колонка — глаз теряет начало следующей строки.

          Заголовок, текст и карточки внизу теперь делят ОДИН левый и правый
          край. Раньше шапка была шире текста, и края не совпадали.
        */}
        <div className="container mx-auto px-6 pt-4 md:pt-6">
          {/*
            ШАПКА ВО ВСЮ ШИРИНУ, ОТДЕЛЬНО ОТ ДВУХ КОЛОНОК.

            До 27 августа она жила внутри левой колонки и была уже страницы.
            Владелец: «почему контент не растянут на всю ширину, почему ровно
            разделён на половину». Замер подтвердил: при окне 1615 текст занимал
            672 точки, оглавление 288, между ними 528 точек пустоты, и шапка
            обрывалась на 728-й.

            Теперь шапка идёт по всей ширине контейнера, а на две колонки
            делится только то, что ниже. Это и есть обычная раскладка статьи:
            баннер во всю ширину, под ним текст с боковой колонкой.
          */}
          <header className="relative w-full aspect-[16/6] md:aspect-[21/6] rounded-card overflow-hidden mb-10">
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
            {/*
              Заливка теперь ТОЛЬКО СНИЗУ, где лежит заголовок.

              Прежняя шла от 90% черноты внизу до 30% вверху и убивала картинку
              целиком: владелец сказал «картинку не видно», и он прав — смысл
              изображения пропадал, оставалась тёмная плита.

              Сюжеты нарисованы с центральной композицией, поэтому середина и
              верх могут остаться открытыми. Замер худшего случая (белый текст
              ровно над самой светлой фигурой #EEF1F0): при 85% черноты внизу
              фон становится rgb(36,36,36), контраст 15.52 при пороге 3.0.
            */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

            <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
              {/*
                Надзаголовок НАВЕРХУ — владелец сказал, что ему там место, и по
                композиции он прав: снизу оба текста жались в кучу, а середина
                шапки пустовала. Своя тёмная подложка обязательна: наверху общей
                заливки почти нет, и белый текст лёг бы прямо на светлую фигуру.
                Замер: при 70% черноты фон rgb(71,72,72), контраст 7.84 при
                пороге 4.5.
              */}
              <span className="self-start bg-black/70 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90">
                Module {урок.module}{модуль ? ` · ${модуль.name}` : ''}
              </span>
              <h1 className="font-display text-2xl md:text-4xl font-normal text-white leading-tight max-w-4xl">
                {урок.title}
              </h1>
            </div>
          </header>

          <div className="flex gap-10 xl:justify-between">
            <div className="w-full max-w-2xl min-w-0">
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

            {урок.numbers && (
              /*
                Счёт. Стоит ПОСЛЕ текста и ПЕРЕД примером из практики: сначала
                человек понял мысль, потом видит её в числах, потом видит, что
                мы это правда делаем.

                Оговорка про примерные числа стоит прямо в блоке, а не в
                подвале страницы. Числа без такой оговорки читаются как
                статистика, и через неделю кто-нибудь процитирует «по данным
                Castells, подрядчик теряет 31 тысячу в год». Мы этого не
                измеряли и не утверждаем.
              */
              <section className="border border-black/10 dark:border-white/15 rounded-card p-6 md:p-7 mb-10">
                <h2 className="font-display text-lg font-semibold text-text-primary dark:text-white mb-1">
                  {урок.numbers.title}
                </h2>
                <p className="text-xs text-text-secondary dark:text-white/45 mb-5">
                  Example figures, not averages. Put your own in.
                </p>

                <dl className="mb-5">
                  {урок.numbers.rows.map((строка) => (
                    <div
                      key={строка.label}
                      className="flex items-baseline justify-between gap-4 py-2 border-b border-black/5 dark:border-white/10"
                    >
                      <dt className="text-text-secondary dark:text-white/65 text-[15px]">
                        {строка.label}
                      </dt>
                      <dd className="text-text-primary dark:text-white text-[15px] font-medium shrink-0 tabular-nums">
                        {строка.value}
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-4 pt-4">
                    <dt className="text-text-primary dark:text-white text-[15px] font-medium">
                      {урок.numbers.result.label}
                    </dt>
                    <dd className="text-accent-text text-base font-semibold shrink-0 tabular-nums">
                      {урок.numbers.result.value}
                    </dd>
                  </div>
                </dl>

                <p className="text-text-secondary dark:text-white/70 text-[15px] leading-relaxed">
                  {урок.numbers.after}
                </p>
              </section>
            )}

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
                  onClick={() => onNavigate('academy-lesson', { id: следующий.slug, track: следующий.track })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-button bg-black text-white dark:bg-white dark:text-black font-medium text-[15px] hover:opacity-90 transition-opacity"
                >
                  Next: {следующий.title}
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate('academy-track', { id: урок.track })}
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
                    onClick={() => onNavigate('academy-lesson', { id: l.slug, track: l.track })}
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

            <AcademyOutline track={урок.track} current={урок.slug} onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademyLessonPage;
