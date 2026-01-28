"use client";

import { Menu, Bell, Send, Mic, User, X, Sparkles, Minimize2, Maximize2, Paperclip } from "lucide-react";
import { useUIStore } from "@/lib/store/uiStore";
import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Маппинг путей к заголовкам
const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/speed-dialer": "Speed Dialer",
    "/sales-command": "Sales Command",
    "/sales-analytics": "Sales Analytics",
    "/ai-chat": "AI Chat",
    "/smart-forms": "Smart Forms",
    "/ai-lead-profiler": "Lead Profiler",
    "/conversations": "Conversations",
    "/review-guardian": "Review Guardian",
    "/roi-analytics": "ROI Analytics",
    "/vision": "Vision",
    "/neighborhood-watch": "Neighborhood Watch",
    "/local-seo": "Local SEO",
    "/agentic-flow": "Agentic Flow",
    "/database-reactivation": "Database Reactivation",
    "/content-engine": "Content Engine",
    "/pipeline": "Pipeline",
    "/tasks": "Tasks",
    "/billing": "Billing",
    "/calendar": "Calendar",
    "/compliance": "Compliance",
    "/knowledge-base": "Knowledge Base",
    "/lead-ingest": "Lead Ingest",
    "/team": "Team",
    "/tech-portal": "Tech Portal",
    "/settings": "Settings",
};

