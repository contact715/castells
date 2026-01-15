"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    Database,
    Cpu,
    Network,
    Layers,
    ExternalLink,
    Search,
    Filter
} from "lucide-react";

interface KBItem {
    id: string;
    title: string;
    description: string;
    specs: string[];
    tech: string[];
}

interface KBCategory {
    title: string;
    icon: any;
    items: KBItem[];
}

const DATABASE_DATA: KBCategory[] = [
    {
        title: "Блок 1: Основные Модули",
        icon: Layers,
        items: [
            {
                id: "inst-dash",
                title: "Institutional Dashboard",
                description: "Центральная аналитическая панель для управления всеми аспектами бизнеса в реальном времени.",
                specs: ["Агрегация KPI", "Прогнозирование выручки", "Управление доступом"],
                tech: ["Next.js", "Recharts", "Prisma"]
            },
            {
                id: "sales-cmd",
                title: "Sales Command Center",
                description: "Инструментарий для управления отделом продаж и повышения эффективности каждого агента.",
                specs: ["Лидерборды", "Распределение лидов", "Трекинг активности"],
                tech: ["Framer Motion", "Supabase", "Pusher"]
            },
            {
                id: "dialer",
                title: "Dialer Engine",
                description: "Высокоскоростная система обзвона с глубокой интеграцией в CRM.",
                specs: ["Click-to-Call", "Запись звонков", "Auto-logging"],
                tech: ["Twilio API", "WebRTC", "Redis"]
            },
            {
                id: "ai-inbox",
                title: "AI Chat Inbox",
                description: "Единая точка входа для всех текстовых коммуникаций с поддержкой ИИ.",
                specs: ["Multi-channel", "AI Suggest", "Авто-ответы"],
                tech: ["OpenAI", "WhatsApp Cloud API", "Node.js"]
            }
        ]
    },
    {
        title: "Блок 2: Инфраструктура Проекта",
        icon: Cpu,
        items: [
            {
                id: "core-stack",
                title: "Core Technology Stack",
                description: "Современный стек технологий для обеспечения максимальной скорости и масштабируемости.",
                specs: ["Server-side Rendering", "Atomic Design", "Edge Computing"],
                tech: ["TypeScript", "Tailwind CSS", "Vercel"]
            },
            {
                id: "security",
                title: "Security & Encryption",
                description: "Защита данных корпоративного уровня и соответствие стандартам безопасности.",
                specs: ["AES-256 Encryption", "RBAC", "Audit Logs"],
                tech: ["Auth.js", "SSL/TLS", "SOC2 Compliance"]
            }
        ]
    },
    {
        title: "Блок 3: AI & Data Science",
        icon: Database,
        items: [
            {
                id: "lead-profiler",
                title: "AI Lead Profiler",
                description: "Нейросетевой анализ поведения лидов для точного скоринга и предсказания конверсии.",
                specs: ["Intent Analysis", "Behavioral Scoring", "Auto-tagging"],
                tech: ["TensorFlow", "Python", "Vector DB"]
            },
            {
                id: "conv-intelligence",
                title: "Conversation Intelligence",
                description: "Автоматическая транскрибация и анализ смыслов каждого диалога.",
                specs: ["Speech-to-Text", "Sentiment Analysis", "Key Insights"],
                tech: ["Whisper AI", "GPT-4o", "Pinecone"]
            }
        ]
    }
];

export const KnowledgeBase: React.FC = () => {
    const [activeId, setActiveId] = useState<string | null>(DATABASE_DATA[0].items[0].id);
    const [searchQuery, setSearchQuery] = useState("");

    const allItems = DATABASE_DATA.flatMap(cat => cat.items);
    const activeItem = allItems.find(item => item.id === activeId) || allItems[0];

    return (
        <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                            MOSCO Database
                        </h2>
                        <p className="text-xl text-white/50">
                            Полная структура проекта, модулей и технологического стека платформы.
                        </p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                            type="text"
                            placeholder="Поиск по базе знаний..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-coral/50 transition-colors"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Sidebar - TOC Style */}
                    <div className="lg:col-span-3 space-y-8">
                        {DATABASE_DATA.map((category, catIdx) => (
                            <div key={catIdx} className="space-y-4">
                                <div className="flex items-center gap-3 text-white/30 mb-4 px-2">
                                    <category.icon className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{category.title}</span>
                                </div>
                                <div className="space-y-1">
                                    {category.items.filter(item =>
                                        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        category.title.toLowerCase().includes(searchQuery.toLowerCase())
                                    ).map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveId(item.id)}
                                            className={`w-full group flex items-center justify-between px-3 py-2 rounded-xl transition-all ${activeId === item.id
                                                    ? "bg-coral/10 text-coral border border-coral/20"
                                                    : "text-white/40 hover:text-white/80 hover:bg-white/5 border border-transparent"
                                                }`}
                                        >
                                            <span className="text-[13px] font-bold truncate">{item.title}</span>
                                            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeId === item.id ? "rotate-90" : "opacity-0 group-hover:opacity-100"
                                                }`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Content - Detailed Database View */}
                    <div className="lg:col-span-9">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white/[0.03] border border-white/10 rounded-card p-8 lg:p-12 min-h-[500px] flex flex-col shadow-2xl relative overflow-hidden"
                            >
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-coral/5 blur-[100px] -z-10 rounded-full" />

                                <div className="flex items-start justify-between mb-10">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-coral/20 text-coral text-[10px] font-bold rounded-full border border-coral/20 uppercase tracking-widest">
                                                Database Entry
                                            </span>
                                            <span className="text-white/20 text-xs font-mono">ID: {activeItem.id}</span>
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-display font-semibold text-white mb-6">
                                            {activeItem.title}
                                        </h3>
                                    </div>
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 shadow-sm">
                                        <Database className="w-8 h-8" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-1">
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">Описание</h4>
                                            <p className="text-xl text-white/70 leading-relaxed font-medium">
                                                {activeItem.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4 pt-4">
                                            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white transition-all group">
                                                Просмотреть документацию
                                                <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-10">
                                        <div>
                                            <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                                <Filter className="w-3 h-3" />
                                                Спецификации
                                            </h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                {activeItem.specs.map((spec, i) => (
                                                    <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white/80 font-bold">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-coral" />
                                                        {spec}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                                <Network className="w-3 h-3" />
                                                Стек технологий
                                            </h4>
                                            <div className="flex flex-wrap gap-2 text-white/30 text-xs">
                                                {activeItem.tech.map((t, i) => (
                                                    <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg font-mono">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KnowledgeBase;
