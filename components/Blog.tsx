import React from 'react';
import { Highlighter } from './Highlighter';
import { RippleButton } from './RippleButton';
import ScrollFloat from './ScrollFloat';
import InsightsList from './InsightsList';

const Blog: React.FC = () => {
    return (
        <section id="blog" className="py-32 bg-surface border-t border-black/5 dark:border-white/5">
            <div className="container mx-auto px-6">

                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="font-display text-5xl md:text-7xl font-medium mb-6 leading-tight tracking-tight">
                            <ScrollFloat as="span" containerClassName="inline-block mr-3">Latest</ScrollFloat>
                            <Highlighter action="underline" color="#E08576">
                                <span className="italic text-coral">
                                    <ScrollFloat as="span" containerClassName="inline-block">Insights</ScrollFloat>
                                </span>
                            </Highlighter>
                        </h2>
                        <p className="text-xl text-text-secondary font-light">
                            Strategies, data analysis, and market trends from the front lines.
                        </p>
                    </div>
                    <RippleButton href="#" className="hidden md:flex bg-black text-white dark:bg-white dark:text-black rounded-xl px-10 py-3.5 border-none font-bold text-sm uppercase tracking-widest shadow-none hover:shadow-lg">
                        View All Articles
                    </RippleButton>
                </div>

                {/* New Interactive List Layout */}
                <InsightsList />

                <div className="mt-12 md:hidden">
                    <RippleButton href="#" className="w-full bg-black text-white dark:bg-white dark:text-black rounded-xl py-3.5 border-none font-bold text-sm uppercase tracking-widest shadow-none hover:shadow-lg">
                        View All Articles
                    </RippleButton>
                </div>
            </div>
        </section>
    );
};

export default Blog;
