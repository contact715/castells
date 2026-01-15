"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ScrollText } from "@/components/ui/ScrollText";
import { ModuleSpinSection } from "@/components/landing/ModuleSpinSection";
import { KnowledgeBase } from "@/components/landing/KnowledgeBase";
import {
  Zap,
  LayoutDashboard,
  Target,
  Phone,
  MessageCircle,
  FileText,
  Brain,
  MessagesSquare,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// Module SPIN Data
const MODULES = [
  {
    name: "Institutional Dashboard",
    icon: LayoutDashboard,
    accentColor: "#6366F1",
    situation: "У вас множество источников данных о продажах — CRM, таблицы, звонки, чаты.",
    problem: "Нет единого источника правды. Каждый отчёт показывает разные цифры.",
    implication: "Решения принимаются на основе устаревших данных. Цели не достигаются.",
    needPayoff: "Единый дашборд с real-time метриками всей команды в одном месте.",
  },
  {
    name: "Sales Command Center",
    icon: Target,
    accentColor: "#EF4444",
    situation: "Ваши сейлзы работают с лидами вручную — в табличках и блокнотах.",
    problem: "Лиды теряются. Нет контроля кто над чем работает.",
    implication: "Упущенная выручка. Разочарованные менеджеры. Хаос.",
    needPayoff: "Командный центр с live-лидербордами и визуальным контролем каждого лида.",
  },
  {
    name: "Dialer Engine",
    icon: Phone,
    accentColor: "#F59E0B",
    situation: "Каждый звонок требует 3-5 минут подготовки — найти номер, открыть CRM, записать.",
    problem: "Speed-to-lead падает. Конверсия страдает.",
    implication: "Каждый час задержки = на 400% меньше конверсий.",
    needPayoff: "Мгновенный click-to-call с авто-логированием в CRM и записью разговоров.",
  },
  {
    name: "AI Chat Inbox",
    icon: MessageCircle,
    accentColor: "#10B981",
    situation: "Лиды приходят из 5+ каналов — сайт, WhatsApp, Telegram, Instagram, звонки.",
    problem: "Переписки разбросаны. Время ответа растёт.",
    implication: "Лид выбирает конкурента, который ответил первым.",
    needPayoff: "Единый inbox со всеми каналами и AI-подсказками для быстрых ответов.",
  },
  {
    name: "Lead Forms",
    icon: FileText,
    accentColor: "#8B5CF6",
    situation: "Вы используете стандартные контактные формы на сайте.",
    problem: "Низкая конверсия. Нет квалификации лидов.",
    implication: "Рекламный бюджет тратится на нецелевые заявки.",
    needPayoff: "Умные формы с прогрессивным профилированием и скорингом в реальном времени.",
  },
  {
    name: "AI Lead Profiler",
    icon: Brain,
    accentColor: "#EC4899",
    situation: "Вы не знаете, насколько 'горячий' каждый лид до первого контакта.",
    problem: "Сейлзы тратят время на холодных лидов.",
    implication: "Выгорание команды. Низкие close rates.",
    needPayoff: "AI скорит каждого лида по поведению и готовности к покупке.",
  },
  {
    name: "Live Conversations",
    icon: MessagesSquare,
    accentColor: "#14B8A6",
    situation: "Записи звонков и чатов теряются после разговора.",
    problem: "Нет данных для обучения. Нет accountability.",
    implication: "Одни и те же ошибки повторяются. Качество падает.",
    needPayoff: "Полная транскрипция с AI-саммари и highlights для каждого разговора.",
  },
];

export default function MoscoLandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-coral selection:text-white overflow-x-hidden">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-coral to-orange-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-black text-lg tracking-[0.15em] uppercase">mosco.ai</span>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-xl px-5">
              Войти
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[200vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Background Gradient */}
          {/* Dynamic Background Gradient */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-coral/20 rounded-full blur-[200px] pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2],
              x: ["-55%", "-45%", "-55%"],
              y: ["-55%", "-45%", "-55%"]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none"
          />

          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/70">
                <Zap className="w-4 h-4 text-coral" />
                Marketing Operation System
              </span>
            </motion.div>

            <ScrollText
              text="Превратите хаос в продажах в управляемую систему роста"
              textClassName="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight justify-center"
              startOffset={0.9}
              endOffset={0.5}
              enableBlur={true}
              animationStyle="slide"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
            >
              7 модулей. Один поток данных. Полный контроль над каждым лидом.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <Button className="bg-coral hover:bg-coral/90 text-white rounded-xl px-8 py-3 text-lg font-semibold">
                Начать бесплатно
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-16 text-white/30 text-sm flex items-center justify-center gap-2"
            >
              <span>Скролль вниз чтобы узнать больше</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ↓
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Module SPIN Sections */}
      {MODULES.map((module, index) => (
        <ModuleSpinSection
          key={module.name}
          moduleName={module.name}
          moduleIcon={module.icon}
          accentColor={module.accentColor}
          situation={module.situation}
          problem={module.problem}
          implication={module.implication}
          needPayoff={module.needPayoff}
          index={index}
        />
      ))}

      {/* Knowledge Base / Database */}
      <KnowledgeBase />

      {/* Final CTA Section */}
      <section className="relative py-32 bg-[#050505]">
        <div className="absolute inset-0 bg-gradient-to-t from-coral/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Готовы к системному росту?
          </h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Подключите все 7 модулей за 15 минут и начните закрывать больше сделок уже сегодня.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button className="bg-coral hover:bg-coral/90 text-white rounded-xl px-10 py-4 text-lg font-semibold w-full sm:w-auto">
              Начать бесплатно
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-xl px-10 py-4 text-lg w-full sm:w-auto">
                Посмотреть демо
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>14 дней бесплатно</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Без карты</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Настройка за 15 минут</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-[#030303]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-coral to-orange-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-sm tracking-[0.1em] uppercase text-white/80">mosco.ai</span>
            </div>
            <p className="text-white/40 text-sm">
              © 2025 Mosco. Marketing Operation System Connect.
            </p>
            <div className="flex items-center gap-6 text-white/50 text-sm">
              <Link href="#" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
              <Link href="#" className="hover:text-white transition-colors">Условия использования</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
