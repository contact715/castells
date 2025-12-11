import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Search, PenTool, Rocket, BarChart3, CheckCircle2, AlertCircle, TrendingUp, Users, Target, Zap, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Highlighter } from './Highlighter';
import ScrollFloat from './ScrollFloat';

// --- Types ---
interface ProcessStep {
    id: string;
    label: string;
    title: string;
    description: string;
    benefits: string[];
    icon: React.ElementType;
    visual: React.ReactNode;
}

// --- Visual Components (Reused) ---
const AuditVisual = () => (
    <div className="w-full h-full bg-surface border border-black/5 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-lg group hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
        <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse group-hover:scale-125 transition-transform duration-300" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary group-hover:text-text-primary transition-colors">System Audit</span>
            </div>
            <span className="text-xs font-mono text-text-secondary">ID: #AUD-2024</span>
        </div>

        <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-text-primary">Ad Spend Leakage</span>
                </div>
                <span className="text-sm font-bold text-red-600">-$4,200/mo</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-900/20 group-hover:translate-x-1 transition-transform duration-300 delay-100">
                <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-medium text-text-primary">Untracked Conversions</span>
                </div>
                <span className="text-sm font-bold text-amber-600">32%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/20 group-hover:translate-x-1 transition-transform duration-300 delay-150">
                <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-text-primary">SEO Foundation</span>
                </div>
                <span className="text-sm font-bold text-green-600">Healthy</span>
            </div>
        </div>

        <div className="mt-auto pt-6">
            <div className="w-full bg-black/5 rounded-full h-2 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "68%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-coral group-hover:brightness-110 transition-all"
                />
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                <span>Analysis Progress</span>
                <span className="group-hover:text-coral transition-colors">68%</span>
            </div>
        </div>
    </div>
);

const StrategyVisual = () => (
    <div className="w-full h-full bg-surface border border-black/5 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-lg group hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
        <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
            <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500 group-hover:rotate-12 transition-transform duration-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary group-hover:text-text-primary transition-colors">ICP Targeting</span>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-ivory rounded-xl border border-black/5 text-center group-hover:border-coral/20 transition-colors duration-300">
                <div className="text-2xl font-display font-bold text-text-primary mb-1 group-hover:text-coral transition-colors">35-55</div>
                <div className="text-[10px] uppercase tracking-widest text-text-secondary">Age Range</div>
            </div>
            <div className="p-4 bg-ivory rounded-xl border border-black/5 text-center group-hover:border-coral/20 transition-colors duration-300">
                <div className="text-2xl font-display font-bold text-text-primary mb-1 group-hover:text-coral transition-colors">$150k+</div>
                <div className="text-[10px] uppercase tracking-widest text-text-secondary">Household Inc.</div>
            </div>
        </div>

        <div className="space-y-3">
            <div className="flex items-center gap-3 group/item">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 font-bold text-xs group-hover:scale-110 transition-transform">1</div>
                <div className="h-px flex-1 bg-black/10 group-hover:bg-blue-200 transition-colors" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary group-hover:text-blue-600 transition-colors">Awareness</span>
            </div>
            <div className="flex items-center gap-3 group/item">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 font-bold text-xs group-hover:scale-110 transition-transform delay-75">2</div>
                <div className="h-px flex-1 bg-black/10 group-hover:bg-blue-200 transition-colors delay-75" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary group-hover:text-blue-600 transition-colors delay-75">Consideration</span>
            </div>
            <div className="flex items-center gap-3 group/item">
                <div className="w-8 h-8 rounded-full bg-coral text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-coral/30 group-hover:scale-110 transition-transform delay-150">3</div>
                <div className="h-px flex-1 bg-coral" />
                <span className="text-xs font-bold uppercase tracking-widest text-coral">Conversion</span>
            </div>
        </div>
    </div>
);

