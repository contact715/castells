"use client";

import { motion } from "framer-motion";
import { Shield, AlertTriangle, Lock, FileText, CheckCircle, Ban } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function CompliancePage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-display tracking-tight text-white flex items-center gap-3">
                        <Shield className="w-8 h-8 text-emerald-500" />
                        Compliance Guardian
                    </h1>
                    <p className="text-text-secondary mt-1">Status: <span className="text-emerald-400 font-bold">ACTIVE</span> (TCPA & DNC Protection On)</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><FileText className="w-4 h-4 mr-2" /> Export Audit Log</Button>
                </div>
            </div>

            {/* Risk Score */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="glass" className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                        <div className="text-sm text-text-secondary">Risk Score</div>
                        <div className="text-2xl font-bold text-white">Low (2%)</div>
                    </div>
                </Card>
                <Card variant="glass" className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                        <Ban className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <div className="text-sm text-text-secondary">Blocked Numbers (DNC)</div>
                        <div className="text-2xl font-bold text-white">1,420</div>
                    </div>
                </Card>
                <Card variant="glass" className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <div className="text-sm text-text-secondary">Data Erasure Requests</div>
                        <div className="text-2xl font-bold text-white">3</div>
                    </div>
                </Card>
            </div>

            {/* Activity Log */}
            <Card className="p-0 overflow-hidden border border-white/10">
                <div className="p-4 border-b border-white/10 bg-white/5">
                    <h3 className="font-bold text-white">Recent Compliance Actions</h3>
                </div>
                <div className="divide-y divide-white/10">
                    {[
                        { action: "Blocked Call", reason: "DNC Registry Match", time: "2 mins ago", icon: Ban, color: "text-red-400" },
                        { action: "Scrubber Check", reason: "Valid Mobile Number", time: "5 mins ago", icon: CheckCircle, color: "text-emerald-400" },
                        { action: "Data Encryption", reason: "Daily Backup Secured", time: "1 hour ago", icon: Lock, color: "text-blue-400" },
                        { action: "Opt-Out Request", reason: "User replied STOP", time: "2 hours ago", icon: AlertTriangle, color: "text-yellow-400" },
                    ].map((item, i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                                <div>
                                    <div className="text-sm font-medium text-white">{item.action}</div>
                                    <div className="text-xs text-text-secondary">{item.reason}</div>
                                </div>
                            </div>
                            <div className="text-xs text-text-tertiary">{item.time}</div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
