"use client";

import { Card } from "@/components/ui/Card";
import { Settings2, Layout, Sliders, Database, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DashboardSettings() {
    return (
        <Card variant="default" className="p-8 h-full bg-black/5 dark:bg-white/[0.02] border-dashed border-black/10 dark:border-white/10">
            <div className="flex items-center gap-3 mb-8">
                <Settings2 className="w-5 h-5 text-text-secondary dark:text-white/40" />
                <h3 className="text-xl font-display font-semibold text-text-primary dark:text-white uppercase tracking-tight">View Configuration</h3>
            </div>

            <div className="space-y-6">
                {/* Visual Settings */}
                <div className="space-y-4">
                    <p className="text-[10px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-[0.2em]">Visual Preferences</p>
                    <div className="flex flex-col gap-2">
                        <button className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 text-[11px] font-bold text-text-primary dark:text-white uppercase tracking-widest hover:border-coral transition-colors">
                            <div className="flex items-center gap-2">
                                <Layout className="w-3.5 h-3.5 opacity-40" />
                                <span>High Density Layout</span>
                            </div>
                            <div className="w-8 h-4 bg-coral rounded-full relative">
                                <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" />
                            </div>
                        </button>
                        <button className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 text-[11px] font-bold text-text-primary dark:text-white uppercase tracking-widest hover:border-coral transition-colors">
                            <div className="flex items-center gap-2">
                                <Eye className="w-3.5 h-3.5 opacity-40" />
                                <span>Show AI Forecasts</span>
                            </div>
                            <div className="w-8 h-4 bg-black/10 dark:bg-white/10 rounded-full relative">
                                <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Calculation Logic */}
                <div className="space-y-4">
                    <p className="text-[10px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-[0.2em]">Calculation Model</p>
                    <div className="flex flex-col gap-2">
                        <div className="p-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5">
                            <div className="flex items-center gap-2 mb-2">
                                <Database className="w-3.5 h-3.5 text-coral" />
                                <span className="text-[11px] font-bold text-text-primary dark:text-white uppercase tracking-widest">Attribution Strategy</span>
                            </div>
                            <select className="w-full bg-transparent border-none text-[12px] font-medium text-text-secondary focus:ring-0 p-0 cursor-pointer">
                                <option>First-Touch Attribution</option>
                                <option>Last-Touch Attribution</option>
                                <option>Linear (Distributed)</option>
                                <option>Time Decay</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Data Thresholds */}
                <div className="space-y-4">
                    <p className="text-[10px] font-bold text-text-secondary dark:text-white/20 uppercase tracking-[0.2em]">Data Thresholds</p>
                    <div className="space-y-4 pt-1">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-[10px] font-bold text-text-secondary dark:text-white/40 uppercase tracking-widest">Confidence Score</span>
                                <span className="text-[10px] font-bold text-coral">85%</span>
                            </div>
                            <div className="h-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-coral w-[85%]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Button className="w-full mt-8 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-[10px] uppercase tracking-widest h-11 border-none shadow-none">
                Save Presets
            </Button>
        </Card>
    );
}