const LaunchVisual = () => (
    <div className="w-full h-full bg-surface border border-black/5 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-lg group hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600 group-hover:h-1.5 transition-all duration-300" />

        <div className="flex items-center justify-between mb-8 mt-2">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse group-hover:shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-shadow" />
                <span className="text-xs font-bold uppercase tracking-widest text-green-600">Campaign Active</span>
            </div>
            <span className="text-xs font-mono text-text-secondary">v2.4.0</span>
        </div>

        <div className="space-y-4">
            <div className="bg-black text-white p-4 rounded-xl shadow-xl transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300" />
                        <span className="text-xs font-bold uppercase tracking-widest">High Intent</span>
                    </div>
                    <span className="text-xs text-white/50">Just now</span>
                </div>
                <div className="text-sm font-medium">New Lead: "Enterprise Plan Inquiry"</div>
            </div>
            <div className="bg-white dark:bg-white/5 border border-black/5 p-4 rounded-xl shadow-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-text-secondary" />
                        <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">Retargeting</span>
                    </div>
                    <span className="text-xs text-text-secondary">2m ago</span>
                </div>
                <div className="text-sm font-medium text-text-secondary">Audience Match: 85%</div>
            </div>
        </div>
    </div>
);

const ScaleVisual = () => (
    <div className="w-full h-full bg-surface border border-black/5 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-lg group hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
        <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
            <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary group-hover:text-text-primary transition-colors">Revenue Growth</span>
            </div>
            <div className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/20 text-green-700 text-[10px] font-bold uppercase tracking-widest group-hover:bg-green-200 transition-colors">
                +124% YoY
            </div>
        </div>

        <div className="flex-1 flex items-end gap-2 px-2 pb-2">
            {[30, 45, 35, 60, 55, 80, 75, 95].map((h, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={cn(
                        "flex-1 rounded-t-sm transition-all duration-300 group-hover:opacity-90",
                        i === 7 ? "bg-coral group-hover:bg-coral/90" : "bg-black/10 dark:bg-white/10 group-hover:bg-black/20"
                    )}
                    style={{ transformOrigin: "bottom" }}
                    whileHover={{ scaleY: 1.1 }}
                />
            ))}
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t border-black/5">
            <div>
                <div className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">CAC</div>
                <div className="text-lg font-bold text-text-primary group-hover:text-coral transition-colors">$42.50</div>
            </div>
            <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">ROAS</div>
                <div className="text-lg font-bold text-green-600 group-hover:scale-110 origin-right transition-transform">4.8x</div>
            </div>
        </div>
    </div>
);

// --- Data ---
const PROCESS_STEPS: ProcessStep[] = [
    {
        id: 'audit',
        label: 'The Audit',
        title: 'We Find The Leaks',
        description: 'Before we build, we diagnose. We tear down your current infrastructure to find exactly where you are losing money.',
        benefits: [
            'Full Account Audit (Ads, SEO, CRM)',
            'Competitor Reconnaissance',
            'Funnel Conversion Analysis',
            'Revenue Leakage Report'
        ],
        icon: Search,
        visual: <AuditVisual />
    },
    {
        id: 'strategy',
        label: 'The Strategy',
        title: 'Precision Engineering',
        description: 'No guesswork. We build a custom roadmap based on data, defining your ideal customer and the exact message that converts them.',
        benefits: [
            'Ideal Customer Profile (ICP) Definition',
            'Offer & Positioning Refinement',
            'Multi-Channel Roadmap',
            'Creative Angle Development'
        ],
        icon: PenTool,
        visual: <StrategyVisual />
    },
    {
        id: 'launch',
        label: 'The Launch',
        title: 'Systems Go Live',
        description: 'Execution mode. We deploy the campaigns, launch the landing pages, and set up the tracking pixel matrix.',
        benefits: [
            'High-Velocity Campaign Setup',
            'Landing Page Deployment',
            'Tracking & Analytics Setup',
            'CRM Integration'
        ],
        icon: Rocket,
        visual: <LaunchVisual />
    },
    {
        id: 'scale',
        label: 'The Scale',
        title: 'Aggressive Growth',
        description: 'Data optimization. We kill losing ads, double down on winners, and aggressively scale budget while maintaining ROAS.',
        benefits: [
            'Daily Performance Optimization',
            'A/B Testing (Creative & Copy)',
            'Budget Scaling Protocols',
            'Automated Reporting'
        ],
        icon: BarChart3,
        visual: <ScaleVisual />
    }
];

