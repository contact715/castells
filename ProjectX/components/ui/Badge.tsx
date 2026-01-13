import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
 children: ReactNode;
 variant?: "default" | "success" | "warning" | "danger" | "info";
 className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
 const variantClasses = {
  default: "bg-black/5 dark:bg-dark-surface/50 text-text-primary dark:text-white",
  success: "bg-green-500/10 text-green-600 dark:text-green-400",
  warning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  danger: "bg-red-500/10 text-red-600 dark:text-red-400",
  info: "bg-coral/10 text-coral",
 };

 return (
  <span
   className={cn(
    "inline-flex items-center px-3 py-1 rounded-[2rem] text-xs font-bold uppercase tracking-widest font-sans",
    variantClasses[variant],
    className
   )}
  >
   {children}
  </span>
 );
}



