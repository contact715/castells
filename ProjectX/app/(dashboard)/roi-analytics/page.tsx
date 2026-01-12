"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FileText, TrendingUp, Download } from "lucide-react";

const roiData = [
  { month: "Jan", roi: 120 },
  { month: "Feb", roi: 180 },
  { month: "Mar", roi: 250 },
  { month: "Apr", roi: 320 },
  { month: "May", roi: 380 },
  { month: "Jun", roi: 450 },
];

const leadsBySourceData = [
  { name: "Google Ads", value: 450, color: "#E08576" },
  { name: "GMB", value: 320, color: "#D67060" },
  { name: "Yelp", value: 280, color: "#F4A261" },
  { name: "Website", value: 150, color: "#2A9D8F" },
  { name: "Reactivation", value: 85, color: "#E76F51" },
];

const cplBySourceData = [
  { source: "Google Ads", cpl: 45 },
  { source: "GMB", cpl: 12 },
  { source: "Yelp", cpl: 18 },
  { source: "Website", cpl: 8 },
  { source: "Reactivation", cpl: 5 },
];

const salesPerformanceData = [
  {
    manager: "Mike Johnson",
    leadsAssigned: 120,
    dealsClosed: 45,
    conversionRate: 37.5,
    avgDealValue: 1250,
  },
  {
    manager: "Sarah Williams",
    leadsAssigned: 95,
    dealsClosed: 38,
    conversionRate: 40.0,
    avgDealValue: 1380,
  },
  {
    manager: "David Brown",
    leadsAssigned: 80,
    dealsClosed: 28,
    conversionRate: 35.0,
    avgDealValue: 1100,
  },
];

