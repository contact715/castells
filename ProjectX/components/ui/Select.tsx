import { cn } from "@/lib/utils";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 px-4 py-3 text-base text-text-primary dark:text-white focus:outline-none focus:border-coral dark:focus:border-coral focus:bg-white dark:focus:bg-white/10 transition-all duration-300 font-sans",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}



