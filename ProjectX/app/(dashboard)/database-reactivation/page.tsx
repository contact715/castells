"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { motion } from "framer-motion";
import { Database } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Plus, Sparkles, Calendar, Clock, TrendingUp } from "lucide-react";
import { HeaderActions } from "@/components/layout/HeaderActions";
import { FeatureSteps } from "@/components/ui/feature-section";

const reactivationJourney = [
    {
        step: 'Step 1',
        title: 'Segment Analysis',
        content: 'Identify high-potential past clients who haven\'t interacted with your brand in 6+ months.',
        image: 'https://images.unsplash.com/photo-1551288049-bbda38a5f070?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 'Step 2',
        title: 'AI Personalization',
        content: 'Generate tailored offers and personalized follow-up messages based on their previous purchase history.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 'Step 3',
        title: 'Automated Outreach',
        content: 'Launch multi-channel reactivation campaigns across SMS, Email, and Social targeting.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop'
    },
];

interface Campaign {
    id: string;
    name: string;
    targetAudience: string;
    lastRun: string;
    leadsGenerated: number;
    status: "active" | "paused";
}

const mockCampaigns: Campaign[] = [
    {
        id: "1",
        name: "HVAC Reactivation 2024",
        targetAudience: "Past HVAC Clients (12mo ago)",
        lastRun: "Oct 25, 2024",
        leadsGenerated: 45,
        status: "active",
    },
    {
        id: "2",
        name: "Plumbing Follow-up",
        targetAudience: "Past Plumbing Clients",
        lastRun: "Oct 20, 2024",
        leadsGenerated: 28,
        status: "active",
    },
    {
        id: "3",
        name: "Lost Leads Recovery",
        targetAudience: "Leads without conversion",
        lastRun: "Oct 15, 2024",
        leadsGenerated: 12,
        status: "paused",
    },
];

export default function DatabaseReactivationPage() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [campaignName, setCampaignName] = useState("");
    const [targetSegment, setTargetSegment] = useState("");
    const [messageTemplate, setMessageTemplate] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");

    const handleGenerateAIMessage = () => {
        setMessageTemplate(
            `Hi! We noticed you haven't used our services in a while. We'd love to help you again! Special offer: 15% off your next service. Reply to this message to claim your discount.`
        );
    };

    return (
        <div
            className="flex flex-col h-full gap-8"
        >
            <HeaderActions>
                <Button onClick={() => setShowCreateForm(!showCreateForm)} className="rounded-[2rem]">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Campaign
                </Button>
            </HeaderActions>

            {/* Campaign Analytics Visualization */}
            <Card variant="default" className="p-6">
                <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">
                    Campaign Performance Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 rounded-[2rem] bg-coral/10 /20">
                        <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans mb-1">
                            Total Campaigns
                        </p>
                        <p className="text-3xl font-display font-semibold text-coral">
                            {mockCampaigns.length}
                        </p>
                    </div>
                    <div className="text-center p-4 rounded-[2rem] bg-green-600/10 dark:bg-green-400/10  ">
                        <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans mb-1">
                            Total Leads Generated
                        </p>
                        <p className="text-3xl font-display font-semibold text-green-600 dark:text-green-400">
                            {mockCampaigns.reduce((sum, c) => sum + c.leadsGenerated, 0)}
                        </p>
                    </div>
                    <div className="text-center p-4 rounded-[2rem] bg-coral/10 /20">
                        <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans mb-1">
                            Active Campaigns
                        </p>
                        <p className="text-3xl font-display font-semibold text-coral">
                            {mockCampaigns.filter((c) => c.status === "active").length}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Campaign Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="default">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-[2rem] bg-coral/10">
                            <TrendingUp className="w-6 h-6 text-coral" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">Total Messages Sent</p>
                            <p className="text-2xl font-display font-semibold text-coral">1,245</p>
                        </div>
                    </div>
                </Card>
                <Card variant="default">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-[2rem] bg-green-600/10 dark:bg-green-400/10">
                            <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">Response Rate</p>
                            <p className="text-2xl font-display font-semibold text-green-600 dark:text-green-400">18.5%</p>
                        </div>
                    </div>
                </Card>
                <Card variant="default">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-[2rem] bg-coral/10">
                            <Plus className="w-6 h-6 text-coral" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">New Leads Generated</p>
                            <p className="text-2xl font-display font-semibold text-coral">85</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Campaigns Table */}
                <div className="lg:col-span-2">
                    <Card variant="default">
                        <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">
                            Reactivation Campaigns
                        </h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Campaign Name</TableHead>
                                    <TableHead>Target Audience</TableHead>
                                    <TableHead>Last Run</TableHead>
                                    <TableHead>Leads Generated</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockCampaigns.map((campaign) => (
                                    <TableRow key={campaign.id}>
                                        <TableCell className="font-medium">
                                            {campaign.name}
                                        </TableCell>
                                        <TableCell>{campaign.targetAudience}</TableCell>
                                        <TableCell>{campaign.lastRun}</TableCell>
                                        <TableCell>{campaign.leadsGenerated}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={campaign.status === "active" ? "success" : "warning"}
                                            >
                                                {campaign.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>

                {/* Create Campaign Form */}
                {showCreateForm && (
                    <div>
                        <Card variant="default">
                            <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">
                                Create New Campaign
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                                        Campaign Name
                                    </label>
                                    <Input
                                        value={campaignName}
                                        onChange={(e) => setCampaignName(e.target.value)}
                                        placeholder="Enter campaign name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                                        Target Segment
                                    </label>
                                    <Select
                                        value={targetSegment}
                                        onChange={(e) => setTargetSegment(e.target.value)}
                                    >
                                        <option value="">Select segment</option>
                                        <option value="hvac-past">Past HVAC Clients</option>
                                        <option value="plumbing-past">Past Plumbing Clients</option>
                                        <option value="no-conversion">
                                            Leads without conversion
                                        </option>
                                    </Select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                                        Message Template
                                    </label>
                                    <textarea
                                        value={messageTemplate}
                                        onChange={(e) => setMessageTemplate(e.target.value)}
                                        className="w-full rounded-[2rem] bg-black/5 dark:bg-dark-surface/50 px-4 py-3 text-base text-text-primary dark:text-white placeholder:text-black/20 dark:placeholder:text-white/20 focus:outline-none focus: dark:focus: focus:bg-white dark:focus:bg-black/5 dark:bg-white/10 transition-all duration-300 font-sans min-h-[120px]"
                                        placeholder="Enter message template"
                                    />
                                    <Button
                                        variant="outline"
                                        className="mt-2 w-full"
                                        onClick={handleGenerateAIMessage}
                                    >
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Generate AI Message
                                    </Button>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                                        Schedule
                                    </label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="date"
                                            value={scheduleDate}
                                            onChange={(e) => setScheduleDate(e.target.value)}
                                            className="flex-1"
                                        />
                                        <Input
                                            type="time"
                                            value={scheduleTime}
                                            onChange={(e) => setScheduleTime(e.target.value)}
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                                <Button className="w-full">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Create Campaign
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <FeatureSteps
                    features={reactivationJourney}
                    title="Reactivation Flow Journey"
                    autoPlayInterval={5000}
                    imageHeight="h-[450px]"
                />
            </div>
        </div>
    );
}



