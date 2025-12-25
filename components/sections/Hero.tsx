import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { m as motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Marquee } from '../ui/Marquee';
import AnimatedHeading from '../ui/AnimatedHeading';
import { ContactButtons } from '../ui/ContactButtons';
import SchemaMarkup from '../ui/SchemaMarkup';
import '../ui/Marquee.css';

// Professional logo components
const VortexLogo = () => (
    <svg viewBox="0 0 120 32" fill="currentColor" className="h-8 w-auto">
        <path d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8zm8-4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
        <path d="M28 8h8v16h-8V8zm2 2v12h4V10h-4z" />
        <path d="M42 8h12v2h-10v5h8v2h-8v5h10v2H42V8z" />
        <path d="M60 8h12v2h-5v14h-2V10h-5V8z" />
        <path d="M78 8h12v2h-5v14h-2V10h-5V8z" />
        <path d="M96 8h12v2h-5v6h5v2h-5v6h5v2H96V8z" />
    </svg>
);

const LuminaLogo = () => (
    <svg viewBox="0 0 120 32" fill="currentColor" className="h-8 w-auto">
        <circle cx="16" cy="16" r="10" />
        <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M32 8h8v16h-8V8zm2 2v12h4V10h-4z" />
        <path d="M48 8h12v2h-5v5h5v2h-5v5h5v2H48V8z" />
        <path d="M66 8h12v2h-5v14h-2V10h-5V8z" />
        <path d="M84 8h12v2h-5v14h-2V10h-5V8z" />
        <path d="M102 8h12v2h-5v6h5v2h-5v6h5v2H102V8z" />
    </svg>
);

const ApexLogo = () => (
    <svg viewBox="0 0 100 32" fill="currentColor" className="h-8 w-auto">
        <path d="M16 6L6 26h20L16 6z" />
        <path d="M32 8h8v16h-8V8zm2 2v12h4V10h-4z" />
        <path d="M48 8h12v2h-5v5h5v2h-5v5h5v2H48V8z" />
        <path d="M66 8h12v2h-5v14h-2V10h-5V8z" />
    </svg>
);

const OrbitalLogo = () => (
    <svg viewBox="0 0 120 32" fill="currentColor" className="h-8 w-auto">
        <ellipse cx="16" cy="16" rx="12" ry="6" transform="rotate(-45 16 16)" />
        <circle cx="16" cy="16" r="4" />
        <path d="M34 8h8v16h-8V8zm2 2v12h4V10h-4z" />
        <path d="M50 8h12v2h-5v5h5v2h-5v5h5v2H50V8z" />
        <path d="M68 8h12v2h-5v5h5v2h-5v5h5v2H68V8z" />
        <path d="M86 8h12v2h-5v5h5v2h-5v5h5v2H86V8z" />
        <path d="M104 8h12v2h-5v6h5v2h-5v6h5v2H104V8z" />
    </svg>
);

const NexusLogo = () => (
    <svg viewBox="0 0 110 32" fill="currentColor" className="h-8 w-auto">
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="14" y="14" width="12" height="12" rx="2" opacity="0.6" />
        <path d="M32 8h8v16h-8V8zm2 2v12h4V10h-4z" />
        <path d="M48 8h12v2h-5v5h5v2h-5v5h5v2H48V8z" />
        <path d="M66 8h12v2h-5v14h-2V10h-5V8z" />
        <path d="M84 8h12v2h-5v6h5v2h-5v6h5v2H84V8z" />
    </svg>
);

const StratosLogo = () => (
    <svg viewBox="0 0 120 32" fill="currentColor" className="h-8 w-auto">
        <path d="M6 22 Q16 8 26 22 M16 22 Q26 8 36 22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M44 8h8v16h-8V8zm2 2v12h4V10h-4z" />
        <path d="M60 8h12v2h-5v5h5v2h-5v5h5v2H60V8z" />
        <path d="M78 8h12v2h-5v5h5v2h-5v5h5v2H78V8z" />
        <path d="M96 8h12v2h-5v5h5v2h-5v5h5v2H96V8z" />
        <path d="M114 8h4v16h-4V8z" />
    </svg>
);

const EchoLogo = () => (
    <svg viewBox="0 0 100 32" fill="currentColor" className="h-8 w-auto">
        <path d="M12 26V6l16 10-16 10z" />
        <path d="M34 8h8v16h-8V8zm2 2v12h4V10h-4z" />
        <path d="M50 8h12v2h-5v5h5v2h-5v5h5v2H50V8z" />
        <path d="M68 8h12v2h-5v14h-2V10h-5V8z" />
    </svg>
);

const CLIENT_LOGOS = [
    { name: 'Vortex', logo: <VortexLogo /> },
    { name: 'Lumina', logo: <LuminaLogo /> },
    { name: 'Apex', logo: <ApexLogo /> },
    { name: 'Orbital', logo: <OrbitalLogo /> },
    { name: 'Nexus', logo: <NexusLogo /> },
    { name: 'Stratos', logo: <StratosLogo /> },
    { name: 'Echo', logo: <EchoLogo /> },
];

const Hero: React.FC = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const [vimeoScriptLoaded, setVimeoScriptLoaded] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);

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
            { rootMargin: '100px' } // Start loading 100px before entering viewport
        );

        observer.observe(videoContainerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [shouldLoadVideo]);

    // Load Vimeo Player API script only when video is about to load
    useEffect(() => {
        if (!shouldLoadVideo || vimeoScriptLoaded) return;

        // Check if script already exists
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

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://castells.agency';
    const videoId = '1101673750';

    return (
        <div className="pt-16 md:pt-20 pb-0 relative overflow-hidden bg-transparent">
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


                {/* Client Logos Section */}
                <div className="mb-20 flex flex-col md:flex-row items-center gap-8 md:gap-12 -t -b -black/5 dark:-white/5 py-12">
                    <div className="shrink-0 max-w-sm text-center md:text-left">
                        <p className="text-lg md:text-xl font-sans leading-relaxed text-text-primary">
                            America's best brands trust <br className="hidden md:block" />
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
            <div className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20" ref={videoContainerRef}>
                <div className="relative w-full aspect-video rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-black">
                    {shouldLoadVideo ? (
                        <>
                            <iframe
                                ref={iframeRef}
                                src="https://player.vimeo.com/video/1101673750?h=7ccdfe1d0c&autoplay=1&muted=1&loop=1&controls=1&background=0&responsive=1&byline=0&title=0"
                                className="absolute inset-0 w-full h-full -0"
                                frameBorder="0"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                                allowFullScreen
                                title="vimeo-player"
                                loading="lazy"
                            />
                            {/* Sound Toggle Button */}
                            <button
                                onClick={toggleMute}
                                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm  -white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
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
                            {/* Video Thumbnail Preview */}
                            <img
                                src={`https://vumbnail.com/${videoId}.jpg`}
                                alt="Video preview"
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                                loading="lazy"
                            />
                            {/* Play Button Overlay */}
                            <button
                                onClick={() => setShouldLoadVideo(true)}
                                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors cursor-pointer group"
                                aria-label="Play video"
                            >
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 hover:bg-white group-hover:scale-110 transition-all flex items-center justify-center">
                                    <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 text-black ml-1" />
                                </div>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;
