import { create } from "zustand";
import { ToastType } from "@/components/ui/Toast";

interface Toast {
 id: string;
 type: ToastType;
 message: string;
 description?: string;
}

interface ToastStore {
 toasts: Toast[];
 addToast: (toast: Omit<Toast, "id">) => void;
 removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
 toasts: [],
 addToast: (toast) => {
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
  set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
 },
 removeToast: (id) => {
  set((state) => ({
   toasts: state.toasts.filter((toast) => toast.id !== id),
  }));
 },
}));
