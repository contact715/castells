import { Zap, MessageSquare, PhoneCall, Clock, ChevronRight, Share2, BadgeCheck, AlertTriangle, Timer, Globe, GitBranch } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { twMerge } from "tailwind-merge";

interface NodeProps {
    title: string;
    description: string;
    icon: any;
    color: string;
    active?: boolean;
    onClick?: () => void;
}

export function WorkflowNode({ title, description, icon: Icon, color, active, onClick }: NodeProps) {
    return (
        <div onClick={onClick} className="w-full h-full cursor-pointer">
            <Card variant="glass"
                className={twMerge(
                    "p-6 h-full relative group border-l-4 transition-all active:scale-[0.98]",
                    active ? "border-l-coral scale-[1.02] bg-white/5" : "border-l-transparent hover:border-l-white/20"
                )}>
                <div className="flex items-start gap-4">
                    <div className={twMerge("w-12 h-12 rounded-[2rem] flex items-center justify-center shrink-0", color)}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-white tracking-tight">{title}</h4>
                            {active && (
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed truncate">{description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/10 group-hover:text-white/40 transition-colors self-center" />
                </div>
            </Card>
        </div>
    );
}

export function TriggerNode({ onClick }: { onClick?: () => void }) {
    return (
        <div className="flex flex-col items-center">
            <WorkflowNode
                title="Omnichannel Entry"
                description="Yelp, Thumbtack, FB Lead Ads"
                icon={Zap}
                color="bg-coral shadow-coral/20 shadow-lg"
                onClick={onClick}
            />
            <div className="w-px h-12 bg-gradient-to-b from-coral to-blue-400" />
        </div>
    );
}

export function SmsNode({ onClick }: { onClick?: () => void }) {
    return (
        <div className="flex flex-col items-center">
            <WorkflowNode
                title="Auto-Hook SMS"
                description="Instant greeting & verification"
                icon={MessageSquare}
                color="bg-blue-500 shadow-blue-500/20 shadow-lg"
                onClick={onClick}
            />
            <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-yellow-500" />
        </div>
    );
}

export function CallBlastNode({ onClick }: { onClick?: () => void }) {
    return (
        <div className="flex flex-col items-center">
            <WorkflowNode
                title="Sales Blast"
                description="Call all managers (Press 1 to connect)"
                icon={PhoneCall}
                color="bg-purple-500 shadow-purple-500/20 shadow-lg"
                onClick={onClick}
            />
            <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-green-500" />
        </div>
    );
}

export function WaitNode({ onClick }: { onClick?: () => void }) {
    return (
        <div className="flex flex-col items-center">
            <WorkflowNode
                title="Smart Delay"
                description="Wait 30-60s for SMS reading"
                icon={Timer}
                color="bg-blue-400 shadow-blue-400/20 shadow-lg"
                onClick={onClick}
            />
            <div className="w-px h-12 bg-gradient-to-b from-blue-400 to-purple-500" />
        </div>
    );
}

export function WebhookNode({ onClick }: { onClick?: () => void }) {
    return (
        <div className="flex flex-col items-center">
            <WorkflowNode
                title="External Sync"
                description="Send lead to Zapier/CRM"
                icon={Globe}
                color="bg-indigo-600 shadow-indigo-600/20 shadow-lg"
                onClick={onClick}
            />
        </div>
    );
}

export function LogicGateNode({ title, description, successLabel, failLabel, onClick }: any) {
    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-sm">
                <WorkflowNode
                    title={title || "Logic Filter"}
                    description={description || "Check call status"}
                    icon={GitBranch}
                    color="bg-pink-500 shadow-pink-500/20 shadow-lg"
                    onClick={onClick}
                />
            </div>
            <div className="flex w-full max-w-lg mt-0">
                <div className="flex-1 flex flex-col items-center">
                    <div className="w-px h-12 bg-green-500" />
                    <Badge variant="success" className="text-[10px] py-0">{successLabel || "Answered"}</Badge>
                </div>
                <div className="flex-1 flex flex-col items-center">
                    <div className="w-px h-12 bg-red-500" />
                    <Badge variant="danger" className="text-[10px] py-0">{failLabel || "No Answer"}</Badge>
                </div>
            </div>
        </div>
    );
}

export function AfterHoursGate({ onClick }: { onClick?: () => void }) {
    return (
        <div className="flex flex-col items-center">
            <WorkflowNode
                title="Business Hours Guard"
                description="8:00 AM - 6:00 PM logic gate"
                icon={Clock}
                color="bg-yellow-500 shadow-yellow-500/20 shadow-lg"
                onClick={onClick}
            />
        </div>
    );
}
