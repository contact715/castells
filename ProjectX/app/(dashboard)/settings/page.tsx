"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Bot, MessageSquare, Sliders, Bell, MapPin, Play, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { Card } from "@/components/ui/Card";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState<any>({
        business_bio: "",
        active_zip_codes: [],
        min_lead_score: 50,
        alert_settings: {},
        lead_score_weights: { property_value: 50, social_presence: 30, urgency: 20 }
    });

    // Playground State
    const [chatInput, setChatInput] = useState("");
    const [chatHistory, setChatHistory] = useState<{ role: string, content: string }[]>([
        { role: "assistant", content: "Hi! I'm your AI Business Clone. Ask me anything to test my knowledge." }
    ]);
    const [testingAI, setTestingAI] = useState(false);

    const [connectionStatus, setConnectionStatus] = useState<"connected" | "offline">("connected");

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const token = localStorage.getItem("token");
            // Using mock data fallback if backend is offline for demo
            const res = await fetch("http://localhost:8000/api/v1/settings", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setSettings(data);
                setConnectionStatus("connected");
            } else {
                throw new Error("Backend error");
            }
        } catch (e) {
            // Fallback Mock
            console.log("Backend offline, switching to demo mode.");
            setConnectionStatus("offline");
            setSettings({
                business_bio: "We are a premier HVAC company serving the greater metro area since 1995. Our team is certified and we offer 24/7 emergency services.",
                active_zip_codes: ["90210", "90001", "90045"],
                min_lead_score: 60,
                alert_settings: { sms_on_new_lead: true, email_daily_summary: true, telegram_hot_alerts: false },
                lead_score_weights: { property_value: 60, social_presence: 30, urgency: 10 }
            });
        }
    };

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => setLoading(false), 1000);
        // Ensure backend call exists in real implementation
    };

    const handleChatTest = async () => {
        if (!chatInput.trim()) return;

        const userMsg = chatInput;
        setChatHistory(prev => [...prev, { role: "user", content: userMsg }]);
        setChatInput("");
        setTestingAI(true);

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:8000/api/v1/settings/chat-test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: userMsg,
                    business_bio: settings.business_bio
                })
            });

            if (res.ok) {
                const data = await res.json();
                setChatHistory(prev => [...prev, { role: "assistant", content: data.response }]);
            } else {
                setChatHistory(prev => [...prev, { role: "assistant", content: "Error connecting to AI brain." }]);
            }
        } catch (e) {
            setChatHistory(prev => [...prev, { role: "assistant", content: "Backend offline. (Mock Response): Based on your bio, I would answer..." }]);
        } finally {
            setTestingAI(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <div>
                        <h1 className="text-3xl font-bold font-display tracking-tight text-white flex items-center gap-3">
                            Client Workspace
                            {connectionStatus === "offline" && (
                                <span className="px-2 py-1 text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-full font-sans tracking-wide">
                                    OFFLINE MODE
                                </span>
                            )}
                        </h1>
                        <p className="text-text-secondary mt-1">Configure your AI Brain, Alerts, and Scoring Logic.</p>
                    </div>        </div>
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white">
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    {[
                        { id: "general", label: "General & Bio", icon: <Bot className="w-4 h-4" /> },
                        { id: "scoring", label: "Scoring Weights", icon: <Sliders className="w-4 h-4" /> },
                        { id: "alerts", label: "Alert Matrix", icon: <Bell className="w-4 h-4" /> },
                        { id: "playground", label: "AI Playground", icon: <Play className="w-4 h-4" /> },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${activeTab === tab.id
                                ? "bg-blue-600 text-white shadow-lg"
                                : "text-text-secondary hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === "general" && (
                            <Card variant="default" className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-primary dark:text-white">Business Bio (AI Knowledge Base)</label>
                                    <p className="text-xs text-text-secondary">This text authenticates your AI. Include hours, pricing, and history.</p>
                                    <textarea
                                        className="w-full h-40 bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                                        value={settings.business_bio}
                                        onChange={(e) => setSettings({ ...settings, business_bio: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-primary dark:text-white flex items-center gap-2">
                                        <MapPin className="w-4 h-4" /> Active ZIP Codes
                                    </label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {settings.active_zip_codes.map((zip: string) => (
                                            <span key={zip} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/20">
                                                {zip}
                                            </span>
                                        ))}
                                    </div>
                                    <Input
                                        placeholder="Add ZIP code (e.g. 90210)"
                                        className="bg-black/20 border-white/10"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const val = e.currentTarget.value;
                                                setSettings({ ...settings, active_zip_codes: [...settings.active_zip_codes, val] });
                                                e.currentTarget.value = "";
                                            }
                                        }}
                                    />
                                </div>
                            </Card>
                        )}

                        {activeTab === "scoring" && (
                            <Card variant="default" className="space-y-8">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-white">Property Value Weight</label>
                                        <span className="text-blue-400 font-bold">{settings.lead_score_weights.property_value}%</span>
                                    </div>
                                    <Slider
                                        value={settings.lead_score_weights.property_value}
                                        max={100}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            lead_score_weights: { ...settings.lead_score_weights, property_value: parseInt(e.target.value) }
                                        })}
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-white">Social Presence Weight</label>
                                        <span className="text-purple-400 font-bold">{settings.lead_score_weights.social_presence}%</span>
                                    </div>
                                    <Slider
                                        value={settings.lead_score_weights.social_presence}
                                        max={100}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            lead_score_weights: { ...settings.lead_score_weights, social_presence: parseInt(e.target.value) }
                                        })}
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label className="text-sm font-medium text-white">Urgency Weight</label>
                                        <span className="text-red-400 font-bold">{settings.lead_score_weights.urgency}%</span>
                                    </div>
                                    <Slider
                                        value={settings.lead_score_weights.urgency}
                                        max={100}
                                        onChange={(e) => setSettings({
                                            ...settings,
                                            lead_score_weights: { ...settings.lead_score_weights, urgency: parseInt(e.target.value) }
                                        })}
                                    />
                                </div>
                            </Card>
                        )}

                        {activeTab === "alerts" && (
                            <Card variant="default" className="divide-y divide-white/10">
                                {[
                                    { key: "sms_on_new_lead", label: "SMS on New Lead", desc: "Get a text instantly when a new lead arrives." },
                                    { key: "email_daily_summary", label: "Daily Email Summary", desc: "Receive a PDF report at 8:00 AM." },
                                    { key: "telegram_hot_alerts", label: "Telegram Hot Alerts", desc: "For leads with a score > 90." },
                                ].map((item) => (
                                    <div key={item.key} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                                        <div>
                                            <h4 className="text-white font-medium">{item.label}</h4>
                                            <p className="text-xs text-text-secondary">{item.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={settings.alert_settings[item.key] || false}
                                                onChange={(e) => setSettings({
                                                    ...settings,
                                                    alert_settings: { ...settings.alert_settings, [item.key]: e.target.checked }
                                                })}
                                            />
                                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </Card>
                        )}

                        {activeTab === "playground" && (
                            <Card variant="default" className="h-[500px] flex flex-col">
                                <div className="flex-1 overflow-y-auto space-y-4 p-2 custom-scrollbar">
                                    {chatHistory.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white/10 text-white'
                                                }`}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                    {testingAI && (
                                        <div className="flex justify-start">
                                            <div className="bg-white/10 rounded-2xl px-4 py-2 text-sm text-text-secondary flex items-center gap-2">
                                                <Bot className="w-3 h-3 animate-bounce" /> Thinking...
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                                    <Input
                                        placeholder="Ask your AI clone a question..."
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleChatTest()}
                                        className="bg-transparent border-white/10"
                                    />
                                    <Button onClick={handleChatTest} disabled={testingAI}>
                                        <MessageSquare className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Card>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
