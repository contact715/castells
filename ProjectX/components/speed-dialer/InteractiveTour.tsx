"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Globe, GitMerge } from "lucide-react";

export function InteractiveTour() {
    const [activeView, setActiveView] = useState("spec");

    // --- Page 7: Technical Specification and Tour ---
    const specHtml = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mosco.ai: Техническая Спецификация и Тур</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-main: #fcfaf9;
            --text-main: #292524;
            --accent: #2563eb;
        }
        body { font-family: 'Inter', sans-serif; background-color: var(--bg-main); color: var(--text-main); scroll-behavior: smooth; }
        .glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3); }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .feature-card:hover { transform: translateY(-5px); transition: all 0.3s ease; }
        .manager-node.ringing { animation: pulse-blue 1.5s infinite; }
        @keyframes pulse-blue { 0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(37, 99, 235, 0); } 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); } }
    </style>
</head>
<body class="antialiased min-h-screen">
    <!-- Hero Section -->
    <header class="relative pt-20 pb-16 px-4 overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
        <div class="max-w-4xl mx-auto text-center">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 border border-blue-100">
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                DOCS v2.4 (2025)
            </div>
            <h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-none mb-6 italic">Speed. Game. <span class="text-blue-600">Profit.</span></h1>
            <p class="text-xl text-stone-500 max-w-2xl mx-auto font-medium">Техническая спецификация mosco.ai — единственной системы, превращающей рекламный бюджет в реальную прибыль через 14-секундную реакцию.</p>
        </div>
    </header>

    <!-- Project Architecture -->
    <section class="py-12 px-4 max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="feature-card glass p-8 rounded-[2rem] shadow-sm">
                <div class="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-200">1</div>
                <h3 class="text-xl font-bold mb-3 tracking-tight">Instant Lead Capture</h3>
                <p class="text-stone-500 text-sm leading-relaxed">Мгновенный перехват лида через Webhooks из LSA, FB, Google Ads и Meta за 0.8 сек.</p>
            </div>
            <div class="feature-card glass p-8 rounded-[2rem] shadow-sm border-2 border-blue-100">
                <div class="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-stone-200">2</div>
                <h3 class="text-xl font-bold mb-3 tracking-tight">The Hunt Engine</h3>
                <p class="text-stone-500 text-sm leading-relaxed">Интеллектуальный параллельный прозвон менеджеров. Кто первый поднял — тот в игре.</p>
            </div>
            <div class="feature-card glass p-8 rounded-[2rem] shadow-sm">
                <div class="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl mb-6">3</div>
                <h3 class="text-xl font-bold mb-3 tracking-tight">AI Post-Call Recap</h3>
                <p class="text-stone-500 text-sm leading-relaxed">Автоматический анализ звонка Gemini. Выделение ЦКП, тональности и ошибок.</p>
            </div>
            <div class="feature-card glass p-8 rounded-[2rem] shadow-sm">
                <div class="w-12 h-12 bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center font-bold text-xl mb-6">4</div>
                <h3 class="text-xl font-bold mb-3 tracking-tight">Financial Matrix</h3>
                <p class="text-stone-500 text-sm leading-relaxed">Прозрачная система KPI и начисления бонусов за скорость и качество звонка.</p>
            </div>
        </div>
    </section>

    <!-- Interactive Simulator -->
    <section class="py-24 px-4 bg-white border-y border-stone-200 overflow-hidden">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-extrabold mb-4 italic">The Hunt Simulator <span class="text-blue-600">Live</span></h2>
                <p class="text-stone-400 font-mono text-sm">НАЖМИТЕ КНОПКУ, ЧТОБЫ УВИДЕТЬ СИСТЕМУ В ДЕЙСТВИИ</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                <!-- Step 1 -->
                <div class="text-center">
                    <div id="trigger-box" class="w-24 h-24 bg-stone-100 rounded-3xl border-2 border-dashed border-stone-300 mx-auto flex items-center justify-center text-3xl mb-4 transition-all duration-500">📥</div>
                    <p class="text-xs font-bold uppercase tracking-widest text-stone-500">НОВАЯ ЗАЯВКА</p>
                    <p class="text-[10px] text-stone-400 mt-1">Google LSA / Meta</p>
                </div>

                <!-- Process -->
                <div class="flex flex-col items-center gap-4">
                    <div class="flex gap-4">
                        <div id="m1" class="manager-node w-16 h-16 bg-white border-2 border-stone-200 rounded-full flex items-center justify-center text-xl transition-all duration-300">👨💼</div>
                        <div id="m2" class="manager-node w-16 h-16 bg-white border-2 border-stone-200 rounded-full flex items-center justify-center text-xl transition-all duration-300">👩💼</div>
                        <div id="m3" class="manager-node w-16 h-16 bg-white border-2 border-stone-200 rounded-full flex items-center justify-center text-xl transition-all duration-300">👨💻</div>
                    </div>
                    <div id="hunt-status" class="px-4 py-2 bg-stone-100 rounded-full text-[10px] font-bold text-stone-400 transition-all duration-300 uppercase">Ожидание...</div>
                </div>

                <!-- Result -->
                <div class="text-center">
                    <div id="success-box" class="w-24 h-24 bg-stone-100 rounded-3xl border-2 border-stone-100 border-dashed mx-auto flex items-center justify-center text-3xl mb-4 transition-all duration-1000">🤝</div>
                    <p class="text-xs font-bold uppercase tracking-widest text-stone-500">СВЯЗЬ УСТАНОВЛЕНА</p>
                    <p id="success-time" class="text-[10px] text-stone-400 mt-1">-- сек</p>
                </div>
            </div>

            <div class="mt-16 text-center">
                <button onclick="startHunt()" id="hunt-btn" class="px-10 py-4 bg-blue-600 text-white font-extrabold rounded-2xl shadow-2xl shadow-blue-300 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 text-lg italic">ЗАПУСТИТЬ ОХОТУ 🚀</button>
            </div>
        </div>
    </section>

    <script>
        function startHunt() {
            const btn = document.getElementById('hunt-btn');
            const trigger = document.getElementById('trigger-box');
            const status = document.getElementById('hunt-status');
            const managers = ['m1', 'm2', 'm3'].map(id => document.getElementById(id));
            const success = document.getElementById('success-box');
            const successTime = document.getElementById('success-time');

            btn.disabled = true;
            btn.style.opacity = '0.5';

            // Phase 1: Lead In
            trigger.style.transform = 'scale(1.2)';
            trigger.style.backgroundColor = '#dcfce7';
            trigger.innerText = '🔥';
            
            setTimeout(() => {
                // Phase 2: Ringing
                status.innerText = 'ОХОТА АКТИВНА: ЗВОНИМ ВСЕМ!';
                status.style.backgroundColor = '#fee2e2';
                status.style.color = '#ef4444';
                
                managers.forEach(m => m.classList.add('ringing'));

                setTimeout(() => {
                    // Phase 3: Connected
                    managers.forEach(m => m.classList.remove('ringing'));
                    const winner = managers[Math.floor(Math.random() * 3)];
                    winner.style.borderColor = '#22c55e';
                    winner.style.backgroundColor = '#f0fdf4';
                    winner.style.transform = 'scale(1.2)';
                    
                    status.innerText = 'МЕНЕДЖЕР ПОДКЛЮЧЕН';
                    status.style.backgroundColor = '#dcfce7';
                    status.style.color = '#16a34a';

                    success.style.backgroundColor = '#2563eb';
                    success.innerText = '📞';
                    success.style.transform = 'scale(1.1) rotate(10deg)';
                    successTime.innerText = '14.2 сек';
                    successTime.classList.add('text-green-600', 'font-bold');

                    setTimeout(() => {
                        resetHunt();
                    }, 4000);
                }, 2000);
            }, 800);
        }

        function resetHunt() {
             location.reload();
        }
    <\/script>

    <footer class="py-12 bg-slate-900 text-slate-400 text-center text-xs font-medium">
        &copy; 2025 MOSCO.AI ENGINE. ПОСТРОЕНО ДЛЯ МИРОВОЙ ДОМИНАЦИИ.
    </footer>
