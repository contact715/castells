"use client";

import { motion } from "framer-motion";

interface Sector {
    name: string;
    value: number;
    color: string;
    amount: string;
}

const bonusData: Sector[] = [
    { name: "Dmitry K.", value: 35, color: "#E8D5B5", amount: "$8,400" },
    { name: "Alex R.", value: 25, color: "#64748b", amount: "$6,000" },
    { name: "Igor B.", value: 15, color: "#10b981", amount: "$3,600" },
    { name: "Svetlana I.", value: 15, color: "#3b82f6", amount: "$3,600" },
    { name: "Others", value: 10, color: "rgba(255,255,255,0.05)", amount: "$2,400" },
];

export function BonusPieChart() {
    let cumulativePercent = 0;

    // Helper to calculate SVG path for a pie slice
    const getPathData = (startPercent: number, endPercent: number) => {
        const startAngle = (startPercent / 100) * 2 * Math.PI;
        const endAngle = (endPercent / 100) * 2 * Math.PI;

        const x1 = Math.cos(startAngle) * 50;
        const y1 = Math.sin(startAngle) * 50;
        const x2 = Math.cos(endAngle) * 50;
        const y2 = Math.sin(endAngle) * 50;

        const largeArcFlag = endPercent - startPercent > 50 ? 1 : 0;

        return `M 0 0 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    };

    return (
        <div className="flex flex-col items-center">
            {/* The Pie Container */}
            <div className="relative w-64 h-64 mb-10">
                <svg viewBox="-50 -50 100 100" className="w-full h-full -rotate-90">
                    {bonusData.map((s, i) => {
                        const start = cumulativePercent;
                        cumulativePercent += s.value;
                        const d = getPathData(start, cumulativePercent);

                        return (
                            <motion.path
                                key={i}
                                d={d}
                                fill={s.color}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="hover:opacity-80 transition-opacity cursor-pointer"
                            />
                        );
                    })}
                    {/* Inner Hole for Donut effect */}
                    <circle cx="0" cy="0" r="32" className="fill-surface dark:fill-dark-surface" />
                </svg>

                {/* Central Labels */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Bonus Pool</p>
                    <p className="text-2xl font-display font-bold text-text-primary dark:text-white tracking-tighter leading-none">$24,000</p>
                    <p className="text-[9px] font-bold text-coral uppercase mt-1 tracking-widest">Shared Yield</p>
                </div>
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full px-4">
                {bonusData.map((s, i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest group-hover:text-white transition-colors">
                                {s.name}
                            </span>
                        </div>
                        <span className="text-[10px] font-bold text-text-primary dark:text-white">{s.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
