"use client";

import { Modal } from "@/components/ui/Modal";
import { useUIStore } from "@/lib/store/uiStore";
import { Zap, Activity, Shield, Cpu } from "lucide-react";

export function AboutModal() {
    const { openModals, closeModal } = useUIStore();
    const isOpen = openModals["about"] || false;

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => closeModal("about")}
            title="Mosco.ai Identity"
            size="lg"
            className="border border-primary/20 shadow-[0_0_50px_rgba(var(--accent),0.08)]"
        >
            <div className="space-y-8 font-sans">
                {/* Hero / Mission */}
                <div className="relative overflow-hidden rounded-2xl bg-black border border-white/5 p-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                        The Pulse of Your Business.
                    </h2>
                    <p className="text-lg text-white/80 leading-relaxed font-light">
                        Mosco.ai is the world&apos;s first <span className="text-primary font-medium">Autonomous Operating System</span> for contractors.
                        We don&apos;t just generate leads — we command them. From the first click to the final 5-star review.
                    </p>
                </div>

                {/* Core DNA Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-dark-surface border border-white/5 hover:border-primary/30 transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Cpu className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-white font-bold mb-1">Absolute Autonomy</h3>
                        <p className="text-sm text-white/60">
                            Liberating business owners from marketing routine. The system thinks, speaks, and sells better than a human.
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-dark-surface border border-white/5 hover:border-primary/30 transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Activity className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h3 className="text-white font-bold mb-1">Superhuman Speed</h3>
                        <p className="text-sm text-white/60">
                            Instant lead verification, profiling, and booking. Zero latency between intent and action.
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-dark-surface border border-white/5 hover:border-primary/30 transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Shield className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h3 className="text-white font-bold mb-1">Premium Reliability</h3>
                        <p className="text-sm text-white/60">
                            &quot;My business runs on Mosco.&quot; A status symbol of discipline, logic, and guaranteed results.
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-dark-surface border border-white/5 hover:border-primary/30 transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="text-white font-bold mb-1">Live Intelligence</h3>
                        <p className="text-sm text-white/60">
                            A War Room, not a spreadsheet. Real-time data visualization and active neural decision making.
                        </p>
                    </div>
                </div>

                {/* Footer Quote */}
                <div className="border-t border-white/10 pt-6 text-center">
                    <p className="text-sm text-white/40 uppercase tracking-widest font-bold">
                        Mosco.ai: Your Business on Autopilot.
                    </p>
                </div>
            </div>
        </Modal>
    );
}
