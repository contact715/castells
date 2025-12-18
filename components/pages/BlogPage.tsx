import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { type Variants } from 'framer-motion';
import { PageView } from '../../App';
import { PageHeader } from '../ui/PageHeader';
import { TimelineContent } from '../ui/TimelineContent';

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

interface BlogPageProps {
    onBack?: () => void;
    onNavigate?: (page: PageView) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onBack, onNavigate }) => {
    const timelineRef = useRef<HTMLDivElement>(null);

    const revealVariants: Variants = {
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as any,
            },
        }),
        hidden: {
            filter: "blur(10px)",
            y: 30,
            opacity: 0,
        },
    };

    return (
        <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-32 pb-20" ref={timelineRef}>
            <div className="container mx-auto px-6">
                {/* Header */}
                <PageHeader
                    breadcrumbs={[
                        { label: 'Home', action: () => onNavigate?.('home') },
                        { label: 'Blog & Insights', active: true },
                    ]}
                    badge="Blog & Insights"
                    title="Latest Insights."
                    description="Industry trends, case studies, and growth strategies."
                    onNavigate={onNavigate}
                />

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {BLOG_POSTS.map((post, index) => (
                        <TimelineContent
                            key={post.id}
                            as="a"
                            href="#"
                            animationNum={index}
                            timelineRef={timelineRef}
                            customVariants={revealVariants}
                            className="group flex gap-4 p-4 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black dark:hover:bg-white/10 hover:border-black dark:hover:border-white/20 transition-all duration-300"
                        >
                            {/* Small Image */}
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-center flex-1 min-w-0">
                                <span className="text-xs text-text-secondary dark:text-white/60 group-hover:text-white/50 dark:group-hover:text-white/70 mb-1 transition-colors">
                                    {post.date}
                                </span>
                                <h3 className="font-display text-sm md:text-base font-semibold text-text-primary dark:text-white group-hover:text-white dark:group-hover:text-white mb-2 leading-snug transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <div className="flex items-center gap-1 text-xs font-medium text-text-secondary dark:text-white/60 group-hover:text-white dark:group-hover:text-white transition-colors">
                                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                    <span>Read More</span>
                                </div>
                            </div>
                        </TimelineContent>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
