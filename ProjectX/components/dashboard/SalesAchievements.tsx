"use client";

import { Card } from "@/components/ui/Card";
import { Award, Star, Zap, Trophy, ShieldCheck, Flame, Target, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { SALES_DATA, SALES_PEOPLE } from "@/lib/sales-data";

interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    date: string;
    unlocked: boolean;
}

export function SalesAchievements({ salespersonId = "alexander" }: { salespersonId?: string }) {
    // Lookup data
    // Handle case where ID might not directly match (e.g. if passed as name), but assuming ID for now.
    // Fallback to first person if not found for safety.
    const person = SALES_PEOPLE.find(p => p.id === salespersonId) || SALES_PEOPLE[0];
    const data = SALES_DATA[person.id];

    if (!data) return null;

    // Dynamic Achievement Logic
    const achievements: Achievement[] = [
        {
            id: 1,
            title: "Лидер Гонки",
            description: "Оборот > 500к ₽",
            icon: Trophy,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            date: "Текущий",
            unlocked: data.salesAmount > 500000
        },
        {
            id: 2,
            title: "Снайпер",
            description: "Конверсия в договор > 15%",
            icon: Target,
            color: "text-coral",
            bg: "bg-coral/10",
            date: "Текущий",
            unlocked: data.conversion.leadToContract > 15
        },
        {
            id: 3,
            title: "Флеш",
            description: "Реакция на лид < 5 мин",
            icon: Zap,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            date: "10 Мая",
            unlocked: true // Hardcoded for now as no metric
        },
        {
            id: 4,
            title: "Легенда",
            description: "Выполнение плана 3 мес. подряд",
            icon: Crown,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            date: "-",
            unlocked: false // Hardcoded
        },
        {
            id: 5,
            title: "Без Ошибок",
            description: "Идеальная дисциплина (0 штрафов)",
            icon: ShieldCheck,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            date: "Текущий",
            unlocked: data.fines === 0
        },
        {
            id: 6,
            title: "Машина",
            description: "100+ звонков за отчетный период",
            icon: Flame,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            date: "Текущий",
            unlocked: data.calls > 100
        },
    ];

    // Calculate level based on unlocked achievements
    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const level = 40 + unlockedCount;
    const xp = 12000 + (unlockedCount * 450);

    return (
        <Card variant="default" className="p-8 h-full bg-[#11141D] border-white/10">
            <div className="flex items-center gap-3 mb-8">
                <Award className="w-5 h-5 text-coral" />
                <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Зал Славы</h3>
                    <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mt-0.5">Достижения и Награды</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-start gap-4 p-4 rounded-2xl border transition-all relative overflow-hidden group ${item.unlocked
                            ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                            : 'bg-transparent border-white/5 opacity-50 grayscale'
                            }`}
                    >
                        {/* Hover Gradient for Unlocked */}
                        {item.unlocked && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        )}

                        <div className={`p-3 rounded-xl ${item.unlocked ? item.bg : 'bg-white/5'} ${item.unlocked ? item.color : 'text-white/20'} relative z-10`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                        <div className="relative z-10 flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className={`text-xs font-black uppercase tracking-tight ${item.unlocked ? 'text-white' : 'text-white/40'}`}>
                                    {item.title}
                                </h4>
                                {item.unlocked && <span className="text-[9px] font-bold text-white/30">{item.date}</span>}
                            </div>
                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1 leading-snug">
                                {item.description}
                            </p>
                            {!item.unlocked && (
                                <div className="mt-2 text-[9px] font-black text-white/20 uppercase tracking-widest flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                    Не получено
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <span>Рейтинг активности</span>
                    <span className="text-white">Level {level} · {xp.toLocaleString()} XP</span>
                </div>
                <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-coral rounded-full" style={{ width: `${60 + (unlockedCount * 5)}%` }} />
                </div>
            </div>
        </Card>
    );
}
