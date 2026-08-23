import React from 'react';
import { m as motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { BLOG_POSTS, findPostById } from '../../data/blog';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';

/*
  Страница статьи, переписана 23 августа 2026 вместе со списком.

  Что было: содержимое девяти шаблонных статей лежало прямо в этом файле,
  отдельно от списка в BlogPage — то есть один и тот же материал жил в двух
  местах и мог разъехаться. Плюс фотографии со стока и подписи выдуманных
  авторов вроде «Sarah Martinez, Head of Strategy».

  Теперь и список, и текст берутся из data/blog.ts.
*/

interface BlogPostDetailProps {
  onBack: () => void;
  onNavigate?: (page: PageView, data?: NavigationData) => void;
  postId?: number;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ onBack, onNavigate, postId = 1 }) => {
  const post = findPostById(Number(postId)) ?? BLOG_POSTS[0];
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.castells.media';
  const others = BLOG_POSTS.filter((p) => p.id !== post.id);

  return (
    <>
      <SEO
        title={`${post.title} | Castells Media`}
        description={post.excerpt}
        canonical={`/blog/${post.id}`}
        summary={post.excerpt}
        mainEntity="Article"
      />
      <SchemaMarkup
        type="Article"
        data={{
          headline: post.title,
          description: post.excerpt,
          author: { '@type': 'Person', name: post.author },
          datePublished: post.date,
          publisher: { '@type': 'Organization', name: 'Castells Media', url: siteUrl },
        }}
      />

      <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
        <div className="container mx-auto px-6 pt-4 md:pt-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-text-secondary dark:text-white/60 hover:text-text-primary dark:hover:text-white transition-colors mb-10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All notes
          </button>

          <article className="max-w-[43rem]">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
              <span className="text-[11px] font-semibold tracking-wide text-accent-text">
                {post.category}
              </span>
              <span className="text-sm text-text-secondary dark:text-white/55">{post.date}</span>
              <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary dark:text-white/55">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                {post.readingMinutes} min read
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-text-primary dark:text-white mb-6">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-text-secondary dark:text-white/65 leading-relaxed mb-6">
              {post.excerpt}
            </p>

            <p className="text-sm text-text-secondary dark:text-white/50 pb-8 mb-10 border-b border-black/5 dark:border-white/10">
              {post.author}, {post.authorRole}
            </p>

            {post.sections.map((section, index) => (
              <motion.section
                key={section.heading}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, delay: Math.min(index, 3) * 0.04 }}
                className="mb-10"
              >
                <h2 className="font-display text-xl md:text-2xl font-semibold text-text-primary dark:text-white mb-4">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-text-secondary dark:text-white/75 text-[17px] md:text-lg leading-[1.65] mb-5"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.section>
            ))}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-t border-black/5 dark:border-white/10 pt-8">
              <p className="text-text-secondary dark:text-white/60 leading-relaxed">
                Questions about your own situation? Write to us, we answer plainly.
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
          </article>

          {others.length > 0 && (
            <section className="max-w-[43rem] mt-16">
              <h2 className="font-display text-xl md:text-2xl font-normal text-text-primary dark:text-white mb-6">
                Read next
              </h2>
              <div className="flex flex-col gap-3">
                {others.map((other) => (
                  <button
                    key={other.id}
                    type="button"
                    onClick={() => onNavigate?.('blog-post', { id: other.id })}
                    className="group text-left flex items-start justify-between gap-6 bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-card p-5 md:p-6 hover:border-black/20 dark:hover:border-white/30 transition-colors cursor-pointer"
                  >
                    <span>
                      <span className="block font-display text-lg md:text-xl text-text-primary dark:text-white mb-1">
                        {other.title}
                      </span>
                      <span className="block text-sm text-text-secondary dark:text-white/60">
                        {other.excerpt}
                      </span>
                    </span>
                    <ArrowRight
                      className="w-4 h-4 mt-1.5 shrink-0 text-text-secondary group-hover:text-text-primary dark:group-hover:text-white transition-colors"
                      aria-hidden="true"
                    />
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

export default BlogPostDetail;
