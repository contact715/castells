"use client";

import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
 id: string;
 type: ToastType;
 message: string;
 description?: string;
 onClose: () => void;
 duration?: number;
}

const icons: Record<ToastType, ReactNode> = {
 success: <CheckCircle className="w-5 h-5" />,
 error: <AlertCircle className="w-5 h-5" />,
 warning: <AlertTriangle className="w-5 h-5" />,
 info: <Info className="w-5 h-5" />,
};

const styles: Record<ToastType, string> = {
 success: "bg-green-500/10 text-green-600 dark:text-green-400 ",
 error: "bg-red-500/10 text-red-600 dark:text-red-400 ed-500/20",
 warning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 ",
 info: "bg-coral/10 text-coral /20",
};

export function Toast({
 id,
 type,
 message,
 description,
 onClose,
 duration = 5000,
}: ToastProps) {
 useEffect(() => {
  if (duration > 0) {
   const timer = setTimeout(() => {
    onClose();
   }, duration);
   return () => clearTimeout(timer);
  }
 }, [duration, onClose]);

 return (
  <motion.div
   initial={{ opacity: 0, y: -20, scale: 0.95 }}
   animate={{ opacity: 1, y: 0, scale: 1 }}
   exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
   className={cn(
    "flex items-start gap-3 p-4 rounded-[2rem] backdrop-blur-sm shadow-lg min-w-[300px] max-w-[500px]",
    styles[type]
   )}
  >
   <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
   <div className="flex-1 min-w-0">
    <p className="text-sm font-sans font-medium text-text-primary dark:text-white">
     {message}
    </p>
    {description && (
     <p className="text-xs font-sans text-text-secondary dark:text-white/70 mt-1">
      {description}
     </p>
    )}
   </div>
   <Button
    variant="ghost"
    size="sm"
    onClick={onClose}
    className="flex-shrink-0 -mr-2 -mt-2"
   >
    <X className="w-4 h-4" />
   </Button>
  </motion.div>
 );
}

interface ToastContainerProps {
 toasts: Array<{
  id: string;
  type: ToastType;
  message: string;
  description?: string;
 }>;
 onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
 return (
  <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
   <AnimatePresence>
    {toasts.map((toast) => (
     <div key={toast.id} className="pointer-events-auto">
      <Toast
       {...toast}
       onClose={() => onClose(toast.id)}
      />
     </div>
    ))}
   </AnimatePresence>
  </div>
 );
}
