"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Minimize2, Maximize2, MessageCircle } from "lucide-react";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { Button } from "@/components/ui/Button";

export default function FloatingAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            height: isMinimized ? "auto" : "500px"
                        }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="w-[400px] bg-[#11141D] border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-600/20">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">Castells AI Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active Engine</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 rounded-full text-white/40 hover:text-white"
                                    onClick={() => setIsMinimized(!isMinimized)}
                                >
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 rounded-full text-white/40 hover:text-white hover:bg-red-500/10"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Chat Body */}
                        {!isMinimized && (
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm text-white/70 leading-relaxed">
                                    Hello! I&apos;m your AI partner. How can I help you dominate your market today?
                                </div>
                                <div className="p-4 rounded-2xl bg-purple-600/10 border border-purple-500/20 text-sm text-purple-400">
                                    <p className="font-bold mb-1">Suggested actions:</p>
                                    <ul className="space-y-1 text-xs opacity-80">
                                        <li>• Summarize recent leads</li>
                                        <li>• Optimize my reactivation campaign</li>
                                        <li>• Check sales team performance</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        {!isMinimized && (
                            <div className="p-4 bg-white/[0.02] border-t border-white/5">
                                <PromptInputBox
                                    onSend={(msg) => console.log("Sent message:", msg)}
                                    placeholder="Ask me anything..."
                                />
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-tr from-purple-600 to-blue-500 shadow-xl shadow-purple-600/30 flex items-center justify-center p-0 border-none group"
                            onClick={() => setIsOpen(true)}
                        >
                            <MessageCircle className="w-8 h-8 text-white transition-transform group-hover:rotate-12" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