</body>
</html>
    `;

    // --- Page 8: Interactive System Flow ---
    const flowHtml = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mosco.ai: System Flow Integrated</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; color: #1e293b; overflow-x: hidden; }
        .flow-line { width: 4px; background: #e2e8f0; height: 40px; margin: 0 auto; position: relative; overflow: hidden; }
        .flow-line::after { content: ''; position: absolute; top: -100%; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent, #2563eb, transparent); animation: stream 1.5s linear infinite; }
        @keyframes stream { to { top: 100%; } }
        .step-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .step-card:hover { transform: scale(1.02) translateX(10px); }
        .pulse-soft { animation: pulse-soft 2s infinite; }
        @keyframes pulse-soft { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
    </style>
</head>
<body class="p-6 md:p-12">
    <div class="max-w-4xl mx-auto">
        <div class="mb-12">
            <h1 class="text-3xl font-extrabold tracking-tighter italic uppercase text-slate-900">System Architecture <span class="text-blue-600">Flow</span></h1>
            <p class="text-slate-500 font-medium">Путь лида от клика до прибыли</p>
        </div>

        <div class="flex flex-col">
            <!-- STEP 1 -->
            <div class="step-card bg-white border-2 border-slate-100 p-6 rounded-3xl shadow-sm flex items-center gap-6 group">
                <div class="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-blue-200">01</div>
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md uppercase tracking-widest">Incoming</span>
                        <span class="text-blue-500 pulse-soft">●</span>
                    </div>
                    <h3 class="text-xl font-extrabold text-slate-900 italic">WEBHOOK TRIGGER</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Система получает сигнал от рекламной платформы за <span class="text-slate-900 font-bold">150мс</span>.</p>
                </div>
            </div>

            <div class="flow-line"></div>

            <!-- STEP 2 -->
            <div class="step-card bg-white border-2 border-slate-100 p-6 rounded-3xl shadow-sm flex items-center gap-6 group">
                <div class="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg">02</div>
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md uppercase tracking-widest">Enrichment</span>
                    </div>
                    <h3 class="text-xl font-extrabold text-slate-900 italic">INSTANT ENGAGEMENT</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Авто-приветствие через SMS/WA. Клиент получает подтверждение мгновенно.</p>
                </div>
            </div>

            <div class="flow-line"></div>

            <!-- STEP 3 -->
            <div class="step-card bg-white border-4 border-blue-500 p-6 rounded-[2.5rem] shadow-xl shadow-blue-100 flex items-center gap-6 group">
                <div class="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black animate-pulse">03</div>
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded-md uppercase tracking-widest">The Core</span>
                    </div>
                    <h3 class="text-xl font-extrabold text-slate-900 italic">THE HUNT ENGINE</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Запуск параллельного прозвона <span class="text-blue-600 font-bold">VIP-группы</span> менеджеров. Скорость реакции — наш главный KPI.</p>
                </div>
            </div>

            <div class="flow-line"></div>

            <!-- STEP 4 -->
            <div class="step-card bg-white border-2 border-slate-100 p-6 rounded-3xl shadow-sm flex items-center gap-6 group">
                <div class="w-16 h-16 bg-indigo-500 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-indigo-100">04</div>
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-md uppercase tracking-widest">Intelligence</span>
                    </div>
                    <h3 class="text-xl font-extrabold text-slate-900 italic">AI RECAP & SYNC</h3>
                    <p class="text-sm text-slate-500 leading-relaxed">Gemini анализирует запись звонка. Статус в CRM (ServiceTitan/HCP) обновляется автоматически.</p>
                </div>
            </div>
            
            <div class="flow-line"></div>

            <!-- STEP 5 -->
            <div class="step-card bg-green-500 p-8 rounded-[3rem] shadow-2xl shadow-green-200 flex items-center gap-6 group border-4 border-white">
                <div class="w-20 h-20 bg-white text-green-600 rounded-full flex items-center justify-center text-3xl font-black shadow-inner">💰</div>
                <div class="flex-1">
                    <h3 class="text-2xl font-black text-white italic">PROFIT DOMINATION</h3>
                    <p class="text-sm text-green-50 font-medium">Конверсия в продажу вырастает на 280-400% за счет исключения человеческого фактора.</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;

    return (
        <div className="h-full flex flex-col gap-6">
            <Card className="p-1 rounded-full w-fit bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 mx-auto">
                <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
                    <TabsList className="bg-transparent p-0 gap-1">
                        <TabsTrigger value="spec" className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-none data-[state=active]:shadow-sm">
                            <Globe className="w-3 h-3 mr-2" /> Spec Tour
                        </TabsTrigger>
                        <TabsTrigger value="flow" className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-none data-[state=active]:shadow-sm">
                            <GitMerge className="w-3 h-3 mr-2" /> System Flow
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </Card>

            <Card className="flex-1 overflow-hidden bg-white dark:bg-black border-black/5 dark:border-white/5 relative">
                <iframe
                    title="Interactive View"
                    srcDoc={activeView === 'spec' ? specHtml : flowHtml}
                    className="w-full h-full border-none"
                    sandbox="allow-scripts"
                    loading="lazy"
                />
            </Card>
        </div>
    );
}
