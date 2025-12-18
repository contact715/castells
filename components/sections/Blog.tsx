import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, TrendingUp, Users, Palette, ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { PageView } from '../../App';
import { NavigationData } from '../../types';
import AnimatedHeading from '../ui/AnimatedHeading';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    image: string;
}

const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "The Death of Generic Targeting: Why Hyper-Local Wins",
        excerpt: "Generic campaigns are bleeding money. Here's the data-backed framework we use to dominate local markets.",
        date: "Oct 13, 2025",
        readTime: "8 min",
        category: "Marketing",
        icon: TrendingUp,
        color: "from-coral/20 to-orange-500/10",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
        id: 2,
        title: "AI Agents vs. Human Support: The Hybrid Model",
        excerpt: "The real answer isn't AI or humans—it's knowing when to use each for maximum efficiency.",
        date: "Aug 2, 2025",
        readTime: "5 min",
        category: "AI",
        icon: Users,
        color: "from-blue-500/20 to-cyan-500/10",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
    },
    {
        id: 3,
        title: "Behind Every Pixel Lies Purpose and Powerful Brand",
        excerpt: "How intentional design decisions drive 3x conversion rates for our clients.",
        date: "Aug 6, 2025",
        readTime: "6 min",
        category: "Design",
        icon: Palette,
        color: "from-purple-500/20 to-pink-500/10",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"
    },
    {
        id: 4,
        title: "Smart Solutions and Insights to Shape the Future",
        excerpt: "The intersection of creativity and data-driven marketing that wins.",
        date: "Aug 27, 2025",
        readTime: "4 min",
        category: "Coding",
        icon: Code,
        color: "from-green-500/20 to-emerald-500/10",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
    },
    {
        id: 5,
        title: "Scaling Paid Ads: From $10K to $100K Monthly Spend",
        excerpt: "The proven framework for scaling ad budgets without killing ROAS.",
        date: "Sep 15, 2025",
        readTime: "7 min",
        category: "Growth",
        icon: TrendingUp,
        color: "from-amber-500/20 to-yellow-500/10",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
];

interface BlogProps {
    onNavigate?: (page: PageView, data?: NavigationData) => void;
}

const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section id="blog" className="py-24 md:py-32 bg-ivory dark:bg-[#191919] border-t border-black/5 dark:border-white/5 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <Badge className="mb-4">
                            Fresh Insights
                        </Badge>
                        <AnimatedHeading
                            as="h2"
                            className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary leading-tight tracking-tight mb-4"
                            delay={0.1}
                        >
                            From the trenches
                        </AnimatedHeading>
                        <p className="text-lg text-text-secondary leading-relaxed">
                            No theory. No fluff. Just battle-tested strategies that generated $50M+ for our clients.
                        </p>
                    </div>
                    <Button
                        onClick={() => onNavigate?.('blog')}
                        size="md"
                        className="self-start md:self-end shrink-0"
                    >
                        All Articles
                    </Button>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {BLOG_POSTS.map((post, index) => {
                        const Icon = post.icon;
                        const isHovered = hoveredId === post.id;
                        const isFirst = index === 0;
                        
                        return (
                            <motion.a
                                key={post.id}
                                href={`/blog/${post.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate?.('blog-post', { id: post.id });
                                }}
                                onMouseEnter={() => setHoveredId(post.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`
                                    group relative bg-surface rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 
                                    hover:border-coral/30 transition-all duration-500 cursor-pointer
                                    ${isFirst ? 'md:col-span-2 md:row-span-2' : ''}
                                `}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img 
                                        src={post.image} 
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                </div>
                                
                                {/* Gradient Overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                                <div className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                                
                                {/* Content */}
                                <div className={`relative h-full flex flex-col ${isFirst ? 'p-8 md:p-10' : 'p-6'}`}>
                                    {/* Top Row */}
                                    <div className="flex items-start justify-between mb-auto">
                                        <motion.div 
                                            className={`
                                                rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center 
                                                group-hover:bg-coral transition-colors duration-300
                                                ${isFirst ? 'w-16 h-16' : 'w-12 h-12'}
                                            `}
                                            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Icon className={`text-white group-hover:text-white transition-colors ${isFirst ? 'w-8 h-8' : 'w-5 h-5'}`} />
                                        </motion.div>
                                        
                                        <motion.div
                                            animate={isHovered ? { x: 0, opacity: 1 } : { x: 10, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ArrowUpRight className="w-5 h-5 text-white" />
                                        </motion.div>
                                    </div>

                                    {/* Spacer */}
                                    <div className={isFirst ? 'h-16 md:h-24' : 'h-8'} />

                                    {/* Bottom Content */}
                                    <div>
                                        {/* Meta */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs font-bold uppercase tracking-widest text-coral">
                                                {post.category}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-white/50" />
                                            <span className="text-xs text-white/70 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {post.readTime}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className={`
                                            font-display font-semibold text-white leading-snug
                                            group-hover:text-coral transition-colors duration-300
                                            ${isFirst ? 'text-2xl md:text-3xl mb-4' : 'text-base md:text-lg line-clamp-2'}
                                        `}>
                                            {post.title}
                                        </h3>

                                        {/* Excerpt - only for featured */}
                                        {isFirst && (
                                            <p className="text-white/70 leading-relaxed mb-6 line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                        )}

                                        {/* Date */}
                                        <div className={`text-xs text-white/60 ${isFirst ? '' : 'mt-3'}`}>
                                            {post.date}
                                        </div>
                                    </div>

                                    {/* Read More - Featured only */}
                                    {isFirst && (
                                        <motion.div 
                                            className="flex items-center gap-2 text-coral font-bold text-sm uppercase tracking-widest mt-6"
                                            animate={isHovered ? { x: 5 } : { x: 0 }}
                                        >
                                            <span>Read Article</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.div>
                                    )}
                                </div>

                                {/* Decorative Elements - Featured only */}
                                {isFirst && (
                                    <>
                                        <div className="absolute top-0 right-0 w-48 h-48 opacity-10 dark:opacity-20">
                                            <svg viewBox="0 0 200 200" className="w-full h-full">
                                                <circle cx="150" cy="50" r="80" fill="none" stroke="#E08576" strokeWidth="1" />
                                                <circle cx="150" cy="50" r="50" fill="none" stroke="#E08576" strokeWidth="1" />
                                            </svg>
                                        </div>
                                        <motion.div 
                                            className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-coral"
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </>
                                )}
                            </motion.a>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Blog;