export default function ROIAnalyticsPage() {
  const [showCustomReportModal, setShowCustomReportModal] = useState(false);
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("");

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Module Description */}
      <ModuleDescription
        moduleName="ROI Analytics"
        icon={<TrendingUp className="w-6 h-6" />}
        shortDescription="Комплексная система аналитики и отчетности, показывающая ROI по каждому каналу привлечения, эффективность менеджеров, стоимость лида, конверсии и прогнозы. Включает настраиваемые отчеты и экспорт данных. Видьте окупаемость каждого канала в реальном времени и оптимизируйте распределение бюджета."
        problem="68% бизнесов не знают, какой канал привлечения работает эффективнее всего. Без аналитики невозможно оптимизировать бюджет (траты на неэффективные каналы). Средний бизнес теряет $5,000-15,000/месяц на неоптимальном распределении бюджета. Принятие решений без данных — это гадание."
        businessValue="Для клиентов: Видеть ROI каждого канала в реальном времени, перераспределять бюджет в самые эффективные каналы, увеличивать общий ROI на 30-50% за счет оптимизации, экономить $5,000-15,000/месяц на неэффективных каналах, принимать решения на основе данных, а не интуиции."
        monetization="Base tier: Базовая аналитика — включено. Pro tier: Расширенная аналитика, прогнозы, экспорт — +$150/месяц. Enterprise: Кастомные отчеты, API, интеграция с BI-системами — +$400/месяц."
        roi="Оптимизация бюджета: экономия $5,000-15,000/месяц на неэффективных каналах. Перераспределение в эффективные каналы: рост выручки на 30-50%. При бюджете $10,000/месяц: оптимизация дает +$3,000-5,000 дополнительной выручки. Общий ROI: 400-600%"
        example="Пример: Клиент тратит $10,000/месяц на маркетинг. Без аналитики: распределение 50/50 между каналами, ROI 250% = $25,000 выручки. С аналитикой: фокус на эффективных каналах (80% бюджета), ROI 350% = $35,000 выручки. Дополнительная выручка: $10,000/месяц. Стоимость ROI Analytics: $150/месяц. ROI: 6,567%"
      />

      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-display font-semibold text-text-primary dark:text-white">ROI Analytics</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              // TODO: Implement export
              alert("Export to PDF/Excel - Coming soon!");
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={() => setShowCustomReportModal(true)}>
            <FileText className="w-4 h-4 mr-2" />
            Generate Custom Report
          </Button>
        </div>
      </div>

      {/* Overall ROI */}
      <Card variant="default" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-semibold text-text-primary dark:text-white">Overall ROI</h3>
          <div className="text-right">
            <p className="text-5xl font-display font-semibold text-green-600 dark:text-green-400">+450%</p>
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">Last 6 months</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={roiData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" className="dark:stroke-white/10" />
            <XAxis
              dataKey="month"
              stroke="rgba(0,0,0,0.3)"
              className="dark:stroke-white/30"
              tick={{ fill: "rgba(0,0,0,0.7)", className: "dark:fill-white/70" }}
            />
            <YAxis
              stroke="rgba(0,0,0,0.3)"
              className="dark:stroke-white/30"
              tick={{ fill: "rgba(0,0,0,0.7)", className: "dark:fill-white/70" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid rgba(224, 133, 118, 0.3)",
                borderRadius: "12px",
                color: "#000",
              }}
            />
            <Line
              type="monotone"
              dataKey="roi"
              stroke="#E08576"
              strokeWidth={3}
              dot={{ fill: "#E08576", r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads by Source Pie Chart */}
        <Card variant="default" className="p-6">
          <h3 className="text-xl font-display font-semibold mb-6 text-text-primary dark:text-white">Leads by Source</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadsBySourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {leadsBySourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(24, 28, 32, 0.95)",
                  border: "1px solid rgba(0, 200, 255, 0.3)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* CPL by Source Bar Chart */}
        <Card variant="default" className="p-6">
          <h3 className="text-xl font-display font-semibold mb-6 text-text-primary dark:text-white">
            Cost Per Lead (CPL) by Source
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cplBySourceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" className="dark:stroke-white/10" />
              <XAxis
                dataKey="source"
                stroke="rgba(0,0,0,0.3)"
                className="dark:stroke-white/30"
                tick={{ fill: "rgba(0,0,0,0.7)", className: "dark:fill-white/70" }}
              />
              <YAxis
                stroke="rgba(0,0,0,0.3)"
                className="dark:stroke-white/30"
                tick={{ fill: "rgba(0,0,0,0.7)", className: "dark:fill-white/70" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid rgba(224, 133, 118, 0.3)",
                  borderRadius: "12px",
                  color: "#000",
                }}
              />
              <Bar dataKey="cpl" fill="#E08576" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Sales Performance Table */}
      <Card variant="default">
        <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Sales Performance by Manager</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Manager Name</TableHead>
              <TableHead>Leads Assigned</TableHead>
              <TableHead>Deals Closed</TableHead>
              <TableHead>Conversion Rate</TableHead>
              <TableHead>Avg. Deal Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesPerformanceData.map((manager, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{manager.manager}</TableCell>
                <TableCell>{manager.leadsAssigned}</TableCell>
                <TableCell>{manager.dealsClosed}</TableCell>
                <TableCell>{manager.conversionRate}%</TableCell>
                <TableCell>${manager.avgDealValue.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Custom Reports Modal */}
      <Modal
        isOpen={showCustomReportModal}
        onClose={() => setShowCustomReportModal(false)}
        title="Generate Custom Report"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
              Report Type
            </label>
            <Select>
              <option value="">Select report type</option>
              <option value="roi">ROI Analysis</option>
              <option value="leads">Lead Source Analysis</option>
              <option value="sales">Sales Performance</option>
              <option value="campaigns">Campaign Performance</option>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
              Date Range
            </label>
            <Select>
              <option value="">Select date range</option>
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
              <option value="last-quarter">Last Quarter</option>
              <option value="last-year">Last Year</option>
              <option value="custom">Custom Range</option>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
              Include Metrics
            </label>
            <div className="space-y-2">
              {["ROI", "CPL", "Conversion Rate", "Revenue", "Leads", "Avg. Deal Value", "Manager Performance"].map(
                (metric) => (
                  <label key={metric} className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    <span className="text-sm font-sans text-text-primary dark:text-white">{metric}</span>
                  </label>
                )
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
              Export Format
            </label>
            <Select>
              <option value="pdf">PDF</option>
              <option value="excel">Excel (.xlsx)</option>
              <option value="csv">CSV</option>
            </Select>
          </div>
          <Button className="w-full">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
}



