import React from "react";
import { motion } from "framer-motion";
import { Gift, Zap } from "lucide-react";

export function IncentiveBanner({ text }: { text: string }) {
    if (!text) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-coral/10 py-3 px-6 rounded-[2rem] flex items-center justify-center gap-3 mb-6 group cursor-default"
        >
            <div className="w-8 h-8 rounded-full bg-coral flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform">
                <Gift className="w-4 h-4" />
            </div>
            <p className="text-sm font-bold text-coral flex items-center gap-2">
                <Zap className="w-3 h-3 animate-pulse" />
                {text}
            </p>
        </motion.div>
    );
}
