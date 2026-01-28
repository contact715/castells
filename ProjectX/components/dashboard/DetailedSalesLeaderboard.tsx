"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Target, Award, DollarSign, Zap, Briefcase, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SALES_PEOPLE, SALES_DATA } from "@/lib/sales-data";

interface SalesMember {
    name: string;
    role: string;
    photo: string;
    status: 'active' | 'idle' | 'away';
    progress: number;
    // Core KPIs
    yield: { fact: string; plan: string };
    contracts: { fact: number; plan: number };
    estimates: { fact: number; plan: number };
    // Derived/Stand-alone
    avgCheck: string;
    conversion: string;
}

interface TeamProps {
    title: string;
    members: SalesMember[];
    color: string;
    target: string;
    progress: number;
    status: string;
}

const SalesTeamSection = ({ title, members, color, target, progress, status }: TeamProps) => (
    <div className="space-y-8">
        {/* Team Header & Progress Node */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-card py-3 px-6 relative overflow-hidden group/team transition-all duration-500 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-0 group-hover/team:opacity-100 transition-opacity duration-700" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
                {/* Team Identity */}
                <div className="flex items-center gap-4 shrink-0">
                    <div className={cn("p-2.5 rounded-xl bg-opacity-20 flex items-center justify-center shadow-lg ring-1 ring-white/10", color)}>
                        <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight leading-none">{title}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">{members.length} Сотрудников</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">{status}</span>
                        </div>
                    </div>
                </div>

                {/* Team Specific Progress Matrix */}
                <div className="flex-1 w-full bg-white/[0.03] backdrop-blur-md rounded-full p-2 pl-4 border border-white/5 max-w-xl shadow-inner">
                    <div className="flex items-center justify-between gap-4 h-full">
                        <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest shrink-0">Эффективность Отдела</span>

                        <div className="flex-1 relative h-2 bg-black/20 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${progress}%` }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className={cn("h-full rounded-full relative shadow-[0_0_10px_rgba(255,255,255,0.2)]", color)}
                            />
                        </div>

                        <span className="text-lg font-display font-bold text-white tracking-tighter w-12 text-right">{progress}%</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-1">
            {members.map((member, i) => (
                <Link key={i} href={`/sales-command/${member.name === "Александр" ? "alexander" : member.name === "Евгений Ж." ? "evgeny_zh" : "angelica"}`} className="block h-full">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white/[0.01] backdrop-blur-2xl border border-white/10 rounded-[24px] overflow-hidden group hover:border-white/20 hover:bg-white/[0.03] hover:translate-y-[-2px] hover:shadow-2xl transition-all duration-300 relative h-full flex flex-col"
                    >
                        {/* TOP: Image & Overlay */}
                        <div className="relative h-60 w-full shrink-0">
                            <img
                                src={member.photo}
                                alt={member.name}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                            {/* Unified Glass Gradient Overlay - Darkens bottom for text legibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-transparent opacity-90" />

                            {/* Status Badge */}
                            <div className={`absolute top-4 left-4 px-3 py-1.5 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 shadow-lg ${member.status === 'active' ? 'bg-emerald-500/20 ring-1 ring-emerald-500/30' : 'bg-black/40'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-white/40'}`} />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${member.status === 'active' ? 'text-emerald-100' : 'text-white/70'}`}>
                                    {member.status === 'active' ? 'ONLINE' : member.status}
                                </span>
                            </div>

                            {/* Info Overlay */}
                            <div className="absolute bottom-4 left-5 right-5 z-10">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <h4 className="text-[22px] font-display font-bold text-white tracking-tight leading-none mb-1.5 shadow-black/50 drop-shadow-lg">{member.name}</h4>
                                        <p className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] shadow-black/50 drop-shadow-md">{member.role}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-coral group-hover:border-coral group-hover:text-white transition-all duration-300">
                                        <ArrowUpRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM: DATA BODY (Transparent Glass) */}
                        <div className="p-4 flex-1 flex flex-col gap-3 relative">

                            {/* MAIN KPI: GROSS PROFIT - Semi-transparent Glass Block */}
                            <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5 group-hover:border-white/10 transition-colors relative overflow-hidden backdrop-blur-md">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Gross Profit</span>
                                    {member.progress >= 100 && (
                                        <Award className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[32px] font-display font-medium text-white tracking-tight leading-tight tabular-nums drop-shadow-sm">
                                        {member.yield.fact}
                                    </span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Plan: {member.yield.plan}</span>
                                        <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${member.progress >= 90 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/50'}`}>
                                            {member.progress}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SECONDARY METRICS: GRID */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Contracts */}
                                <div className="bg-white/[0.03] rounded-2xl p-3 border border-white/5 flex flex-col justify-between h-20 backdrop-blur-md">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Deals</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-display font-bold text-white tabular-nums">{member.contracts.fact}</span>
                                        <span className="text-[10px] text-white/30 font-medium">/ {member.contracts.plan}</span>
                                    </div>
                                </div>
                                {/* Estimates */}
                                <div className="bg-white/[0.03] rounded-2xl p-3 border border-white/5 flex flex-col justify-between h-20 backdrop-blur-md">
                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Estimates</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-display font-bold text-white tabular-nums">{member.estimates.fact}</span>
                                        <span className="text-[10px] text-white/30 font-medium">/ {member.estimates.plan}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1" />

                            {/* TERTIARY METRICS TABLE */}
                            <div className="flex items-center justify-between px-2 pt-2 border-t border-white/5 text-center">
                                <div>
                                    <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest mb-0.5">Check</p>
                                    <p className="text-xs font-bold text-white/80 tabular-nums">{member.avgCheck}</p>
                                </div>
                                <div className="w-px h-6 bg-white/5" />
                                <div>
                                    <p className="text-[9px] text-white/30 uppercase font-bold tracking-widest mb-0.5">Conv.</p>
                                    <p className={`text-xs font-bold tabular-nums ${parseFloat(member.conversion) > 50 ? 'text-emerald-400' : 'text-white/80'}`}>{member.conversion}</p>
                                </div>
                            </div>

                        </div>

                        {/* PROGRESS BAR BOTTOM (FULL WIDTH) */}
                        <div className="relative h-1 w-full bg-white/[0.05] mt-auto">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${Math.min(member.progress, 100)}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className={cn("h-full absolute left-0 top-0 shadow-[0_0_10px_currentColor]", color)}
                            />
                        </div>

                    </motion.div>
                </Link>
            ))}
        </div>
    </div>
);

