"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Target, Award, DollarSign, Zap, Briefcase } from "lucide-react";
import ParallaxCard from "../ui/ParallaxCard";
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
        <div className="bg-white/5 border border-white/10 rounded-card py-2 px-5 relative overflow-hidden group/team transition-all duration-500">
            <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover/team:opacity-100 transition-opacity" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 relative z-10">
                {/* Team Identity */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className={cn("p-2 rounded-xl bg-opacity-20 flex items-center justify-center shadow-lg", color)}>
                        <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div className="space-y-0.5">
                        <h3 className="text-base lg:text-lg font-display font-bold text-white uppercase tracking-tight leading-none">{title}</h3>
                        <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest">{members.length} Сотрудников</p>
                    </div>
                </div>

                {/* Team Specific Progress Matrix */}
                <div className="flex-1 w-full bg-black/5 dark:bg-black/40 rounded-full p-2.5 px-6 border border-black/5 dark:border-white/10 max-w-xl">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Эффективность</span>
                            <span className="px-1.5 py-0.5 bg-coral/20 border border-coral/30 rounded-full text-[8px] font-bold text-coral uppercase tracking-tighter">{status}</span>
                        </div>
                        <span className="text-xl font-display font-bold text-white tracking-tighter">{progress}%</span>
                    </div>

                    <div className="relative h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden p-0">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            transition={{ duration: 2, ease: "circOut" }}
                            className={cn("h-full rounded-full relative", color)}
                        >
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 px-2">
            {members.map((member, i) => (
                <Link key={i} href={`/sales-command/${member.name === "Александр" ? "alexander" : member.name === "Евгений Ж." ? "evgeny_zh" : "angelica"}`}>
                    {/* Simplistic mapping for link, ideally utilize ID from source but interface here uses name */}
                    <ParallaxCard
                        tiltDepth={8}
                        glareOpacity={0}
                        className="bg-surface dark:bg-dark-surface border border-black/5 dark:border-white/5 rounded-card overflow-hidden group hover:border-coral/30 transition-all cursor-pointer relative flex flex-col h-full"
                    >
                        {/* TOP: Large Dominant Portrait */}
                        <div className="relative h-64 w-full overflow-hidden shrink-0">
                            <img
                                src={member.photo}
                                alt={member.name}
                                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface dark:from-dark-surface via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />

                            {/* Status Overlay */}
                            <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'active' ? 'bg-emerald-400' : member.status === 'away' ? 'bg-orange-400' : 'bg-white/40'}`} />
                                <span className="text-[9px] font-bold text-white uppercase tracking-widest">{member.status}</span>
                            </div>

                            {/* Name Overlay */}
                            <div className="absolute bottom-5 left-5 right-5">
                                <h4 className="text-[18px] font-display font-bold text-white tracking-tight leading-none mb-1.5">{member.name}</h4>
                                <p className="text-[10px] font-bold text-white/90 uppercase tracking-widest tracking-[0.2em]">{member.role}</p>
                            </div>
                        </div>

                        {/* BOTTOM: Performance Matrix */}
                        <div className="p-5 flex-1 flex flex-col gap-3">
                            {/* Primary Yield Block (Fact vs Plan) */}
                            <div className="bg-white/5 border border-white/10 p-4 rounded-3xl transition-all relative overflow-hidden">
                                <div className="flex flex-col gap-0.5 relative z-10">
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Валовая прибыль</span>
                                    <div className="flex items-end justify-between">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <span className="text-[9px] font-bold text-white/60 uppercase">План:</span>
                                                <span className="text-[11px] font-bold text-white tracking-widest">{member.yield.plan}</span>
                                            </div>
                                            <span className="text-[26px] font-display font-bold text-white leading-none tracking-tighter">{member.yield.fact}</span>
                                        </div>
                                        <div className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${member.progress >= 90 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-coral/20 text-white'}`}>
                                            {member.progress}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary KPIs: Contracts & Estimates (Plan vs Fact) */}
                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">Договоры</span>
                                    </div>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-[14px] font-bold text-white">{member.contracts.fact}</span>
                                        <span className="text-[10px] font-medium text-white/50">/ {member.contracts.plan}</span>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">Замеры</span>
                                    </div>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-[14px] font-bold text-white">{member.estimates.fact}</span>
                                        <span className="text-[10px] font-medium text-white/50">/ {member.estimates.plan}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tertiary KPIs: Avg Check & Conversion */}
                            <div className="grid grid-cols-2 gap-2 mt-1">
                                <div className="px-2 flex flex-col gap-0.5">
                                    <span className="text-[9px] font-bold text-white/60 uppercase leading-none">Ср. Чек</span>
                                    <span className="text-[12px] font-display font-bold text-white leading-none tracking-tight">{member.avgCheck}</span>
                                </div>
                                <div className="px-2 flex flex-col gap-0.5 border-l border-white/10">
                                    <span className="text-[9px] font-bold text-white/60 uppercase leading-none text-right">Конверсия</span>
                                    <span className="text-[12px] font-display font-bold text-emerald-400 leading-none tracking-tight text-right">{member.conversion}</span>
                                </div>
                            </div>

                            {/* Quota Progress */}
                            <div className="mt-1 pt-3 border-t border-black/5 dark:border-white/5">
                                <div className="relative h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${Math.min(member.progress, 100)}%` }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className={cn("h-full rounded-full shadow-sm", color === 'bg-coral' ? 'bg-coral' : 'bg-emerald-500')}
                                    />
                                    {member.progress > 100 && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${member.progress - 100}%` }}
                                            className="absolute inset-0 bg-white/40"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </ParallaxCard>
                </Link>
            ))}
        </div>
    </div>
);

const PHOTOS = [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
];

export function DetailedSalesLeaderboard() {
    const installationTeam: SalesMember[] = SALES_PEOPLE.map((person, idx) => {
        const data = SALES_DATA[person.id];
        // If data missing, fallback (shouldn't happen with correct data setup)
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
            contracts: { fact: data.contracts, plan: 5 }, // Plan hardcoded or derived
            estimates: { fact: data.approvedTests, plan: 25 }, // "Замеры" mapped to approvedTests
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
            photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2a04?auto=format&fit=crop&q=80&w=300"
        },
        {
            name: "Максим П.", role: "Младший Инженер", progress: 45, status: "idle",
            yield: { fact: "36 000 ₽", plan: "80 000 ₽" },
            contracts: { fact: 12, plan: 25 },
            estimates: { fact: 24, plan: 40 },
            avgCheck: "3 000 ₽",
            conversion: "50.0%",
            photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300"
        },
        {
            name: "Игорь Б.", role: "Старший Инженер", progress: 88, status: "active",
            yield: { fact: "88 400 ₽", plan: "100 000 ₽" },
            contracts: { fact: 22, plan: 25 },
            estimates: { fact: 38, plan: 40 },
            avgCheck: "4 018 ₽",
            conversion: "57.9%",
            photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300"
        },
        {
            name: "Олег М.", role: "Старший Инженер", progress: 72, status: "active",
            yield: { fact: "62 000 ₽", plan: "85 000 ₽" },
            contracts: { fact: 15, plan: 20 },
            estimates: { fact: 28, plan: 35 },
            avgCheck: "4 133 ₽",
            conversion: "53.6%",
            photo: "https://images.unsplash.com/photo-1548449112-96a38a643324?auto=format&fit=crop&q=80&w=300"
        },
        {
            name: "Анна С.", role: "Сервисный Инженер", progress: 68, status: "active",
            yield: { fact: "58 000 ₽", plan: "85 000 ₽" },
            contracts: { fact: 14, plan: 20 },
            estimates: { fact: 25, plan: 35 },
            avgCheck: "4 142 ₽",
            conversion: "56.0%",
            photo: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=300"
        },
        {
            name: "Иван С.", role: "Специалист", progress: 81, status: "active",
            yield: { fact: "92 000 ₽", plan: "110 000 ₽" },
            contracts: { fact: 25, plan: 30 },
            estimates: { fact: 38, plan: 45 },
            avgCheck: "3 680 ₽",
            conversion: "65.8%",
            photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300"
        },
    ];

    return (
        <div className="space-y-12">
            <SalesTeamSection
                title="Отдел Продаж Монтажа"
                members={installationTeam}
                color="bg-coral"
                target="450 000 ₽"
                progress={88.4}
                status="Высокая нагрузка"
            />
            <div className="h-px bg-white/5 mx-4" />
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
