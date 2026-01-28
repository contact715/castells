"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface FunnelStage {
    label: string;
    value: number;
    percentage: number;
}

const funnelStages: FunnelStage[] = [
    { label: "Leads In", value: 1200, percentage: 100 },
    { label: "Qualified", value: 850, percentage: 71 },
    { label: "Engaged", value: 520, percentage: 43 },
    { label: "Proposal Sent", value: 310, percentage: 26 },
    { label: "Won", value: 142, percentage: 12 },
];

// Get bar color based on percentage (matching gradient logic)
const getBarColor = (percentage: number) => {
    if (percentage >= 80) {
        return "bg-emerald-500"; // Green for high
    }
    if (percentage >= 60) {
        return "bg-amber-500"; // Yellow for medium
    }
    if (percentage >= 40) {
        return "bg-blue-500"; // Blue for small
    }
    return "bg-red-500"; // Red for very low
};

// Get gradient style based on percentage
const getGradientStyle = (percentage: number) => {
    if (percentage >= 80) {
        return {
            background: 'radial-gradient(circle at top left, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 100%), #2C2C2C'
        };
    }
    if (percentage >= 60) {
        return {
            background: 'radial-gradient(circle at top left, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 100%), #2C2C2C'
        };
    }
    if (percentage >= 40) {
        return {
            background: 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%), #2C2C2C'
        };
    }
    return {
        background: 'radial-gradient(circle at top left, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 50%, transparent 100%), #2C2C2C'
    };
};

// Get trend color based on percentage
const getTrendColor = (percentage: number) => {
    if (percentage >= 80) {
        return {
            gradient: "rgba(16, 185, 129, 0.25)",
            stroke: "rgba(16, 185, 129, 0.5)"
        };
    }
    if (percentage >= 60) {
        return {
            gradient: "rgba(245, 158, 11, 0.25)",
            stroke: "rgba(245, 158, 11, 0.5)"
        };
    }
    if (percentage >= 40) {
        return {
            gradient: "rgba(59, 130, 246, 0.25)",
            stroke: "rgba(59, 130, 246, 0.5)"
        };
    }
    return {
        gradient: "rgba(239, 68, 68, 0.25)",
        stroke: "rgba(239, 68, 68, 0.5)"
    };
};

// Generate trend data
const generateTrendData = (percentage: number) => {
    const days = 30;
    const points = [];
    const baseLevel = percentage;
    const wavePattern = [0, 2, 4, 6, 8, 7, 5, 3, 1, -1, -3, -2, 0, 3, 6, 8, 7, 5, 2, 0, -2, -4, -3, -1, 1, 3, 5, 4, 2, 0];
    for (let i = 0; i < days; i++) {
        const progress = i / (days - 1);
        const startLevel = Math.max(15, baseLevel - 25);
        const baseValue = startLevel + progress * (baseLevel - startLevel);
        const waveIndex = Math.floor((i / days) * wavePattern.length);
        const wave = wavePattern[waveIndex] || 0;
        const waveValue = (wave / 8) * 8;
        const value = Math.max(10, Math.min(95, baseValue + waveValue));
        points.push({ x: (i / (days - 1)) * 200, y: 100 - value });
    }
    return points;
};

// Create smooth path
const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return '';
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const next = points[i + 1] || curr;
        const cp1x = prev.x + (curr.x - prev.x) / 3;
        const cp1y = prev.y;
        const cp2x = curr.x - (next.x - curr.x) / 3;
        const cp2y = curr.y;
        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
    }
    path += ` L 200,100 L 0,100 Z`;
    return path;
};

/**
 * Thalassa-style Lead Funnel
 * Clean horizontal bar visualization
 */
export const LeadFunnel = memo(function LeadFunnel() {
    const maxValue = funnelStages[0].value;

    return (
        <div className="p-4 rounded-inner border border-white/10" style={{
            background: 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.1) 0%, transparent 50%), #2C2C2C'
        }}>
            <div className="space-y-4">
                {funnelStages.map((stage, index) => {
                    const width = (stage.value / maxValue) * 100;
                    const gradientStyle = getGradientStyle(stage.percentage);
                    const trendColors = getTrendColor(stage.percentage);
                    const trendPoints = generateTrendData(stage.percentage);
                    const areaPath = createSmoothPath(trendPoints);
                    const linePath = trendPoints.map((p, i) => i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`).join(' ');

                    return (
                        <div key={stage.label} className="group relative rounded-inner p-3 overflow-hidden border border-white/10" style={gradientStyle}>
                            {/* Background trend graph */}
                            <div className="absolute inset-0 rounded-inner pointer-events-none opacity-30">
                                <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id={`trendGradient-funnel-${index}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={trendColors.gradient} stopOpacity={0.4} />
                                            <stop offset="100%" stopColor={trendColors.gradient} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <path d={areaPath} fill={`url(#trendGradient-funnel-${index})`} />
                                    <path d={linePath} stroke={trendColors.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            
                            <div className="flex items-center justify-between mb-2 relative z-10">
                                <span className="text-sm text-white group-hover:text-white transition-colors">
                                    {stage.label}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-white">
                                        {stage.value.toLocaleString()}
                                    </span>
                                    <span className="text-xs text-gray-300">
                                        ({stage.percentage}%)
                                    </span>
                                </div>
                            </div>
                            <div className="relative h-3 rounded-full overflow-hidden bg-white/10 relative z-10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${width}%` }}
                                    transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                                    className={`absolute inset-y-0 left-0 ${getBarColor(stage.percentage)} rounded-full`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Conversion Rate Summary */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm text-white">Overall Conversion</span>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-white">11.8%</span>
                    <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">+2.4%</span>
                </div>
            </div>
        </div>
    );
});
