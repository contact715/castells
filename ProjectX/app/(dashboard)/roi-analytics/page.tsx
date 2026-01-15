"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
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
import { FileText, TrendingUp, Download, Share2 } from "lucide-react";
import { HeaderActions } from "@/components/layout/HeaderActions";

const roiData = [
    { month: "Jan", roi: 120 },
    { month: "Feb", roi: 180 },
    { month: "Mar", roi: 250 },
    { month: "Apr", roi: 320 },
    { month: "May", roi: 380 },
    { month: "Jun", roi: 450 },
];

const leadsBySourceData = [
    { name: "Google Ads", value: 450, color: "rgb(var(--accent))" },
    { name: "GMB", value: 320, color: "rgb(var(--accent-dark))" },
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
        <div
            className="flex flex-col h-full gap-8"
        >
            <HeaderActions>
                <Button variant="outline" className="rounded-[2rem]">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                </Button>
                <Button className="rounded-[2rem]">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF Report
                </Button>
            </HeaderActions>

            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex gap-2">
                    {/* Primary actions moved to Header */}
                    <Select
                        defaultValue="6m"
                        className="w-40 bg-black/5 dark:bg-dark-surface/50 rounded-[2rem]"
                    >
                        <option value="1m">Last 30 Days</option>
                        <option value="6m">Last 6 Months</option>
                        <option value="1y">Last Year</option>
                    </Select>
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
                                borderRadius: "12px",
                                color: "#000",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="roi"
                            stroke="rgb(var(--accent))"
                            strokeWidth={3}
                            dot={{ fill: "rgb(var(--accent))", r: 5 }}
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
                                    borderRadius: "12px",
                                    color: "#000",
                                }}
                            />
                            <Bar dataKey="cpl" fill="rgb(var(--accent))" />
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
        </div >
    );
}



