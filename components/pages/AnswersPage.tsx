import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import { ANSWERS } from '../../data/answers';
import { PageView } from '../../App';
import { NavigationData } from '../../types';

/*
  Хаб страниц-ответов, /learn. Нужен для двух вещей: человеку — чтобы видеть
  список вопросов, поиску — чтобы страницы-ответы не висели без входа.
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
        description="Straight answers to the questions home service business owners ask us: whether a website is needed at all, what an agency does every month, and whether a long contract is normal."
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
            description="Written from what we actually do, with our own prices and our own clients inside. No question goes up here unless we have something of our own to say about it."
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
        </div>
      </div>
    </>
  );
};

export default AnswersPage;
