"use client";

import React, { useState } from 'react';
import {
    LayoutDashboard,
    GitBranch,
    Users,
    Settings,
    Phone,
    MessageSquare,
    Zap,
    TrendingUp,
    CheckCircle2,
    Clock,
    MoreVertical,
    Play,
    ShieldCheck,
    Award,
    AlertCircle,
    FileText,
    ChevronRight,
    Target,
    Sparkles,
    Loader2,
    BrainCircuit,
    BarChart3,
    ThumbsUp,
    ThumbsDown,
    Activity,
    DollarSign,
    Wallet,
    GanttChartSquare
} from 'lucide-react';
import { Card } from "@/components/ui/Card";

// --- Gemini API Configuration ---
const apiKey = ""; // User to provide or mocked
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

const callGemini = async (prompt: string, systemInstruction = "") => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    const fetchWithRetry = async (retries = 5, delay = 1000): Promise<any> => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
                return fetchWithRetry(retries - 1, delay * 2);
            }
            throw error;
        }
    };

    const result = await fetchWithRetry();
    return result.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to get AI response.";
};

// Mock Data & Components adapted for the project structure

export function PrototypeApp() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isHuntActive, setIsHuntActive] = useState(true);

    const managers = [
        { id: 1, name: 'Alex Ivanov', bonus: 450, speed: '2.4s', status: 'online', ckp: 25, empathy: 85, closing: 90, objection: 70, budget: 1000 },
        { id: 2, name: 'Maria Sidorova', bonus: 320, speed: '3.1s', status: 'online', ckp: 30, empathy: 95, closing: 75, objection: 88, budget: 1500 },
        { id: 3, name: 'Ivan Petrov', bonus: 150, speed: '12.4s', status: 'penalty', ckp: 25, empathy: 60, closing: 50, objection: 45, budget: 800 },
        { id: 4, name: 'Elena Kuznetsova', bonus: 510, speed: '1.9s', status: 'online', ckp: 35, empathy: 88, closing: 95, objection: 92, budget: 2000 },
    ];

    const leadTimeline = [
        { time: '10:00:04', type: 'system', text: 'Заявка получена (Google LSA)', icon: <Zap size={14} className="text-yellow-400" /> },
        { time: '10:00:15', type: 'hunt', text: 'Запущена Охота (VIP Group)', icon: <Target size={14} className="text-red-400" /> },
        { time: '10:00:22', type: 'manager', text: 'Alex Ivanov принял вызов', icon: <CheckCircle2 size={14} className="text-blue-400" /> },
        { time: '10:00:25', type: 'call', text: 'Разговор с клиентом (Bridge)', icon: <Phone size={14} className="text-green-500" />, audio: true },
    ];

    const navItems = [
        { id: 'dashboard', label: 'Обзор', icon: <LayoutDashboard size={20} /> },
        { id: 'rop', label: 'Dashboard РОПа', icon: <GanttChartSquare size={20} /> },
        { id: 'workflow', label: 'Workflow', icon: <GitBranch size={20} /> },
        { id: 'leads', label: 'Карточка Лида', icon: <MessageSquare size={20} /> },
        { id: 'coaching', label: 'AI Coaching Lab', icon: <BrainCircuit size={20} /> },
        { id: 'team', label: 'Команда', icon: <Users size={20} /> },
    ];

    return (
        <div className="h-[800px] flex bg-[#0f1115] text-slate-200 font-sans overflow-hidden rounded-card border-black/5 dark:border-white/5 border">
            {/* Sidebar */}
            <nav className="w-64 border-r border-slate-800 flex flex-col bg-[#161920]">
                <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">M</div>
                    <span className="text-xl font-bold tracking-tight text-white italic">mosco.ai</span>
                </div>

                <div className="flex-1 py-6 overflow-y-auto">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-6 py-3 transition-all ${activeTab === item.id ? 'bg-blue-600/10 text-blue-400 border-r-2 border-blue-500 shadow-[inset_0_0_20px_rgba(37,99,235,0.05)]' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                            {item.id === 'rop' && <span className="ml-auto text-[8px] bg-red-600 text-white px-1 rounded-sm uppercase font-bold tracking-tighter">Budget</span>}
                        </button>
                    ))}
                </div>

                <div className="p-4 mx-4 mb-6 bg-slate-800/50 rounded-xl border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Общий бюджет</span>
                        <span className="text-[10px] text-green-400 font-bold">78%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-[78%] h-full bg-blue-500"></div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative bg-gradient-to-b from-[#0f1115] to-[#12141a]">
                <header className="sticky top-0 z-10 bg-[#0f1115]/80 backdrop-blur-xl px-8 py-4 flex items-center justify-between border-b border-slate-800">
                    <h1 className="text-xl font-bold text-white">
                        {navItems.find(i => i.id === activeTab)?.label}
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                            <div className={`w-2 h-2 rounded-full ${isHuntActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                            <span className="text-sm font-medium">{isHuntActive ? 'Охота активна' : 'Охота пауза'}</span>
                            <button
                                onClick={() => setIsHuntActive(!isHuntActive)}
                                className={`ml-2 px-3 py-1 rounded-md text-xs font-bold transition-all ${isHuntActive ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-green-500 text-white'}`}
                            >
                                {isHuntActive ? 'СТОП' : 'ПУСК'}
                            </button>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {activeTab === 'dashboard' && <DashboardView managers={managers} />}
                    {activeTab === 'rop' && <ROPView managers={managers} />}
                    {activeTab === 'workflow' && <WorkflowView />}
                    {activeTab === 'leads' && <LeadCardView timeline={leadTimeline} />}
                    {activeTab === 'coaching' && <CoachingView managers={managers} />}
                    {activeTab === 'team' && <TeamSettingsView managers={managers} />}
                </div>
            </main>
        </div>
    );
}

