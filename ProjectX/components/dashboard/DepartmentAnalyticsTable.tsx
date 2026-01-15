"use client";

import { SALES_DATA, SALES_PEOPLE, SalesMetrics } from "@/lib/sales-data";
import { cn } from "@/lib/utils";

// Helper to safely format numbers and percentages
const fmt = (val: number, isCurrency = false, isPercent = false) => {
    if (val === undefined || val === null || isNaN(val)) return "-";
    if (isCurrency) return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(val);
    if (isPercent) return val.toFixed(1) + "%";
    return val.toLocaleString('ru-RU');
};

const getMetric = (data: SalesMetrics | undefined, field: keyof SalesMetrics | Array<string>) => {
    if (!data) return 0;
    if (Array.isArray(field)) {
        // Handle nested or special fields if needed, for now assuming direct access
        return 0;
    }
    return (data[field] as number) || 0;
};

// Row Definition
interface AnalyticsRow {
    label: string;
    getValue: (data: SalesMetrics) => number;
    subLabel?: string;
    isCurrency?: boolean;
    isPercent?: boolean;
    isHeader?: boolean;
    indent?: boolean;
}

const ROWS: AnalyticsRow[] = [
    { label: "Показатели", getValue: () => 0, isHeader: true },
    { label: "Количество новых лидов", getValue: (d) => d.newLeads },
    { label: "Общее количество звонков", getValue: (d) => d.calls },
    { label: "Количество результативных звонков", getValue: (d) => d.resultCalls },
    { label: "Количество одобренных тестов", getValue: (d) => d.approvedTests },
    { label: "Количество оплаченных тестов", getValue: (d) => d.paidTests },
    { label: "Количество заключенных договоров", getValue: (d) => d.contracts },
    // Derived or missing fields in mock data can be 0 or calculated
    { label: "Сумма продаж", getValue: (d) => d.salesAmount, isCurrency: true },
    { label: "Командный план", getValue: (d) => d.teamPlan, isCurrency: true }, // Usually constant per month but stored per person?

    { label: "Заработная плата", getValue: () => 0, isHeader: true },
    { label: "Сумма штрафа", getValue: (d) => d.fines, isCurrency: true },
    { label: "Бонус за выполнение KPI", getValue: (d) => d.kpiBonus, isCurrency: true },
    { label: "Общий % выполнения KPI", getValue: (d) => d.kpiPercent, isPercent: true },
    { label: "Зарплата менеджера", getValue: (d) => d.managerSalary, isCurrency: true },
    { label: "Итоговая зарплата (с учетом ком. пл)", getValue: (d) => d.managerSalary + (d.kpiBonus || 0) - (d.fines || 0), isCurrency: true }, // simplified logic

    { label: "Конверсии", getValue: () => 0, isHeader: true },
    { label: "Из лида в одобренный тест", getValue: (d) => d.conversion.leadToApproved, indent: true, isPercent: true },
    { label: "Из лида в оплаченный тест", getValue: (d) => d.conversion.leadToPaid, indent: true, isPercent: true },
    { label: "Из лида в заключенный договор", getValue: (d) => d.conversion.leadToContract, indent: true, isPercent: true },
    { label: "Из звонка в одобренный тест", getValue: (d) => d.conversion.callToApproved, indent: true, isPercent: true },
    { label: "Из звонка в оплаченный тест", getValue: (d) => d.conversion.callToPaid, indent: true, isPercent: true },
    { label: "Из одобренного теста в оплаченный", getValue: (d) => d.conversion.approvedToPaid, indent: true, isPercent: true },
];

