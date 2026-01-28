"use client";

import { Card } from "@/components/ui/Card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, LineChart, Line } from "recharts";
import { Clock, Phone, TrendingUp, DollarSign, Star, Zap, CheckCircle2, Target, MessageSquare, TrendingDown, ArrowUpRight, Users, HelpCircle, ChevronRight } from "lucide-react";
import { memo, useState, useRef } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

// Цвета для темной темы
const COLORS = {
    primary: "#10B981",      // Emerald Green
    secondary: "#3B82F6",    // Blue
    warning: "#F59E0B",      // Amber
    danger: "#EF4444",       // Red
    text: "#FFFFFF",
    textMuted: "#CCCCCC",
    grid: "rgba(255, 255, 255, 0.1)",
};

// Данные для временных графиков (последние 24 часа)
const timeSeriesData = [
    { time: "00:00", latency: 25, connect: 9, contact: 34 },
    { time: "04:00", latency: 22, connect: 8, contact: 30 },
    { time: "08:00", latency: 18, connect: 7, contact: 25 },
    { time: "12:00", latency: 20, connect: 8, contact: 28 },
    { time: "16:00", latency: 24, connect: 9, contact: 33 },
    { time: "20:00", latency: 22, connect: 8, contact: 30 },
    { time: "24:00", latency: 22, connect: 8, contact: 30 },
];

// Данные для круговых диаграмм
const connectionRateData = [
    { name: "Connected", value: 87, color: COLORS.primary },
    { name: "Failed", value: 13, color: COLORS.danger },
];

const bridgeSuccessData = [
    { name: "Success", value: 92, color: COLORS.primary },
    { name: "Declined", value: 8, color: COLORS.warning },
];

const completionRateData = [
    { name: "Completed", value: 78, color: COLORS.primary },
    { name: "Dropped", value: 22, color: COLORS.danger },
];

// Данные для графика Lead Decay
const decayData = [
    { time: "0-30s", conversion: 95 },
    { time: "30-60s", conversion: 85 },
    { time: "1-2min", conversion: 70 },
    { time: "2-5min", conversion: 55 },
    { time: "5-10min", conversion: 42 },
    { time: "10+min", conversion: 28 },
];

// Данные для графика Cost Per Connect
const costData = [
    { month: "Jan", cost: 3.20 },
    { month: "Feb", cost: 2.90 },
    { month: "Mar", cost: 2.70 },
    { month: "Apr", cost: 2.50 },
    { month: "May", cost: 2.40 },
];

// Данные для графика Revenue
const revenueData = [
    { month: "Jan", revenue: 85 },
    { month: "Feb", revenue: 92 },
    { month: "Mar", revenue: 98 },
    { month: "Apr", revenue: 110 },
    { month: "May", revenue: 124 },
];

