"use client";

import { memo } from "react";
import { Map, MapControls, MapMarker, MarkerContent } from "@/components/ui/map";

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

const regions = [
    { name: "Downtown Sacramento (95814)", value: 85 },
    { name: "Midtown (95816)", value: 64 },
    { name: "East Sacramento (95819)", value: 42 },
    { name: "Natomas (95833)", value: 28 },
];

// Get gradient style based on percentage (same system as StatCards)
const getGradientStyle = (percentage: number) => {
    if (percentage >= 80) {
        // Зеленый для высоких показателей (>= 80%)
        return {
            background: 'radial-gradient(circle at top left, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 100%), #2C2C2C'
        };
    }
    if (percentage >= 60) {
        // Желтый для средних показателей (60-80%)
        return {
            background: 'radial-gradient(circle at top left, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 100%), #2C2C2C'
        };
    }
    if (percentage >= 40) {
        // Голубой для маленьких показателей (40-60%)
        return {
            background: 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%), #2C2C2C'
        };
    }
    // Красный для совсем низких показателей (< 40%)
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
 * Thalassa-style Geo Heatmap
 * Clean, light visualization of regional coverage
 */
export const GeoHeatmap = memo(function GeoHeatmap() {
    return (
        <div 
            className="h-full flex flex-col p-4 rounded-inner border border-white/10" 
            style={{
                position: 'relative',
                left: '-3px',
                top: '2px',
                background: 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.1) 0%, transparent 50%), #2C2C2C'
            }}
        >
            {/* Map Visualization */}
            <div className="h-[400px] relative rounded-inner mb-4 border border-white/10" style={{ overflow: 'hidden' }}>
                <div className="w-full h-full">
                    <Map 
                        theme="dark"
                        center={[-121.4944, 38.5816]}
                        zoom={11}
                    >
                    {/* Markers for Sacramento areas */}
                    <MapMarker longitude={-121.4944} latitude={38.5816}>
                        <MarkerContent>
                            <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
                        </MarkerContent>
                    </MapMarker>
                    <MapMarker longitude={-121.4800} latitude={38.5700}>
                        <MarkerContent>
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 border-2 border-white shadow-lg" />
                        </MarkerContent>
                    </MapMarker>
                    <MapMarker longitude={-121.4500} latitude={38.5600}>
                        <MarkerContent>
                            <div className="w-2 h-2 rounded-full bg-blue-300 border-2 border-white shadow-lg" />
                        </MarkerContent>
                    </MapMarker>
                    <MapMarker longitude={-121.5200} latitude={38.6100}>
                        <MarkerContent>
                            <div className="w-2 h-2 rounded-full bg-blue-200 border-2 border-white shadow-lg" />
                        </MarkerContent>
                    </MapMarker>
                    <MapControls position="bottom-right" showZoom={true} />
                    </Map>
                </div>

                {/* Status Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-[#2C2C2C] rounded-element shadow-lg border border-white/10 z-20">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-xs font-medium text-white">Live Tracking</span>
                </div>
            </div>

            {/* Regional Stats */}
            <div className="space-y-3">
                {regions.map((reg, i) => {
                    const gradientStyle = getGradientStyle(reg.value);
                    const trendColors = getTrendColor(reg.value);
                    const trendPoints = generateTrendData(reg.value);
                    const areaPath = createSmoothPath(trendPoints);
                    const linePath = trendPoints.map((p, i) => i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`).join(' ');

                    return (
                        <div key={i} className="relative rounded-inner p-3 overflow-hidden border border-white/10" style={gradientStyle}>
                            {/* Background trend graph */}
                            <div className="absolute inset-0 rounded-inner pointer-events-none opacity-30">
                                <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id={`trendGradient-geo-${i}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={trendColors.gradient} stopOpacity={0.4} />
                                            <stop offset="100%" stopColor={trendColors.gradient} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <path d={areaPath} fill={`url(#trendGradient-geo-${i})`} />
                                    <path d={linePath} stroke={trendColors.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            
                            <div className="flex justify-between items-center mb-1.5 relative z-10">
                                <span className="text-sm text-white">{reg.name}</span>
                                <span className="text-sm font-semibold text-white">{reg.value}%</span>
                            </div>
                            <div className="relative h-2 rounded-full overflow-hidden bg-white/10 relative z-10">
                                <div
                                    style={{ width: `${reg.value}%` }}
                                    className={`absolute inset-y-0 left-0 ${getBarColor(reg.value)} rounded-full transition-all duration-500`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Highlight */}
            <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs text-white">Top Zone: Downtown Sacramento (95814)</span>
                    <span className="text-xs font-medium text-emerald-400">+312%</span>
                </div>
            </div>
        </div>
    );
});