// Sub-components

const ROPView = ({ managers }: any) => (
    <div className="space-y-8 animate-in fade-in duration-500">
        {/* Financial Overlook */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#161920] p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/10 rounded-lg"><Wallet className="text-green-400" size={20} /></div>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Дневной лимит бонусов</span>
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-white">$1,430</span>
                    <span className="text-sm text-slate-500 mb-1">/ $2,000</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <div className="w-[71%] h-full bg-green-500"></div>
                </div>
            </div>

            <div className="bg-[#161920] p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg"><DollarSign className="text-blue-400" size={20} /></div>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter">Ср. Кост Конверсии (CPA)</span>
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-white">$27.40</span>
                    <span className="text-xs text-green-400 mb-1 flex items-center gap-1">
                        <TrendingUp size={12} /> -12%
                    </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-4 italic">Включает выплаты менеджерам и затраты на телефонию</p>
            </div>

            <div className="bg-[#161920] p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={80} />
                </div>
                <h3 className="text-sm font-bold text-white mb-4">Настройки безопасности</h3>
                <div className="space-y-3 relative z-10">
                    <label className="flex items-center justify-between p-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                        <span className="text-xs text-slate-300">Авто-подтверждение (AI)</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-slate-700 border-none text-blue-500" />
                    </label>
                    <label className="flex items-center justify-between p-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                        <span className="text-xs text-slate-300">Стоп-лимит при ROI &lt; 2.0</span>
                        <input type="checkbox" className="w-4 h-4 rounded bg-slate-700 border-none text-blue-500" />
                    </label>
                </div>
            </div>
        </div>

        {/* Manager Performance Matrix */}
        <div className="bg-[#161920] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/20">
                <h2 className="text-lg font-bold text-white">Эффективность команды (ROP View)</h2>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-slate-800 text-xs font-bold rounded-lg border border-slate-700 hover:bg-slate-700">7 ДНЕЙ</button>
                    <button className="px-3 py-1.5 bg-blue-600 text-xs font-bold rounded-lg text-white">МЕСЯЦ</button>
                </div>
            </div>
            <table className="w-full text-left">
                <thead className="bg-[#0f1115] border-b border-slate-800">
                    <tr>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Охотник</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Освоено бюджета</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Ср. Скорость</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase text-center">ROI Сейлза</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Лимит</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                    {managers.map((m: any) => (
                        <tr key={m.id} className="hover:bg-slate-800/20 transition-all">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs">{m.name[0]}</div>
                                    <span className="text-sm font-semibold text-white">{m.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="space-y-1">
                                    <span className="text-xs font-bold text-white">${m.bonus}</span>
                                    <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${(m.bonus / m.budget) * 100}%` }}></div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs text-slate-400">{m.speed}</td>
                            <td className="px-6 py-4 text-center">
                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${idxFromEmpathy(m.empathy) > 3 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    x{idxFromEmpathy(m.empathy).toFixed(1)}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <input type="text" defaultValue={`$${m.budget}`} className="w-20 bg-slate-900 border border-slate-800 text-xs rounded-md px-2 py-1 text-center font-bold text-slate-400" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const idxFromEmpathy = (v: number) => (v / 20);

const DashboardView = ({ managers }: any) => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Активные Лиды" value="7" icon={<Zap className="text-yellow-400" />} subtitle="LSA & Meta Ads" />
            <StatCard title="Ср. время реакции" value="14 сек" icon={<Clock className="text-blue-400" />} subtitle="Target: < 30s" trend="-2.4s" />
            <StatCard title="ROI (Today)" value="420%" icon={<BarChart3 className="text-green-400" />} subtitle="Marketing Efficiency" />
            <StatCard title="Saved Revenue" value="$4,850" icon={<TrendingUp className="text-indigo-400" />} subtitle="Est. speed-to-lead profit" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#161920] rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-bold text-white mb-8 italic">Speed Conversion Funnel</h2>
                <div className="space-y-6">
                    <FunnelStep label="Total Leads" count="124" width="100%" color="bg-blue-600" />
                    <FunnelStep label="WhatsApp Sent" count="124" width="100%" color="bg-blue-500" />
                    <FunnelStep label="Manager Pickup" count="102" width="82%" color="bg-indigo-500" />
                    <FunnelStep label="Bridge Link" count="89" width="71%" color="bg-green-500" />
                </div>
            </div>

            <div className="bg-[#161920] rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-bold text-white mb-6">Top Hunters</h2>
                <div className="space-y-4">
                    {managers.sort((a: any, b: any) => b.bonus - a.bonus).map((m: any, idx: number) => (
                        <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/20 border border-slate-800/50">
                            <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ${idx === 0 ? 'bg-yellow-500 text-black' : 'bg-slate-700 text-slate-400'}`}>
                                    {idx + 1}
                                </span>
                                <span className="text-sm font-semibold text-white">{m.name}</span>
                            </div>
                            <span className="text-sm font-bold text-green-400">+${m.bonus}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const WorkflowView = () => (
    <div className="animate-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto space-y-6">
        <div className="bg-[#161920] rounded-2xl border border-slate-800 p-12 flex flex-col items-center space-y-8 relative shadow-2xl shadow-blue-900/10">
            <WorkflowNode icon={<Zap className="text-yellow-400" />} label="Trigger" title="New Lead" desc="CRM Webhook / Ads" />
            <div className="w-px h-12 bg-slate-700"></div>
            <WorkflowNode icon={<ShieldCheck className="text-indigo-400" />} label="Filter" title="Fraud Guard" desc="Filtering junk / bots" />
            <div className="w-px h-12 bg-slate-700"></div>
            <WorkflowNode icon={<MessageSquare className="text-green-400" />} label="Action" title="Smart Greeting" desc="WA + Booking Link" />
            <div className="w-px h-12 bg-slate-700"></div>
            <WorkflowNode icon={<Target className="text-red-400" />} label="Call" title="The Hunt Engine" desc="Parallel pro-calling" />
        </div>
    </div>
);

const LeadCardView = ({ timeline }: any) => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#161920] rounded-2xl border border-slate-800 p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-blue-600/20 mx-auto flex items-center justify-center text-blue-400 text-3xl font-bold mb-4">JS</div>
                <h2 className="text-xl font-bold text-white">John Smith</h2>
                <p className="text-sm text-slate-500">+1 (555) 987-6543</p>
                <div className="mt-4 px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-bold uppercase tracking-wider">Hot Lead (LSA)</div>
            </div>
        </div>
        <div className="lg:col-span-3 bg-[#161920] rounded-2xl border border-slate-800 p-8 shadow-inner shadow-black/20">
            <h2 className="text-lg font-bold text-white mb-8">Lead Lifecycle Timeline</h2>
            <div className="relative border-l-2 border-slate-800 ml-4 pl-8 space-y-10">
                {timeline.map((item: any, idx: number) => (
                    <div key={idx} className="relative">
                        <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-[#161920] border-2 border-slate-800 flex items-center justify-center z-10">{item.icon}</div>
                        <div>
                            <span className="text-[10px] font-mono text-slate-500">{item.time}</span>
                            <p className="text-sm font-medium text-white">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const CoachingView = ({ managers }: any) => {
    const [selectedManager, setSelectedManager] = useState(managers[0]);
    const [aiReport, setAiReport] = useState("");
    const [loading, setLoading] = useState(false);

    const generateReport = async () => {
        setLoading(true);
        // Mock AI Call
        setTimeout(() => {
            setAiReport(`Анализ для ${selectedManager.name}:
1. Отличная эмпатия, клиент чувствует поддержку.
2. Стоит ускорить переход к закрытию сделки (Closing).
3. При работе с возражениями по цене используйте технику "Изоляция".`);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Manager Select Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                    {managers.map((m: any) => (
                        <button
                            key={m.id}
                            onClick={() => { setSelectedManager(m); setAiReport(""); }}
                            className={`w-full p-4 rounded-xl border flex flex-col gap-1 text-left transition-all ${selectedManager.id === m.id ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-800/30 border-slate-800 text-slate-400 hover:bg-slate-800/50'}`}
                        >
                            <span className="font-bold text-sm">{m.name}</span>
                            <span className="text-[10px] opacity-60 uppercase tracking-widest">Score: {Math.round((m.empathy + m.closing + m.objection) / 3)}%</span>
                        </button>
                    ))}
                </div>

                {/* Coaching Dashboard */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-[#161920] rounded-3xl border border-slate-800 p-8 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <BrainCircuit size={160} />
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                            <div className="w-32 h-32 rounded-full border-4 border-indigo-500/30 p-2">
                                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-3xl font-bold text-white uppercase">
                                    {selectedManager.name[0]}
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-3xl font-bold text-white mb-2">{selectedManager.name}</h2>
                                <p className="text-slate-500 text-sm italic">AI-анализ производительности</p>
                                <div className="flex gap-4 mt-6 justify-center md:justify-start">
                                    <button onClick={generateReport} disabled={loading} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20">
                                        {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                                        АНАЛИЗ ТЕКУЩЕГО КВАРТАЛА
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <SkillBar label="Эмпатия" value={selectedManager.empathy} color="bg-green-500" />
                            <SkillBar label="Закрытие" value={selectedManager.closing} color="bg-blue-500" />
                            <SkillBar label="Возражения" value={selectedManager.objection} color="bg-purple-500" />
                        </div>

                        {aiReport && (
                            <div className="mt-12 p-6 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl animate-in slide-in-from-bottom-4">
                                <h3 className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Activity size={14} /> AI Insight Report
                                </h3>
                                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                                    {aiReport}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TeamSettingsView = ({ managers }: any) => (
    <div className="bg-[#161920] rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-[#0f1115] border-b border-slate-800">
                <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Salesperson</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">CKP Cost ($)</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase">Penalty</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
                {managers.map((m: any) => (
                    <tr key={m.id} className="hover:bg-slate-800/30 transition-all">
                        <td className="px-6 py-4 flex items-center gap-3 font-semibold text-white">{m.name}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${m.status === 'online' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{m.status}</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-mono text-slate-400">${m.ckp}</td>
                        <td className="px-6 py-4"><span className="text-xs font-bold text-slate-500">{m.status === 'penalty' ? '3/3' : '0/3'}</span></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// --- Small UI Helpers ---

const StatCard = ({ title, value, icon, subtitle, trend }: any) => (
    <div className="bg-[#161920] rounded-2xl border border-slate-800 p-6 shadow-sm hover:border-slate-700 transition-all group">
        <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-slate-800 rounded-lg group-hover:scale-110 transition-transform">
                {icon}
            </div>
            {trend && <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${trend.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{trend}</span>}
        </div>
        <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        <p className="text-[10px] text-slate-500 mt-2 italic">{subtitle}</p>
    </div>
);

const FunnelStep = ({ label, count, width, color }: any) => (
    <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-400">{label}</span>
            <span className="text-white font-bold">{count}</span>
        </div>
        <div className="h-4 bg-slate-800/50 rounded-full overflow-hidden border border-slate-800/50">
            <div
                className={`${color} h-full transition-all duration-1000 ease-out shadow-inner flex items-center justify-end px-3`}
                style={{ width }}
            >
                <span className="text-[10px] text-white font-bold opacity-30">{width}</span>
            </div>
        </div>
    </div>
);

const WorkflowNode = ({ icon, label, title, desc }: any) => (
    <div className="w-64 bg-slate-800/40 border border-slate-700 p-5 rounded-2xl hover:border-blue-500 transition-all cursor-pointer group hover:shadow-lg hover:shadow-blue-500/10">
        <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-slate-900 rounded-md">
                {icon}
            </div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{label}</span>
        </div>
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-[11px] text-slate-500 mt-1 leading-tight">{desc}</p>
    </div>
);

const SkillBar = ({ label, value, color }: any) => (
    <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800/50">
        <div className="flex justify-between mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{label}</span>
            <span className="text-xs font-bold text-white">{value}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
            <div className={`h-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-1000`} style={{ width: `${value}%` }}></div>
        </div>
    </div>
);
