import React from 'react';
import { ArrowRight } from 'lucide-react';
import { m as motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Marquee } from '../ui/Marquee';
import '../ui/Marquee.css';

const TESTIMONIAL_AVATARS = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=4',
    'https://i.pravatar.cc/150?img=5',
];

const CLIENT_LOGOS = [
    'Client A',
    'Client B',
    'Client C',
    'Client D',
    'Client E',
    'Client F',
];

const Hero: React.FC = () => {
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
                        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-text-primary mb-0">
                            We dominate<br />
                            <span className="text-coral italic">local markets</span>
                        </h1>
                    </div>

                    {/* Right: Description + CTA */}
                    <div className="flex flex-col justify-end">
                        <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8">
                            From MVP to scalable results people actually want. We design, build, and optimize campaigns for contractors, service providers, and local businesses.
                        </p>
                        <div className="flex gap-4">
                            <Button
                                href="#audit"
                                size="md"
                                className="inline-flex items-center gap-2 group"
                            >
                                Contact us
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
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

                {/* Client Logos Marquee */}
                <div className="mb-16">
                    <Marquee className="font-display text-4xl md:text-5xl font-medium text-black/20 dark:text-white/20" velocity={1}>
                        {CLIENT_LOGOS.map((logo, idx) => (
                            <span key={idx}>{logo}</span>
                        ))}
                    </Marquee>
                </div>
            </div>

            {/* Video Section - Contained Width */}
            <div className="container mx-auto px-6 pb-20">
                <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[400px] rounded-[2rem] overflow-hidden shadow-2xl">
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
                    >
                        <source
                            src="/hero-video.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>
            </div>
        </div>
    );
};

export default Hero;
