import React, { useState } from 'react';
import { Search, PenTool, Rocket, BarChart3, ArrowRight, Send, Video, CheckCircle2 } from 'lucide-react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface ProcessStep {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    icon: React.ElementType;
    duration: string;
    deliverables: string[];
    keyMetrics?: string[];
    nextSteps?: string;
}

const PROCESS_STEPS: ProcessStep[] = [
    {
        id: 'application',
        title: 'Application',
        description: 'You reach out to us via the contact form or schedule a call. We review your business and confirm if we are a good fit.',
        longDescription: 'The first step in our partnership begins with understanding your business needs. We evaluate your current marketing performance, revenue goals, and growth potential to ensure we can deliver measurable results. Our team reviews your application within 24 hours and schedules an initial consultation to discuss your objectives.',
        icon: Send,
        duration: 'Day 1',
        deliverables: ['Initial consultation', 'Business fit assessment', 'Project scope overview'],
        keyMetrics: ['Response time: <24 hours', 'Fit assessment accuracy: 95%', 'Initial consultation rate: 100%'],
        nextSteps: 'Discovery call scheduled within 48 hours'
    },
    {
        id: 'discovery',
        title: 'Discovery Call',
        description: 'A 30-minute video call to understand your goals, challenges, and current marketing infrastructure. No sales pitch, just strategy.',
        longDescription: 'During this deep-dive session, we map out your entire customer journey, identify bottlenecks in your funnel, and uncover hidden revenue opportunities. We analyze your current ad spend, conversion rates, and customer acquisition costs to build a comprehensive picture of your marketing ecosystem.',
        icon: Video,
        duration: 'Day 2-3',
        deliverables: ['Goals alignment session', 'Current state analysis', 'Opportunity identification'],
        keyMetrics: ['Call duration: 30-45 minutes', 'Data points collected: 50+', 'Opportunities identified: 5-10'],
        nextSteps: 'Comprehensive audit report delivered within 3 days'
    },
    {
        id: 'audit',
        title: 'The Audit',
        description: 'Before we build, we diagnose. We tear down your current infrastructure to find exactly where you are losing money.',
        longDescription: 'Our team conducts a forensic analysis of your marketing stack, tracking every dollar spent and every conversion path. We identify revenue leaks, inefficient ad placements, and underperforming campaigns. The audit reveals exactly where your marketing budget is being wasted and where the biggest growth opportunities lie.',
        icon: Search,
        duration: 'Week 1',
        deliverables: ['Full marketing audit', 'Competitor analysis', 'Revenue leak report'],
        keyMetrics: ['Average revenue leaks found: $50K+', 'Audit depth: 100+ touchpoints', 'ROI improvement potential: 200-400%'],
        nextSteps: 'Custom strategy roadmap presented in Week 2'
    },
    {
        id: 'strategy',
        title: 'The Strategy',
        description: 'No guesswork. We build a custom roadmap based on data, defining your ideal customer and the exact message that converts them.',
        longDescription: 'Based on audit findings, we create a data-driven growth blueprint tailored to your business. We define your Ideal Customer Profile (ICP), develop conversion-optimized messaging, and map out the exact campaigns and channels that will drive revenue. Every decision is backed by data, not assumptions.',
        icon: PenTool,
        duration: 'Week 2',
        deliverables: ['Custom growth roadmap', 'ICP definition', 'Messaging framework'],
        keyMetrics: ['Roadmap accuracy: 95%+', 'ICP match rate: 80%+', 'Messaging conversion lift: 2-3x'],
        nextSteps: 'Campaign launch begins in Week 3'
    },
    {
        id: 'launch',
        title: 'The Launch',
        description: 'Execution mode. We deploy the campaigns, launch the landing pages, and set up the tracking pixel matrix.',
        longDescription: 'This is where strategy becomes reality. We deploy multi-channel campaigns across Google, Meta, and other platforms. Landing pages are optimized for conversion, tracking pixels are installed for complete attribution, and A/B tests are launched simultaneously. Everything is monitored in real-time for immediate optimization.',
        icon: Rocket,
        duration: 'Week 3-4',
        deliverables: ['Campaign deployment', 'Landing page launch', 'Tracking setup'],
        keyMetrics: ['Campaigns launched: 10-20', 'Landing page conversion: 3-5%', 'Tracking accuracy: 99.9%'],
        nextSteps: 'Performance optimization and scaling in Week 5'
    },
    {
        id: 'scale',
        title: 'The Scale',
        description: 'Data optimization. We kill losing ads, double down on winners, and aggressively scale budget while maintaining ROAS.',
        longDescription: 'With real performance data in hand, we eliminate underperforming campaigns and aggressively scale winners. Budget allocation is optimized daily, creative variations are tested continuously, and ROAS targets are maintained while increasing spend. This is where exponential growth happens.',
        icon: BarChart3,
        duration: 'Week 5-6',
        deliverables: ['Performance optimization', 'Budget scaling', 'ROAS maintenance'],
        keyMetrics: ['Average ROAS: 4-6x', 'Budget scale: 2-5x', 'Conversion rate improvement: 50-200%'],
        nextSteps: 'Ongoing optimization and monthly strategy reviews'
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
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary leading-tight tracking-tight">
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
                                className={cn(
                                    "relative px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 outline-none",
                                    isActive
                                        ? "text-white shadow-md"
                                        : "text-text-secondary hover:text-text-primary hover:bg-gray-100 dark:hover:bg-neutral-800"
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
                                    <span className={cn(
                                        "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                                        isActive 
                                            ? "bg-white text-black dark:bg-black dark:text-white" 
                                            : "bg-coral/20 text-coral"
                                    )}>
                                        {idx + 1}
                                    </span>
                                    <span className={isActive ? "text-white dark:text-black" : ""}>
                                        {step.title}
                                    </span>
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
                    className="bg-white dark:bg-[#191919] rounded-[2rem] p-8 md:p-12 border border-black/5 dark:border-white/10 shadow-lg"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left: Icon + Title + Description */}
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-coral/10 dark:bg-coral/20 flex items-center justify-center shrink-0">
                                    {React.createElement(PROCESS_STEPS[activeStep].icon, {
                                        className: "w-8 h-8 text-coral"
                                    })}
                                </div>
                                <div>
                                    <span className="text-coral text-xs font-bold uppercase tracking-widest mb-1 block">
                                        Step {activeStep + 1} of {PROCESS_STEPS.length}
                                    </span>
                                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-text-primary dark:text-white">
                                        {PROCESS_STEPS[activeStep].title}
                                    </h3>
                                </div>
                            </div>

                            <p className="text-text-secondary dark:text-white/70 text-lg leading-relaxed mb-4">
                                {PROCESS_STEPS[activeStep].description}
                            </p>

                            {PROCESS_STEPS[activeStep].longDescription && (
                                <p className="text-text-secondary dark:text-white/60 text-base leading-relaxed mb-6">
                                    {PROCESS_STEPS[activeStep].longDescription}
                                </p>
                            )}

                            {PROCESS_STEPS[activeStep].nextSteps && (
                                <div className="mb-8 p-4 bg-coral/10 dark:bg-coral/20 rounded-xl border border-coral/20 dark:border-coral/30">
                                    <span className="text-xs font-bold uppercase tracking-widest text-coral mb-2 block">
                                        Next Steps
                                    </span>
                                    <p className="text-text-primary dark:text-white font-medium">
                                        {PROCESS_STEPS[activeStep].nextSteps}
                                    </p>
                                </div>
                            )}

                            <Button size="md" className="inline-flex items-center gap-2">
                                Start Now <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Right: Deliverables & Metrics */}
                        <div className="relative rounded-2xl p-8 overflow-hidden min-h-[500px] bg-gradient-to-br from-[#F4F4F2] to-white dark:from-[#2A2A2A] dark:to-[#1A1A1A] border border-black/5 dark:border-white/10">
                            <div className="relative z-10 flex flex-col h-full">
                                {/* Duration Badge */}
                                <div className="mb-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/10 border border-black/10 dark:border-white/20 shadow-sm">
                                        <span className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/80">
                                            Timeline
                                        </span>
                                        <span className="font-display text-lg font-bold text-text-primary dark:text-white">
                                            {PROCESS_STEPS[activeStep].duration}
                                        </span>
                                    </div>
                                </div>

                                {/* What You Get */}
                                <div className="mb-8">
                                    <h4 className="text-xs font-semibold uppercase tracking-widest text-text-secondary dark:text-white/80 mb-6">
                                        What You Get
                                    </h4>
                                    <div className="space-y-4 mb-8">
                                        {PROCESS_STEPS[activeStep].deliverables.map((item, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                                className="flex items-center gap-4"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-coral/10 dark:bg-coral/20 border border-coral/20 dark:border-coral/30 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 className="w-4 h-4 text-coral" />
                                                </div>
                                                <span className="font-display font-bold text-lg text-text-primary dark:text-white">
                                                    {item}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Metrics */}
                                {PROCESS_STEPS[activeStep].keyMetrics && (
                                    <div className="mt-auto pt-8 border-t border-black/10 dark:border-white/10">
                                        <h4 className="text-xs font-semibold uppercase tracking-widest text-text-secondary dark:text-white/80 mb-4">
                                            Key Metrics
                                        </h4>
                                        <div className="space-y-3">
                                            {PROCESS_STEPS[activeStep].keyMetrics?.map((metric, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                                                    className="flex items-center gap-3"
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-coral" />
                                                    <span className="text-text-secondary dark:text-white/90 text-sm">
                                                        {metric}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
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
