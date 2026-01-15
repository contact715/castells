"use client";

import { SmartLeadForm } from "@/components/dashboard/SmartLeadForm";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

export default function LeadIngestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden">

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left space-y-6"
        >

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-black/5 dark:bg-dark-surface/50 p-4 rounded-[2rem] ">
              <div className="text-2xl font-bold text-white mb-1">400ms</div>
              <div className="text-xs text-white/40">Response Latency</div>
            </div>
            <div className="bg-black/5 dark:bg-dark-surface/50 p-4 rounded-[2rem] ">
              <div className="text-2xl font-bold text-green-400 mb-1">100%</div>
              <div className="text-xs text-white/40">Spam Filtered</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SmartLeadForm />
        </motion.div>
      </div>
    </div>
  );
}
