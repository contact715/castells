"use client";

import React from "react";
import { MessageSquare, ExternalLink, Edit3, Eye, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ChatbotInstance {
    id: string;
    platform: string;
    status: "ACTIVE" | "INACTIVE";
    conversationsToday: number;
    bookingsMade: number;
    icon: string;
}

const mockInstances: ChatbotInstance[] = [
    { id: "gmb", platform: "Google My Business", status: "ACTIVE", conversationsToday: 45, bookingsMade: 12, icon: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" },
    { id: "yelp", platform: "Yelp", status: "ACTIVE", conversationsToday: 32, bookingsMade: 8, icon: "https://logos-world.net/wp-content/uploads/2020/11/Yelp-Logo.png" },
    { id: "whatsapp", platform: "WhatsApp", status: "INACTIVE", conversationsToday: 0, bookingsMade: 0, icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" },
];

interface AIChatbotTableProps {
    onViewTranscripts: (botId: string) => void;
    onEditBot: (botId: string) => void;
}

export function AIChatbotTable({ onViewTranscripts, onEditBot }: AIChatbotTableProps) {
    return (
        <table className="w-full text-left">
            <thead>
                <tr className="text-xs font-bold text-white/20 uppercase tracking-[0.2em] border-b border-white/5 pb-4">
                    <th className="pb-4 font-bold">Platform</th>
                    <th className="pb-4 font-bold">Status</th>
                    <th className="pb-4 font-bold">Conversations Today</th>
                    <th className="pb-4 font-bold">Bookings Made</th>
                    <th className="pb-4 font-bold">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {mockInstances.map((instance) => (
                    <tr key={instance.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center p-2">
                                    <span className="text-white text-xs font-bold capitalize">{instance.id[0]}</span>
                                </div>
                                <span className="font-bold text-white tracking-tight">{instance.platform}</span>
                            </div>
                        </td>
                        <td className="py-6">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[2rem] text-[10px] font-bold tracking-widest border ${instance.status === "ACTIVE"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : "bg-white/5 text-white/20 border-white/10"
                                }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${instance.status === "ACTIVE" ? "bg-green-500 animate-pulse" : "bg-white/20"}`} />
                                {instance.status}
                            </div>
                        </td>
                        <td className="py-6">
                            <span className="text-white/60 font-mono text-lg">{instance.conversationsToday}</span>
                        </td>
                        <td className="py-6">
                            <span className="text-white/60 font-mono text-lg">{instance.bookingsMade}</span>
                        </td>
                        <td className="py-6">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => onEditBot(instance.id)}
                                    className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white transition-colors py-2 px-4 rounded-[2rem] hover:bg-white/5 border border-transparent hover:border-white/10"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    EDIT BOT
                                </button>
                                <button
                                    onClick={() => onViewTranscripts(instance.id)}
                                    className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white transition-colors py-2 px-4 rounded-[2rem] hover:bg-white/5 border border-transparent hover:border-white/10"
                                >
                                    <Eye className="w-4 h-4" />
                                    VIEW TRANSCRIPTS
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
