"use client";

import { motion } from "framer-motion";
import { User, Server, Phone, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function RoutingVisualizer({ active = false, onComplete }: { active: boolean; onComplete?: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (active) {
      setStep(1);
      const timer1 = setTimeout(() => setStep(2), 1500); // Lead -> AI
      const timer2 = setTimeout(() => setStep(3), 3000); // AI -> Manager
      const timer3 = setTimeout(() => {
        setStep(4); // Connected
        if (onComplete) onComplete();
      }, 4500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        setStep(0);
      };
    } else {
      setStep(0);
    }
  }, [active, onComplete]);

  return (
    <div className="relative w-full h-48 bg-black/5 dark:bg-dark-surface/50 rounded-[2rem] overflow-hidden flex items-center justify-center p-8">
      {/* Connecting Lines */}
      <div className="absolute inset-0 flex items-center justify-center px-20">
        <div className="w-full h-1 bg-black/5 dark:bg-white/10 relative">
          {/* Path 1: Lead -> AI */}
          <motion.div
            className="absolute left-0 top-0 h-full bg-coral origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: step >= 2 ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "linear" }}
            style={{ width: "50%" }}
          />
          {/* Path 2: AI -> Manager */}
          <motion.div
            className="absolute left-1/2 top-0 h-full bg-green-500 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: step >= 3 ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "linear" }}
            style={{ width: "50%" }}
          />
        </div>
      </div>

      <div className="relative w-full flex justify-between items-center z-10">
        {/* Node 1: Lead */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${step >= 1 ? "bg-coral text-white" : "bg-black/5 dark:bg-dark-surface/50 text-white/40"
              }`}
            animate={step === 1 ? { scale: [1, 1.1, 1] } : {}}
          >
            <User className="w-6 h-6" />
          </motion.div>
          <span className={`text-xs font-bold uppercase tracking-wider ${step >= 1 ? "text-coral" : "text-white/40"}`}>Lead</span>
        </div>

        {/* Node 2: AI Engine */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className={`w-16 h-16 rounded-[2rem] flex items-center justify-center transition-colors duration-300 ${step >= 2 ? "bg-bblue-600 blue-500 text-white" : "bg-black/5 dark:bg-dark-surface/50 text-white/40"
              }`}
            animate={step === 2 ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
          >
            <Server className="w-8 h-8" />
          </motion.div>
          <span className={`text-xs font-bold uppercase tracking-wider ${step >= 2 ? "text-bblue-500" : "text-white/40"}`}>AI Filter</span>
        </div>

        {/* Node 3: Manager */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${step >= 3 ? "bg-green-600  text-white" : "bg-black/5 dark:bg-dark-surface/50 text-white/40"
              }`}
            animate={step >= 3 ? { scale: [1, 1.2, 1], boxShadow: "0 0 20px rgba(74, 222, 128, 0.5)" } : {}}
          >
            {step >= 4 ? <CheckCircle className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
          </motion.div>
          <span className={`text-xs font-bold uppercase tracking-wider ${step >= 3 ? "text-green-500" : "text-white/40"}`}>
            {step >= 4 ? "Connected" : "Calling..."}
          </span>
        </div>
      </div>
    </div>
  );
}
