import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";

interface FunnelStage {
  label: string;
  value: number;
  color: string;
}

const funnelStages: FunnelStage[] = [
  { label: "Leads In", value: 1200, color: "from-coral to-coral-dark" },
  { label: "Validated no ZIP/SMS", value: 850, color: "from-coral/80 to-coral-dark/80" },
  { label: "Scored 90+", value: 310, color: "from-coral/60 to-coral-dark/60" },
  { label: "Connected by AI Dialer", value: 280, color: "from-coral/40 to-coral-dark/40" },
  { label: "Deals Won", value: 110, color: "from-coral-dark to-coral" },
];

export function LeadFunnel() {
  const maxValue = Math.max(...funnelStages.map((s) => s.value));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card variant="default" className="p-6">
        <h3 className="text-2xl font-display font-semibold mb-6 text-text-primary dark:text-white">Lead Funnel</h3>
        <div className="space-y-4">
          {funnelStages.map((stage, index) => {
            const width = (stage.value / maxValue) * 100;
            const isLast = index === funnelStages.length - 1;

            return (
              <div key={stage.label} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-sans font-medium text-text-secondary dark:text-white/80">
                    {stage.label}
                  </span>
                  <span className="text-sm font-bold text-coral">
                    {stage.value}
                  </span>
                </div>
                <div className="relative h-10 rounded-full overflow-hidden bg-black/5 dark:bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${stage.color} rounded-full flex items-center justify-end pr-4 shadow-[0_0_15px_rgba(224,133,118,0.3)]`}
                  >
                    <span className="text-xs font-bold text-white drop-shadow-md">
                      {Math.round(width)}%
                    </span>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}



