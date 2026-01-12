import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "strong";
}

export function Card({ children, className, variant = "default" }: CardProps) {
  const variantClasses = {
    default: "glass-panel",
    glass: "glass-panel",
    strong: "bg-surface dark:bg-dark-surface border border-black/10 dark:border-white/10 shadow-md",
  };

  return (
    <div
      className={cn(
        "rounded-[2rem] p-8 transition-all duration-300",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}



