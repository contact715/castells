"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Globe, MessageCircle, Phone, Search, Instagram,
    Database, Cpu, Zap, Mail, MessageSquare,
    BarChart3, Settings, ShieldCheck, Share2
} from "lucide-react";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";

const channels = [
    { title: "Landing Pages", icon: Globe, color: "text-blue-400" },
    { title: "Instagram Ads", icon: Instagram, color: "text-pink-400" },
    { title: "Google Search", icon: Search, color: "text-red-400" },
    { title: "Direct Calls", icon: Phone, color: "text-emerald-400" },
];

const crms = [
    { title: "Pipedrive", icon: BarChart3, color: "text-emerald-500" },
    { title: "GoHighLevel", icon: Zap, color: "text-orange-400" },
    { title: "Salesforce", icon: ShieldCheck, color: "text-blue-500" },
    { title: "Custom Webhooks", icon: Settings, color: "text-white/50" },
];

export function PlatformSchema() {
    return (
        <div className="relative py-24 px-6 overflow-hidden bg-[#050505] rounded-[3rem] border border-white/5 shadow-2xl mt-20">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-coral/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <div className="text-center mb-20">
                    <h2 className="text-xs font-black text-coral uppercase tracking-[0.4em] mb-4 text-glow">How it works</h2>
                    <h3 className="text-4xl md:text-5xl font-display font-black text-white">Marketing Operation System <span className="text-coral">Connect</span></h3>
                    <p className="mt-6 text-xl text-white/50 max-w-2xl mx-auto uppercase tracking-widest font-bold text-sm">
                        One central brain to handle all your multi-channel sales operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 items-center w-full relative">

                    {/* LEFT: Owned Channels */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4 relative z-10"
                    >
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-md">
                            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Entry Channels</h4>
                            <div className="grid grid-cols-1 gap-4">
                                {channels.map((ch, i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-coral/10 hover:border-coral/20 transition-all cursor-default group">
                                        <div className={`p-2 rounded-lg bg-black/50 ${ch.color}`}>
                                            <ch.icon size={16} />
                                        </div>
                                        <span className="text-xs font-bold text-white uppercase tracking-widest">{ch.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* CENTER: MOSCO.AI BRAIN */}
                    <div className="relative flex flex-col items-center justify-center">
                        <div className="absolute -top-20 z-0 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Cpu size={300} className="text-coral animate-pulse-slow" strokeWidth={0.5} />
                        </div>

                        <div className="relative z-10 w-full flex flex-center flex-col items-center">
                            <div className="mb-10 text-center">
                                <div className="inline-block p-4 bg-coral/10 rounded-[2rem] border border-coral/20 mb-4 shadow-[0_0_50px_rgba(232,213,181,0.2)]">
                                    <Database size={32} className="text-coral" />
                                </div>
                                <h4 className="text-2xl font-black text-white uppercase tracking-[0.3em]">mosco.ai</h4>
                            </div>

                            <DatabaseWithRestApi
                                title="Real-time Marketing Operation Sync"
                                circleText="BRAIN"
                                badgeTexts={{
                                    first: "API v2",
                                    second: "SYNC",
                                    third: "AI",
                                    fourth: "MOSCO"
                                }}
                            />
                        </div>

                        {/* Connection Lines (Aesthetic) */}
                        <div className="absolute inset-0 -z-10 pointer-events-none opacity-20 overflow-visible">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <motion.path
                                    d="M 10 50 Q 50 50 90 50"
                                    stroke="url(#grad-line)"
                                    strokeWidth="0.5"
                                    fill="none"
                                    strokeDasharray="2,2"
                                />
                                <defs>
                                    <linearGradient id="grad-line" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#e8d5b5" />
                                        <stop offset="100%" stopColor="#3b82f6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>

                    {/* RIGHT: CRMs & Automations */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4 relative z-10"
                    >
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-md text-right">
                            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Destinations</h4>
                            <div className="grid grid-cols-1 gap-4">
                                {crms.map((ch, i) => (
                                    <div key={i} className="flex items-center justify-end gap-4 p-3 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-blue-500/10 hover:border-blue-500/20 transition-all cursor-default group">
                                        <span className="text-xs font-bold text-white uppercase tracking-widest">{ch.title}</span>
                                        <div className={`p-2 rounded-lg bg-black/50 ${ch.color}`}>
                                            <ch.icon size={16} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Explanation text */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl">
                    <div className="text-center font-bold">
                        <div className="text-coral text-4xl mb-2">01</div>
                        <h5 className="text-white uppercase tracking-widest mb-2">Connect</h5>
                        <p className="text-xs text-white/40 leading-relaxed uppercase">
                            Connect any lead source or advertising channel instantly via our webhooks or native integrations.
                        </p>
                    </div>
                    <div className="text-center font-bold">
                        <div className="text-coral text-4xl mb-2">02</div>
                        <h5 className="text-white uppercase tracking-widest mb-2">Process</h5>
                        <p className="text-xs text-white/40 leading-relaxed uppercase">
                            AI brains filter, qualify, and route leads based on your specific business logic in milliseconds.
                        </p>
                    </div>
                    <div className="text-center font-bold">
                        <div className="text-coral text-4xl mb-2">03</div>
                        <h5 className="text-white uppercase tracking-widest mb-2">Sync</h5>
                        <p className="text-xs text-white/40 leading-relaxed uppercase">
                            Real-time synchronization with your existing tech stack, keeping all your data consistent and up to date.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
