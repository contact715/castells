
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Activity } from "lucide-react";

export const MoscoNavbar = () => {
    return (
        <nav className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-full px-6 py-4 flex items-center justify-between sticky top-4 z-50 shadow-lg">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Activity className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xl font-display font-medium tracking-tight text-text-primary">
                    Mosco<span className="text-primary">.ai</span>
                </span>
            </Link>

            {/* Menu */}
            <div className="hidden md:flex items-center gap-1 bg-surface-secondary/50 rounded-full p-1 border border-white/5">
                {[
                    { name: "System Features", href: "#features" },
                    { name: "ROI Analytics", href: "#roi" },
                    { name: "Pricing Plans", href: "#pricing" }
                ].map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="px-4 py-2 rounded-full text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
                <Link href="/login" className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors hidden sm:block">
                    Log In
                </Link>
                <Button
                    className="bg-primary hover:bg-primary-dark text-white rounded-full px-5 py-2 text-xs font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                >
                    Initialize System
                </Button>
            </div>
        </nav>
    );
};
