import { Card } from "@/components/ui/Card";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const insights = [
    "ZIP 10005 показал +30% конверсии на этой неделе. Рекомендуем увеличить бюджет.",
    "Пиковое время звонков: 14:00-16:00. Увеличьте количество менеджеров в это время.",
    "Клиенты с оценкой 90+ имеют в 3 раза выше конверсию. Фокус на качественных лидах.",
];

export function AIInsights() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <Card variant="default" className="p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-5 h-5 text-coral" />
                    <h3 className="text-2xl font-display font-semibold text-text-primary dark:text-white">AI Insights</h3>
                </div>
                <div className="space-y-4">
                    {insights.map((insight, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-card bg-white/5 border border-white/10 hover:bg-coral/10 transition-colors"
                        >
                            <p className="text-sm font-sans text-white leading-relaxed font-medium">{insight}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </motion.div>
    );
}



