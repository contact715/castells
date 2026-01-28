"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function AinestHero() {
    return (
        <section className="relative pt-[180px] pb-32 overflow-hidden">

            <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-200/50 bg-white/60 backdrop-blur-sm mb-10">
                        <span className="text-gray-600 text-xs font-semibold uppercase tracking-widest">
                            Our AI generates support at all times
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight mb-10 max-w-[1100px] mx-auto leading-tight">
                        Unlock the Power of <br />
                        <span className="text-blue-600">Smarter AI Solutions</span> <br />
                        with AiNest
                    </h1>

                    <p className="text-base md:text-lg text-gray-600 max-w-[720px] mx-auto mb-12 font-medium leading-relaxed">
                        Experience the future of productivity with our intuitive AI platform.
                        Streamline your workflow and enhance your creativity effortlessly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24">
                        <Button variant="primary" className="px-8 py-6 text-base font-semibold">
                            Join for free
                        </Button>
                        <Button variant="ghost" className="text-gray-600 hover:text-gray-900 px-8 py-6 text-base font-semibold group">
                            View all features
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                className="ml-2 inline-block"
                            >
                                →
                            </motion.span>
                        </Button>
                    </div>
                </motion.div>

                {/* Dashboard Mockup - Precision layout */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative px-2 max-w-[1080px] mx-auto"
                >
                    <div className="relative rounded-container border border-gray-200/50 bg-white p-3 shadow-[0_4px_12px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden group">
                        <div className="relative rounded-card overflow-hidden border border-gray-200/30">
                            <img
                                src="https://framerusercontent.com/images/InsNBYFnNCODW0igT22iu2c.png?width=1214&height=914"
                                alt="AI Nest Dashboard Mockup"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    {/* Floating mini-mockups */}
                    <div className="absolute -left-12 bottom-1/4 w-[240px] hidden xl:block animate-bounce-slow">
                        <img
                            src="https://framerusercontent.com/images/hEVNR5OGbspHZV7GaZfKNk8B3fs.png?width=1856&height=2464"
                            className="rounded-card shadow-[0_4px_12px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.06)] border border-gray-200/50"
                            alt=""
                        />
                    </div>

                    <div className="absolute -right-16 top-1/4 w-[200px] hidden xl:block animate-bounce-slow [animation-delay:1s]">
                        <img
                            src="https://framerusercontent.com/images/gs2vxywg66mGD2yWqC38iw5jz8.jpg?width=4368&height=5832"
                            className="rounded-card shadow-[0_4px_12px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.06)] border border-gray-200/50"
                            alt=""
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export function AinestMarquee() {
    const logos = [
        "https://framerusercontent.com/images/EmVysfBcVh1Q9T1LSjkzenT9A4.svg",
        "https://framerusercontent.com/images/eNMSmIVG93r20D5Hq7SakVqK0.svg",
        "https://framerusercontent.com/images/N9iEj4VlvCb0mGkDf6GESH1Qcg.svg",
        "https://framerusercontent.com/images/eNJph42RGV6So8noovFImKAvE.svg",
        "https://framerusercontent.com/images/UseGhaYGXIKPcdRXojpYUbMhvo4.svg",
        "https://framerusercontent.com/images/2En73BkOImlA8OqS3YLYKRuOBI.svg",
        "https://framerusercontent.com/images/f5ActK1sUkjTWn0PH1gZaDqU.svg",
        "https://framerusercontent.com/images/GjAh5RnEFg17UtZOjpaorb4N4g.svg",
        "https://framerusercontent.com/images/rQVdJnw14aSru7SmDQie2lJ15jo.svg"
    ];

    return (
        <section className="py-24 overflow-hidden">
            <div className="max-w-[1240px] mx-auto px-6 mb-16 text-center">
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest">
                    Powering the world&apos;s best product teams
                </p>
            </div>

            <div className="relative w-full [mask-image:linear-gradient(to_right,rgba(0,0,0,0)_0%,#000_12.5%,#000_87.5%,rgba(0,0,0,0)_100%)]">
                <div className="py-8 animate-marquee flex whitespace-nowrap">
                    {[...logos, ...logos, ...logos].map((logo, i) => (
                        <div key={i} className="flex items-center justify-center mx-16">
                            <img
                                src={logo}
                                alt="Partner Logo"
                                className="h-[30px] opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
