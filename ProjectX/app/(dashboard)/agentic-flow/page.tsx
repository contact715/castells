"use client";

import { motion } from "framer-motion";
import { Workflow, Bot, Zap, Clock, PlayCircle, PauseCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AgenticFlowPage() {
    const agents = [
        { name: "Lead Qualifier Bot", status: "Active", task: "Qualifying 3 inbound leads", efficiency: "98%" },
        { name: "Nurture Assassin", status: "Active", task: "Following up with 12 cold leads", efficiency: "85%" },
        { name: "Schedule Keeper", status: "Idle", task: "Waiting for new bookings", efficiency: "100%" },
        { name: "Review Hunter", status: "Paused", task: "Maintenance Mode", efficiency: "0%" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-display tracking-tight text-white flex items-center gap-3">
                        <Workflow className="w-8 h-8 text-purple-500" />
                        Agentic Workflows
                    </h1>
                    <p className="text-text-secondary mt-1">Visualizer for your autonomous workforce.</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-500 text-white"><Zap className="w-4 h-4 mr-2" /> Trigger New Run</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {agents.map((agent, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={agent.name}
                    >
                        <Card variant="glass" className="p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${agent.status === "Active" ? "bg-purple-500 text-white" : "bg-white/10 text-text-tertiary"}`}>
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${agent.status === "Active" ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10"}`}>
                                    {agent.status}
                                </div>
                            </div>
                            <h3 className="font-bold text-white text-lg">{agent.name}</h3>
                            <p className="text-sm text-text-secondary mt-1">{agent.task}</p>

                            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                                <span className="text-xs text-text-tertiary">Efficiency</span>
                                <span className="text-sm font-bold text-white">{agent.efficiency}</span>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Live Feed Mock */}
            <Card className="p-6 border border-white/10 bg-black/20">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Clock className="w-4 h-4" /> Live Execution Logs</h3>
                <div className="space-y-4 font-mono text-xs">
                    <div className="flex gap-4 text-green-400">
                        <span className="text-white/30">10:42:01</span>
                        <span>[Lead Qualifier] Detected high-intent keyword "pricing" from Lead #4021.</span>
                    </div>
                    <div className="flex gap-4 text-blue-400">
                        <span className="text-white/30">10:41:55</span>
                        <span>[Nurture Assassin] Sent follow-up SMS to Lead #3992 (Day 3 Sequence).</span>
                    </div>
                    <div className="flex gap-4 text-text-secondary">
                        <span className="text-white/30">10:41:12</span>
                        <span>[System] Health check pass. All agents operational.</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
