"use client";

import { motion } from "framer-motion";

const regions = [
    { name: "North America", value: 85, color: "bg-coral" },
    { name: "European Union", value: 64, color: "bg-white/20" },
    { name: "Asia Pacific", value: 42, color: "bg-white/10" },
    { name: "LATAM / UAE", value: 28, color: "bg-white/5" },
];

export function GeoHeatmap() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-[11px] font-bold text-white uppercase tracking-widest leading-none">Global Yield Density</h3>
                    <p className="text-[9px] text-white/60 uppercase mt-1 font-bold tracking-tight">Regional Performance Matrix</p>
                </div>
                <span className="text-[9px] font-bold text-coral border border-coral/20 px-2.5 py-1 rounded-full bg-coral/5">LIVE</span>
            </div>

            {/* Simplified Abstract Map Visualization */}
            <div className="relative h-24 flex items-center justify-center mb-8 bg-black/5 dark:bg-white/5 rounded-card border border-black/5 dark:border-white/5">
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <svg viewBox="0 0 200 100" className="w-full h-full text-text-primary dark:text-white/10 fill-current p-4 px-8">
                        <path d="M10,40 Q30,10 50,40 T90,40 T130,40 T170,40 T190,40" className="stroke-current fill-none opacity-20" strokeWidth="1" />
                        <circle cx="40" cy="35" r="3" className="text-coral fill-current" />
                        <circle cx="120" cy="45" r="2.5" className="text-text-primary dark:text-white/40 fill-current" />
                        <circle cx="160" cy="55" r="2.5" className="text-text-primary dark:text-white/20 fill-current" />
                    </svg>
                </div>
                <div className="relative z-10 text-center">
                    <div className="mt-2 flex gap-1.5 justify-center items-center px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                        <div className="w-1.5 h-1.5 rounded-full bg-coral" />
                        <div className="text-[9px] font-bold text-white uppercase tracking-widest leading-none">Clusters Identified</div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {regions.map((reg, i) => (
                    <div key={i} className="group cursor-default">
                        <div className="flex justify-between items-center mb-1.5 px-1">
                            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest group-hover:text-white transition-colors">
                                {reg.name}
                            </span>
                            <span className="text-[11px] font-bold text-text-primary dark:text-white transition-colors">
                                {reg.value}%
                            </span>
                        </div>
                        <div className="relative h-1.5 rounded-full overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${reg.value}%` }}
                                transition={{ duration: 1.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className={`absolute inset-y-0 left-0 ${reg.color === 'bg-coral' ? 'bg-coral' : 'bg-text-secondary/20 dark:bg-white/20'} rounded-full`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-[9px] font-bold text-white/70 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                    Hot Zone: ZIP 10005 (Manhattan) (+312%)
                </div>
            </div>
        </div>
    );
}
