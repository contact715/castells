import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

interface Insight {
    id: number;
    title: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    desc: string;
}

const INSIGHTS: Insight[] = [
    {
        id: 1,
        title: "The Death of Generic Targeting: Why Hyper-Local Wins in 2025",
        category: "Strategy",
        date: "Mar 12, 2025",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        desc: "Broad audiences are expensive. We break down the mathematics of geo-fencing and intent-based layering."
    },
    {
        id: 2,
        title: "AI Agents vs. Human Support: The Hybrid Model",
        category: "Automation",
        date: "Mar 08, 2025",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=80",
        desc: "How to implement AI customer service without losing the human touch. A case study on response times."
    },
    {
        id: 3,
        title: "The $50M Blueprint: Scaling from Local to Regional",
        category: "Growth",
        date: "Feb 28, 2025",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
        desc: "The exact operational and marketing playbook used to expand a home service business into 3 new states."
    },
    {
        id: 4,
        title: "SEO in the Age of Generative AI Search",
        category: "SEO",
        date: "Feb 15, 2025",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
        desc: "Google SGE is changing the game. Here is how to structure your content to survive and thrive in the new era."
    }
];

const InsightsList: React.FC = () => {
    const [activeId, setActiveId] = useState<number>(1);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left Column: The List */}
            <div className="flex flex-col">
                {INSIGHTS.map((insight) => (
                    <div
                        key={insight.id}
                        onMouseEnter={() => setActiveId(insight.id)}
                        className="group relative border-b border-black/10 dark:border-white/10 py-8 cursor-pointer transition-all duration-300 hover:pl-4"
                    >
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-text-secondary mb-3">
                            <span className={cn("transition-colors duration-300", activeId === insight.id ? "text-coral" : "")}>
                                {insight.category}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20" />
                            <span>{insight.date}</span>
                        </div>

                        <h3 className={cn(
                            "font-display text-2xl md:text-3xl font-bold mb-3 transition-colors duration-300",
                            activeId === insight.id ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
                        )}>
                            {insight.title}
                        </h3>

                        <p className="text-text-secondary text-sm leading-relaxed max-w-md line-clamp-2 mb-4 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300 overflow-hidden">
                            {insight.desc}
                        </p>

                        <div className={cn(
                            "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300",
                            activeId === insight.id ? "text-coral translate-x-0 opacity-100" : "text-text-primary -translate-x-4 opacity-0"
                        )}>
                            Read Article <ArrowUpRight className="w-3 h-3" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Column: Sticky Preview */}
            <div className="hidden lg:block relative h-[500px] sticky top-24">
                <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl border border-black/5">
                    <AnimatePresence mode="wait">
                        {INSIGHTS.map((insight) => (
                            activeId === insight.id && (
                                <motion.div
                                    key={insight.id}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={insight.image}
                                        alt={insight.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/20" />

                                    {/* Floating Badge */}
                                    <div className="absolute bottom-8 left-8 bg-white/90 dark:bg-black/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 shadow-lg">
                                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-text-secondary mb-1">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {insight.readTime}</span>
                                            <span className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20" />
                                            <span>By Dmitrii Z.</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>
                </div>
            </div>

        </div>
    );
};

export default InsightsList;
