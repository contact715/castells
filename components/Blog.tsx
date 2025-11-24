
import React from 'react';
import { ArrowUpRight, Calendar, User, Clock } from 'lucide-react';
import { Highlighter } from './Highlighter';
import { RippleButton } from './RippleButton';
import ScrollFloat from './ScrollFloat';

const FEATURED_POST = {
    id: 1,
    title: "The Death of Generic Targeting: Why Hyper-Local Wins in 2025",
    category: "Strategy",
    date: "Mar 12, 2025",
    author: "Dmitrii Z.",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    desc: "Broad audiences are expensive. We break down the mathematics of geo-fencing and intent-based layering for home service businesses. Discover how we lowered CPA by 40% using this method."
};

const RECENT_POSTS = [
  {
    id: 2,
    title: "AI Agents vs. Human Support: The Hybrid Model",
    category: "Automation",
    date: "Mar 08, 2025",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
  },
  {
    id: 3,
    title: "The $50M Blueprint: Scaling from Local to Regional",
    category: "Growth",
    date: "Feb 28, 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: 4,
    title: "SEO in the Age of Generative AI Search",
    category: "SEO",
    date: "Feb 15, 2025",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
  }
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-32 bg-surface border-t border-black/5 dark:border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
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

        {/* Magazine Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Feature (Left - Spans 7 cols) */}
            <div className="lg:col-span-7 group cursor-pointer h-full">
                <div className="relative rounded-3xl overflow-hidden h-[400px] lg:h-[500px] mb-8 border border-black/5">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                    <img 
                        src={FEATURED_POST.image} 
                        alt={FEATURED_POST.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                    />
                    <div className="absolute top-6 left-6 z-20">
                         <span className="bg-white text-black px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg">
                            Featured
                        </span>
                    </div>
                </div>
                
                <div className="pr-4">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">
                        <span className="text-coral">{FEATURED_POST.category}</span>
                        <span className="w-1 h-1 rounded-full bg-black/20" />
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {FEATURED_POST.date}</span>
                        <span className="w-1 h-1 rounded-full bg-black/20" />
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {FEATURED_POST.readTime}</span>
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight group-hover:text-coral transition-colors">
                        {FEATURED_POST.title}
                    </h3>
                    <p className="text-text-secondary text-lg leading-relaxed mb-6 line-clamp-3">
                        {FEATURED_POST.desc}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-primary border-b border-black/20 pb-1 group-hover:border-coral transition-colors">
                        Read Full Story <ArrowUpRight className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Side List (Right - Spans 5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8 lg:space-y-0">
                {RECENT_POSTS.map((post) => (
                    <article key={post.id} className="group cursor-pointer flex gap-6 items-center p-4 rounded-2xl hover:bg-white dark:hover:bg-white/5 border border-transparent hover:border-black/5 transition-all duration-300">
                         <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden relative">
                             <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                             />
                         </div>
                         <div className="flex-1">
                             <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-2">
                                <span className="text-coral">{post.category}</span>
                                <span>•</span>
                                <span>{post.date}</span>
                             </div>
                             <h4 className="font-display text-xl font-bold text-text-primary leading-snug group-hover:text-coral transition-colors mb-2 line-clamp-2">
                                {post.title}
                             </h4>
                             <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                Read <ArrowUpRight className="w-3 h-3" />
                             </div>
                         </div>
                    </article>
                ))}

                {/* Newsletter Box */}
                <div className="mt-auto bg-black text-white p-8 rounded-3xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-coral rounded-full blur-[60px] opacity-40 pointer-events-none" />
                     <h4 className="font-display text-2xl font-bold mb-2 relative z-10">Stay Ahead</h4>
                     <p className="text-white/60 text-sm mb-6 relative z-10">
                        Join 5,000+ marketers receiving our weekly growth tactics.
                     </p>
                     <div className="flex gap-2 relative z-10">
                        <input 
                            type="email" 
                            placeholder="Email address" 
                            className="bg-white/10 border-white/10 border text-white text-sm px-4 py-3 rounded-xl w-full focus:outline-none focus:border-coral transition-colors"
                        />
                        <button className="bg-white text-black px-4 py-3 rounded-xl font-bold hover:bg-coral hover:text-white transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                        </button>
                     </div>
                </div>
            </div>

        </div>
        
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
