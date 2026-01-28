"use client";

import React, { useState, useRef, memo } from "react";
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
    Settings,
    Shield,
    MapPin,
    Kanban,
    Wrench,
    CreditCard,
    ScanEye,
    Radar,
    Users,
    ListChecks,
    ChevronDown,
    ChevronRight,
    PanelLeftClose,
    PanelLeft,
    Zap,
    Clock,
    Bell,
    Cpu,
    Trophy,
    Ship,
    LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/lib/store/uiStore";
import { cn } from "@/lib/utils";
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
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "mission-control",
        label: "Mission Control",
        icon: Radar,
        items: [
            { path: "/sales-command", label: "Sales Command", icon: Trophy },
            { path: "/sales-analytics", label: "Analytics", icon: TrendingUp },
        ]
    },
    {
        id: "core-tools",
        label: "Core Tools",
        icon: Zap,
        items: [
            { path: "/speed-dialer", label: "Dialer", icon: Phone },
            { path: "/ai-chat", label: "AI Chat", icon: MessageSquare },
            { path: "/smart-forms", label: "Forms", icon: FileText },
            { path: "/ai-lead-profiler", label: "Lead Profiler", icon: UserSearch },
            { path: "/conversations", label: "Conversations", icon: MessageSquare },
            { path: "/review-guardian", label: "Reviews", icon: Star },
        ],
    },
    {
        id: "future-modules",
        label: "Modules",
        icon: Clock,
        items: [
            { path: "/roi-analytics", label: "ROI Analytics", icon: TrendingUp },
            { path: "/vision", label: "Vision", icon: ScanEye },
            { path: "/neighborhood-watch", label: "Spy Dashboard", icon: Radar },
            { path: "/local-seo", label: "Local SEO", icon: MapPin },
            { path: "/agentic-flow", label: "Workflows", icon: Cpu },
            { path: "/database-reactivation", label: "Reactivation", icon: Database },
            { path: "/content-engine", label: "Content", icon: FileImage },
            { path: "/pipeline", label: "Pipeline", icon: Kanban },
            { path: "/tasks", label: "Tasks", icon: ListChecks },
        ],
    },
    {
        id: "setup",
        label: "Settings",
        icon: Settings,
        items: [
            { path: "/team", label: "Team", icon: Users },
            { path: "/tech-portal", label: "Tech Portal", icon: Wrench },
            { path: "/knowledge-base", label: "Knowledge Base", icon: Database },
            { path: "/billing", label: "Billing", icon: CreditCard },
            { path: "/compliance", label: "Compliance", icon: Shield },
            { path: "/settings", label: "Settings", icon: Settings },
        ],
    },
];

