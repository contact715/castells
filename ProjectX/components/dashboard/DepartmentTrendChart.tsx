"use client";

import { Card } from "@/components/ui/Card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', revenue: 4000, target: 4500 },
    { name: 'Tue', revenue: 3000, target: 4500 },
    { name: 'Wed', revenue: 5500, target: 4500 },
    { name: 'Thu', revenue: 4800, target: 4500 },
    { name: 'Fri', revenue: 8200, target: 4500 },
    { name: 'Sat', revenue: 7600, target: 4500 },
    { name: 'Sun', revenue: 10500, target: 4500 },
];

export function DepartmentTrendChart() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FB6F5C" stopOpacity={0.05} />
                            <stop offset="95%" stopColor="#FB6F5C" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fontWeight: 700, fill: 'white' }}
                        dy={10}
                    />
                    <YAxis
                        hide
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1a1a1a',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: 'white'
                        }}
                        itemStyle={{ color: 'white' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#FB6F5C"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                    />
                    <Area
                        type="monotone"
                        dataKey="target"
                        stroke="rgba(0,0,0,0.1)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        fill="transparent"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
