import { create } from "zustand";

interface UIStore {
 sidebarOpen: boolean;
 sidebarCollapsed: boolean;
 expandedGroups: string[];
 activePage: string;
 openModals: Record<string, boolean>;
 toggleSidebar: () => void;
 setSidebarOpen: (open: boolean) => void;
 toggleSidebarCollapse: () => void;
 toggleGroup: (groupId: string) => void;
 setActivePage: (page: string) => void;
 openModal: (modalId: string) => void;
 closeModal: (modalId: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
 sidebarOpen: true,
 sidebarCollapsed: false,
 expandedGroups: [],
 activePage: "/",
 openModals: {},
 toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
 setSidebarOpen: (open) => set({ sidebarOpen: open }),
 toggleSidebarCollapse: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
 toggleGroup: (groupId) =>
  set((state) => ({
   expandedGroups: state.expandedGroups.includes(groupId)
    ? state.expandedGroups.filter((id) => id !== groupId)
    : [...state.expandedGroups, groupId],
  })),
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



