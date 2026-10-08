import React from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { CASE_STUDIES } from '../../constants';
import type { CaseStudy } from '../../constants';
import type { NavigateFn } from '../../types';
import { findAuthorById, AUTHORS } from '../../data/authors';
import { buildAuthorPath, buildCaseStudyPath } from '../../lib/routes';
import OptimizedImage from '../ui/OptimizedImage';

/*
  Страница кейса, переписана 8 октября 2026 по образцу страницы статьи
  (BlogPostDetail): одна колонка текста по левому краю, заголовок Literata,
  подписи и даты мелким текстом, тонкие линии вместо карточек.

  Что было и почему убрано:
  - Название и описание клиента лежали поверх снимка его сайта, под
    размытием. На снимке свой крупный текст («Heating & Cooling You Can
    Rely»), и он читался сквозь заголовок. Теперь заголовок над снимком,
    а снимок — иллюстрация с подписью.
  - Описание повторялось дважды подряд: на обложке и первым абзацем.
  - Заголовок «Results» стоял над пустотой: чисел нет ни у одного кейса
    (выдуманные убраны в августе). Теперь блок появляется, только если
    числа есть.
  - Брендбук показывался во встроенном окне высотой 1200 точек, но PDF на
    сайт не выкладывается (.vercelignore исключает *.pdf), и сайт запрещает
    показывать себя во встроенных окнах (X-Frame-Options: DENY). Посетитель
    видел огромный белый пустой квадрат. Ссылка на брендбук показывается,
    только когда файл реально лежит в public/ — то есть не сейчас.
  - Боковая панель с кнопками-пилюлями по разделам на странице из четырёх
    абзацев была интерфейсом приложения, а не издания. Автор теперь в
    шапке, связь — кнопкой в конце, как в статье.
*/

interface CaseStudyDetailProps {
  onBack: () => void;
  onNavigate: NavigateFn;
  project?: Partial<CaseStudy>;
}

const SITE_URL = 'https://www.castells.media';

const hostOf = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

/* Обычный клик ведём через навигацию приложения, клик с Cmd/Ctrl или средней
   кнопкой оставляем браузеру — пусть открывает в новой вкладке. */
