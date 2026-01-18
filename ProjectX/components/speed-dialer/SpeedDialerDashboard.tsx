"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Play, Pause, Activity, TrendingUp, Users, Clock, DollarSign, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function SpeedDialerDashboard() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left Column: Metrics & Controls */}
            <div className="lg:col-span-2 space-y-6">
                {/* Global Control & Hero Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card variant="strong" className="bg-primary/5 border-primary/20 p-6 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest text-primary">System Status</span>
                            </div>
                            <h3 className="text-2xl font-display font-bold text-text-primary dark:text-white">Active Hunt</h3>
                        </div>

                        <div className="mt-8">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 group">
                                <Pause className="w-4 h-4 mr-2 group-hover:scale-90 transition-transform" />
                                PAUSE HUNTING ENGINE
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6 flex flex-col justify-between">
                        <div className="flex items-center gap-2 mb-2 text-text-secondary dark:text-white/40">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Avg. Response Speed</span>
                        </div>
                        <div className="mt-4">
                            <div className="text-4xl font-display font-bold text-text-primary dark:text-white flex items-end gap-2">
                                14<span className="text-lg text-text-secondary dark:text-white/40 font-medium mb-1">sec</span>
                            </div>
                            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-green-500">
                                <TrendingUp className="w-3 h-3" />
                                <span>12% faster than yesterday</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:text-white/40 mb-2">Leads Saved</div>
                        <div className="text-2xl font-display font-bold text-text-primary dark:text-white">128</div>
                    </Card>
                    <Card className="p-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:text-white/40 mb-2">Active Agents</div>
                        <div className="text-2xl font-display font-bold text-text-primary dark:text-white flex items-center gap-2">
                            8 <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500 font-medium">ONLINE</span>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:text-white/40 mb-2">Est. Payouts</div>
                        <div className="text-2xl font-display font-bold text-text-primary dark:text-white flex items-center gap-1">
                            <span className="text-text-secondary dark:text-white/20">$</span>2.4k
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary dark:text-white/40 mb-2">ROI / Burn</div>
                        <div className="text-2xl font-display font-bold text-green-500">4.2x</div>
                    </Card>
                </div>

                {/* Real-time Activity Feed */}
                <Card variant="glass" className="flex-1 flex flex-col p-6 min-h-[300px]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-text-primary dark:text-white flex items-center gap-2">
                            <Activity className="w-4 h-4 text-primary" /> Live Feed
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-text-secondary dark:text-white/40 font-mono">LIVE</span>
                        </div>
                    </div>
                    <div className="space-y-4 font-mono text-xs">
                        {[
                            { time: "14:02:22", event: "New Lead: Roofing Request (Yelp)", type: "lead" },
                            { time: "14:02:24", event: "SMS sent to Client", type: "system" },
                            { time: "14:02:29", event: "Blast Dialing: 5 Agents", type: "system" },
                            { time: "14:02:41", event: "Sarah J. connected (12s)", type: "success" },
                        ].map((log, i) => (
                            <div key={i} className="flex gap-4 items-center border-b border-black/5 dark:border-white/5 pb-2 last:border-0 last:pb-0">
                                <span className="text-text-secondary/60 dark:text-white/20 w-16 shrink-0">{log.time}</span>
                                <span className={
                                    log.type === 'lead' ? 'text-text-primary dark:text-white font-bold' :
                                        log.type === 'success' ? 'text-green-500 font-bold' :
                                            'text-text-secondary dark:text-white/60'
                                }>{log.event}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Right Column: Leaderboard */}
            <div className="lg:col-span-1">
                <Card className="h-full bg-surface dark:bg-black/20 flex flex-col p-0 overflow-hidden">
                    <div className="p-6 border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-text-primary dark:text-white flex items-center gap-2">
                            <Users className="w-4 h-4" /> Daily Leaders
                        </h3>
                    </div>
                    <div className="p-4 space-y-2 overflow-y-auto">
                        {[
                            { name: "Sarah Johnson", money: 450, deals: 3, status: 'online' },
                            { name: "Mike Smith", money: 320, deals: 2, status: 'busy' },
                            { name: "Alex Chen", money: 150, deals: 1, status: 'online' },
                            { name: "Jessica Wu", money: 0, deals: 0, status: 'offline' },
                        ].map((agent, i) => (
                            <div key={i} className="p-3 rounded-xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center font-bold text-text-secondary dark:text-white/60 text-xs">
                                            {agent.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-[#1A1A1A] ${agent.status === 'online' ? 'bg-green-500' :
                                                agent.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                                            }`} />
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm text-text-primary dark:text-white">{agent.name}</div>
                                        <div className="text-[10px] text-text-secondary dark:text-white/40">{agent.deals} meetings set</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-green-500 text-sm">${agent.money}</div>
                                    <div className="text-[9px] font-bold uppercase tracking-wider text-text-secondary/50 dark:text-white/20">Bonus</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
