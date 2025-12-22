import React from 'react';
import { ArrowRight, Briefcase, Newspaper, Users } from 'lucide-react';
import { m as motion } from 'framer-motion';

const CARDS = [
    {
        icon: Briefcase,
        title: 'Impactful solutions',
        description: 'Discover our impactful projects on our works page.',
        linkText: 'Our works',
        href: '#work'
    },
    {
        icon: Newspaper,
        title: 'Keep up with the latest',
        description: 'Explore our blog for the latest insights and ideas from our team.',
        linkText: 'Read blog',
        href: '#blog'
    },
    {
        icon: Users,
        title: 'Want to join',
        description: 'Join our team and help shape the future - explore our Careers page.',
        linkText: 'Careers',
        href: '#careers'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
        }
    },
};

const DarkCTA: React.FC = () => {
    return (
        <section className="pt-12 md:pt-16 pb-24 bg-white text-black">
            <div className="container mx-auto px-6">

                {/* Big Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-16 max-w-4xl"
                >
                    Marketing isn't magic — <span className="text-text-secondary">it's strategy, data, and relentless execution that turns clicks into customers.</span>
                </motion.h2>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    {CARDS.map((card, idx) => (
                        <motion.a
                            key={idx}
                            href={card.href}
                            variants={cardVariants}
                            className="group bg-white  -black/10 hover:-coral/50 hover: rounded-[2rem] p-6 md:p-8 transition-all flex flex-col justify-between min-h-[240px]"
                        >
                            {/* Icon and Title */}
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-10 h-10 rounded-[2rem] bg-coral/10 flex items-center justify-center text-coral flex-shrink-0">
                                    <card.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-display text-lg font-semibold text-text-primary">
                                    {card.title}
                                </h3>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    {card.description}
                                </p>
                            </div>

                            {/* Link */}
                            <div className="flex items-center gap-2 mt-6 text-sm font-medium text-text-secondary group-hover:text-coral transition-colors">
                                <span>{card.linkText}</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default DarkCTA;
