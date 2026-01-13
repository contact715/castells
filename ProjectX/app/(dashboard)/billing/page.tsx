"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  Minus,
  Plus,
  Info,
  CreditCard,
  ShieldCheck,
  Zap,
  Globe,
  MessageSquare,
  Users,
  Layout,
  Star,
  Clock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";

interface ModuleOption {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: any;
}

const MODULES: ModuleOption[] = [
  { id: "forms", name: "Smart Forms", price: 65, description: "Advanced quiz logic & lead capture", icon: Layout },
  { id: "ai_chat", name: "AI Chat Inbox", price: 45, description: "Automated customer support & sales", icon: MessageSquare },
  { id: "dialer", name: "Speed-Dialer", price: 35, description: "Power dialing & call recording", icon: Zap },
  { id: "profiler", name: "AI Lead Profiler", icon: Users, price: 55, description: "Deep lead research & qualification" },
  { id: "workflows", name: "Agentic Flow", icon: Globe, price: 75, description: "Custom automation & integrations" },
  { id: "analytics", name: "ROI Analytics", icon: Star, price: 40, description: "Marketing attribution & performance" },
];

const PERIOD_DISCOUNTS = [
  { id: "1m", label: "Monthly", months: 1, discountPercent: 0, tag: "" },
  { id: "6m", label: "6 months", months: 6, discountPercent: 10, tag: "10% Off" },
  { id: "1y", label: "1 year", months: 12, discountPercent: 20, tag: "2 Months Free" },
  { id: "2y", label: "2 years", months: 24, discountPercent: 35, tag: "Best Value: 6m Free" },
];

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState<"base" | "advanced" | "enterprise">("advanced");
  const [selectedModules, setSelectedModules] = useState<string[]>(["forms", "ai_chat"]);
  const [seats, setSeats] = useState(1);
  const [period, setPeriod] = useState(PERIOD_DISCOUNTS[2]); // Default to 1 year

  const planPrices = {
    base: 15,
    advanced: 25,
    enterprise: 45
  };

  const totalPriceDetails = useMemo(() => {
    const planPrice = planPrices[selectedPlan] * seats;
    const modulesPrice = selectedModules.reduce((acc, mid) => {
      const m = MODULES.find(mod => mod.id === mid);
      return acc + (m ? m.price : 0);
    }, 0);

    const monthlyTotal = planPrice + modulesPrice;
    const subtotal = monthlyTotal * period.months;
    const discount = Math.round(subtotal * (period.discountPercent / 100));
    const finalTotal = subtotal - discount;

    return { monthlyTotal, subtotal, discount, finalTotal };
  }, [selectedPlan, selectedModules, seats, period]);

  const toggleModule = (id: string) => {
    setSelectedModules(prev =>
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-[#111] p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
      {/* Main Content */}
      <div className="flex-1 space-y-8 max-w-5xl">
        <header>
          <h1 className="text-3xl font-display font-bold text-text-primary dark:text-white mb-2">Billing</h1>
          <p className="text-text-secondary dark:text-white/60">
            Управляйте подпиской MOS Engine. Выбирайте тарифный план, подключайте модули и масштабируйте свой бизнес.
          </p>
        </header>

        <ModuleDescription
          moduleName="Billing & Subscription"
          icon={<CreditCard className="w-6 h-6" />}
          shortDescription="Удобное управление вашими инвестициями в автоматизацию. Конструктор тарифа позволяет гибко подключать только те модули, которые приносят вам прибыль прямо сейчас, и масштабировать количество рабочих мест по мере роста команды."
          problem="Многие CRM принуждают платить за 'пакеты' функций, 70% из которых вы не используете. Сложность в расчете реальной стоимости владения софтом и отсутствие прозрачности в списаниях мешают финансовому планированию бизнеса."
          businessValue="Для клиента: Гибкость и экономия: платите только за то, что работает. Прозрачный расчет ROI прямо в корзине. Возможность получить скидку до 35% при годовой подписке. Мгновенная активация модулей без участия поддержки."
          monetization="Ваш индивидуальный тариф формируется из базовой стоимости места + стоимости выбранных модулей. С нашей системой 'Pay-as-you-grow' вы всегда контролируете свои расходы."
          roi="Оптимизация затрат на софт: экономия до 40% по сравнению с фиксированными 'Enterprise' планами конкурентов. Прямая корреляция между стоимостью подписки и генерируемой выручкой (прозрачный ROI для каждой копейки)."
          example="Пример: Вы начали с базового плана за $15. Увидев результат от Smart Forms, вы подключили их за $65. Это принесло вам +10 лидов в неделю. Вы платите $80, а зарабатываете на $5,000 больше. ROI конкретного решения очевиден."
        />

        {/* Plan Selection */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary dark:text-white">1. Select your plan</h2>
            <button className="text-coral text-sm font-medium hover:underline flex items-center gap-1">
              View all features <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: "base", name: "Base", price: 15, features: ["2,500 leads per seat", "Unified inbox", "Custom pipeline"] },
              { id: "advanced", name: "Advanced", price: 25, features: ["10,000 leads per seat", "Kommo AI included", "Advanced automations"] },
              { id: "enterprise", name: "Enterprise", price: 45, features: ["Unlimited leads", "Full AI Agent pack", "Dedicated support"] },
            ].map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id as any)}
                className={cn(
                  "relative p-6 rounded-[2rem] text-left transition-all duration-300 bg-white dark:bg-[#1A1A1A]",
                  selectedPlan === plan.id
                    ? " shadow-2xl shadow-coral/10 scale-[1.02] z-10"
                    : "hover:/30"
                )}
              >
                {selectedPlan === plan.id && (
                  <div className="absolute top-4 right-4 bg-coral text-white p-1 rounded-full">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                <h3 className="text-lg font-bold text-text-primary dark:text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-bold text-coral">${plan.price}</span>
                  <span className="text-sm text-text-secondary dark:text-white/40">USD/seat/mo</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map(f => (
                    <li key={f} className="text-xs text-text-secondary dark:text-white/60 flex items-start gap-2">
                      <Check className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </section>

        {/* Modules Add-ons */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary dark:text-white">2. Modular Add-ons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map((mod) => (
              <button
                key={mod.id}
                onClick={() => toggleModule(mod.id)}
                className={cn(
                  "p-4 rounded-[2rem] text-left transition-all bg-white dark:bg-[#1A1A1A] group",
                  selectedModules.includes(mod.id)
                    ? " bg-coral/5"
                    : "hover:/20"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    "w-10 h-10 rounded-[2rem] flex items-center justify-center transition-colors",
                    selectedModules.includes(mod.id) ? "bg-coral text-white" : "bg-black/5 dark:bg-dark-surface/50 text-gray-400 group-hover:text-coral"
                  )}>
                    <mod.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm dark:text-white">{mod.name}</span>
                      <span className="text-xs font-bold text-coral">+${mod.price}/mo</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-text-secondary dark:text-white/40 line-clamp-2">{mod.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Seats & Subscription */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Seats */}
          <section className="bg-white dark:bg-[#1A1A1A] p-6 rounded-[2rem] ">
            <h2 className="text-lg font-bold text-text-primary dark:text-white mb-4">Number of seats</h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 bg-ivory dark:bg-bblack/20 p-2 rounded-[2rem] ">
                <button
                  onClick={() => setSeats(Math.max(1, seats - 1))}
                  className="w-10 h-10 rounded-[2rem] bg-white dark:bg-[#2A2A2A] shadow-sm flex items-center justify-center hover:bg-coral hover:text-white transition-all disabled:opacity-50"
                  disabled={seats <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-2xl font-display font-bold w-12 text-center text-text-primary dark:text-white">{seats}</span>
                <button
                  onClick={() => setSeats(seats + 1)}
                  className="w-10 h-10 rounded-[2rem] bg-white dark:bg-[#2A2A2A] shadow-sm flex items-center justify-center hover:bg-coral hover:text-white transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-text-secondary dark:text-white/60">
                <div className="font-bold text-text-primary dark:text-white">${planPrices[selectedPlan]} USD/month</div>
                per seat for {selectedPlan} plan
              </div>
            </div>
          </section>

          {/* Period */}
          <section className="bg-white dark:bg-[#1A1A1A] p-6 rounded-[2rem] ">
            <h2 className="text-lg font-bold text-text-primary dark:text-white mb-4">Subscription period</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PERIOD_DISCOUNTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    "relative p-3 rounded-[2rem] transition-all text-center",
                    period.id === p.id
                      ? " bg-coral text-white shadow-lg shadow-coral/20"
                      : "hover:/20 text-text-secondary dark:text-white/60"
                  )}
                >
                  <div className="text-xs font-bold">{p.label}</div>
                  {p.tag && (
                    <div className={cn(
                      "mt-1 text-[9px] uppercase tracking-tighter font-bold",
                      period.id === p.id ? "text-white/80" : "text-coral"
                    )}>
                      {p.tag}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Checkout Sidebar */}
      <div className="w-full lg:w-[400px]">
        <div className="sticky top-8 space-y-4">
          <Card className="p-8  shadow-2xl bg-white dark:bg-[#1A1A1A] overflow-hidden relative group/summary hover:shadow-coral/5 transition-all duration-500 rounded-[2rem]">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover/summary:opacity-10 transition-opacity">
              <CreditCard className="w-32 h-32 rotate-12" />
            </div>

            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-primary dark:text-white">
              Order Summary
              <div className="h-px flex-1 bg-black/5 dark:bg-dark-surface/50" />
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-sm uppercase dark:text-white tracking-tight">Plan: {selectedPlan}</div>
                  <div className="text-xs text-text-secondary dark:text-white/40">{seats} seats × ${planPrices[selectedPlan]}/mo</div>
                </div>
                <div className="font-bold text-text-primary dark:text-white">${planPrices[selectedPlan] * seats}</div>
              </div>

              {selectedModules.length > 0 && (
                <div className="pt-4 ">
                  <div className="text-[10px] font-bold text-coral uppercase mb-2 tracking-widest">Modules Added</div>
                  {selectedModules.map(mid => {
                    const mod = MODULES.find(m => m.id === mid);
                    return (
                      <div key={mid} className="flex justify-between items-center text-sm py-1.5 transition-colors hover:bg-bblack/[0.02] dark:hover:bg-white/[0.02] rounded-[2rem] -mx-2 px-2">
                        <span className="text-text-secondary dark:text-white/70">{mod?.name}</span>
                        <span className="font-semibold text-text-primary dark:text-white">${mod?.price}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="pt-4 flex justify-between items-center">
                <div className="text-xs font-medium text-text-secondary dark:text-white/40">Monthly Subtotal</div>
                <div className="font-bold text-lg text-text-primary dark:text-white">${totalPriceDetails.monthlyTotal}</div>
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary dark:text-white/60">Subscription ({period.months} mo)</span>
                  <span className="font-medium text-text-primary dark:text-white font-mono">${totalPriceDetails.subtotal}</span>
                </div>
                {totalPriceDetails.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-500 font-bold bg-green-500/5 p-2 rounded-[1.5rem] -mx-2">
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Discount ({period.discountPercent}%)</span>
                    <span>-${totalPriceDetails.discount}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-bg-bblack/20 -mx-8 -mb-8 p-8 ">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <div className="text-[10px] text-text-secondary dark:text-white/40 uppercase font-black tracking-[0.2em] mb-1">Total Due</div>
                  <div className="text-5xl font-display font-bold text-coral drop-shadow-sm">${totalPriceDetails.finalTotal}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded-full inline-block mb-1">You save ${totalPriceDetails.discount}</div>
                  <div className="text-[10px] text-text-secondary dark:text-white/20 uppercase font-medium">All taxes included</div>
                </div>
              </div>

              <Button className="w-full bg-coral hover:bg-coral/90 text-white py-8 rounded-[2rem] shadow-2xl shadow-coral/30 font-bold text-lg group/btn overflow-hidden relative transition-all active:scale-[0.98]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center justify-center gap-2">
                  Complete Checkout
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                </span>
              </Button>

              <div className="mt-8 flex items-center justify-center gap-6 text-[9px] text-text-secondary dark:text-white/20 uppercase font-black tracking-widest">
                <span className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity"><CreditCard className="w-3.5 h-3.5" /> Secure SSL</span>
                <span className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity"><Zap className="w-3.5 h-3.5" /> Instant Activation</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Trial / Promo Card */}
      <div className="bg-coral/10 p-4 rounded-[2rem] /20 flex gap-4 items-center mt-4">
        <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center text-coral">
          <Clock className="w-5 h-5 shrink-0" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-coral mb-0.5">Trial ending soon</p>
        </div>
      </div>
    </div>
  );
}
