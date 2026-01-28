"use client";

import React from "react";
import { Combine, PhoneForwarded, ScanEye, ShieldCheck, CheckCircle2 } from "lucide-react";

const features = [
    {
        icon: Combine,
        title: "Omni-Channel Hunter",
        status: "ACTIVE",
        desc: "Autonomous thread monitoring across Instagram, WhatsApp, and Web. Instant intent interception."
    },
    {
        icon: PhoneForwarded,
        title: "Speed-to-Lead Dialer",
        status: "ONLINE",
        desc: "Zero-latency bridge. Triggers physical phone call to operator < 30ms after lead capture."
    },
    {
        icon: ScanEye,
        title: "AI Vision Estimator",
        status: "READY",
        desc: "Computer vision analysis of hardware damage. Generates pre-estimates from client photos."
    },
    {
        icon: ShieldCheck,
        title: "Bot & Spam Shield",
        status: "SECURE",
        desc: "SMS verification layer + HLR Lookup. Filters non-human traffic with 99.8% accuracy."
    }
];

export const MoscoSolution = () => {
    return (
        <section className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 lg:p-12 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2 block">System Remediation</span>
                    <h2 className="text-3xl font-sans font-bold text-white">Active Modules</h2>
                </div>
                <div className="px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">All Systems Operational</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((f, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/5 p-6 rounded-xl hover:bg-white/[0.05] hover:border-white/10 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                                <f.icon className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="flex items-center gap-1.5 opacity-60">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                <span className="text-[10px] font-mono text-emerald-500">{f.status}</span>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{f.title}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">
                            {f.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
