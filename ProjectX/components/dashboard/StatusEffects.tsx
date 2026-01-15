"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// 1. Golden Sparkle (>= 100% Plan)
// ------------------------------------------------------------------
export const GoldenSparkleEffect = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-card">
        {/* Shimmer Overlay */}
        <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "200%", opacity: [0, 0.4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent skew-x-12"
        />
        {/* Border Pulse */}
        <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-card border-2 border-amber-400/50 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
        />
        {/* Floating Particles/Sparkles */}
        {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                initial={{ y: "100%", x: Math.random() * 100 + "%", opacity: 0, scale: 0 }}
                animate={{
                    y: "-10%",
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                }}
                transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeOut"
                }}
                className="absolute w-1 h-1 bg-amber-200 rounded-full shadow-[0_0_4px_#fff]"
                style={{ left: `${Math.random() * 100}%` }}
            />
        ))}
    </div>
);

// ------------------------------------------------------------------
// 2. Golden Glow (>= 80% Plan)
// ------------------------------------------------------------------
export const GoldenGlowEffect = () => (
    <div className="absolute inset-0 z-0 pointer-events-none rounded-card">
        <div className="absolute inset-0 bg-amber-500/5 rounded-card" />
        <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-card border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
        />
    </div>
);

// ------------------------------------------------------------------
// 3. Red Glow (< 80% Plan) - Underperformance
// ------------------------------------------------------------------
export const RedGlowEffect = () => (
    <div className="absolute inset-0 z-0 pointer-events-none rounded-card">
        <div className="absolute inset-0 bg-red-500/5 rounded-card" />
        <div className="absolute inset-0 rounded-card border border-red-500/20" />
    </div>
);

// ------------------------------------------------------------------
// 4. Red Burn (< 50% Plan) - Critical
// ------------------------------------------------------------------
export const RedBurnEffect = () => (
    <div className="absolute inset-0 z-0 pointer-events-none rounded-card overflow-hidden">
        <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-red-900/10 rounded-card"
        />
        <motion.div
            animate={{ boxShadow: ["inset 0 0 10px rgba(220,38,38,0.2)", "inset 0 0 30px rgba(220,38,38,0.5)", "inset 0 0 10px rgba(220,38,38,0.2)"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-card border border-red-500/50"
        />
    </div>
);

// ------------------------------------------------------------------
// 5. Fire Effect (Daily Plan Met)
// ------------------------------------------------------------------
export const FireEffect = () => (
    <div className="absolute bottom-0 left-0 right-0 h-32 z-0 pointer-events-none overflow-hidden rounded-b-card opacity-60 mix-blend-screen">
        {[...Array(12)].map((_, i) => (
            <motion.div
                key={i}
                initial={{
                    y: "100%",
                    x: Math.random() * 100 + "%",
                    opacity: 0,
                    scale: 0.5,
                    height: 10 + Math.random() * 20
                }}
                animate={{
                    y: "-20%",
                    x: [null, (Math.random() - 0.5) * 20 + "%"],
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.5, 0.5],
                    height: [20, 60, 20]
                }}
                transition={{
                    duration: 0.8 + Math.random() * 0.8,
                    repeat: Infinity,
                    delay: Math.random() * 1,
                    ease: "easeOut"
                }}
                className="absolute w-6 bg-gradient-to-t from-orange-600 via-red-500 to-amber-300 rounded-t-full filter blur-[4px]"
                style={{
                    left: `${(i / 12) * 100}%`,
                    width: `${Math.random() * 10 + 10}%`
                }}
            />
        ))}
        {/* Base Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-orange-600/30 blur-xl" />
    </div>
);
