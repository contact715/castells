import { Card } from "@/components/ui/Card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface KPICardProps {
  title: string;
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: ReactNode;
  variant?: "default" | "success" | "danger";
}

export function KPICard({
  title,
  value,
  trend,
  icon,
  variant = "default",
}: KPICardProps) {
  const variantClasses = {
    default: "text-coral",
    success: "text-green-600 dark:text-green-400",
    danger: "text-red-600 dark:text-red-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <Card variant="glass" className="h-full">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2">{title}</p>
            <p className={`text-3xl font-display font-semibold ${variantClasses[variant]}`}>
              {value}
            </p>
            {trend && (
              <div
                className={`flex items-center gap-1 mt-2 text-sm font-sans ${trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
              >
                {trend.isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          {icon && <div className="text-coral">{icon}</div>}
        </div>
      </Card>
    </motion.div>
  );
}



