import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import SEO from '../ui/SEO';
import AcademyOutline from '../ui/AcademyOutline';
import { TITLE, DESCRIPTION } from '../../scripts/page-meta.mjs';
import {
  ACADEMY_MODULES,
  ACADEMY_TRACKS,
  findTrack,
  lessonsOfModule,
  lessonsOfTrack,
  readingMinutes,
} from '../../data/academy';
import { PageView } from '../../App';
import { NavigationData } from '../../types';

/*
  Курс одного ремесла, /academy/{ремесло}. Заведена 26 августа 2026, когда
  академию разделили по нишам.

  Модули показываются ВСЕ, включая те, где урок для этого ремесла ещё не
  написан, и такой модуль честно помечен. Прятать ненаписанное нельзя: человек,
  увидев шесть модулей и шесть уроков, решит, что программа целиком перед ним.

  Раздел без единого урока сюда не пускается вовсе — на него нет ссылки с
  хаба, и генератор не делает для него страницу. Пустая страница курса хуже
  отсутствующей: она выглядит поломкой, а не планом.
*/

interface AcademyTrackPageProps {
  slug?: string;
  onNavigate: (page: PageView, data?: NavigationData) => void;
}

const AcademyTrackPage: React.FC<AcademyTrackPageProps> = ({ slug, onNavigate }) => {
  const раздел = findTrack(slug) || ACADEMY_TRACKS[0];
  const всеУроки = lessonsOfTrack(раздел.slug);

  return (
    <>
      <SEO
        title={TITLE.academyTrack(раздел.name)}
        description={DESCRIPTION.academyTrack(раздел.about)}
        canonical={`/academy/${раздел.slug}`}
        summary={раздел.about}
      />

      <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
        <div className="container mx-auto px-6 pt-4 md:pt-6">
          {/*
            ДВЕ КОЛОНКИ, разнесённые по краям.

            Владелец дважды сказал про пустую правую сторону. Первый раз я
            ответил центрированием — он вернул выравнивание влево, и правильно:
            центрирование не заняло правую сторону, а размазало пустоту на обе.

            Пустоту нельзя убрать раскладкой, её можно только ЗАНЯТЬ. Текст
            слева, оглавление курса справа, justify-between разводит их по
            краям — теперь содержание есть у обоих краёв.

            Ниже 1280 точек оглавление прячется: там оно отняло бы ширину у
            текста, а текст важнее.
          */}
          <div className="flex gap-10 xl:justify-between">
            <div className="w-full max-w-3xl min-w-0">
            <Breadcrumbs
              className="mb-6"
              items={[
                { label: 'Home', action: () => onNavigate('home') },
                { label: 'Academy', action: () => onNavigate('academy') },
                { label: раздел.name },
              ]}
            />

            <span className="text-[11px] font-semibold tracking-wide text-accent-text">
              Academy
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-normal text-text-primary dark:text-white mt-2 mb-4 leading-tight">
              {раздел.name}
            </h1>
            <p className="text-text-secondary dark:text-white/70 text-base md:text-[17px] leading-relaxed mb-3">
              {раздел.about}
            </p>
            <p className="text-text-secondary dark:text-white/50 text-sm mb-10">
              {всеУроки.length} {всеУроки.length === 1 ? 'lesson' : 'lessons'} across{' '}
              {ACADEMY_MODULES.length} modules. Free, no sign-up.
            </p>

            <div className="space-y-10">
              {ACADEMY_MODULES.map((модуль) => {
                const уроки = lessonsOfModule(раздел.slug, модуль.number);
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
                      <p className="text-sm text-text-secondary dark:text-white/50 border border-dashed border-black/15 dark:border-white/15 rounded-card px-5 py-4">
                        Not written yet.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {уроки.map((урок) => (
                          <button
                            key={урок.slug}
                            type="button"
                            onClick={() =>
                              onNavigate('academy-lesson', { id: урок.slug, track: раздел.slug })
                            }
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

            <AcademyOutline track={раздел.slug} onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademyTrackPage;
