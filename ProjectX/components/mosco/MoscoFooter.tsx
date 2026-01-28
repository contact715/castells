"use client";

import React from "react";
import Link from "next/link";

export const MoscoFooter = () => {
    return (
        <footer className="py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-wider">
            <div>
                &copy; 2024 Mosco.ai • Automated Sales Division
            </div>
            <div className="flex gap-4">
                <Link href="#" className="hover:text-white transition-colors">Privacy Protocol</Link>
                <Link href="#" className="hover:text-white transition-colors">System Status</Link>
            </div>
        </footer>
    );
};
