"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import {
  Phone,
  Clock,
  TrendingUp,
  DollarSign,
  Check,
  ArrowRight,
  X,
  Zap,
  BarChart3,
  ShieldCheck,
  MessageCircle,
  HelpCircle,
  AlertTriangle,
  Ban,
  FileText
} from "lucide-react";
import { SocialProofPopup } from "@/components/ui/SocialProofPopup";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function ProposalPage() {
  const [leadsPerMonth, setLeadsPerMonth] = useState(150);
  const [dealValue, setDealValue] = useState(1200);

  // ROI Calculations
  const roiStats = useMemo(() => {
    // Traditional
    const tradConversion = 0.10; // 10%
    const tradDeals = Math.floor(leadsPerMonth * tradConversion);
    const tradRevenue = tradDeals * dealValue;

    // Speed-Dialer
    const newConversion = 0.28; // ~28%
    const newDeals = Math.floor(leadsPerMonth * newConversion);
    const newRevenue = newDeals * dealValue;

    const additionalRevenue = newRevenue - tradRevenue;
    const cost = 150; // Pro tier cost
    const roiPercentage = Math.round((additionalRevenue / cost) * 100);

    return {
      tradRevenue,
      newRevenue,
      additionalRevenue,
      roiPercentage
    };
  }, [leadsPerMonth, dealValue]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-coral selection:text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md ">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[1.5rem] bg-gradient-to-br from-coral to-orange-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">M.O.S. Engine</span>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className=" text-white hover:bg-black/5 dark:bg-dark-surface/50 hover:text-coral">
              Войти в систему
            </Button>
          </Link>
        </div>
      </header>

      {/* Hook / Need Payoff Teaser */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-900/10 rounded-full blur-[120px] -z-10 opacity-30" />

        <motion.div
          className="max-w-5xl mx-auto text-center space-y-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 ed-500/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-bold text-red-500 uppercase tracking-widest">Системная Ошибка Вашего Бизнеса</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-display font-bold leading-tight tracking-tight">
            Вы сжигаете <span className="text-red-500 line-through decoration-white/20">30-50%</span> рекламного бюджета
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">просто не перезванивая</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Пока вы читаете это, ваши лиды уходят к конкурентам, потому что они ответили на 5 минут раньше.
          </motion.p>
        </motion.div>
      </section>

      {/* SITUATION Section */}
      <section className="py-20 px-6  bg-[#080808]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Ситуация (Situation)</h2>
            <h3 className="text-3xl font-display font-bold">Рынок Home Services перегрет</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/70">
            <div className="bg-black/5 dark:bg-dark-surface/50 p-6 rounded-[2rem] ">
              <p className="mb-4">Стоимость клика растет каждый месяц. Вы платите за рекламу в Google, Facebook, Yelp, покупаете лиды у агрегаторов.</p>
              <p>Каждый звонок стоит вам от <span className="text-white font-bold">$50 до $200</span>.</p>
            </div>
            <div className="bg-black/5 dark:bg-dark-surface/50 p-6 rounded-[2rem] ">
              <p className="mb-4">Клиент оставляет заявки сразу в 3-5 компаний одновременно. Он не ждет.</p>
              <p>Он выбирает того, <span className="text-white font-bold">кто позвонит первым</span>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM Section */}
      <section className="py-20 px-6 bg-[#050505] ">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-red-500 uppercase tracking-[0.2em] mb-4">Проблема (Problem)</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">Ваш отдел продаж — <span className="text-red-500">бутылочное горлышко</span></h3>
            <p className="text-xl text-white/60">Человеческий фактор убивает конверсию</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-black/5 dark:bg-dark-surface/50 p-8 rounded-[2rem] h-full">
                <Clock className="w-10 h-10 text-red-500 mb-6" />
                <h4 className="text-xl font-bold mb-4">Долгая реакция</h4>
                <p className="text-white/60">Среднее время перезвона — 2-4 часа. Для клиента это вечность. Если не позвонить за 5 минут, вероятность сделки падает на 400%.</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-black/5 dark:bg-dark-surface/50 p-8 rounded-[2rem] h-full">
                <Ban className="w-10 h-10 text-red-500 mb-6" />
                <h4 className="text-xl font-bold mb-4">Пропущенные звонки</h4>
                <p className="text-white/60">Менеджеры обедают, курят, болеют или заняты. 30% входящих звонков просто теряются. Это деньги на ветер.</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-black/5 dark:bg-dark-surface/50 p-8 rounded-[2rem] h-full">
                <AlertTriangle className="w-10 h-10 text-red-500 mb-6" />
                <h4 className="text-xl font-bold mb-4">Отсутствие настойчивости</h4>
                <p className="text-white/60">80% продаж совершаются после 5-го касания. Ваши менеджеры сдаются после 1-го недозвона.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPLICATION Section - Enhanced visuals */}
      <section className="py-24 px-6 relative overflow-hidden bg-red-950/10  ed-500/20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-xs font-bold text-red-400 uppercase tracking-[0.2em] mb-4">Последствия (Implication)</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold mb-8">Сколько вы теряете <br /> прямо сейчас?</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10</div>
              <div className="text-sm text-white/50 uppercase tracking-widest">Минут задержки</div>
              <div className="text-red-500 font-bold mt-2">-90% конверсии</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">$2000</div>
              <div className="text-sm text-white/50 uppercase tracking-widest">В месяц</div>
              <div className="text-red-500 font-bold mt-2">Потеряно на рекламе</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">30%</div>
              <div className="text-sm text-white/50 uppercase tracking-widest">Лидов</div>
              <div className="text-red-500 font-bold mt-2">Уходят к другим</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">0</div>
              <div className="text-sm text-white/50 uppercase tracking-widest">Второго шанса</div>
              <div className="text-red-500 font-bold mt-2">Произвести впечатление</div>
            </div>
          </div>

          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Продолжать работать &quot;по-старинке&quot; — значит осознанно отдавать своих клиентов и прибыль более технологичным конкурентам.
          </p>
        </div>
      </section>

      {/* NEED-PAYOFF Section - The Solution */}
      <section className="py-24 px-6 relative bg-[#050505]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-coral/10 rounded-full blur-[120px] -z-10 opacity-40" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-coral uppercase tracking-[0.2em] mb-4">Решение (Solution)</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold mb-6">M.O.S. Speed-Dialer</h3>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Автоматическая система, которая устраняет человеческий фактор и соединяет вас с клиентом быстрее, чем он успеет закрыть ваш сайт (28 секунд).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black/5 dark:bg-dark-surface/50 p-6 rounded-[2rem] hover:/50 transition-colors">
              <Zap className="w-8 h-8 text-coral mb-4" />
              <h4 className="text-lg font-bold mb-2">Мгновенный звонок</h4>
              <p className="text-white/50 text-sm">Как только лид падает в систему, телефон менеджера звонит. Он берет трубку — и система соединяет с клиентом.</p>
            </div>
            <div className="bg-black/5 dark:bg-dark-surface/50 p-6 rounded-[2rem] hover:/50 transition-colors">
              <ShieldCheck className="w-8 h-8 text-coral mb-4" />
              <h4 className="text-lg font-bold mb-2">Гарантия ответа</h4>
              <p className="text-white/50 text-sm">Если один менеджер занят, звонок идет следующему. Если никто не взял (ночь) — бот назначит встречу.</p>
            </div>
            <div className="bg-black/5 dark:bg-dark-surface/50 p-6 rounded-[2rem] hover:/50 transition-colors">
              <TrendingUp className="w-8 h-8 text-coral mb-4" />
              <h4 className="text-lg font-bold mb-2">WOW-Эффект</h4>
              <p className="text-white/50 text-sm">Клиенты шокированы скоростью. Это сразу создает доверие и показывает ваш профессионализм.</p>
            </div>
            <div className="bg-black/5 dark:bg-dark-surface/50 p-6 rounded-[2rem] hover:/50 transition-colors">
              <BarChart3 className="w-8 h-8 text-coral mb-4" />
              <h4 className="text-lg font-bold mb-2">Полный контроль</h4>
              <p className="text-white/50 text-sm">Запись всех разговоров, транскрибация AI, аналитика причин отказов.</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="h-16 px-10 text-xl bg-coral hover:bg-orange-600 text-white rounded-full w-full sm:w-auto shadow-[0_0_30px_rgba(255,107,74,0.4)]">
                Перестать терять лиды
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <Link href="/dashboard">
                <Button variant="outline" className="h-16 px-10 text-xl text-white hover:bg-black/5 dark:bg-dark-surface/50 rounded-full w-full sm:w-auto">
                  Посмотреть демо
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-white/30 text-sm">Бесплатный тестовый период 14 дней. Никаких обязательств.</p>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM INTRO */}
      <section className="py-24 px-6  bg-[#080808]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Экосистема (Ecosystem)</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold mb-6">Полный цикл доминирования</h3>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Speed-Dialer — это только начало. Мы закрываем все дыры в вашем процессе продаж, превращая хаос в систему.
          </p>
        </div>
      </section>

      {/* 1. SMART FORMS */}
      <section className="py-24 px-6  bg-[#050505]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="w-16 h-16 rounded-[2rem] bg-bblue-500/10 flex items-center justify-center mb-8 text-bblue-400">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-display font-bold mb-6">Smart Forms</h3>
            <div className="space-y-6">
              <div className="bg-red-500/5 ed-500/10 p-6 rounded-[2rem]">
                <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Проблема
                </h4>
                <p className="text-white/70">
                  &quot;Мертвые&quot; заявки с неверными номерами, спам, боты. Менеджеры тратят часы на обзвон несуществующих клиентов.
                </p>
              </div>
              <div className="bg-green-500/5 p-6 rounded-[2rem]">
                <h4 className="text-green-500 font-bold mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Решение
                </h4>
                <p className="text-white/70">
                  Умные формы с авто-валидацией. Мы проверяем номер телефона по базе операторов в реальном времени. Спам отсеивается ДО попадания в CRM.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 h-full min-h-[300px] bg-gradient-to-br from-bblue-500/5 to-transparent rounded-[2rem] blue-500/10 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="text-center p-8">
              <div className="inline-block bg-[#0A0A0A] ed-500/30 text-red-400 px-4 py-2 rounded-[2rem] mb-4 opacity-50 blur-[1px]">Invalid Number</div>
              <div className="inline-block bg-[#0A0A0A] text-green-400 px-6 py-3 rounded-[1.5rem] shadow-2xl scale-110 relative z-10">Valid Lead (Verified)</div>
              <div className="inline-block bg-[#0A0A0A] ed-500/30 text-red-400 px-4 py-2 rounded-[2rem] mt-4 opacity-50 blur-[1px]">Spam Bot</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AI CHAT AGENT */}
      <section className="py-24 px-6  bg-[#080808]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-1 h-full min-h-[300px] bg-gradient-to-br from-purple-500/5 to-transparent rounded-[2rem] relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="space-y-4 w-full max-w-sm p-8">
              <div className="bg-black/5 dark:bg-dark-surface/50 p-4 rounded-t-[1.5rem] rounded-br-[1.5rem] text-sm max-w-[80%]">Сколько стоит установка?</div>
              <div className="bg-purple-600 p-4 rounded-t-[1.5rem] rounded-bl-[1.5rem] text-sm max-w-[80%] ml-auto text-white shadow-lg shadow-purple-900/20">Добрый день! От $150. Хотите забронировать мастера на завтра?</div>
              <div className="bg-black/5 dark:bg-dark-surface/50 p-4 rounded-t-[1.5rem] rounded-br-[1.5rem] text-sm max-w-[80%]">Да, давайте.</div>
            </div>
          </div>
          <div className="order-2">
            <div className="w-16 h-16 rounded-[2rem] bg-purple-500/10 flex items-center justify-center mb-8 text-purple-400">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-display font-bold mb-6">AI Chat Agent</h3>
            <div className="space-y-6">
              <div className="bg-red-500/5 ed-500/10 p-6 rounded-[2rem]">
                <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Проблема
                </h4>
                <p className="text-white/70">
                  Вы спите, а клиенты пишут. Утро начинается с разбора холодных сообщений, которые написали конкурентам еще ночью.
                </p>
              </div>
              <div className="bg-green-500/5 p-6 rounded-[2rem]">
                <h4 className="text-green-500 font-bold mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Решение
                </h4>
                <p className="text-white/70">
                  Чат-бот, который не спит. Он квалифицирует лида, отвечает на вопросы и назначает встречи в ваш календарь 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AI LEAD PROFILER */}
      <section className="py-24 px-6  bg-[#050505]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center mb-8 text-indigo-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-display font-bold mb-6">AI Lead Profiler</h3>
            <div className="space-y-6">
              <div className="bg-red-500/5 ed-500/10 p-6 rounded-[2rem]">
                <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Проблема
                </h4>
                <p className="text-white/70">
                  Звонки &quot;вслепую&quot;. Вы тратите время на клиентов без бюджета, не зная, кто на другом конце провода.
                </p>
              </div>
              <div className="bg-green-500/5 p-6 rounded-[2rem]">
                <h4 className="text-green-500 font-bold mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Решение
                </h4>
                <p className="text-white/70">
                  Мы находим соцсети (LinkedIn, Facebook), стоимость дома и примерный доход лида ЕЩЕ ДО вашего звонка. Вы продаете тем, кто платит.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 h-full min-h-[300px] bg-gradient-to-br from-indigo-500/5 to-transparent rounded-[2rem] relative overflow-hidden flex items-center justify-center">
            <div className="bg-[#0A0A0A] p-6 rounded-[2rem] shadow-xl max-w-xs w-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/10" />
                <div>
                  <div className="w-24 h-4 bg-white/20 rounded mb-2" />
                  <div className="w-16 h-3 bg-black/5 dark:bg-white/10 rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-white/40">Income:</span> <span className="text-green-400">$150k+</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/40">Home Value:</span> <span className="text-white">$850k</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/40">Credit:</span> <span className="text-white">720+</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REVIEW GUARDIAN */}
      <section className="py-24 px-6  bg-[#080808]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-1 h-full min-h-[300px] bg-gradient-to-br from-yellow-500/5 to-transparent rounded-[2rem] relative overflow-hidden flex items-center justify-center">
            <div className="text-center relative">
              <div className="text-6xl font-bold text-white mb-2">4.9</div>
              <div className="flex gap-1 justify-center text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map(i => <span key={i} className="fill-current">★</span>)}
              </div>
              <div className="text-white/40 text-sm">(128 reviews)</div>
              <div className="absolute -top-10 -right-10 bg-red-500/20 text-red-400 p-2 rounded-[2rem] text-xs ed-500/20 transform rotate-12 line-through opacity-50">1 Star Review</div>
            </div>
          </div>
          <div className="order-2">
            <div className="w-16 h-16 rounded-[2rem] bg-yellow-500/10 flex items-center justify-center mb-8 text-yellow-400">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-display font-bold mb-6">Review Guardian</h3>
            <div className="space-y-6">
              <div className="bg-red-500/5 ed-500/10 p-6 rounded-[2rem]">
                <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Проблема
                </h4>
                <p className="text-white/70">
                  Один плохой отзыв убивает продажи на месяцы. Клиенты гуглят вас и уходят, если рейтинг ниже 4.5.
                </p>
              </div>
              <div className="bg-green-500/5 p-6 rounded-[2rem]">
                <h4 className="text-green-500 font-bold mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Решение
                </h4>
                <p className="text-white/70">
                  Авто-запрос отзывов у довольных клиентов по SMS. Перехват негатива: если клиент ставит 1-3 звезды, отзыв идет вам на почту, а не в Google.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REACTIVATION */}
      <section className="py-24 px-6  bg-[#050505]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="w-16 h-16 rounded-[2rem] bg-green-500/10 flex items-center justify-center mb-8 text-green-400">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-display font-bold mb-6">Database Reactivation</h3>
            <div className="space-y-6">
              <div className="bg-red-500/5 ed-500/10 p-6 rounded-[2rem]">
                <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Проблема
                </h4>
                <p className="text-white/70">
                  Тысячи &quot;забытых&quot; лидов пылятся в вашей CRM. Это &quot;мертвый груз&quot;, который вы когда-то купили, но не использовали.
                </p>
              </div>
              <div className="bg-green-500/5 p-6 rounded-[2rem]">
                <h4 className="text-green-500 font-bold mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Решение
                </h4>
                <p className="text-white/70">
                  AI рассылка по старой базе. Мы &quot;будим&quot; старых клиентов спецпредложением. Это генерирует 10-20 горячих заявок из воздуха за 24 часа.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 h-full min-h-[300px] bg-gradient-to-br from-green-500/5 to-transparent rounded-[2rem] relative overflow-hidden flex items-center justify-center">
            <div className="text-center p-8 bg-[#0A0A0A] rounded-[2rem]">
              <div className="text-sm text-white/50 mb-2">Re-engagement Campaign</div>
              <div className="text-3xl font-bold text-white mb-1">214</div>
              <div className="text-green-400 text-sm">Resurrected Leads</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROI ANALYTICS */}
      <section className="py-24 px-6  bg-[#080808]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-1 h-full min-h-[300px] bg-gradient-to-br from-red-500/5 to-transparent rounded-[2rem] ed-500/10 relative overflow-hidden flex items-center justify-center">
            <div className="w-full max-w-sm p-6 grid grid-cols-2 gap-4">
              <div className="bg-black/5 dark:bg-dark-surface/50 p-4 rounded-[1.5rem] text-center">
                <div className="text-xs text-white/40">Google Ads</div>
                <div className="text-red-400 font-bold">-15% ROI</div>
              </div>
              <div className="bg-black/5 dark:bg-dark-surface/50 p-4 rounded-[1.5rem] text-center ">
                <div className="text-xs text-white/40">Facebook</div>
                <div className="text-green-400 font-bold">+340% ROI</div>
              </div>
            </div>
          </div>
          <div className="order-2">
            <div className="w-16 h-16 rounded-[2rem] bg-red-500/10 flex items-center justify-center mb-8 text-red-400">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-display font-bold mb-6">ROI Analytics</h3>
            <div className="space-y-6">
              <div className="bg-red-500/5 ed-500/10 p-6 rounded-[2rem]">
                <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Проблема
                </h4>
                <p className="text-white/70">
                  Слив бюджета. Вы не знаете, какая реклама реально приносит деньги, а какая просто сжигает карту.
                </p>
              </div>
              <div className="bg-green-500/5 p-6 rounded-[2rem]">
                <h4 className="text-green-500 font-bold mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Решение
                </h4>
                <p className="text-white/70">
                  Сквозная аналитика. Вы видите каждый вложенный доллар и сколько он принес (ROI). Отключайте нерабочее, масштабируйте прибыльное.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTENT ENGINE */}
      <section className="py-24 px-6  bg-[#050505]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="w-16 h-16 rounded-[2rem] bg-orange-500/10 flex items-center justify-center mb-8 text-orange-400">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-4xl font-display font-bold mb-6">Content Engine</h3>
            <div className="space-y-6">
              <div className="bg-red-500/5 ed-500/10 p-6 rounded-[2rem]">
                <h4 className="text-red-500 font-bold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Проблема
                </h4>
                <p className="text-white/70">
                  &quot;Мертвые&quot; профили. Ваши страницы в Google, Yelp и соцсетях пустуют годами. Клиенты думают, что вы закрылись.
                </p>
              </div>
              <div className="bg-green-500/5 p-6 rounded-[2rem]">
                <h4 className="text-green-500 font-bold mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Решение
                </h4>
                <p className="text-white/70">
                  Авто-публикация. Система сама пишет и публикует SEO-статьи и посты во все каналы (GMB, Yelp, Blog). Вы в топе выдачи без усилий.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 h-full min-h-[300px] bg-gradient-to-br from-orange-500/5 to-transparent rounded-[2rem] relative overflow-hidden flex items-center justify-center">
            <div className="relative w-full max-w-xs space-y-4">
              <div className="bg-[#0A0A0A] p-4 rounded-[1.5rem] flex items-center gap-4 transform -translate-x-4">
                <div className="w-8 h-8 rounded bg-bblue-500 flex items-center justify-center text-xs font-bold">G</div>
                <div className="bg-black/5 dark:bg-white/10 h-2 w-24 rounded" />
              </div>
              <div className="bg-[#0A0A0A] p-4 rounded-[1.5rem] flex items-center gap-4 transform translate-x-4">
                <div className="w-8 h-8 rounded bg-red-500 flex items-center justify-center text-xs font-bold">Y</div>
                <div className="bg-black/5 dark:bg-white/10 h-2 w-24 rounded" />
              </div>
              <div className="bg-[#0A0A0A] p-4 rounded-[1.5rem] flex items-center gap-4 transform -translate-x-2">
                <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center text-xs font-bold">B</div>
                <div className="bg-black/5 dark:bg-white/10 h-2 w-24 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-24 px-6 bg-[#080808] ">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Сколько вы заработаете?</h2>
            <p className="text-white/60">Математика проста: быстрее звонок = больше сделок</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 bg-black/5 dark:bg-dark-surface/50 p-8 rounded-[2rem] ">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="text-sm font-bold uppercase tracking-widest text-white/70">Количество лидов в месяц</label>
                    <span className="font-display font-bold text-coral text-xl">{leadsPerMonth}</span>
                  </div>
                  <Slider
                    value={leadsPerMonth}
                    min={10}
                    max={500}
                    step={10}
                    onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
                    showValue={false}
                    className="py-4"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-4">
                    <label className="text-sm font-bold uppercase tracking-widest text-white/70">Средний чек ($)</label>
                    <span className="font-display font-bold text-green-400 text-xl">${dealValue}</span>
                  </div>
                  <Slider
                    value={dealValue}
                    min={100}
                    max={5000}
                    step={100}
                    onChange={(e) => setDealValue(Number(e.target.value))}
                    showValue={false}
                    className="py-4"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-coral/20 to-orange-600/20 /30 rounded-[2rem] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-coral/20 blur-[50px] rounded-full"></div>

                <h3 className="text-lg font-medium text-coral mb-2">Прогнозируемая выручка</h3>
                <p className="text-5xl font-display font-bold text-white mb-6">${roiStats.newRevenue.toLocaleString()}</p>

                <div className="pt-6  space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/50">Старая выручка:</span>
                    <span className="text-white/50 line-through">${roiStats.tradRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-green-400 text-xl font-bold">
                    <span>Дополнительная прибыль:</span>
                    <span>+${roiStats.additionalRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Social Proof) */}
      <section className="py-24 px-6  relative bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Результаты говорят сами за себя</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                p: "Сначала я не верил, но когда мы закрыли 3 сделки за первый день использования, я понял мощь этой системы. Это изменило наш бизнес.",
                author: "Алексей К.",
                role: "Владелец HVAC компании",
                roi: "ROI 1200%"
              },
              {
                p: "Это как Uber для наших лидов. Менеджеры в восторге, потому что им больше не нужно звонить в холодную. Клиенты ждут звонка.",
                author: "Мария С.",
                role: "Директор по продажам",
                roi: "+40% конверсия"
              },
              {
                p: "Мы тратили $5000 на рекламу и теряли половину лидов. Speed-Dialer окупил себя в первую неделю. Просто космос.",
                author: "Дмитрий В.",
                role: "Основатель Solar Tech",
                roi: "Экономия $2500/мес"
              }
            ].map((review, i) => (
              <motion.div
                key={i}
                className="bg-black/5 dark:bg-dark-surface/50 rounded-[2rem] p-8 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="absolute top-6 right-8 text-6xl text-coral/20 font-serif leading-none">&quot;</div>
                <div className="flex items-center gap-1 mb-4 text-yellow-400">
                  {[1, 2, 3, 4, 5].map(s => <span key={s} className="w-4 h-4 fill-current">★</span>)}
                </div>
                <p className="text-white/80 mb-6 italic relative z-10">{review.p}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <div className="font-bold text-white">{review.author}</div>
                    <div className="text-sm text-white/40">{review.role}</div>
                  </div>
                  <div className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">
                    {review.roi}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12  text-center text-white/30 text-sm">
        <p>© 2026 M.O.S. Engine. Все права защищены.</p>
      </footer>
      <SocialProofPopup />
    </div>
  );
}
