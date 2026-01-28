import { Card } from "@/components/ui/Card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ReactNode, memo } from "react";
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

export const KPICard = memo(function KPICard({
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
    <Card variant="default" className="p-8 h-full border border-white/5 future-glass rounded-[2rem]">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-3">{title}</p>
          <p className={cn("text-3xl lg:text-4xl font-bold tracking-tight text-white", variantClasses[variant])}>
            {value}
          </p>
          {trend && (
            <div
              className={`flex items-center gap-1 mt-2 text-sm ${trend.isPositive ? "text-neon-lime" : "text-red-500"}`}
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
        {icon && <div className="text-primary bg-primary/10 p-3 rounded-[2rem]">{icon}</div>}
      </div>
    </Card>
  );
});
