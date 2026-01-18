"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PlayCircle, Volume2, MessageSquare, PhoneCall, Calendar, Clock, CheckCircle2, XCircle, Search, MoreHorizontal, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LeadTimeline() {
    const [selectedLeadId, setSelectedLeadId] = useState("1");
    // Mock Data
    const leads = [
        { id: "1", name: "Didi Smith", number: "+1 (555) 012-3456", status: "HOT", time: "10:45 AM", source: "Yelp" },
        { id: "2", name: "John Doe", number: "+1 (555) 098-7654", status: "WARM", time: "09:30 AM", source: "Google" },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Lead List (Sidebar) */}
            <div className="lg:col-span-1 border-r border-black/5 dark:border-white/5 pr-6 hidden lg:block">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <input className="w-full bg-black/5 dark:bg-white/5 rounded-full pl-10 pr-4 py-2 text-sm outline-none" placeholder="Search leads..." />
                </div>
                <div className="space-y-2">
                    {leads.map(lead => (
                        <div
                            key={lead.id}
                            onClick={() => setSelectedLeadId(lead.id)}
                            className={`p-4 rounded-xl cursor-pointer transition-all ${selectedLeadId === lead.id
                                ? "bg-primary/10 border-primary/20 border"
                                : "hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-sm text-text-primary dark:text-white">{lead.name}</h4>
                                <Badge variant={lead.status === 'HOT' ? 'info' : 'default'} className="text-[10px] h-5 px-1.5">{lead.status}</Badge>
                            </div>
                            <div className="flex justify-between text-xs text-text-secondary dark:text-white/40">
                                <span>{lead.source}</span>
                                <span>{lead.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Timeline Content */}
            <div className="lg:col-span-2 flex flex-col h-full rounded-card overflow-hidden bg-surface dark:bg-black/20 border border-black/5 dark:border-white/5">
                {/* Header */}
                <div className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                            DS
                        </div>
                        <div>
                            <h2 className="text-xl font-display font-bold text-text-primary dark:text-white">Didi Smith</h2>
                            <div className="flex items-center gap-3 text-xs text-text-secondary dark:text-white/40">
                                <span className="flex items-center gap-1"><PhoneCall className="w-3 h-3" /> +1 (555) 012-3456</span>
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Added Oct 24, 10:45 AM</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="flex-1 overflow-y-auto p-8 bg-transparent">
                    <div className="space-y-8 relative">
                        {/* Connector Line */}
                        <div className="absolute left-[19px] top-6 bottom-0 w-0.5 bg-black/5 dark:bg-white/10" />

                        {/* Events */}
                        {/* Event 1: New Lead */}
                        <div className="flex gap-6 relative">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 z-10 bg-surface dark:bg-[#121212]">
                                <Search className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-bold text-text-secondary dark:text-white/40 mb-1">10:45:00 AM</div>
                                <Card className="p-4 bg-blue-500/5 border-blue-500/10">
                                    <div className="font-bold text-sm text-text-primary dark:text-white mb-1">New Lead Detected</div>
                                    <p className="text-xs text-text-secondary dark:text-white/60">Source: Yelp Integration. Intent: Roofing Estimate.</p>
                                </Card>
                            </div>
                        </div>

                        {/* Event 2: SMS */}
                        <div className="flex gap-6 relative">
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 z-10 bg-surface dark:bg-[#121212]">
                                <MessageSquare className="w-4 h-4 text-purple-500" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-bold text-text-secondary dark:text-white/40 mb-1">10:45:02 AM</div>
                                <Card className="p-4 bg-purple-500/5 border-purple-500/10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-bold text-sm text-text-primary dark:text-white">Instant SMS Sent</div>
                                        <div className="flex gap-1 text-[10px] text-green-500 items-center"><CheckCircle2 className="w-3 h-3" /> READ</div>
                                    </div>
                                    <p className="text-xs italic text-text-secondary dark:text-white/60">&quot;Hi Didi, this is John from Castells...&quot;</p>
                                </Card>
                            </div>
                        </div>

                        {/* Event 3: Call Bridge */}
                        <div className="flex gap-6 relative">
                            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 z-10 bg-surface dark:bg-[#121212]">
                                <PhoneCall className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-bold text-text-secondary dark:text-white/40 mb-1">10:45:15 AM</div>
                                <Card className="p-0 overflow-hidden border-primary/10">
                                    <div className="p-4 bg-primary/5 border-b border-primary/10 flex justify-between items-center">
                                        <div>
                                            <div className="font-bold text-sm text-text-primary dark:text-white">Voice Bridge Connected</div>
                                            <div className="text-xs text-text-secondary dark:text-white/60">Manager: Sarah Johnson (Won in 4s)</div>
                                        </div>
                                        <Badge className="bg-green-500 text-white border-none">Success</Badge>
                                    </div>
                                    {/* Audio Player Mock */}
                                    <div className="p-4 bg-white dark:bg-black/20 flex items-center gap-4">
                                        <Button size="icon" className="rounded-full w-8 h-8"><PlayCircle className="w-5 h-5" /></Button>
                                        <div className="h-1 flex-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full w-1/3 bg-primary" />
                                        </div>
                                        <span className="text-[10px] font-mono opacity-50">05:32</span>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Action Footer */}
                <div className="p-4 border-t border-black/5 dark:border-white/5 bg-white/50 dark:bg-white/5 backdrop-blur-md">
                    <div className="flex gap-4 items-center">
                        <div className="flex-1 relative">
                            <input className="w-full bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Type a message to Didi..." />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded-lg hover:scale-105 transition-transform"><Send className="w-3 h-3" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
