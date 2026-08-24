import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import { findAnswer, ANSWERS } from '../../data/answers';
import { PageView } from '../../App';
import { NavigationData } from '../../types';

/*
  Страница-ответ, /learn/{вопрос}. Создана 24 августа 2026.

  Правило из разбора архитектуры: такая страница появляется, только если внутри
  есть наш собственный проверяемый факт. Поэтому у каждой внизу стоит блок
  «откуда мы это знаем» — живые сайты клиентов, наши опубликованные цены и
  условия. Если факта нет, страницы быть не должно, и пустых здесь нет.

  Темы выбраны так, чтобы не столкнуться с блогом: там уже разобраны цены,
  владение рекламным кабинетом и «телефон замолчал».
*/

interface AnswerPageProps {
  slug?: string;
  onNavigate: (page: PageView, data?: NavigationData) => void;
}

const AnswerPage: React.FC<AnswerPageProps> = ({ slug, onNavigate }) => {
  const answer = findAnswer(slug) || ANSWERS[0];
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.castells.media';
  const другие = ANSWERS.filter((a) => a.slug !== answer.slug);

  return (
    <>
      <SEO
        title={`${answer.question} | Castells Media`}
        description={answer.short}
        canonical={`/learn/${answer.slug}`}
        summary={answer.short}
        mainEntity="Question"
      />
      {/*
        Разметка вопроса и ответа: поиск показывает такие страницы развёрнутым
        блоком, если ответ действительно есть на странице. Ответ здесь настоящий,
        а не приманка.
      */}
      <SchemaMarkup
        type="FAQPage"
        data={{
          mainEntity: [
            {
              '@type': 'Question',
              name: answer.question,
              acceptedAnswer: { '@type': 'Answer', text: answer.short },
            },
          ],
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { name: 'Home', item: `${siteUrl}/` },
            { name: 'Answers', item: `${siteUrl}/learn` },
            { name: answer.question, item: `${siteUrl}/learn/${answer.slug}` },
          ],
        }}
      />

      <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
        <div className="container mx-auto px-6 pt-4 md:pt-6">
          <PageHeader
            breadcrumbs={[
              { label: 'Home', action: () => onNavigate('home') },
              { label: 'Answers', action: () => onNavigate('learn') },
              { label: 'Question', active: true },
            ]}
            badge="Answer"
            title={answer.question}
            description={answer.short}
            onNavigate={onNavigate}
          />

          <article className="max-w-3xl">
            {answer.sections.map((section) => (
              <section key={section.heading} className="mb-10">
                <h2 className="font-display text-xl md:text-2xl font-semibold text-text-primary dark:text-white mb-4">
                  {section.heading}
                </h2>
                {section.body.map((абзац) => (
                  <p
                    key={абзац.slice(0, 40)}
                    className="text-text-secondary dark:text-white/70 text-base md:text-[17px] leading-relaxed mb-4"
                  >
                    {абзац}
                  </p>
                ))}
              </section>
            ))}

            {/* Откуда мы это знаем: без этого блока страница бы не создавалась */}
            <aside className="bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-7 mb-12">
              <h2 className="text-[11px] font-semibold tracking-wide text-accent-text mb-3">
                How we know
              </h2>
              <p className="text-text-secondary dark:text-white/70 text-base leading-relaxed">
                {answer.ourEvidence}
              </p>
            </aside>

            <div className="flex flex-col sm:flex-row gap-3 mb-16">
              <button
                type="button"
                onClick={() => onNavigate(answer.next.page)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-button bg-black text-white dark:bg-white dark:text-black font-medium text-[15px] hover:opacity-90 transition-opacity"
              >
                {answer.next.label}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-button border border-black/15 dark:border-white/25 text-text-primary dark:text-white font-medium text-[15px] hover:border-black/40 dark:hover:border-white/50 transition-colors"
              >
                Ask us directly
              </button>
            </div>
          </article>

          {другие.length > 0 && (
            <section className="border-t border-black/5 dark:border-white/10 pt-10">
              <h2 className="font-display text-xl md:text-2xl font-normal text-text-primary dark:text-white mb-6">
                Other questions we get
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {другие.map((a) => (
                  <button
                    key={a.slug}
                    type="button"
                    onClick={() => onNavigate('answer', { id: a.slug })}
                    className="group text-left bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 hover:border-black/20 dark:hover:border-white/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-lg font-semibold text-text-primary dark:text-white">
                        {a.question}
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
          )}
        </div>
      </div>
    </>
  );
};

export default AnswerPage;
