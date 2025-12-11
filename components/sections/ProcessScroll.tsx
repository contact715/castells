import React, { useState } from 'react';
import { Search, PenTool, Rocket, BarChart3, ArrowRight, Send, Video, CheckCircle2 } from 'lucide-react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { RippleButton } from '../ui/RippleButton';

interface ProcessStep {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    duration: string;
    deliverables: string[];
}

const PROCESS_STEPS: ProcessStep[] = [
    {
        id: 'application',
        title: 'Application',
        description: 'You reach out to us via the contact form or schedule a call. We review your business and confirm if we are a good fit.',
        icon: Send,
        duration: 'Day 1',
        deliverables: ['Initial consultation', 'Business fit assessment', 'Project scope overview']
    },
    {
        id: 'discovery',
        title: 'Discovery Call',
        description: 'A 30-minute video call to understand your goals, challenges, and current marketing infrastructure. No sales pitch, just strategy.',
        icon: Video,
        duration: 'Day 2-3',
        deliverables: ['Goals alignment session', 'Current state analysis', 'Opportunity identification']
    },
    {
        id: 'audit',
        title: 'The Audit',
        description: 'Before we build, we diagnose. We tear down your current infrastructure to find exactly where you are losing money.',
        icon: Search,
        duration: 'Week 1',
        deliverables: ['Full marketing audit', 'Competitor analysis', 'Revenue leak report']
    },
    {
        id: 'strategy',
        title: 'The Strategy',
        description: 'No guesswork. We build a custom roadmap based on data, defining your ideal customer and the exact message that converts them.',
        icon: PenTool,
        duration: 'Week 2',
        deliverables: ['Custom growth roadmap', 'ICP definition', 'Messaging framework']
    },
    {
        id: 'launch',
        title: 'The Launch',
        description: 'Execution mode. We deploy the campaigns, launch the landing pages, and set up the tracking pixel matrix.',
        icon: Rocket,
        duration: 'Week 3-4',
        deliverables: ['Campaign deployment', 'Landing page launch', 'Tracking setup']
    },
    {
        id: 'scale',
        title: 'The Scale',
        description: 'Data optimization. We kill losing ads, double down on winners, and aggressively scale budget while maintaining ROAS.',
        icon: BarChart3,
        duration: 'Week 5-6',
        deliverables: ['Performance optimization', 'Budget scaling', 'ROAS maintenance']
    }
];

const ProcessScroll: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="w-full">
            {/* Header - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
                {/* Left: Badge + Title */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-coral animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                            Est. Timeline: 4-6 Weeks
                        </span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary leading-tight tracking-tight">
                        The Growth<br />
                        <span className="text-text-secondary">Blueprint</span>
                    </h2>
                </div>

                {/* Right: Description */}
                <div className="flex flex-col justify-end">
                    <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
                        A systematic approach to scaling your business. From audit to execution, every step is calculated for maximum ROI.
                    </p>
                </div>
            </div>

            {/* Horizontal Timeline Tabs - Services Style */}
            <div className="flex justify-start mb-16">
                <div className="bg-surface p-1.5 rounded-2xl border border-black/5 shadow-none inline-flex flex-wrap gap-1">
                    {PROCESS_STEPS.map((step, idx) => {
                        const isActive = activeStep === idx;
                        return (
                            <button
                                key={step.id}
                                onClick={() => setActiveStep(idx)}
                                className={`relative px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 outline-none ${isActive
                                        ? 'text-white shadow-md'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-gray-100 dark:hover:bg-neutral-800'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeProcessTab"
                                        className="absolute inset-0 bg-black dark:bg-white rounded-xl"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isActive
                                            ? 'bg-coral text-white'
                                            : idx < activeStep
                                                ? 'bg-coral/20 text-coral'
                                                : 'bg-black/10 text-text-secondary'
                                        }`}>
                                        {idx + 1}
                                    </span>
                                    <div className="text-left">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest block ${isActive ? 'text-white/60 dark:text-black/60' : 'text-text-secondary'
                                            }`}>
                                            {step.duration}
                                        </span>
                                        <span className={isActive ? 'text-white dark:text-black' : ''}>
                                            {step.title}
                                        </span>
                                    </div>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Active Step Content - Full Width Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-[2rem] p-8 md:p-12 border border-black/5"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left: Icon + Title + Description */}
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-coral/10 flex items-center justify-center shrink-0">
                                    {React.createElement(PROCESS_STEPS[activeStep].icon, {
                                        className: "w-8 h-8 text-coral"
                                    })}
                                </div>
                                <div>
                                    <span className="text-coral text-xs font-bold uppercase tracking-widest mb-1 block">
                                        Step {activeStep + 1} of {PROCESS_STEPS.length}
                                    </span>
                                    <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                                        {PROCESS_STEPS[activeStep].title}
                                    </h3>
                                </div>
                            </div>

                            <p className="text-text-secondary text-lg leading-relaxed mb-8">
                                {PROCESS_STEPS[activeStep].description}
                            </p>

                            <RippleButton className="bg-black text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs inline-flex items-center gap-2">
                                Start Now <ArrowRight className="w-4 h-4" />
                            </RippleButton>
                        </div>

                        {/* Right: Deliverables */}
                        <div className="bg-[#F4F4F2] rounded-2xl p-8">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-6">
                                What You Get
                            </h4>
                            <div className="space-y-4">
                                {PROCESS_STEPS[activeStep].deliverables.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-4 h-4 text-coral" />
                                        </div>
                                        <span className="font-display font-bold text-lg text-text-primary">
                                            {item}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Timeline indicator */}
                            <div className="mt-8 pt-6 border-t border-black/10">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                                        Timeline
                                    </span>
                                    <span className="font-display text-2xl font-bold text-coral">
                                        {PROCESS_STEPS[activeStep].duration}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export const ProcessMobileStack = ProcessScroll;

export default ProcessScroll;
