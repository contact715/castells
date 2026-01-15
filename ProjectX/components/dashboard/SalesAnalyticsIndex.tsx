"use client";

import { motion } from "framer-motion";
import { SALES_DATA, SALES_PEOPLE } from "@/lib/sales-data";

export function SalesAnalyticsIndex() {
    // ------------------------------------------------------------------
    // 1. Data Aggregation
    // ------------------------------------------------------------------
    const ids = ["evgeny_zh", "alexander"];
    const metricsKeys = [
        "newLeads", "calls", "resultCalls", "approvedTests", "paidTests", "contracts", "positions", "salesAmount"
    ] as const;

    const dataMap = ids.map(id => SALES_DATA[id]);

    // Helper to sum a field across all users
    const sum = (field: keyof typeof SALES_DATA["alexander"]) =>
        dataMap.reduce((acc, d) => acc + (typeof d[field] === 'number' ? (d[field] as number) : 0), 0);

    // Helper to average
    const avg = (field: keyof typeof SALES_DATA["alexander"]) => {
        const total = sum(field);
        return total / ids.length;
    };

    // Plans (Hardcoded or derived from data if available)
    const teamPlanAmount = 5000000;
    const teamPlanLeads = 250;
    const teamPlanCalls = 300;
    const teamPlanApproved = 70;
    const teamPlanPaid = 75;
    const teamPlanContracts = 35;

    // ------------------------------------------------------------------
    // 2. Row Configuration
    // ------------------------------------------------------------------
    const rows = [
        { label: "Количество новых лидов", field: "newLeads", plan: teamPlanLeads },
        { label: "Общее количество звонков", field: "calls", plan: 0 },
        { label: "Количество результативных звонков", field: "resultCalls", plan: teamPlanCalls },
        { label: "Количество одобренных тестов", field: "approvedTests", plan: teamPlanApproved },
        { label: "Количество оплаченных тестов", field: "paidTests", plan: teamPlanPaid },
        { label: "Количество заключенных договоров", field: "contracts", plan: teamPlanContracts },
        { label: "Сумма продаж", field: "salesAmount", plan: teamPlanAmount, isCurrency: true },
    ];

    return (
        <div className="bg-surface dark:bg-dark-surface border border-black/5 dark:border-white/5 rounded-card overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-6 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                <h2 className="text-lg font-display font-bold text-text-primary dark:text-white uppercase tracking-tight">Sales Analytics Index (Сводная)</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr>
                            <th className="p-4 text-[10px] font-bold text-text-secondary dark:text-white/40 uppercase tracking-widest border-b border-black/5 dark:border-white/5 min-w-[200px]">Показатели</th>
                            {ids.map(id => {
                                const person = SALES_PEOPLE.find(p => p.id === id);
                                return <th key={id} className="p-4 text-[10px] font-bold text-text-primary dark:text-white uppercase tracking-widest border-b border-black/5 dark:border-white/5">{person?.name}</th>
                            })}
                            <th className="p-4 text-[10px] font-bold text-text-secondary dark:text-white/40 uppercase tracking-widest border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">Среднее</th>
                            <th className="p-4 text-[10px] font-bold text-text-secondary dark:text-white/40 uppercase tracking-widest border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">Суммарное</th>
                            <th className="p-4 text-[10px] font-bold text-text-secondary dark:text-white/40 uppercase tracking-widest border-b border-black/5 dark:border-white/5">План (Общ)</th>
                            <th className="p-4 text-[10px] font-bold text-text-secondary dark:text-white/40 uppercase tracking-widest border-b border-black/5 dark:border-white/5">% Вып (Общ)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => {
                            const total = sum(row.field as any);
                            const average = total / ids.length;
                            const percent = row.plan > 0 ? (total / row.plan) * 100 : 0;

                            return (
                                <tr key={i} className="group hover:bg-black/[0.01] dark:hover:bg-white/[0.01]">
                                    <td className="p-4 text-xs font-bold text-text-primary dark:text-white border-b border-black/5 dark:border-white/5">{row.label}</td>

                                    {/* Individual Columns */}
                                    {ids.map(id => {
                                        const val = SALES_DATA[id][row.field as keyof typeof SALES_DATA["alexander"]];
                                        return (
                                            <td key={id} className="p-4 text-xs text-text-secondary dark:text-white/70 border-b border-black/5 dark:border-white/5">
                                                {row.isCurrency ? `${(val as any).toLocaleString()} ₽` : (val as any)}
                                            </td>
                                        );
                                    })}

                                    {/* Calculations */}
                                    <td className="p-4 text-xs font-bold text-text-primary dark:text-white border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                                        {row.isCurrency ? `${average.toLocaleString()} ₽` : average.toFixed(1)}
                                    </td>
                                    <td className="p-4 text-xs font-bold text-text-primary dark:text-white border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                                        {row.isCurrency ? `${total.toLocaleString()} ₽` : total}
                                    </td>
                                    <td className="p-4 text-xs text-text-secondary dark:text-white/40 border-b border-black/5 dark:border-white/5">
                                        {row.plan > 0 ? (row.isCurrency ? `${row.plan.toLocaleString()} ₽` : row.plan) : "-"}
                                    </td>
                                    <td className="p-4 text-xs font-bold border-b border-black/5 dark:border-white/5">
                                        <div className="flex items-center gap-2">
                                            <span className={percent >= 100 ? "text-emerald-500" : percent < 50 ? "text-red-500" : "text-amber-500"}>
                                                {percent.toFixed(0)}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}

                        {/* Financial Summaries Row (Hardcoded for structure based on user request) */}
                        <tr className="bg-emerald-500/5">
                            <td className="p-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/10 uppercase tracking-widest">Зарплата Менеджера</td>
                            {ids.map(id => {
                                const d = SALES_DATA[id];
                                const pay = d.managerSalary + d.kpiBonus - d.fines;
                                return <td key={id} className="p-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/10">{pay.toLocaleString()} ₽</td>
                            })}
                            <td className="p-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/10 bg-emerald-500/10">
                                {((sum("managerSalary") + sum("kpiBonus") - sum("fines")) / ids.length).toLocaleString()} ₽
                            </td>
                            <td className="p-4 text-xs font-bold text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/10 bg-emerald-500/10">
                                {(sum("managerSalary") + sum("kpiBonus") - sum("fines")).toLocaleString()} ₽
                            </td>
                            <td className="p-4 border-b border-emerald-500/10"></td>
                            <td className="p-4 border-b border-emerald-500/10"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

