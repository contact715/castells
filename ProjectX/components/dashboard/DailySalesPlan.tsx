"use client";

import { Card } from "@/components/ui/Card";
import { Sunrise, Calendar, Target, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function DailySalesPlan() {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <Card variant="default" className="p-8 border-coral/20 bg-coral/[0.02]">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Morning Briefing */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-coral text-white rounded-xl">
                            <Sunrise className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-display font-bold text-white leading-none">Morning Briefing</h2>
                            <p className="text-[10px] text-white/70 font-bold uppercase tracking-[0.2em] mt-1.5">{today}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                            <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1">Yesterday&apos;s Close</p>
                            <p className="text-xl font-display font-bold text-white">$42,850</p>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="text-[9px] font-bold text-emerald-500 uppercase">+12% vs avg</span>
                            </div>
                        </div>
                        <div className="p-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                            <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest mb-1">Today&apos;s Objective</p>
                            <p className="text-xl font-display font-bold text-white">$55,000</p>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Aggressive Target</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Monthly Path to Quota */}
                <div className="lg:w-80 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-white uppercase tracking-widest">Path to Quota</span>
                        <span className="text-[11px] font-bold text-coral uppercase tracking-widest">64% Finalized</span>
                    </div>

                    <div className="relative h-3 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "64%" }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full bg-coral rounded-full"
                        />
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-coral" />
                                <span className="text-[10px] font-bold text-white/80 uppercase">Completed</span>
                            </div>
                            <span className="text-[11px] font-bold text-white">$1.2M</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-white/20" />
                                <span className="text-[10px] font-bold text-white/80 uppercase">Remaining</span>
                            </div>
                            <span className="text-[11px] font-bold text-white font-display">$640k</span>
                        </div>
                    </div>

                    <button className="w-full py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-[10px] uppercase tracking-widest mt-2 hover:opacity-90 transition-opacity">
                        View Detailed Forecast
                    </button>
                </div>
            </div>
        </Card>
    );
}
