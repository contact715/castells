"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Zap,
    Users,
    Activity,
    Settings,
    Play,
    Clock,
    Smartphone,
    PhoneCall,
    MessageSquare,
    Search,
    ChevronRight,
    PlayCircle,
    FileText,
    Volume2,
    Calendar,
    Globe,
    Timer,
    GitBranch,
    BadgeCheck as BadgeCheckIcon,
    X,
    Save,
    Trash2
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HeaderActions } from "@/components/layout/HeaderActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
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
import { TeamManagement } from "@/components/workflow/TeamManagement";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { twMerge } from "tailwind-merge";

export default function SpeedDialerPage() {
    const [activeTab, setActiveTab] = useState("builder");
    const [selectedCall, setSelectedCall] = useState<any>(null);
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [isSimulating, setIsSimulating] = useState(false);
    const [settingsTab, setSettingsTab] = useState("logic");
    const [simulationLogs, setSimulationLogs] = useState<any[]>([]);

    const callLogs = [
        {
            id: "1",
            lead: "Didi Smith",
            source: "Yelp",
            score: 95,
            manager: "Sarah Johnson",
            status: "Connected",
            duration: "5m 32s",
            time: "10:45 AM",
            transcript: "Lead: 'I need a roofing estimate for a 2000sqft house.' | Manager: 'I can send someone over today at 4 PM.' | Lead: 'Perfect, see you then.'",
            summary: "Roofing project, estimate scheduled for today 4PM."
        },
        {
            id: "2",
            lead: "John Doe",
            source: "FB Ads",
            score: 82,
            manager: "Mike Smith",
            status: "No Answer",
            duration: "0s",
            time: "09:30 AM",
            transcript: "[Voicemail left by bot: 'Hi John, we received your request...']",
            summary: "Follow-up SMS sent automatically after missed call."
        },
    ];

    const runSimulation = () => {
        setIsSimulating(true);
        setSimulationLogs([]);
        const events = [
            { time: "15:02:44", event: "[Yelp] Lead 'Didi S.' detected.", color: "text-coral" },
            { time: "15:02:45", event: "[SMS] Hook: 'Hi Didi...' SENT.", color: "text-blue-400" },
            { time: "15:02:50", event: "[Call] Simultaneous Blast: 4 managers.", color: "text-purple-400" },
            { time: "15:03:02", event: "[Bridge] PRESS 1 detected: Sarah J.", color: "text-green-500" },
            { time: "15:03:03", event: "[System] Bridge connected.", color: "text-green-500 font-bold" },
        ];

        events.forEach((e, i) => {
            setTimeout(() => {
                setSimulationLogs(prev => [...prev, e]);
                if (i === events.length - 1) setIsSimulating(false);
            }, i * 1500);
        });
    };

    return (
        <div className="flex flex-col h-full gap-8">
            <HeaderActions>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-[2rem]">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">DIALER ENGINE LIVE</span>
                    </div>
                    <Button
                        onClick={runSimulation}
                        variant="primary"
                        className="bg-white text-black hover:bg-white/90 shadow-xl shadow-white/5 h-[42px] px-8"
                    >
                        {isSimulating ? <Activity className="w-4 h-4 mr-2 animate-spin text-coral" /> : <Play className="w-4 h-4 mr-2 fill-current" />}
                        {isSimulating ? "RUNNING SIMULATION..." : "SIMULATE LEAD"}
                    </Button>
                </div>
            </HeaderActions>

            <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="builder" className="w-full flex-1 flex flex-col gap-6">
                <TabsList className="bg-black/20 dark:bg-white/5 p-1 rounded-[2rem] w-fit border border-white/5 shrink-0">
                    <TabsTrigger value="builder" className="rounded-[2rem] px-6 py-2.5 data-[state=active]:bg-coral data-[state=active]:text-white">
                        <Zap className="w-4 h-4 mr-2" />
                        Workflow Builder
                    </TabsTrigger>
                    <TabsTrigger value="team" className="rounded-[2rem] px-6 py-2.5 data-[state=active]:bg-coral data-[state=active]:text-white">
                        <Users className="w-4 h-4 mr-2" />
                        Sales Team
                    </TabsTrigger>
                    <TabsTrigger value="intelligence" className="rounded-[2rem] px-6 py-2.5 data-[state=active]:bg-coral data-[state=active]:text-white">
                        <Activity className="w-4 h-4 mr-2" />
                        Call Intelligence
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="builder" className="flex-1 mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                        <div className="lg:col-span-2">
                            <Card variant="default" className="min-h-[850px] flex flex-col relative overflow-hidden bg-black/40 border-white/5">
                                <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />

                                <div className="p-6 border-b border-white/5 flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-coral/20 flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-coral" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-display font-semibold text-white tracking-tight">Lead-to-Call Bridge</h3>
                                            <p className="text-xs text-white/40">Omnichannel Fast Connect Engine</p>
                                        </div>
                                    </div>
                                    <Badge variant="info" className="text-[10px] text-white/30 border-white/10 uppercase tracking-widest bg-transparent rounded-[2rem]">v2.4.0</Badge>
                                </div>

                                <div className="flex-1 p-12 overflow-y-auto relative z-10 flex flex-col items-center">
                                    <TriggerNode onClick={() => setSelectedNode({ type: 'trigger', title: 'Omnichannel Entry' })} />
                                    <WaitNode onClick={() => setSelectedNode({ type: 'wait', title: 'Smart Delay' })} />
                                    <SmsNode onClick={() => setSelectedNode({ type: 'sms', title: 'Auto-Hook SMS' })} />

                                    <div className="mb-0 w-full flex justify-center">
                                        <AfterHoursGate onClick={() => setSelectedNode({ type: 'gate', title: 'Business Hours Guard' })} />
                                    </div>
                                    <div className="w-px h-12 bg-gradient-to-b from-yellow-500/40 to-purple-500" />

                                    <CallBlastNode onClick={() => setSelectedNode({ type: 'blast', title: 'Sales Blast' })} />

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
                                        <Card variant="glass" className="p-6 border-coral/30 bg-coral/5 border-2">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-sm font-bold uppercase tracking-widest text-coral">
                                                    Configure {selectedNode.title}
                                                </h3>
                                                <button onClick={() => setSelectedNode(null)} className="text-white/20 hover:text-white transition-colors">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="space-y-4">
                                                {selectedNode.type === 'sms' && (
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold text-white/40 uppercase">SMS Template</label>
                                                        <textarea className="w-full h-32 bg-black/40 border border-white/5 rounded-xl p-3 text-sm text-white/80 focus:border-coral transition-colors outline-none resize-none" defaultValue="Hi [Lead Name], this is John from Castells. We received your request on Yelp..."></textarea>
                                                        <p className="text-[10px] text-white/20 italic">Available tags: [Lead Name], [Manager Name], [Channel]</p>
                                                    </div>
                                                )}
                                                {selectedNode.type === 'wait' && (
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold text-white/40 uppercase">Delay Duration (Seconds)</label>
                                                        <Input type="number" defaultValue="45" className="bg-black/40 border-white/5" />
                                                    </div>
                                                )}
                                                <div className="flex gap-2 pt-4">
                                                    <Button variant="secondary" className="flex-1 py-4">
                                                        <Save className="w-4 h-4 mr-2" /> SAVE CHANGES
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="default-settings"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                    >
                                        <Card variant="glass" className="p-6 border-white/10 transition-all hover:border-white/20">
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-[#FF5A5F]/80 mb-6 flex items-center gap-2">
                                                <Settings className="w-4 h-4" /> Engine Settings
                                            </h3>

                                            <Tabs value={settingsTab} onValueChange={setSettingsTab} defaultValue="logic" className="w-full">
                                                <TabsList className="w-full grid grid-cols-2 bg-black/40 p-1 rounded-[2rem] border border-white/5">
                                                    <TabsTrigger value="logic" className="rounded-[2rem] py-2 text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white">Call Logic</TabsTrigger>
                                                    <TabsTrigger value="routing" className="rounded-[2rem] py-2 text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white">Routing</TabsTrigger>
                                                </TabsList>

                                                <TabsContent value="logic" className="space-y-4">
                                                    <div className="space-y-4">
                                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs font-bold text-white">Call Recording</span>
                                                                <div className="w-8 h-4 rounded-full bg-coral flex items-center justify-end px-0.5">
                                                                    <motion.div initial={false} animate={{ x: 0 }} className="w-3 h-3 rounded-full bg-white" />
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs font-bold text-white">AI Transcription</span>
                                                                <div className="w-8 h-4 rounded-full bg-coral flex items-center justify-end px-0.5">
                                                                    <motion.div initial={false} animate={{ x: 0 }} className="w-3 h-3 rounded-full bg-white" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-1">Booking Link (Off-hours)</label>
                                                            <Input
                                                                className="bg-black/40 border-white/5 text-xs text-blue-400"
                                                                defaultValue="https://calendly.com/mos-engine/estimate"
                                                            />
                                                        </div>

                                                        <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Globe className="w-4 h-4 text-indigo-400" />
                                                                <span className="text-[10px] font-bold text-indigo-400 uppercase">Webhook Target</span>
                                                            </div>
                                                            <p className="text-[10px] text-white/40 mb-3">Push lead data to Zapier for reporting.</p>
                                                            <code className="text-[10px] bg-black/40 p-2 rounded block text-indigo-300 truncate">hooks.zapier.com/ba329...</code>
                                                        </div>
                                                    </div>
                                                </TabsContent>

                                                <TabsContent value="routing" className="space-y-4">
                                                    <div className="space-y-4">
                                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <Smartphone className="w-4 h-4 text-green-400" />
                                                                <span className="text-xs font-bold text-white">ZIP Code Routing</span>
                                                            </div>
                                                            <p className="text-[11px] text-white/40 mb-4 leading-relaxed">
                                                                Prioritize calling managers located in the same ZIP code as the lead.
                                                            </p>
                                                            <Button size="sm" className="w-full bg-white/5 hover:bg-white/10 text-[11px] h-10 rounded-xl border border-white/10">Configure ZIP Priorities</Button>
                                                        </div>
                                                    </div>
                                                </TabsContent>
                                            </Tabs>
                                        </Card>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <Card variant="glass" className="p-0 border-white/5 overflow-hidden flex flex-col max-h-[400px]">
                                <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Live Bridge Feed</h3>
                                    {isSimulating && <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />}
                                </div>
                                <div className="p-4 space-y-4 overflow-y-auto no-scrollbar font-mono text-[10px] flex-1">
                                    {simulationLogs.length > 0 ? (
                                        simulationLogs.map((log, i) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                key={i}
                                                className="flex gap-3"
                                            >
                                                <span className="text-white/20 shrink-0">{log.time}</span>
                                                <span className={log.color}>{log.event}</span>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <p className="text-white/10 italic text-center py-8">Idle. Launch simulation to see feed.</p>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="team" className="flex-1 mt-0 overflow-y-auto">
                    <div className="max-w-4xl mx-auto py-8">
                        <TeamManagement />
                    </div>
                </TabsContent>

                <TabsContent value="intelligence" className="flex-1 mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                        {/* List of Calls */}
                        <Card variant="default" className="lg:col-span-1 p-0 overflow-hidden bg-black/40 border-white/5 flex flex-col">
                            <div className="p-6 border-b border-white/5">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                    <Input className="pl-10 bg-white/5 border-white/10 text-sm h-11" placeholder="Search call history..." />
                                </div>
                            </div>
                            <div className="p-2 space-y-1 overflow-y-auto">
                                {callLogs.map((call) => (
                                    <button
                                        key={call.id}
                                        onClick={() => setSelectedCall(call)}
                                        className={twMerge(
                                            "w-full p-4 rounded-2xl flex items-center justify-between transition-all text-left group",
                                            selectedCall?.id === call.id ? "bg-coral/20 border-coral/30" : "hover:bg-white/5 border border-transparent"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={twMerge(
                                                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                                                call.status === "Connected" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                            )}>
                                                <PhoneCall className={twMerge("w-5 h-5", call.status === "Connected" ? "" : "rotate-[135deg]")} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-sm">{call.lead}</div>
                                                <div className="text-[10px] text-white/40">{call.source} · {call.time}</div>
                                            </div>
                                        </div>
                                        <ChevronRight className={twMerge("w-4 h-4 transition-colors", selectedCall?.id === call.id ? "text-coral" : "text-white/10")} />
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Call Detail with Recording & Transcript */}
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="wait">
                                {selectedCall ? (
                                    <motion.div
                                        key={selectedCall.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="h-full"
                                    >
                                        <Card variant="glass" className="h-full border-white/10 flex flex-col p-0 overflow-hidden shadow-2xl">
                                            <div className="p-8 border-b border-white/5 bg-white/2 flex items-center justify-between">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 rounded-3xl bg-coral/20 flex items-center justify-center text-coral shadow-2xl shadow-coral/10">
                                                        <Volume2 className="w-8 h-8" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h2 className="text-2xl font-display font-bold text-white tracking-tight">{selectedCall.lead}</h2>
                                                            <Badge variant="info" className="bg-blue-500/20 text-blue-400 border-none px-3 py-1">{selectedCall.score}/100 Score</Badge>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-xs text-white/40 font-medium">
                                                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Today, {selectedCall.time}</span>
                                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {selectedCall.duration}</span>
                                                            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {selectedCall.manager}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" className="rounded-xl border border-white/5 text-xs h-9 hover:bg-white/5">Delete History</Button>
                                            </div>

                                            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                                                {/* Audio Visualizer Mock */}
                                                <div className="p-8 rounded-3xl bg-black/40 border border-white/5 shadow-inner">
                                                    <div className="flex items-end gap-1.5 h-16 mb-6">
                                                        {[...Array(60)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className="flex-1 bg-coral rounded-full opacity-60"
                                                                animate={{ height: [12, 48, 16, 32, 12][i % 5] }}
                                                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-[10px] font-mono text-white/20 bg-white/5 px-2 py-1 rounded">01:42 / 05:32</div>
                                                        <Button size="sm" className="bg-white text-black hover:bg-white/90 rounded-full w-12 h-12 p-0 flex items-center justify-center">
                                                            <PlayCircle className="w-8 h-8" />
                                                        </Button>
                                                        <div className="text-[10px] font-mono text-white/20 bg-white/5 px-2 py-1 rounded">1.5x Speed</div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-2 text-[10px] font-bold text-coral uppercase tracking-widest px-1">
                                                            <Activity className="w-4 h-4 opacity-50" /> AI Insights Summary
                                                        </div>
                                                        <Card className="p-5 bg-white/[0.02] rounded-3xl border border-white/5">
                                                            <p className="text-sm text-white/70 leading-relaxed italic">
                                                                &quot;{selectedCall.summary}&quot;
                                                            </p>
                                                        </Card>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest px-1">
                                                            <FileText className="w-4 h-4 opacity-50" /> System Action
                                                        </div>
                                                        <Card className="p-5 bg-white/[0.02] rounded-3xl border border-white/5">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400">
                                                                    <BadgeCheckIcon className="w-6 h-6" />
                                                                </div>
                                                                <span className="text-sm text-white/90 font-bold uppercase tracking-tight">Connected via Bridge</span>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest px-1">
                                                        <MessageSquare className="w-4 h-4 opacity-30" /> Real-time Smart Transcript
                                                    </div>
                                                    <div className="p-8 rounded-3xl bg-black/40 border border-white/5 font-sans italic text-sm text-white/50 leading-loose">
                                                        {selectedCall.transcript.split('|').map((line: string, i: number) => (
                                                            <div key={i} className={twMerge("mb-6 flex gap-4", line.includes("Manager:") ? "text-white/80" : "")}>
                                                                <div className="w-16 shrink-0 font-bold opacity-30 text-[10px] uppercase pt-1">{line.split(':')[0]}</div>
                                                                <div>{line.split(':')[1]}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
                                        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                            <Volume2 className="w-10 h-10 text-white/10" />
                                        </div>
                                        <p className="text-sm font-display text-white/20 uppercase tracking-widest font-bold">Select Call to view Intelligence</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}