const ProcessScroll: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    // Track scroll progress of the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll progress to step index
    // 0 - 0.25 -> Step 0
    // 0.25 - 0.5 -> Step 1
    // 0.5 - 0.75 -> Step 2
    // 0.75 - 1.0 -> Step 3
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const stepIndex = Math.floor(latest * PROCESS_STEPS.length);
            // Clamp index to valid range
            const clampedIndex = Math.min(Math.max(stepIndex, 0), PROCESS_STEPS.length - 1);
            setActiveStep(clampedIndex);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    // Manual navigation
    const scrollToStep = (index: number) => {
        if (containerRef.current) {
            const containerHeight = containerRef.current.offsetHeight;
            const stepHeight = containerHeight / PROCESS_STEPS.length;

            // Calculate absolute position
            const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
            const targetScroll = containerTop + (stepHeight * index) + 10; // +10 to ensure we cross the threshold

            window.scrollTo({
                top: targetScroll,
                behavior: "smooth"
            });
        }
    };

    const currentStep = PROCESS_STEPS[activeStep];

    return (
        // Tall container to create scroll space (400vh = 4 screens worth of scroll)
        // We use 400vh to give enough room for 4 distinct snap points
        <div ref={containerRef} className="relative h-[400vh]">

            {/* Snap Points - Invisible anchors that force the scroll to stop */}
            <div className="absolute inset-0 pointer-events-none">
                {PROCESS_STEPS.map((_, idx) => (
                    <div
                        key={idx}
                        className="h-screen w-full scroll-snap-align-start scroll-snap-stop-always"
                        style={{ top: `${idx * 100}vh` }}
                    />
                ))}
            </div>

            {/* Sticky Wrapper - Pins content to viewport */}
            <div className="sticky top-0 h-screen flex flex-col bg-ivory overflow-hidden">

                <div className="container mx-auto px-6 h-full flex flex-col pt-24 md:pt-32 pb-12">

                    {/* Header Section */}
                    <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8 mb-12 flex-shrink-0">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white text-xs font-bold uppercase tracking-widest mb-6 text-text-secondary">
                                <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
                                Est. Timeline: 4-6 Weeks
                            </div>
                            <h2 className="font-display text-5xl md:text-6xl font-medium leading-tight tracking-tight">
                                <ScrollFloat as="span" containerClassName="inline-block mr-3">The Growth</ScrollFloat>
                                <Highlighter action="underline" color="#E08576">
                                    <span className="italic text-coral">
                                        <ScrollFloat as="span" containerClassName="inline-block">Blueprint</ScrollFloat>
                                    </span>
                                </Highlighter>
                            </h2>
                        </div>

                        {/* Tabs */}
                        <div className="flex-shrink-0 overflow-x-auto pb-2 xl:pb-0">
                            <div className="bg-white dark:bg-black p-1.5 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm inline-flex whitespace-nowrap">
                                {PROCESS_STEPS.map((step, idx) => {
                                    const isActive = activeStep === idx;
                                    return (
                                        <button
                                            key={step.id}
                                            onClick={() => scrollToStep(idx)}
                                            className={cn(
                                                "relative px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 outline-none border border-transparent",
                                                isActive
                                                    ? "text-white shadow-md"
                                                    : "text-text-secondary hover:text-text-primary hover:bg-black/5 dark:hover:bg-white/5"
                                            )}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeProcessTab"
                                                    className="absolute inset-0 bg-black dark:bg-white rounded-xl"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                            <span className="relative z-10 flex items-center gap-2">
                                                <step.icon className={cn("w-4 h-4", isActive ? "text-coral" : "currentColor")} />
                                                <span className={isActive ? "text-white dark:text-black" : ""}>{step.label}</span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Content Area - Switches in place */}
                    <div className="flex-1 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep.id}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="w-full h-full"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 h-full items-start lg:items-center">

                                    {/* Text Content */}
                                    <div>
                                        <div className="w-16 h-16 rounded-2xl bg-coral/10 flex items-center justify-center text-coral mb-8">
                                            <currentStep.icon className="w-8 h-8" />
                                        </div>
                                        <h3 className="font-display text-4xl md:text-5xl font-bold mb-6 text-text-primary leading-tight">
                                            {currentStep.title}
                                        </h3>
                                        <p className="text-xl text-text-secondary font-light leading-relaxed mb-8">
                                            {currentStep.description}
                                        </p>
                                        <div className="space-y-4">
                                            {currentStep.benefits.map((benefit, i) => (
                                                <div key={i} className="flex items-center gap-4">
                                                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                                                    </div>
                                                    <span className="text-base font-medium text-text-primary">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Visual */}
                                    <div className="h-[400px] md:h-[500px] w-full">
                                        {currentStep.visual}
                                    </div>

                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
};

export const ProcessMobileStack = ProcessScroll;

export default ProcessScroll;
