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
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-inner bg-emerald-100 text-emerald-600">
                            <DollarSign className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900">Global KPI Payouts</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500">Meeting Set</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                    <Input className="pl-6 font-mono font-semibold text-emerald-600" defaultValue="45.00" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500">In-Office Show</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                    <Input className="pl-6 font-mono font-semibold text-emerald-600" defaultValue="120.00" />
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 italic">Payouts are credited instantaneously to manager wallet upon status update.</p>
                    </div>
                </Card>

                <Card className="p-6 border-red-200/50 bg-red-50/50">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-inner bg-red-100 text-red-600">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900">Discipline & Penalties</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-red-50/70 rounded-inner border border-red-200/50">
                            <div>
                                <div className="font-semibold text-sm text-red-600">Cooling-off Period</div>
                                <div className="text-xs text-red-500">Disable routing after 3 missed calls</div>
                            </div>
                            <Button size="sm" variant="danger" className="h-8 text-xs">ENABLED</Button>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500">Fake Status Penalty</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                <Input className="pl-6 font-mono font-semibold text-red-600 border-red-200 bg-red-50/50" defaultValue="50.00" />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Manager List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Hunting Group (Managers)</h3>
                    <Button variant="primary"><Plus className="w-4 h-4 mr-2" /> RECRUIT MANAGER</Button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {managers.map((manager) => (
                        <Card key={manager.id} className="p-4 flex items-center justify-between group hover:border-blue-300/50 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center font-semibold text-gray-700 border border-gray-200">
                                    {manager.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-900">{manager.name}</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Smartphone className="w-3 h-3" /> {manager.phone}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <div className="text-xs uppercase font-semibold text-gray-500 mb-1">CPA Override</div>
                                    <div className="font-mono text-sm font-semibold text-gray-900">{manager.cpaOverride ? `$${manager.cpaOverride}` : 'Default'}</div>
                                </div>
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
