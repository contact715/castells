"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PlayCircle, Volume2, MessageSquare, PhoneCall, Calendar, Clock, CheckCircle2, XCircle, Search, MoreHorizontal, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioPlayerWithNova } from "@/components/ui/AudioPlayerWithNova";

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
            <div className="lg:col-span-1 border-r border-gray-200/50 pr-6 hidden lg:block">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input className="w-full bg-white/60 backdrop-blur-sm rounded-inner pl-10 pr-4 py-2 text-sm outline-none border border-gray-200 focus:border-blue-300" placeholder="Search leads..." />
                </div>
                <div className="space-y-2">
                    {leads.map(lead => (
                        <div
                            key={lead.id}
                            onClick={() => setSelectedLeadId(lead.id)}
                            className={`p-4 rounded-inner cursor-pointer transition-all ${selectedLeadId === lead.id
                                ? "bg-[#D4E6F1] border-blue-300/50 border"
                                : "hover:bg-white/40 border border-transparent"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-semibold text-sm text-gray-900">{lead.name}</h4>
                                <Badge variant={lead.status === 'HOT' ? 'info' : 'default'} className="text-xs h-5 px-2">{lead.status}</Badge>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>{lead.source}</span>
                                <span>{lead.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Timeline Content */}
            <Card className="lg:col-span-2 flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-gray-200/50 flex justify-between items-center bg-white/40 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
                            DS
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Didi Smith</h2>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
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
                        <div className="absolute left-[19px] top-6 bottom-0 w-0.5 bg-gray-200" />

                        {/* Events */}
                        {/* Event 1: New Lead */}
                        <div className="flex gap-6 relative">
                            <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 z-10 bg-white">
                                <Search className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-semibold text-gray-500 mb-1">10:45:00 AM</div>
                                <Card className="p-4 bg-blue-50/70 border-blue-100/50">
                                    <div className="font-semibold text-sm text-gray-900 mb-1">New Lead Detected</div>
                                    <p className="text-xs text-gray-600">Source: Yelp Integration. Intent: Roofing Estimate.</p>
                                </Card>
                            </div>
                        </div>

                        {/* Event 2: SMS */}
                        <div className="flex gap-6 relative">
                            <div className="w-10 h-10 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center shrink-0 z-10 bg-white">
                                <MessageSquare className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-semibold text-gray-500 mb-1">10:45:02 AM</div>
                                <Card className="p-4 bg-purple-50/70 border-purple-100/50">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-semibold text-sm text-gray-900">Instant SMS Sent</div>
                                        <div className="flex gap-1 text-xs text-emerald-600 items-center"><CheckCircle2 className="w-3 h-3" /> READ</div>
                                    </div>
                                    <p className="text-xs italic text-gray-600">&quot;Hi Didi, this is John from Castells...&quot;</p>
                                </Card>
                            </div>
                        </div>

                        {/* Event 3: Call Bridge */}
                        <div className="flex gap-6 relative">
                            <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 z-10 bg-white">
                                <PhoneCall className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-semibold text-gray-500 mb-1">10:45:15 AM</div>
                                <Card className="p-0 overflow-hidden border-blue-200/50">
                                    <div className="p-4 bg-blue-50/70 border-b border-blue-100/50 flex justify-between items-center">
                                        <div>
                                            <div className="font-semibold text-sm text-gray-900">Voice Bridge Connected</div>
                                            <div className="text-xs text-gray-600">Manager: Sarah Johnson (Won in 4s)</div>
                                        </div>
                                        <Badge className="bg-emerald-500 text-white border-none">Success</Badge>
                                    </div>
                                    <AudioPlayerWithNova src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Action Footer */}
                <div className="p-4 border-t border-gray-200/50 bg-white/40 backdrop-blur-sm">
                    <div className="flex gap-4 items-center">
                        <div className="flex-1 relative">
                            <input className="w-full bg-white/60 backdrop-blur-sm border border-gray-200 rounded-inner pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none" placeholder="Type a message to Didi..." />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded-inner hover:bg-primary/90 transition-colors"><Send className="w-3 h-3" /></button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