// Компонент для временных графиков скорости
export const SpeedTimeChart = memo(function SpeedTimeChart() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const helpIconRef = useRef<HTMLDivElement>(null);
    const description = "График показывает динамику времени отклика системы за последние 24 часа. Lead-to-Call Latency - время от отправки формы до звонка менеджеру. Time to Connect - время от начала звонка до поднятия трубки менеджером.";

    // Определяем тренд: для времени отклика меньше = лучше, но для градиента считаем по latency
    const firstLatency = timeSeriesData[0]?.latency || 0;
    const lastLatency = timeSeriesData[timeSeriesData.length - 1]?.latency || 0;
    const isTrendUp = lastLatency <= firstLatency; // Меньше время = лучше (зеленый)
    
    const gradientStyle = isTrendUp 
        ? { background: 'radial-gradient(circle at left top, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 100%)' }
        : { background: 'radial-gradient(circle at left top, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 50%, transparent 100%)' };

    return (
        <Card className="p-5 rounded-card border border-white/10 relative overflow-hidden">
            {/* Динамический градиентный фон */}
            <div 
                className="absolute inset-0 rounded-card pointer-events-none"
                style={gradientStyle}
            />
            
            <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-4">
                    <h3 className="text-sm font-semibold text-white">Время отклика за 24 часа</h3>
                    <div 
                        ref={helpIconRef}
                        className="relative shrink-0"
                        onMouseEnter={(e) => {
                            if (helpIconRef.current) {
                                const rect = helpIconRef.current.getBoundingClientRect();
                                setTooltipPosition({
                                    top: rect.top - 10,
                                    left: rect.left + 20
                                });
                                setShowTooltip(true);
                            }
                        }}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <HelpCircle 
                            className="w-3.5 h-3.5 text-gray-400 hover:text-gray-300 cursor-help transition-colors"
                        />
                        {showTooltip && typeof window !== 'undefined' && createPortal(
                            <div 
                                className="fixed z-[9999] w-64 p-3 bg-[#2C2C2C] border border-white/10 rounded-inner shadow-lg pointer-events-none"
                                style={{
                                    top: `${tooltipPosition.top}px`,
                                    left: `${tooltipPosition.left}px`,
                                    transform: 'translateY(-100%)'
                                }}
                            >
                                <p className="text-xs text-white leading-relaxed">{description}</p>
                                <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-[#2C2C2C] border-r border-b border-white/10 rotate-45"></div>
                            </div>,
                            document.body
                        )}
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={COLORS.primary} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="connectGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={COLORS.secondary} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={COLORS.secondary} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.grid} />
                        <XAxis 
                            dataKey="time" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: COLORS.textMuted }}
                        />
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: COLORS.textMuted }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#2C2C2C",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "8px",
                                color: COLORS.text,
                            }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="latency" 
                            stroke={COLORS.primary} 
                            fill="url(#latencyGradient)" 
                            strokeWidth={2}
                            name="Latency (сек)"
                        />
                        <Area 
                            type="monotone" 
                            dataKey="connect" 
                            stroke={COLORS.secondary} 
                            fill="url(#connectGradient)" 
                            strokeWidth={2}
                            name="Connect (сек)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-4 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.primary }} />
                        <span>Lead-to-Call Latency</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.secondary }} />
                        <span>Time to Connect</span>
                    </div>
                </div>
            </div>
        </Card>
    );
});

