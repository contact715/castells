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
            <div className={cn("flex items-center gap-2", sidebarCollapsed && "justify-center w-full")}>
              <div className="w-8 h-8 bg-coral rounded-full flex items-center justify-center text-white text-base font-bold shrink-0">M</div>
              {!sidebarCollapsed && (
                <h2 className="text-xl font-display font-bold text-coral whitespace-nowrap">
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
                        "flex items-center rounded-full transition-all duration-300 font-satoshi group mb-1",
                        sidebarCollapsed ? "justify-center p-2.5 mx-auto w-10 h-10" : "gap-2.5 px-3 py-2",
                        isActive
                          ? "bg-coral text-white shadow-xl shadow-black/5"
                          : "text-text-secondary dark:text-white/60 hover:text-coral hover:bg-black/5 dark:hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn("w-4.5 h-4.5 shrink-0", isActive ? "text-white" : "group-hover:text-coral")} />
                      {!sidebarCollapsed && <span className="font-bold text-[13px] uppercase tracking-widest whitespace-nowrap text-white">{group.label}</span>}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleGroupClick(group)}
                      className={cn(
                        "w-full flex items-center rounded-full transition-all duration-300 font-satoshi group mb-1",
                        sidebarCollapsed ? "justify-center p-2.5 mx-auto w-10 h-10" : "gap-2.5 px-3 py-2",
                        isActive && !isExpanded
                          ? "bg-coral text-white shadow-xl shadow-black/5"
                          : "text-text-secondary dark:text-white/60 hover:text-coral hover:bg-black/5 dark:hover:bg-white/5"
                      )}
                    >
                      <Icon className={cn("w-4.5 h-4.5 shrink-0", isActive ? "text-white" : "group-hover:text-coral")} />
                      {!sidebarCollapsed && (
                        <div className="flex-1 flex items-center justify-between min-w-0">
                          <span className="font-bold text-[13px] uppercase tracking-widest whitespace-nowrap text-white">{group.label}</span>
                          {isExpanded ? <ChevronDown className="w-4 h-4 opacity-70" /> : <ChevronRight className="w-4 h-4 opacity-70" />}
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
                                "flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-200",
                                isItemActive(item.path)
                                  ? "bg-coral/20 text-coral"
                                  : "text-white/80 hover:text-coral hover:bg-white/10"
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
              "flex items-center rounded-card bg-black/5 dark:bg-dark-surface/50 border border-black/5 dark:border-white/5 transition-all duration-300 overflow-hidden",
              sidebarCollapsed ? "justify-center w-11 h-11 mx-auto" : "w-full"
            )}>
              {!sidebarCollapsed ? (
                <div className="flex w-full divide-x divide-black/5 dark:divide-white/5">
                  <div className="flex-[7.5] flex items-center gap-2 p-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-coral/20 flex items-center justify-center text-coral font-bold shrink-0 text-[11px] border border-black/5 dark:border-white/5">
                      JD
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-[12px] font-bold text-white truncate">John Doe</p>
                      {/* AIInsights section - assuming 'insight' is defined elsewhere or this is a placeholder */}
                      {/* For demonstration, let's assume a dummy insight */}
                      {/* <div
                            key={index} // 'index' would need to be defined if this were in a map
                            className="p-4 rounded-card bg-white/5 border border-white/10 hover:bg-coral/10 transition-colors"
                        >
                            <p className="text-sm font-sans text-white leading-relaxed font-medium">AI Insight: Your usage is up 15% this month.</p>
                        </div> */}
                      <p className="text-[10px] text-white/60 truncate">Admin Profile</p>
                    </div>
                  </div>
                  <button className="flex-[2.5] flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative">
                    <Bell className="w-4 h-4 text-white/70" />
                    <span className="absolute top-2.5 right-3 w-1.5 h-1.5 bg-coral rounded-full"></span>
                  </button>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center text-coral font-bold shrink-0 text-sm border border-black/5 dark:border-white/5">
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
                className="bg-surface dark:bg-dark-surface rounded-card shadow-lg p-2 border border-black/10 dark:border-white/10 overflow-hidden"
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
                      "flex items-center gap-3 px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-200 mb-1",
                      isItemActive(item.path)
                        ? "bg-coral/10 text-coral"
                        : "text-text-secondary dark:text-white/40 hover:bg-black/5 dark:hover:bg-white/5 hover:text-coral"
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
