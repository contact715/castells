"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Trash2, Smartphone, Shield, DollarSign, AlertTriangle } from "lucide-react";

interface Manager {
    id: string;
    name: string;
    phone: string;
    priority: "Primary" | "Secondary";
    status: "online" | "offline";
    cpaOverride?: number;
}

export function TeamSettings() {
    const [managers, setManagers] = useState<Manager[]>([
        { id: "1", name: "John Smith", phone: "+1 (555) 123-4567", priority: "Primary", status: "online", cpaOverride: 50 },
        { id: "2", name: "Sarah Johnson", phone: "+1 (555) 987-6543", priority: "Secondary", status: "online" },
    ]);

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Global Financial Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="default" className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg text-text-primary dark:text-white">Global KPI Payouts</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Meeting Set</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">$</span>
                                    <Input className="pl-6 font-mono font-bold text-green-500" defaultValue="45.00" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">In-Office Show</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">$</span>
                                    <Input className="pl-6 font-mono font-bold text-green-500" defaultValue="120.00" />
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-text-secondary dark:text-white/40 italic">Payouts are credited instantaneously to manager wallet upon status update.</p>
                    </div>
                </Card>

                <Card variant="default" className="p-6 border-red-500/20 bg-red-500/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg text-text-primary dark:text-white">Discipline & Penalties</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                            <div>
                                <div className="font-bold text-sm text-red-500">Cooling-off Period</div>
                                <div className="text-[10px] text-red-400/60">Disable routing after 3 missed calls</div>
                            </div>
                            <Button size="sm" className="bg-red-500 text-white hover:bg-red-600 h-8 text-xs">ENABLED</Button>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-red-400 tracking-widest">Fake Status Penalty</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400">$</span>
                                <Input className="pl-6 font-mono font-bold text-red-500 border-red-500/20 bg-red-500/5" defaultValue="50.00" />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Manager List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-display font-bold text-text-primary dark:text-white">Hunting Group (Managers)</h3>
                    <Button className="bg-primary/10 text-primary hover:bg-primary/20"><Plus className="w-4 h-4 mr-2" /> RECRUIT MANAGER</Button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {managers.map((manager) => (
                        <Card key={manager.id} className="p-4 flex items-center justify-between group hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center font-bold text-text-secondary">
                                    {manager.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-text-primary dark:text-white">{manager.name}</h4>
                                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                                        <Smartphone className="w-3 h-3" /> {manager.phone}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <div className="text-[9px] uppercase font-bold text-text-secondary tracking-widest mb-1">CPA Override</div>
                                    <div className="font-mono text-sm font-bold text-text-primary dark:text-white">{manager.cpaOverride ? `$${manager.cpaOverride}` : 'Default'}</div>
                                </div>
                                <Button variant="ghost" size="icon" className="text-text-secondary hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
