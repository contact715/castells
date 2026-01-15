"use client";

import { Calendar, Filter, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function DepartmentFilters() {
    return (
        <div className="flex flex-wrap items-center gap-3 p-2 bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/5 backdrop-blur-sm">
            {/* Date Range Selector */}
            <Button variant="ghost" size="sm" className="rounded-full gap-2 px-4 h-9 font-bold text-[11px] uppercase tracking-widest hover:bg-white dark:hover:bg-white/10">
                <Calendar className="w-3.5 h-3.5" />
                <span>Jan 1 - Jan 15</span>
            </Button>

            <div className="w-px h-4 bg-black/10 dark:bg-white/10 mx-1" />

            {/* Source Filter */}
            <Button variant="ghost" size="sm" className="rounded-full gap-2 px-4 h-9 font-bold text-[11px] uppercase tracking-widest hover:bg-white dark:hover:bg-white/10">
                <Filter className="w-3.5 h-3.5" />
                <span>All Sources</span>
            </Button>

            {/* Region Filter */}
            <Button variant="ghost" size="sm" className="rounded-full gap-2 px-4 h-9 font-bold text-[11px] uppercase tracking-widest hover:bg-white dark:hover:bg-white/10">
                <Globe className="w-3.5 h-3.5" />
                <span>Global View</span>
            </Button>

            {/* Team Filter */}
            <Button variant="ghost" size="sm" className="rounded-full gap-2 px-4 h-9 font-bold text-[11px] uppercase tracking-widest hover:bg-white dark:hover:bg-white/10">
                <Users className="w-3.5 h-3.5" />
                <span>All Teams</span>
            </Button>

            <div className="flex-1" />

            {/* Reset Filters */}
            <Button variant="ghost" size="sm" className="rounded-full px-4 h-9 font-bold text-[10px] uppercase tracking-widest text-text-secondary dark:text-white/40 hover:text-coral transition-colors">
                Clear All
            </Button>

            {/* Apply Button */}
            <Button size="sm" className="bg-coral hover:bg-coral-dark text-white rounded-full px-6 h-9 font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-coral/20">
                Update Report
            </Button>
        </div>
    );
}
