import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant?: "default" | "success" | "warning" | "danger" | "info";
    className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
    const variantClasses = {
        default: "bg-gray-100 text-gray-700",
        success: "bg-emerald-100 text-emerald-600",
        warning: "bg-amber-100 text-amber-600",
        danger: "bg-red-100 text-red-600",
        info: "bg-blue-100 text-blue-600",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
                variantClasses[variant],
                className
            )}
        >
            {children}
        </span>
    );
}



