"use client";

import { useState } from "react";
import { HeaderActions } from "@/components/layout/HeaderActions";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { LayoutDashboard, Zap, Clock, Users, FileText, Code, Globe } from "lucide-react";
import { SpeedDialerDashboard } from "@/components/speed-dialer/SpeedDialerDashboard";
import { WorkflowBuilder } from "@/components/speed-dialer/WorkflowBuilder";
import { LeadTimeline } from "@/components/speed-dialer/LeadTimeline";
import { TeamSettings } from "@/components/speed-dialer/TeamSettings";
import { DocumentationViewer } from "@/components/speed-dialer/DocumentationViewer";
import { PrototypeApp } from "@/components/speed-dialer/PrototypeApp";
import { InteractiveTour } from "@/components/speed-dialer/InteractiveTour";

export default function SpeedDialerPage() {
    return (
        <div className="h-[calc(100vh-4rem)] p-8 flex flex-col gap-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-surface-foreground">
                        Speed Dialer
                        <span className="text-primary ml-2">.</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 font-medium tracking-wide">
                        Instant Hunt Engine & Lead Orchestration
                    </p>
                </div>
            </header>

            <Tabs defaultValue="dashboard" className="flex-1 flex flex-col">
                <div className="flex justify-center mb-8">
                    <div className="bg-surface dark:bg-white/5 border border-black/5 dark:border-white/5 p-1.5 rounded-full shadow-2xl shadow-black/10 backdrop-blur-3xl">
                        <TabsList className="bg-transparent gap-2">
                            <TabsTrigger value="dashboard" className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg hover:bg-black/5 dark:hover:bg-white/5">
                                <LayoutDashboard className="w-4 h-4 mr-2" /> God's Eye
                            </TabsTrigger>
                            <TabsTrigger value="builder" className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg hover:bg-black/5 dark:hover:bg-white/5">
                                <Zap className="w-4 h-4 mr-2" /> Workflow
                            </TabsTrigger>
                            <TabsTrigger value="timeline" className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg hover:bg-black/5 dark:hover:bg-white/5">
                                <Clock className="w-4 h-4 mr-2" /> Timeline
                            </TabsTrigger>
                            <TabsTrigger value="team" className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg hover:bg-black/5 dark:hover:bg-white/5">
                                <Users className="w-4 h-4 mr-2" /> Team
                            </TabsTrigger>
                            <div className="w-px h-6 bg-border mx-2" />
                            <TabsTrigger value="docs" className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all data-[state=active]:bg-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-black/5 dark:hover:bg-white/5">
                                <FileText className="w-4 h-4 mr-2" /> Specs
                            </TabsTrigger>
                            <TabsTrigger value="prototype" className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all data-[state=active]:bg-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-black/5 dark:hover:bg-white/5">
                                <Code className="w-4 h-4 mr-2" /> Proto
                            </TabsTrigger>
                            <TabsTrigger value="tour" className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all data-[state=active]:bg-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-black/5 dark:hover:bg-white/5">
                                <Globe className="w-4 h-4 mr-2" /> Tour
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden min-h-0 relative animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <TabsContent value="dashboard" className="h-full m-0 data-[state=inactive]:hidden text-foreground">
                        <SpeedDialerDashboard />
                    </TabsContent>
                    <TabsContent value="builder" className="h-full m-0 data-[state=inactive]:hidden text-foreground">
                        <WorkflowBuilder />
                    </TabsContent>
                    <TabsContent value="timeline" className="h-full m-0 data-[state=inactive]:hidden text-foreground">
                        <LeadTimeline />
                    </TabsContent>
                    <TabsContent value="team" className="h-full m-0 data-[state=inactive]:hidden text-foreground">
                        <TeamSettings />
                    </TabsContent>
                    <TabsContent value="docs" className="h-full m-0 data-[state=inactive]:hidden text-foreground overflow-hidden">
                        <DocumentationViewer />
                    </TabsContent>
                    <TabsContent value="prototype" className="h-full m-0 data-[state=inactive]:hidden text-foreground overflow-hidden">
                        <PrototypeApp />
                    </TabsContent>
                    <TabsContent value="tour" className="h-full m-0 data-[state=inactive]:hidden text-foreground overflow-hidden">
                        <InteractiveTour />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
