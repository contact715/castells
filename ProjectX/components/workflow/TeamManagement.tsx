"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, Smartphone, User, Shield } from "lucide-react";

interface Manager {
    id: string;
    name: string;
    phone: string;
    priority: "Primary" | "Secondary";
    status: "online" | "offline";
    zipCodes: string[];
}

export function TeamManagement() {
    const [managers, setManagers] = useState<Manager[]>([
        { id: "1", name: "John Smith", phone: "+1 (555) 123-4567", priority: "Primary", status: "online", zipCodes: ["90210", "90211"] },
        { id: "2", name: "Sarah Johnson", phone: "+1 (555) 987-6543", priority: "Secondary", status: "online", zipCodes: ["90001", "90002"] },
    ]);

    const addManager = () => {
        const newManager: Manager = {
            id: Date.now().toString(),
            name: "New Manager",
            phone: "+1 (555) 000-0000",
            priority: "Secondary",
            status: "offline",
            zipCodes: []
        };
        setManagers([...managers, newManager]);
    };

    const deleteManager = (id: string) => {
        setManagers(managers.filter(m => m.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-display font-semibold text-white tracking-tight">Sales Team Fleet</h3>
                    <p className="text-sm text-white/40">Manage your agents and their geofencing coverage</p>
                </div>
                <Button onClick={addManager} variant="secondary" className="px-8 h-12 shadow-lg shadow-coral/20">
                    <Plus className="w-4 h-4 mr-2" />
                    RECRUIT MANAGER
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {managers.map((manager) => (
                    <Card key={manager.id} variant="glass" className="p-6 border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-coral/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-start justify-between relative z-10">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-[2rem] bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-inner">
                                    <User className="w-7 h-7 text-purple-400" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="text-lg font-bold text-white tracking-tight">{manager.name}</h4>
                                        <div className={`px-2 py-0.5 rounded-[2rem] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${manager.status === "online" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-white/5 text-white/20"}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${manager.status === "online" ? "bg-green-500 animate-pulse" : "bg-white/20"}`} />
                                            {manager.status}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2 text-sm text-white/50">
                                            <Smartphone className="w-4 h-4 text-white/20" />
                                            {manager.phone}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-white/50">
                                            <Shield className="w-4 h-4 text-white/20" />
                                            {manager.priority} Tier
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mr-2 self-center">Assigned ZIPs:</div>
                                        {manager.zipCodes.length > 0 ? manager.zipCodes.map(zip => (
                                            <span key={zip} className="px-3 py-1 bg-white/5 rounded-[2rem] border border-white/5 text-[11px] text-white/60 font-mono">
                                                {zip}
                                            </span>
                                        )) : (
                                            <>
                                                <span className="text-[11px] text-white/20 italic">No ZIPs assigned (Global)</span>
                                                <p className="text-[10px] text-white/40">Owner&apos;s Account</p>
                                            </>
                                        )}
                                        <button className="px-2 py-1 hover:bg-white/10 rounded-[2rem] text-white/20 hover:text-white transition-colors">
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteManager(manager.id)}
                                className="text-white/10 hover:text-red-400 hover:bg-red-400/10 rounded-[2rem]"
                            >
                                <Trash2 className="w-5 h-5" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <Card variant="glass" className="p-8 bg-coral/5 border-coral/20 border-2 rounded-[2rem]">
                <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-[2rem] bg-coral/20 flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-coral" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white tracking-tight mb-2">Advanced Routing Logic</h4>
                        <p className="text-sm text-white/60 leading-relaxed">
                            The engine uses a <span className="text-coral font-bold">Hybrid Simultaneous Ring</span> approach.
                            First, it calls <span className="text-white font-bold">Primary</span> managers in the lead&apos;s <span className="text-white font-bold">ZIP Code</span>.
                            If no response within 15s, it blasts all <span className="text-white font-bold">Online</span> managers globally.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
