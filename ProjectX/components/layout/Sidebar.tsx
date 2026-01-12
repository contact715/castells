"use client";

import {
  LayoutDashboard,
  FileText,
  UserSearch,
  Phone,
  MessageSquare,
  Star,
  FileImage,
  Database,
  TrendingUp,
  Menu,
  Settings,
  Shield,
  Workflow,
  MapPin,
  Calendar as CalendarIcon,
  Kanban,
  Wrench,
  CreditCard,
  ScanEye,
  Radar,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/lib/store/uiStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/smart-forms", label: "Smart Forms", icon: FileText },
  { path: "/ai-lead-profiler", label: "AI Lead Profiler", icon: UserSearch },
  { path: "/speed-dialer", label: "Speed-Dialer", icon: Phone },
  { path: "/ai-chat", label: "AI Chat", icon: MessageSquare },

  // Ultimate Features
  { path: "/vision", label: "Vision Estimator", icon: ScanEye },
  { path: "/neighborhood-watch", label: "Spy Dashboard", icon: Radar },
  { path: "/local-seo", label: "Local SEO Engine", icon: MapPin },
  { path: "/agentic-flow", label: "Agentic Workflows", icon: Workflow },

  // Tools
  { path: "/calendar", label: "Smart Schedule", icon: CalendarIcon },
  { path: "/pipeline", label: "Deals Pipeline", icon: Kanban },
  { path: "/tech-portal", label: "Tech Portal (PWA)", icon: Wrench },
  { path: "/knowledge-base", label: "Knowledge Base", icon: Database },
  { path: "/billing", label: "Billing & Usage", icon: CreditCard },
  { path: "/compliance", label: "Compliance Guardian", icon: Shield },
  { path: "/review-guardian", label: "Review Guardian", icon: Star },
  { path: "/content-engine", label: "Content Engine", icon: FileImage },
  { path: "/database-reactivation", label: "Database Reactivation", icon: Database },
  { path: "/roi-analytics", label: "ROI Analytics", icon: TrendingUp },

  // Admin
  { path: "/team", label: "Team & Users", icon: Users },
  { path: "/settings", label: "Configuration", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-surface dark:bg-dark-surface border-r lg:border-r-0 border-black/5 dark:border-white/5 transition-transform duration-300 lg:rounded-[2rem] lg:h-full lg:border",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-black/5 dark:border-white/5">
            <h2 className="text-lg font-display font-semibold text-text-primary dark:text-white">Menu</h2>
            <Button variant="ghost" size="sm" onClick={toggleSidebar}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Menu items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-[2rem] transition-all duration-300 font-sans relative group",
                    isActive
                      ? "bg-coral text-white dark:bg-coral dark:text-white shadow-lg"
                      : "text-text-secondary dark:text-white/70 hover:text-text-primary dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  <Icon className="w-5 h-5 relative z-10" />
                  <span className="font-medium relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="w-5 h-5" />
      </Button>
    </>
  );
}



