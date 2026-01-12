"use client";

import { ReactNode } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import {
  AlertCircle,
  TrendingUp,
  DollarSign,
  Calculator,
  Lightbulb,
} from "lucide-react";

interface ModuleDescriptionProps {
  moduleName: string;
  shortDescription: string;
  problem: string;
  businessValue: string;
  monetization: string;
  roi: string;
  example: string;
  icon?: ReactNode;
}

export function ModuleDescription({
  moduleName,
  shortDescription,
  problem,
  businessValue,
  monetization,
  roi,
  example,
  icon,
}: ModuleDescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-6"
    >
      <Card variant="glass" className="p-6">
        <div className="space-y-4">
          {/* Short Description - Always Visible */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {icon && <div className="text-coral">{icon}</div>}
              <h2 className="text-2xl font-display font-semibold text-text-primary dark:text-white">
                {moduleName}
              </h2>
            </div>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p className="text-base text-text-secondary dark:text-white/80 font-sans leading-relaxed">
                {shortDescription}
              </p>
            </div>
          </div>

          {/* Expandable Details */}
          <Accordion
            title="Бизнес-ценность и ROI"
            defaultOpen={false}
            variant="compact"
            icon={<TrendingUp className="w-5 h-5" />}
          >
            <div className="space-y-6 pt-4">
              {/* Problem Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-coral" />
                  <h4 className="text-lg font-display font-semibold text-text-primary dark:text-white">
                    Проблема, которую мы решаем
                  </h4>
                </div>
                <p className="text-sm text-text-secondary dark:text-white/70 font-sans leading-relaxed">
                  {problem}
                </p>
              </div>

              {/* Business Value Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h4 className="text-lg font-display font-semibold text-text-primary dark:text-white">
                    Ценность для бизнеса
                  </h4>
                </div>
                <p className="text-sm text-text-secondary dark:text-white/70 font-sans leading-relaxed">
                  {businessValue}
                </p>
              </div>

              {/* Monetization Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-coral" />
                  <h4 className="text-lg font-display font-semibold text-text-primary dark:text-white">
                    Модель монетизации
                  </h4>
                </div>
                <p className="text-sm text-text-secondary dark:text-white/70 font-sans leading-relaxed">
                  {monetization}
                </p>
              </div>

              {/* ROI Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h4 className="text-lg font-display font-semibold text-text-primary dark:text-white">
                    ROI для клиента
                  </h4>
                </div>
                <p className="text-sm text-text-secondary dark:text-white/70 font-sans leading-relaxed">
                  {roi}
                </p>
              </div>

              {/* Example Calculation */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="w-5 h-5 text-coral" />
                  <h4 className="text-lg font-display font-semibold text-text-primary dark:text-white">
                    Пример расчета
                  </h4>
                </div>
                <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 border border-black/5 dark:border-white/5">
                  <p className="text-sm text-text-secondary dark:text-white/70 font-sans leading-relaxed whitespace-pre-line">
                    {example}
                  </p>
                </div>
              </div>
            </div>
          </Accordion>
        </div>
      </Card>
    </motion.div>
  );
}
