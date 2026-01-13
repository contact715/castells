"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface EmptyStateProps {
 icon?: ReactNode;
 title: string;
 description?: string;
 action?: {
  label: string;
  onClick: () => void;
 };
 className?: string;
}

export function EmptyState({
 icon,
 title,
 description,
 action,
 className,
}: EmptyStateProps) {
 return (
  <div
   className={cn(
    "flex flex-col items-center justify-center py-12 px-6 text-center",
    className
   )}
  >
   {icon && (
    <div className="mb-4 text-text-secondary dark:text-white/50">
     {icon}
    </div>
   )}
   <h3 className="text-xl font-display font-semibold text-text-primary dark:text-white mb-2">
    {title}
   </h3>
   {description && (
    <p className="text-sm text-text-secondary dark:text-white/70 font-sans max-w-md mb-6">
     {description}
    </p>
   )}
   {action && (
    <Button variant="primary" onClick={action.onClick}>
     {action.label}
    </Button>
   )}
  </div>
 );
}
