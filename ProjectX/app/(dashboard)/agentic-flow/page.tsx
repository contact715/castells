"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Users,
  BarChart3,
  Settings,
  Play,
  Clock,
  Activity,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  PhoneCall,
  MessageSquare,
  Link2,
  BadgeCheck
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HeaderActions } from "@/components/layout/HeaderActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { TriggerNode, SmsNode, CallBlastNode, AfterHoursGate } from "@/components/workflow/WorkflowNodes";
import { TeamManagement } from "@/components/workflow/TeamManagement";
import AgentPlan from "@/components/ui/agent-plan";

export default function AgenticFlowPage() {
  const [activeTab, setActiveTab] = useState("builder");

  return (
    <div className="flex flex-col h-full gap-8">
      <HeaderActions>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Engine Live</span>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20 rounded-xl px-6 h-[42px] font-bold transition-all active:scale-95">
            <Play className="w-4 h-4 mr-2" />
            Publish Changes
          </Button>
        </div>
      </HeaderActions>

      <Tabs defaultValue="builder" className="w-full flex-1 flex flex-col gap-6" onValueChange={setActiveTab}>
        <TabsList className="bg-black/20 dark:bg-white/5 p-1 rounded-2xl w-fit border border-white/5">
          <TabsTrigger value="builder" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Zap className="w-4 h-4 mr-2" />
            Workflow Builder
          </TabsTrigger>
          <TabsTrigger value="team" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" />
            Sales Team
          </TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            Target Hunter Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="flex-1 mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            {/* Visual Builder Canvas */}
            <div className="lg:col-span-2">
              <Card variant="default" className="min-h-[700px] flex flex-col relative overflow-hidden bg-black/40 border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

                <div className="p-6 border-b border-white/5 flex items-center justify-between relative z-10">
                  <div>
                    <h3 className="text-xl font-display font-semibold text-white">Visual Engine</h3>
                    <p className="text-xs text-white/40">Canvas for omnichannel lead-to-call bridge</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white/60">Zoom: 100%</Button>
                  </div>
                </div>

                <div className="flex-1 p-12 overflow-y-auto relative z-10 flex flex-col items-center gap-0">
                  <TriggerNode />
                  <SmsNode />
                  <div className="mb-12">
                    <AfterHoursGate />
                  </div>
                  <CallBlastNode />

                  <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent" />

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10"
                  >
                    <BadgeCheck className="w-5 h-5 text-green-500" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Lead Connected</span>
                  </motion.div>
                </div>
              </Card>
            </div>

            {/* Node Settings Sidebar */}
            <div className="space-y-6">
              <Card variant="glass" className="p-6 border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-6 flex items-center gap-2">
                  <Settings className="w-4 h-4" /> Node Configuration
                </h3>

                <Tabs defaultValue="sms" className="w-full">
                  <TabsList className="w-full bg-white/5 rounded-xl border border-white/5 p-1 mb-6">
                    <TabsTrigger value="sms" className="flex-1 text-xs py-2 rounded-lg">SMS Hook</TabsTrigger>
                    <TabsTrigger value="call" className="flex-1 text-xs py-2 rounded-lg">Call Logic</TabsTrigger>
                  </TabsList>

                  <TabsContent value="sms" className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-1">Engagement Template</label>
                      <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-sm text-white/80 font-sans leading-relaxed min-h-[140px]">
                        Hi <span className="text-purple-400 font-bold">[Lead Name]</span>! This is <span className="text-purple-400 font-bold">[Company]</span>.
                        We received your request via <span className="text-purple-400 font-bold">[Source]</span>.
                        Our technician is calling you right now to provide an estimate.
                        <br /><br />
                        In the meantime, view our latest work: <span className="text-blue-400 underline">[Google_Reviews_Link]</span>
                      </div>
                    </div>
                    <Button className="w-full bg-white/5 hover:bg-white/10 text-white/60 text-xs py-2 h-[40px] rounded-xl border border-white/10">
                      Edit Dynamic Tags
                    </Button>
                  </TabsContent>

                  <TabsContent value="call" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white">Simultaneous Blast</span>
                          <span className="text-[10px] text-white/40">Call everyone at once</span>
                        </div>
                        <div className="w-10 h-6 rounded-full bg-purple-600 flex items-center justify-end px-1">
                          <div className="w-4 h-4 rounded-full bg-white shadow-lg" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-1">Whisper Message</label>
                        <textarea
                          className="w-full h-24 bg-black/40 border border-white/5 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                          placeholder="Hello! New lead from Yelp. Press 1 to connect..."
                        />
                      </div>

                      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Smartphone className="w-4 h-4 text-yellow-500" />
                          <span className="text-[10px] font-bold text-yellow-500 uppercase">Caller ID Match</span>
                        </div>
                        <p className="text-[10px] text-white/40 italic">
                          Call will appear to the client from the same number that sent the SMS.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>



              <Card variant="default" className="p-0 border-white/5 bg-black/40 backdrop-blur-xl flex flex-col">
                <div className="p-6 border-b border-white/5">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Agentic Execution Plan
                  </h3>
                </div>
                <div className="flex-1 overflow-auto max-h-[400px]">
                  <AgentPlan />
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team" className="flex-1 mt-0">
          <div className="max-w-4xl mx-auto py-8">
            <TeamManagement />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="flex-1 mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Avg. Response Time", value: "18.4s", sub: "-2.1s from last week", icon: Clock, color: "text-blue-500" },
              { label: "Bridge Rate", value: "94.2%", sub: "+5.4% increase", icon: Link2, color: "text-green-500" },
              { label: "FB Lead ROI", value: "11.2x", sub: "Premium High-Intent", icon: Zap, color: "text-purple-500" },
              { label: "Missed Calls", value: "2", sub: "Automatically Nurtured", icon: Activity, color: "text-red-500" },
            ].map((stat, i) => (
              <Card key={i} variant="glass" className="p-6 border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <TrendingUp className="w-4 h-4 text-green-500/40" />
                </div>
                <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{stat.label}</h4>
                <div className="text-2xl font-display font-bold text-white my-1">{stat.value}</div>
                <div className="text-[10px] text-white/40">{stat.sub}</div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="glass" className="p-6 border-white/5">
              <h3 className="text-lg font-bold text-white mb-6">Source Performance (Target Hunter)</h3>
              <div className="space-y-6">
                {[
                  { source: "Yelp Messages", leads: 42, color: "bg-red-500", rate: "92%" },
                  { source: "Thumbtack Inbound", leads: 28, color: "bg-blue-500", rate: "88%" },
                  { source: "Facebook Lead Ads", leads: 65, color: "bg-purple-500", rate: "96%" },
                  { source: "Website Forms", leads: 15, color: "bg-orange-500", rate: "74%" },
                ].map((source, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-medium text-white/80">{source.source}</span>
                      <span className="text-xs text-white/40">{source.leads} Leads · <span className="text-green-400">{source.rate} Bridge</span></span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${source.color} rounded-full`} style={{ width: source.rate }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="glass" className="p-6 border-white/5">
              <h3 className="text-lg font-bold text-white mb-6">Manager Leaderboard (Bridge Speed)</h3>
              <div className="space-y-4">
                {[
                  { name: "Sarah Johnson", speed: "12.4s", leads: 142, rank: 1 },
                  { name: "John Smith", speed: "14.8s", leads: 98, rank: 2 },
                  { name: "Michael Doe", speed: "22.1s", leads: 45, rank: 3 },
                ].map((manager, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="text-lg font-bold text-white/20 w-4">#{manager.rank}</div>
                      <div>
                        <div className="font-bold text-white">{manager.name}</div>
                        <div className="text-[10px] text-white/40">{manager.leads} Bridges Handled</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-400">{manager.speed}</div>
                      <div className="text-[10px] text-white/20">Avg. Click</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
