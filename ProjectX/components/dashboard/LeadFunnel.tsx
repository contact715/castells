import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FunnelStage {
    label: string;
    value: number;
    color: string;
}

const funnelStages: FunnelStage[] = [
    { label: "Leads In", value: 1200, color: "bg-coral" },
    { label: "Validated", value: 850, color: "bg-coral/80" },
    { label: "Scored 90+", value: 310, color: "bg-coral/60" },
    { label: "Connected", value: 280, color: "bg-coral/40" },
    { label: "Deals Won", value: 110, color: "bg-black dark:bg-white" },
];

export function LeadFunnel() {
    const maxValue = Math.max(...funnelStages.map((s) => s.value));

    return (
        <div className="space-y-3">
            {funnelStages.map((stage, index) => {
                const width = (stage.value / maxValue) * 100;

                return (
                    <div key={stage.label} className="group/item">
                        <div className="flex items-center justify-between mb-1.5 px-1">
                            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest group-hover/item:text-white transition-colors">
                                {stage.label}
                            </span>
                            <span className="text-[11px] font-bold text-coral">
                                {stage.value.toLocaleString()}
                            </span>
                        </div>
                        <div className="relative h-2 rounded-full overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${width}%` }}
                                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                                className="absolute inset-y-0 left-0 bg-coral rounded-full flex items-center justify-end pr-3 px-1"
                            >
                                <span className={cn("text-[8px] font-bold opacity-0 group-hover/item:opacity-100 transition-opacity", stage.color === 'bg-black dark:bg-white' ? "text-white dark:text-black" : "text-black")}>
                                    {Math.round(width)}%
                                </span>
                            </motion.div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}



