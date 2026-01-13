import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TableProps {
 children: ReactNode;
 className?: string;
}

export function Table({ children, className }: TableProps) {
 return (
  <div className="overflow-x-auto -mx-2 px-2">
   <table className={cn("w-full min-w-[600px]", className)}>{children}</table>
  </div>
 );
}

export function TableHeader({ children, className }: TableProps) {
 return (
  <thead className={cn("bg-black/5 dark:bg-dark-surface/50", className)}>{children}</thead>
 );
}

export function TableRow({ children, className }: TableProps) {
 return (
  <tr className={cn(" hover:bg-bhover:bg-black/5 dark:bg-dark-surface/50 transition-colors duration-300", className)}>
   {children}
  </tr>
 );
}

export function TableHead({ children, className }: TableProps) {
 return (
  <th className={cn("px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans", className)}>
   {children}
  </th>
 );
}

export function TableCell({ children, className }: TableProps) {
 return (
  <td className={cn("px-4 py-3 text-sm text-text-primary dark:text-white font-sans", className)}>
   {children}
  </td>
 );
}

export function TableBody({ children, className }: TableProps) {
 return <tbody className={className}>{children}</tbody>;
}



