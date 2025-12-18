import React, { useState, useRef } from 'react';
import { AnimatePresence, type Variants } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Section, SectionContainer } from '../ui/Section';
import { PageHeader } from '../ui/PageHeader';
import { TimelineContent } from '../ui/TimelineContent';
import { CASE_STUDIES, WORK_CATEGORIES } from '../../constants';
import { cn } from '../../lib/utils';
import { PageView } from '../../App';

interface WorkPageProps {
    onBack: () => void;
    onNavigate: (page: PageView, data?: any) => void;
}

const WorkPage: React.FC<WorkPageProps> = ({ onBack, onNavigate }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const timelineRef = useRef<HTMLDivElement>(null);

    const filteredProjects = activeCategory === 'all'
        ? CASE_STUDIES
        : CASE_STUDIES.filter(p => p.category === activeCategory);

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
        <div className="bg-ivory dark:bg-[#191919] min-h-screen pt-32 pb-20" ref={timelineRef}>
            <SectionContainer>

                {/* Header & Navigation */}
                <PageHeader
                    breadcrumbs={[
                        { label: 'Home', action: () => onNavigate('home') },
                        { label: 'Work', active: true }
                    ]}
                    badge="Our Portfolio"
                    title="Selected Works"
                    description="A curated collection of our most impactful campaigns and digital products."
                    onNavigate={onNavigate}
                />

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-16 justify-center">
                    {WORK_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                "px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 border",
                                activeCategory === cat.id
                                    ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                                    : "bg-transparent text-text-secondary border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <TimelineContent
                                key={project.id}
                                as="div"
                                animationNum={index}
                                timelineRef={timelineRef}
                                customVariants={revealVariants}
                                className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden cursor-pointer"
                                onClick={() => onNavigate('case-study', project)}
                            >
                                    {/* Background Media */}
                                    <div className="absolute inset-0 bg-black">
                                        {project.video ? (
                                            <video
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                poster={project.image}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
                                            >
                                                <source src={project.video} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <img
                                                src={project.image}
                                                alt={project.client}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                                    </div>

                                    {/* Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <span className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest">
                                                {project.industry}
                                            </span>
                                            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-display text-3xl md:text-4xl text-white mb-2">{project.client}</h3>
                                            <div className="flex gap-4 text-white/80">
                                                <div>
                                                    <span className="block text-2xl font-bold text-white">{project.metric}</span>
                                                    <span className="text-[10px] uppercase tracking-wider opacity-70">{project.metricLabel}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </TimelineContent>
                        ))}
                    </AnimatePresence>
                </div>

            </SectionContainer>
        </div>
    );
};

export default WorkPage;
