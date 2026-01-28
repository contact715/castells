"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronDown, Menu, X } from "lucide-react";

export function AinestNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Integrations", href: "#" },
        { name: "Pricing", href: "#pricing" },
        { name: "Company", href: "#", hasDropdown: true },
        { name: "Docs", href: "#" },
        { name: "Articles", href: "#" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${isScrolled
                    ? "bg-white/80 backdrop-blur-md border-gray-200/50 py-3 shadow-sm"
                    : "bg-transparent border-transparent py-6"
                }`}
        >
            <div className="max-w-[1240px] mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-10 h-10 rounded-inner bg-blue-500 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                            <span className="text-white font-semibold text-lg">A</span>
                        </div>
                        <span className="text-gray-900 font-bold text-xl tracking-tight">AiNest</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors flex items-center gap-1 group"
                            >
                                {link.name}
                                {link.hasDropdown && (
                                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                )}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="hidden sm:block">
                        <Button
                            variant="ghost"
                            className="text-gray-600 hover:text-gray-900 text-sm font-medium px-4"
                        >
                            Sign in
                        </Button>
                    </Link>
                    <Button variant="primary" className="px-6 py-2.5 text-sm font-semibold">
                        Remix template
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden text-gray-400 p-2 hover:bg-gray-100 rounded-inner transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-gray-200/50 py-8 px-6 lg:hidden flex flex-col gap-6 shadow-lg"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 hover:text-gray-900 text-lg font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-px bg-gray-200 w-full" />
                        <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                            <button className="text-gray-600 hover:text-gray-900 text-lg font-medium">Sign in</button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
