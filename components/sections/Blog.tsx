import React from 'react';
import { ArrowRight } from 'lucide-react';
import { m as motion } from 'framer-motion';
import { RippleButton } from '../ui/RippleButton';

interface BlogPost {
    id: number;
    title: string;
    date: string;
    image: string;
}

const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: "The Death of Generic Targeting: Why Hyper-Local Wins in 2025",
        date: "Oct 13, 2025",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
    },
    {
        id: 2,
        title: "AI Agents vs. Human Support: The Hybrid Model",
        date: "Aug 2, 2025",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80"
    },
    {
        id: 3,
        title: "Behind every pixel lies purpose passion and powerful brand",
        date: "Aug 6, 2025",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
    },
    {
        id: 4,
        title: "Creative ideas smart solutions and insights to shape the future",
        date: "Aug 27, 2025",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
    },
];

// Staggered vertical offsets for masonry effect - smaller values for compact layout
const staggerOffsets = [0, 40, 20, 60];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        }
    },
};

const Blog: React.FC = () => {
    return (
        <section id="blog" className="py-20 bg-ivory dark:bg-black border-t border-black/5 dark:border-white/5">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                                Blogs & Insights
                            </span>
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary dark:text-white leading-tight tracking-tight">
                            Latest insights and<br />
                            <span className="text-text-secondary">industry trends</span>
                        </h2>
                    </div>

                    <RippleButton
                        href="#"
                        className="bg-black dark:bg-white text-white dark:text-black rounded-xl px-6 py-3 font-bold text-sm uppercase tracking-widest self-start lg:self-end"
                    >
                        View All
                    </RippleButton>
                </div>

                {/* Grid - 2x2 layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    {BLOG_POSTS.map((post) => (
                        <motion.a
                            key={post.id}
                            href="#"
                            variants={cardVariants}
                            className="group flex gap-4 p-4 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black hover:border-black transition-all duration-300"
                        >
                            {/* Small Image */}
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-center flex-1 min-w-0">
                                <span className="text-xs text-text-secondary group-hover:text-white/50 mb-1 transition-colors">
                                    {post.date}
                                </span>
                                <h3 className="font-display text-sm md:text-base font-medium text-text-primary group-hover:text-white mb-2 leading-snug transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <div className="flex items-center gap-1 text-xs font-medium text-text-secondary group-hover:text-white transition-colors">
                                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                    <span>Read More</span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Blog;

