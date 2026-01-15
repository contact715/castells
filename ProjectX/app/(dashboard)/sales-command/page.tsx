"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import {
    Trophy, Download, Target, Users, TrendingUp, Activity,
    Zap, Award, Phone, MessageSquare, Headphones, ShieldCheck, Info,
    PieChart, Rocket, Coins, Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagicBento, { ParticleCard } from "@/components/ui/MagicBento";


const DetailedSalesLeaderboard = dynamic(() => import("@/components/dashboard/DetailedSalesLeaderboard").then(mod => mod.DetailedSalesLeaderboard), {
    ssr: false,
    loading: () => <div className="h-[600px] w-full animate-pulse bg-white/5 rounded-3xl" />
});

const BonusPieChart = dynamic(() => import("@/components/dashboard/BonusPieChart").then(mod => mod.BonusPieChart), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full animate-pulse bg-white/5 rounded-3xl" />
});

export default function SalesCommandPage() {
    return (
        <div className="flex flex-col h-full gap-8 pb-20">
            {/* High-Impact TV Header */}
            <div className="flex flex-col lg:flex-row items-center justify-between p-6 lg:p-8 bg-[#11141D] rounded-card border border-white/10 relative overflow-hidden group gap-8">
                <div className="absolute inset-0 bg-white/[0.02] opacity-50" />

                {/* Left: Module Identity */}
                <div className="flex items-center gap-4 lg:gap-6 relative z-10 shrink-0">
                    <div className="p-3 lg:p-4 bg-coral/20 rounded-2xl text-coral">
                        <Trophy className="w-6 h-6 lg:w-8 lg:h-8" />
                    </div>
                    <div>
                        <h1 className="text-xl lg:text-2xl font-black text-white uppercase tracking-widest mb-1 leading-tight">Sales War Room</h1>
                        <p className="text-[9px] lg:text-[10px] text-white/50 uppercase font-bold tracking-widest">Institutional Performance Matrix</p>
                    </div>
                </div>

                {/* Center: Live Overview Quick Stats */}
                <div className="flex items-center gap-12 relative z-10">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-white/60 uppercase tracking-widest mb-1">Total Yield</span>
                        <span className="text-xl font-black text-white tracking-widest">$612.4k</span>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-white/60 uppercase tracking-widest mb-1">Active Agents</span>
                        <span className="text-xl font-black text-emerald-400 tracking-widest">12/12</span>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-white/60 uppercase tracking-widest mb-1">Sync Status</span>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[11px] font-black text-white uppercase tracking-widest">Active</span>
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="relative z-10 shrink-0">
                    <Button variant="outline" size="md" className="h-12 px-6 text-[10px] font-bold uppercase border-white/10 hover:bg-white/5 hover:text-coral transition-all rounded-2xl whitespace-nowrap">
                        <Download className="w-4 h-4 mr-2" />
                        Ledger
                    </Button>
                </div>
            </div>


            <div className="grid grid-cols-12 gap-8">
                {/* Left: The Main Combat Arena (Leaderboards) */}
                <div className="col-span-12 xl:col-span-8 space-y-8">
                    <MagicBento className="grid grid-cols-1 gap-8">
                        <ParticleCard className="bg-[#11141D] py-8 px-6 lg:px-10 lg:py-8 rounded-card border border-white/10 relative overflow-hidden magic-bento-card">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-5">
                                    <div className="p-2 bg-coral/10 rounded-xl text-coral">
                                        <Target className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-black text-white uppercase tracking-[0.4em]">Elite Sales Intelligence Matrix</h2>
                                        <p className="text-[10px] text-coral/80 uppercase font-black mt-1">Live Individual Performance vs Targets</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                        <span className="text-[9px] font-black text-white uppercase tracking-widest leading-none">Sync: Active</span>
                                    </div>
                                </div>
                            </div>
                            <DetailedSalesLeaderboard />
                        </ParticleCard>
                    </MagicBento>
                </div>

                {/* Right: Gamification & Targets */}
                <div className="col-span-12 xl:col-span-4 space-y-8">
                    <MagicBento className="grid grid-cols-1 gap-8">
                        {/* War Room Live Feed */}
                        <ParticleCard className="bg-[#11141D] p-6 lg:p-8 rounded-card border border-white/5 magic-bento-card">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <Zap className="w-5 h-5 text-coral" />
                                    <h3 className="text-xs font-black text-white uppercase tracking-widest">Live Yield Stream</h3>
                                </div>
                                <span className="text-[9px] font-black text-coral/60 uppercase">Last 24 Hours</span>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { agent: "Dmitry K.", action: "Closed High-Check Deal", val: "$12,400", time: "Just Now", type: "gold" },
                                    { agent: "Alex R.", action: "Demo Masterclass Completed", val: "Installation VIP", time: "12m ago", type: "silver" },
                                    { agent: "Igor B.", action: "Multi-Service upsell triggered", val: "+$4,200", time: "28m ago", type: "success" },
                                    { agent: "System", action: "Reactivation Pool Extraction", val: "$2,800", time: "44m ago", type: "neutral" },
                                ].map((event, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-5">
                                            <div className={`w-1.5 h-10 rounded-full ${event.type === 'gold' ? 'bg-coral' : event.type === 'success' ? 'bg-emerald-500' : 'bg-white/20'}`} />
                                            <div>
                                                <p className="text-[10px] font-black text-white uppercase tracking-tight">{event.agent}</p>
                                                <p className="text-[11px] font-bold text-white uppercase mt-0.5">{event.action}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[12px] font-black text-white">{event.val}</p>
                                            <p className="text-[8px] font-black text-white/80 uppercase mt-0.5">{event.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ParticleCard>

                        {/* The "Big Pie" Bonus Pool */}
                        <ParticleCard className="bg-[#11141D] p-6 lg:p-8 rounded-card border border-white/5 relative overflow-hidden group magic-bento-card">
                            <div className="absolute -right-4 -top-4 p-8 text-white/[0.02]">
                                <Coins className="w-32 h-32" />
                            </div>
                            <div className="flex items-center justify-between mb-12 relative z-10">
                                <div>
                                    <h3 className="text-xs font-black text-white uppercase tracking-widest">Bonus Pool Split</h3>
                                    <p className="text-[10px] text-white/50 uppercase font-bold mt-1">Current Reward Pie</p>
                                </div>
                                <Award className="w-5 h-5 text-coral" />
                            </div>
                            <BonusPieChart />
                            <div className="mt-8 p-4 bg-coral/5 border border-coral/10 rounded-2xl relative z-10">
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Manager&apos;s Insight</p>
                                <p className="text-[11px] font-bold text-white uppercase leading-relaxed text-center italic">
                                    &quot;The top 3 performers are currently eating 75% of the bonus yield. Time to raid the accounts!&quot;
                                </p>
                            </div>
                        </ParticleCard>

                        {/* Team Synergy Pairings */}
                        <ParticleCard className="bg-[#11141D] p-6 lg:p-8 rounded-card border border-white/5 magic-bento-card">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xs font-black text-white uppercase tracking-widest">Combat Pairings</h3>
                                <Users className="w-4 h-4 text-white/20" />
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-white/20 uppercase">Best Pairing</p>
                                        <p className="text-xs font-black text-white uppercase">Dmitry + Igor</p>
                                    </div>
                                    <span className="text-[10px] font-black text-emerald-500 underline decoration-2 underline-offset-4">98% Synergy</span>
                                </div>
                                <div className="h-px bg-white/5" />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-white/20 uppercase">Critical Action</p>
                                        <p className="text-xs font-black text-white uppercase">Alex R. + Svetlana</p>
                                    </div>
                                    <span className="text-[10px] font-black text-coral">Urgent Demo Hand-off</span>
                                </div>
                            </div>
                        </ParticleCard>
                    </MagicBento>

                    {/* Tech & Support Node */}
                    <div className="bg-coral p-0.5 rounded-card">
                        <div className="bg-[#11141D] rounded-[2.45rem] p-6 lg:p-8">
                            <div className="flex flex-col items-center text-center gap-5">
                                <div className="p-4 bg-coral/10 rounded-full text-coral">
                                    <Rocket className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Elite Tech Node</h3>
                                    <p className="text-[9px] text-white/30 uppercase mt-2 font-bold leading-relaxed px-4">
                                        Engineering is on standby for high-check closures. 24/7 technical support for complex installs.
                                    </p>
                                </div>
                                <Button className="w-full h-14 rounded-2xl bg-coral text-black font-black uppercase text-[11px] tracking-widest hover:scale-[1.02] active:scale-95 transition-all">
                                    Request Technical Audit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TV Signature Footer */}
            <div className="bg-[#11141D] p-6 rounded-card border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        <span className="text-[11px] font-black text-white uppercase tracking-[0.3em]">War Room Security: Active</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Headphones className="w-5 h-5 text-coral" />
                        <span className="text-[11px] font-bold text-white uppercase tracking-widest">Live Agents Synchronized</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-3 py-1 bg-white/10 rounded-full border border-white/10">
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">Shift Ends: 02h 14m</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Pulse Active</span>
                </div>
            </div>
        </div>
    );
}
