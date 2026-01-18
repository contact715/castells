"use client";

import React, { useState } from "react";
import { HeaderActions } from "@/components/layout/HeaderActions";
import { Button } from "@/components/ui/Button";
import { Plus, Search, MessageSquare, ExternalLink, Sliders, History } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { AIChatbotTable } from "../../../components/ai-chat/AIChatbotTable";
import { TranscriptViewer } from "../../../components/ai-chat/TranscriptViewer";
import { BotSettings } from "../../../components/ai-chat/BotSettings";
import { AnimatePresence, motion } from "framer-motion";

export type ViewType = "instances" | "transcripts" | "settings";

export default function AIChatPage() {
    const [view, setView] = useState<ViewType>("instances");
    const [selectedBot, setSelectedBot] = useState<string | null>(null);

    const handleViewTranscripts = (botId: string) => {
        setSelectedBot(botId);
        setView("transcripts");
    };

    const handleEditBot = (botId: string) => {
        setSelectedBot(botId);
        setView("settings");
    };

    return (
        <div className="flex flex-col h-full gap-8">
            <HeaderActions>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-card px-4 py-2 w-96 group focus-within:border-coral/50 transition-all">
                        <Search className="w-5 h-5 text-white/30 group-focus-within:text-coral transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH CHATBOT INSTANCES..."
                            className="bg-transparent border-none outline-none text-[10px] font-bold tracking-widest text-white placeholder:text-white/20 w-full uppercase"
                        />
                    </div>
                    <Button variant="secondary" className="px-8 h-12 shadow-lg shadow-coral/20">
                        <Plus className="w-5 h-5 mr-2" />
                        CREATE NEW CHATBOT
                    </Button>
                </div>
            </HeaderActions>

            <div className="flex-1 overflow-hidden flex flex-col gap-6">
                {/* Navigation Breadcrumbs/Tabs */}
                {/* Navigation Breadcrumbs/Tabs */}
                <div className="flex items-center gap-2 text-sm bg-black/5 dark:bg-black/40 p-1 rounded-full w-fit border border-black/5 dark:border-white/5 shadow-sm">
                    <button
                        onClick={() => setView("instances")}
                        className={`px-6 py-2.5 rounded-full transition-all text-xs font-medium ${view === "instances" ? "bg-white dark:bg-white/10 text-primary dark:text-white shadow-sm" : "text-text-secondary dark:text-white/40 hover:text-primary dark:hover:text-white"}`}
                    >
                        CHATBOT INSTANCES
                    </button>
                    {view !== "instances" && (
                        <>
                            <span className="text-text-secondary/20 px-1">/</span>
                            <span className="px-6 py-2.5 rounded-full bg-white dark:bg-white/10 text-primary dark:text-white font-medium flex items-center gap-2 capitalize text-xs tracking-tight shadow-sm">
                                {view === "transcripts" ? <History className="w-4 h-4" /> : <Sliders className="w-4 h-4" />}
                                {selectedBot} {view}
                            </span>
                        </>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {view === "instances" && (
                        <motion.div
                            key="instances"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="h-full"
                        >
                            <Card variant="default" className="p-0 overflow-hidden border-white/5 bg-black/40 backdrop-blur-xl h-full flex flex-col">
                                <div className="p-8 border-b border-white/5">
                                    <h2 className="text-2xl font-display font-bold text-white tracking-tight">Chatbot Instances</h2>
                                    <p className="text-sm text-white/40 mt-1">Manage your active AI agents across various platforms</p>
                                </div>
                                <div className="flex-1 overflow-auto p-8">
                                    <AIChatbotTable
                                        onViewTranscripts={handleViewTranscripts}
                                        onEditBot={handleEditBot}
                                    />
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {view === "transcripts" && (
                        <motion.div
                            key="transcripts"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="h-full"
                        >
                            <TranscriptViewer botId={selectedBot || ""} onBack={() => setView("instances")} />
                        </motion.div>
                    )}

                    {view === "settings" && (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="h-full"
                        >
                            <BotSettings botId={selectedBot || ""} onBack={() => setView("instances")} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
