"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Lock, CheckCircle2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const MoscoLiveDemo = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [demoState, setDemoState] = useState<"idle" | "counting" | "revealed">("idle");
    const [countdown, setCountdown] = useState(5);

    const startDemo = () => {
        if (!phoneNumber) return;
        setDemoState("counting");
        setCountdown(5);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (demoState === "counting" && countdown > 0) {
            timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
        } else if (demoState === "counting" && countdown === 0) {
            setDemoState("revealed");
        }
        return () => clearTimeout(timer);
    }, [demoState, countdown]);

    return (
        <div className="h-full bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 flex flex-col relative overflow-hidden">
            {/* Header / Status Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Simulator Interface</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${demoState === 'idle' ? 'bg-amber-500' : 'bg-green-500 animate-pulse'}`} />
                    <span className="text-[10px] font-mono text-gray-500 uppercase">{demoState === 'idle' ? 'STANDBY' : 'ACTIVE'}</span>
                </div>
            </div>

            {/* Main Interactive Area */}
            <div className="flex-1 flex flex-col justify-center relative">
                <AnimatePresence mode="wait">
                    {/* STATE: IDLE */}
                    {demoState === "idle" && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Live Latency Test</h3>
                                <p className="text-sm text-gray-400">Enter your number. Experience the 30ms connection speed.</p>
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    type="tel"
                                    placeholder="(555) 000-0000"
                                    className="bg-black/40 border-white/10 text-white h-12 font-mono"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <Button
                                    onClick={startDemo}
                                    disabled={!phoneNumber}
                                    className="h-12 px-6 bg-white text-black hover:bg-gray-200 font-bold whitespace-nowrap"
                                >
                                    TRIGGER
                                </Button>
                            </div>
                            <p className="text-[10px] text-gray-600 text-center max-w-xs mx-auto">
                                By clicking trigger, you agree to receive one automated demo call.
                            </p>
                        </motion.div>
                    )}

                    {/* STATE: COUNTING */}
                    {demoState === "counting" && (
                        <motion.div
                            key="counting"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            <div className="relative w-40 h-40 flex items-center justify-center">
                                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping" />
                                <div className="text-6xl font-mono font-bold text-blue-400 tabular-nums">
                                    0:0{countdown}
                                </div>
                            </div>
                            <p className="text-blue-200 mt-8 text-sm font-mono uppercase tracking-widest animate-pulse">Initializing Voice Bridge...</p>
                        </motion.div>
                    )}

                    {/* STATE: REVEALED */}
                    {demoState === "revealed" && (
                        <motion.div
                            key="revealed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#0B1221] border border-blue-500/30 rounded-xl overflow-hidden shadow-2xl"
                        >
                            <div className="bg-blue-900/20 px-4 py-3 border-b border-blue-500/20 flex justify-between items-center">
                                <span className="text-blue-400 font-mono text-[10px] tracking-widest flex items-center gap-2">
                                    <Zap size={12} /> INCOMING LEAD DATA
                                </span>
                                <span className="text-blue-400 font-mono text-[10px]">98% MATCH</span>
                            </div>

                            <div className="p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400">Carrier Status</span>
                                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold rounded border border-green-500/30">VERIFIED</span>
                                </div>
                                <div className="h-px bg-white/5" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase">Location</p>
                                        <p className="text-sm text-white font-medium">Roseville, CA</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase">Provider</p>
                                        <p className="text-sm text-white font-medium">AT&T</p>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    {[
                                        { label: "Property Value", icon: Lock },
                                        { label: "Credit Tier", icon: Lock },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between py-1.5 opacity-60">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <item.icon size={12} />
                                                <span>{item.label}</span>
                                            </div>
                                            <span className="text-[10px] text-red-400 bg-red-900/10 px-1.5 rounded border border-red-900/20">LOCKED</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
