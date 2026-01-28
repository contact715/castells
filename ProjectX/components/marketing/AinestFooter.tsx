"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Dribbble, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AinestFooter() {
    return (
        <footer className="bg-[#09090b] pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
            {/* Background Glow in Footer */}
            <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none z-0" />

            <div className="max-w-[1240px] mx-auto px-6 relative z-10">
                {/* Newsletter Section - Matches AI Nest's rounded card style */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 p-12 md:p-16 rounded-[48px] bg-white/[0.02] border border-white/5 mb-32 group">
                    <div className="max-w-md text-center md:text-left">
                        <h3 className="text-[32px] md:text-[40px] font-bold text-white mb-4 tracking-[-0.03em] font-instrument leading-tight">Stay in the loop</h3>
                        <p className="text-[#a1a1aa] font-medium leading-[1.6] text-[17px]">
                            Join our newsletter and receive the latest AI news and platform updates directly in your inbox.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row w-full max-w-[440px] gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-colors text-[15px] font-medium"
                        />
                        <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 py-4 font-bold text-[15px] transition-transform hover:scale-[1.05] active:scale-95">
                            Subscribe
                        </Button>
                    </div>
                </div>

                {/* Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 py-20 pb-32">
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-10 group">
                            <div className="w-[38px] h-[38px] rounded-xl bg-[#6366f1] flex items-center justify-center shadow-[0_4px_15px_rgba(99,102,241,0.4)] transition-transform duration-300 group-hover:scale-110">
                                <span className="text-white font-bold text-[20px]">A</span>
                            </div>
                            <span className="text-white font-bold text-[24px] tracking-[-0.03em] font-instrument">AiNest</span>
                        </Link>
                        <p className="text-[#a1a1aa] font-medium max-w-[280px] mb-10 leading-[1.7] text-[15px]">
                            The future of AI-driven productivity and creativity for modern product teams.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Twitter, Dribbble, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center text-[#a1a1aa] hover:text-white hover:bg-white/10 transition-all border border-white/5">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[11px]">Product</h4>
                        <ul className="space-y-4">
                            {['Integrations', 'Pricing', 'Features', 'Updates'].map(item => (
                                <li key={item}><Link href="#" className="text-[#a1a1aa] hover:text-[#a5b4fc] transition-colors text-[15px] font-medium">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[11px]">Developers</h4>
                        <ul className="space-y-4">
                            {['API Docs', 'Status', 'SDKs', 'Security'].map(item => (
                                <li key={item}><Link href="#" className="text-[#a1a1aa] hover:text-[#a5b4fc] transition-colors text-[15px] font-medium">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[11px]">Company</h4>
                        <ul className="space-y-4">
                            {['About', 'Blog', 'Careers', 'Contact'].map(item => (
                                <li key={item}><Link href="#" className="text-[#a1a1aa] hover:text-[#a5b4fc] transition-colors text-[15px] font-medium">{item}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5 text-zinc-600 text-[11px] font-bold uppercase tracking-[0.15em]">
                    <p>© 2025 AINest INC. All rights reserved.</p>
                    <div className="flex items-center gap-10">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
