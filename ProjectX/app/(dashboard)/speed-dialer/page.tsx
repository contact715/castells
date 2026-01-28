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
        <Tabs defaultValue="dashboard">
            <div className="space-y-6 pb-8">
                <div className="flex justify-start">
                    <div className="bg-[#2C2C2C] border border-white/10 p-1.5 rounded-card shadow-[0_4px_12px_rgba(0,0,0,0.3),0_8px_24px_rgba(0,0,0,0.2)]">
                        <TabsList className="bg-transparent gap-2">
                            <TabsTrigger value="dashboard" className="rounded-inner px-6 py-2.5 text-xs font-semibold transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:font-medium text-gray-400 hover:text-white hover:bg-white/10 [&[data-state=active]_svg]:text-white">
                                <LayoutDashboard className="w-4 h-4 mr-2" /> God&apos;s Eye
                            </TabsTrigger>
                            <TabsTrigger value="builder" className="rounded-inner px-6 py-2.5 text-xs font-semibold transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:font-medium text-gray-400 hover:text-white hover:bg-white/10 [&[data-state=active]_svg]:text-white">
                                <Zap className="w-4 h-4 mr-2" /> Workflow
                            </TabsTrigger>
                            <TabsTrigger value="timeline" className="rounded-inner px-6 py-2.5 text-xs font-semibold transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:font-medium text-gray-400 hover:text-white hover:bg-white/10 [&[data-state=active]_svg]:text-white">
                                <Clock className="w-4 h-4 mr-2" /> Timeline
                            </TabsTrigger>
                            <TabsTrigger value="team" className="rounded-inner px-6 py-2.5 text-xs font-semibold transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:font-medium text-gray-400 hover:text-white hover:bg-white/10 [&[data-state=active]_svg]:text-white">
                                <Users className="w-4 h-4 mr-2" /> Team
                            </TabsTrigger>
                            <div className="w-px h-6 bg-white/10 mx-2" />
                            <TabsTrigger value="docs" className="rounded-inner px-6 py-2.5 text-xs font-semibold transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:font-medium text-gray-400 hover:text-white hover:bg-white/10 [&[data-state=active]_svg]:text-white">
                                <FileText className="w-4 h-4 mr-2" /> Specs
                            </TabsTrigger>
                            <TabsTrigger value="prototype" className="rounded-inner px-6 py-2.5 text-xs font-semibold transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:font-medium text-gray-400 hover:text-white hover:bg-white/10 [&[data-state=active]_svg]:text-white">
                                <Code className="w-4 h-4 mr-2" /> Proto
                            </TabsTrigger>
                            <TabsTrigger value="tour" className="rounded-inner px-6 py-2.5 text-xs font-semibold transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:font-medium text-gray-400 hover:text-white hover:bg-white/10 [&[data-state=active]_svg]:text-white">
                                <Globe className="w-4 h-4 mr-2" /> Tour
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>

                <TabsContent value="dashboard" className="m-0 data-[state=inactive]:hidden text-foreground">
                    <SpeedDialerDashboard />
                </TabsContent>
                <TabsContent value="builder" className="m-0 data-[state=inactive]:hidden text-foreground">
                    <WorkflowBuilder />
                </TabsContent>
                <TabsContent value="timeline" className="m-0 data-[state=inactive]:hidden text-foreground">
                    <LeadTimeline />
                </TabsContent>
                <TabsContent value="team" className="m-0 data-[state=inactive]:hidden text-foreground">
                    <TeamSettings />
                </TabsContent>
                <TabsContent value="docs" className="m-0 data-[state=inactive]:hidden text-foreground overflow-hidden">
                    <DocumentationViewer />
                </TabsContent>
                <TabsContent value="prototype" className="m-0 data-[state=inactive]:hidden text-foreground overflow-hidden">
                    <PrototypeApp />
                </TabsContent>
                <TabsContent value="tour" className="m-0 data-[state=inactive]:hidden text-foreground overflow-hidden">
                    <InteractiveTour />
                </TabsContent>
            </div>
        </Tabs>
    );
}
