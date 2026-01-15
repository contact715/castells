"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { KPICard } from "@/components/dashboard/KPICard";
import { Card } from "@/components/ui/Card";

const LeadFunnel = dynamic(() => import("@/components/dashboard/LeadFunnel").then(mod => mod.LeadFunnel), {
    ssr: false,
    loading: () => <div className="h-[200px] w-full animate-pulse bg-white/5 rounded-3xl" />
});
const RevenueChart = dynamic(() => import("@/components/dashboard/RevenueChart").then(mod => mod.RevenueChart), {
    ssr: false,
    loading: () => <div className="h-[200px] w-full animate-pulse bg-white/5 rounded-3xl" />
});
const GeoHeatmap = dynamic(() => import("@/components/dashboard/GeoHeatmap").then(mod => mod.GeoHeatmap), {
    ssr: false,
    loading: () => <div className="h-[200px] w-full animate-pulse bg-white/5 rounded-3xl" />
});

import {
    DollarSign, Target, User, Star, Download, Calendar, TrendingUp, Activity, Users,
    MessageSquare, Phone, Shield, Search, Globe, Zap, FileText, ShieldCheck, Clock,
    Smartphone, UserSearch, AlertCircle, CheckCircle2, BarChart3, Fingerprint, Brain,
    Layers, Cpu, Headphones, MessageCircle, BarChart, PieChart, Wallet, Rocket, Heart,
    ZapOff, Sparkles, ShieldAlert, Coins, Timer, RefreshCw, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import MagicBento, { ParticleCard } from "@/components/ui/MagicBento";


// Brand Identity: Champagne Gold & Slate Obsidian
const COLORS = {
    primary: "rgb(var(--accent))", // Champagne
    success: "#10b981",
    muted: "#64748b",
    champagne: "#E8D5B5",
    obsidian: "#11141D"
};

const InfoTooltip = ({ content }: { content: { what: string, how: string, from: string, why: string } }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block ml-1.5 align-middle" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <Info className="w-3 h-3 text-white/20 hover:text-coral transition-colors cursor-help" />
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[260px] bg-[#1A1F2B] border border-white/10 rounded-2xl p-4 shadow-2xl z-50 backdrop-blur-xl pointer-events-none"
                    >
                        <div className="space-y-3">
                            <div>
                                <p className="text-[9px] font-black text-coral uppercase tracking-widest mb-1">What is this?</p>
                                <p className="text-[10px] text-white/80 leading-relaxed font-medium">{content.what}</p>
                            </div>
                            <div className="h-px bg-white/5" />
                            <div>
                                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">How it&apos;s calculated</p>
                                <p className="text-[10px] text-white/60 leading-relaxed italic">{content.how}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Data Source</p>
                                <p className="text-[10px] text-white/60 leading-relaxed uppercase font-black">{content.from}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Purpose</p>
                                <p className="text-[10px] text-white/60 leading-relaxed underline decoration-coral/30 underline-offset-2">{content.why}</p>
                            </div>
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1A1F2B]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const CompactSparkline = ({ data, color = COLORS.champagne }: { data: number[], color?: string }) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    const width = 60;
    const height = 12;
    const points = data.map((d, i) => ({
        x: (i / (data.length - 1)) * width,
        y: height - ((d - min) / range) * height
    }));

    const d = `M ${points[0].x} ${points[0].y} ${points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ")}`;

    return (
        <svg width={width} height={height} className="overflow-visible opacity-30 group-hover:opacity-60 transition-opacity">
            <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

const ModuleHeader = ({ title, icon, efficiency }: { title: string, icon: any, efficiency: number }) => (
    <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
            <div className="p-2 bg-coral/10 rounded-xl text-coral">
                {icon}
            </div>
            <div>
                <h3 className="text-[11px] font-black text-white uppercase tracking-widest">{title}</h3>
                <p className="text-[8px] text-white/50 uppercase font-bold tracking-tight">Efficiency</p>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-coral">{efficiency}%</span>
            <div className="w-12 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-coral rounded-full" style={{ width: `${efficiency}%` }} />
            </div>
        </div>
    </div>
);

export default function DashboardPage() {
    const [dateRange, setDateRange] = useState("last-month");

    // Modules Matrix (Technical Focus)
    const modules = [
        {
            name: "Dialer", icon: <Phone className="w-4 h-4" />, efficiency: 92,
            stats: [
                { label: "AI Pick-up", val: "42.8%", change: "+2%", data: [30, 45, 35, 60, 40] },
                { label: "Neural Latency", val: "0.4s", change: "-0.1s", data: [50, 40, 30, 45, 38] }
            ]
        },
        {
            name: "AI Chat", icon: <MessageCircle className="w-4 h-4" />, efficiency: 88,
            stats: [
                { label: "Auto-Booking", val: "82%", change: "+12%", data: [60, 75, 70, 85, 82] },
                { label: "Context Accuracy", val: "99.2%", change: "+0.1%", data: [98, 98.5, 99.1, 99, 99.2] }
            ]
        },
        {
            name: "Forms", icon: <FileText className="w-4 h-4" />, efficiency: 76,
            stats: [
                { label: "MQL Conversion", val: "68.5%", change: "+5.4%", data: [50, 55, 62, 58, 68] },
                { label: "Identity Ver.", val: "94.2%", change: "+1.1%", data: [90, 92, 94, 93, 94] }
            ]
        },
        {
            name: "Profiler", icon: <Brain className="w-4 h-4" />, efficiency: 96,
            stats: [
                { label: "Data Enrichment", val: "14 pts", change: "+2", data: [10, 12, 13, 11, 14] },
                { label: "Identity Sync", val: "88%", change: "+5%", data: [70, 75, 82, 80, 88] }
            ]
        },
        {
            name: "Systems", icon: <ShieldCheck className="w-4 h-4" />, efficiency: 99.9,
            stats: [
                { label: "Uptime", val: "99.99%", change: "stable", data: [100, 100, 100, 100, 100] },
                { label: "Neural Load", val: "14.2%", change: "+1.2%", data: [10, 12, 15, 14, 14.2] }
            ]
        }
    ];

    // Strategic Metrics
    const strategicMetrics = [
        {
            label: "CAC", val: "$42.50", change: "-12%", icon: <Wallet className="w-4 h-4" />, desc: "Cost Per Acquisition",
            info: { what: "Total marketing spend divided by new customers.", how: "Spend / Acquired", from: "Ads API + Stripe", why: "Profitability floor." }
        },
        {
            label: "ROAS", val: "580%", change: "+15%", icon: <DollarSign className="w-4 h-4" />, desc: "Ads Return",
            info: { what: "Revenue per dollar spent on ads.", how: "Revenue / Spend", from: "Google/Meta API", why: "Budget scaling metric." }
        },
        {
            label: "LTV:CAC", val: "4.2x", change: "+0.5x", icon: <TrendingUp className="w-4 h-4" />, desc: "Unit Economics",
            info: { what: "Lifetime value vs acquisition cost.", how: "Cust. Revenue / CAC", from: "Stripe", why: "Growth sustainability." }
        },
        {
            label: "Lead Velocity", val: "+28%", change: "+5%", icon: <Rocket className="w-4 h-4" />, desc: "Volume Speed",
            info: { what: "MoM growth in qualified leads.", how: "Delta Leads / Prev Month", from: "Forms + Profiler", why: "Predicts revenue growth." }
        },
        {
            label: "Sentiment", val: "Positive", change: "+8%", icon: <Heart className="w-4 h-4" />, desc: "Market Health",
            info: { what: "AI score of brand health.", how: "NLP Analysis of Chats", from: "Neural Engine", why: "Warning for churn." }
        },
        {
            label: "Attribution", val: "99.2%", change: "+0.2%", icon: <ShieldCheck className="w-4 h-4" />, desc: "Data Integrity",
            info: { what: "Leads with mapped sources.", how: "Neural ID Sync accuracy", from: "Profiler", why: "Prevents budget waste." }
        }
    ];

    // Hidden Impact
    const impactMetrics = [
        {
            label: "Man-Hours Saved", val: "1,420h", sub: "+120h this month", icon: <Timer className="w-4 h-4" />,
            info: { what: "Labor hours replaced by AI.", how: "AI Tasks * Human Duration", from: "System Logs", why: "Efficiency ROI." }
        },
        {
            label: "AI vs Human Cost", val: "1:42", sub: "97.6% Cheaper / Lead", icon: <Coins className="w-4 h-4" />,
            info: { what: "AI cost vs human salary for same tasks.", how: "AI Cost / Human Market Rate", from: "Billing", why: "Automation logic." }
        },
        {
            label: "Neural Safety", val: "0.02%", sub: "Hallucination Rate", icon: <ShieldAlert className="w-4 h-4" />,
            info: { what: "Factuality drift rate in AI outputs.", how: "Shield Verifier Audit", from: "Neural Sentinel", why: "Brand safety." }
        },
        {
            label: "Database Yield", val: "$28.4k", sub: "From Reactivation", icon: <RefreshCw className="w-4 h-4" />,
            info: { what: "Revenue from dormant leads.", how: "Reactivator Closed Deals", from: "Stripe", why: "Extraction ROI." }
        }
    ];

    return (
        <div className="flex flex-col h-full gap-4 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between p-4 lg:p-5 bg-[#11141D] rounded-card border border-white/5 shadow-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-coral/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-6">
                    <div>
                        <h1 className="text-sm font-black text-white uppercase tracking-[0.4em]">Institutional Dashboard</h1>
                        <p className="text-[9px] text-white/50 uppercase mt-1 font-bold tracking-[0.2em]">Technical Results & Growth Intel</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-9 px-4 text-[10px] font-black uppercase border-white/10 hover:bg-white/5 hover:text-coral transition-all">
                        <Download className="w-3.5 h-3.5 mr-2" />
                        Full ROI Audit
                    </Button>
                </div>
            </div>

            {/* STRATEGIC DOMINANCE LAYER */}
            <MagicBento className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                {strategicMetrics.map((m, i) => (
                    <ParticleCard key={i} className="bg-[#11141D] p-4 lg:p-5 rounded-2xl border border-white/10 group relative overflow-hidden magic-bento-card">
                        <div className="absolute -right-2 -top-2 p-4 text-white/5">
                            {m.icon}
                        </div>
                        <div className="flex items-center">
                            <p className="text-[9px] font-black text-white/80 uppercase tracking-widest mb-1">{m.label}</p>
                            <InfoTooltip content={m.info} />
                        </div>
                        <div className="flex items-end gap-2">
                            <h4 className="text-lg font-black text-white tracking-tighter">{m.val}</h4>
                            <span className={`text-[10px] font-bold mb-0.5 ${m.change.startsWith('+') ? 'text-emerald-400' : 'text-orange-400'}`}>{m.change}</span>
                        </div>
                        <p className="text-[8px] text-white/60 uppercase font-black mt-2 tracking-tight">{m.desc}</p>
                    </ParticleCard>
                ))}
            </MagicBento>

            {/* IMPACT & EFFICIENCY */}
            <MagicBento className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {impactMetrics.map((m, i) => (
                    <ParticleCard key={i} className="bg-coral/[0.03] p-5 rounded-2xl border border-coral/20 relative overflow-hidden group magic-bento-card">
                        <div className="absolute left-0 top-0 h-full w-0.5 bg-coral" />
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-4 bg-coral/10 rounded-full text-coral">
                                    <Rocket className="w-8 h-8" />
                                </div>
                                <span className="text-[9px] font-black text-white/70 uppercase tracking-widest">{m.label}</span>
                            </div>
                            <InfoTooltip content={m.info} />
                        </div>
                        <h4 className="text-xl font-black text-white tracking-tighter">{m.val}</h4>
                        <p className="text-[9px] font-bold text-coral mt-1 uppercase tracking-tight">{m.sub}</p>
                    </ParticleCard>
                ))}
            </MagicBento>

            {/* TECHNICAL MODULE PERFORMANCE MATRIX */}
            <MagicBento className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-2">
                {modules.map((mod, i) => (
                    <ParticleCard key={i} className="bg-[#11141D] p-5 rounded-2xl border border-white/10 hover:bg-white/[0.02] transition-all magic-bento-card">
                        <ModuleHeader title={mod.name} icon={mod.icon} efficiency={mod.efficiency} />
                        <div className="space-y-4 pt-1">
                            {mod.stats.map((s, idx) => (
                                <div key={idx} className="flex flex-col gap-1.5 group/stat cursor-default">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-black text-white/60 uppercase tracking-tight group-hover/stat:text-white transition-colors">{s.label}</span>
                                        <span className="text-[8px] font-bold text-coral opacity-60 group-hover/stat:opacity-100 transition-opacity">{s.change}</span>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <span className="text-xs font-black text-white tracking-tight">{s.val}</span>
                                        <CompactSparkline data={s.data} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ParticleCard>
                ))}
            </MagicBento>

            {/* SYNERGY & GROWTH ADVANCED VISUALS */}
            <div className="grid grid-cols-12 gap-4 mt-2">
                <div className="col-span-12 lg:col-span-8 bg-[#11141D] rounded-card border border-white/5 p-6 lg:p-8 h-[450px]">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <div>
                                <h3 className="text-xs font-black text-white uppercase tracking-widest">Revenue Forecast Matrix</h3>
                                <p className="text-[10px] text-white/70 uppercase mt-1 font-bold">Actual Growth vs Neural AI Projection</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-coral" />
                                <span className="text-[9px] font-black text-white/70 uppercase">Actual</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                <span className="text-[9px] font-black text-white/70 uppercase">AI Forecast</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <RevenueChart />
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4 bg-[#11141D] rounded-card border border-white/5 p-6 lg:p-8 h-[450px] flex flex-col relative overflow-hidden">
                    <GeoHeatmap />
                </div>
            </div>

            {/* NEURAL PIPELINE & SYSTEM LOGS */}
            <div className="grid grid-cols-12 gap-4 mt-2">
                <div className="col-span-12 lg:col-span-7 bg-[#11141D] rounded-card border border-white/5 p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xs font-black text-white uppercase tracking-widest">Agentic Flow Monitor</h3>
                            <p className="text-[10px] text-white/70 uppercase mt-1 font-bold">Real-time Performance Logs</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[
                            { agent: "Profiler Alpha", action: "Mapping Context for lead...", time: "2s ago", status: "sync" },
                            { agent: "Neural Sentinel", action: "Applying Factuality Safety Shield...", time: "12s ago", status: "success" },
                            { agent: "Reactivator", action: "Scanning database for yield...", time: "1m ago", status: "process" }
                        ].map((log, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className={`w-1 h-8 rounded-full ${log.status === 'sync' ? 'bg-blue-500' : log.status === 'success' ? 'bg-emerald-500' : 'bg-coral'}`} />
                                    <div>
                                        <p className="text-[10px] font-black text-white/90 uppercase tracking-tight">{log.agent}</p>
                                        <p className="text-[9px] text-white/60 font-bold uppercase mt-0.5">{log.action}</p>
                                    </div>
                                </div>
                                <span className="text-[8px] font-black text-white/50 uppercase">{log.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-5 bg-[#11141D] rounded-card border border-white/5 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest">System Synergy</h3>
                            <BarChart3 className="w-4 h-4 text-white/20" />
                        </div>
                        <LeadFunnel />
                    </div>
                </div>
            </div>
        </div>
    );
}
