"use client";

import React, { useState } from "react";
import { ChevronLeft, Save, Sparkles, Brain, Lock, Settings2, Globe, Database } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface BotSettingsProps {
    botId: string;
    onBack: () => void;
}

export function BotSettings({ botId, onBack }: BotSettingsProps) {
    const [activeTab, setActiveTab] = useState<"personality" | "knowledge" | "api">("personality");

    return (
        <div className="flex flex-col h-full gap-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={onBack} className="text-white/40 hover:text-white bg-white/5 rounded-[2rem]">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        BACK
                    </Button>
                    <div>
                        <h2 className="text-2xl font-display font-bold text-white tracking-tight capitalize">{botId} Settings</h2>
                        <p className="text-sm text-white/40">Configure your agent&apos;s behavior and intelligence</p>
                    </div>
                </div>
                <Button variant="secondary" className="px-8 h-12 shadow-lg shadow-coral/20">
                    <Save className="w-4 h-4 mr-2" />
                    SAVE CHANGES
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
                {/* Sidebar Tabs */}
                <div className="lg:col-span-1 space-y-2">
                    <button
                        onClick={() => setActiveTab("personality")}
                        className={`w-full flex items-center gap-3 px-6 py-4 rounded-[2rem] transition-all ${activeTab === "personality" ? "bg-coral/10 text-coral border border-coral/20" : "text-white/40 hover:bg-white/5 text-left"
                            }`}
                    >
                        <Sparkles className="w-5 h-5" />
                        <span className="font-bold text-xs uppercase tracking-widest">PERSONALITY</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("knowledge")}
                        className={`w-full flex items-center gap-3 px-6 py-4 rounded-[2rem] transition-all ${activeTab === "knowledge" ? "bg-coral/10 text-coral border border-coral/20" : "text-white/40 hover:bg-white/5 text-left"
                            }`}
                    >
                        <Database className="w-5 h-5" />
                        <span className="font-bold text-xs uppercase tracking-widest">KNOWLEDGE</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("api")}
                        className={`w-full flex items-center gap-3 px-6 py-4 rounded-[2rem] transition-all ${activeTab === "api" ? "bg-coral/10 text-coral border border-coral/20" : "text-white/40 hover:bg-white/5 text-left"
                            }`}
                    >
                        <Lock className="w-5 h-5" />
                        <span className="font-bold text-xs uppercase tracking-widest">API & ACCESS</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 h-full overflow-auto">
                    {activeTab === "personality" && (
                        <Card variant="default" className="p-8 border-white/5 bg-black/40 backdrop-blur-xl space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Brain className="w-5 h-5 text-coral" />
                                    Conversation Persona
                                </h3>
                                <p className="text-sm text-white/40">Describe how the AI should introduce itself and handle customer inquiries.</p>
                                <textarea
                                    className="w-full h-48 bg-white/5 border border-white/5 rounded-[2rem] p-6 text-white text-sm placeholder:text-white/10 outline-none focus:border-coral/50 transition-all font-sans leading-relaxed"
                                    placeholder="Example: You are a friendly customer service agent for Castells..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-white/20 uppercase tracking-widest">Temperature (Creativity)</label>
                                    <input type="range" className="w-full accent-coral" min="0" max="1" step="0.1" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-white/20 uppercase tracking-widest">Max Response Length</label>
                                    <input type="number" className="w-full bg-white/5 border border-white/5 rounded-[2rem] p-4 text-white outline-none font-mono" defaultValue={150} />
                                </div>
                            </div>
                        </Card>
                    )}

                    {activeTab === "knowledge" && (
                        <Card variant="default" className="p-8 border-white/5 bg-black/40 backdrop-blur-xl space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-white">Knowledge Sources</h3>
                                    <p className="text-sm text-white/40">Upload documents or link URLs to train your bot.</p>
                                </div>
                                <Button className="bg-white/5 hover:bg-white/10 text-white rounded-xl">
                                    Add Source
                                </Button>
                            </div>

                            <div className="space-y-3">
                                <div className="p-4 bg-white/2 border border-white/5 rounded-[2rem] flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Globe className="w-5 h-5 text-blue-400" />
                                        <div>
                                            <p className="text-sm font-bold text-white">https://castells.pro/services</p>
                                            <p className="text-[10px] text-white/20">Synced 2h ago</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-red-400/50 hover:text-red-400">REMOVE</Button>
                                </div>
                            </div>
                        </Card>
                    )}

                    {activeTab === "api" && (
                        <Card variant="default" className="p-8 border-white/5 bg-black/40 backdrop-blur-xl space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-white">Platform Credentials</h3>
                                <p className="text-sm text-white/40">Securely connect your bot to the platform API.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/20 uppercase tracking-widest">API Secret Key</label>
                                    <input type="password" value="••••••••••••••••••••" readOnly className="w-full bg-white/5 border border-white/5 rounded-[2rem] p-4 text-white font-mono" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/20 uppercase tracking-widest">Webhook URL (Callback)</label>
                                    <div className="flex gap-2">
                                        <input type="text" value="https://api.mos-engine.com/v1/webhook/gmb_123" readOnly className="flex-1 bg-white/5 border border-white/5 rounded-[2rem] p-4 text-white/40 font-mono text-xs" />
                                        <Button variant="ghost" className="text-coral underline hover:bg-coral/5 rounded-[2rem] px-6">COPY</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
