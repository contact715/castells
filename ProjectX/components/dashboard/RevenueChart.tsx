"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart
} from "recharts";
import { cn } from "@/lib/utils";

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

export function RevenueChart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgb(var(--accent))" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="rgb(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#64748b" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-[0.03]" />
                <XAxis
                    dataKey="month"
                    stroke="currentColor"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fontWeight: 700 }}
                    dy={10}
                    className="text-text-secondary dark:text-white/20 uppercase tracking-widest font-sans"
                />
                <YAxis
                    stroke="currentColor"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fontWeight: 700 }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    className="text-text-secondary dark:text-white/20 font-sans"
                />
                <Tooltip
                    content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                            const isForecast = !payload[0].payload.revenue;
                            return (
                                <div className="bg-surface dark:bg-dark-surface border border-black/5 dark:border-white/10 p-4 rounded-2xl shadow-2xl min-w-[200px]">
                                    <div className="flex justify-between items-center mb-3">
                                        <p className="text-[13px] font-display font-bold text-text-primary dark:text-white">{label}</p>
                                        {isForecast && (
                                            <span className="px-2 py-0.5 bg-coral/10 text-coral text-[8px] font-bold uppercase rounded-full tracking-widest">
                                                AI Forecast
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-text-secondary dark:text-white/40 uppercase tracking-widest">
                                            {isForecast ? 'Projected' : 'Actual'}
                                        </span>
                                        <span className={cn("text-lg font-display font-bold", isForecast ? "text-text-secondary dark:text-white/20" : "text-coral")}>
                                            ${(payload[0].value as number).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    }}
                    cursor={{ stroke: '#E08576', strokeWidth: 1, opacity: 0.2 }}
                />
                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="rgb(var(--accent))"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#revenueGradient)"
                    animationDuration={2000}
                />
                <Area
                    type="monotone"
                    dataKey="forecast"
                    stroke="#64748b"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fillOpacity={1}
                    fill="url(#forecastGradient)"
                    animationDuration={2000}
                    style={{ opacity: 0.5 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
