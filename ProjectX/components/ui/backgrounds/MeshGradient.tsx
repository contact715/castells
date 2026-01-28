"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { memo } from "react";

export const MeshGradient = memo(function MeshGradient() {
    const { theme } = useTheme();

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-black/5 dark:bg-[#020617] transition-colors duration-500 pointer-events-none" style={{ contain: "strict" }}>
            <div className="absolute inset-0 opacity-40 dark:opacity-30 mix-blend-screen filter blur-[80px]">
                <motion.div
                    className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(255,50,150,0.8)_0%,rgba(0,0,0,0)_70%)]"
                    animate={{
                        x: ["0%", "20%", "-10%", "0%"],
                        y: ["0%", "15%", "5%", "0%"],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-[10%] right-[-10%] w-[50%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(100,50,255,0.8)_0%,rgba(0,0,0,0)_70%)]"
                    animate={{
                        x: ["0%", "-15%", "10%", "0%"],
                        y: ["0%", "-10%", "20%", "0%"],
                        scale: [1, 1.2, 0.95, 1],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(50,200,255,0.8)_0%,rgba(0,0,0,0)_70%)]"
                    animate={{
                        x: ["0%", "10%", "-20%", "0%"],
                        y: ["0%", "-15%", "10%", "0%"],
                        scale: [1, 0.9, 1.1, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[0%] right-[0%] w-[40%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(250,200,50,0.6)_0%,rgba(0,0,0,0)_70%)]"
                    animate={{
                        x: ["0%", "-20%", "15%", "0%"],
                        y: ["0%", "10%", "-5%", "0%"],
                        scale: [1, 1.15, 0.85, 1],
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
            <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        </div>
    );
});
