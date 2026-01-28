"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AinestFAQ() {
    const faqs = [
        {
            q: "What is AiNest?",
            a: "AiNest is a next-generation AI platform designed to help product teams and creators build, generate, and organize their creative workflow with ease using state-of-the-art AI models."
        },
        {
            q: "Does it support dark mode?",
            a: "Yes, AiNest is designed with a native dark mode aesthetic to ensure a premium and focused experience for all users."
        },
        {
            q: "Is it mobile-friendly?",
            a: "Absolutely. We have native iOS and Android apps, and our web platform is fully responsive across all devices."
        },
        {
            q: "Is there documentation?",
            a: "Yes, we provide comprehensive documentation for both our platform and our developer API to help you get started quickly."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-40">
            <div className="max-w-[800px] mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-[40px] md:text-[48px] font-bold text-white mb-4 tracking-[-0.03em] font-instrument">Frequently Asked Questions</h2>
                    <p className="text-[#a1a1aa] font-medium text-[17px]">Everything you need to know about AiNest.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="rounded-[24px] bg-white/[0.02] border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full p-8 flex items-center justify-between text-left transition-colors"
                            >
                                <span className="text-white font-bold text-[17px] tracking-tight">{faq.q}</span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-white/5 transition-all duration-300 ${openIndex === i ? 'bg-indigo-500 border-indigo-500' : 'bg-white/5'}`}>
                                    {openIndex === i ? (
                                        <Minus className="w-4 h-4 text-white" />
                                    ) : (
                                        <Plus className="w-4 h-4 text-[#a1a1aa]" />
                                    )}
                                </div>
                            </button>
                            <AnimatePresence initial={false}>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="px-8 pb-8 text-[#a1a1aa] font-medium text-[15px] leading-[1.7]">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
