"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";

export const MoscoSocialProof = () => {
    return (
        <section className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Verified Outcomes</span>
                    <div className="h-px flex-1 bg-white/5" />
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 overflow-hidden shrink-0">
                        {/* Placeholder for avatar */}
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                    </div>
                    <div>
                        <p className="text-lg font-medium text-white italic mb-2">
                            "Recovered <span className="text-emerald-400 font-bold">$15,000</span> in lost deals within 72 hours of deployment."
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-400">Beta Partner, Sacramento</span>
                            <div className="flex text-amber-400">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-px h-16 bg-white/10 hidden md:block" />

            <div className="flex gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
                {["Twilio", "Meta", "OpenAI"].map((logo) => (
                    <div key={logo} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/20" />
                        <span className="text-sm font-bold text-white">{logo}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
