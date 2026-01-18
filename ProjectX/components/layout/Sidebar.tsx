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
  PanelLeft,
  Zap,
  Clock,
  ChevronLeft,
  Bell,
  Cpu,
  Trophy,
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
  {
    id: "mission-control", label: "Mission Control", icon: LayoutDashboard, items: [
      { path: "/dashboard", label: "Institutional Dashboard", icon: Radar },
      { path: "/sales-command", label: "Sales Command Center", icon: Trophy },
      { path: "/sales-analytics", label: "Sales Analytics Index", icon: TrendingUp },
    ]
  },
  {
    id: "core-tools",
    label: "MOS Core Tools",
    icon: Zap,
    items: [
      { path: "/speed-dialer", label: "Dialer Engine", icon: Phone },
      { path: "/ai-chat", label: "AI Chat Inbox", icon: MessageSquare },
      { path: "/smart-forms", label: "Lead Forms", icon: FileText },
      { path: "/ai-lead-profiler", label: "AI Lead Profiler", icon: UserSearch },
      { path: "/conversations", label: "Live Conversations", icon: MessageSquare },
    ],
  },
  {
    id: "future-modules",
    label: "Future Modules",
    icon: Clock,
    items: [
      { path: "/roi-analytics", label: "ROI Analytics", icon: TrendingUp },
      { path: "/vision", label: "Vision Estimator", icon: ScanEye },
      { path: "/neighborhood-watch", label: "Spy Dashboard", icon: Radar },
      { path: "/local-seo", label: "Local SEO Engine", icon: MapPin },
      { path: "/agentic-flow", label: "Agentic Workflows", icon: Cpu },
      { path: "/database-reactivation", label: "Database Reactivation", icon: Database },
      { path: "/review-guardian", label: "Review Guardian", icon: Star },
      { path: "/content-engine", label: "Content Engine", icon: FileImage },
      { path: "/pipeline", label: "Sales Pipeline", icon: Kanban },
      { path: "/tasks", label: "Task Management", icon: ListChecks },
    ],
  },
  {
    id: "setup",
    label: "Account",
    icon: Settings,
    items: [
      { path: "/team", label: "Team & Users", icon: Users },
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

  const sidebarRef = useRef<HTMLElement>(null);
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
      const sidebarRect = sidebarRef.current?.getBoundingClientRect();

      // Calculate position relative to the sidebar container
      // This is necessary because Sidebar has a transform/transition which creates a new coordinate system for 'fixed' children
      const relativeTop = rect.top - (sidebarRect?.top || 0) + (rect.height / 2);

      setFlyoutPos({ top: relativeTop });
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
        ref={sidebarRef}
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 transition-all duration-300 lg:h-full lg:flex lg:flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{ width: sidebarCollapsed ? '64px' : '240px' }}
      >
        <div className="flex flex-col h-full bg-surface dark:bg-dark-surface rounded-card shadow-sm overflow-hidden border border-black/[0.03] dark:border-white/[0.03]">

          <div className={cn(
            "p-4 lg:p-6 flex items-center shrink-0 transition-all duration-300",
            sidebarCollapsed ? "flex-col gap-3" : "justify-between"
          )}>
            <div className={cn("flex items-center gap-3", sidebarCollapsed && "justify-center w-full")}>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-base font-bold shrink-0 shadow-sm shadow-primary/20">M</div>
              {!sidebarCollapsed && (
                <h2 className="text-lg font-sans font-bold text-text-primary dark:text-white tracking-tight">
                  MOS Engine
                </h2>
              )}
            </div>
            <button
              onClick={toggleSidebarCollapse}
              className="hidden lg:flex p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-gray-400 hover:text-coral transition-all shrink-0"
            >
              {sidebarCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 pb-4 lg:px-4 lg:pb-6 space-y-1 overflow-y-auto no-scrollbar">
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
                        "flex items-center rounded-lg transition-all duration-200 font-sans group mb-0.5",
                        sidebarCollapsed ? "justify-center p-2 mx-auto w-10 h-10" : "gap-3 px-3 py-2",
                        isActive
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "text-text-secondary dark:text-white/60 hover:text-primary hover:bg-black/5 dark:hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "group-hover:text-primary")} />
                      {!sidebarCollapsed && <span className="font-medium text-sm tracking-tight whitespace-nowrap">{group.label}</span>}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleGroupClick(group)}
                      className={cn(
                        "w-full flex items-center rounded-lg transition-all duration-200 font-sans group mb-0.5",
                        sidebarCollapsed ? "justify-center p-2 mx-auto w-10 h-10" : "gap-3 px-3 py-2",
                        isActive && !isExpanded
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "text-text-secondary dark:text-white/60 hover:text-primary hover:bg-black/5 dark:hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "group-hover:text-primary")} />
                      {!sidebarCollapsed && (
                        <div className="flex-1 flex items-center justify-between min-w-0">
                          <span className="font-medium text-sm tracking-tight whitespace-nowrap">{group.label}</span>
                          {isExpanded ? <ChevronDown className="w-3.5 h-3.5 opacity-70" /> : <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
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
                        <div className="pl-8 pr-4 py-2 space-y-1">
                          {group.items?.map((item) => (
                            <Link
                              key={item.path}
                              href={item.path}
                              className={cn(
                                "flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-medium tracking-tight transition-all duration-200",
                                isItemActive(item.path)
                                  ? "bg-primary/10 text-primary"
                                  : "text-white/70 hover:text-primary hover:bg-white/5"
                              )}
                            >
                              <item.icon className="w-3.5 h-3.5" />
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
          <div className="p-4 border-t border-black/5 dark:border-white/5">
            <div className={cn(
              "flex items-center rounded-xl bg-black/5 dark:bg-dark-surface/50 border border-black/5 dark:border-white/5 transition-all duration-300 overflow-hidden",
              sidebarCollapsed ? "justify-center w-11 h-11 mx-auto" : "w-full"
            )}>
              {!sidebarCollapsed ? (
                <div className="flex w-full divide-x divide-black/5 dark:divide-white/5">
                  <div className="flex-[7.5] flex items-center gap-2 p-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0 text-xs border border-white/5">
                      JD
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-xs font-bold text-white truncate">John Doe</p>
                      <p className="text-[10px] text-white/50 truncate">Admin Profile</p>
                    </div>
                  </div>
                  <button className="flex-[2.5] flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative">
                    <Bell className="w-4 h-4 text-white/70" />
                    <span className="absolute top-3 right-3.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
                  </button>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0 text-xs border border-white/5">
                  JD
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Flyout Menu (Popup) */}
        {hoveredGroup && (
          sidebarConfig.find(g => g.id === hoveredGroup)?.items && (
            <div
              className={cn(
                "fixed z-[100] w-64 pointer-events-auto group/flyout -translate-y-1/2",
                "before:absolute before:inset-y-0 before:-left-8 before:w-8 before:content-['']"
              )}
              style={{
                top: flyoutPos.top,
                left: sidebarCollapsed ? '64px' : '240px'
              }}
              onMouseEnter={() => setHoveredGroup(hoveredGroup)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface dark:bg-dark-surface rounded-xl shadow-xl p-2 border border-black/10 dark:border-white/10 overflow-hidden"
              >
                <div className="px-3 py-2 mb-1 border-b border-black/5 dark:border-white/5">
                  <span className="text-xs font-bold text-text-secondary dark:text-white/40 uppercase tracking-wider">
                    {sidebarConfig.find(g => g.id === hoveredGroup)?.label}
                  </span>
                </div>
                {sidebarConfig.find(g => g.id === hoveredGroup)?.items?.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium tracking-tight transition-all duration-200 mb-0.5",
                      isItemActive(item.path)
                        ? "bg-primary/10 text-primary"
                        : "text-text-secondary dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary"
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
