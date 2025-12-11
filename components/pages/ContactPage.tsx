import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, MessageCircle, Send, Mail, ArrowRight, CheckCircle2, Users, Briefcase, FileText, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { RippleButton } from '../ui/RippleButton';
import { cn } from '../../lib/utils';

import { Breadcrumbs } from '../ui/Breadcrumbs';
import { PageView } from '../../App';

interface ContactPageProps {
    onNavigate?: (page: PageView) => void;
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

        setTimeout(() => setIsSuccess(false), 5000);
    };

    const contactMethods = [
        { icon: Calendar, label: 'Calendly', value: 'Schedule a call', href: 'https://calendly.com', color: 'bg-blue-500/10 text-blue-500' },
        { icon: Phone, label: 'Phone Call', value: '+1 (555) 000-0000', href: 'tel:+15550000000', color: 'bg-green-500/10 text-green-500' },
        { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: 'https://whatsapp.com', color: 'bg-emerald-500/10 text-emerald-500' },
        { icon: Send, label: 'Telegram', value: '@castells_agency', href: 'https://t.me', color: 'bg-sky-500/10 text-sky-500' },
    ];

    return (
        <div className="min-h-screen bg-ivory dark:bg-stone-950 text-black dark:text-white pt-32 pb-20 font-sans selection:bg-coral selection:text-white transition-colors duration-500">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="mb-20">
                    <div className="mb-8">
                        <Breadcrumbs
                            items={[
                                { label: 'Home', action: () => onNavigate?.('home') },
                                { label: 'Contact us', active: true }
                            ]}
                        />
                    </div>
                    <h1 className="font-display text-5xl md:text-7xl font-bold text-black dark:text-white leading-[1.1] max-w-3xl">
                        Let's make something <span className="text-coral italic">great</span> together
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-32 items-start">

                    {/* Left Column: Form (Fixed/Sticky) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-[60%] lg:sticky lg:top-32"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-text-secondary ml-1">Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-coral dark:focus:border-coral focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-black/20 dark:placeholder:text-white/20"
                                        placeholder="Your full name"
                                        value={formState.name}
                                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-text-secondary ml-1">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-coral dark:focus:border-coral focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-black/20 dark:placeholder:text-white/20"
                                        placeholder="Your email"
                                        value={formState.email}
                                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-text-secondary ml-1">Phone (optional)</label>
                                    <div className="flex gap-3">
                                        <div className="w-20 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl flex items-center justify-center text-text-secondary font-medium text-sm">
                                            🇺🇸 +1
                                        </div>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="flex-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-coral dark:focus:border-coral focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-black/20 dark:placeholder:text-white/20"
                                            placeholder="(555) 000-0000"
                                            value={formState.phone}
                                            onChange={e => setFormState({ ...formState, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="topic" className="text-xs font-bold uppercase tracking-wider text-text-secondary ml-1">Let's talk about</label>
                                    <div className="relative">
                                        <select
                                            id="topic"
                                            className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-coral dark:focus:border-coral focus:bg-white dark:focus:bg-white/10 transition-all appearance-none cursor-pointer text-black dark:text-white"
                                            value={formState.topic}
                                            onChange={e => setFormState({ ...formState, topic: e.target.value })}
                                        >
                                            <option value="" disabled>Project inquiry</option>
                                            <option value="web-design" className="bg-ivory dark:bg-stone-950">Web Design & Development</option>
                                            <option value="marketing" className="bg-ivory dark:bg-stone-950">Digital Marketing</option>
                                            <option value="branding" className="bg-ivory dark:bg-stone-950">Branding & Identity</option>
                                            <option value="other" className="bg-ivory dark:bg-stone-950">Other</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/40 dark:text-white/40">
                                            <ArrowRight className="w-4 h-4 rotate-90" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-text-secondary ml-1">What do you have in mind? *</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={3}
                                        className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-coral dark:focus:border-coral focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-black/20 dark:placeholder:text-white/20 resize-none"
                                        placeholder="Briefly describe your idea or challenge..."
                                        value={formState.message}
                                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <RippleButton
                                    type="submit"
                                    className="w-full py-4 bg-black text-white dark:bg-white dark:text-black font-bold text-base rounded-xl transition-all shadow-lg hover:shadow-xl"
                                    rippleColor="#E08576"
                                    disabled={isSubmitting || isSuccess}
                                >
                                    {isSubmitting ? 'Sending...' : isSuccess ? 'Message Sent!' : "Send Request"}
                                </RippleButton>
                                <p className="text-[10px] text-text-secondary mt-3 text-center">
                                    By clicking "Send Request", you consent to our Privacy Policy.
                                </p>
                            </div>
                        </form>
                    </motion.div>

                    {/* Right Column: Content (Scrollable) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:w-[40%] space-y-12"
                    >
                        {/* Contact Methods Grid */}
                        {/* Contact Methods Grid */}
                        <div className="grid grid-cols-1 gap-6">
                            {/* Let's Talk Card */}
                            <div className="bg-white rounded-[32px] p-10 border border-black/5 shadow-sm hover:shadow-md transition-all duration-300">
                                <h3 className="font-display text-xl font-bold mb-2 text-text-primary flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-coral" /> Let's talk
                                </h3>
                                <p className="text-text-secondary text-sm mb-10">Pick what works best for you.</p>

                                <div className="space-y-6">
                                    {contactMethods.map((method, index) => (
                                        <a
                                            key={index}
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
                                        </a>
                                    ))}
                                    {/* Discord */}
                                    <div className="flex items-center justify-between p-3 -mx-3 rounded-xl group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer">
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
                                    </div>
                                </div>
                            </div>

                            {/* Drop a Message Card */}
                            <div className="bg-white rounded-[32px] p-10 border border-black/5 shadow-sm hover:shadow-md transition-all duration-300">
                                <h3 className="font-display text-xl font-bold mb-2 text-text-primary flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-coral" /> Drop a message
                                </h3>
                                <p className="text-text-secondary text-sm mb-10">We'll get back soon.</p>

                                <div className="space-y-6">
                                    <a href="mailto:hello@castells.studio" className="flex items-center justify-between p-3 -mx-3 rounded-xl group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <span className="text-coral group-hover:text-white dark:group-hover:text-black text-lg transition-colors">@</span>
                                            <span className="font-medium text-base text-text-primary group-hover:text-white dark:group-hover:text-black transition-colors">General Purpose</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-text-secondary/50 group-hover:text-white dark:group-hover:text-black transition-colors" />
                                    </a>
                                    <a href="mailto:partners@castells.studio" className="flex items-center justify-between p-3 -mx-3 rounded-xl group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <span className="text-coral group-hover:text-white dark:group-hover:text-black text-lg transition-colors">@</span>
                                            <span className="font-medium text-base text-text-primary group-hover:text-white dark:group-hover:text-black transition-colors">Partnership</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-text-secondary/50 group-hover:text-white dark:group-hover:text-black transition-colors" />
                                    </a>
                                    <a href="mailto:careers@castells.studio" className="flex items-center justify-between p-3 -mx-3 rounded-xl group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <span className="text-coral group-hover:text-white dark:group-hover:text-black text-lg transition-colors">@</span>
                                            <span className="font-medium text-base text-text-primary group-hover:text-white dark:group-hover:text-black transition-colors">Careers</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-text-secondary/50 group-hover:text-white dark:group-hover:text-black transition-colors" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Grid */}

                    </motion.div>
                </div>



                {/* Testimonials Section */}
                <div className="mb-32">
                    <p className="text-xs font-bold uppercase tracking-widest text-coral mb-6">Testimonials</p>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-black dark:text-white mb-12">What people say</h2>

                    <div className="relative group">
                        {/* Navigation Arrows (Absolute) */}
                        <button className="absolute -left-12 top-1/2 -translate-y-1/2 p-2 text-black/20 dark:text-white/20 hover:text-coral transition-colors hidden xl:block">
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <button className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 text-black/20 dark:text-white/20 hover:text-coral transition-colors hidden xl:block">
                            <ChevronRight className="w-8 h-8" />
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                            {/* Image Card */}
                            <div className="lg:col-span-4 relative aspect-[3/4] lg:aspect-auto lg:h-full min-h-[400px] rounded-3xl overflow-hidden group/image cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                                    alt="Client"
                                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover/image:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover/image:bg-transparent transition-colors" />

                                {/* Play Button */}
                                <div className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg group-hover/image:scale-110 transition-transform">
                                    <Play className="w-5 h-5 text-black fill-current ml-1" />
                                </div>
                            </div>

                            {/* Quote Card */}
                            <div className="lg:col-span-8 bg-white dark:bg-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between border border-black/5 dark:border-white/5 relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                <div>
                                    {/* Quote Icon */}
                                    <div className="text-coral text-5xl font-serif leading-none mb-8">“</div>

                                    <p className="text-xl md:text-3xl font-light leading-relaxed text-text-primary dark:text-white/90 mb-12">
                                        Castells Agency's ability to turn ideas into solutions was outstanding.
                                    </p>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-text-primary dark:text-white text-lg mb-1">Sunil Chauhan</h4>
                                        <div className="flex items-center gap-2 text-text-secondary dark:text-white/40 text-xs uppercase tracking-wider font-medium">
                                            <span>Executive at</span>
                                            <span className="text-text-primary dark:text-white/60">Twister Digital</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Link */}
                                <div className="pt-8 border-t border-black/5 dark:border-white/10 flex items-center justify-between group/link cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-coral flex items-center justify-center text-white font-bold text-[10px]">C</div>
                                        <span className="text-text-primary dark:text-white font-medium text-sm group-hover/link:text-coral transition-colors">Read on Clutch</span>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-text-secondary/50 dark:text-white/40 group-hover/link:text-coral transition-colors -rotate-45" />
                                </div>
                            </div>
                        </div>

                        {/* Pagination Dots */}
                        <div className="flex justify-center gap-3 mt-8">
                            <button className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white transition-colors" />
                            <button className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40 transition-colors" />
                            <button className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40 transition-colors" />
                            <button className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40 transition-colors" />
                            <button className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40 transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Bottom Grid (Moved) */}
                <div className="mb-32">
                    <p className="text-xs font-bold uppercase tracking-widest text-coral mb-6">Discover</p>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-black dark:text-white mb-12">Explore our world</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <a href="#about" className="bg-white dark:bg-surface p-8 rounded-[2rem] h-full flex flex-col items-start hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-black/5 dark:border-white/5 group cursor-pointer">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-[#F4F4F2] dark:bg-white/10 flex items-center justify-center text-black dark:text-white flex-shrink-0 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                                    <Users className="w-6 h-6 stroke-[1.5]" />
                                </div>
                                <h3 className="font-display font-bold text-2xl text-black dark:text-white leading-tight">
                                    Who we are
                                </h3>
                            </div>
                            <p className="text-text-secondary text-sm leading-relaxed mb-6">
                                Learn more about who we are and what drives us.
                            </p>
                            <div className="flex items-center gap-2 text-text-secondary text-xs font-bold uppercase tracking-wider group-hover:text-coral transition-colors mt-auto">
                                About us <ArrowRight className="w-3 h-3" />
                            </div>
                        </a>

                        <a href="#work" className="bg-white dark:bg-surface p-8 rounded-[2rem] h-full flex flex-col items-start hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-black/5 dark:border-white/5 group cursor-pointer">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-[#F4F4F2] dark:bg-white/10 flex items-center justify-center text-black dark:text-white flex-shrink-0 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                                    <Briefcase className="w-6 h-6 stroke-[1.5]" />
                                </div>
                                <h3 className="font-display font-bold text-2xl text-black dark:text-white leading-tight">
                                    Impactful solutions
                                </h3>
                            </div>
                            <p className="text-text-secondary text-sm leading-relaxed mb-6">
                                Discover our impactful projects.
                            </p>
                            <div className="flex items-center gap-2 text-text-secondary text-xs font-bold uppercase tracking-wider group-hover:text-coral transition-colors mt-auto">
                                Our works <ArrowRight className="w-3 h-3" />
                            </div>
                        </a>

                        <a href="#blog" className="bg-white dark:bg-surface p-8 rounded-[2rem] h-full flex flex-col items-start hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-black/5 dark:border-white/5 group cursor-pointer">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-[#F4F4F2] dark:bg-white/10 flex items-center justify-center text-black dark:text-white flex-shrink-0 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                                    <FileText className="w-6 h-6 stroke-[1.5]" />
                                </div>
                                <h3 className="font-display font-bold text-2xl text-black dark:text-white leading-tight">
                                    Keep up with the latest
                                </h3>
                            </div>
                            <p className="text-text-secondary text-sm leading-relaxed mb-6">
                                Explore our blog for the latest insights and ideas from our team.
                            </p>
                            <div className="flex items-center gap-2 text-text-secondary text-xs font-bold uppercase tracking-wider group-hover:text-coral transition-colors mt-auto">
                                Read blog <ArrowRight className="w-3 h-3" />
                            </div>
                        </a>
                    </div>
                </div>

            </div >
        </div >
    );
};

export default ContactPage;
