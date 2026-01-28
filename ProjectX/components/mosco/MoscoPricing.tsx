"use client";

import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const MoscoPricing = () => {
    return (
        <section className="grid md:grid-cols-12 gap-6 items-center bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 lg:p-12">

            <div className="md:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Resource Allocation</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-sans font-bold text-white">
                    Cheaper than your apprentice's lunch.
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed max-w-sm font-sans">
                    Full autonomous coverage for less than one billable hour per month.
                    ROI typically achieved after the first intercepted deal.
                </p>
            </div>

            <div className="md:col-span-7">
                <div className="bg-black/40 border border-white/10 rounded-[20px] p-1 shadow-2xl relative">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-[16px]">
                        POPULAR
                    </div>

                    <div className="bg-white/[0.03] rounded-[16px] p-6 lg:p-8">
                        <div className="flex justify-between items-baseline mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-white">Autopilot Plan</h3>
                                <p className="text-xs text-gray-500">Unrestricted Agent Access</p>
                            </div>
                            <div className="text-right">
                                <span className="text-4xl font-display font-bold text-white tracking-tight">$497</span>
                                <span className="text-xs text-gray-500 font-medium">/mo</span>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            {[
                                "Unlimited AI Conversations",
                                "Speed-to-Lead Dialer",
                                "AI Vision Estimation",
                                "X-Ray Deep Profiling"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 text-blue-400" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white/[0.05] rounded-xl p-4 flex items-center justify-between gap-4 mb-4">
                            <div className="flex-1">
                                <p className="text-xs font-bold text-white mb-0.5">14-Day Free Evaluation</p>
                                <p className="text-[10px] text-gray-400">Zero charges until value is proven.</p>
                            </div>
                            <Button className="h-10 px-6 bg-white text-black hover:bg-gray-200 rounded-lg text-xs font-bold uppercase tracking-wider">
                                Start Trial
                            </Button>
                        </div>

                        <p className="text-[10px] text-gray-600 text-center">
                            Secure encrypted payment processing via Stripe.
                        </p>
                    </div>
                </div>
            </div>

        </section>
    );
};
