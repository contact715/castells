"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { KPICard } from "@/components/dashboard/KPICard";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";
import { Card } from "@/components/ui/Card";

const LeadFunnel = dynamic(() => import("@/components/dashboard/LeadFunnel").then(mod => mod.LeadFunnel), {
    loading: () => <div className="h-[300px] w-full animate-pulse bg-black/5 dark:bg-dark-surface/50 rounded-[2rem] " />
});
const RevenueChart = dynamic(() => import("@/components/dashboard/RevenueChart").then(mod => mod.RevenueChart), {
    loading: () => <div className="h-[300px] w-full animate-pulse bg-black/5 dark:bg-dark-surface/50 rounded-[2rem] " />
});

import { DollarSign, Target, User, Star, LayoutDashboard, Download, Calendar, TrendingUp, Activity, Users, MessageSquare, Phone, Shield, Search, Globe, Zap } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";






export default function DashboardPage() {
    const [dateRange, setDateRange] = useState("last-month");
    const [stats, setStats] = useState({
        revenue: 0,
        total_leads: 0,
        qualified_leads: 0,
        conversion_rate: 0,
        pipeline_value: 0
    });

    // Fetch stats from API
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/v1/analytics/stats");
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (e) {
                console.error("Failed to fetch dashboard stats", e);
            }
        };
        fetchStats();
    }, []);

    const kpiData = [
        {
            title: "Total Revenue",
            value: `$${(stats.revenue / 1000).toFixed(1)}k`,
            change: "+12.5%",
            trend: "up" as const,
            icon: <DollarSign className="w-6 h-6 text-emerald-500" />,
        },
        {
            title: "Pipeline Value",
            value: `$${(stats.pipeline_value / 1000).toFixed(1)}k`,
            change: "+18.2%",
            trend: "up" as const,
            icon: <Activity className="w-6 h-6 text-blue-500" />,
        },
        {
            title: "Conversion Rate",
            value: `${stats.conversion_rate}%`,
            change: "+4.1%",
            trend: "up" as const,
            icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
        },
        {
            title: "Active Leads",
            value: stats.total_leads.toString(),
            change: "+24.3%",
            trend: "up" as const,
            icon: <Users className="w-6 h-6 text-orange-500" />,
        },
    ];

    const moduleMetrics = [
        {
            module: "Smart Forms",
            metrics: [
                { label: "Submission Rate", value: "68%", change: "+5%", icon: <Zap className="w-4 h-4" /> },
                { label: "Top ZIP", value: "10005", sub: "30% Conv", icon: <Target className="w-4 h-4" /> }
            ],
            color: "text-orange-500"
        },
        {
            module: "AI Chat",
            metrics: [
                { label: "AI Bookings", value: "124", change: "+12", icon: <MessageSquare className="w-4 h-4" /> },
                { label: "Avg Response", value: "< 1s", sub: "Instant", icon: <TrendingUp className="w-4 h-4" /> }
            ],
            color: "text-blue-500"
        },
        {
            module: "AI Dialer",
            metrics: [
                { label: "Calls Made", value: "850", change: "+210", icon: <Phone className="w-4 h-4" /> },
                { label: "Pick-up Rate", value: "42%", sub: "High", icon: <Activity className="w-4 h-4" /> }
            ],
            color: "text-emerald-500"
        },
        {
            module: "Review Guardian",
            metrics: [
                { label: "Avg Rating", value: "4.9", change: "+0.2", icon: <Star className="w-4 h-4" /> },
                { label: "New Reviews", value: "32", sub: "This month", icon: <Shield className="w-4 h-4" /> }
            ],
            color: "text-yellow-500"
        },
        {
            module: "SEO Engine",
            metrics: [
                { label: "Kwd Ranking", value: "#3", change: "+4", icon: <Search className="w-4 h-4" /> },
                { label: "Organic Traf", value: "2.4k", sub: "+15%", icon: <Globe className="w-4 h-4" /> }
            ],
            color: "text-purple-500"
        },
        {
            module: "Reactivation",
            metrics: [
                { label: "Rev Recov", value: "$4.2k", change: "+$800", icon: <DollarSign className="w-4 h-4" /> },
                { label: "Leads Woke", value: "45", sub: "Converted", icon: <Zap className="w-4 h-4" /> }
            ],
            color: "text-pink-500"
        }
    ];

    // Placeholder for toast in case it is still referenced in JSX (though I should remove it if unused)
    const toast = { visible: false, type: "lead" as const, message: "", subtext: "" };


    return (
        <div
            className="space-y-6"
        >


            {/* Module Description */}
            {/* Module Description */}
            <ModuleDescription
                moduleName="Главная панель (Dashboard)"
                icon={<LayoutDashboard className="w-6 h-6" />}
                shortDescription="Единый центр управления, отображающий все ключевые метрики бизнеса в реальном времени. Включает KPI карточки, визуализацию воронки продаж, графики выручки и AI рекомендации. Получите полную картину бизнеса в одном месте и принимайте решения на основе данных."
                problem="У большинства бизнесов данные разбросаны по разным платформам. Руководители тратят 5-10 часов в неделю на ручной сбор отчетов. Без аналитики в реальном времени бизнес теряет деньги и поздно реагирует на изменения рынка."
                businessValue="Для клиента: Полная картина бизнеса в одном окне, AI инсайты, принятие решений на основе цифр, а не интуиции. Экономия 5-10 часов в неделю на аналитике. Прозрачность ROI и качества лидов."
                monetization="Базовый тариф: Включен во все подписки. Premium Analytics: +$200/мес (расширенные отчеты, прогнозы, экспорт данных, кастомные дашборды)."
                roi="Экономия времени: $500-1,000/мес. Рост конверсии на 15-20% за счет быстрой реакции на инсайты. Общий ROI: 300-400%."
                example="Пример: HVAC компания (200 лидов/мес) увидела через Дашборд, что ZIP-код 10005 дает +30% конверсии. Увеличили бюджет на этот район → получили +15 сделок/мес × $1,200 = $18,000 доп. выручки. Цена модуля: $497. ROI: 3,522%."
            />

            {/* Filters and Actions */}
            <div
                className="flex items-center justify-between flex-wrap gap-4"
            >
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-text-secondary dark:text-white/70" />
                        <Select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="w-48"
                        >
                            <option value="last-week">Last Week</option>
                            <option value="last-month">Last Month</option>
                            <option value="last-quarter">Last Quarter</option>
                            <option value="last-year">Last Year</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 ">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-medium text-green-500">{stats.total_leads > 0 ? "System Active" : "Waiting for Data"}</span>
                    </div>
                </div>
                <Button
                    variant="outline"
                    onClick={() => {
                        // TODO: Implement export
                        alert("Export feature - Coming soon!");
                    }}
                >
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiData.map((kpi, index) => (
                    <KPICard
                        key={index}
                        title={kpi.title}
                        value={kpi.value}
                        trend={{ value: parseFloat(kpi.change.replace(/[^0-9.-]+/g, "")), isPositive: kpi.trend === "up" }}
                        icon={kpi.icon}
                        variant="default" // You might want to map this based on kpi.color or other logic
                    />
                ))}
            </div>

            {/* Module Specific Analytics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {moduleMetrics.map((module, i) => (
                    <Card key={i} variant="default" className="flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className={`font-display font-semibold text-sm ${module.color}`}>
                                    {module.module}
                                </span>
                            </div>
                            <div className="space-y-4">
                                {module.metrics.map((m, j) => (
                                    <div key={j} className="group">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-text-secondary dark:text-white/40">
                                                {m.label}
                                            </span>
                                            <span className="text-emerald-500 text-[10px] font-bold">
                                                {m.change || m.sub}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-1 rounded-lg bg-black/5 dark:bg-white/5 text-text-secondary dark:text-white/60">
                                                {m.icon}
                                            </div>
                                            <span className="text-lg font-display font-semibold text-text-primary dark:text-white">
                                                {m.value}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card variant="default" className="hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-coral" />
                            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">AI Lead Score</span>
                        </div>
                        <span className="text-lg font-display font-semibold text-coral">78/100</span>
                    </div>
                    <Progress value={78} max={100} />
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <LeadFunnel />
                    <RevenueChart />
                </div>
                <div>
                    <AIInsights />
                </div>
            </div>
        </div>
    );
}



