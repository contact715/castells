import React, { useState } from 'react';
import { Calendar, Phone, Mail, Send } from 'lucide-react';

// --- WHATSAPP ICON COMPONENT ---
const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
);

// --- CONTACT BUTTONS COMPONENT ---
export const ContactButtons = ({ defaultExpanded = 'Book call' }: { defaultExpanded?: string | null }) => {
    const [hoveredButton, setHoveredButton] = useState<string | null>(defaultExpanded);

    return (
        <div 
            className="flex items-center gap-2 flex-none"
            onMouseLeave={() => setHoveredButton(defaultExpanded)}
        >
            {[
                { label: 'Phone', cta: 'Call now', icon: Phone, href: 'tel:+15550000000', external: false },
                { label: 'WhatsApp', cta: 'WhatsApp', icon: WhatsAppIcon, href: 'https://whatsapp.com', external: true },
                { label: 'Telegram', cta: 'Telegram', icon: Send, href: 'https://t.me', external: true },
                { label: 'Email', cta: 'Email us', icon: Mail, href: 'mailto:hello@castells.studio', external: false },
                { label: 'Calendly', cta: 'Book call', icon: Calendar, href: 'https://calendly.com', external: true },
            ].map((m) => {
                const isExpanded = hoveredButton === m.cta;
                return (
                    <a
                        key={m.cta}
                        href={m.href}
                        target={m.external ? '_blank' : undefined}
                        rel={m.external ? 'noopener noreferrer' : undefined}
                        title={m.cta}
                        aria-label={m.cta}
                        onMouseEnter={() => setHoveredButton(m.cta)}
                        className={`group h-10 flex-none rounded-xl border transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden ${
                            isExpanded
                                ? 'w-[120px] bg-black text-white dark:bg-white dark:text-black border-transparent'
                                : 'w-10 bg-white/60 dark:bg-white/5 border-black/5 dark:border-white/10'
                        }`}
                    >
                        <m.icon className={`w-4 h-4 shrink-0 transition-colors duration-300 ${
                            isExpanded ? 'text-current' : 'text-text-secondary'
                        }`} />
                        <span className={`text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 ease-in-out ${
                            isExpanded
                                ? 'opacity-100 max-w-[90px] ml-2'
                                : 'opacity-0 max-w-0 ml-0'
                        }`}>
                            {m.cta}
                        </span>
                        <span className="sr-only">{m.cta}</span>
                    </a>
                );
            })}
        </div>
    );
};

