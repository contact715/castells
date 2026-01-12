"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, DollarSign } from "lucide-react";

const notifications = [
    { name: "John D.", action: "saved", amount: "$1,200", time: "2 minutes ago" },
    { name: "Sarah M.", action: "closed a deal", amount: "$3,500", time: "5 minutes ago" },
    { name: "Mike R.", action: "saved", amount: "$850", time: "12 minutes ago" },
    { name: "Elite HVAC", action: "increased conversion", amount: "25%", time: "Just now" },
];

export function SocialProofPopup() {
    const [current, setCurrent] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Initial delay
        const initialTimer = setTimeout(() => setIsVisible(true), 5000);

        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % notifications.length);
                setIsVisible(true);
            }, 500); // Wait for exit animation
        }, 15000); // Show every 15 seconds

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 50, x: -20 }}
                    className="fixed bottom-6 left-6 z-50 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl max-w-xs cursor-pointer hover:bg-white/15 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">
                                <span className="font-bold">{notifications[current].name}</span> {notifications[current].action}
                            </p>
                            <p className="text-xs text-white/60">
                                <span className="text-green-400 font-bold">{notifications[current].amount}</span> • {notifications[current].time}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
