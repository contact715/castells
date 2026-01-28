"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Users,
    Palette,
    Code,
    ArrowRight,
    Mic,
    Smartphone,
    Cloud,
    Languages,
    Cpu,
    Globe,
    Zap,
    MessageSquare,
    Compass,
    Feather,
    Wand2,
    Plus
} from "lucide-react";

// Icon wrapper with light theme
const AinestIconWrapper = ({ children, color }: { children: React.ReactNode, color: string }) => (
    <div className={`w-12 h-12 rounded-inner bg-blue-100 flex items-center justify-center border border-gray-200/50 ${color}`}>
        {children}
    </div>
);

export function AinestAudienceCards() {
    const audiences = [
        {
            title: "For creators",
            desc: "Create production-quality visual assets with speed and style-consistency.",
            icon: Feather,
            color: "text-blue-600",
        },
        {
            title: "For teams",
            desc: "AI-first creative suite designed for collaboration.",
            icon: Users,
            color: "text-blue-600",
        },
        {
            title: "For developers",
            desc: "Experience creation excellence with AiNest's API and unmatched scalability.",
            icon: Code,
            color: "text-blue-600",
        },
    ];

    return (
        <section className="py-24">
            <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {audiences.map((audience, i) => (
                    <div key={i} className="p-8 rounded-card bg-[#D4E6F1] border border-gray-300/30 hover:border-gray-300/50 transition-all duration-300 group cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.06)]">
                        <AinestIconWrapper color={audience.color}>
                            <audience.icon className="w-5 h-5" />
                        </AinestIconWrapper>
                        <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 tracking-tight">{audience.title}</h3>
                        <p className="text-gray-600 text-sm font-medium leading-relaxed mb-8">
                            {audience.desc}
                        </p>
                        <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                            Learn more <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function AinestWebClipper() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
                    Your entire web, <br className="md:hidden" />
                    <span className="text-gray-500">clipped and synced</span>
                </h2>
                <p className="text-base md:text-lg text-gray-600 max-w-[680px] mx-auto mb-20 font-medium leading-relaxed">
                    AiNest Web Clipper helps you organize your thoughts and highlights from anywhere on the web.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Newsletters", desc: "Sync your favorite substacks and newsletters.", icon: Plus },
                        { title: "Kindle Highlights", desc: "Read, highlight and sync your kindle library.", icon: Compass },
                        { title: "Mobile Capture", desc: "Capture ideas on the go with our mobile app.", icon: Smartphone }
                    ].map((feat, i) => (
                        <div key={i} className="p-10 rounded-card bg-[#D4E6F1] border border-gray-300/30 shadow-[0_4px_12px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.06)] hover:border-gray-300/50 transition-colors group">
                            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-8 border border-gray-200/50">
                                <feat.icon className="w-5 h-5 text-blue-600" />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">{feat.title}</h4>
                            <p className="text-[#a1a1aa] font-medium text-[15px] leading-[1.6]">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function AinestSplitSection({
    subhead,
    title,
    desc,
    image,
    reverse = false,
    list = []
}: {
    subhead: string;
    title: string;
    desc: string;
    image: string;
    reverse?: boolean;
    list?: string[];
}) {
    return (
        <section className="py-24">
            <div className={`max-w-[1240px] mx-auto px-6 flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-20 lg:gap-32`}>
                <div className="flex-1 w-full relative">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-auto rounded-card border border-gray-200/50 shadow-[0_4px_12px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.06)] relative z-10"
                    />
                </div>
                <div className="flex-1 text-left">
                    <span className="text-blue-600 font-semibold uppercase tracking-widest text-xs mb-6 block">
                        {subhead}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
                        {title}
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 mb-10 font-medium leading-relaxed">
                        {desc}
                    </p>
                    {list.length > 0 && (
                        <ul className="space-y-5">
                            {list.map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-gray-700 font-semibold text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}

export function AinestGridFeatures() {
    const features = [
        { title: "Mobile App", desc: "Native iOS and Android support for all your AI generations.", icon: Smartphone },
        { title: "Developer API", desc: "Scale your business with our robust and fast API infrastructure.", icon: Code },
        { title: "24/7 Support", desc: "Our team is always here to help you scaling your business.", icon: Globe },
        { title: "AI Voice", desc: "State of the art voice generation and synthesis for your projects.", icon: Mic },
        { title: "Multilingual", desc: "Support for 40+ languages across all our AI models.", icon: Languages },
        { title: "Neural Sync", desc: "Proprietary sync technology between all your devices and teams.", icon: Zap },
        { title: "Custom Agents", desc: "Train your own AI agents on your data for specific tasks.", icon: MessageSquare },
        { title: "Production Ready", desc: "Built with enterprises in mind, with high-security standards.", icon: Cpu },
        { title: "Style Guide", desc: "Define and enforce your brand style across all AI content.", icon: Palette }
    ];

    return (
        <section className="py-40">
            <div className="max-w-[1240px] mx-auto px-6">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Everything you need to build faster</h2>
                    <p className="text-gray-600 font-medium text-base md:text-lg">No-code AI platform designed for modern product teams.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feat, i) => (
                        <div key={i} className="p-8 rounded-card bg-[#D4E6F1] border border-gray-300/30 hover:border-blue-300/50 transition-all duration-300 group cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.06)]">
                            <div className="w-11 h-11 rounded-inner bg-blue-100 flex items-center justify-center mb-8 border border-gray-200/50 group-hover:bg-blue-200 transition-all">
                                <feat.icon className="w-5 h-5 text-blue-600" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3 tracking-tight">{feat.title}</h4>
                            <p className="text-gray-600 text-sm font-medium leading-relaxed">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
