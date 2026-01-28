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
                <Card className="min-h-[850px] flex flex-col relative overflow-hidden">
                    <div className="p-6 border-b border-gray-200/50 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-inner bg-blue-100 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 tracking-tight">Lead-to-Call Bridge</h3>
                                <p className="text-xs text-gray-500">Omnichannel Fast Connect Engine</p>
                            </div>
                        </div>
                        <Badge variant="info" className="text-xs text-gray-500 border-gray-200 uppercase tracking-widest bg-white/40 rounded-full">v2.4.0 (Instant Hunt)</Badge>
                    </div>

                    <div className="flex-1 p-12 overflow-y-auto relative z-10 flex flex-col items-center bg-white/40 rounded-inner m-4">
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
                            <Card className="p-6 border-blue-300/50 border-2">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        Configure {selectedNode.title}
                                    </h3>
                                    <button onClick={() => setSelectedNode(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {selectedNode.type === 'sms' && (
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-gray-500">SMS Template</label>
                                            <textarea className="w-full h-32 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-inner p-3 text-sm text-gray-700 focus:border-blue-300 transition-colors outline-none resize-none" defaultValue="Hi {name}, thanks for reaching out to {company}. I can get you an estimate in under 60 seconds."></textarea>
                                            <p className="text-xs text-gray-400 italic">Available tags: {'{name}'}, {'{company}'}</p>
                                        </div>
                                    )}
                                    {selectedNode.type === 'wait' && (
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-gray-500">Delay Duration (Seconds)</label>
                                            <Input type="number" defaultValue="15" className="bg-white/60 backdrop-blur-sm border-gray-200" />
                                            <p className="text-xs text-gray-400 italic">Rec: 10-15s for &quot;Instant Hunt&quot; effect</p>
                                        </div>
                                    )}
                                    {selectedNode.type === 'blast' && (
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-gray-500">Whisper Script</label>
                                            <textarea className="w-full h-20 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-inner p-3 text-sm text-gray-700 focus:border-blue-300 transition-colors outline-none resize-none" defaultValue="Attention! Mosco.ai Hunt starting. Lead: {name}. Press 1 to win."></textarea>
                                        </div>
                                    )}
                                    <div className="flex gap-2 pt-4">
                                        <Button variant="primary" className="flex-1 py-4">
                                            <Save className="w-4 h-4 mr-2" /> SAVE CONFIG
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-card opacity-50">
                            <p className="text-xs font-semibold text-gray-400 text-center">Select a node to configure</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
