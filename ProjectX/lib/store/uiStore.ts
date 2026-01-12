import { create } from "zustand";

interface UIStore {
  sidebarOpen: boolean;
  activePage: string;
  openModals: Record<string, boolean>;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActivePage: (page: string) => void;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  activePage: "/",
  openModals: {},
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActivePage: (page) => set({ activePage: page }),
  openModal: (modalId) =>
    set((state) => ({
      openModals: { ...state.openModals, [modalId]: true },
    })),
  closeModal: (modalId) =>
    set((state) => ({
      openModals: { ...state.openModals, [modalId]: false },
    })),
}));



