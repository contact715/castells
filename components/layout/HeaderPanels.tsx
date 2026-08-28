import React from 'react';
import MegaPanel from '../ui/MegaPanel';
import { SERVICE_CATEGORIES } from '../../data/services';
import { INDUSTRY_CATEGORIES } from '../../data/industries';
import { ACADEMY_TRACKS, ACADEMY_LESSONS, lessonsOfTrack } from '../../data/academy';
import { CASE_STUDIES } from '../../constants';
import { ANSWERS } from '../../data/answers';
import { BLOG_POSTS } from '../../data/blog';
import { PageView } from '../../App';
import { NavigationData } from '../../types';

/*
  Содержимое панелей верхнего меню. Заведено 27 августа 2026 по спеке
  docs/SPEC_2026-08-27_MEGA_MENU.md.

  ВСЕ СЧЁТЧИКИ СЧИТАЮТСЯ ИЗ ДАННЫХ, ни один не вписан руками. Это единственный
  способ, при котором меню не может соврать: добавится услуга — число вырастет
  само, удалится — уменьшится. Вписанное руками число живёт своей жизнью и
  расходится с сайтом молча.

  ЧТО МЫ НЕ ПЕРЕНЕСЛИ ИЗ ОБРАЗЦА. У них на каждой карточке фотография объекта и
  рейтинг «4.9 из 921+ отзывов». Фотографий услуг и ниш у нас нет, отзывов нет
  вовсе. Услуги и ниши сделаны на значках, которые у каждого элемента уже
  заданы, рейтинга нет: пустое место лучше выдуманного числа.
*/

interface HeaderPanelsProps {
  onNavigate: (page: PageView, data?: NavigationData) => void;
  /** Класс пункта меню, чтобы панели не расходились с обычными ссылками. */
  itemClass: string;
}

const колонкаКласс = 'text-sm text-text-secondary dark:text-white/65 hover:text-accent-text dark:hover:text-accent-text transition-colors text-left block w-full truncate';

