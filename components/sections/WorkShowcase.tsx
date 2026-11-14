import React from 'react';
import { ArrowRight, ArrowUpRight, Quote } from 'lucide-react';
import type { NavigateFn } from '../../types';
import { CASE_STUDIES, type CaseStudy } from '../../constants';
import { SectionMark } from '../ui/SectionMark';

/*
  Кейсы на главной, блок переписан 14 ноября 2026.

  Что было. Пять карточек во весь экран, которые наезжали друг на друга при
  прокрутке (components/sections/Work.tsx). Снимок сайта есть только у одного
  кейса, поэтому четыре карточки из пяти были чёрными прямоугольниками с
  инициалами, каждая высотой в экран. Раздел занимал половину главной и
  выглядел пустым.

  Что стало. Один кейс показан крупно: там, где есть и снимок сайта, который
  мы построили, и слова владельца. Остальные идут плитками с фирменной
  обложкой. Плитка честно говорит, что мы делали, и не притворяется снимком.

  Чего здесь по-прежнему нет: чисел результата. Подтверждённых замеров по
  клиентам у нас нет, и правило сайта прежнее. Когда владелец пришлёт цифры
  или видео от клиентов, место для них — крупная карточка.
*/

interface WorkShowcaseProps {
  onNavigate?: NavigateFn;
}

/** Три оттенка обложки, чтобы плитки не сливались. Все из тона акцента. */
const TILE_TONES = ['bg-forest', 'bg-[#11503C]', 'bg-forest-deep', 'bg-[#16614A]'];

const WorkShowcase: React.FC<WorkShowcaseProps> = ({ onNavigate }) => {
  const featured = CASE_STUDIES.find((cs) => cs.image && cs.testimonial) ?? CASE_STUDIES[0];
  const others = CASE_STUDIES.filter((cs) => cs.id !== featured.id).slice(0, 4);

  const open = (project: CaseStudy) => (event: React.MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate('case-study', { id: project.id, name: project.client });
  };
  const goToWork = (event: React.MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate('work');
  };
  const site = featured.website?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  return (
    <section id="work" className="bg-ivory dark:bg-[#191919] pt-16 md:pt-24 pb-16 md:pb-24 relative z-content">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <SectionMark>Our work</SectionMark>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-text-primary dark:text-white">
              Clients you can look up
            </h2>
            <p className="text-lg text-text-secondary dark:text-white/60 leading-relaxed mt-4">
              Every company here is real. Where we built the site, the link opens it, so you can check
              the work yourself before you talk to us.
            </p>
          </div>
          <a
            href="/work"
            onClick={goToWork}
            className="inline-flex items-center gap-2 self-start md:self-auto shrink-0 px-6 py-3 rounded-button border border-black/15 dark:border-white/20 text-text-primary dark:text-white font-medium text-[15px] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            See all work
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* Крупный кейс: снимок сайта и слова владельца */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] rounded-card overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.03] mb-4 md:mb-6">
          <a
            href={`/case-studies/${encodeURIComponent(featured.id)}`}
            onClick={open(featured)}
            className="relative block bg-forest min-h-[260px] md:min-h-[420px] group overflow-hidden"
          >
            {/*
              Снимок стоит фоном, а не тегом img. С тегом картинка держала
              свои пропорции и оставляла под собой пустую полосу, когда текст
              справа оказывался выше неё. Подпись для читалок — в aria-label.
            */}
            {featured.image && (
              <span
                role="img"
                aria-label={`${featured.client} — the site we built`}
                className="absolute inset-0 bg-cover bg-left-top group-hover:scale-[1.02] transition-transform duration-500"
                style={{ backgroundImage: `url(${featured.image})` }}
              />
            )}
          </a>
          <div className="p-6 md:p-10 flex flex-col">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-accent-text mb-3">
              {featured.industry} · {featured.location}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-text-primary dark:text-white mb-3">
              {featured.client}
            </h3>
            <p className="text-text-secondary dark:text-white/65 leading-relaxed mb-6">{featured.description}</p>

            {featured.testimonial && (
              <figure className="border-l-2 border-accent pl-5 mb-6">
                <Quote className="w-5 h-5 text-accent-text mb-2" aria-hidden="true" />
                <blockquote className="font-display text-lg md:text-xl text-text-primary dark:text-white leading-snug">
                  {featured.testimonial.quote}
                </blockquote>
                <figcaption className="text-sm text-text-secondary dark:text-white/60 mt-3">
                  {featured.testimonial.author}, {featured.testimonial.role}
                </figcaption>
              </figure>
            )}

            <div className="mt-auto flex flex-wrap gap-3">
              <a
                href={`/case-studies/${encodeURIComponent(featured.id)}`}
                onClick={open(featured)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button bg-black text-white dark:bg-white dark:text-black font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Read the case
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              {featured.website && (
                <a
                  href={featured.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button border border-black/15 dark:border-white/20 text-text-primary dark:text-white font-medium text-sm hover:border-accent transition-colors"
                >
                  {site}
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Остальные кейсы плитками */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {others.map((project, index) => (
            <a
              key={project.id}
              href={`/case-studies/${encodeURIComponent(project.id)}`}
              onClick={open(project)}
              className={`group relative overflow-hidden rounded-card text-white p-6 min-h-[260px] flex flex-col ${TILE_TONES[index % TILE_TONES.length]}`}
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 slash-stripes-light pointer-events-none" aria-hidden="true" />
              <p className="relative text-[11px] font-semibold tracking-[0.12em] uppercase text-lime mb-3">
                {project.industry}
              </p>
              <h3 className="relative font-display text-2xl font-semibold leading-tight mb-1">{project.client}</h3>
              <p className="relative text-sm text-white/65 mb-4">{project.location}</p>
              <p className="relative text-sm text-white/80 leading-relaxed mb-5">{project.description}</p>
              <span className="relative mt-auto inline-flex items-center gap-2 text-sm font-semibold text-lime">
                Read the case
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(WorkShowcase);
