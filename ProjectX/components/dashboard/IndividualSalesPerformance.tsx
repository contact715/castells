"use client";

import React from 'react';
import { Card } from "@/components/ui/Card";
import {
    Phone, Users, FileText, Target, Wallet, TrendingUp,
    ShieldCheck, AlertCircle, Clock, Zap, Star, Trophy
} from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { SalesAchievements } from "./SalesAchievements";
import { SALES_DATA, SALES_PEOPLE } from "@/lib/sales-data";

interface Metric {
    label: string;
    fact: number | string;
    plan: number | string;
    exec: number;
    bonus: number | string;
}

export const IndividualSalesPerformance = ({ salespersonId = "alexander" }) => {
    // Lookup person and data
    const person = SALES_PEOPLE.find(p => p.id === salespersonId) || SALES_PEOPLE[0];
    const data = SALES_DATA[person.id];

    if (!data) {
        return <div className="p-8 text-white">Data not found for {salespersonId}</div>;
    }

    // Calculate payouts
    const totalPayout = data.managerSalary + data.kpiBonus - data.fines;

    // Construct Metrics Table
    const metrics: Metric[] = [
        { label: "Новые Лиды", fact: data.newLeads, plan: 60, exec: Math.round((data.newLeads / 60) * 100), bonus: 0 },
        { label: "Всего Звонков", fact: data.calls, plan: 400, exec: Math.round((data.calls / 400) * 100), bonus: 0 },
        { label: "Эфф. Звонки", fact: data.resultCalls, plan: 200, exec: Math.round((data.resultCalls / 200) * 100), bonus: 0 },
        { label: "Замеры (Назнач)", fact: data.approvedTests, plan: 25, exec: Math.round((data.approvedTests / 25) * 100), bonus: 2500 },
        { label: "Замеры (Оплат)", fact: data.paidTests, plan: 15, exec: Math.round((data.paidTests / 15) * 100), bonus: 1250 },
        { label: "Договоры", fact: data.contracts, plan: 5, exec: Math.round((data.contracts / 5) * 100), bonus: 1500 },
        { label: "Оборот", fact: data.salesAmount, plan: data.plan, exec: Math.round((data.salesAmount / data.plan) * 100), bonus: 2950 },
    ];

    const compliance = [
        { label: "Ведение CRM", fine: 0, status: "Норма" },
        { label: "Скрипты и Регламенты", fine: 0, status: "Норма" },
        { label: "Сдача Отчетности", fine: 0, status: "Норма" },
        { label: "Опоздания", fine: data.fines, status: data.fines > 0 ? "Нарушение" : "Норма" },
    ];

    const conversions = [
        { label: "Лид -> Замер", val: `${data.conversion.leadToApproved.toFixed(1)}%`, icon: <Users className="w-4 h-4" /> },
        { label: "Замер -> Оплата", val: `${data.conversion.approvedToPaid.toFixed(1)}%`, icon: <FileText className="w-4 h-4" /> },
        { label: "Звонок -> Замер", val: `${data.conversion.callToApproved.toFixed(1)}%`, icon: <Phone className="w-4 h-4" /> },
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Profile Header */}
            <Card className="bg-[#11141D] p-6 lg:p-8 border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 text-white/[0.02]">
                    <Trophy className="w-48 h-48 rotate-12" />
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-coral/10 border-2 border-coral/20 flex items-center justify-center overflow-hidden">
                            {/* Use mock avatar or initial */}
                            {person.avatar ? (
                                <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                }} />
                            ) : null}
                            <span className={`text-3xl font-black text-coral ${person.avatar ? 'hidden' : ''}`}>{person.name[0]}</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white uppercase tracking-widest">{person.name}</h1>
                            <p className="text-[10px] text-coral font-black uppercase tracking-[0.3em] mt-1">{person.role}</p>
                            <div className="flex items-center gap-4 mt-4">
                                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                    <span className="text-[9px] font-black text-white/50 uppercase">Уровень</span>
                                    <span className="text-[9px] font-black text-white uppercase ml-2">Expert</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-3 h-3 text-coral fill-coral" />
                                    <span className="text-[10px] font-black text-white">4.9 CSAT</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-12">
                        <div className="flex flex-col items-center">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">К выплате за месяц</span>
                            <span className="text-2xl font-black text-emerald-400">{totalPayout.toLocaleString()} ₽</span>
                        </div>
                        <div className="w-px h-12 bg-white/10" />
                        <div className="flex flex-col items-center">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Выполнение KPI</span>
                            <span className="text-2xl font-black text-white">{data.kpiPercent}%</span>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Planning & Calculations */}
                <div className="lg:col-span-8 space-y-8">
                    <Card className="bg-[#11141D] border-white/10 p-0 overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-coral" />
                                <h3 className="text-sm font-black text-white uppercase tracking-widest">Матрица Показателей</h3>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-white/[0.01]">
                                        <th className="p-4 text-left text-[9px] font-black text-white/30 uppercase tracking-widest">Метрика</th>
                                        <th className="p-4 text-center text-[9px] font-black text-white/30 uppercase tracking-widest">Факт</th>
                                        <th className="p-4 text-center text-[9px] font-black text-white/30 uppercase tracking-widest">План</th>
                                        <th className="p-4 text-center text-[9px] font-black text-white/30 uppercase tracking-widest">Выполн. %</th>
                                        <th className="p-4 text-right text-[9px] font-black text-white/30 uppercase tracking-widest">Бонус (₽)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {metrics.map((m, i) => (
                                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="p-4 text-xs font-black text-white uppercase tracking-tight border-b border-white/5">{m.label}</td>
                                            <td className="p-4 text-center text-xs font-bold text-white border-b border-white/5">
                                                {typeof m.fact === 'number' && m.fact > 1000 ? `${(m.fact / 1000).toFixed(1)}k` : m.fact}
                                            </td>
                                            <td className="p-4 text-center text-xs font-bold text-white/40 border-b border-white/5">
                                                {typeof m.plan === 'number' && m.plan > 1000 ? `${(m.plan / 1000).toFixed(1)}k` : m.plan}
                                            </td>
                                            <td className="p-4 text-center border-b border-white/5">
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className={`text-[10px] font-black ${m.exec >= 100 ? 'text-emerald-400' : 'text-white'}`}>{m.exec}%</span>
                                                    <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                                        <div className={`h-full ${m.exec >= 100 ? 'bg-emerald-400' : 'bg-coral'} rounded-full`} style={{ width: `${Math.min(m.exec, 100)}%` }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right text-xs font-black text-emerald-400 border-b border-white/5">{m.bonus.toLocaleString()} ₽</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* Detailed Analytics / Conversions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {conversions.map((c, i) => (
                            <Card key={i} className="bg-coral/[0.03] border-coral/10 p-6 relative group overflow-hidden">
                                <div className="absolute top-0 left-0 w-0.5 h-full bg-coral transition-all duration-500 group-hover:w-full group-hover:opacity-5" />
                                <div className="flex items-center gap-4 mb-4 relative z-10">
                                    <div className="p-2 bg-coral/20 rounded-xl text-coral">
                                        {c.icon}
                                    </div>
                                    <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">{c.label}</span>
                                </div>
                                <h4 className="text-2xl font-black text-white tracking-widest relative z-10">{c.val}</h4>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Right: Compliance & Activity */}
                <div className="lg:col-span-4 space-y-8">
                    <Card className="bg-[#11141D] border-white/10 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                <h3 className="text-xs font-black text-white uppercase tracking-widest">Дисциплина</h3>
                            </div>
                            <span className="text-[9px] font-black text-emerald-500 uppercase">Соблюдение {(100 - (data.fines > 0 ? 10 : 0))}%</span>
                        </div>
                        <div className="space-y-6">
                            {compliance.map((item, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div>
                                        <p className="text-[10px] font-black text-white uppercase tracking-tight">{item.label}</p>
                                        <p className="text-[8px] font-bold text-white/30 uppercase mt-0.5">Штраф: {item.fine} ₽</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] ${item.status === "Нарушение" ? "bg-red-500 shadow-red-500/50" : "bg-emerald-500"}`} />
                                        <span className={`text-[9px] font-black uppercase ${item.status === "Нарушение" ? "text-red-500" : "text-emerald-500"}`}>{item.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={`mt-8 p-4 border rounded-2xl ${data.fines > 0 ? 'bg-red-500/5 border-red-500/10' : 'bg-emerald-500/5 border-emerald-500/10'}`}>
                            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest text-center italic">
                                {data.fines > 0 ? `"Внимание! Начислены штрафы за нарушение регламента."` : `"Нарушений регламента не выявлено. Контроль качества подтверждает."`}
                            </p>
                        </div>
                    </Card>

                    {/* New Achievements Section */}
                    <div className="h-full">
                        <SalesAchievements salespersonId={salespersonId} />
                    </div>

                    <Card className="bg-[#11141D] border-white/10 p-8 overflow-hidden relative group">
                        <div className="absolute -right-4 -bottom-4 p-8 text-coral/[0.03] group-hover:rotate-12 transition-transform">
                            <Zap className="w-32 h-32" />
                        </div>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest">Прогноз Бонуса</h3>
                            <TrendingUp className="w-4 h-4 text-coral" />
                        </div>
                        <div className="space-y-4 relative z-10">
                            <div className="flex justify-between items-end">
                                <span className="text-[2rem] font-black text-white tracking-widest">+{data.kpiBonus.toLocaleString()} ₽</span>
                                <span className="text-[10px] font-black text-coral mb-2">Текущий Бонус</span>
                            </div>
                            <p className="text-[10px] text-white/50 uppercase font-black leading-relaxed">
                                {data.plan > data.salesAmount
                                    ? "До выполнения плана осталось " + (data.plan - data.salesAmount).toLocaleString() + " ₽."
                                    : "План выполнен! Вы получаете повышенный коэффициент бонусов."}
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
