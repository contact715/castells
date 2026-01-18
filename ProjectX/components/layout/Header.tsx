"use client";

import { Bell, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";

export function Header() {
    return (
        <header
            className="glass-panel px-6 py-4 sticky top-0 z-40 border-b border-black/5 dark:border-white/5"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <motion.h1
                        className="text-xl font-sans font-bold text-text-primary dark:text-white tracking-tight hidden md:block" // Hidden because Sidebar has title
                        whileHover={{ scale: 1.02, x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        M.O.S. Engine
                    </motion.h1>
                    <div className="hidden md:flex items-center gap-2 relative">
                        <Search className="absolute left-4 w-4 h-4 text-text-secondary dark:text-white/40" />
                        <Input
                            type="text"
                            placeholder="Search systems..." // Placeholder style already handled in Input component
                            className="pl-11 w-96 h-11 bg-black/5 dark:bg-white/5 rounded-input border-transparent focus:border-primary/20"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div id="header-actions" className="flex items-center gap-3"></div>
                </div>
            </div>
        </header>
    );
}



