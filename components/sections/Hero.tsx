import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { m as motion } from 'framer-motion';
import { Button } from '../ui/Button';
import AnimatedHeading from '../ui/AnimatedHeading';
import { ContactButtons } from '../ui/ContactButtons';
import SchemaMarkup from '../ui/SchemaMarkup';
import OptimizedImage from '../ui/OptimizedImage';
import { useReducedMotion } from '../../lib/hooks/useReducedMotion';


const Hero: React.FC = () => {
    const prefersReducedMotion = useReducedMotion();
    const [isMuted, setIsMuted] = useState(true);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const [vimeoScriptLoaded, setVimeoScriptLoaded] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);

    // Lazy load video when it enters viewport
    useEffect(() => {
        if (!videoContainerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !shouldLoadVideo) {
                        setShouldLoadVideo(true);
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: '100px' }
        );

        observer.observe(videoContainerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [shouldLoadVideo]);

    // Load Vimeo Player API script 
    useEffect(() => {
        if (!shouldLoadVideo || vimeoScriptLoaded) return;

        if (document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
            setVimeoScriptLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.async = true;
        script.onload = () => setVimeoScriptLoaded(true);
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [shouldLoadVideo, vimeoScriptLoaded]);

    // Initialize Vimeo Player instance
    useEffect(() => {
        if (shouldLoadVideo && iframeRef.current && (window as any).Vimeo && !playerRef.current) {
            playerRef.current = new (window as any).Vimeo.Player(iframeRef.current);
        }
    }, [shouldLoadVideo, vimeoScriptLoaded]);

    const toggleMute = () => {
        if (playerRef.current) {
            playerRef.current.getMuted().then((muted: boolean) => {
                const newMutedState = !muted;
                playerRef.current.setMuted(newMutedState);
                setIsMuted(newMutedState);
            });
        }
    };

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://castells.studio';
    const videoId = '1101673750';


    return (
        <div className="pt-16 md:pt-20 pb-0 relative z-2 bg-transparent">
            <SchemaMarkup
                type="VideoObject"
                data={{
                    name: 'Castells Agency - Digital Marketing Services',
                    description: 'We dominate local markets. From MVP to scalable results people actually want. We design, build, and optimize campaigns for contractors, service providers, and local businesses.',
                    thumbnailUrl: `https://vumbnail.com/${videoId}.jpg`,
                    uploadDate: '2024-01-01',
                    embedUrl: `https://player.vimeo.com/video/${videoId}`,
                    contentUrl: `https://vimeo.com/${videoId}`
                }}
            />
            <div className="container mx-auto px-6 relative z-10 pt-4 md:pt-6">

                {/* Two-Column Header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">

                    {/* Left: Headline */}
                    <div>
                        <div className="text-xs font-bold uppercase text-text-secondary mb-4">
                            <span className="tracking-widest">Digital Marketing Agency Castells</span><span className="ml-0.5">.</span>
                        </div>
                        <AnimatedHeading
                            as="h1"
                            className="font-display text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-text-primary mb-0"
                            delay={0.2}
                            duration={0.8}
                        >
                            We dominate<br />
                            <span className="text-coral-text italic font-semibold">local markets</span>
                        </AnimatedHeading>
                    </div>

                    {/* Right: Description + CTA */}
                    <div className="flex flex-col justify-end">
                        <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8">
                            From MVP to scalable results people actually want. We design, build, and optimize campaigns for contractors, service providers, and local businesses.
                        </p>
                        <div className="flex gap-4 items-center">
                            <Button
                                href="#audit"
                                size="md"
                                className="inline-flex items-center gap-2 group"
                            >
                                Contact us
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <ContactButtons defaultExpanded={null} />
                        </div>
                    </div>
                </div>


                {/*
                    Здесь шла бегущая лента из семи логотипов под заголовком
                    «America's best brands trust Castells»: Vortex, Lumina, Apex,
                    Orbital, Nexus, Stratos, Echo. Ни одной такой компании не
                    существует, нашими клиентами они не являются.

                    Настоящие клиенты показаны ниже, в блоке доверия, инициалами
                    из наших же кейсов.
                */}
            </div>

            {/* HIDDEN: Video Section — uncomment when own video is ready */}
            {/* <div className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20" ref={videoContainerRef}>
                <div className="w-full aspect-video rounded-3xl sm:rounded-card overflow-hidden">
                    <div className="relative w-full h-full bg-black">
                        {shouldLoadVideo ? (
                            <>
                                <iframe
                                    ref={iframeRef}
                                    src="https://player.vimeo.com/video/1101673750?h=7ccdfe1d0c&autoplay=1&muted=1&loop=1&controls=1&background=0&responsive=1&byline=0&title=0"
                                    className="absolute inset-0 w-full h-full border-0"
                                    frameBorder="0"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                                    title="vimeo-player"
                                    loading="lazy"
                                />
                                <button
                                    onClick={toggleMute}
                                    className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-[transform,background-color] duration-300 hover:scale-110"
                                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                                >
                                    {isMuted ? (
                                        <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                                    ) : (
                                        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                    )}
                                </button>
                            </>
                        ) : (
                            <>
                                <OptimizedImage
                                    src={`https://vumbnail.com/${videoId}.jpg`}
                                    alt="Video preview"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    loading="eager"
                                    fetchPriority="high"
                                    width={1920}
                                    height={1080}
                                />
                                <button
                                    onClick={() => setShouldLoadVideo(true)}
                                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors cursor-pointer group"
                                    aria-label="Play video"
                                >
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 hover:bg-white group-hover:scale-110 transition-[transform,background-color] flex items-center justify-center">
                                        <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 text-black ml-1" />
                                    </div>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Hero;
