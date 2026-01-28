"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface TimelineStep {
    number: string;
    title: string;
    description: string;
    videoSrc?: string;
}

const timelineSteps: TimelineStep[] = [
    {
        number: "01",
        title: "SHOWROOM VISION",
        description: "Consultation at 1517 Main Street to select initial textures and stones.",
        videoSrc: "/videos/showroom-vision.mp4"
    },
    {
        number: "02",
        title: "3D RENDERING",
        description: "A precision digital twin of your space, exact to the millimeter.",
        videoSrc: "/videos/3d-rendering.mp4"
    },
    {
        number: "03",
        title: "CONCIERGE MANAGEMENT",
        description: "HOA approvals, structural engineering, and timeline synchronization.",
        videoSrc: "/videos/concierge-process.mp4"
    }
];

export function RoyalRoadmap() {
    const [activeStep, setActiveStep] = useState(0);
    const [videoScale, setVideoScale] = useState(1);
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const isInView = useInView(sectionRef, { amount: 0.3 });

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const viewportCenter = window.scrollY + window.innerHeight * 0.5;
            const sectionTop = sectionRef.current.offsetTop;
            const sectionBottom = sectionTop + sectionRef.current.offsetHeight;

            // Проверяем, находится ли секция в viewport
            if (viewportCenter < sectionTop || viewportCenter > sectionBottom) {
                return;
            }

            let activeIndex = 0;
            let minDistance = Infinity;

            stepRefs.current.forEach((ref, index) => {
                if (!ref) return;
                
                const rect = ref.getBoundingClientRect();
                const stepCenter = rect.top + rect.height / 2;
                const viewportCenterY = window.innerHeight * 0.5;
                const distance = Math.abs(viewportCenterY - stepCenter);
                
                // Проверяем, что элемент виден в viewport
                if (rect.top < window.innerHeight && rect.bottom > 0 && distance < minDistance) {
                    minDistance = distance;
                    activeIndex = index;
                }
            });

            setActiveStep(activeIndex);
            
            // Вычисляем масштаб видео на основе прогресса скролла внутри секции
            const scrollProgress = Math.max(0, Math.min(1, 
                (viewportCenter - sectionTop) / (sectionBottom - sectionTop)
            ));
            setVideoScale(1 + scrollProgress * 0.5);
        };

        // Throttle для производительности
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", throttledScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });
        handleScroll(); // Первоначальная проверка

        return () => {
            window.removeEventListener("scroll", throttledScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    // Меняем видео в зависимости от активного шага
    useEffect(() => {
        if (videoRef.current && timelineSteps[activeStep]?.videoSrc) {
            const newSrc = timelineSteps[activeStep].videoSrc;
            if (videoRef.current.src !== newSrc) {
                videoRef.current.src = newSrc;
                videoRef.current.load();
                videoRef.current.play().catch(() => {
                    // Игнорируем ошибки автовоспроизведения
                });
            }
        }
    }, [activeStep]);

    return (
        <section 
            ref={sectionRef}
            className="py-40 md:py-60 lg:py-80 bg-[#0a0a0a] relative overflow-hidden min-h-screen flex items-center"
        >
            {/* Video Background with Scale Animation */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    animate={{ scale: videoScale }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full object-cover opacity-25"
                    style={{ transformOrigin: "center center" }}
                    onError={() => {
                        // Если видео не загрузилось, просто скрываем ошибку
                    }}
                >
                    <source src={timelineSteps[activeStep]?.videoSrc || "/videos/showroom-process.mp4"} type="video/mp4" />
                </motion.video>
                {/* Fallback gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#1a1a1a]" />
                {/* Overlay для лучшей читаемости */}
                <div className="absolute inset-0 bg-[#0a0a0a]/75" />
            </div>

            {/* Content - Centered */}
            <div className="max-w-[1800px] mx-auto px-8 md:px-16 relative z-10 w-full">
                <div className="max-w-6xl mx-auto">
                    {/* Timeline Container */}
                    <div className="relative">
                        {/* Vertical Timeline Line - Centered */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 transform -translate-x-1/2 hidden md:block" />

                        {/* Timeline Steps */}
                        <div className="space-y-32 md:space-y-40 lg:space-y-48 pt-8">
                            {timelineSteps.map((step, index) => {
                                const isActive = activeStep === index;
                                const isPast = activeStep > index;
                                
                                return (
                                    <motion.div
                                        key={index}
                                        ref={(el) => {
                                            stepRefs.current[index] = el;
                                        }}
                                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                        animate={{ 
                                            opacity: isActive ? 1 : isPast ? 0.6 : 0.3,
                                            y: isActive ? 0 : isPast ? 0 : 30,
                                            scale: isActive ? 1 : isPast ? 0.98 : 0.95
                                        }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="relative flex flex-col md:flex-row md:items-center gap-12 md:gap-16"
                                    >
                                        {/* Step Number - Left side, centered */}
                                        <div className="flex-shrink-0 md:w-1/2 md:text-right md:pr-12">
                                            <motion.div
                                                animate={{ 
                                                    opacity: isActive ? 1 : isPast ? 0.5 : 0.2,
                                                    color: isActive ? '#c5a059' : isPast ? '#c5a059' : '#666666',
                                                    scale: isActive ? 1.1 : 1
                                                }}
                                                transition={{ duration: 0.6, ease: "easeOut" }}
                                                className="text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tight leading-none"
                                            >
                                                {step.number}
                                            </motion.div>
                                        </div>

                                        {/* Timeline Dot - Centered */}
                                        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-16 md:top-1/2 z-10">
                                            <motion.div
                                                animate={{
                                                    scale: isActive ? 1.8 : isPast ? 1.2 : 1,
                                                    backgroundColor: isActive ? '#c5a059' : isPast ? '#c5a059' : '#666666',
                                                    boxShadow: isActive 
                                                        ? '0 0 40px rgba(197, 160, 89, 1)' 
                                                        : isPast 
                                                        ? '0 0 20px rgba(197, 160, 89, 0.5)' 
                                                        : 'none'
                                                }}
                                                transition={{ duration: 0.4 }}
                                                className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/20"
                                            />
                                        </div>

                                        {/* Step Content - Right side, centered */}
                                        <div className="flex-1 md:w-1/2 md:pl-12">
                                            <motion.div
                                                animate={{ 
                                                    opacity: isActive ? 1 : isPast ? 0.8 : 0.5
                                                }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                <motion.h3 
                                                    animate={{
                                                        color: isActive ? '#c5a059' : isPast ? '#c5a059' : '#ffffff',
                                                        scale: isActive ? 1.05 : 1
                                                    }}
                                                    transition={{ duration: 0.6 }}
                                                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight"
                                                >
                                                    {step.title}
                                                </motion.h3>
                                                <motion.p 
                                                    animate={{
                                                        opacity: isActive ? 1 : isPast ? 0.8 : 0.5
                                                    }}
                                                    transition={{ duration: 0.6 }}
                                                    className="text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed"
                                                >
                                                    {step.description}
                                                </motion.p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
