"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AinestPricing() {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: "Pro",
            price: isAnnual ? 10 : 12,
            tokens: "8,500 Daily Tokens",
            rollover: "25,500 Rollover Capacity",
            features: [
                "1 Collection",
                "Private generations",
                "200 Realtime actions",
                "Advanced AI Models",
                "Standard support"
            ],
            buttonClass: "bg-white text-black hover:bg-zinc-200"
        },
        {
            name: "Team",
            price: isAnnual ? 24 : 30,
            tokens: "25,000 Daily Tokens",
            rollover: "75,000 Rollover Capacity",
            recommended: true,
            features: [
                "Unlimited Collections",
                "Unlimited Realtime actions",
                "Team collaboration",
                "Shared assets library",
                "Priority support",
                "Custom integrations"
            ],
            buttonClass: "bg-[#6366f1] text-white hover:bg-indigo-500 shadow-[0_10px_30px_rgba(99,102,241,0.4)]"
        },
        {
            name: "Unlimited",
            price: isAnnual ? 44 : 60,
            tokens: "60,000 Daily Tokens",
            rollover: "180,000 Rollover Capacity",
            features: [
                "Everything in Team",
                "Unlimited everything",
                "Highest generation quality",
                "24/7 dedicated support",
                "Early access to new features"
            ],
            buttonClass: "bg-[#f27128] text-white hover:bg-orange-500 shadow-[0_10px_30px_rgba(242,113,40,0.4)]"
        }
    ];

    return (
        <section id="pricing" className="py-40">
            <div className="max-w-[1240px] mx-auto px-6 text-center">
                <h2 className="text-[40px] md:text-[56px] font-bold text-white mb-6 tracking-[-0.035em] font-instrument">Simple Pricing, <span className="text-white/40">No Hidden Fees</span></h2>
                <p className="text-[#a1a1aa] mb-16 font-medium text-[17px]">Choose the plan that best fits your workflow.</p>

                {/* Billing Toggle - Precision matched */}
                <div className="flex items-center justify-center gap-5 mb-24">
                    <span className={`text-[15px] ${!isAnnual ? 'text-white' : 'text-[#a1a1aa]'} font-bold transition-colors`}>Monthly</span>
                    <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className="w-[52px] h-[28px] rounded-full bg-white/5 border border-white/10 p-1 relative flex items-center transition-all"
                    >
                        <div className={`w-[20px] h-[20px] rounded-full bg-[#6366f1] shadow-[0_0_10px_rgba(99,102,241,0.6)] transition-all duration-300 ${isAnnual ? 'translate-x-[24px]' : 'translate-x-0'}`} />
                    </button>
                    <span className={`text-[15px] ${isAnnual ? 'text-white' : 'text-[#a1a1aa]'} font-bold transition-colors`}>
                        Annual <span className="text-[#a5b4fc] text-[11px] ml-1.5 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">Save 20%</span>
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`p-12 rounded-[48px] bg-white/[0.02] border transition-all duration-500 flex flex-col ${plan.recommended
                                    ? 'border-indigo-500/40 shadow-[0_0_80px_rgba(99,102,241,0.1)] lg:scale-[1.05] scale-100 z-10 bg-white/[0.03]'
                                    : 'border-white/5 hover:border-white/10'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div className="text-left">
                                    <h3 className="text-[13px] font-bold text-[#a5b4fc] mb-4 uppercase tracking-[0.2em]">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-[48px] font-bold text-white tracking-tight">${plan.price}</span>
                                        <span className="text-[#a1a1aa] text-[16px] font-medium">/mo</span>
                                    </div>
                                </div>
                                {plan.recommended && (
                                    <span className="bg-[#6366f1] text-white text-[11px] font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full shadow-[0_4px_15px_rgba(99,102,241,0.3)]">
                                        Popular
                                    </span>
                                )}
                            </div>

                            <div className="space-y-8 text-left mb-12 flex-1">
                                <div className="pb-8 border-b border-white/5">
                                    <div className="text-white font-bold text-[17px] mb-2 tracking-tight">{plan.tokens}</div>
                                    <div className="text-[#a1a1aa] text-[14px] font-medium leading-[1.6]">{plan.rollover}</div>
                                </div>
                                <ul className="space-y-5">
                                    {plan.features.map((feat, j) => (
                                        <li key={j} className="flex items-start gap-4">
                                            <div className="w-[20px] h-[20px] rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-white/5">
                                                <Check className="w-[12px] h-[12px] text-white" strokeWidth={3} />
                                            </div>
                                            <span className="text-[#a1a1aa] text-[15px] font-medium leading-[1.6]">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button className={`w-full rounded-[20px] py-7 font-bold uppercase tracking-[0.1em] text-[13px] transition-all duration-300 ${plan.buttonClass}`}>
                                Get Started
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
