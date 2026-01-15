"use client";

import { motion } from "framer-motion";

interface FormProgressProps {
    totalSteps: number;
    currentStep: number;
    color?: string;
}

export function FormProgress({ totalSteps, currentStep, color = "#2563eb" }: FormProgressProps) {
    return (
        <div className="flex gap-2 w-full px-6 py-6 h-[18px] items-center">
            {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                    key={i}
                    className="h-1.5 flex-1 bg-white/[0.12] rounded-full overflow-hidden"
                >
                    <motion.div
                        className="h-full"
                        style={{ backgroundColor: color || "#3578E5" }}
                        initial={{ width: 0 }}
                        animate={{
                            width: i <= currentStep ? "100%" : "0%"
                        }}
                        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    />
                </div>
            ))}
        </div>
    );
}
