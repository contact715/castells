import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { m as motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Marquee } from '../ui/Marquee';
import AnimatedHeading from '../ui/AnimatedHeading';
import { ContactButtons } from '../ui/ContactButtons';
import '../ui/Marquee.css';

const TESTIMONIAL_AVATARS = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=4',
    'https://i.pravatar.cc/150?img=5',
];

const CLIENT_LOGOS = [
    {
        name: 'Vortex',
        logo: (
            <svg viewBox="0 0 100 30" fill="currentColor" className="h-8 w-auto">
                <path d="M10,15 L20,5 L30,15 L20,25 Z M35,5 H45 V25 H35 Z M50,5 H70 V10 H60 V25 H50 Z M75,5 H95 V10 H85 V25 H95 V20 H85 V15 H95 V10 H85 Z" />
                <path d="M10 15a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" className="opacity-50" />
                <text x="35" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="18">VORTEX</text>
            </svg>
        )
    },
    {
        name: 'Lumina',
        logo: (
            <svg viewBox="0 0 100 30" fill="currentColor" className="h-8 w-auto">
                <circle cx="15" cy="15" r="8" />
                <text x="30" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="18">LUMINA</text>
            </svg>
        )
    },
    {
        name: 'Apex',
        logo: (
            <svg viewBox="0 0 100 30" fill="currentColor" className="h-8 w-auto">
                <path d="M15 5 L5 25 L25 25 Z" />
                <text x="30" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="18">APEX</text>
            </svg>
        )
    },
    {
        name: 'Orbital',
        logo: (
            <svg viewBox="0 0 110 30" fill="currentColor" className="h-8 w-auto">
                <ellipse cx="15" cy="15" rx="10" ry="5" transform="rotate(-45 15 15)" />
                <circle cx="15" cy="15" r="3" />
                <text x="32" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="18">ORBITAL</text>
            </svg>
        )
    },
    {
        name: 'Nexus',
        logo: (
            <svg viewBox="0 0 100 30" fill="currentColor" className="h-8 w-auto">
                <rect x="5" y="5" width="10" height="10" rx="2" />
                <rect x="12" y="12" width="10" height="10" rx="2" className="opacity-70" />
                <text x="30" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="18">NEXUS</text>
            </svg>
        )
    },
    {
        name: 'Stratos',
        logo: (
            <svg viewBox="0 0 110 30" fill="currentColor" className="h-8 w-auto">
                <path d="M5 20 Q15 5 25 20 M15 20 Q25 5 35 20" fill="none" stroke="currentColor" strokeWidth="3" />
                <text x="40" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="18">STRATOS</text>
            </svg>
        )
    },
    {
        name: 'Echo',
        logo: (
            <svg viewBox="0 0 100 30" fill="currentColor" className="h-8 w-auto">
                <path d="M10 25 V5 L25 15 Z" />
                <text x="30" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="18">ECHO</text>
            </svg>
        )
    }
];

const Hero: React.FC = () => {
    const [isMuted, setIsMuted] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        // Load Vimeo Player API script
        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const toggleMute = () => {
        if (iframeRef.current && (window as any).Vimeo) {
            const player = new (window as any).Vimeo.Player(iframeRef.current);
            player.getMuted().then((muted: boolean) => {
                player.setMuted(!muted);
                setIsMuted(!muted);
            });
        } else {
            // Fallback: reload iframe with different muted parameter
            setIsMuted(!isMuted);
            if (iframeRef.current) {
                const currentSrc = iframeRef.current.src;
                const newSrc = isMuted
                    ? currentSrc.replace('&muted=1', '&muted=0')
                    : currentSrc.replace('&muted=0', '&muted=1');
                iframeRef.current.src = newSrc;
            }
        }
    };

    return (
        <div className="pt-32 pb-0 relative overflow-hidden bg-transparent">
            <div className="container mx-auto px-6 relative z-10">

                {/* Two-Column Header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">

                    {/* Left: Headline */}
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4 block">
                            Digital Marketing Agency Castells
                        </span>
                        <AnimatedHeading
                            as="h1"
                            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-text-primary mb-0"
                            delay={0.2}
                            duration={0.8}
                        >
                            We dominate<br />
                            <span className="text-coral italic font-semibold">local markets</span>
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

                {/* Testimonials Bar */}
                <div className="flex items-center justify-between py-8 border-t border-b border-black/10 dark:border-white/10 mb-12">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-text-secondary">
                            Partnering with contractors & service businesses since 2018.
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Avatars */}
                        <div className="flex -space-x-3">
                            {TESTIMONIAL_AVATARS.map((avatar, idx) => (
                                <img
                                    key={idx}
                                    src={avatar}
                                    alt={`Client ${idx + 1}`}
                                    className="w-10 h-10 rounded-full border-2 border-white dark:border-black"
                                />
                            ))}
                        </div>
                        {/* Rating */}
                        <div className="flex flex-col items-start">
                            <div className="flex gap-0.5 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-coral fill-coral" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-xs font-bold text-text-primary">
                                Trusted by 100+ Owners
                            </span>
                        </div>
                    </div>
                </div>

                {/* Client Logos Section */}
                <div className="mb-20 flex flex-col md:flex-row items-center gap-8 md:gap-12 border-t border-b border-black/5 dark:border-white/5 py-12">
                    <div className="shrink-0 max-w-sm text-center md:text-left">
                        <p className="text-lg md:text-xl font-sans leading-relaxed text-text-primary">
                            The world's best brands trust <br className="hidden md:block" />
                            <span className="text-text-secondary">Castells for Market Domination.</span>
                        </p>
                    </div>

                    <div className="flex-1 w-full overflow-hidden mask-linear-fade">
                        <Marquee className="items-center" velocity={0.8}>
                            {CLIENT_LOGOS.map((client, idx) => (
                                <div key={idx} className="mx-8 opacity-40 hover:opacity-100 transition-opacity duration-300 text-black dark:text-white cursor-pointer hover:scale-105 transform">
                                    {client.logo}
                                </div>
                            ))}
                        </Marquee>
                    </div>
                </div>
            </div>

            {/* Video Section - Contained Width */}
            <div className="container mx-auto px-6 pb-20">
                <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-black">
                    <iframe
                        ref={iframeRef}
                        src="https://player.vimeo.com/video/1101673750?h=7ccdfe1d0c&autoplay=1&muted=1&loop=1&controls=1&background=0&responsive=1&byline=0&title=0"
                        className="absolute inset-0 w-full h-full border-0"
                        frameBorder="0"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        allowFullScreen
                        title="vimeo-player"
                    />
                    {/* Sound Toggle Button */}
                    <button
                        onClick={toggleMute}
                        className="absolute bottom-4 right-4 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                        {isMuted ? (
                            <VolumeX className="w-5 h-5" />
                        ) : (
                            <Volume2 className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
