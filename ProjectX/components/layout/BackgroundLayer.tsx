"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { memo } from "react";

// Lazy load heavy background components for performance
const LiquidBackground = dynamic(() => import("@/components/ui/backgrounds/LiquidBackground").then(mod => mod.LiquidBackground), { ssr: false });
const InteractiveGradient = dynamic(() => import("@/components/ui/backgrounds/InteractiveGradient").then(mod => mod.InteractiveGradient), { ssr: false });
const MeshGradient = dynamic(() => import("@/components/ui/backgrounds/MeshGradient").then(mod => mod.MeshGradient), { ssr: false });
const FloatingSky = dynamic(() => import("@/components/layout/FloatingSky"), { ssr: false });

export const BackgroundLayer = memo(function BackgroundLayer() {
    const { backgroundMode, liquidVariant } = useTheme();

    return (
        <div className="fixed inset-0 z-[-1] bg-black pointer-events-none overflow-hidden" style={{ contain: "strict" }}>
            <AnimatePresence mode="wait">
                {backgroundMode === 'static' && (
                    <motion.div
                        key="static"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="fixed inset-0"
                    >
                        <FloatingSky />
                    </motion.div>
                )}

                {backgroundMode === 'liquid' && (
                    <motion.div
                        key={`liquid-${liquidVariant}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="fixed inset-0"
                    >
                        <LiquidBackground variant={liquidVariant} />
                    </motion.div>
                )}

                {backgroundMode === 'gradient' && (
                    <motion.div
                        key="gradient"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="fixed inset-0"
                    >
                        <InteractiveGradient />
                    </motion.div>
                )}

                {backgroundMode === 'mesh' && (
                    <motion.div
                        key="mesh"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="fixed inset-0"
                    >
                        <MeshGradient />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});
