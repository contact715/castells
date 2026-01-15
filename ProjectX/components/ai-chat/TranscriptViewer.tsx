"use client";

import React, { useState } from "react";
import { ChevronLeft, Search, Filter, MessageCircle, Calendar, User, Brain, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface Message {
    id: string;
    sender: "lead" | "ai";
    content: string;
    time: string;
}

interface Transcript {
    id: string;
    leadName: string;
    lastMessage: string;
    time: string;
    sentiment: "positive" | "neutral" | "negative";
    messages: Message[];
}

const mockTranscripts: Transcript[] = [
    {
        id: "1",
        leadName: "Alice Freeman",
        lastMessage: "Sounds great, see you at 10 AM tomorrow.",
        time: "2h ago",
        sentiment: "positive",
        messages: [
            { id: "m1", sender: "lead", content: "Hi, I'm looking for a roofing estimate.", time: "10:15 AM" },
            { id: "m2", sender: "ai", content: "Hello Alice! I'd be happy to help. Could you tell me more about your roof? For example, the approximate square footage or type of shingles?", time: "10:16 AM" },
            { id: "m3", sender: "lead", content: "It's a standard residential roof, about 2500 sq ft.", time: "10:18 AM" },
            { id: "m4", sender: "ai", content: "Thank you! I can schedule one of our specialists to come by tomorrow to give you an exact quote. Does 10 AM work for you?", time: "10:19 AM" },
            { id: "m5", sender: "lead", content: "Sounds great, see you at 10 AM tomorrow.", time: "10:20 AM" },
        ]
    },
    {
        id: "2",
        leadName: "Robert Fox",
        lastMessage: "I need to check with my wife first.",
        time: "4h ago",
        sentiment: "neutral",
        messages: []
    },
    {
        id: "3",
        leadName: "John Smith",
        lastMessage: "The price is a bit high for me.",
        time: "Yesterday",
        sentiment: "negative",
        messages: []
    }
];

interface TranscriptViewerProps {
    botId: string;
    onBack: () => void;
}

export function TranscriptViewer({ botId, onBack }: TranscriptViewerProps) {
    const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(mockTranscripts[0]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            {/* Sidebar: Transcript List */}
            <Card variant="default" className="lg:col-span-1 p-0 overflow-hidden border-white/5 bg-black/40 backdrop-blur-xl flex flex-col h-full">
                <div className="p-6 border-b border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white tracking-tight">Transcripts</h3>
                        <Button variant="ghost" size="sm" onClick={onBack} className="text-white/40 hover:text-white">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back
                        </Button>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-coral transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH LEADS..."
                            className="w-full bg-white/5 border border-white/5 rounded-[2rem] py-2.5 pl-10 pr-4 text-[10px] font-bold tracking-widest text-white placeholder:text-white/20 outline-none focus:border-coral/50 transition-all uppercase"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-auto divide-y divide-white/5">
                    {mockTranscripts.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setSelectedTranscript(t)}
                            className={`w-full p-6 flex flex-col gap-3 text-left transition-all ${selectedTranscript?.id === t.id ? "bg-white/5" : "hover:bg-white/2"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-white tracking-tight">{t.leadName}</span>
                                <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">{t.time}</span>
                            </div>
                            <p className="text-xs text-white/40 line-clamp-1">{t.lastMessage}</p>
                            <div className="flex items-center justify-between mt-1">
                                <div className={`px-2 py-0.5 rounded-[2rem] text-[9px] font-bold uppercase tracking-widest ${t.sentiment === "positive" ? "bg-green-500/10 text-green-400" :
                                    t.sentiment === "negative" ? "bg-red-500/10 text-red-400" :
                                        "bg-white/5 text-white/40"
                                    }`}>
                                    {t.sentiment}
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-white/20">
                                    <MessageCircle className="w-3 h-3" />
                                    {t.messages.length || 0}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </Card>

            {/* Main Content: Chat View */}
            <Card variant="default" className="lg:col-span-2 p-0 overflow-hidden border-white/5 bg-black/40 backdrop-blur-xl flex flex-col h-full">
                {selectedTranscript ? (
                    <>
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-[2rem] bg-coral/20 flex items-center justify-center border border-coral/30">
                                    <User className="w-6 h-6 text-coral" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white tracking-tight">{selectedTranscript.leadName}</h3>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <span className="text-xs text-white/40 flex items-center gap-1 font-medium italic">
                                            <Calendar className="w-3 h-3" />
                                            Started {selectedTranscript.time}
                                        </span>
                                        <span className="text-xs text-white/40 flex items-center gap-1 font-bold uppercase tracking-widest">
                                            <TrendingUp className="w-3 h-3 text-green-400" />
                                            High Intent
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" className="text-[10px] font-bold uppercase tracking-widest h-10 px-6">
                                Claim Conversation
                            </Button>
                        </div>

                        <div className="flex-1 overflow-auto p-8 space-y-8">
                            {selectedTranscript.messages.length > 0 ? selectedTranscript.messages.map((m) => (
                                <div key={m.id} className={`flex ${m.sender === "lead" ? "justify-start" : "justify-end"}`}>
                                    <div className={`max-w-[80%] flex items-start gap-4 ${m.sender === "lead" ? "flex-row" : "flex-row-reverse"}`}>
                                        <div className={`w-8 h-8 rounded-[2rem] shrink-0 flex items-center justify-center border ${m.sender === "lead"
                                            ? "bg-white/5 border-white/10"
                                            : "bg-coral/20 border-coral/30"
                                            }`}>
                                            {m.sender === "lead" ? <User className="w-4 h-4 text-white/40" /> : <Brain className="w-4 h-4 text-coral" />}
                                        </div>
                                        <div>
                                            <div className={`p-5 rounded-[2rem] text-[13px] leading-relaxed tracking-wide ${m.sender === "lead"
                                                ? "bg-white/5 text-white/80 border border-white/5 rounded-tl-none shadow-sm"
                                                : "bg-coral text-white font-medium rounded-tr-none shadow-lg shadow-coral/10"
                                                }`}>
                                                {m.content}
                                            </div>
                                            <span className={`text-[10px] text-white/20 font-mono mt-2 block ${m.sender === "lead" ? "text-left" : "text-right"}`}>
                                                {m.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="h-full flex flex-col items-center justify-center text-white/20 gap-4">
                                    <MessageCircle className="w-12 h-12" />
                                    <p className="text-sm font-medium">Click a transcript to view the conversation</p>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-white/5 bg-white/2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Type a message to take over..."
                                    className="w-full bg-black/40 border border-white/5 rounded-[2rem] py-4 pl-6 pr-14 text-sm text-white placeholder:text-white/20 outline-none focus:border-coral/50 transition-all"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-coral text-white flex items-center justify-center shadow-lg shadow-coral/20 hover:scale-105 active:scale-95 transition-all">
                                    <ChevronLeft className="w-5 h-5 rotate-180" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-white/20 gap-4">
                        <Search className="w-16 h-16 opacity-50" />
                        <p className="text-lg font-bold tracking-tight">Select a transcript to start</p>
                    </div>
                )}
            </Card>
        </div>
    );
}
