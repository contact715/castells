"use client";

import React from "react";
import { AlertTriangle, Clock, TrendingDown, Activity, AlertCircle, XCircle } from "lucide-react";

export const MoscoSPINSections = () => {
    return (
        <section className="grid lg:grid-cols-2 gap-6">
            {/* SITUATION: SYSTEM OVERLOAD WIDGET */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                    <Activity className="w-24 h-24 text-white/5" />
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <Activity className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Operational Status</span>
                </div>

                <h2 className="text-2xl font-sans font-bold text-white mb-4">
                    High Demand Detected. <br /> <span className="text-gray-400">Capacity Exceeded.</span>
                </h2>

                <p className="text-sm text-gray-400 leading-relaxed max-w-md font-sans">
                    <span className="text-white font-medium">System Analysis:</span> Your core business functions (crews, trucks, ads) are optimal.
                    However, <span className="text-white border-b border-white/20">Input Latency</span> (response time) is critically high due to manual processing limits.
                </p>
            </div>

            {/* PROBLEM: CRITICAL ALERT WIDGET */}
            <div className="bg-red-500/[0.02] backdrop-blur-xl border border-red-500/20 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden group hover:bg-red-500/[0.05] transition-colors">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20 animate-pulse">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                        <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Critical Alert</span>
                    </div>
                    <span className="px-2 py-1 bg-red-500/10 rounded text-[10px] font-bold text-red-500 border border-red-500/20 font-mono">ERR_TIMEOUT</span>
                </div>

                <h2 className="text-3xl font-sans font-bold text-white mb-2">
                    The "5-Minute" Rule Violation
                </h2>
                <div className="flex items-end gap-2 mb-6">
                    <span className="text-5xl font-bold text-red-500 tabular-nums">-80%</span>
                    <span className="text-sm text-red-400/80 mb-2 font-medium">Conversion Probability</span>
                </div>

                <p className="text-sm text-gray-400 border-l-2 border-red-500/30 pl-4 py-1 font-sans">
                    Leads are abandoned if response time &gt; 5 min.
                    Current manual protocols result in <span className="text-red-400">connection failure</span>.
                </p>
            </div>

            {/* IMPLICATION: REVENUE LEAKAGE DIAGNOSTICS (Full Width) */}
            <div className="lg:col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingDown className="w-5 h-5 text-red-500" />
                            <h2 className="text-xl font-sans font-bold text-white">Projected Revenue Leakage</h2>
                        </div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Annualized Loss Analysis based on current throughput</p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg">
                        <span className="text-2xl font-bold text-red-500 tabular-nums">-$64,000</span>
                        <span className="text-[10px] text-red-400 font-bold uppercase ml-2">/ Year</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {[
                        { label: "Missed HVAC Install", val: "-$8,000", sub: "per incident", icon: XCircle },
                        { label: "2 Missed Calls/Week", val: "-$64k", sub: "annual impact", icon: TrendingDown },
                        { label: "Marketing Spend", val: "WASTED", sub: "0% ROI", icon: AlertCircle },
                    ].map((item, i) => (
                        <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-red-500/30 transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                                <item.icon className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                                <div className="text-xl font-bold text-white tabular-nums">{item.val}</div>
                                <div className="text-xs text-gray-400 uppercase tracking-tight">{item.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
