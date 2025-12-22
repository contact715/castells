import React from 'react';
import { ArrowRight } from 'lucide-react';
import { m as motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { CASE_STUDIES, CaseStudy } from '../../constants';
import type { NavigateFn } from '../../types';

interface CasesGridProps {
    onNavigate?: NavigateFn;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as const,
        }
    },
};

// Staggered offsets for the masonry-like effect
const staggerOffsets = [0, 60, 20, 80];

const CasesGrid: React.FC<CasesGridProps> = ({ onNavigate }) => {
    // Take first 9 case studies
    const cases = CASE_STUDIES.slice(0, 9);

    return (
        <section id="cases" className="pt-12 md:pt-16 pb-24 md:pb-32 bg-ivory dark:bg-black">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                                Case Studies
                            </span>
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary dark:text-white leading-tight tracking-tight">
                            Real results that drive<br />
                            <span className="text-text-secondary">business growth.</span>
                        </h2>
                    </div>

                    <Button
                        onClick={() => onNavigate?.('work')}
                        size="sm"
                        className="self-start lg:self-end"
                    >
                        View All Cases
                    </Button>
                </div>

                {/* Staggered Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {cases.map((caseItem, idx) => (
                        <motion.div
                            key={caseItem.id}
                            variants={cardVariants}
                            style={{ marginTop: idx > 0 ? `${staggerOffsets[idx]}px` : 0 }}
                            className="hidden lg:block"
                        >
                            <CaseCard
                                caseItem={caseItem}
                                onClick={() => onNavigate?.('case-study', { id: caseItem.id, name: caseItem.client })}
                            />
                        </motion.div>
                    ))}

                    {/* Mobile: No stagger */}
                    {cases.map((caseItem, idx) => (
                        <motion.div
                            key={`mobile-${caseItem.id}`}
                            variants={cardVariants}
                            className="lg:hidden"
                        >
                            <CaseCard
                                caseItem={caseItem}
                                onClick={() => onNavigate?.('case-study', { id: caseItem.id, name: caseItem.client })}
                            />
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

interface CaseCardProps {
    caseItem: CaseStudy;
    onClick: () => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseItem, onClick }) => {
    return (
        <a
            href={`/case-studies/${encodeURIComponent(caseItem.id)}`}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className="group cursor-pointer block"
        >
            {/* Image */}
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-4">
                <img
                    src={caseItem.image}
                    alt={caseItem.client}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                    style={{ transform: 'translateZ(0)' }}
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]" />
            </div>

            {/* Content */}
            <div>
                {/* Date / Industry */}
                <span className="text-xs text-text-secondary dark:text-white/50 mb-2 block">
                    {caseItem.year} · {caseItem.industry}
                </span>

                {/* Title */}
                <h3 className="font-display text-lg md:text-xl font-semibold text-text-primary dark:text-white mb-3 leading-snug group-hover:text-coral transition-colors">
                    {caseItem.client} — {caseItem.description?.slice(0, 60)}...
                </h3>

                {/* View Link */}
                <div className="flex items-center gap-2 text-sm font-medium text-text-secondary dark:text-white/60 group-hover:text-coral transition-colors">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    <span>View Case</span>
                </div>
            </div>
        </a>
    );
};

export default CasesGrid;
