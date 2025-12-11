import React, { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Search, PenTool, Rocket, BarChart3, CheckCircle2, AlertCircle, TrendingUp, Users, Target, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';

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

// --- Visual Components (The "Windows") ---

const AuditVisual = () => (
    <div className="w-full h-full bg-surface border border-black/5 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-lg">
        <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">System Audit</span>
            </div>
            <span className="text-xs font-mono text-text-secondary">ID: #AUD-2024</span>
        </div>

        <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20">
                <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-text-primary">Ad Spend Leakage</span>
                </div>
                <span className="text-sm font-bold text-red-600">-$4,200/mo</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-900/20">
                <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-medium text-text-primary">Untracked Conversions</span>
                </div>
                <span className="text-sm font-bold text-amber-600">32%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/20">
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
                    animate={{ width: "68%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-coral"
                />
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                <span>Analysis Progress</span>
                <span>68%</span>
            </div>
        </div>
    </div>
);

const StrategyVisual = () => (
    <div className="w-full h-full bg-surface border border-black/5 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-lg">
        <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
            <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">ICP Targeting</span>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-ivory rounded-xl border border-black/5 text-center">
                <div className="text-2xl font-display font-bold text-text-primary mb-1">35-55</div>
                <div className="text-[10px] uppercase tracking-widest text-text-secondary">Age Range</div>
            </div>
            <div className="p-4 bg-ivory rounded-xl border border-black/5 text-center">
                <div className="text-2xl font-display font-bold text-text-primary mb-1">$150k+</div>
                <div className="text-[10px] uppercase tracking-widest text-text-secondary">Household Inc.</div>
            </div>
        </div>

        <div className="space-y-3">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 font-bold text-xs">1</div>
                <div className="h-px flex-1 bg-black/10" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">Awareness</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 font-bold text-xs">2</div>
                <div className="h-px flex-1 bg-black/10" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">Consideration</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-coral text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-coral/30">3</div>
                <div className="h-px flex-1 bg-coral" />
                <span className="text-xs font-bold uppercase tracking-widest text-coral">Conversion</span>
            </div>
        </div>
    </div>
);

const LaunchVisual = () => (
    <div className="w-full h-full bg-surface border border-black/5 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-lg">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600" />

        <div className="flex items-center justify-between mb-8 mt-2">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-green-600">Campaign Active</span>
            </div>
            <span className="text-xs font-mono text-text-secondary">v2.4.0</span>
        </div>

        <div className="space-y-4">
            <div className="bg-black text-white p-4 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs font-bold uppercase tracking-widest">High Intent</span>
                    </div>
                    <span className="text-xs text-white/50">Just now</span>
                </div>
                <div className="text-sm font-medium">New Lead: "Enterprise Plan Inquiry"</div>
            </div>
            <div className="bg-white dark:bg-white/5 border border-black/5 p-4 rounded-xl shadow-sm opacity-60">
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
    <div className="w-full h-full bg-surface border border-black/5 rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-lg">
        <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4">
            <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">Revenue Growth</span>
            </div>
            <div className="px-2 py-1 rounded bg-green-100 dark:bg-green-900/20 text-green-700 text-[10px] font-bold uppercase tracking-widest">
                +124% YoY
            </div>
        </div>

        <div className="flex-1 flex items-end gap-2 px-2 pb-2">
            {[30, 45, 35, 60, 55, 80, 75, 95].map((h, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={cn(
                        "flex-1 rounded-t-sm",
                        i === 7 ? "bg-coral" : "bg-black/10 dark:bg-white/10"
                    )}
                />
            ))}
        </div>

        <div className="flex justify-between mt-4 pt-4 border-t border-black/5">
            <div>
                <div className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">CAC</div>
                <div className="text-lg font-bold text-text-primary">$42.50</div>
            </div>
            <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">ROAS</div>
                <div className="text-lg font-bold text-green-600">4.8x</div>
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

const ProcessTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full">
            {/* Tabs Navigation */}
            <div className="flex justify-start md:justify-center mb-16 overflow-x-auto no-scrollbar px-4 md:px-0">
                <div className="inline-flex p-1.5 bg-surface border border-black/5 rounded-full shadow-sm">
                    {PROCESS_STEPS.map((step, idx) => (
                        <button
                            key={step.id}
                            onClick={() => setActiveTab(idx)}
                            className={cn(
                                "relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap z-10",
                                activeTab === idx ? "text-white" : "text-text-secondary hover:text-text-primary"
                            )}
                        >
                            {activeTab === idx && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-black dark:bg-white rounded-xl -z-10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <step.icon className={cn("w-4 h-4", activeTab === idx ? "text-coral" : "opacity-50")} />
                            {step.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">

                {/* Left Column: Text Content */}
                <div className="order-2 lg:order-1 px-4 md:px-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="inline-flex items-center gap-2 mb-6">
                                <span className="text-coral font-display text-6xl font-bold opacity-20">0{activeTab + 1}</span>
                                <div className="h-px w-12 bg-coral/30" />
                            </div>

                            <h3 className="font-display text-4xl md:text-5xl font-bold mb-6 text-text-primary leading-tight">
                                {PROCESS_STEPS[activeTab].title}
                            </h3>

                            <p className="text-xl text-text-secondary font-light leading-relaxed mb-10 max-w-lg">
                                {PROCESS_STEPS[activeTab].description}
                            </p>

                            <div className="grid grid-cols-1 gap-4">
                                {PROCESS_STEPS[activeTab].benefits.map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + (i * 0.1) }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-coral/10 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-coral" />
                                        </div>
                                        <span className="text-text-primary font-medium">{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Column: Visual Window */}
                <div className="order-1 lg:order-2 h-[400px] md:h-[500px] w-full relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.95, rotate: -2 }}
                            transition={{ duration: 0.5, ease: "backOut" }}
                            className="w-full h-full"
                        >
                            {/* Background Decorative Blob */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-coral/20 to-purple-500/20 rounded-full blur-3xl opacity-40 animate-pulse" />

                            {/* The Window Itself */}
                            <div className="relative w-full h-full">
                                {PROCESS_STEPS[activeTab].visual}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default ProcessTabs;
