"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Pause, Activity, TrendingUp, Users, Clock, DollarSign, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Stat Card Component (точно как в dashboard)
const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    change, 
    icon: Icon,
    trend = "up",
}: { 
    title: string;
    value: string;
    subtitle?: string;
    change?: string;
    icon?: any;
    trend?: "up" | "down";
}) => {
    // Вычисляем процент заполненности из subtitle (например, "27,500 /30,000" -> 91.7%)
    // Или из value и subtitle (например, value="27,500", subtitle="/30,000")
    let percentage = 0;
    
    // Вариант 1: subtitle содержит оба значения "27,500 /30,000"
    if (subtitle && subtitle.includes("/") && !subtitle.startsWith("/")) {
        const parts = subtitle.split("/");
        if (parts.length === 2) {
            const currentStr = parts[0].replace(/,/g, "").trim();
            const maxStr = parts[1].replace(/,/g, "").trim();
            const current = parseFloat(currentStr) || 0;
            const max = parseFloat(maxStr) || 0;
            if (max > 0 && current > 0) {
                percentage = Math.min((current / max) * 100, 100);
            }
        }
    }
    
    // Вариант 2: value содержит текущее значение, subtitle содержит максимум "/30,000"
    if (percentage === 0 && subtitle && subtitle.startsWith("/")) {
        const currentStr = value.replace(/,/g, "").replace(/\$/g, "").replace(/k/gi, "").trim();
        const maxStr = subtitle.substring(1).replace(/,/g, "").trim();
        const current = parseFloat(currentStr) || 0;
        const max = parseFloat(maxStr) || 0;
        if (max > 0 && current > 0) {
            percentage = Math.min((current / max) * 100, 100);
        }
    }
    
    // Вариант 3: для "Avg. response time" или "Avg. Response Speed" - вычисляем процент на основе времени ответа
    if (percentage === 0 && (title === "Avg. response time" || title === "Avg. Response Speed") && subtitle && subtitle.includes("sec")) {
        const timeValue = parseFloat(value) || 0;
        const maxTime = 30; // Максимальное время ответа в секундах
        if (timeValue > 0) {
            percentage = Math.min((timeValue / maxTime) * 100, 100);
        }
    }
    
    // Вариант 4: для "Conversion rate" - извлекаем процент из value (например, "82%")
    if (percentage === 0 && title === "Conversion rate" && value.includes("%")) {
        const percentValue = parseFloat(value.replace(/%/g, "")) || 0;
        if (percentValue > 0) {
            percentage = Math.min(percentValue, 100);
        }
    }

    // Определяем CSS градиент в зависимости от процента:
    // >= 80% - зеленый (отличный показатель)
    // 60-80% - желтый (средний показатель)
    // 40-60% - голубой (маленький показатель)
    // < 40% - красный (совсем низкий показатель)
    const getGradientStyle = (percent: number) => {
        if (percent >= 80) {
            // Зеленый радиальный градиент для высоких показателей
            return {
                background: 'radial-gradient(circle at top left, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 100%)'
            };
        }
        if (percent >= 60) {
            // Желтый радиальный градиент для средних показателей
            return {
                background: 'radial-gradient(circle at top left, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 100%)'
            };
        }
        if (percent >= 40) {
            // Голубой радиальный градиент для маленьких показателей
            return {
                background: 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)'
            };
        }
        // Красный радиальный градиент для совсем низких показателей
        return {
            background: 'radial-gradient(circle at top left, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 50%, transparent 100%)'
        };
    };

    return (
        <Card className="relative overflow-hidden">
            {/* Градиентный overlay в зависимости от заполненности */}
            {percentage > 0 && (
                <div 
                    className="absolute inset-0 rounded-card pointer-events-none"
                    style={getGradientStyle(percentage)}
                />
            )}
            <div className="relative flex items-start justify-between z-10">
                <div className="flex-1">
                    {change && (
                        <div className={`inline-flex items-center gap-1 text-xs font-medium mb-2 px-2 py-0.5 rounded-full ${
                            trend === "up" 
                                ? "text-emerald-600 bg-emerald-50" 
                                : "text-red-500 bg-red-50"
                        }`}>
                            {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                            {change}
                        </div>
                    )}
                    <p className="text-sm text-gray-200 mb-1">{title}</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-semibold text-white">{value}</span>
                        {subtitle && <span className="text-sm text-gray-300">{subtitle}</span>}
                    </div>
                </div>
                {Icon && (
                    <div className="w-10 h-10 rounded-inner bg-white/10 flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${percentage > 0 ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                )}
            </div>
        </Card>
    );
};

// Team Member Row (точно как в dashboard)
const TeamMember = ({ 
    name, 
    role, 
    avatar, 
    status, 
    money,
    deals
}: { 
    name: string;
    role: string;
    avatar: string;
    status: "online" | "busy" | "offline";
    money: number;
    deals: number;
}) => (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-inner">
        <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-gray-300">
                {avatar}
            </div>
            <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#2C2C2C] ${
                status === "online" ? "bg-emerald-500" :
                status === "busy" ? "bg-amber-500" : "bg-gray-500"
            }`} />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{name}</p>
            <p className="text-xs text-gray-400">{deals} meetings set</p>
        </div>
        <div className="text-right">
            <p className="text-sm font-semibold text-emerald-400">${money}</p>
            <p className="text-xs text-gray-400">Bonus</p>
        </div>
    </div>
);

// Activity Feed Item (точно как AlertItem в dashboard)
const ActivityItem = ({ time, event, type }: { time: string; event: string; type: "lead" | "system" | "success" }) => (
    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-inner">
        <div className={`w-8 h-8 rounded-element flex items-center justify-center shrink-0 ${
            type === "success" ? "bg-emerald-500/20" :
            type === "lead" ? "bg-blue-500/20" : "bg-white/10"
        }`}>
            <Activity className={`w-4 h-4 ${
                type === "success" ? "text-emerald-400" :
                type === "lead" ? "text-blue-400" : "text-gray-400"
            }`} />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-200">{event}</p>
            <p className="text-xs text-gray-400 mt-0.5">{time}</p>
        </div>
    </div>
);

export function SpeedDialerDashboard() {
    return (
        <div className="space-y-6">
            {/* Top Stats Row - точно как в dashboard */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="Leads Saved"
                    value="128"
                    icon={Zap}
                />
                <StatCard 
                    title="Active Agents"
                    value="08"
                    subtitle="/12"
                    icon={Users}
                />
                <StatCard 
                    title="Est. Payouts"
                    value="$2.4k"
                    icon={DollarSign}
                />
                <StatCard 
                    title="Avg. Response Speed"
                    value="14"
                    subtitle="sec"
                    change="+12%"
                    trend="up"
                    icon={Clock}
                />
            </div>

            {/* Main Content Grid - точно как в dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* System Status Card - как AI Assistant в dashboard */}
                    <Card>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-inner bg-blue-500/20 flex items-center justify-center">
                                <Zap className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white">System Status</h3>
                                <p className="text-sm text-gray-400">Active Hunt Engine</p>
                            </div>
                            <div className="hidden sm:block text-right">
                                <p className="text-2xl font-semibold text-white">14</p>
                                <p className="text-xs text-gray-400">sec avg</p>
                            </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-white/10 rounded-inner">
                                <p className="text-xl font-semibold text-white">128</p>
                                <p className="text-xs text-gray-400">Leads</p>
                            </div>
                            <div className="text-center p-3 bg-white/10 rounded-inner">
                                <p className="text-xl font-semibold text-white">8</p>
                                <p className="text-xs text-gray-400">Agents</p>
                            </div>
                            <div className="text-center p-3 bg-white/10 rounded-inner">
                                <p className="text-xl font-semibold text-white">4.2x</p>
                                <p className="text-xs text-gray-400">ROI</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button className="w-full font-semibold bg-white text-gray-900 hover:bg-gray-50">
                                <Pause className="w-4 h-4 mr-2" />
                                PAUSE ENGINE
                            </Button>
                        </div>
                    </Card>

                    {/* Activity Feed - как Alerts в dashboard */}
                    <Card>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Live Feed</h3>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs text-gray-400 font-medium">LIVE</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {[
                                { time: "2 min ago", event: "New Lead: Roofing Request (Yelp)", type: "lead" as const },
                                { time: "5 min ago", event: "SMS sent to Client", type: "system" as const },
                                { time: "8 min ago", event: "Blast Dialing: 5 Agents", type: "system" as const },
                                { time: "12 min ago", event: "Sarah J. connected (12s)", type: "success" as const },
                            ].map((item, i) => (
                                <ActivityItem key={i} {...item} />
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column - точно как в dashboard */}
                <div className="space-y-6">
                    {/* Team Leaders - как Team в dashboard */}
                    <Card>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Daily Leaders</h3>
                            <button className="text-sm text-blue-400 font-medium hover:underline">
                                View All
                            </button>
                        </div>
                        <div className="space-y-2">
                            {[
                                { name: "Sarah Johnson", role: "Senior Agent", avatar: "SJ", status: "online" as const, money: 450, deals: 3 },
                                { name: "Mike Smith", role: "Agent", avatar: "MS", status: "busy" as const, money: 320, deals: 2 },
                                { name: "Alex Chen", role: "Agent", avatar: "AC", status: "online" as const, money: 150, deals: 1 },
                                { name: "Jessica Wu", role: "Junior Agent", avatar: "JW", status: "offline" as const, money: 0, deals: 0 },
                            ].map((member, i) => (
                                <TeamMember key={i} {...member} />
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
