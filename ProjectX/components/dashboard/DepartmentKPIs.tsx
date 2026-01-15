"use client";

import { Card } from "@/components/ui/Card";
import { TrendingUp, Users, Target, Activity } from "lucide-react";
import { motion } from "framer-motion";

const kpis = [
    { label: "Total Revenue", value: "$1.24M", trend: "+12.5%", icon: TrendingUp },
    { label: "Lead Velocity", value: "450/wk", trend: "+8.2%", icon: Activity },
    { label: "Conversion Rate", value: "14.2%", trend: "-2.1%", icon: Target },
    { label: "Cost Per Lead", value: "$42.50", trend: "+5.4%", icon: Users },
];

export function DepartmentKPIs() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, index) => (
                <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card variant="default" className="p-6 relative overflow-hidden group hover:border-coral/30 transition-all cursor-default">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-coral group-hover:scale-110 transition-transform">
                                <kpi.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${kpi.trend.startsWith('+') ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 'text-rose-500 border-rose-500/20 bg-rose-500/5'
                                }`}>
                                {kpi.trend}
                            </span>
                        </div>
                        <h4 className="text-[11px] font-bold text-white/80 uppercase tracking-widest mb-1">{kpi.label}</h4>
                        <div className="text-3xl font-display font-bold text-white tracking-tighter">
                            {kpi.value}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-br from-coral/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
