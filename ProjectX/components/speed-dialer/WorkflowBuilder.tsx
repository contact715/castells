"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Zap, X, Save, MessageSquare, PhoneCall, GitBranch, BadgeCheck as BadgeCheckIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    TriggerNode,
    SmsNode,
    CallBlastNode,
    WaitNode,
    LogicGateNode,
    WebhookNode,
    AfterHoursGate,
    WorkflowNode
} from "@/components/workflow/WorkflowNodes";

export function WorkflowBuilder() {
    const [selectedNode, setSelectedNode] = useState<any>(null);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            <div className="lg:col-span-2">
                <Card variant="default" className="min-h-[850px] flex flex-col relative overflow-hidden bg-surface dark:bg-black/40 border-black/5 dark:border-white/5">
                    <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />

                    <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-display font-semibold text-text-primary dark:text-white tracking-tight">Lead-to-Call Bridge</h3>
                                <p className="text-xs text-text-secondary dark:text-white/40">Omnichannel Fast Connect Engine</p>
                            </div>
                        </div>
                        <Badge variant="info" className="text-[10px] text-text-secondary dark:text-white/30 border-black/10 dark:border-white/10 uppercase tracking-widest bg-transparent rounded-full">v2.4.0 (Instant Hunt)</Badge>
                    </div>

                    <div className="flex-1 p-12 overflow-y-auto relative z-10 flex flex-col items-center">
                        <TriggerNode onClick={() => setSelectedNode({ type: 'trigger', title: 'Omnichannel Entry' })} />
                        <WaitNode onClick={() => setSelectedNode({ type: 'wait', title: 'Smart Delay' })} />
                        <SmsNode onClick={() => setSelectedNode({ type: 'sms', title: 'Auto-Hook SMS' })} />

                        <div className="mb-0 w-full flex justify-center">
                            <AfterHoursGate onClick={() => setSelectedNode({ type: 'gate', title: 'Business Hours Guard' })} />
                        </div>
                        <div className="w-px h-12 bg-gradient-to-b from-yellow-500/40 to-purple-500" />

                        <CallBlastNode onClick={() => setSelectedNode({ type: 'blast', title: 'Sales Blast (The Hunt)' })} />

                        <LogicGateNode
                            title="Call Answer Check"
                            description="Branch based on outcome"
                            successLabel="Connected"
                            failLabel="Missed/Busy"
                            onClick={() => setSelectedNode({ type: 'logic', title: 'Call Answer Check' })}
                        />

                        <div className="flex w-full max-w-lg mt-12 gap-12">
                            <div className="flex-1 flex flex-col items-center">
                                <BadgeCheckIcon className="w-6 h-6 text-green-500 mb-4" />
                                <WebhookNode onClick={() => setSelectedNode({ type: 'webhook', title: 'External Sync' })} />
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                                <MessageSquare className="w-6 h-6 text-blue-400 mb-4" />
                                <WorkflowNode
                                    title="Re-Nurture SMS"
                                    description="Send missed call follow-up"
                                    icon={MessageSquare}
                                    color="bg-blue-400"
                                    onClick={() => setSelectedNode({ type: 'nurture_sms', title: 'Re-Nurture SMS' })}
                                />
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                                <GitBranch className="w-6 h-6 text-red-500 mb-4" />
                                <WorkflowNode
                                    title="Escalation"
                                    description="Call owner if no answer"
                                    icon={PhoneCall}
                                    color="bg-red-500"
                                    onClick={() => setSelectedNode({ type: 'escalation', title: 'Escalation' })}
                                />
                            </div>
                        </div>

                        <div className="w-px h-12 bg-gradient-to-b from-blue-400/50 to-transparent mt-4" />
                    </div>
                </Card>
            </div>

            <div className="space-y-6">
                {/* Node Settings Sidebar (Appears when node clicked) */}
                <AnimatePresence mode="wait">
                    {selectedNode ? (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <Card variant="glass" className="p-6 border-primary/30 bg-primary/5 border-2 rounded-card">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                                        Configure {selectedNode.title}
                                    </h3>
                                    <button onClick={() => setSelectedNode(null)} className="text-text-secondary dark:text-white/20 hover:text-text-primary dark:hover:text-white transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {selectedNode.type === 'sms' && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-text-secondary dark:text-white/40 uppercase">SMS Template</label>
                                            <textarea className="w-full h-32 bg-white dark:bg-black/40 border border-black/5 dark:border-white/5 rounded-xl p-3 text-sm text-text-primary dark:text-white/80 focus:border-primary transition-colors outline-none resize-none" defaultValue="Hi {name}, thanks for reaching out to {company}. I can get you an estimate in under 60 seconds."></textarea>
                                            <p className="text-[10px] text-text-secondary dark:text-white/20 italic">Available tags: {'{name}'}, {'{company}'}</p>
                                        </div>
                                    )}
                                    {selectedNode.type === 'wait' && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-text-secondary dark:text-white/40 uppercase">Delay Duration (Seconds)</label>
                                            <Input type="number" defaultValue="15" className="bg-white dark:bg-black/40 border-black/5 dark:border-white/5" />
                                            <p className="text-[10px] text-text-secondary dark:text-white/20 italic">Rec: 10-15s for "Instant Hunt" effect</p>
                                        </div>
                                    )}
                                    {selectedNode.type === 'blast' && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-text-secondary dark:text-white/40 uppercase">Whisper Script</label>
                                            <textarea className="w-full h-20 bg-white dark:bg-black/40 border border-black/5 dark:border-white/5 rounded-xl p-3 text-sm text-text-primary dark:text-white/80 focus:border-primary transition-colors outline-none resize-none" defaultValue="Attention! Mosco.ai Hunt starting. Lead: {name}. Press 1 to win."></textarea>
                                        </div>
                                    )}
                                    <div className="flex gap-2 pt-4">
                                        <Button variant="secondary" className="flex-1 py-4">
                                            <Save className="w-4 h-4 mr-2" /> SAVE CONFIG
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-black/5 dark:border-white/5 rounded-card opacity-50">
                            <p className="text-xs font-bold uppercase tracking-widest text-center">Select a node to configure</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