const appLink = (go: () => void) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  go();
};

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ onNavigate, project }) => {
  const caseStudyId = project?.id != null ? String(project.id) : undefined;
  /*
    Раньше здесь стоял целиком выдуманный кейс: клиент «Apex Architecture»,
    которого нет ни в одной базе, вымышленные результаты ($697k выручки,
    +210%) и вымышленный отзыв от несуществующего человека. Он подставлялся
    для любого /case-studies/:id, которого нет в CASE_STUDIES — то есть
    любой мог открыть придуманную историю успеха. Найдено и убрано 24
    августа 2026. Нет кейса — страница показывает, что его нет, а не
    выдумывает его.
  */
  const data = caseStudyId ? CASE_STUDIES.find((cs) => cs.id === caseStudyId) : undefined;

  if (!data) {
    return (
      <div className="bg-ivory dark:bg-[#191919] min-h-screen pt-16 md:pt-20 pb-20 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center max-w-xl">
          <h1 className="font-display text-3xl md:text-4xl font-normal text-text-primary mb-4">
            This case study does not exist
          </h1>
          <p className="text-text-secondary mb-8">
            The work we can show you is on the work page.
          </p>
          <Button onClick={() => onNavigate('work')} size="lg">
            View our work
          </Button>
        </div>
      </div>
    );
  }

  const author = findAuthorById('dmitrii') || AUTHORS[0];
  const path = buildCaseStudyPath(data.id);
  const results = data.results?.filter((r) => r.value) ?? [];
  const others = CASE_STUDIES.filter((cs) => cs.id !== data.id).slice(0, 3);

  const words = [data.description, data.challenge, data.solution, data.testimonial?.quote, ...(data.keyFeatures ?? [])]
    .filter(Boolean)
    .join(' ')
    .split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.round(words / 200));

  const facts: { label: string; value: React.ReactNode }[] = [
    ...(data.location ? [{ label: 'Location', value: data.location }] : []),
    ...(data.services?.length ? [{ label: 'What we did', value: data.services.join(', ') }] : []),
    ...(data.website
      ? [{
          label: 'Live site',
          value: (
            <a
              href={data.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline decoration-black/20 dark:decoration-white/30 underline-offset-4 hover:text-accent-text hover:decoration-current transition-colors"
            >
              {hostOf(data.website)}
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ),
        }]
      : []),
    {
      label: 'Story by',
      value: (
        <a
          href={buildAuthorPath(author.id)}
          onClick={appLink(() => onNavigate('author', { id: author.id, name: author.name }))}
          className="underline decoration-black/20 dark:decoration-white/30 underline-offset-4 hover:text-accent-text hover:decoration-current transition-colors"
        >
          {author.name}
        </a>
      ),
    },
  ];

  const reveal = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.35 },
  };

  return (
    <>
      <SEO title={`${data.client} — ${data.industry} | Castells Media`} description={data.description} canonical={path} />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { name: 'Home', item: `${SITE_URL}/` },
            { name: 'Work', item: `${SITE_URL}/work` },
            { name: data.client, item: `${SITE_URL}${path}` },
          ],
        }}
      />

      <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
        <div className="container mx-auto px-6 pt-4 md:pt-6">
          <Breadcrumbs
            className="mb-10"
            items={[
              { label: 'Home', href: '/', action: () => onNavigate('home') },
              { label: 'Work', href: '/work', action: () => onNavigate('work') },
              { label: data.client },
            ]}
          />

          {/* По левому краю, как статьи: решение владельца 26 августа 2026 */}
          <article>
            <header className="max-w-[43rem]">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
                <span className="text-[11px] font-semibold tracking-wide text-accent-text">Case study · {data.industry}</span>
                <span className="text-sm text-text-secondary dark:text-white/55">{data.year}</span>
                <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary dark:text-white/55">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {readingMinutes} min read
                </span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-text-primary dark:text-white mb-6">
                {data.client}
              </h1>

              <p className="text-lg md:text-xl text-text-secondary dark:text-white/65 leading-relaxed mb-8">
                {data.description}
              </p>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 py-6 border-y border-black/10 dark:border-white/10">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-[11px] font-semibold tracking-wide text-text-secondary dark:text-white/50 mb-1">
                      {f.label}
                    </dt>
                    <dd className="text-[15px] text-text-primary dark:text-white leading-snug">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </header>

            {data.image && (
              <motion.figure
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="max-w-[60rem] mt-12 mb-14"
              >
                <div className="aspect-[16/10] rounded-card overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
                  <OptimizedImage
                    src={data.image}
                    alt={`Home page of the ${data.client} website built by Castells Media`}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    width={1600}
                    height={1000}
                    sizes="(min-width: 1024px) 960px, 100vw"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-text-secondary dark:text-white/55">
                  The site we built for {data.client}
                  {data.website && <>, live at {hostOf(data.website)}</>}.
                </figcaption>
              </motion.figure>
            )}

            <div className={`max-w-[43rem] ${data.image ? '' : 'mt-12'}`}>
              {results.length > 0 && (
                <motion.section {...reveal} aria-labelledby="results" className="mb-12">
                  <h2 id="results" className="font-display text-xl md:text-2xl font-semibold text-text-primary dark:text-white mb-6">
                    Results
                  </h2>
                  <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x divide-black/10 dark:divide-white/10">
                    {results.map((r) => (
                      <div key={r.label} className="flex flex-col sm:px-6 first:sm:pl-0">
                        <dt className="order-2 text-sm text-text-secondary dark:text-white/60">{r.label}</dt>
                        <dd className="order-1 font-display text-4xl text-text-primary dark:text-white mb-2">{r.value}</dd>
                        {r.growth && <dd className="order-3 text-sm font-semibold text-accent-text mt-1">{r.growth}</dd>}
                      </div>
                    ))}
                  </dl>
                </motion.section>
              )}

              {data.challenge && (
                <motion.section {...reveal} aria-labelledby="challenge" className="mb-10">
                  <h2 id="challenge" className="font-display text-xl md:text-2xl font-semibold text-text-primary dark:text-white mb-4">
                    The challenge
                  </h2>
                  <p className="text-text-secondary dark:text-white/75 text-[17px] md:text-lg leading-[1.65]">
                    {data.challenge}
                  </p>
                </motion.section>
              )}

              {data.solution && (
                <motion.section {...reveal} aria-labelledby="solution" className="mb-10">
                  <h2 id="solution" className="font-display text-xl md:text-2xl font-semibold text-text-primary dark:text-white mb-4">
                    What we did
                  </h2>
                  <p className="text-text-secondary dark:text-white/75 text-[17px] md:text-lg leading-[1.65]">
                    {data.solution}
                  </p>
                </motion.section>
              )}

              {data.keyFeatures && data.keyFeatures.length > 0 && (
                <motion.section {...reveal} aria-labelledby="delivered" className="mb-12">
                  <h2 id="delivered" className="font-display text-xl md:text-2xl font-semibold text-text-primary dark:text-white mb-4">
                    What we delivered
                  </h2>
                  <ul className="border-t border-black/10 dark:border-white/10">
                    {data.keyFeatures.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 py-3.5 border-b border-black/10 dark:border-white/10 text-[17px] text-text-primary dark:text-white"
                      >
                        <Check className="w-5 h-5 mt-0.5 shrink-0 text-accent-text" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.section>
              )}

              {data.testimonial && (
                <motion.figure {...reveal} className="my-14 border-l-2 border-accent pl-6 md:pl-8">
                  <blockquote className="font-display text-xl md:text-2xl leading-[1.5] text-text-primary dark:text-white mb-5">
                    <p>“{data.testimonial.quote}”</p>
                  </blockquote>
                  <figcaption className="text-sm text-text-secondary dark:text-white/60">
                    <span className="font-semibold text-text-primary dark:text-white">{data.testimonial.author}</span>
                    , {data.testimonial.role}
                  </figcaption>
                </motion.figure>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-t border-black/10 dark:border-white/10 pt-8">
                <p className="text-text-secondary dark:text-white/60 leading-relaxed">
                  Want the same for your business? Write to us, we answer plainly.
                </p>
                <a
                  href="/contact"
                  onClick={appLink(() => onNavigate('contact'))}
                  className="inline-flex items-center gap-2 self-start sm:self-auto shrink-0 px-6 py-3 rounded-button bg-black text-white dark:bg-white dark:text-black font-medium text-[15px] hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Talk to us
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>

          {others.length > 0 && (
            <section aria-labelledby="more-work" className="max-w-[43rem] mt-16">
              <h2 id="more-work" className="font-display text-xl md:text-2xl font-normal text-text-primary dark:text-white mb-6">
                More work
              </h2>
              <ul className="flex flex-col gap-3">
                {others.map((other) => (
                  <li key={other.id}>
                    <a
                      href={buildCaseStudyPath(other.id)}
                      onClick={appLink(() => onNavigate('case-study', { id: other.id }))}
                      className="group flex items-start justify-between gap-6 bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-5 md:p-6 hover:border-black/20 dark:hover:border-white/30 transition-colors"
                    >
                      <span>
                        <span className="block text-[11px] font-semibold tracking-wide text-text-secondary dark:text-white/50 mb-1.5">
                          {other.industry}
                        </span>
                        <span className="block font-display text-lg md:text-xl text-text-primary dark:text-white mb-1">
                          {other.client}
                        </span>
                        <span className="block text-sm text-text-secondary dark:text-white/60 leading-relaxed">
                          {other.description}
                        </span>
                      </span>
                      <ArrowRight
                        className="w-4 h-4 mt-1.5 shrink-0 text-text-secondary group-hover:text-text-primary dark:group-hover:text-white transition-colors"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default CaseStudyDetail;
