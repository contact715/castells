"use client";

import { motion } from "framer-motion";
import { User, TrendingUp, Target, Award, MoreVertical, Info } from "lucide-react";
import { useState } from "react";

import { SALES_PEOPLE, SALES_DATA } from "@/lib/sales-data";
import { GoldenSparkleEffect, GoldenGlowEffect, RedGlowEffect, RedBurnEffect, FireEffect } from "./StatusEffects";

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
            <div className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-card relative overflow-hidden group">
                <div className="absolute left-0 top-0 h-full w-1.5 bg-coral" />
                <div className="flex flex-col gap-1">
                    <h3 className="text-[11px] font-bold text-white uppercase tracking-widest">План Продаж</h3>
                    <p className="text-[9px] text-white/60 uppercase font-bold tracking-tight">Цель Отдела: {(teamPlan / 1000000).toFixed(1)}M ₽</p>
                </div>
                <div className="text-right">
                    <div className="text-[26px] font-display font-bold text-white tracking-tighter leading-none">{Math.round(teamAverage)}%</div>
                    <div className="text-[9px] font-bold text-coral uppercase tracking-widest mt-1">Ожидаемое выполнение</div>
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
                        className="bg-surface dark:bg-dark-surface border border-black/5 dark:border-white/5 rounded-card p-5 relative group hover:border-coral/30 hover:shadow-2xl transition-all cursor-default overflow-hidden"
                    >
                        {/* ----------------- Visual Effects Layer ----------------- */}
                        {/* 1. Golden Sparkle (>= 100%) */}
                        {member.progress >= 100 && <GoldenSparkleEffect />}

                        {/* 2. Golden Glow (80-99%) */}
                        {member.progress >= 80 && member.progress < 100 && <GoldenGlowEffect />}

                        {/* 3. Red Glow (< 80%) */}
                        {member.progress < 80 && member.progress >= 50 && <RedGlowEffect />}

                        {/* 4. Red Burn (< 50%) */}
                        {member.progress < 50 && <RedBurnEffect />}

                        {/* 5. Fire Effect (Daily Plan Met) */}
                        {member.dailyPlanMet && <FireEffect />}
                        {/* -------------------------------------------------------- */}

                        {/* Status Pulse */}
                        <div className="absolute top-4 left-4 flex gap-1.5 items-center z-10">
                            <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'active' ? 'bg-emerald-400' : member.status === 'idle' ? 'bg-orange-400' : 'bg-white/20'}`} />
                            <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">{member.status}</span>
                        </div>

                        {/* More Info */}
                        <button className="absolute top-4 right-4 text-white/10 hover:text-white transition-colors z-10">
                            <MoreVertical className="w-4 h-4" />
                        </button>

                        <div className="flex flex-col items-center text-center mt-4 relative z-10">
                            {/* Avatar / Portrait */}
                            <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center relative mb-4 group-hover:border-coral/40 transition-all">
                                <span className="text-2xl font-display font-bold text-text-primary dark:text-white group-hover:scale-110 transition-all">{member.avatar}</span>
                                <div className="absolute -bottom-1 -right-1 p-1.5 bg-coral rounded-full border-4 border-surface dark:border-dark-surface text-white">
                                    <Award className="w-3.5 h-3.5" />
                                </div>
                            </div>

                            <h4 className="text-[13px] font-bold text-white uppercase tracking-tight mb-1">{member.name}</h4>
                            <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest mb-6">{member.role}</p>

                            {/* KPI Matrix */}
                            <div className="w-full space-y-4">
                                <div>
                                    <div className="flex justify-between items-end mb-1.5 px-1">
                                        <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">Прогресс</span>
                                        <span className={`text-[10px] font-bold ${member.progress >= 100 ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' :
                                                member.progress >= 80 ? 'text-amber-500' :
                                                    member.progress < 50 ? 'text-red-500' : 'text-coral'
                                            }`}>{member.progress}%</span>
                                    </div>
                                    <div className="relative h-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${Math.min(member.progress, 100)}%` }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            className={`absolute inset-y-0 left-0 rounded-full ${member.progress >= 100 ? 'bg-amber-400 shadow-[0_0_10px_#fbbf24]' :
                                                    member.progress < 50 ? 'bg-red-600' : 'bg-coral'
                                                }`}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                                    <div className="text-left font-satoshi">
                                        <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Текущий</p>
                                        <p className="text-xs font-bold text-white mt-0.5">{member.current}</p>
                                    </div>
                                    <div className="text-right font-satoshi">
                                        <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Цель</p>
                                        <p className="text-xs font-bold text-white/80 mt-0.5">{member.target}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hover Overlay Aesthetic - Glow Disabled */}
                        <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0" />
                    </motion.div>
                ))}
            </div>

            {/* Performance Insights Tip */}
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-card flex items-center gap-4">
                <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                    <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest">Инсайт: {topPerformer?.name} перевыполняет план ({topPerformer?.progress}%)</p>
                    <p className="text-[9px] text-white/60 uppercase font-medium mt-0.5">Высокая вероятность закрытия квартала.</p>
                </div>
            </div>

        </div>
    );
}
