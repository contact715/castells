import React from 'react';
import { ACADEMY_MODULES, lessonsOfTrack, type AcademyLesson } from '../../data/academy';
import { PageView } from '../../App';
import { NavigationData } from '../../types';

/*
  Оглавление курса в правой колонке. Заведено 26 августа 2026.

  ЗАЧЕМ ИМЕННО ЭТО. Владелец дважды сказал про пустую правую сторону: «она что,
  прокажённая, что там пусто». Первый раз я ответил центрированием колонки — он
  вернул выравнивание по левому краю, и правильно: центрирование не заняло
  правую сторону, оно просто переставило пустоту на обе стороны.

  Пустоту нельзя убрать раскладкой, её можно только ЗАНЯТЬ. Занимать надо тем,
  что человеку в этом месте полезно, а на странице курса это одно: где он
  сейчас и что дальше. Оглавление отвечает на оба вопроса и держится при
  прокрутке.

  Ниже 1280 точек колонка прячется: там она отняла бы ширину у текста, а текст
  важнее. На телефоне между уроками ведут кнопки внизу страницы.
*/

interface AcademyOutlineProps {
  track: string;
  /** Адрес открытого урока. На странице курса его нет. */
  current?: string;
  onNavigate: (page: PageView, data?: NavigationData) => void;
}

const AcademyOutline: React.FC<AcademyOutlineProps> = ({ track, current, onNavigate }) => {
  const уроки = lessonsOfTrack(track);
  if (уроки.length === 0) return null;

  const прочитано = current ? уроки.findIndex((l) => l.slug === current) + 1 : 0;

  return (
    <aside className="hidden xl:block w-72 shrink-0" aria-label="Course contents">
      <div className="sticky top-28">
        <h2 className="text-[11px] font-semibold tracking-wide text-accent-text mb-4">
          In this course
        </h2>

        {/* Полоса чтения: одно число вместо списка «пройдено/осталось» */}
        {current && (
          <div className="mb-5">
            <div className="h-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div
                className="h-full bg-accent"
                style={{ width: `${Math.round((прочитано / уроки.length) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-text-secondary dark:text-white/45 mt-2">
              Lesson {прочитано} of {уроки.length}
            </p>
          </div>
        )}

        <ol className="space-y-4">
          {ACADEMY_MODULES.map((модуль) => {
            const свои = уроки.filter((l: AcademyLesson) => l.module === модуль.number);
            return (
              <li key={модуль.number}>
                <span className="block text-[10px] font-semibold tracking-wide text-text-secondary dark:text-white/40 mb-1">
                  MODULE {модуль.number}
                </span>
                {свои.length === 0 ? (
                  <span className="block text-sm text-text-secondary dark:text-white/35">
                    {модуль.name} — not written yet
                  </span>
                ) : (
                  свои.map((урок) => {
                    const открыт = урок.slug === current;
                    return (
                      <button
                        key={урок.slug}
                        type="button"
                        onClick={() =>
                          onNavigate('academy-lesson', { id: урок.slug, track: урок.track })
                        }
                        aria-current={открыт ? 'page' : undefined}
                        className={`block w-full text-left text-sm leading-snug transition-colors ${
                          открыт
                            ? 'text-text-primary dark:text-white font-medium border-l-2 border-accent pl-3 -ml-[2px]'
                            : 'text-text-secondary dark:text-white/60 hover:text-text-primary dark:hover:text-white pl-3 border-l-2 border-transparent'
                        }`}
                      >
                        {урок.title}
                      </button>
                    );
                  })
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
};

export default AcademyOutline;
