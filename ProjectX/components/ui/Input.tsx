import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 px-4 py-3 text-base text-text-primary dark:text-white placeholder:text-black/20 dark:placeholder:text-white/20 focus:outline-none focus:border-coral dark:focus:border-coral focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-coral/20 transition-all duration-300 font-sans shadow-inner",
        className
      )}
      {...props}
    />
  );
}



