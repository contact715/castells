"use client";

import { motion } from "framer-motion";
import { Kanban, DollarSign, ExternalLink, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function PipelinePage() {
    const stages = [
        { id: "new", name: "New Leads", color: "border-blue-500" },
        { id: "qualified", name: "Qualified", color: "border-purple-500" },
        { id: "proposal", name: "Proposal Sent", color: "border-yellow-500" },
        { id: "closed", name: "Closed Won", color: "border-green-500" },
    ];

    // Mock Data
    const deals = [
        { id: 1, name: "John Doe - Roof Repair", value: "$12,000", stage: "new" },
        { id: 2, name: "Sarah Smith - HVAC Install", value: "$8,500", stage: "qualified" },
        { id: 3, name: "Metro Complex", value: "$45,000", stage: "proposal" },
        { id: 4, name: "Downtown Office", value: "$22,000", stage: "closed" },
    ];

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold font-display tracking-tight text-white flex items-center gap-3">
                        <Kanban className="w-8 h-8 text-orange-500" />
                        Deals Pipeline
                    </h1>
                </div>
                <div className="flex gap-2">
                    <div className="bg-white/10 px-4 py-2 rounded-lg text-white font-mono text-sm border border-white/10">
                        Total Pipeline: <span className="text-green-400 font-bold">$87,500</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto">
                <div className="flex gap-6 h-full min-w-[1000px] pb-4">
                    {stages.map((stage) => (
                        <div key={stage.id} className="w-80 flex-shrink-0 flex flex-col h-full bg-surface dark:bg-dark-surface rounded-xl border border-white/5">
                            <div className={`p-4 border-t-4 ${stage.color} rounded-t-xl bg-white/5`}>
                                <h3 className="font-bold text-white flex justify-between">
                                    {stage.name}
                                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-text-secondary">
                                        {deals.filter(d => d.stage === stage.id).length}
                                    </span>
                                </h3>
                            </div>

                            <div className="flex-1 p-3 space-y-3 overflow-y-auto custom-scrollbar">
                                {deals.filter(d => d.stage === stage.id).map(deal => (
                                    <motion.div
                                        layoutId={`deal-${deal.id}`}
                                        key={deal.id}
                                        className="bg-layer-2 p-4 rounded-lg border border-white/5 hover:border-white/20 transition-all cursor-grab active:cursor-grabbing shadow-lg group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold text-blue-400">#{deal.id}</span>
                                            <button className="text-text-tertiary hover:text-white opacity-0 group-hover:opacity-100"><MoreHorizontal className="w-4 h-4" /></button>
                                        </div>
                                        <h4 className="font-medium text-white text-sm mb-2">{deal.name}</h4>
                                        <div className="flex items-center gap-1 text-green-400 font-bold text-sm">
                                            <DollarSign className="w-3 h-3" /> {deal.value}
                                        </div>
                                    </motion.div>
                                ))}

                                <div className="h-20 border-2 border-dashed border-white/5 rounded-lg flex items-center justify-center text-text-tertiary text-xs hover:bg-white/5 transition-colors cursor-pointer">
                                    + Add Deal
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
