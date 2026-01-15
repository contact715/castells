"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MonthlyKPIData } from "@/lib/sales-data";

interface Props {
    history: MonthlyKPIData[];
}

// Helper to format numbers
const fmt = (val: number | undefined, isCurrency = false) => {
    if (val === undefined || val === null) return "-";
    if (val === 0) return <span className="text-white/10">-</span>;
    if (isCurrency) return val.toLocaleString('ru-RU');
    return val;
};

export function DetailedPerformanceTable({ history }: Props) {
    const [selectedMonthId, setSelectedMonthId] = useState<string>(history[0]?.id || "");
    const currentMonth = history.find(m => m.id === selectedMonthId) || history[0];

    if (!currentMonth) return null;

    const days = currentMonth.daily.map(d => d.day);

    // Metric Definitions for the Matrix
    const metricRows = [
        { label: "Новые Лиды", key: "newLeads", kpiKey: "newLeads" },
        { label: "Рез. Звонки", key: "resultCalls", kpiKey: "resultCalls" },
        { label: "Замеры (Назн)", key: "approvedTests", kpiKey: "approvedTests" },
        { label: "Замеры (Опл)", key: "paidTests", kpiKey: "paidTests" },
        { label: "Договоры", key: "contracts", kpiKey: "contracts" },
        { label: "Оборот", key: "salesAmount", kpiKey: "salesSum", isCurrency: true },
    ];

    return (
        <div className="space-y-6">
            {/* Header / Month Selector */}
            <div className="flex items-center justify-between">
                <div className="flex gap-2 p-1 bg-black/20 border border-white/5 rounded-full overflow-x-auto max-w-full">
                    {history.map(month => (
                        <button
                            key={month.id}
                            onClick={() => setSelectedMonthId(month.id)}
                            className={cn(
                                "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                selectedMonthId === month.id
                                    ? "bg-white text-black shadow-lg shadow-white/10"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {month.monthName}
                        </button>
                    ))}
                </div>
            </div>

            {/* MAIN SPREADSHEET MATRIX */}
            <div className="bg-[#11141D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                {/* Scrollable Container */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left min-w-[1200px]">
                        <thead>
                            <tr className="bg-white/[0.02]">
                                {/* Sticky Metric Names */}
                                <th className="sticky left-0 z-20 p-4 min-w-[200px] bg-[#11141D] border-r border-white/5 border-b border-white/10 text-[9px] font-black uppercase tracking-widest text-white/40">
                                    Показатели
                                </th>

                                {/* Days Columns */}
                                {days.map(day => (
                                    <th key={day} className="p-2 min-w-[32px] text-center border-b border-white/10 border-r border-white/5 text-[9px] font-bold text-white/30">
                                        {day}
                                    </th>
                                ))}

                                {/* Summary Columns */}
                                <th className="p-4 bg-white/[0.01] border-b border-white/10 border-r border-white/5 min-w-[80px] text-center text-[9px] font-black uppercase tracking-widest text-white/60">Факт</th>
                                <th className="p-4 bg-white/[0.01] border-b border-white/10 border-r border-white/5 min-w-[80px] text-center text-[9px] font-black uppercase tracking-widest text-white/60">План</th>
                                <th className="p-4 bg-white/[0.01] border-b border-white/10 border-r border-white/5 min-w-[60px] text-center text-[9px] font-black uppercase tracking-widest text-white/60">%</th>
                                <th className="p-4 bg-white/[0.01] border-b border-white/10 min-w-[80px] text-center text-[9px] font-black uppercase tracking-widest text-coral">Бонус</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {metricRows.map((row, idx) => {
                                // Get KPI data for summary columns
                                const kpi = currentMonth.kpi[row.kpiKey as keyof typeof currentMonth.kpi] as any;

                                return (
                                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                                        {/* Metric Name */}
                                        <td className="sticky left-0 z-20 p-4 bg-[#11141D] border-r border-white/5 text-[10px] font-extrabold uppercase tracking-tight text-white group-hover:bg-[#161a24]">
                                            {row.label}
                                        </td>

                                        {/* Daily Values */}
                                        {currentMonth.daily.map((dayData, dayIdx) => {
                                            const val = dayData[row.key as keyof typeof dayData];
                                            const isNonZero = typeof val === 'number' && val > 0;

                                            // Conditional styling for visual density
                                            const bgClass = isNonZero
                                                ? (row.key === 'salesAmount' ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-white")
                                                : "text-white/10";

                                            return (
                                                <td key={dayIdx} className={cn("p-1 text-center text-[10px] font-bold border-r border-white/5", bgClass)}>
                                                    {fmt(val as number, false)} {/* Compact daily values, no currency symbol to save space */}
                                                </td>
                                            );
                                        })}

                                        {/* Summaries */}
                                        <td className="p-2 text-center text-[10px] font-black text-white bg-white/[0.01] border-r border-white/5">
                                            {fmt(kpi.fact, row.isCurrency)}
                                        </td>
                                        <td className="p-2 text-center text-[10px] font-bold text-white/40 bg-white/[0.01] border-r border-white/5">
                                            {fmt(kpi.plan, row.isCurrency)}
                                        </td>
                                        <td className="p-2 text-center border-r border-white/5 bg-white/[0.01]">
                                            <div className="flex justify-center">
                                                <span className={cn(
                                                    "px-1.5 py-0.5 rounded text-[9px] font-black",
                                                    kpi.percent >= 100 ? "bg-emerald-500/20 text-emerald-500" :
                                                        kpi.percent < 50 ? "bg-red-500/20 text-red-500" : "bg-amber-500/20 text-amber-500"
                                                )}>
                                                    {kpi.percent.toFixed(0)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center text-[10px] font-black text-coral bg-white/[0.01]">
                                            {kpi.bonus > 0 ? `+${kpi.bonus}` : "-"}
                                        </td>
                                    </tr>
                                );
                            })}

                            {/* Divider Row */}
                            <tr className="bg-white/5"><td colSpan={days.length + 5} className="h-1"></td></tr>

                            {/* Financials Section embedded in Matrix for context or just summary below */}
                            <tr>
                                <td className="sticky left-0 z-20 p-4 bg-[#11141D] border-r border-white/5 text-[10px] font-extrabold uppercase tracking-tight text-emerald-400">Итого Выплата</td>
                                <td colSpan={days.length} className="bg-[#11141D] border-r border-white/5"></td>
                                <td colSpan={3} className="p-2 text-right text-[9px] font-bold text-white/40 bg-white/[0.02]">С учетом штрафов:</td>
                                <td className="p-2 text-center text-xs font-black text-emerald-400 bg-emerald-500/10 border-white/10">
                                    {currentMonth.finance.totalPayout.toLocaleString()} ₽
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Section: Support & Violations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Support Projects */}
                <div className="bg-[#11141D] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">Сопровождение Клиентов</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-[9px] text-white/40 font-bold uppercase mb-2">2-й месяц</p>
                            <div className="flex flex-wrap gap-2">
                                {currentMonth.support.month2.length > 0 ? currentMonth.support.month2.map((p, i) => (
                                    <span key={i} className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-white">{p}</span>
                                )) : <span className="text-[10px] text-white/20 italic">Нет проектов</span>}
                            </div>
                        </div>
                        <div>
                            <p className="text-[9px] text-white/40 font-bold uppercase mb-2">3-й месяц</p>
                            <div className="flex flex-wrap gap-2">
                                {currentMonth.support.month3.length > 0 ? currentMonth.support.month3.map((p, i) => (
                                    <span key={i} className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-white">{p}</span>
                                )) : <span className="text-[10px] text-white/20 italic">Нет проектов</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Violations / Detailed Financials */}
                <div className="bg-[#11141D] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">Финансовая Сводка</h3>
                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between p-2 rounded hover:bg-white/5">
                            <span className="text-white/60 font-bold">Оклад</span>
                            <span className="text-white font-black">{currentMonth.finance.salary.toLocaleString()} ₽</span>
                        </div>
                        <div className="flex justify-between p-2 rounded hover:bg-white/5">
                            <span className="text-white/60 font-bold">Бонусы (KPI)</span>
                            <span className="text-emerald-400 font-black">+{currentMonth.finance.bonus.toLocaleString()} ₽</span>
                        </div>
                        <div className="flex justify-between p-2 rounded hover:bg-white/5">
                            <span className="text-white/60 font-bold">Штрафы</span>
                            <span className="text-red-500 font-black">-{currentMonth.finance.fines.toLocaleString()} ₽</span>
                        </div>
                        <div className="h-px bg-white/10 my-2"></div>
                        <div className="flex justify-between p-2 rounded bg-emerald-500/10">
                            <span className="text-emerald-400 font-black uppercase tracking-widest">Итого</span>
                            <span className="text-emerald-400 font-black text-lg">{currentMonth.finance.totalPayout.toLocaleString()} ₽</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
