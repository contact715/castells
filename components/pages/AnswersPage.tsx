import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import { ANSWERS } from '../../data/answers';
import { BLOG_POSTS } from '../../data/blog';
import { PageView } from '../../App';
import { NavigationData } from '../../types';

/*
  Читальня, /learn. Нужна для двух вещей: человеку — чтобы видеть, что мы
  вообще написали, поиску — чтобы ни один текст не висел без входа.

  Правка 24 августа 2026. Раньше здесь были только ответы на вопросы, а журнал
  жил отдельно на /blog и не был указан ни в шапке, ни в подвале: попасть в
  него можно было только со страницы контактов и из карты сайта. Строка в
  шапке одна, а текстов два рода, поэтому /learn стала общим входом: сверху
  ответы, ниже журнал со ссылкой на полный список.

  Разделение сохранено намеренно. Ответ на вопрос живёт годами и размечен для
  поиска как вопрос с ответом. Запись в журнале привязана к дате и размечена
  как статья. Для читателя это одна полка, для поиска — два разных типа.
*/

interface AnswersPageProps {
  onNavigate: (page: PageView, data?: NavigationData) => void;
}

const AnswersPage: React.FC<AnswersPageProps> = ({ onNavigate }) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.castells.media';

  return (
    <>
      <SEO
        title="Questions we get asked | Castells Media"
        description="Straight answers to the questions home service business owners ask us, plus our journal: whether a website is needed at all, what an agency does every month, and whether a long contract is normal."
        canonical="/learn"
        summary="Answers from Castells Media to common questions from home service business owners about websites, monthly marketing work and agency contracts."
        mainEntity="FAQ"
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { name: 'Home', item: `${siteUrl}/` },
            { name: 'Answers', item: `${siteUrl}/learn` },
          ],
        }}
      />

      <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
        <div className="container mx-auto px-6 pt-4 md:pt-6">
          <PageHeader
            breadcrumbs={[
              { label: 'Home', action: () => onNavigate('home') },
              { label: 'Answers', active: true },
            ]}
            badge="Answers"
            title="Questions we get asked"
            description="Written from what we actually do, with our own prices and our own clients inside. Nothing goes up here unless we have something of our own to say about it."
            onNavigate={onNavigate}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-5xl">
            {ANSWERS.map((a) => (
              <button
                key={a.slug}
                type="button"
                onClick={() => onNavigate('answer', { id: a.slug })}
                className="group text-left bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-7 hover:border-black/20 dark:hover:border-white/30 transition-colors flex flex-col"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="font-display text-lg md:text-xl font-semibold text-text-primary dark:text-white">
                    {a.question}
                  </h2>
                  <ArrowUpRight
                    className="w-4 h-4 shrink-0 mt-1 text-text-secondary dark:text-white/50 group-hover:text-accent-text transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-text-secondary dark:text-white/65 text-base leading-relaxed">
                  {a.short}
                </p>
              </button>
            ))}
          </div>

          {/* Журнал. Отдельный список, потому что запись привязана к дате,
              а ответ выше — нет. Полный список живёт на /blog. */}
          <section className="mt-16 border-t border-black/5 dark:border-white/10 pt-10 max-w-5xl">
            <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
              <div>
                <h2 className="font-display text-xl md:text-2xl font-normal text-text-primary dark:text-white">
                  From the journal
                </h2>
                <p className="text-text-secondary dark:text-white/65 text-base mt-1">
                  What we ran into and what we did about it, with dates.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('blog')}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text hover:opacity-80 transition-opacity"
              >
                All notes
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {[...BLOG_POSTS].reverse().slice(0, 4).map((post) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => onNavigate('blog-post', { id: post.id })}
                  className="group text-left bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-7 hover:border-black/20 dark:hover:border-white/30 transition-colors flex flex-col"
                >
                  <span className="text-[11px] font-semibold tracking-wide text-accent-text mb-2">
                    {post.category} · {post.date}
                  </span>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-display text-lg md:text-xl font-semibold text-text-primary dark:text-white">
                      {post.title}
                    </h3>
                    <ArrowUpRight
                      className="w-4 h-4 shrink-0 mt-1 text-text-secondary dark:text-white/50 group-hover:text-accent-text transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-text-secondary dark:text-white/65 text-base leading-relaxed">
                    {post.excerpt}
                  </p>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AnswersPage;
