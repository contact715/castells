import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, MessageCircle, Send, Mail, ArrowRight, CheckCircle2, Users, Briefcase, FileText, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { cn } from '../../lib/utils';
import AnimatedHeading from '../ui/AnimatedHeading';
import { PageHeader } from '../ui/PageHeader';
import SEO from '../ui/SEO';
import type { NavigateFn } from '../../types';

interface ContactPageProps {
    onNavigate?: NavigateFn;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        topic: 'web-design',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormState({ name: '', email: '', phone: '', topic: 'web-design', message: '' });

        // Navigate to thank you page after successful submission
        if (onNavigate) {
            setTimeout(() => {
                // Pass type as 'contact' for contact form submissions
                onNavigate('thank-you', { name: 'contact' });
            }, 500);
        }
    };

    const contactMethods = [
        { icon: Calendar, label: 'Calendly', value: 'Schedule a call', href: 'https://calendly.com', color: 'bg-blue-500/10 text-blue-500' },
        { icon: Phone, label: 'Phone Call', value: '+1 (555) 000-0000', href: 'tel:+15550000000', color: 'bg-green-500/10 text-green-500' },
        { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: 'https://whatsapp.com', color: 'bg-emerald-500/10 text-emerald-500' },
        { icon: Send, label: 'Telegram', value: '@castells_agency', href: 'https://t.me', color: 'bg-sky-500/10 text-sky-500' },
    ];

    return (
        <>
            <SEO 
                title="Contact Us | Castells Agency" 
                description="Ready to dominate your market? Schedule a free strategy session and let's discuss how we can help you achieve your goals."
                canonical="/contact"
            />
            <div className="min-h-screen bg-ivory pt-16 md:pt-20 pb-20 font-sans selection:bg-coral selection:text-white transition-colors duration-500">
            <div className="container mx-auto px-6 pt-4 md:pt-6">

                {/* Header */}
                <PageHeader
                    breadcrumbs={[
                        { label: 'Home', action: () => onNavigate?.('home') },
                        { label: 'Contact us', active: true }
                    ]}
                    badge="Get in Touch"
                    title="Let's make something great together"
                    description="Ready to dominate your market? Schedule a free strategy session and let's discuss how we can help you achieve your goals."
                    onNavigate={onNavigate}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-32">

                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7 lg:sticky lg:top-32 h-fit"
                    >
                        <div className="bg-white dark:bg-surface rounded-[2rem] p-8 md:p-10  -black/5 dark:-white/5 ">
                            {/* Form Header */}
                            <div className="mb-8">
                                <h3 className="font-display text-2xl font-semibold text-text-primary mb-2">
                                    Start a project
                                </h3>
                                <p className="text-text-secondary text-sm">
                                    Fill out the form and we'll get back to you within 24 hours.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name & Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        type="text"
                                        label="Name"
                                        required
                                        placeholder="Your full name"
                                        value={formState.name}
                                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                                    />
                                    <Input
                                        type="email"
                                        label="Email"
                                        required
                                        placeholder="Your email"
                                        value={formState.email}
                                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                                    />
                                </div>

                                {/* Phone & Topic Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-text-secondary ml-1">Phone (optional)</label>
                                        <div className="flex gap-2">
                                            <div className="w-16 bg-ivory dark:bg-white/5  -black/5 dark:-white/5 rounded-[2rem] flex items-center justify-center text-text-secondary font-medium text-xs">
                                                🇺🇸 +1
                                            </div>
                                            <input
                                                type="tel"
                                                id="phone"
                                                placeholder="(555) 000-0000"
                                                value={formState.phone}
                                                onChange={e => setFormState({ ...formState, phone: e.target.value })}
                                                className="flex-1 bg-ivory dark:bg-white/5  -black/5 dark:-white/5 rounded-[2rem] px-4 py-3 text-sm focus:outline-none focus:-coral transition-all placeholder:text-text-secondary/50"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label htmlFor="topic" className="text-xs font-bold uppercase tracking-wider text-text-secondary ml-1">Service</label>
                                        <div className="relative">
                                            <select
                                                id="topic"
                                                className="w-full bg-ivory dark:bg-white/5  -black/5 dark:-white/5 rounded-[2rem] px-4 py-3 text-sm focus:outline-none focus:-coral transition-all appearance-none cursor-pointer text-text-primary"
                                                value={formState.topic}
                                                onChange={e => setFormState({ ...formState, topic: e.target.value })}
                                            >
                                                <option value="web-design">Web Design & Development</option>
                                                <option value="marketing">Digital Marketing</option>
                                                <option value="branding">Branding & Identity</option>
                                                <option value="automation">Automation & Analytics</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary/50">
                                                <ArrowRight className="w-4 h-4 rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-1.5">
                                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-text-secondary ml-1">Project details *</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        className="w-full bg-ivory dark:bg-white/5  -black/5 dark:-white/5 rounded-[2rem] px-4 py-3 text-sm focus:outline-none focus:-coral transition-all placeholder:text-text-secondary/50 resize-none"
                                        placeholder="Tell us about your project, goals, and timeline..."
                                        value={formState.message}
                                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                                    />
                                </div>

                                {/* Submit */}
                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full group"
                                        disabled={isSubmitting || isSuccess}
                                    >
                                        {isSubmitting ? 'Sending...' : isSuccess ? (
                                            <>
                                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                                Message Sent!
                                            </>
                                        ) : (
                                            <>
                                                Send Request
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                    <p className="text-[10px] text-text-secondary mt-4 text-center">
                                        By clicking \"Send Request\", you consent to our{' '}
                                        <button
                                            type="button"
                                            onClick={() => onNavigate?.('privacy-policy')}
                                            className="text-coral hover:underline cursor-pointer"
                                        >
                                            Privacy Policy
                                        </button>
                                        .
                                    </p>
                                </div>
                            </form>
                        </div>
                    </motion.div>

                    {/* Right Column: Content (Scrollable) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        {/* Contact Methods Grid */}
                        <div className="grid grid-cols-1 gap-6">
                            {/* Let's Talk Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="bg-white dark:bg-surface rounded-[32px] p-10  -black/5 dark:-white/5  hover: transition-all duration-300"
                            >
                                <h3 className="font-display text-xl font-semibold mb-2 text-text-primary flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-coral" /> Let's talk
                                </h3>
                                <p className="text-text-secondary text-sm mb-10">Pick what works best for you.</p>

                                <div className="space-y-6">
                                    {contactMethods.map((method, index) => (
                                        <motion.a
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                                            href={method.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-3 -mx-3 rounded-xl group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="text-text-secondary group-hover:text-white dark:group-hover:text-black transition-colors">
                                                    <method.icon className="w-5 h-5" />
                                                </div>
                                                <span className="font-medium text-base text-text-primary group-hover:text-white dark:group-hover:text-black transition-colors">
                                                    {method.label}
                                                </span>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-text-secondary/50 group-hover:text-white dark:group-hover:text-black transition-colors" />
                                        </motion.a>
                                    ))}
                                    {/* Discord */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8, duration: 0.4 }}
                                        className="flex items-center justify-between p-3 -mx-3 rounded-xl group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="text-text-secondary group-hover:text-white dark:group-hover:text-black transition-colors">
                                                <MessageCircle className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium text-base text-text-primary group-hover:text-white dark:group-hover:text-black transition-colors">
                                                Discord
                                            </span>
                                        </div>
                                        <span className="text-xs text-text-secondary group-hover:text-white/70 dark:group-hover:text-black/70 flex items-center gap-2 transition-colors">
                                            castells_agency <span className="opacity-50">❐</span>
                                        </span>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Drop a Message Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="bg-white dark:bg-surface rounded-[32px] p-10  -black/5 dark:-white/5  hover: transition-all duration-300"
                            >
                                <h3 className="font-display text-xl font-semibold mb-2 text-text-primary flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-coral" /> Drop a message
                                </h3>
                                <p className="text-text-secondary text-sm mb-10">We'll get back soon.</p>

                                <div className="space-y-6">
                                    {[
                                        { email: 'hello@castells.studio', label: 'General Purpose' },
                                        { email: 'partners@castells.studio', label: 'Partnership' },
                                        { email: 'careers@castells.studio', label: 'Careers' }
                                    ].map((item, index) => (
                                        <motion.a
                                            key={item.email}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                                            href={`mailto:${item.email}`}
                                            className="flex items-center justify-between p-3 -mx-3 rounded-xl group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-coral group-hover:text-white dark:group-hover:text-black text-lg transition-colors">@</span>
                                                <span className="font-medium text-base text-text-primary group-hover:text-white dark:group-hover:text-black transition-colors">{item.label}</span>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-text-secondary/50 group-hover:text-white dark:group-hover:text-black transition-colors" />
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>



                {/* Testimonials Section */}
                <div className="mb-32">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
                        <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                            Testimonials
                        </span>
                    </div>
                    <AnimatedHeading
                        as="h2"
                        className="font-display text-3xl md:text-4xl font-semibold text-black dark:text-white mb-12"
                        delay={0.2}
                    >
                        What people say
                    </AnimatedHeading>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                        {/* Visual / Video Preview */}
                        <div className="lg:col-span-4 relative min-h-[360px] rounded-[2rem] overflow-hidden  -black/5 dark:-white/10 group/image">
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                                alt="Client testimonial"
                                className="absolute inset-0 w-full h-full object-cover grayscale group-hover/image:grayscale-0 transition-all duration-500"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                            {/* Play Button */}
                            <div className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full flex items-center justify-center  group-hover/image:scale-110 transition-transform">
                                <Play className="w-5 h-5 text-black fill-current ml-1" />
                            </div>

                            {/* Badge */}
                            <div className="absolute top-6 left-6">
                                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm  -white/20 text-white text-xs font-bold uppercase tracking-widest">
                                    5.0 rating · Clutch
                                </div>
                            </div>
                        </div>

                        {/* Quote */}
                        <div className="lg:col-span-8 bg-white dark:bg-surface rounded-[2rem] p-8 md:p-12 flex flex-col justify-between  -black/5 dark:-white/10  hover: transition-all duration-300 relative overflow-hidden">
                            {/* Subtle background */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-coral/10 blur-3xl" />
                            </div>

                            <div className="relative">
                                {/* Quote Icon */}
                                <div className="text-coral text-5xl font-serif leading-none mb-8">“</div>

                                <p className="text-xl md:text-3xl font-light leading-relaxed text-text-primary dark:text-white/90 mb-10">
                                    Castells Agency&apos;s ability to turn ideas into solutions was outstanding.
                                </p>

                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div>
                                        <h4 className="font-semibold text-text-primary dark:text-white text-lg mb-1">
                                            Sunil Chauhan
                                        </h4>
                                        <div className="flex items-center gap-2 text-text-secondary dark:text-white/40 text-xs uppercase tracking-wider font-medium">
                                            <span>Executive at</span>
                                            <span className="text-text-primary dark:text-white/60">Twister Digital</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 text-text-secondary dark:text-white/60 text-[10px] font-bold uppercase tracking-widest">
                                            Project delivered
                                        </span>
                                        <span className="px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 text-text-secondary dark:text-white/60 text-[10px] font-bold uppercase tracking-widest">
                                            Fast turnaround
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Link (hover like menu) */}
                            <a
                                href="https://clutch.co"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-10 p-3 -mx-3 rounded-xl flex items-center justify-between group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
                                aria-label="Read this review on Clutch"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-coral flex items-center justify-center text-white font-bold text-[10px]">
                                        C
                                    </div>
                                    <span className="font-medium text-sm text-text-primary dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors">
                                        Read on Clutch
                                    </span>
                                </div>
                                <ArrowRight className="w-5 h-5 text-text-secondary/50 dark:text-white/40 group-hover:text-white dark:group-hover:text-black transition-colors -rotate-45" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Grid (Moved) */}
                <div className="mb-32">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
                        <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                            Discover
                        </span>
                    </div>
                    <AnimatedHeading
                        as="h2"
                        className="font-display text-3xl md:text-4xl font-semibold text-black dark:text-white mb-12"
                        delay={0.2}
                    >
                        Explore our world
                    </AnimatedHeading>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            href="/about"
                            onClick={(e) => { e.preventDefault(); onNavigate?.('about'); }}
                            className="bg-white dark:bg-surface p-8 rounded-[2rem] h-full flex flex-col items-start  -black/5 dark:-white/10 transition-all duration-300 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover: hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-[2rem] bg-black/5 dark:bg-white/10 flex items-center justify-center text-black dark:text-white flex-shrink-0 group-hover:bg-white/10 group-hover:text-white dark:group-hover:bg-black/5 dark:group-hover:text-black transition-colors duration-300">
                                    <Users className="w-6 h-6 stroke-[1.5]" />
                                </div>
                                <h3 className="font-display font-semibold text-2xl text-black dark:text-white leading-tight group-hover:text-white dark:group-hover:text-black transition-colors">
                                    Who we are
                                </h3>
                            </div>
                            <p className="text-text-secondary dark:text-white/60 text-sm leading-relaxed mb-6 group-hover:text-white/80 dark:group-hover:text-black/70 transition-colors">
                                Learn more about who we are and what drives us.
                            </p>
                            <div className="flex items-center gap-2 text-text-secondary dark:text-white/60 text-xs font-bold uppercase tracking-wider group-hover:text-white dark:group-hover:text-black transition-colors mt-auto">
                                About us <ArrowRight className="w-3 h-3 -rotate-45" />
                            </div>
                        </motion.a>

                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            href="/work"
                            onClick={(e) => { e.preventDefault(); onNavigate?.('work'); }}
                            className="bg-white dark:bg-surface p-8 rounded-[2rem] h-full flex flex-col items-start  -black/5 dark:-white/10 transition-all duration-300 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover: hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-[2rem] bg-black/5 dark:bg-white/10 flex items-center justify-center text-black dark:text-white flex-shrink-0 group-hover:bg-white/10 group-hover:text-white dark:group-hover:bg-black/5 dark:group-hover:text-black transition-colors duration-300">
                                    <Briefcase className="w-6 h-6 stroke-[1.5]" />
                                </div>
                                <h3 className="font-display font-semibold text-2xl text-black dark:text-white leading-tight group-hover:text-white dark:group-hover:text-black transition-colors">
                                    Impactful solutions
                                </h3>
                            </div>
                            <p className="text-text-secondary dark:text-white/60 text-sm leading-relaxed mb-6 group-hover:text-white/80 dark:group-hover:text-black/70 transition-colors">
                                Discover our impactful projects.
                            </p>
                            <div className="flex items-center gap-2 text-text-secondary dark:text-white/60 text-xs font-bold uppercase tracking-wider group-hover:text-white dark:group-hover:text-black transition-colors mt-auto">
                                Our works <ArrowRight className="w-3 h-3 -rotate-45" />
                            </div>
                        </motion.a>

                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            href="/blog"
                            onClick={(e) => { e.preventDefault(); onNavigate?.('blog'); }}
                            className="bg-white dark:bg-surface p-8 rounded-[2rem] h-full flex flex-col items-start  -black/5 dark:-white/10 transition-all duration-300 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover: hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-[2rem] bg-black/5 dark:bg-white/10 flex items-center justify-center text-black dark:text-white flex-shrink-0 group-hover:bg-white/10 group-hover:text-white dark:group-hover:bg-black/5 dark:group-hover:text-black transition-colors duration-300">
                                    <FileText className="w-6 h-6 stroke-[1.5]" />
                                </div>
                                <h3 className="font-display font-semibold text-2xl text-black dark:text-white leading-tight group-hover:text-white dark:group-hover:text-black transition-colors">
                                    Keep up with the latest
                                </h3>
                            </div>
                            <p className="text-text-secondary dark:text-white/60 text-sm leading-relaxed mb-6 group-hover:text-white/80 dark:group-hover:text-black/70 transition-colors">
                                Explore our blog for the latest insights and ideas from our team.
                            </p>
                            <div className="flex items-center gap-2 text-text-secondary dark:text-white/60 text-xs font-bold uppercase tracking-wider group-hover:text-white dark:group-hover:text-black transition-colors mt-auto">
                                Read blog <ArrowRight className="w-3 h-3 -rotate-45" />
                            </div>
                        </motion.a>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
};

export default ContactPage;