export const Header = memo(function Header() {
    const pathname = usePathname();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [message, setMessage] = useState("");

    // Получаем заголовок для текущей страницы
    const pageTitle = pageTitles[pathname] || "Dashboard";

    const handleSend = () => {
        if (message.trim()) {
            console.log("Sent:", message);
            setMessage("");
        }
    };

    return (
        <>
            <header className="w-full rounded-container shadow-[0_2px_8px_rgba(0,0,0,0.3),0_4px_16px_rgba(0,0,0,0.2)] animate-gradient relative border border-white/10" style={{
                background: 'linear-gradient(135deg, #1F2326 0%, #1A2427 25%, #1C2528 50%, #1E2529 75%, #1F2326 100%)'
            }}>
                <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
                    {/* Left Section */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        {/* Mobile menu button */}
                        <button
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-inner transition-colors"
                            onClick={() => useUIStore.getState().toggleSidebar()}
                            aria-label="Open menu"
                        >
                            <Menu className="w-5 h-5 text-gray-600" />
                        </button>
                        
                        {/* Page Title */}
                        <h1 className="text-xl sm:text-2xl font-semibold text-white">
                            {pageTitle}
                        </h1>
                    </div>

                    {/* Center - AI Assistant Trigger */}
                    <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                        <button 
                            onClick={() => setIsChatOpen(true)}
                            className="relative w-full flex items-center gap-3 px-4 py-2.5 bg-[#2C2C2C] rounded-card border border-white/10 hover:bg-[#333333] hover:border-blue-500/50 transition-all cursor-pointer group shadow-sm"
                        >
                            <div className="w-7 h-7 bg-white/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                <Sparkles className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300" />
                            </div>
                            <span className="flex-1 text-left text-sm text-gray-300 group-hover:text-white transition-colors">
                                Ask AI anything...
                            </span>
                            <div className="flex items-center gap-1">
                                <kbd className="px-2 py-0.5 text-xs bg-white/10 group-hover:bg-white/20 rounded border border-white/20 text-gray-400 group-hover:text-gray-300 font-medium transition-colors">⌘</kbd>
                                <kbd className="px-2 py-0.5 text-xs bg-white/10 group-hover:bg-white/20 rounded border border-white/20 text-gray-400 group-hover:text-gray-300 font-medium transition-colors">K</kbd>
                            </div>
                        </button>
                    </div>

                    {/* Right Section - Stats & User */}
                    <div className="flex items-center gap-4 sm:gap-6">
                        {/* Quick Stats */}
                        <div className="hidden lg:flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-xs text-gray-400">Sales of the Day</p>
                                <p className="text-lg font-semibold text-white">$85,400</p>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="text-right">
                                <p className="text-xs text-gray-400">Weekly performance</p>
                                <p className="text-lg font-semibold text-white">92.4%</p>
                            </div>
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2 hover:bg-white/10 rounded-inner transition-colors">
                            <Bell className="w-5 h-5 text-gray-300" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
                        </button>

                        {/* User Avatar */}
                        <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-white/20 shadow-sm overflow-hidden">
                            <div className="w-full h-full bg-blue-500/20 flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* AI Chat Panel */}
            <AnimatePresence>
                {isChatOpen && (
                    <>
                        {/* Backdrop - стеклянный эффект с размытием */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[100]"
                            onClick={() => setIsChatOpen(false)}
                        />
                        
                        {/* Chat Panel - Glass effect, perfectly centered */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ 
                                opacity: 1, 
                                scale: 1,
                                height: isMinimized ? "auto" : "600px",
                                x: "-50%",
                                y: "-50%"
                            }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed top-1/2 left-1/2 w-[800px] max-w-[90vw] max-h-[90vh] bg-[#2C2C2C] backdrop-blur-2xl rounded-card shadow-2xl border border-white/20 flex flex-col overflow-hidden z-[101]"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#212529] backdrop-blur-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-inner bg-gradient-to-tr from-blue-500 to-blue-400 flex items-center justify-center shadow-md">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white">Castells AI Assistant</h3>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        className="p-2 hover:bg-white/10 rounded-inner text-gray-400 hover:text-white transition-colors"
                                        onClick={() => setIsMinimized(!isMinimized)}
                                    >
                                        {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                    </button>
                                    <button
                                        className="p-2 hover:bg-red-500/20 rounded-inner text-gray-400 hover:text-red-400 transition-colors"
                                        onClick={() => setIsChatOpen(false)}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Chat Body */}
                            {!isMinimized && (
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
                                    <div className="p-4 rounded-inner bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm text-sm text-gray-200 leading-relaxed">
                                        Hello! I&apos;m your AI assistant. How can I help you today?
                                    </div>
                                    <div className="p-4 rounded-inner bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-sm text-blue-300">
                                        <p className="font-medium mb-2">Quick actions:</p>
                                        <ul className="space-y-1.5 text-xs text-blue-400">
                                            <li className="flex items-center gap-2 cursor-pointer hover:text-blue-300 transition-colors">
                                                <span className="w-1 h-1 rounded-full bg-blue-400" />
                                                Summarize recent leads
                                            </li>
                                            <li className="flex items-center gap-2 cursor-pointer hover:text-blue-300 transition-colors">
                                                <span className="w-1 h-1 rounded-full bg-blue-400" />
                                                Analyze sales performance
                                            </li>
                                            <li className="flex items-center gap-2 cursor-pointer hover:text-blue-300 transition-colors">
                                                <span className="w-1 h-1 rounded-full bg-blue-400" />
                                                Generate report
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Dark-themed Input Area */}
                            {!isMinimized && (
                                <div className="p-4 bg-[#212529] backdrop-blur-sm border-t border-white/10">
                                    <div className="flex items-center gap-2 p-2 bg-[#333333] backdrop-blur-sm rounded-inner border border-white/10 focus-within:bg-[#3C3C3C] focus-within:border-blue-500/50 transition-all">
                                        <button className="p-2 hover:bg-white/10 rounded-element text-gray-400 hover:text-white transition-colors">
                                            <Paperclip className="w-4 h-4" />
                                        </button>
                                        <input
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                            placeholder="Type your message..."
                                            className="flex-1 bg-transparent text-sm text-gray-200 placeholder:text-gray-500 outline-none"
                                        />
                                        <button className="p-2 hover:bg-white/10 rounded-element text-gray-400 hover:text-white transition-colors">
                                            <Mic className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={handleSend}
                                            disabled={!message.trim()}
                                            className={`p-2 rounded-element transition-all ${
                                                message.trim() 
                                                    ? "bg-blue-500 text-white hover:bg-blue-600" 
                                                    : "bg-white/10 text-gray-500"
                                            }`}
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
});
