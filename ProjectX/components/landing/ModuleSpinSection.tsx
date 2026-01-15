"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollText } from "../ui/ScrollText";
import { LucideIcon } from "lucide-react";

interface ModuleSpinSectionProps {
    moduleName: string;
    moduleIcon: LucideIcon;
    situation: string;
    problem: string;
    implication: string;
    needPayoff: string;
    accentColor?: string;
    index: number;
    children?: ReactNode;
}

/**
 * ModuleSpinSection Component
 * A full-screen sticky section that presents a module using SPIN selling methodology.
 * Content reveals progressively as the user scrolls through.
 */
export const ModuleSpinSection: React.FC<ModuleSpinSectionProps> = ({
    moduleName,
    moduleIcon: Icon,
    situation,
    problem,
    implication,
    needPayoff,
    accentColor = "#FF6B35",
    index,
    children,
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    // Progress transforms for each SPIN phase
    const situationOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
    const problemOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
    const implicationOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
    const needPayoffOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
    const ctaOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);

    // Scale and blur for dramatic entry
    const moduleScale = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);
    const headerY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[400vh]"
            style={{ zIndex: 10 + index }}
        >
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
                {/* Background Glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: accentColor }}
                />

                {/* Content */}
                <motion.div
                    className="max-w-4xl mx-auto px-6 text-center"
                    style={{ scale: moduleScale }}
                >
                    {/* Module Badge */}
                    <motion.div
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-card border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
                        style={{ opacity: situationOpacity, y: headerY }}
                    >
                        <Icon className="w-5 h-5" style={{ color: accentColor }} />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                            {moduleName}
                        </span>
                    </motion.div>

                    {/* SPIN Content */}
                    <div className="space-y-12">
                        {/* Situation */}
                        <motion.div style={{ opacity: situationOpacity }}>
                            <p className="text-white/50 text-sm uppercase tracking-[0.2em] mb-3">Ситуация</p>
                            <ScrollText
                                text={situation}
                                textClassName="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-white/90 leading-tight justify-center"
                                startOffset={0.8}
                                endOffset={0.6}
                                enableBlur={true}
                            />
                        </motion.div>

                        {/* Problem */}
                        <motion.div style={{ opacity: problemOpacity }}>
                            <p className="text-red-400/70 text-sm uppercase tracking-[0.2em] mb-3">Проблема</p>
                            <ScrollText
                                text={problem}
                                textClassName="text-xl md:text-2xl lg:text-3xl font-display font-medium text-red-400 leading-tight justify-center"
                                startOffset={0.7}
                                endOffset={0.5}
                                enableBlur={true}
                            />
                        </motion.div>

                        {/* Implication */}
                        <motion.div style={{ opacity: implicationOpacity }}>
                            <p className="text-orange-400/70 text-sm uppercase tracking-[0.2em] mb-3">Последствия</p>
                            <ScrollText
                                text={implication}
                                textClassName="text-lg md:text-xl lg:text-2xl font-sans text-orange-300/80 leading-relaxed justify-center"
                                startOffset={0.6}
                                endOffset={0.4}
                                enableBlur={true}
                            />
                        </motion.div>

                        {/* Need-Payoff */}
                        <motion.div style={{ opacity: needPayoffOpacity }}>
                            <p className="text-emerald-400/70 text-sm uppercase tracking-[0.2em] mb-3">Решение</p>
                            <ScrollText
                                text={needPayoff}
                                textClassName="text-2xl md:text-3xl lg:text-4xl font-display font-bold leading-tight justify-center"
                                startOffset={0.5}
                                endOffset={0.3}
                                enableBlur={true}
                            />
                            <div
                                className="mt-4 h-1 w-24 mx-auto rounded-full"
                                style={{ backgroundColor: accentColor }}
                            />
                        </motion.div>

                        {/* CTA or Additional Content */}
                        <motion.div style={{ opacity: ctaOpacity }}>
                            {children}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ModuleSpinSection;
