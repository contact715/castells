"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { KPICard } from "@/components/dashboard/KPICard";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";

const LeadFunnel = dynamic(() => import("@/components/dashboard/LeadFunnel").then(mod => mod.LeadFunnel), {
  loading: () => <div className="h-[300px] w-full animate-pulse bg-white/5 rounded-xl border border-white/5" />
});
const RevenueChart = dynamic(() => import("@/components/dashboard/RevenueChart").then(mod => mod.RevenueChart), {
  loading: () => <div className="h-[300px] w-full animate-pulse bg-white/5 rounded-xl border border-white/5" />
});

import { DollarSign, Target, User, Star, LayoutDashboard, Download, Calendar, TrendingUp, Activity, Users } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

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
      icon: <DollarSign className="w-6 h-6 text-white" />,
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Active Leads",
      value: stats.total_leads.toString(),
      change: "+24.3%",
      trend: "up" as const,
      icon: <Users className="w-6 h-6 text-white" />,
      color: "from-blue-500/20 to-indigo-500/20",
    },
    {
      title: "Conversion Rate",
      value: `${stats.conversion_rate}%`,
      change: "+4.1%",
      trend: "up" as const,
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Pipeline Value",
      value: `$${(stats.pipeline_value / 1000).toFixed(1)}k`,
      change: "+18.2%",
      trend: "up" as const,
      icon: <Activity className="w-6 h-6 text-white" />,
      color: "from-orange-500/20 to-red-500/20",
    },
  ];

  // Placeholder for toast in case it is still referenced in JSX (though I should remove it if unused)
  const toast = { visible: false, type: "lead" as const, message: "", subtext: "" };


  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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
      <motion.div
        className="flex items-center justify-between flex-wrap gap-4"
        variants={itemVariants}
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
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
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
      </motion.div>

      {/* KPI Cards */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" variants={itemVariants}>
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
      </motion.div>

      {/* Lead Score Progress */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={itemVariants}>
        <div className="glass-panel rounded-card p-6 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">Lead Score</span>
            <span className="text-lg font-display font-semibold text-coral">78/100</span>
          </div>
          <Progress value={78} max={100} />
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8" variants={itemVariants}>
        <div className="lg:col-span-2 space-y-8">
          <LeadFunnel />
          <RevenueChart />
        </div>
        <div>
          <AIInsights />
        </div>
      </motion.div>
    </motion.div>
  );
}



