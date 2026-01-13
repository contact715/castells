"use client";

import React, { useState, useRef, useEffect } from "react";
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
  ListChecks,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/lib/store/uiStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarItem {
  path: string;
  label: string;
  icon: any;
}

interface SidebarGroup {
  id: string;
  label: string;
  icon: any;
  items?: SidebarItem[];
  path?: string;
}

const sidebarConfig: SidebarGroup[] = [
  { id: "home", label: "Home", icon: LayoutDashboard, path: "/dashboard" },
  {
    id: "communication",
    label: "Communication",
    icon: MessageSquare,
    items: [
      { path: "/ai-chat", label: "AI Chat inbox", icon: MessageSquare },
      { path: "/speed-dialer", label: "Speed-Dialer", icon: Phone },
    ],
  },
  {
    id: "pipelines",
    label: "Pipelines",
    icon: Kanban,
    items: [
      { path: "/pipeline", label: "Deals Pipeline", icon: Kanban },
    ],
  },
  { id: "tasks", label: "Tasks", icon: ListChecks, path: "/tasks" },
  {
    id: "lists",
    label: "Lists",
    icon: FileText,
    items: [
      { path: "/smart-forms", label: "Smart Forms", icon: FileText },
      { path: "/team", label: "Team & Users", icon: Users },
    ],
  },
  {
    id: "ai-automation",
    label: "AI & Automation",
    icon: Workflow,
    items: [
      { path: "/agentic-flow", label: "Agentic Workflows", icon: Workflow },
      { path: "/ai-lead-profiler", label: "AI Lead Profiler", icon: UserSearch },
      { path: "/content-engine", label: "Content Engine", icon: FileImage },
      { path: "/database-reactivation", label: "Database Reactivation", icon: Database },
      { path: "/review-guardian", label: "Review Guardian", icon: Star },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    icon: TrendingUp,
    items: [
      { path: "/roi-analytics", label: "ROI Analytics", icon: TrendingUp },
      { path: "/vision", label: "Vision Estimator", icon: ScanEye },
      { path: "/neighborhood-watch", label: "Spy Dashboard", icon: Radar },
      { path: "/local-seo", label: "Local SEO Engine", icon: MapPin },
    ],
  },
  {
    id: "setup",
    label: "Account",
    icon: Settings,
    items: [
      { path: "/tech-portal", label: "Tech Portal", icon: Wrench },
      { path: "/knowledge-base", label: "Knowledge Base", icon: Database },
      { path: "/billing", label: "Billing & Usage", icon: CreditCard },
      { path: "/compliance", label: "Compliance Guardian", icon: Shield },
      { path: "/settings", label: "Configuration", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const {
    sidebarOpen,
    toggleSidebar,
    setSidebarOpen,
    sidebarCollapsed,
    toggleSidebarCollapse,
    expandedGroups,
    toggleGroup
  } = useUIStore();

  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [flyoutPos, setFlyoutPos] = useState({ top: 0 });

  const handleGroupClick = (group: SidebarGroup) => {
    if (group.path) return; // Top level link
    toggleGroup(group.id);
  };

  const handleMouseEnter = (e: React.MouseEvent, group: SidebarGroup) => {
    const isExpanded = expandedGroups.includes(group.id);
    // Show flyout only if collapsed OR if NOT expanded in accordion
    if (sidebarCollapsed || (!isExpanded && group.items && group.items.length > 0)) {
      const rect = e.currentTarget.getBoundingClientRect();
      // Use the top of the button for alignment
      setFlyoutPos({ top: rect.top });
      setHoveredGroup(group.id);
    }
  };

  const isItemActive = (path: string) => pathname === path;
  const isGroupActive = (group: SidebarGroup) => {
    if (group.path) return pathname === group.path;
    return group.items?.some(item => pathname === item.path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Wrapper */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 transition-all duration-300 lg:h-full lg:flex lg:flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          sidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex flex-col h-full bg-surface dark:bg-dark-surface rounded-[2rem] shadow-sm overflow-hidden">

          {/* Sidebar Header / Logo */}
          <div className="p-6 flex items-center justify-between">
            {!sidebarCollapsed && (
              <h2 className="text-2xl font-display font-bold text-coral flex items-center gap-2">
                <span className="w-8 h-8 bg-coral rounded-[2rem] flex items-center justify-center text-white text-base">M</span>
                MOS Engine
              </h2>
            )}
            {sidebarCollapsed && (
              <div className="w-8 h-8 bg-coral rounded-[2rem] flex items-center justify-center text-white text-base mx-auto">M</div>
            )}
            <button
              onClick={toggleSidebarCollapse}
              className="hidden lg:flex p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-[2rem] text-gray-400 hover:text-coral transition-colors"
            >
              {sidebarCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 pb-6 space-y-1 overflow-y-auto no-scrollbar">
            {sidebarConfig.map((group) => {
              const Icon = group.icon;
              const hasItems = group.items && group.items.length > 0;
              const isExpanded = expandedGroups.includes(group.id);
              const isActive = isGroupActive(group);

              const content = (
                <div
                  className="relative group/item"
                  onMouseEnter={(e) => handleMouseEnter(e, group)}
                  onMouseLeave={() => setHoveredGroup(null)}
                >
                  {group.path ? (
                    <Link
                      href={group.path}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-[2rem] transition-all duration-300 font-sans group mb-1",
                        isActive
                          ? "bg-coral/10 text-coral shadow-sm"
                          : "text-text-secondary dark:text-white/80 hover:text-coral hover:bg-black/5 dark:hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn("w-5 h-5 min-w-[20px]", isActive ? "text-coral" : "group-hover:text-coral")} />
                      {!sidebarCollapsed && <span className="font-medium whitespace-nowrap">{group.label}</span>}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleGroupClick(group)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-[2rem] transition-all duration-300 font-sans group mb-1",
                        isActive && !isExpanded
                          ? "bg-coral/10 text-coral"
                          : "text-text-secondary dark:text-white/80 hover:text-coral hover:bg-black/5 dark:hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn("w-5 h-5 min-w-[20px]", isActive ? "text-coral" : "group-hover:text-coral")} />
                      {!sidebarCollapsed && (
                        <div className="flex-1 flex items-center justify-between min-w-0">
                          <span className="font-medium whitespace-nowrap">{group.label}</span>
                          {isExpanded ? <ChevronDown className="w-4 h-4 opacity-50" /> : <ChevronRight className="w-4 h-4 opacity-50" />}
                        </div>
                      )}
                    </button>
                  )}

                  {/* Accordion Content for Expanded State */}
                  <AnimatePresence>
                    {isExpanded && !sidebarCollapsed && hasItems && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-12 pr-4 py-2 space-y-1">
                          {group.items?.map((item) => (
                            <Link
                              key={item.path}
                              href={item.path}
                              className={cn(
                                "flex items-center gap-3 px-4 py-2 rounded-[2rem] text-sm transition-all duration-200",
                                isItemActive(item.path)
                                  ? "bg-coral/10 text-coral font-bold"
                                  : "text-text-secondary dark:text-white/60 hover:text-coral hover:bg-black/5 dark:hover:bg-white/5"
                              )}
                            >
                              <item.icon className="w-4 h-4" />
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );

              return <React.Fragment key={group.id}>{content}</React.Fragment>;
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 ">
            <div className={cn(
              "flex items-center gap-3 p-3 rounded-[2rem] bg-black/5 dark:bg-dark-surface/50",
              sidebarCollapsed && "justify-center p-2"
            )}>
              <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center text-coral font-bold shrink-0">
                JD
              </div>
              {!sidebarCollapsed && (
                <div className="min-w-0">
                  <p className="text-sm font-bold text-text-primary dark:text-white truncate">John Doe</p>
                  <p className="text-xs text-text-secondary dark:text-white/40 truncate">Admin Profile</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Flyout Menu (Popup) - Rendered outside overflow-hidden but inside aside for accessibility */}
        {hoveredGroup && (
          sidebarConfig.find(g => g.id === hoveredGroup)?.items && (
            <div
              className={cn(
                "fixed z-[100] w-72 -ml-12 pl-12 group/flyout", // Massive 48px overlap bridge
                sidebarCollapsed ? "left-20" : "left-64"
              )}
              style={{
                top: flyoutPos.top,
              }}
              onMouseEnter={() => setHoveredGroup(hoveredGroup)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface dark:bg-dark-surface rounded-[2rem] shadow-2xl p-2 border border-black/10 dark:border-white/10 overflow-hidden"
              >
                <div className="px-4 py-2 mb-1">
                  <span className="text-xs font-bold text-text-secondary dark:text-white/40 uppercase tracking-widest">
                    {sidebarConfig.find(g => g.id === hoveredGroup)?.label}
                  </span>
                </div>
                {sidebarConfig.find(g => g.id === hoveredGroup)?.items?.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-[2rem] text-sm transition-all duration-200",
                      isItemActive(item.path)
                        ? "bg-coral/10 text-coral font-bold"
                        : "text-text-secondary dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-coral"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            </div>
          )
        )}
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
