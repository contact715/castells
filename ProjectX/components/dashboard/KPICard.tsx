import { Card } from "@/components/ui/Card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
      className="h-full"
    >
      <Card variant="default" className="p-8 hover:shadow-2xl transition-all duration-500 group h-full border border-black/5 dark:border-white/5 bg-surface dark:bg-dark-surface rounded-[2rem]">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[10px] font-satoshi font-bold uppercase tracking-widest text-text-secondary dark:text-white/40 mb-3">{title}</p>
            <p className={cn("text-3xl lg:text-4xl font-newsreader font-bold tracking-tight", variantClasses[variant])}>
              {value}
            </p>
            {trend && (
              <div
                className={`flex items-center gap-1 mt-2 text-sm font-satoshi ${trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
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
          {icon && <div className="text-coral bg-coral/5 p-3 rounded-[2rem] group-hover:bg-coral group-hover:text-white transition-all duration-500">{icon}</div>}
        </div>
      </Card>
    </motion.div>
  );
}


