"use client";

import { motion } from "framer-motion";
import { DepartmentFilters } from "@/components/dashboard/DepartmentFilters";
import { DepartmentKPIs } from "@/components/dashboard/DepartmentKPIs";
import { DepartmentFunnel } from "@/components/dashboard/DepartmentFunnel";
import { DepartmentTrendChart } from "@/components/dashboard/DepartmentTrendChart";
import { DailySalesPlan } from "@/components/dashboard/DailySalesPlan";
import { SalesAchievements } from "@/components/dashboard/SalesAchievements";
import { DashboardSettings } from "@/components/dashboard/DashboardSettings";
import { Card } from "@/components/ui/Card";
import { TrendingUp, PieChart as PieChartIcon, Target, Users, Wallet, Rocket, BarChart3, Coins, Zap } from "lucide-react";
import { SalesWorkSchedule } from "@/components/dashboard/SalesWorkSchedule";
import { SalesComparisonTable } from "@/components/dashboard/SalesComparisonTable";
import { DepartmentAnalyticsTable } from "@/components/dashboard/DepartmentAnalyticsTable";

export default function SalesAnalyticsPage() {
    return (
        <div className="space-y-8 pb-12">
            {/* Header Area */}
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-4xl font-display font-bold text-white tracking-tight">Departmental Analytics</h1>
                    <p className="text-white/70 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Aggregate Sales Performance & Lead Intelligence</p>
                </div>

                <DepartmentFilters />
            </div>

            {/* Daily Briefing & Work Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-12">
                    <DailySalesPlan />
                </div>
                <div className="lg:col-span-12">
                    <SalesWorkSchedule />
                </div>
            </div>

            {/* HIGH-DENSITY FINANCIAL ROI LAYER */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    { label: "ROMI", val: "420%", sub: "Net Return", icon: <TrendingUp className="w-3.5 h-3.5" /> },
                    { label: "ROAS", val: "5.8x", sub: "Ad Spend", icon: <Target className="w-3.5 h-3.5" /> },
                    { label: "CPL Avg", val: "$32.4", sub: "Source Sync", icon: <Coins className="w-3.5 h-3.5" /> },
                    { label: "Est. Cost", val: "$142", sub: "Per Visit", icon: <Wallet className="w-3.5 h-3.5" /> },
                    { label: "CAC", val: "$412", sub: "Inst. Cost", icon: <Rocket className="w-3.5 h-3.5" /> },
                    { label: "Yield/Min", val: "$8.2", sub: "Talk Time", icon: <Zap className="w-3.5 h-3.5" /> },
                ].map((m, i) => (
                    <Card key={i} className="bg-[#11141D] p-5 border-white/10 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 text-white/[0.02]">
                            {m.icon}
                        </div>
                        <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">{m.label}</p>
                        <h4 className="text-xl font-black text-white tracking-widest">{m.val}</h4>
                        <p className="text-[8px] text-coral font-black uppercase mt-1 tracking-tight">{m.sub}</p>
                    </Card>
                ))}
            </div>

            {/* OWNER'S CONTROL MATRIX: TEAM COMPARISON */}
            <SalesComparisonTable />

            {/* Top KPIs Row */}
            <DepartmentKPIs />

            {/* DETAILED DEPARTMENT ANALYTICS TABLE */}
            <DepartmentAnalyticsTable />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Revenue Trend - 8 cols */}
                <div className="lg:col-span-8 space-y-6">
                    <Card variant="default" className="p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-coral" />
                                <h3 className="text-2xl font-display font-semibold text-white">Revenue Velocity</h3>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/80">Actual</span>
                                <span className="px-3 py-1 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40">Target</span>
                            </div>
                        </div>
                        <DepartmentTrendChart />

                        <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-8">
                            <div>
                                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">Average Deal Size</p>
                                <p className="text-xl font-display font-bold text-white">$12,480</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">Sales Cycle</p>
                                <p className="text-xl font-display font-bold text-white">18.4 Days</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">Quota Attainment</p>
                                <p className="text-xl font-display font-bold text-white">84%</p>
                            </div>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card variant="default" className="p-8">
                            <DepartmentFunnel />
                        </Card>
                        <DashboardSettings />
                    </div>
                </div>

                {/* Vertical Distribution Stats - 4 cols */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Source Distribution */}
                    <Card variant="default" className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <PieChartIcon className="w-5 h-5 text-coral" />
                            <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight">Source Quality</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Google Ads", value: "A (0.85)", color: "bg-emerald-500" },
                                { name: "Facebook", value: "B+ (0.72)", color: "bg-coral" },
                                { name: "Cold Outreach", value: "B- (0.64)", color: "bg-amber-500" },
                                { name: "Organic", value: "A+ (0.92)", color: "bg-indigo-500" },
                            ].map((source) => (
                                <div key={source.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${source.color}`} />
                                        <span className="text-sm font-bold text-white">{source.name}</span>
                                    </div>
                                    <span className="text-xs font-bold text-white/60">{source.value}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Regional Market Yield */}
                    <Card variant="default" className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Target className="w-5 h-5 text-coral" />
                            <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight">Market Yield</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "New York", yield: "$482k", cpl: "$28" },
                                { name: "California", yield: "$312k", cpl: "$34" },
                                { name: "Texas", yield: "$241k", cpl: "$31" },
                            ].map((market) => (
                                <div key={market.name} className="p-3 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-white uppercase tracking-widest">{market.name}</span>
                                        <span className="text-xs font-bold text-coral">{market.yield}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">CPL Avg</span>
                                        <span className="text-[10px] font-bold text-white/60">{market.cpl}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Global Team Performance */}
                    <Card variant="default" className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Users className="w-5 h-5 text-coral" />
                            <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight">Top Units</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Alpha Squad", rev: "$512k", conversion: "18%" },
                                { name: "Delta Unit", rev: "$408k", conversion: "14%" },
                                { name: "Echo Team", rev: "$320k", conversion: "11%" },
                            ].map((team) => (
                                <div key={team.name} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-display font-bold text-white">
                                        {team.name[0]}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs font-bold text-white">{team.name}</span>
                                            <span className="text-xs font-bold text-white">{team.rev}</span>
                                        </div>
                                        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                                            <div
                                                className="h-full bg-coral rounded-full"
                                                style={{ width: team.conversion }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