export function DepartmentAnalyticsTable() {
    const people = SALES_PEOPLE.filter(p => p.status === 'active');

    // Calculations helper
    const calculateRow = (row: AnalyticsRow) => {
        const values = people.map(p => {
            const data = SALES_DATA[p.id];
            return data ? row.getValue(data) : 0;
        });

        const total = values.reduce((a, b) => a + b, 0);
        const avg = total / (values.length || 1);

        // For percentages, total implies average usually, or re-calculation. 
        // Simple average for now suitable for display unless it's weighted.
        const effectiveTotal = row.isPercent ? avg : total;

        return { values, total: effectiveTotal, avg };
    };

    return (
        <div className="w-full overflow-x-auto rounded-card border border-black/5 dark:border-white/5 bg-surface dark:bg-dark-surface shadow-sm text-xs">
            <table className="w-full border-collapse min-w-[1000px]">
                <thead>
                    <tr className="bg-black/5 dark:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:text-white/60">
                        <th className="p-3 text-left w-64 border-b border-r border-black/5 dark:border-white/5 whitespace-nowrap sticky left-0 bg-surface dark:bg-dark-surface z-10">
                            Показатели
                        </th>
                        {/* Person Columns */}
                        {people.map(person => (
                            <th key={person.id} className="p-3 text-center border-b border-r border-black/5 dark:border-white/5 w-32 min-w-[100px]">
                                {person.name}
                            </th>
                        ))}

                        {/* Summary Columns matching 'Сводная таблица' */}
                        <th className="p-3 text-center border-b border-r border-black/5 dark:border-white/5 bg-blue-500/10 text-blue-600 dark:text-blue-400 w-24">
                            Среднее
                        </th>
                        <th className="p-3 text-center border-b border-r border-black/5 dark:border-white/5 bg-blue-500/10 text-blue-600 dark:text-blue-400 w-24">
                            Суммарное
                        </th>
                        {/* Plan columns would require a 'plan' definitions for each metric which we don't strictly have in the generic SalesMetrics beyond overall 'plan'. 
                            Skipping detailed 'Plan' columns spread for every metric to avoid empty columns, usually Plan is a separate row comparison.
                            However, the spreadsheet has 'Plan Avg' and 'Plan Total'. I'll add 'Total' as the main aggregate.
                        */}
                    </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5">
                    {ROWS.map((row, idx) => {
                        if (row.isHeader) {
                            return (
                                <tr key={idx} className="bg-black/[0.02] dark:bg-white/[0.02]">
                                    <td className="p-3 font-bold text-text-primary dark:text-white uppercase tracking-widest sticky left-0 bg-surface dark:bg-dark-surface/95 backdrop-blur z-10 border-r border-black/5 dark:border-white/5">
                                        {row.label}
                                    </td>
                                    <td colSpan={people.length + 2} className="p-3"></td>
                                </tr>
                            );
                        }

                        const { values, total, avg } = calculateRow(row);

                        return (
                            <tr key={idx} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors group">
                                <td className={cn(
                                    "p-3 text-text-secondary dark:text-white/80 font-medium border-r border-black/5 dark:border-white/5 sticky left-0 bg-surface dark:bg-dark-surface z-10 group-hover:bg-black/[0.01] dark:group-hover:bg-white/[0.01]",
                                    row.indent && "pl-8 text-[11px]"
                                )}>
                                    {row.label}
                                </td>

                                {people.map((p, i) => (
                                    <td key={p.id} className="p-3 text-center border-r border-black/5 dark:border-white/5 text-text-primary dark:text-white">
                                        {fmt(values[i], row.isCurrency, row.isPercent)}
                                    </td>
                                ))}

                                {/* Average */}
                                <td className="p-3 text-center border-r border-black/5 dark:border-white/5 font-bold text-text-primary dark:text-white bg-black/[0.02] dark:bg-white/[0.02]">
                                    {fmt(avg, row.isCurrency, row.isPercent)}
                                </td>

                                {/* Total */}
                                <td className="p-3 text-center font-bold text-text-primary dark:text-white bg-black/[0.02] dark:bg-white/[0.02]">
                                    {fmt(total, row.isCurrency, row.isPercent)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
