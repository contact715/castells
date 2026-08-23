import React from 'react';
import { m as motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { PageHeader } from '../ui/PageHeader';
import { BLOG_POSTS } from '../../data/blog';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';

/*
  Список статей, переписан 23 августа 2026.

  Что было: девять текстов из шаблона, включая «Legal Tech: How AI Transforms
  Contract Review» и «Global Expansion: Digital Marketing Across Borders» —
  к подрядчику по HVAC отношения не имеющие. Каждая карточка несла картинку
  со стока (девять запросов на чужой домен), подпись выдуманного автора и
  фильтры по категориям, которых при трёх настоящих статьях не нужно.

  Стало: три статьи, написанные на наших же проверяемых фактах — ценах,
  которые опубликованы на /pricing, и на том, как мы работаем. Обложек нет:
  стоковая картинка ничего не добавляет тексту про то, чей аккаунт Google Ads.
*/

const BlogPage: React.FC<{ onNavigate?: (page: PageView, data?: NavigationData) => void }> = React.memo(
  ({ onNavigate }) => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.castells.media';

    return (
      <>
        <SEO
          title="Notes | Castells Media"
          description="Short, plain articles for home service business owners: what marketing costs, who should own your ad accounts, and what to fix before you spend on ads."
          canonical="/blog"
          keywords="marketing for contractors, HVAC marketing advice, who owns Google Ads account, marketing costs"
          summary="Notes from Castells Media for home service business owners: marketing prices explained, ad account ownership, and what to fix before spending on ads."
          mainEntity="Blog"
        />
        <SchemaMarkup
          type="BreadcrumbList"
          data={{
            itemListElement: [
              { name: 'Home', item: `${siteUrl}/` },
              { name: 'Notes', item: `${siteUrl}/blog` },
            ],
          }}
        />

        <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
          <div className="container mx-auto px-6 pt-4 md:pt-6">
            <PageHeader
              breadcrumbs={[
                { label: 'Home', action: () => onNavigate?.('home') },
                { label: 'Notes', active: true },
              ]}
              badge="Notes"
              title="Things worth knowing before you hire anyone"
              description="Short and plain, written from our own work. No trend pieces, no numbers we cannot show you the source for."
              onNavigate={onNavigate}
            />

            <div className="flex flex-col gap-4 md:gap-6">
              {BLOG_POSTS.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: Math.min(index, 3) * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => onNavigate?.('blog-post', { id: post.id })}
                    className="group w-full text-left grid grid-cols-1 lg:grid-cols-[180px_1fr_auto] gap-4 lg:gap-10 items-start bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-6 md:p-8 hover:border-black/20 dark:hover:border-white/30 transition-colors cursor-pointer"
                  >
                    <div className="flex lg:flex-col gap-3 lg:gap-2 items-center lg:items-start">
                      <span className="text-[11px] font-semibold tracking-wide text-coral-text">
                        {post.category}
                      </span>
                      <span className="text-sm text-text-secondary dark:text-white/55">{post.date}</span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary dark:text-white/55">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {post.readingMinutes} min
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-normal text-text-primary dark:text-white leading-snug mb-3">
                        {post.title}
                      </h2>
                      <p className="text-text-secondary dark:text-white/65 text-base leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <p className="text-sm text-text-secondary dark:text-white/50">
                        {post.author}, {post.authorRole}
                      </p>
                    </div>

                    <span
                      className="hidden lg:flex w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 items-center justify-center shrink-0 group-hover:bg-black dark:group-hover:bg-white transition-colors"
                      aria-hidden="true"
                    >
                      <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-white dark:group-hover:text-black transition-colors" />
                    </span>
                  </button>
                </motion.article>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-t border-black/5 dark:border-white/10 pt-8 mt-12">
              <p className="text-text-secondary dark:text-white/60 max-w-xl leading-relaxed">
                Got a question that is not answered here? Ask it directly, we answer the same way we
                write.
              </p>
              <button
                type="button"
                onClick={() => onNavigate?.('contact')}
                className="inline-flex items-center gap-2 self-start sm:self-auto shrink-0 px-6 py-3 rounded-button bg-black text-white dark:bg-white dark:text-black font-medium text-[15px] hover:opacity-90 transition-opacity cursor-pointer"
              >
                Talk to us
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
);

BlogPage.displayName = 'BlogPage';

export default BlogPage;
