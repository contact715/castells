import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import SEO from '../ui/SEO';
import { ACADEMY_MODULES, ACADEMY_TRACKS, ACADEMY_LESSONS, lessonsOfTrack } from '../../data/academy';
import { PageView } from '../../App';
import { NavigationData } from '../../types';

/*
  Хаб академии, /academy. С 26 августа 2026 это список РЕМЁСЕЛ, а не список
  уроков: владелец попросил разделить академию по нишам, чтобы в разделе своего
  ремесла подрядчик находил всё, что его касается, от и до.

  Разделы без уроков показываются с пометкой, а не прячутся. Спрятанный раздел
  создаёт впечатление, что программа перед вами целиком, и человек не узнает,
  что для его ремесла курс ещё пишется. Сегодня содержание есть у одного
  раздела из пяти, и число названо прямо на странице.

  Разметку для поиска страница не рисует: она уже в готовом HTML.
*/

interface AcademyPageProps {
  onNavigate: (page: PageView, data?: NavigationData) => void;
}

const AcademyPage: React.FC<AcademyPageProps> = ({ onNavigate }) => {
  const сУроками = ACADEMY_TRACKS.filter((т) => lessonsOfTrack(т.slug).length > 0);

  return (
    <>
      <SEO
        title="Academy for contractors | Castells Media"
        description="A free course for home service business owners: registering the business, brand, website, marketing budgets, getting found, and following up on the work you already have."
        canonical="/academy"
        summary="Free plain-text course from Castells Media for contractors and home service business owners, covering business setup, brand, websites, marketing budgets, lead sources and follow-up."
      />

      <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
        <div className="container mx-auto px-6 pt-4 md:pt-6">
          {/*
            ДВЕ КОЛОНКИ, как на страницах курса и урока.

            До 27 августа хаб был единственной страницей академии, где правая
            сторона пустовала: оглавление курса сюда не подходит, а карточки
            занимают половину ширины. Владелец это заметил.

            Справа поставлен список модулей — он отвечает на вопрос, который
            карточки не отвечают: что именно внутри ЛЮБОГО из курсов. Не
            украшение и не повтор: карточки говорят, ДЛЯ КОГО курс, а модули —
            ИЗ ЧЕГО он состоит.
          */}
          <div className="flex gap-10 xl:justify-between">
            <div className="w-full max-w-3xl min-w-0">
            <Breadcrumbs
              className="mb-6"
              items={[{ label: 'Home', action: () => onNavigate('home') }, { label: 'Academy' }]}
            />

            <span className="text-[11px] font-semibold tracking-wide text-accent-text">Academy</span>
            <h1 className="font-display text-3xl md:text-4xl font-normal text-text-primary dark:text-white mt-2 mb-4 leading-tight">
              Courses by trade
            </h1>
            <p className="text-text-secondary dark:text-white/70 text-base md:text-[17px] leading-relaxed mb-3">
              Written from the work we do for clients, not from someone else&apos;s textbook. No
              numbers we cannot show you the source of, and nothing here is behind a form.
            </p>
            {/*
              Строка считается, а не пишется под сегодняшнее состояние.

              Первая версия говорила «остальные перечислены ниже, чтобы вы
              видели, что готовится». Это было верно при двух написанных курсах
              из пяти и повисло враньём, когда написали все пять: остальных не
              осталось. Такую строку нельзя чинить переписыванием — через месяц
              добавится шестой раздел, и она соврёт снова, уже в другую сторону.

              Поэтому: пока есть ненаписанные — называем их число вслух; когда
              написаны все — говорим, сколько всего уроков. Соврать в обоих
              случаях нечем.
            */}
            <p className="text-text-secondary dark:text-white/50 text-sm mb-10">
              {сУроками.length < ACADEMY_TRACKS.length ? (
                <>
                  {сУроками.length} of {ACADEMY_TRACKS.length} courses are written so far. The rest
                  are listed below so you can see what is coming.
                </>
              ) : (
                <>
                  {ACADEMY_TRACKS.length} courses, {ACADEMY_LESSONS.length} lessons. Free, no
                  sign-up, nothing behind a form.
                </>
              )}
            </p>

            <div className="space-y-4">
              {ACADEMY_TRACKS.map((раздел) => {
                const уроки = lessonsOfTrack(раздел.slug);
                const готов = уроки.length > 0;
                return (
                  <button
                    key={раздел.slug}
                    type="button"
                    disabled={!готов}
                    onClick={() => готов && onNavigate('academy-track', { id: раздел.slug })}
                    className={
                      готов
                        ? 'group w-full text-left bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 hover:border-black/20 dark:hover:border-white/30 transition-colors'
                        : 'w-full text-left border border-dashed border-black/15 dark:border-white/15 rounded-card p-6 cursor-default'
                    }
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h2
                        className={`font-display text-lg md:text-xl font-semibold ${
                          готов ? 'text-text-primary dark:text-white' : 'text-text-secondary dark:text-white/55'
                        }`}
                      >
                        {раздел.name}
                      </h2>
                      {готов && (
                        <ArrowUpRight
                          className="w-4 h-4 shrink-0 mt-1 text-text-secondary dark:text-white/50 group-hover:text-accent-text transition-colors"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <p className="text-text-secondary dark:text-white/65 leading-relaxed mb-3">
                      {раздел.about}
                    </p>
                    <span
                      className={`text-xs ${готов ? 'text-accent-text' : 'text-text-secondary dark:text-white/40'}`}
                    >
                      {готов ? `${уроки.length} lessons` : 'Not written yet'}
                    </span>
                  </button>
                );
              })}
            </div>
            </div>

            <aside className="hidden xl:block w-72 shrink-0" aria-label="What every course covers">
              <div className="sticky top-28">
                <h2 className="text-[11px] font-semibold tracking-wide text-accent-text mb-4">
                  What every course covers
                </h2>
                <ol className="space-y-4">
                  {ACADEMY_MODULES.map((модуль) => (
                    <li key={модуль.number}>
                      <span className="block text-[10px] font-semibold tracking-wide text-text-secondary dark:text-white/40 mb-1">
                        MODULE {модуль.number}
                      </span>
                      <span className="block text-sm font-medium text-text-primary dark:text-white leading-snug">
                        {модуль.name}
                      </span>
                      <span className="block text-sm text-text-secondary dark:text-white/55 leading-snug mt-0.5">
                        {модуль.about}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademyPage;
