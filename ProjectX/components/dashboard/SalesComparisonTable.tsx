"use client";

import React from 'react';
import { Card } from "@/components/ui/Card";
import { Users, TrendingUp, DollarSign, Target } from "lucide-react";
import { SALES_PEOPLE, SALES_DATA } from "@/lib/sales-data";

export const SalesComparisonTable = () => {
    // Determine metrics for each person
    const rows = SALES_PEOPLE.map(person => {
        const metrics = SALES_DATA[person.id];
        if (!metrics) return null;

        // Calculate total payout (Salary + Bonus - Fines)
        // Logic from spreadsheet: Manager Salary + KPI Bonus - Fines
        const totalPayout = metrics.managerSalary + metrics.kpiBonus - metrics.fines;

        return {
            id: person.id,
            name: person.name,
            role: person.role,
            leads: metrics.newLeads,
            calls: metrics.calls,
            resultCalls: metrics.resultCalls, // "Meetings" equivalent or useful metric
            contracts: metrics.contracts,
            revenue: metrics.salesAmount,
            conversion: metrics.conversion.leadToContract.toFixed(1) + "%", // Lead -> Contract %
            kpi: metrics.kpiPercent,
            payout: totalPayout
        };
    }).filter(item => item !== null) as any[];

    // Calculate totals
    const totals = rows.reduce((acc, row) => ({
        leads: acc.leads + row.leads,
        calls: acc.calls + row.calls,
        contracts: acc.contracts + row.contracts,
        revenue: acc.revenue + row.revenue,
        payout: acc.payout + row.payout
    }), { leads: 0, calls: 0, contracts: 0, revenue: 0, payout: 0 });

    const avgKpi = Math.round(rows.reduce((acc, row) => acc + row.kpi, 0) / (rows.length || 1));
    // Avg conversion (Weighted by leads would be better, but simple avg for now provided leads exist)
    // Actually from spreadsheet: Total Contracts / Total Leads
    const totalConversion = totals.leads > 0 ? ((totals.contracts / totals.leads) * 100).toFixed(1) + "%" : "0.0%";


    return (
        <Card className="p-0 overflow-hidden bg-[#11141D] border-white/10">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-coral" />
                    <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Сводная таблица эффективности</h3>
                        <p className="text-[10px] text-white/50 uppercase font-black mt-0.5">Comparative Sales Intelligence</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Общая Выручка</span>
                        <span className="text-xs font-black text-white">{(totals.revenue).toLocaleString()} ₽</span>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-white/[0.02]">
                            <th className="p-4 text-left text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5">Менеджер</th>
                            <th className="p-4 text-center text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5">Лиды</th>
                            <th className="p-4 text-center text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5">Звонки</th>
                            <th className="p-4 text-center text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5">Рез. Звонки</th>
                            <th className="p-4 text-center text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5">Договоры</th>
                            <th className="p-4 text-center text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5">Оборот</th>
                            <th className="p-4 text-center text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5">Конверсия</th>
                            <th className="p-4 text-center text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5">KPI %</th>
                            <th className="p-4 text-right text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/5">Итого ЗП</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((m, idx) => (
                            <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="p-4 font-black text-white text-xs border-b border-white/5 border-r border-white/5">
                                    <div className="flex flex-col">
                                        <span>{m.name}</span>
                                        <span className="text-[9px] text-white/40 font-bold uppercase">{m.role}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-center text-xs font-bold text-white/80 border-b border-white/5">{m.leads}</td>
                                <td className="p-4 text-center text-xs font-bold text-white/80 border-b border-white/5">{m.calls}</td>
                                <td className="p-4 text-center text-xs font-bold text-white/80 border-b border-white/5">{m.resultCalls}</td>
                                <td className="p-4 text-center text-xs font-bold text-white/80 border-b border-white/5">{m.contracts}</td>
                                <td className="p-4 text-center text-xs font-black text-white border-b border-white/5">{m.revenue.toLocaleString()} ₽</td>
                                <td className="p-4 text-center text-xs font-bold text-coral border-b border-white/5">{m.conversion}</td>
                                <td className="p-4 text-center border-b border-white/5">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-[10px] font-black text-white">{m.kpi}%</span>
                                        <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-coral rounded-full" style={{ width: `${m.kpi}%` }} />
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-right font-black text-emerald-400 text-xs border-b border-white/5">{m.payout.toLocaleString()} ₽</td>
                            </tr>
                        ))}
                        <tr className="bg-white/[0.03]">
                            <td className="p-4 font-black text-white/40 text-[10px] uppercase">Итого по отделу</td>
                            <td className="p-4 text-center font-black text-white text-xs">{totals.leads}</td>
                            <td className="p-4 text-center font-black text-white text-xs">{totals.calls}</td>
                            <td className="p-4 text-center font-black text-white text-xs text-white/30">-</td>
                            <td className="p-4 text-center font-black text-white text-xs">{totals.contracts}</td>
                            <td className="p-4 text-center font-black text-white text-xs">{totals.revenue.toLocaleString()} ₽</td>
                            <td className="p-4 text-center font-black text-coral text-xs">{totalConversion}</td>
                            <td className="p-4 text-center text-xs font-black text-white/40">{avgKpi}%</td>
                            <td className="p-4 text-right font-black text-emerald-400 text-xs">{totals.payout.toLocaleString()} ₽</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
