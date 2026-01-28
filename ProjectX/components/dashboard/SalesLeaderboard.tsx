"use client";

import { motion } from "framer-motion";
import { User, TrendingUp, Target, Award, MoreVertical, Info, Zap } from "lucide-react";
import { useState } from "react";

import { SALES_PEOPLE, SALES_DATA } from "@/lib/sales-data";
import { GoldenSparkleEffect, GoldenGlowEffect, RedGlowEffect, RedBurnEffect, FireEffect } from "./StatusEffects";
import { cn } from "@/lib/utils";

export function SalesLeaderboard() {
    const salesTeam = SALES_PEOPLE.map(person => {
        const data = SALES_DATA[person.id];
        if (!data) return null;

        return {
            name: person.name,
            role: person.role,
            progress: Math.round((data.salesAmount / data.plan) * 100),
            target: (data.plan / 1000).toFixed(0) + "k ₽",
            current: (data.salesAmount / 1000).toFixed(1) + "k ₽",
            avatar: person.name.split(' ').map(n => n[0]).join(''),
            status: person.status,
            dailyPlanMet: data.dailyPlanMet
        };
    }).filter(Boolean) as any[];

    const teamAverage = salesTeam.length > 0
        ? salesTeam.reduce((acc, s) => acc + s.progress, 0) / salesTeam.length
        : 0;

    const teamPlan = Object.values(SALES_DATA)[0]?.teamPlan || 3000000;
    const topPerformer = salesTeam.reduce((max, p) => p.progress > max.progress ? p : max, salesTeam[0]);

    return (
        <div className="space-y-8">
            {/* Team Progress Header */}
            <div className="flex items-center justify-between p-6 bg-black/40 backdrop-blur-xl border border-primary/20 rounded-card relative overflow-hidden group shadow-[0_0_20px_rgba(var(--accent),0.04)]">
                <div className="absolute left-0 top-0 h-full w-1 bg-primary shadow-[0_0_10px_rgba(var(--accent),0.35)]" />
                <div className="flex flex-col gap-1 pl-4">
                    <h3 className="text-[11px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-3 h-3 text-primary" />
                        Sales Ops
                    </h3>
                    <p className="text-[9px] text-white/50 uppercase font-bold tracking-tight">Team Goal: {(teamPlan / 1000000).toFixed(1)}M ₽</p>
                </div>
                <div className="text-right">
                    <div className="text-[26px] font-display font-bold text-white tracking-tighter leading-none">{Math.round(teamAverage)}%</div>
                    <div className="text-[9px] font-bold text-primary uppercase tracking-widest mt-1">Projection</div>
                </div>
            </div>

            {/* Individual Tiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {salesTeam.map((member, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-black/20 backdrop-blur-xl border border-white/5 rounded-card p-5 relative group hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(var(--accent),0.12)] transition-all cursor-default overflow-hidden"
                    >
                        {/* ----------------- Visual Effects Layer ----------------- */}
                        {/* 1. Golden Sparkle (>= 100%) - Kept for excellence */}
                        {member.progress >= 100 && <GoldenSparkleEffect />}

                        {/* 2. Accent glow for high performers */}
                        {member.progress >= 80 && member.progress < 100 && (
                            <div className="absolute inset-0 bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors" />
                        )}

                        {/* 3. Red Glow (< 80%) */}
                        {member.progress < 50 && <RedGlowEffect />}

                        {/* -------------------------------------------------------- */}

                        {/* Status Pulse */}
                        <div className="absolute top-4 left-4 flex gap-1.5 items-center z-10">
                            <div className={cn("w-1.5 h-1.5 rounded-full",
                                member.status === 'active' ? 'bg-primary shadow-[0_0_5px_rgba(var(--accent),0.35)]' :
                                    member.status === 'idle' ? 'bg-yellow-500' : 'bg-white/20'
                            )} />
                            <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">{member.status}</span>
                        </div>

                        {/* More Info */}
                        <button className="absolute top-4 right-4 text-white/10 hover:text-white transition-colors z-10">
                            <MoreVertical className="w-4 h-4" />
                        </button>

                        <div className="flex flex-col items-center text-center mt-4 relative z-10">
                            {/* Avatar / Portrait */}
                            <div className="w-20 h-20 rounded-full bg-black/40 border border-white/5 flex items-center justify-center relative mb-4 group-hover:border-primary/40 transition-all">
                                <span className="text-2xl font-display font-bold text-white group-hover:scale-110 transition-all">{member.avatar}</span>
                                <div className="absolute -bottom-1 -right-1 p-1.5 bg-black rounded-full border border-primary/30 text-primary">
                                    <Award className="w-3.5 h-3.5" />
                                </div>
                            </div>

                            <h4 className="text-[13px] font-bold text-white uppercase tracking-tight mb-1">{member.name}</h4>
                            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-6">{member.role}</p>

                            {/* KPI Matrix */}
                            <div className="w-full space-y-4">
                                <div>
                                    <div className="flex justify-between items-end mb-1.5 px-1">
                                        <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">Progress</span>
                                        <span className={cn("text-[10px] font-bold",
                                            member.progress >= 100 ? "text-primary drop-shadow-[0_0_8px_rgba(var(--accent),0.35)]" :
                                                member.progress >= 80 ? "text-white" :
                                                    "text-red-500"
                                        )}>{member.progress}%</span>
                                    </div>
                                    <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${Math.min(member.progress, 100)}%` }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            className={cn("absolute inset-y-0 left-0 rounded-full",
                                                member.progress >= 100 ? "bg-gradient-to-r from-primary to-primary/50 shadow-[0_0_15px_rgba(var(--accent),0.3)]" :
                                                    member.progress < 50 ? "bg-gradient-to-r from-red-600 to-red-600/50" : "bg-white/60"
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                                    <div className="text-left font-satoshi">
                                        <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Actual</p>
                                        <p className="text-xs font-bold text-white mt-0.5">{member.current}</p>
                                    </div>
                                    <div className="text-right font-satoshi">
                                        <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Target</p>
                                        <p className="text-xs font-bold text-white/60 mt-0.5">{member.target}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
