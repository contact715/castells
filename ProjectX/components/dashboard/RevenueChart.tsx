"use client";

import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 19000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 25000 },
  { month: "May", revenue: 22000 },
  { month: "Jun", revenue: 30000 },
  { month: "Jul", revenue: 35000 },
  { month: "Aug", revenue: 40000 },
  { month: "Sep", revenue: 38000 },
  { month: "Oct", revenue: 45000 },
];

export function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card variant="default" className="p-6">
        <h3 className="text-2xl font-display font-semibold mb-6 text-text-primary dark:text-white">Revenue Trend (Monthly)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E08576" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#E08576" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" className="dark:stroke-white/5" />
            <XAxis
              dataKey="month"
              stroke="rgba(0,0,0,0.3)"
              axisLine={false}
              tickLine={false}
              className="dark:stroke-white/30"
              tick={{ fill: "rgba(0,0,0,0.5)", fontSize: 12, className: "dark:fill-white/50" }}
              dy={10}
            />
            <YAxis
              stroke="rgba(0,0,0,0.3)"
              axisLine={false}
              tickLine={false}
              className="dark:stroke-white/30"
              tick={{ fill: "rgba(0,0,0,0.5)", fontSize: 12, className: "dark:fill-white/50" }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="glass-panel p-4 rounded-xl border border-white/20 shadow-lg min-w-[200px]">
                      <p className="text-sm font-bold text-text-primary dark:text-white mb-2">{label}</p>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-text-secondary dark:text-white/60">Total Revenue</span>
                        <span className="text-lg font-display font-semibold text-coral">
                          ${payload[0].value?.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-px bg-white/10 my-2" />
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-text-secondary dark:text-white/60">Subscriptions</span>
                          <span className="text-text-primary dark:text-white font-medium">
                            ${(payload[0].value as number * 0.6).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-text-secondary dark:text-white/60">One-time Services</span>
                          <span className="text-text-primary dark:text-white font-medium">
                            ${(payload[0].value as number * 0.3).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-text-secondary dark:text-white/60">Add-ons</span>
                          <span className="text-text-primary dark:text-white font-medium">
                            ${(payload[0].value as number * 0.1).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{ stroke: '#E08576', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#E08576"
              strokeWidth={3}
              dot={{ fill: "#ff", stroke: "#E08576", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#E08576" }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </motion.div>
  );
}