export const Sidebar = memo(function Sidebar() {
    const pathname = usePathname();
    const sidebarOpen = useUIStore(state => state.sidebarOpen);
    const setSidebarOpen = useUIStore(state => state.setSidebarOpen);
    const sidebarCollapsed = useUIStore(state => state.sidebarCollapsed);
    const toggleSidebarCollapse = useUIStore(state => state.toggleSidebarCollapse);
    const expandedGroups = useUIStore(state => state.expandedGroups);
    const toggleGroup = useUIStore(state => state.toggleGroup);

    const sidebarRef = useRef<HTMLElement>(null);
    const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
    const [flyoutPos, setFlyoutPos] = useState({ top: 0 });

    const handleGroupClick = (group: SidebarGroup) => {
        if (group.path) return;
        toggleGroup(group.id);
    };

    const handleMouseEnter = (e: React.MouseEvent, group: SidebarGroup) => {
        const isExpanded = expandedGroups.includes(group.id);
        if (sidebarCollapsed || (!isExpanded && group.items && group.items.length > 0)) {
            const rect = e.currentTarget.getBoundingClientRect();
            const sidebarRect = sidebarRef.current?.getBoundingClientRect();
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
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Wrapper - Full Height Fixed */}
            <aside
                ref={sidebarRef}
                className={cn(
                    "fixed lg:relative inset-y-0 left-0 z-50 transition-all duration-300 shrink-0",
                    "h-screen lg:h-full",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
                style={{ 
                    width: sidebarCollapsed ? '72px' : '220px', 
                    contain: "layout size"
                }}
            >
                <div className="flex flex-col h-full rounded-container shadow-[0_2px_8px_rgba(0,0,0,0.3),0_4px_16px_rgba(0,0,0,0.2)] overflow-hidden animate-gradient border border-white/10" style={{
                    background: 'linear-gradient(135deg, #1F2326 0%, #1A2427 25%, #1C2528 50%, #1E2529 75%, #1F2326 100%)'
                }}>

                    {/* Logo Section */}
                    <div className={cn(
                        "p-4 flex items-center shrink-0",
                        sidebarCollapsed ? "justify-center" : "gap-3"
                    )}>
                        {/* Logo Icon */}
                        <div className="w-9 h-9 bg-blue-500/20 rounded-inner flex items-center justify-center shrink-0">
                            <Ship className="w-5 h-5 text-blue-400" />
                        </div>
                        
                        {!sidebarCollapsed && (
                            <span className="text-lg font-semibold text-white">Mosco</span>
                        )}
                        
                        {/* Collapse button - desktop only */}
                        {!sidebarCollapsed && (
                            <button
                                onClick={toggleSidebarCollapse}
                                className="hidden lg:flex ml-auto p-1.5 hover:bg-white/10 rounded-inner text-white transition-colors"
                            >
                                <PanelLeftClose className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Expand button when collapsed */}
                        {sidebarCollapsed && (
                        <div className="p-2 flex justify-center">
                            <button
                                onClick={toggleSidebarCollapse}
                                className="hidden lg:flex p-2 hover:bg-white/10 rounded-inner text-white transition-colors"
                            >
                                <PanelLeft className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Navigation Items - Flex-1 to fill space */}
                    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar min-h-0 flex-shrink">
                        {sidebarConfig.map((group) => {
                            const Icon = group.icon;
                            const hasItems = group.items && group.items.length > 0;
                            const isExpanded = expandedGroups.includes(group.id);
                            const isActive = isGroupActive(group);

                            return (
                                <div
                                    key={group.id}
                                    className="relative"
                                    onMouseEnter={(e) => handleMouseEnter(e, group)}
                                    onMouseLeave={() => setHoveredGroup(null)}
                                >
                                    {group.path ? (
                                        <Link
                                            href={group.path}
                                            className={cn(
                                                "flex items-center rounded-inner transition-all duration-200",
                                                sidebarCollapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5",
                                                isActive
                                                    ? "bg-blue-500 text-white font-medium"
                                                    : "text-white hover:bg-white/10"
                                            )}
                                        >
                                            <Icon className={cn("w-5 h-5 shrink-0", isActive && "text-blue-600")} />
                                            {!sidebarCollapsed && (
                                                <span className="font-medium text-sm">{group.label}</span>
                                            )}
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handleGroupClick(group)}
                                            className={cn(
                                                "w-full flex items-center rounded-inner transition-all duration-200",
                                                sidebarCollapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5",
                                                isActive && !isExpanded
                                                    ? "bg-blue-500 text-white font-medium"
                                                    : "text-white hover:bg-white/10"
                                            )}
                                        >
                                            <Icon className={cn("w-5 h-5 shrink-0", isActive && "text-blue-600")} />
                                            {!sidebarCollapsed && (
                                                <div className="flex-1 flex items-center justify-between min-w-0">
                                                    <span className="font-medium text-sm">{group.label}</span>
                                                    {isExpanded ? (
                                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                                    ) : (
                                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                                    )}
                                                </div>
                                            )}
                                        </button>
                                    )}

                                    {/* Accordion Content */}
                                    <AnimatePresence>
                                        {isExpanded && !sidebarCollapsed && hasItems && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pl-6 pr-2 py-1.5 space-y-0.5">
                                                    {group.items?.map((item) => (
                                                        <Link
                                                            key={item.path}
                                                            href={item.path}
                                                            className={cn(
                                                                "flex items-center gap-2.5 px-3 py-2 rounded-element text-sm transition-all duration-200",
                                                                isItemActive(item.path)
                                                                    ? "bg-blue-500/20 text-white font-medium border border-blue-500/30"
                                                                    : "text-white hover:bg-white/10"
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
                        })}
                    </nav>

                    {/* Footer - Fixed at bottom */}
                    <div className="p-3 mt-auto shrink-0 border-t border-white/10">
                        <button className={cn(
                            "flex items-center rounded-inner transition-all duration-200 w-full text-white hover:bg-white/10",
                            sidebarCollapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5"
                        )}>
                            <LogOut className="w-5 h-5" />
                            {!sidebarCollapsed && <span className="font-medium text-sm">Logout</span>}
                        </button>
                    </div>
                </div>

                {/* Flyout Menu (Popup) for collapsed state */}
                {hoveredGroup && sidebarConfig.find(g => g.id === hoveredGroup)?.items && (
                    <div
                        className={cn(
                            "fixed z-[100] w-48 pointer-events-auto -translate-y-1/2",
                            "before:absolute before:inset-y-0 before:-left-4 before:w-4 before:content-['']"
                        )}
                            style={{
                                top: flyoutPos.top,
                                left: sidebarCollapsed ? '72px' : '220px'
                            }}
                        onMouseEnter={() => setHoveredGroup(hoveredGroup)}
                        onMouseLeave={() => setHoveredGroup(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-[#2C2C2C] rounded-inner shadow-thalassa-lg p-2 border border-white/10"
                        >
                            <div className="px-3 py-2 mb-1">
                                <span className="text-xs font-semibold text-white">
                                    {sidebarConfig.find(g => g.id === hoveredGroup)?.label}
                                </span>
                            </div>
                                {sidebarConfig.find(g => g.id === hoveredGroup)?.items?.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={cn(
                                            "flex items-center gap-2.5 px-3 py-2 rounded-element text-sm transition-all duration-200",
                                            isItemActive(item.path)
                                                ? "bg-blue-500/20 text-white font-medium border border-blue-500/30"
                                                : "text-white hover:bg-white/10"
                                        )}
                                    >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </motion.div>
                    </div>
                )}
            </aside>
        </>
    );
});
