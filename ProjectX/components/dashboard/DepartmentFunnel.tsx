"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface FunnelStage {
    label: string;
    value: number;
    color: string;
}

const departmentalStages: FunnelStage[] = [
    { label: "Inbound Impressions", value: 45000, color: "bg-coral/20" },
    { label: "Raw Leads Created", value: 12400, color: "bg-coral/40" },
    { label: "Validated (ZIP/SMS)", value: 8500, color: "bg-coral/60" },
    { label: "Sales Qualified (SQS)", value: 3100, color: "bg-coral/80" },
    { label: "AI Dialer Contacted", value: 2400, color: "bg-coral" },
    { label: "Human Verification", value: 850, color: "bg-text-primary dark:bg-white" },
    { label: "Closed Revenue", value: 112, color: "bg-emerald-500" },
];

export function DepartmentFunnel() {
    const maxValue = Math.max(...departmentalStages.map((s) => s.value));

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] font-bold text-text-primary dark:text-white uppercase tracking-widest">Aggregate Conversion Pipeline</h3>
                <Info className="w-4 h-4 text-text-secondary dark:text-white/20 cursor-help" />
            </div>

            <div className="space-y-3">
                {departmentalStages.map((stage, index) => {
                    const width = (stage.value / maxValue) * 100;
                    const prevValue = departmentalStages[index - 1]?.value;
                    const dropoff = prevValue ? Math.round((1 - (stage.value / prevValue)) * 100) : 0;

                    return (
                        <div key={stage.label} className="group/item">
                            <div className="flex items-center justify-between mb-1 px-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-text-secondary dark:text-white/40 uppercase tracking-widest group-hover/item:text-text-primary dark:group-hover/item:text-white transition-colors">
                                        {stage.label}
                                    </span>
                                    {dropoff > 0 && (
                                        <span className="text-[9px] font-bold text-rose-500/60 dark:text-rose-500 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                            -{dropoff}% drop
                                        </span>
                                    )}
                                </div>
                                <span className="text-[11px] font-bold text-coral">
                                    {stage.value.toLocaleString()}
                                </span>
                            </div>
                            <div className="relative h-2.5 rounded-full overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${width}%` }}
                                    transition={{ duration: 1.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className={cn("absolute inset-y-0 left-0 rounded-full flex items-center justify-end pr-3 px-1", stage.color)}
                                >
                                    <span className={cn("text-[9px] font-bold opacity-0 group-hover/item:opacity-100 transition-opacity",
                                        ['bg-text-primary dark:bg-white', 'bg-emerald-500'].includes(stage.color) ? "text-white dark:text-black" : "text-black")}>
                                        {Math.round(width)}%
                                    </span>
                                </motion.div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-coral/5 border border-coral/10">
                <p className="text-[10px] font-bold text-coral uppercase tracking-widest mb-1">Bottleneck Identified</p>
                <p className="text-[11px] text-text-secondary dark:text-white/60 font-medium">Stage 3 (Validation) shows a 45% dropoff. Systemic check of Lead Forms recommended.</p>
            </div>
        </div>
    );
}