export const ServicesPanel: React.FC<HeaderPanelsProps> = ({ onNavigate, itemClass }) => {
  // У услуг, в отличие от ниш, нет поля type: в items лежат только услуги.
  const всего = SERVICE_CATEGORIES.reduce((n, к) => n + к.items.length, 0);

  return (
    <MegaPanel
      label="Services"
      href="/services"
      onOpenHub={() => onNavigate('services')}
      className={itemClass}
      rail={{
        title: 'What we do',
        count: `${всего} services in ${SERVICE_CATEGORIES.length} groups`,
        text: 'Websites, ads, local presence and automation. Prices are published — no call needed to hear them.',
        cta: 'All services and prices',
      }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
        {SERVICE_CATEGORIES.map((категория) => (
          <div key={категория.id}>
            <h3 className="text-[10px] font-semibold tracking-wide text-text-secondary dark:text-white/50 mb-2">
              {категория.label.toUpperCase()}
            </h3>
            <ul className="space-y-1.5">
              {категория.items.map((услуга) => (
                <li key={услуга.slug}>
                  <button
                    type="button"
                    onClick={() => onNavigate('service', { id: услуга.slug })}
                    className={колонкаКласс}
                  >
                    {услуга.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </MegaPanel>
  );
};

export const IndustriesPanel: React.FC<HeaderPanelsProps> = ({ onNavigate, itemClass }) => {
  const всего = INDUSTRY_CATEGORIES.reduce(
    (n, к) => n + к.items.filter((i) => i.type === 'industry').length,
    0
  );

  return (
    <MegaPanel
      label="Industries"
      href="/industries"
      onOpenHub={() => onNavigate('industries')}
      className={itemClass}
      rail={{
        title: 'Who we work with',
        count: `${всего} trades in ${INDUSTRY_CATEGORIES.length} groups`,
        text: 'Home service businesses across the US. Our office is in Roseville, California.',
        cta: 'All industries',
      }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
        {INDUSTRY_CATEGORIES.map((категория) => (
          <div key={категория.id}>
            <h3 className="text-[10px] font-semibold tracking-wide text-text-secondary dark:text-white/50 mb-2">
              {категория.label.toUpperCase()}
            </h3>
            <ul className="space-y-1.5">
              {категория.items
                .filter((i) => i.type === 'industry')
                .map((ниша) => (
                  <li key={ниша.slug}>
                    <button
                      type="button"
                      onClick={() => onNavigate('industry', { id: ниша.slug })}
                      className={колонкаКласс}
                    >
                      {ниша.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </MegaPanel>
  );
};

export const AcademyPanel: React.FC<HeaderPanelsProps> = ({ onNavigate, itemClass }) => (
  <MegaPanel
    label="Academy"
    href="/academy"
    onOpenHub={() => onNavigate('academy')}
    className={itemClass}
    rail={{
      title: 'Courses by trade',
      count: `${ACADEMY_TRACKS.length} courses, ${ACADEMY_LESSONS.length} lessons`,
      text: 'Written from the work we do for clients. Free, no sign-up, nothing behind a form.',
      cta: 'Open the academy',
    }}
  >
    {/*
      Единственная панель с картинками: обложки курсов уже нарисованы
      (public/academy/track-*.webp). Подпись у них пустая намеренно — рядом
      стоит название курса, и читалка экрана, зачитав описание фона перед ним,
      только мешала бы.
    */}
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {ACADEMY_TRACKS.map((курс) => {
        const уроки = lessonsOfTrack(курс.slug);
        if (уроки.length === 0) return null;
        return (
          <button
            key={курс.slug}
            type="button"
            onClick={() => onNavigate('academy-track', { id: курс.slug })}
            className="group text-left rounded-element overflow-hidden border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 transition-colors"
          >
            <div className="relative h-20 bg-black">
              {курс.cover && (
                <img
                  src={курс.cover}
                  alt=""
                  width={1376}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                />
              )}
            </div>
            <div className="p-3">
              <span className="block text-sm font-medium text-text-primary dark:text-white leading-snug">
                {курс.name}
              </span>
              <span className="block text-xs text-text-secondary dark:text-white/45 mt-0.5">
                {уроки.length} lessons
              </span>
            </div>
          </button>
        );
      })}
    </div>
  </MegaPanel>
);

export const WorkPanel: React.FC<HeaderPanelsProps> = ({ onNavigate, itemClass }) => {
  const показываем = CASE_STUDIES.slice(0, 4);

  return (
    <MegaPanel
      label="Work"
      href="/work"
      onOpenHub={() => onNavigate('work')}
      className={itemClass}
      rail={{
        title: 'Clients you can look up',
        count: `${CASE_STUDIES.length} cases`,
        text: 'Real companies with names and cities. Where we built the site, the link opens it.',
        cta: 'See all work',
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        {показываем.map((кейс) => (
          <button
            key={кейс.id}
            type="button"
            onClick={() => onNavigate('case-study', { id: кейс.id })}
            className="group text-left rounded-element border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 transition-colors p-3"
          >
            <span className="block text-sm font-medium text-text-primary dark:text-white leading-snug">
              {кейс.client}
            </span>
            <span className="block text-xs text-text-secondary dark:text-white/45 mt-0.5">
              {[кейс.industry, кейс.location].filter(Boolean).join(' · ')}
            </span>
          </button>
        ))}
      </div>
    </MegaPanel>
  );
};

export const LearnPanel: React.FC<HeaderPanelsProps> = ({ onNavigate, itemClass }) => (
  <MegaPanel
    label="Learn"
    href="/learn"
    onOpenHub={() => onNavigate('learn')}
    className={itemClass}
    rail={{
      title: 'Questions and notes',
      count: `${ANSWERS.length} answers, ${BLOG_POSTS.length} notes`,
      text: 'Straight answers to what business owners ask us, and what we find while working.',
      cta: 'Read everything',
    }}
  >
    {/*
      Без картинок намеренно: три ответа и пять заметок. Панель с оформлением
      была бы больше своего содержания.
    */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
      <div>
        <h3 className="text-[10px] font-semibold tracking-wide text-text-secondary dark:text-white/50 mb-2">
          ANSWERS
        </h3>
        <ul className="space-y-1.5">
          {ANSWERS.map((ответ) => (
            <li key={ответ.slug}>
              <button
                type="button"
                onClick={() => onNavigate('answer', { id: ответ.slug })}
                className="text-sm text-text-secondary dark:text-white/65 hover:text-accent-text transition-colors text-left block w-full"
              >
                {ответ.question}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-[10px] font-semibold tracking-wide text-text-secondary dark:text-white/50 mb-2">
          NOTES
        </h3>
        <ul className="space-y-1.5">
          {BLOG_POSTS.slice(0, 5).map((пост) => (
            <li key={пост.id}>
              <button
                type="button"
                onClick={() => onNavigate('blog-post', { id: пост.id })}
                className="text-sm text-text-secondary dark:text-white/65 hover:text-accent-text transition-colors text-left block w-full"
              >
                {пост.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </MegaPanel>
);