const PHOTOS = [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
];

export function DetailedSalesLeaderboard() {
    const installationTeam: SalesMember[] = SALES_PEOPLE.map((person, idx) => {
        const data = SALES_DATA[person.id];
        if (!data) return null;

        return {
            name: person.name,
            role: person.role,
            status: person.status,
            progress: Math.round((data.salesAmount / data.plan) * 100),
            yield: {
                fact: data.salesAmount.toLocaleString() + " ₽",
                plan: data.plan.toLocaleString() + " ₽"
            },
            contracts: { fact: data.contracts, plan: 5 },
            estimates: { fact: data.approvedTests, plan: 25 },
            avgCheck: data.contracts > 0 ? (data.salesAmount / data.contracts).toLocaleString() + " ₽" : "0 ₽",
            conversion: data.conversion.leadToContract.toFixed(1) + "%",
            photo: PHOTOS[idx % PHOTOS.length]
        };
    }).filter(Boolean) as SalesMember[];

    const serviceTeam: SalesMember[] = [
        {
            name: "Елена В.", role: "Сервисный Инженер", progress: 64, status: "active",
            yield: { fact: "76 800 ₽", plan: "100 000 ₽" },
            contracts: { fact: 18, plan: 25 },
            estimates: { fact: 32, plan: 45 },
            avgCheck: "4 266 ₽",
            conversion: "56.3%",
            photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2a04?auto=format&fit=crop&q=80&w=600"
        },
        {
            name: "Максим П.", role: "Младший Инженер", progress: 45, status: "idle",
            yield: { fact: "36 000 ₽", plan: "80 000 ₽" },
            contracts: { fact: 12, plan: 25 },
            estimates: { fact: 24, plan: 40 },
            avgCheck: "3 000 ₽",
            conversion: "50.0%",
            photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600"
        },
        {
            name: "Игорь Б.", role: "Старший Инженер", progress: 88, status: "active",
            yield: { fact: "88 400 ₽", plan: "100 000 ₽" },
            contracts: { fact: 22, plan: 25 },
            estimates: { fact: 38, plan: 40 },
            avgCheck: "4 018 ₽",
            conversion: "57.9%",
            photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600"
        },
    ];

    return (
        <div className="space-y-16 pb-20">
            <SalesTeamSection
                title="Отдел Продаж Монтажа"
                members={installationTeam}
                color="bg-coral"
                target="450 000 ₽"
                progress={88.4}
                status="Высокая нагрузка"
            />

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-[#0B1121] px-4 text-[10px] text-white/30 uppercase tracking-widest font-black">Sales Divisions</span>
                </div>
            </div>

            <SalesTeamSection
                title="Отдел Сервиса и Техподдержки"
                members={serviceTeam}
                color="bg-emerald-500"
                target="220 000 ₽"
                progress={72.1}
                status="В норме"
            />
        </div>
    );
}
