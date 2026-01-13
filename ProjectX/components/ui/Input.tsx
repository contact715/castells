
import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={twMerge(
                "flex w-full rounded-[2rem] bg-black/10 dark:bg-black/30 px-4 py-3 text-base text-text-primary dark:text-white placeholder:text-black/30 dark:placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-coral/20 transition-all duration-300 font-sans",
                className
            )}
            {...props}
        />
    );
}
