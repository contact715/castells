import React, { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

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
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
        desc: "Broad audiences are expensive. We break down the mathematics of geo-fencing and intent-based layering."
    },
    {
        id: 2,
        title: "AI Agents vs. Human Support: The Hybrid Model",
        category: "Automation",
        date: "Mar 08, 2025",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=80",
        desc: "How to implement AI customer service without losing the human touch."
    },
    {
        id: 3,
        title: "The $50M Blueprint: Scaling from Local to Regional",
        category: "Growth",
        date: "Feb 28, 2025",
        readTime: "12 min",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
        desc: "The exact operational and marketing playbook used to expand a home service business."
    },
    {
        id: 4,
        title: "SEO in the Age of Generative AI Search",
        category: "SEO",
        date: "Feb 15, 2025",
        readTime: "6 min",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
        desc: "Google SGE is changing the game. Here is how to structure your content."
    },
];

const InsightsList: React.FC = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <div className="space-y-4">
            {INSIGHTS.map((insight, idx) => (
                <motion.div
                    key={insight.id}
                    onMouseEnter={() => setHoveredId(insight.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="group cursor-pointer"
                >
                    <div className={`flex flex-col md:flex-row gap-6 p-6 rounded-2xl transition-all duration-300 ${hoveredId === insight.id ? 'bg-black' : 'bg-white border border-black/5'
                        }`}>
                        {/* Image */}
                        <div className="w-full md:w-48 h-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                                src={insight.image}
                                alt={insight.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-center">
                            {/* Meta */}
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${hoveredId === insight.id ? 'text-coral' : 'text-coral'
                                    }`}>
                                    {insight.category}
                                </span>
                                <span className={`text-xs transition-colors ${hoveredId === insight.id ? 'text-white/50' : 'text-text-secondary'
                                    }`}>
                                    {insight.date}
                                </span>
                                <span className={`flex items-center gap-1 text-xs transition-colors ${hoveredId === insight.id ? 'text-white/50' : 'text-text-secondary'
                                    }`}>
                                    <Clock className="w-3 h-3" />
                                    {insight.readTime}
                                </span>
                            </div>

                            {/* Title */}
                            <h[1-4] className={`font-display text-xl md:text-2xl font-bold leading-tight mb-2 transition-colors ${hoveredId === insight.id ? 'text-white' : 'text-text-primary'
                                }`}>
                                {insight.title}
                            </h3>

                            {/* Description */}
                            <p className={`text-sm leading-relaxed line-clamp-2 transition-colors ${hoveredId === insight.id ? 'text-white/60' : 'text-text-secondary'
                                }`}>
                                {insight.desc}
                            </p>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${hoveredId === insight.id
                                ? 'bg-white text-black'
                                : 'bg-black/5 text-text-secondary'
                                }`}>
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* View All Button */}
            <div className="pt-8 flex justify-center">
                <Button size="lg" className="inline-flex items-center gap-3 group">
                    View All Articles
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </div>
    );
};

export default InsightsList;
