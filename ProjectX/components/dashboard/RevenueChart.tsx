"use client";

import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from "recharts";
import { memo } from "react";

const data = [
    { month: "Jan", revenue: 12000, forecast: 12000 },
    { month: "Feb", revenue: 19000, forecast: 19000 },
    { month: "Mar", revenue: 15000, forecast: 15000 },
    { month: "Apr", revenue: 25000, forecast: 25000 },
    { month: "May", revenue: 22000, forecast: 22000 },
    { month: "Jun", revenue: 30000, forecast: 30000 },
    { month: "Jul", revenue: 35000, forecast: 35000 },
    { month: "Aug", revenue: 40000, forecast: 40000 },
    { month: "Sep", revenue: 38000, forecast: 38000 },
    { month: "Oct", revenue: 45000, forecast: 45000 },
    { month: "Nov", forecast: 52000 },
    { month: "Dec", forecast: 61000 },
];

// Thalassa colors
const COLORS = {
    primary: "#10B981",      // Emerald Green
    secondary: "#94A3B8",    // Gray
    text: "#FFFFFF",
    textMuted: "#CCCCCC",
    grid: "rgba(255, 255, 255, 0.1)",
};

export const RevenueChart = memo(function RevenueChart() {
    // Определяем тренд: сравниваем первое и последнее значение
    const revenueData = data.filter(d => d.revenue !== undefined);
    const firstRevenue = revenueData[0]?.revenue || 0;
    const lastRevenue = revenueData[revenueData.length - 1]?.revenue || 0;
    const isRevenueUp = lastRevenue >= firstRevenue;
    
    // Для forecast сравниваем первое и последнее значение
    const forecastData = data.filter(d => d.forecast !== undefined);
    const firstForecast = forecastData[0]?.forecast || 0;
    const lastForecast = forecastData[forecastData.length - 1]?.forecast || 0;
    const isForecastUp = lastForecast >= firstForecast;
    
    const revenueColor = isRevenueUp ? "#10B981" : "#EF4444"; // Зеленый если вверх, красный если вниз
    const forecastColor = isForecastUp ? "#10B981" : "#EF4444"; // Зеленый если вверх, красный если вниз
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={revenueColor} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={revenueColor} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={forecastColor} stopOpacity={0.2} />
                        <stop offset="100%" stopColor={forecastColor} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false} 
                    stroke={COLORS.grid}
                />
                <XAxis
                    dataKey="month"
                    stroke={COLORS.textMuted}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: COLORS.textMuted }}
                    dy={10}
                />
                <YAxis
                    stroke={COLORS.textMuted}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: COLORS.textMuted }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    width={50}
                />
                <Tooltip
                    content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                            const isForecast = !payload[0].payload.revenue;
                            return (
                                <div className="bg-[#2C2C2C] border border-white/10 p-3 rounded-inner shadow-lg min-w-[140px]">
                                    <p className="text-sm font-semibold text-white mb-1">{label}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-400">
                                            {isForecast ? 'Forecast' : 'Revenue'}
                                        </span>
                                        <span className="text-sm font-semibold text-white">
                                            ${(payload[0].value as number).toLocaleString()}
                                        </span>
                                    </div>
                                    {isForecast && (
                                        <span className="inline-block mt-2 px-2 py-0.5 bg-white/10 text-gray-400 text-xs rounded-full">
                                            Projected
                                        </span>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    }}
                    cursor={{ stroke: revenueColor, strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke={revenueColor}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#revenueGradient)"
                    animationDuration={1000}
                />
                <Area
                    type="monotone"
                    dataKey="forecast"
                    stroke={forecastColor}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#forecastGradient)"
                    animationDuration={1000}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
});
