import React from 'react';
import { motion } from 'framer-motion';
import { Code, TrendingUp, Users, Palette } from 'lucide-react';
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
    return (
        <section id="blog" className="pt-12 md:pt-16 pb-24 md:pb-32 bg-ivory dark:bg-[#191919] overflow-hidden">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {BLOG_POSTS.map((post, index) => {
                        const isFirst = index === 0;
                        
                        return (
                            <motion.a
                                key={post.id}
                                href={`/blog/${post.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate?.('blog-post', { id: post.id });
                                }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`
                                    group relative bg-surface rounded-[2rem] overflow-hidden  -black/5 dark:-white/5 
                                    hover:-coral/30 transition-all duration-500 cursor-pointer
                                    ${isFirst ? 'min-h-[300px] md:col-span-2 md:row-span-2 md:min-h-0' : 'h-[220px]'}
                                `}
                            >
                                {/* Background Media - Video for featured, Image for others */}
                                <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                                    {isFirst ? (
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            poster={post.image}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                                            style={{ transform: 'translateZ(0)' }}
                                        >
                                            <source src="https://videos.pexels.com/video-files/3044159/3044159-hd_1920_1080_30fps.mp4" type="video/mp4" />
                                        </video>
                                    ) : (
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                                            loading="lazy"
                                            style={{ transform: 'translateZ(0)' }}
                                        />
                                    )}
                                </div>
                                
                                {/* Gradient Overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 rounded-[2rem]" />
                                <div className={`absolute inset-0 bg-gradient-to-br ${post.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-[2rem]`} />
                                
                                {/* Content */}
                                <div className={`relative h-full flex flex-col justify-end ${isFirst ? 'p-6 sm:p-8 md:p-10' : 'p-6'}`}>
                                    <div>
                                        {/* Title */}
                                        <h3 className={`
                                            font-display font-semibold text-white leading-snug mb-3 md:mb-4
                                            group-hover:text-white transition-colors duration-300
                                            ${isFirst ? 'text-xl sm:text-2xl md:text-3xl' : 'text-base md:text-lg line-clamp-2'}
                                        `}>
                                            {post.title}
                                        </h3>

                                        {/* Excerpt - only for featured */}
                                        {isFirst && (
                                            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-3 md:mb-4 line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                        )}

                                        {/* Meta - Date and Category */}
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs text-white/70">
                                                {post.date}
                                            </div>
                                            <div className="text-xs text-white font-medium group-hover:text-white">
                                                {post.category}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Blog;
