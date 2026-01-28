"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { PREMIUM_AGENT_SCRIPTS, INITIAL_BOOT_SEQUENCE } from "./AgentScripts";

const INITIAL_LOGS = INITIAL_BOOT_SEQUENCE;
const NEW_ACTIONS = PREMIUM_AGENT_SCRIPTS;

export function LiveLogScroller() {
    const [logs, setLogs] = useState(INITIAL_LOGS);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomAction = NEW_ACTIONS[Math.floor(Math.random() * NEW_ACTIONS.length)];
            setLogs(prev => [
                { ...randomAction, time: "NOW" },
                ...prev.slice(0, 5) // Keep last 6
            ]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-4 overflow-hidden h-[180px] relative font-mono">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">System Stream</span>
            </div>

            <div className="flex flex-col gap-2 transition-all duration-500 ease-in-out">
                {logs.map((log, i) => (
                    <div
                        key={`${log.agent}-${log.time}-${i}`}
                        className="flex items-center justify-between p-2 bg-black/40 border-l-2 border-l-primary/50 border-y border-r border-white/5 rounded-r-md animate-in fade-in slide-in-from-top-4 duration-500 hover:bg-white/5 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className={cn("text-[9px] font-bold uppercase w-8 shrink-0",
                                log.time === "NOW" ? "text-primary animate-pulse" : "text-white/30"
                            )}>
                                {log.time}
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white uppercase tracking-tight flex items-center gap-2">
                                    <span className="text-secondary">{">"}</span> {log.agent}
                                </p>
                                <p className="text-[9px] text-white/50 font-medium uppercase mt-0.5 pl-3">{log.action}</p>
                            </div>
                        </div>
                        <div className={cn("w-1.5 h-1.5 rounded-full shadow-[0_0_5px_currentColor]",
                            log.status === 'sync' ? 'text-primary' :
                                log.status === 'success' ? 'text-success' : 'text-blue-500'
                        )} style={{ backgroundColor: 'currentColor' }} />
                    </div>
                ))}
            </div>

            {/* Fade out bottom - Darker for contrast */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
        </div>
    );
}
