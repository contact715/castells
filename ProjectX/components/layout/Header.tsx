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
            className="bg-surface dark:bg-dark-surface p-4 lg:py-3 lg:px-6 rounded-card sticky top-0 md:static z-40 border border-black/5 dark:border-white/5"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <motion.h1
                        className="text-2xl font-display font-bold text-text-primary dark:text-white tracking-tight"
                        whileHover={{ scale: 1.02, x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        M.O.S. Engine
                    </motion.h1>
                    <div className="hidden md:flex items-center gap-2 relative">
                        <Search className="absolute left-4 w-3.5 h-3.5 text-text-secondary dark:text-white/40" />
                        <Input
                            type="text"
                            placeholder="Search systems..."
                            className="pl-11 w-80 bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/5 h-10 text-xs font-medium"
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