// Компонент для круговой диаграммы - кастомный стиль
export const PerformancePieChart = memo(function PerformancePieChart({ 
    title, 
    data, 
    value, 
    change,
    description
}: { 
    title: string; 
    data: Array<{ name: string; value: number; color: string }>; 
    value: string; 
    change?: string;
    description?: string;
}) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const helpIconRef = useRef<HTMLDivElement>(null);
    // Вычисляем общее значение для нормализации
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercent = 0;

    // Основной сегмент (первый элемент данных) - процент для градиента
    const mainSegment = data[0];
    const mainPercent = (mainSegment.value / total) * 100;
    const percentage = mainPercent;

    // Определяем CSS градиент в зависимости от процента (как в StatCard)
    const getGradientStyle = (percent: number) => {
        if (percent >= 80) {
            return {
                background: 'radial-gradient(circle at top left, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 100%)'
            };
        }
        if (percent >= 60) {
            return {
                background: 'radial-gradient(circle at top left, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 100%)'
            };
        }
        if (percent >= 40) {
            return {
                background: 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)'
            };
        }
        return {
            background: 'radial-gradient(circle at top left, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 50%, transparent 100%)'
        };
    };

    // Генерируем данные для фонового графика тренда (как в StatCard)
    const generateTrendData = () => {
        const days = 30;
        const points = [];
        const isPositive = !change || !change.startsWith("-");
        const baseLevel = percentage > 0 ? percentage : 50;
        
        const wavePattern = [
            0, 2, 4, 6, 8, 7, 5, 3, 1, -1, -3, -2, 0, 3, 6, 8, 7, 5, 2, 0,
            -2, -4, -3, -1, 1, 3, 5, 4, 2, 0
        ];
        
        for (let i = 0; i < days; i++) {
            const progress = i / (days - 1);
            
            let baseValue;
            if (isPositive) {
                const startLevel = Math.max(15, baseLevel - 25);
                baseValue = startLevel + progress * (baseLevel - startLevel);
            } else {
                const startLevel = Math.min(85, baseLevel + 25);
                baseValue = startLevel - progress * (startLevel - baseLevel);
            }
            
            const waveIndex = Math.floor((i / days) * wavePattern.length);
            const wave = wavePattern[waveIndex] || 0;
            const waveValue = (wave / 8) * 8;
            
            const value = Math.max(10, Math.min(95, baseValue + waveValue));
            points.push({ x: (i / (days - 1)) * 200, y: 100 - value });
        }
        return points;
    };

    const trendPoints = generateTrendData();
    
    // Определяем цвет графика на основе процента
    const getTrendColor = (percent: number) => {
        if (percent >= 80) {
            return {
                gradient: "rgba(16, 185, 129, 0.25)",
                stroke: "rgba(16, 185, 129, 0.5)"
            };
        }
        if (percent >= 60) {
            return {
                gradient: "rgba(245, 158, 11, 0.25)",
                stroke: "rgba(245, 158, 11, 0.5)"
            };
        }
        if (percent >= 40) {
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
    
    const trendColors = getTrendColor(percentage);
    
    // Создаем плавный путь через точки используя кривые Безье
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
    
    const areaPath = createSmoothPath(trendPoints);
    const linePath = trendPoints.map((p, i) => i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`).join(' ');

    // Функция для вычисления пути сектора
    const getPathData = (startPercent: number, endPercent: number, radius: number = 50) => {
        const startAngle = (startPercent / 100) * 2 * Math.PI - Math.PI / 2;
        const endAngle = (endPercent / 100) * 2 * Math.PI - Math.PI / 2;

        const x1 = Math.cos(startAngle) * radius;
        const y1 = Math.sin(startAngle) * radius;
        const x2 = Math.cos(endAngle) * radius;
        const y2 = Math.sin(endAngle) * radius;

        const largeArcFlag = endPercent - startPercent > 50 ? 1 : 0;

        return `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    };

    // Сбрасываем cumulativePercent для диаграммы
    cumulativePercent = 0;

    return (
        <Card className="p-5 rounded-card border border-white/10 relative overflow-hidden" style={{ position: 'relative', left: '-3px', top: '2px' }}>
            {/* Градиентный overlay в зависимости от процента */}
            {percentage > 0 && (
                <div 
                    className="absolute inset-0 rounded-card pointer-events-none"
                    style={getGradientStyle(percentage)}
                />
            )}
            
            {/* Фоновый график тренда (как в StatCard) */}
            {percentage > 0 && (
                <div className="absolute inset-0 rounded-card pointer-events-none opacity-40">
                    <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
                        <defs>
                            <linearGradient id={`pie-trendGradient-${title.replace(/\s/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={trendColors.gradient} stopOpacity={0.5} />
                                <stop offset="100%" stopColor={trendColors.gradient} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        {/* Заливка под графиком */}
                        <path
                            d={areaPath}
                            fill={`url(#pie-trendGradient-${title.replace(/\s/g, '-')})`}
                        />
                        {/* Линия графика */}
                        <path
                            d={linePath}
                            stroke={trendColors.stroke}
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            )}

            <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-4">
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    {description && (
                        <div 
                            ref={helpIconRef}
                            className="relative shrink-0"
                            onMouseEnter={(e) => {
                                if (helpIconRef.current) {
                                    const rect = helpIconRef.current.getBoundingClientRect();
                                    setTooltipPosition({
                                        top: rect.top - 10,
                                        left: rect.left + 20
                                    });
                                    setShowTooltip(true);
                                }
                            }}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            <HelpCircle 
                                className="w-3.5 h-3.5 text-gray-400 hover:text-gray-300 cursor-help transition-colors"
                            />
                            {showTooltip && typeof window !== 'undefined' && createPortal(
                                <div 
                                    className="fixed z-[9999] w-64 p-3 bg-[#2C2C2C] border border-white/10 rounded-inner shadow-lg pointer-events-none"
                                    style={{
                                        top: `${tooltipPosition.top}px`,
                                        left: `${tooltipPosition.left}px`,
                                        transform: 'translateY(-100%)'
                                    }}
                                >
                                    <p className="text-xs text-white leading-relaxed">{description}</p>
                                    <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-[#2C2C2C] border-r border-b border-white/10 rotate-45"></div>
                                </div>,
                                document.body
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-6">
                    {/* Круговая диаграмма */}
                    <div className="relative w-32 h-32 flex-shrink-0">
                        <svg viewBox="-60 -60 120 120" className="w-full h-full">
                            <defs>
                                {/* Градиент для основного сегмента */}
                                <linearGradient id={`gradient-${title.replace(/\s/g, '-')}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={mainSegment.color} stopOpacity="1" />
                                    <stop offset="100%" stopColor={mainSegment.color} stopOpacity="0.7" />
                                </linearGradient>
                                {/* Градиент для фона */}
                                <linearGradient id={`bg-gradient-${title.replace(/\s/g, '-')}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={data[1]?.color || COLORS.danger} stopOpacity="0.3" />
                                    <stop offset="100%" stopColor={data[1]?.color || COLORS.danger} stopOpacity="0.1" />
                                </linearGradient>
                            </defs>
                            
                            {/* Фоновый круг (100%) */}
                            <circle 
                                cx="0" 
                                cy="0" 
                                r="50" 
                                fill="url(#bg-gradient)" 
                                className="opacity-30"
                            />
                            
                            {/* Основной сегмент с анимацией */}
                            {data.map((entry, index) => {
                                const start = cumulativePercent;
                                cumulativePercent += (entry.value / total) * 100;
                                const end = cumulativePercent;
                                const d = getPathData(start, end, 50);

                                return (
                                    <motion.path
                                        key={index}
                                        d={d}
                                        fill={index === 0 ? `url(#gradient-${title.replace(/\s/g, '-')})` : entry.color}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: index === 0 ? 1 : 0.4, scale: 1 }}
                                        transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                                        className="transition-all duration-300"
                                        style={{
                                            filter: index === 0 ? 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))' : 'none'
                                        }}
                                    />
                                );
                            })}
                            
                            {/* Внутренний круг для donut эффекта */}
                            <circle 
                                cx="0" 
                                cy="0" 
                                r="32" 
                                fill="#2C2C2C"
                                className="drop-shadow-lg"
                            />
                        </svg>

                        {/* Центральное значение */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <div className="text-2xl font-bold text-white leading-none">{value}</div>
                            {change && (
                                <div className={`text-xs mt-1 ${change.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>
                                    {change}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Легенда */}
                    <div className="flex-1 space-y-2">
                        {data.map((entry, index) => {
                            const percent = ((entry.value / total) * 100).toFixed(1);
                            return (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div 
                                            className="w-2 h-2 rounded-full" 
                                            style={{ 
                                                backgroundColor: entry.color,
                                                boxShadow: index === 0 ? `0 0 6px ${entry.color}` : 'none'
                                            }} 
                                        />
                                        <span className="text-xs text-gray-400">{entry.name}</span>
                                    </div>
                                    <span className="text-xs font-semibold text-white">{percent}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Card>
    );
});

// Цвет столбца по проценту (дизайн-система: >=80 зелёный, 60–80 жёлтый, 40–60 синий, <40 красный)
const getDecayBarColor = (pct: number) => {
    if (pct >= 80) return "#10B981"; // emerald
    if (pct >= 60) return "#F59E0B"; // amber
    if (pct >= 40) return "#3B82F6"; // blue
    return "#EF4444"; // red
};

// Get gradient style based on percentage (same as LeadFunnel)
const getDecayGradientStyle = (percentage: number) => {
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
const getDecayTrendColor = (percentage: number) => {
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

// Generate trend data for decay chart
const generateDecayTrendData = (percentage: number) => {
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

// Create smooth path for decay chart
const createDecaySmoothPath = (points: { x: number; y: number }[]) => {
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

// Компонент для графика Lead Decay (в стиле LeadFunnel)
export const LeadDecayChart = memo(function LeadDecayChart() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const helpIconRef = useRef<HTMLDivElement>(null);
    const description = "Как падает конверсия в зависимости от времени дозвона (например, сравнение конверсии при дозвоне за 30 сек vs 5 минут).";

    const maxConversion = decayData[0]?.conversion || 100;

    return (
        <Card 
            className="p-5 rounded-card border border-white/10 relative overflow-hidden flex flex-col h-full min-h-[420px]" 
            style={{ left: '-3px', top: '2px' }}
        >
            <div className="relative z-10 flex flex-col flex-1 min-h-0">
                <div className="flex items-center gap-1.5 mb-2 shrink-0">
                    <h3 className="text-lg font-semibold text-white">Lead Decay Rate</h3>
                    <div 
                        ref={helpIconRef}
                        className="relative shrink-0"
                        onMouseEnter={(e) => {
                            if (helpIconRef.current) {
                                const rect = helpIconRef.current.getBoundingClientRect();
                                setTooltipPosition({
                                    top: rect.top - 10,
                                    left: rect.left + 20
                                });
                                setShowTooltip(true);
                            }
                        }}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <HelpCircle 
                            className="w-3.5 h-3.5 text-gray-400 hover:text-gray-300 cursor-help transition-colors"
                        />
                        {showTooltip && typeof window !== 'undefined' && createPortal(
                            <div 
                                className="fixed z-[9999] w-64 p-3 bg-[#2C2C2C] border border-white/10 rounded-inner shadow-lg pointer-events-none"
                                style={{
                                    top: `${tooltipPosition.top}px`,
                                    left: `${tooltipPosition.left}px`,
                                    transform: 'translateY(-100%)'
                                }}
                            >
                                <p className="text-xs text-white leading-relaxed">{description}</p>
                                <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-[#2C2C2C] border-r border-b border-white/10 rotate-45"></div>
                            </div>,
                            document.body
                        )}
                    </div>
                </div>
                <p className="text-sm text-gray-400 mb-4 shrink-0">Падение конверсии в зависимости от времени дозвона</p>
                
                <div className="flex-1 p-4 rounded-inner border border-white/10 overflow-y-auto" style={{
                    background: 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.1) 0%, transparent 50%), #2C2C2C'
                }}>
                    <div className="space-y-3">
                        {decayData.map((entry, index) => {
                            const percentage = entry.conversion;
                            const width = (entry.conversion / maxConversion) * 100;
                            const gradientStyle = getDecayGradientStyle(percentage);
                            const trendColors = getDecayTrendColor(percentage);
                            const trendPoints = generateDecayTrendData(percentage);
                            const areaPath = createDecaySmoothPath(trendPoints);
                            const linePath = trendPoints.map((p, i) => i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`).join(' ');

                            return (
                                <div key={index} className="group relative rounded-inner p-3 overflow-hidden border border-white/10" style={gradientStyle}>
                                    {/* Background trend graph */}
                                    <div className="absolute inset-0 rounded-inner pointer-events-none opacity-30">
                                        <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id={`trendGradient-decay-${index}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor={trendColors.gradient} stopOpacity={0.4} />
                                                    <stop offset="100%" stopColor={trendColors.gradient} stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <path d={areaPath} fill={`url(#trendGradient-decay-${index})`} />
                                            <path d={linePath} stroke={trendColors.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mb-2 relative z-10">
                                        <span className="text-sm text-white group-hover:text-white transition-colors">
                                            {entry.time}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-white">
                                                {entry.conversion}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="relative h-3 rounded-full overflow-hidden bg-white/10 relative z-10">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${width}%` }}
                                            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                                            className="absolute inset-y-0 left-0 rounded-full"
                                            style={{ backgroundColor: getDecayBarColor(percentage) }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Card>
    );
});

// Компонент для графика Cost Per Connect
export const CostTrendChart = memo(function CostTrendChart() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const helpIconRef = useRef<HTMLDivElement>(null);
    const description = "Сколько стоит один успешный разговор (затраты на API Retell/Twilio + стоимость привлечения лида).";

    // Определяем тренд: для стоимости меньше = лучше (зеленый)
    const firstCost = costData[0]?.cost || 0;
    const lastCost = costData[costData.length - 1]?.cost || 0;
    const isTrendUp = lastCost <= firstCost; // Меньше стоимость = лучше (зеленый)
    
    const gradientStyle = isTrendUp 
        ? { background: 'radial-gradient(circle at top left, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 100%), #2C2C2C' }
        : { background: 'radial-gradient(circle at top left, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 50%, transparent 100%), #2C2C2C' };

    return (
        <Card className="relative p-5 rounded-card border border-white/10" style={{ left: '-3px', top: '2px' }}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-1.5">
                        <h3 className="text-lg font-semibold text-white">Cost Per Connect</h3>
                        <div 
                            ref={helpIconRef}
                            className="relative shrink-0"
                        onMouseEnter={(e) => {
                            if (helpIconRef.current) {
                                const rect = helpIconRef.current.getBoundingClientRect();
                                setTooltipPosition({
                                    top: rect.top - 10,
                                    left: rect.left + 20
                                });
                                setShowTooltip(true);
                            }
                        }}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <HelpCircle 
                            className="w-3.5 h-3.5 text-gray-400 hover:text-gray-300 cursor-help transition-colors"
                        />
                        {showTooltip && typeof window !== 'undefined' && createPortal(
                            <div 
                                className="fixed z-[9999] w-64 p-3 bg-[#2C2C2C] border border-white/10 rounded-inner shadow-lg pointer-events-none"
                                style={{
                                    top: `${tooltipPosition.top}px`,
                                    left: `${tooltipPosition.left}px`,
                                    transform: 'translateY(-100%)'
                                }}
                            >
                                <p className="text-xs text-white leading-relaxed">{description}</p>
                                <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-[#2C2C2C] border-r border-b border-white/10 rotate-45"></div>
                            </div>,
                            document.body
                        )}
                    </div>
                </div>
                    <p className="text-sm text-gray-400 mt-1">Monthly cost trends</p>
                </div>
                <button className="flex items-center gap-1 text-sm text-blue-400 font-medium hover:underline">
                    View Details <ChevronRight className="w-4 h-4" />
                </button>
            </div>
            <div className="h-[200px] w-full rounded-inner p-2 border border-white/10" style={gradientStyle}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={costData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.grid} />
                        <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: COLORS.textMuted }}
                        />
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: COLORS.textMuted }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#2C2C2C",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "8px",
                                color: COLORS.text,
                            }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="cost" 
                            stroke={COLORS.primary} 
                            strokeWidth={2}
                            dot={{ fill: COLORS.primary, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
});

// Компонент для графика Revenue
export const RevenueTrendChart = memo(function RevenueTrendChart() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const helpIconRef = useRef<HTMLDivElement>(null);
    const description = "Сумма закрытых сделок, которые прошли именно через модуль мгновенного дозвона.";

    // Определяем тренд: для дохода больше = лучше (зеленый)
    const firstRevenue = revenueData[0]?.revenue || 0;
    const lastRevenue = revenueData[revenueData.length - 1]?.revenue || 0;
    const isTrendUp = lastRevenue >= firstRevenue; // Больше доход = лучше (зеленый)
    
    const gradientStyle = isTrendUp 
        ? { background: 'radial-gradient(circle at top left, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 100%), #2C2C2C' }
        : { background: 'radial-gradient(circle at top left, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 50%, transparent 100%), #2C2C2C' };

    return (
        <Card className="relative p-5 rounded-card border border-white/10" style={{ left: '-3px', top: '2px' }}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-1.5">
                        <h3 className="text-lg font-semibold text-white">Dialer-Attributed Revenue</h3>
                    <div 
                        ref={helpIconRef}
                        className="relative shrink-0"
                        onMouseEnter={(e) => {
                            if (helpIconRef.current) {
                                const rect = helpIconRef.current.getBoundingClientRect();
                                setTooltipPosition({
                                    top: rect.top - 10,
                                    left: rect.left + 20
                                });
                                setShowTooltip(true);
                            }
                        }}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <HelpCircle 
                            className="w-3.5 h-3.5 text-gray-400 hover:text-gray-300 cursor-help transition-colors"
                        />
                        {showTooltip && typeof window !== 'undefined' && createPortal(
                            <div 
                                className="fixed z-[9999] w-64 p-3 bg-[#2C2C2C] border border-white/10 rounded-inner shadow-lg pointer-events-none"
                                style={{
                                    top: `${tooltipPosition.top}px`,
                                    left: `${tooltipPosition.left}px`,
                                    transform: 'translateY(-100%)'
                                }}
                            >
                                <p className="text-xs text-white leading-relaxed">{description}</p>
                                <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-[#2C2C2C] border-r border-b border-white/10 rotate-45"></div>
                            </div>,
                            document.body
                        )}
                    </div>
                </div>
                    <p className="text-sm text-gray-400 mt-1">Monthly dialer revenue</p>
                </div>
                <button className="flex items-center gap-1 text-sm text-blue-400 font-medium hover:underline">
                    View Details <ChevronRight className="w-4 h-4" />
                </button>
            </div>
            <div className="h-[200px] w-full rounded-inner p-2 border border-white/10" style={gradientStyle}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={COLORS.primary} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={COLORS.grid} />
                        <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: COLORS.textMuted }}
                        />
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: COLORS.textMuted }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#2C2C2C",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "8px",
                                color: COLORS.text,
                            }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke={COLORS.primary} 
                            fill="url(#revenueGradient)" 
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
});

// Компонент для рейтинга со звездами
export const StarRatingCard = memo(function StarRatingCard({ 
    title, 
    value, 
    maxValue, 
    change,
    description
}: { 
    title: string; 
    value: number; 
    maxValue: number; 
    change?: string;
    description?: string;
}) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const helpIconRef = useRef<HTMLDivElement>(null);
    const percentage = (value / maxValue) * 100;
    const filledStars = Math.round(value);
    
    // Генерируем данные для фонового графика тренда
    const generateTrendData = () => {
        const days = 30;
        const points = [];
        const isPositive = !change || !change.startsWith("-");
        const baseLevel = percentage;
        const wavePattern = [0, 2, 4, 6, 8, 7, 5, 3, 1, -1, -3, -2, 0, 3, 6, 8, 7, 5, 2, 0, -2, -4, -3, -1, 1, 3, 5, 4, 2, 0];
        for (let i = 0; i < days; i++) {
            const progress = i / (days - 1);
            let baseValue;
            if (isPositive) {
                const startLevel = Math.max(15, baseLevel - 25);
                baseValue = startLevel + progress * (baseLevel - startLevel);
            } else {
                const startLevel = Math.min(85, baseLevel + 25);
                baseValue = startLevel - progress * (startLevel - baseLevel);
            }
            const waveIndex = Math.floor((i / days) * wavePattern.length);
            const wave = wavePattern[waveIndex] || 0;
            const waveValue = (wave / 8) * 8;
            const value = Math.max(10, Math.min(95, baseValue + waveValue));
            points.push({ x: (i / (days - 1)) * 200, y: 100 - value });
        }
        return points;
    };

    const trendPoints = generateTrendData();
    const trendColors = {
        gradient: "rgba(251, 146, 60, 0.25)",
        stroke: "rgba(251, 146, 60, 0.5)"
    };
    
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
    
    const areaPath = createSmoothPath(trendPoints);
    const linePath = trendPoints.map((p, i) => i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`).join(' ');
    
    return (
        <Card className="p-5 rounded-card border border-white/10 relative overflow-hidden">
            {/* Оранжевый радиальный градиент */}
            <div 
                className="absolute inset-0 rounded-card pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at top left, rgba(251, 146, 60, 0.2) 0%, rgba(251, 146, 60, 0.05) 50%, transparent 100%)'
                }}
            />
            
            {/* Фоновый график тренда */}
            {percentage > 0 && (
                <div className="absolute inset-0 rounded-card pointer-events-none opacity-40">
                    <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
                        <defs>
                            <linearGradient id={`star-trendGradient-${title.replace(/\s/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={trendColors.gradient} stopOpacity={0.5} />
                                <stop offset="100%" stopColor={trendColors.gradient} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <path d={areaPath} fill={`url(#star-trendGradient-${title.replace(/\s/g, '-')})`} />
                        <path d={linePath} stroke={trendColors.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            )}
            
            <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-2">
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    {description && (
                        <div 
                            ref={helpIconRef}
                            className="relative shrink-0"
                            onMouseEnter={(e) => {
                                if (helpIconRef.current) {
                                    const rect = helpIconRef.current.getBoundingClientRect();
                                    setTooltipPosition({
                                        top: rect.top - 10,
                                        left: rect.left + 20
                                    });
                                    setShowTooltip(true);
                                }
                            }}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            <HelpCircle 
                                className="w-3.5 h-3.5 text-gray-400 hover:text-gray-300 cursor-help transition-colors"
                            />
                            {showTooltip && typeof window !== 'undefined' && createPortal(
                                <div 
                                    className="fixed z-[9999] w-64 p-3 bg-[#2C2C2C] border border-white/10 rounded-inner shadow-lg pointer-events-none"
                                    style={{
                                        top: `${tooltipPosition.top}px`,
                                        left: `${tooltipPosition.left}px`,
                                        transform: 'translateY(-100%)'
                                    }}
                                >
                                    <p className="text-xs text-white leading-relaxed">{description}</p>
                                    <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-[#2C2C2C] border-r border-b border-white/10 rotate-45"></div>
                                </div>,
                                document.body
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex gap-1">
                        {Array.from({ length: maxValue }).map((_, i) => (
                            <Star
                                key={i}
                                className={`w-5 h-5 ${
                                    i < filledStars ? "fill-amber-400 text-amber-400" : "text-gray-600"
                                }`}
                            />
                        ))}
                    </div>
                    <div className="text-2xl font-bold text-white">
                        {value.toFixed(1)}/{maxValue}
                    </div>
                </div>
                {change && (
                    <div className={`text-sm ${change.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>
                        {change}
                    </div>
                )}
                <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </Card>
    );
});
