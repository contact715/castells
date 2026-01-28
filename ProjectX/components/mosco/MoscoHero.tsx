"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MoscoLiveDemo } from "@/components/mosco/MoscoLiveDemo";
import { Activity, ShieldCheck, Zap } from "lucide-react";

export const MoscoHero = () => {
    return (
        <section className="grid lg:grid-cols-12 gap-6">
            {/* LEFT: MISSION CONTROL STATUS */}
            <div className="lg:col-span-7 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 lg:p-12 relative overflow-hidden group shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* System Status Badge */}
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">System Online • v2.4.0</span>
                </div>

                <div className="space-y-6 relative z-10">
                    <h1 className="text-4xl lg:text-6xl font-sans font-bold text-white tracking-tight leading-[1.1]">
                        Stop Losing <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">$50,000</span> / Year on Missed Calls.
                    </h1>

                    <p className="text-lg text-gray-400 leading-relaxed max-w-xl font-sans">
                        <strong className="text-white">Mosco.ai</strong> is your autonomous sales division.
                        Detects leads across omni-channels, validates intent, and executes instant voice connection in &lt;30 seconds.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
                            Deploy AI Agent
                        </Button>
                        <div className="flex items-center gap-4 px-4 py-2 border border-white/5 rounded-full bg-white/[0.02]">
                            <div className="flex items-center gap-2" title="Uptime">
                                <Activity className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs font-medium text-gray-400">99.9%</span>
                            </div>
                            <div className="w-px h-3 bg-white/10" />
                            <div className="flex items-center gap-2" title="Security">
                                <ShieldCheck className="w-4 h-4 text-blue-500" />
                                <span className="text-xs font-medium text-gray-400">SOC2</span>
                            </div>
                            <div className="w-px h-3 bg-white/10" />
                            <div className="flex items-center gap-2" title="Speed">
                                <Zap className="w-4 h-4 text-amber-500" />
                                <span className="text-xs font-medium text-gray-400">&lt;30ms</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: LIVE INTERACTIVE WIDGET */}
            <div className="lg:col-span-5 h-full min-h-[500px]">
                <MoscoLiveDemo />
            </div>
        </section>
    );
};
