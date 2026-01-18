"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Bot, MessageSquare, Sliders, Bell, MapPin, Play, RefreshCw, Moon, Sun, Monitor, Shield, Zap, Database, Globe, Brain, Lock, Facebook, Instagram, Share2, Plus, LayoutGrid, Chrome, Users, ChevronDown, CheckCircle, X, CreditCard, AlertCircle, Phone, Mail, HelpCircle, ExternalLink, Settings as SettingsIcon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Slider } from "@/components/ui/Slider";
import { Card } from "@/components/ui/Card";
import { HeaderActions } from "@/components/layout/HeaderActions";
import { Modal } from "@/components/ui/Modal";
import { Accordion } from "@/components/ui/Accordion";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const { theme, setTheme, accentColor, setAccentColor } = useTheme();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>({
    business_bio: "",
    active_zip_codes: [],
    min_lead_score: 50,
    alert_settings: {},
    lead_score_weights: { property_value: 50, social_presence: 30, urgency: 20 },
    // Notifications
    email_notifications: { frequency: 'instant', types: ['new_lead', 'high_score'] },
    sms_phone: "",
    quiet_hours: { enabled: false, start: '22:00', end: '08:00' },
    telegram_token: "",
    slack_webhook: "",
    notification_sound: true,
    // Security
    two_factor_enabled: false,
    session_timeout: 30,
    ip_whitelist: [],
    api_keys: [],
    data_retention_days: 90,
    privacy_mode: false,
    // Integrations
    crm_integration: { enabled: false, api_key: '', sync_frequency: 'hourly' },
    calendar_integration: { provider: 'none', connected: false },
    payment_gateway: { provider: 'stripe', api_key: '' },
    webhooks: [],
    // Data & Performance
    auto_save_interval: 30,
    export_format: 'csv',
    cache_enabled: true,
    performance_mode: false,
    backup_schedule: 'daily',
    // Accessibility
    language: 'en',
    timezone: 'America/Los_Angeles',
    date_format: 'MM/DD/YYYY',
    currency: 'USD',
    font_size: 16,
    high_contrast: false,
    // Advanced AI
    ai_tone: 'professional',
    ai_response_length: 'medium',
    ai_confidence_threshold: 0.8,
    ai_fallback_behavior: 'polite_decline',
    ai_model: 'gpt-4'
  });

  // Playground State
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: string, content: string }[]>([
    { role: "assistant", content: "Hi! I'm your AI Business Clone. Ask me anything to test my knowledge." }
  ]);
  const [testingAI, setTestingAI] = useState(false);

  const [connectionStatus, setConnectionStatus] = useState<"connected" | "offline">("connected");
  const [connectionStep, setConnectionStep] = useState<"selection" | "authorizing" | "success">("selection");
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  // Messaging Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState("messaging");

  // Verification Sub-Modal
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("608073");

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
        lead_score_weights: { property_value: 60, social_presence: 30, urgency: 10 },
        // Added missing fields to prevent crashes in offline mode
        email_notifications: { frequency: 'instant', types: ['new_lead', 'high_score'] },
        sms_phone: "+1 (555) 000-0000",
        quiet_hours: { enabled: false, start: '22:00', end: '08:00' },
        two_factor_enabled: false,
        session_timeout: 30,
        crm_integration: { enabled: false, api_key: '', sync_frequency: 'hourly' },
        cache_enabled: true,
        high_contrast: false,
        ai_confidence_threshold: 0.8
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
    <div className="flex flex-col h-full gap-8">
      <HeaderActions>
        {connectionStatus === "offline" && (
          <span className="px-2 py-1 text-xs bg-red-500/10 text-red-400 rounded-full font-sans tracking-wide">
            ОФФЛАЙН РЕЖИМ
          </span>
        )}
        <Button onClick={handleSave} variant="primary" size="md" className="bg-white text-black dark:bg-white dark:text-black hover:bg-white/90">
          {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          SAVE CHANGES
        </Button>
      </HeaderActions>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2 bg-black/5 dark:bg-black/40 p-2 rounded-card border border-black/5 dark:border-white/5 h-fit">
          {[
            { id: "general", label: "General & Bio", icon: <Bot className="w-4 h-4" /> },
            { id: "scoring", label: "Scoring Weights", icon: <Sliders className="w-4 h-4" /> },
            { id: "alerts", label: "Alert Matrix", icon: <Bell className="w-4 h-4" /> },
            { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
            { id: "security", label: "Security & Privacy", icon: <Shield className="w-4 h-4" /> },
            { id: "integrations", label: "Integrations", icon: <Zap className="w-4 h-4" /> },
            { id: "data", label: "Data & Performance", icon: <Database className="w-4 h-4" /> },
            { id: "accessibility", label: "Accessibility", icon: <Globe className="w-4 h-4" /> },
            { id: "ai_advanced", label: "Advanced AI", icon: <Brain className="w-4 h-4" /> },
            { id: "appearance", label: "Appearance", icon: <Monitor className="w-4 h-4" /> },
            { id: "playground", label: "AI Playground", icon: <Play className="w-4 h-4" /> },
            { id: "business_connections", label: "Business Connections", icon: <LayoutGrid className="w-4 h-4" /> },
          ].map((tab) => (

            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-full flex items-center gap-3 transition-all text-xs font-medium ${activeTab === tab.id
                ? "bg-black/5 dark:bg-white/10 text-primary dark:text-white shadow-sm"
                : "text-text-secondary hover:bg-black/5 dark:hover:bg-white/5"
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
                    className="w-full h-40 bg-bblack/20 rounded-card p-3 text-sm text-white focus:ring-1 focus:ring-bblue-500 outline-none resize-none"
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
                      <span key={zip} className="px-3 py-1 bg-bblue-500/20 text-bblue-400 rounded-full text-sm blue-500/20">
                        {zip}
                      </span>
                    ))}
                  </div>
                  <Input
                    placeholder="Add ZIP code (e.g. 90210)"
                    className="bg-bblack/20 "
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
                    <span className="text-bblue-400 font-bold">{settings?.lead_score_weights?.property_value}%</span>
                  </div>
                  <Slider
                    value={settings?.lead_score_weights?.property_value || 0}
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
                    <span className="text-purple-400 font-bold">{settings?.lead_score_weights?.social_presence}%</span>
                  </div>
                  <Slider
                    value={settings?.lead_score_weights?.social_presence || 0}
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
                    <span className="text-red-400 font-bold">{settings?.lead_score_weights?.urgency}%</span>
                  </div>
                  <Slider
                    value={settings?.lead_score_weights?.urgency || 0}
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
                        checked={settings?.alert_settings?.[item.key] || false}
                        onChange={(e) => setSettings({
                          ...settings,
                          alert_settings: { ...settings.alert_settings, [item.key]: e.target.checked }
                        })}
                      />
                      <div className="w-11 h-6 bg-black/5 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after: after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after: after:after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bblue-600"></div>
                    </label>
                  </div>
                ))}
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card variant="default" className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">Email Notifications</label>
                  <p className="text-xs text-text-secondary">Configure when and what type of email notifications you receive.</p>
                  {/* Example: Dropdown for frequency, checkboxes for types */}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">SMS Phone Number</label>
                  <Input
                    placeholder="Enter SMS phone number"
                    value={settings?.sms_phone || ""}
                    onChange={(e) => setSettings({ ...settings, sms_phone: e.target.value })}
                    className="bg-bblack/20"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-text-primary dark:text-white">Quiet Hours</label>
                    <p className="text-xs text-text-secondary">Disable notifications during specified hours.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings?.quiet_hours?.enabled || false}
                      onChange={(e) => setSettings({
                        ...settings,
                        quiet_hours: { ...settings.quiet_hours, enabled: e.target.checked }
                      })}
                    />
                    <div className="w-11 h-6 bg-black/5 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after: after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after: after:after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bblue-600"></div>
                  </label>
                </div>
              </Card>
            )}

            {activeTab === "security" && (
              <Card variant="default" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-text-primary dark:text-white">Two-Factor Authentication</label>
                    <p className="text-xs text-text-secondary">Add an extra layer of security to your account.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings?.two_factor_enabled || false}
                      onChange={(e) => setSettings({ ...settings, two_factor_enabled: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-black/5 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after: after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after: after:after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bblue-600"></div>
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">Session Timeout (minutes)</label>
                  <Input
                    type="number"
                    value={settings?.session_timeout || 30}
                    onChange={(e) => setSettings({ ...settings, session_timeout: parseInt(e.target.value) })}
                    className="bg-bblack/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">IP Whitelist</label>
                  <p className="text-xs text-text-secondary">Only allow access from specified IP addresses.</p>
                  {/* Example: Input for adding IPs */}
                </div>
              </Card>
            )}

            {activeTab === "integrations" && (
              <Card variant="default" className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-text-primary dark:text-white">CRM Integration</label>
                    <p className="text-xs text-text-secondary">Connect your CRM for seamless lead management.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings?.crm_integration?.enabled || false}
                      onChange={(e) => setSettings({
                        ...settings,
                        crm_integration: { ...settings.crm_integration, enabled: e.target.checked }
                      })}
                    />
                    <div className="w-11 h-6 bg-black/5 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after: after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after: after:after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bblue-600"></div>
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">Calendar Integration</label>
                  <p className="text-xs text-text-secondary">Sync your calendar for appointment scheduling.</p>
                  {/* Example: Dropdown for provider */}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">Payment Gateway</label>
                  <p className="text-xs text-text-secondary">Configure your payment processing provider.</p>
                  {/* Example: Dropdown for provider */}
                </div>
              </Card>
            )}

            {activeTab === "data" && (
              <Card variant="default" className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">Auto-Save Interval (seconds)</label>
                  <Input
                    type="number"
                    value={settings?.auto_save_interval || 30}
                    onChange={(e) => setSettings({ ...settings, auto_save_interval: parseInt(e.target.value) })}
                    className="bg-bblack/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">Data Export Format</label>
                  <p className="text-xs text-text-secondary">Choose the default format for data exports.</p>
                  {/* Example: Dropdown for format */}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-text-primary dark:text-white">Cache Enabled</label>
                    <p className="text-xs text-text-secondary">Improve performance by caching frequently accessed data.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.cache_enabled}
                      onChange={(e) => setSettings({ ...settings, cache_enabled: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-black/5 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after: after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after: after:after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bblue-600"></div>
                  </label>
                </div>
              </Card>
            )}

            {activeTab === "accessibility" && (
              <Card variant="default" className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">Language</label>
                  <p className="text-xs text-text-secondary">Set the display language for the application.</p>
                  {/* Example: Dropdown for language */}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">Timezone</label>
                  <p className="text-xs text-text-secondary">Adjust the timezone for accurate timestamps.</p>
                  {/* Example: Dropdown for timezone */}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">Font Size</label>
                  <Input
                    type="number"
                    value={settings?.font_size || 16}
                    onChange={(e) => setSettings({ ...settings, font_size: parseInt(e.target.value) })}
                    className="bg-bblack/20"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-text-primary dark:text-white">High Contrast Mode</label>
                    <p className="text-xs text-text-secondary">Enable for improved readability.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.high_contrast}
                      onChange={(e) => setSettings({ ...settings, high_contrast: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-black/5 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after: after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after: after:after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bblue-600"></div>
                  </label>
                </div>
              </Card>
            )}

            {activeTab === "ai_advanced" && (
              <Card variant="default" className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">AI Tone</label>
                  <p className="text-xs text-text-secondary">Define the conversational tone of your AI agent.</p>
                  {/* Example: Dropdown for tone */}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">AI Response Length</label>
                  <p className="text-xs text-text-secondary">Control the verbosity of AI responses.</p>
                  {/* Example: Dropdown for length */}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">AI Confidence Threshold</label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={settings?.ai_confidence_threshold || 0.8}
                    onChange={(e) => setSettings({ ...settings, ai_confidence_threshold: parseFloat(e.target.value) })}
                    className="bg-bblack/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-white">AI Model</label>
                  <p className="text-xs text-text-secondary">Select the underlying AI model for your agent.</p>
                  {/* Example: Dropdown for model */}
                </div>
              </Card>
            )}

            {activeTab === "appearance" && (
              <Card variant="default" className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-coral" /> Theme Preferences
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setTheme("light")}
                      className={`p-4 rounded-card transition-all flex items-center justify-center gap-3 ${theme === "light"
                        ? " bg-white text-black"
                        : " bg-black/5 dark:bg-dark-surface/50 text-white/50 hover:bg-black/5 dark:bg-white/10"
                        }`}
                    >
                      <div className="w-16 h-16 rounded-3xl bg-coral/20 flex items-center justify-center text-coral">
                        <Sun className="w-6 h-6" />
                      </div>
                      <span className="font-bold">Light Mode</span>
                    </button>

                    <button
                      onClick={() => setTheme("dark")}
                      className={`p-4 rounded-card transition-all flex items-center justify-center gap-3 ${theme === "dark"
                        ? " bg-black text-white"
                        : " bg-black/5 dark:bg-dark-surface/50 text-white/50 hover:bg-black/5 dark:bg-white/10"
                        }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-coral">
                        <Moon className="w-6 h-6" />
                      </div>
                      <span className="font-bold">Dark Mode</span>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-coral" /> Brand Individuality
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { id: 'coral', color: '#E08576', label: 'Coral' },
                      { id: 'blue', color: '#85A9E0', label: 'Blue' },
                      { id: 'yellow', color: '#E0C985', label: 'Gold' },
                      { id: 'green', color: '#85E099', label: 'Green' },
                      { id: 'purple', color: '#B085E0', label: 'Purple' },
                      { id: 'rose', color: '#E085C9', label: 'Rose' },
                      { id: 'orange', color: '#E0A585', label: 'Orange' },
                      { id: 'teal', color: '#85E0D9', label: 'Teal' },
                      { id: 'lavender', color: '#C9B3E0', label: 'Lavender' },
                      { id: 'sky', color: '#A3D5FF', label: 'Sky' },
                      { id: 'peach', color: '#FFB5A3', label: 'Peach' },
                      { id: 'lime', color: '#B8E085', label: 'Lime' },
                    ].map((accent) => (
                      <button
                        key={accent.id}
                        onClick={() => setAccentColor(accent.id as any)}
                        title={accent.label}
                        className={`p-2 rounded-xl transition-all flex items-center justify-center group relative ${accentColor === accent.id
                          ? " bg-white/5 ring-2 ring-offset-2 ring-offset-dark-surface/50 text-white scale-110"
                          : " bg-black/5 dark:bg-dark-surface/50 hover:bg-white/5 hover:scale-105"
                          }`}
                      >
                        <div className="w-6 h-6 rounded-full shadow-lg" style={{ backgroundColor: accent.color }}></div>
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-white/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {accent.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "business_connections" && (
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {connectionStep === "selection" && (
                    <motion.div
                      key="selection"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <Card variant="default" className="text-center py-12 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-coral/10 flex items-center justify-center mb-6">
                          <Globe className="w-10 h-10 text-coral" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-white mb-2">Welcome!</h3>
                        <p className="text-text-secondary max-w-md mx-auto mb-8">
                          Connect your first account to get started. Choose from Yelp, Thumbtack, or other channels to allow your AI Agent to communicate with customers.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl px-4 mt-8">
                          <Button
                            onClick={() => { setSelectedProvider("Yelp"); setConnectionStep("authorizing"); }}
                            className="bg-bblue-600 hover:bg-bblue-500 text-white rounded-card py-4 group"
                          >
                            <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
                            ADD YELP BIZ ACCOUNT
                          </Button>
                          <Button
                            onClick={() => { setSelectedProvider("Thumbtack"); setConnectionStep("authorizing"); }}
                            className="bg-bblue-600 hover:bg-bblue-500 text-white rounded-card py-4 group"
                          >
                            <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
                            ADD THUMBTACK ACCOUNT
                          </Button>
                          <Button variant="outline" className="rounded-card py-4 border-white/5 hover:bg-white/5 uppercase text-xs font-bold tracking-widest text-white/50">
                            <Chrome className="w-4 h-4 mr-2 text-[#4285F4]" />
                            Google My Business
                          </Button>
                          <Button variant="outline" className="rounded-card py-4 border-white/5 hover:bg-white/5 uppercase text-xs font-bold tracking-widest text-white/50">
                            <Facebook className="w-4 h-4 mr-2 text-[#1877F2]" />
                            Meta (Facebook/IG)
                          </Button>
                          <Button variant="outline" className="rounded-card py-4 border-white/5 hover:bg-white/5 uppercase text-xs font-bold tracking-widest text-white/50">
                            <MessageSquare className="w-4 h-4 mr-2 text-[#25D366]" />
                            WhatsApp Business
                          </Button>
                          <Button variant="outline" className="rounded-card py-4 border-white/5 hover:bg-white/5 uppercase text-xs font-bold tracking-widest text-white/50">
                            <Share2 className="w-4 h-4 mr-2 text-[#0088cc]" />
                            Telegram Bot
                          </Button>
                        </div>

                        <div className="mt-12 p-6 bg-black/5 dark:bg-dark-surface/50 rounded-card w-full max-w-md border border-white/5">
                          <h4 className="font-bold text-white mb-2 underline decoration-coral underline-offset-4">Need help?</h4>
                          <p className="text-sm text-text-secondary mb-4">
                            Don&apos;t want to set it up yourself? Just give us a call, and we&apos;ll set everything up for you in 5 minutes—completely free.
                          </p>
                          <a href="#" className="text-coral hover:underline font-medium">mos-engine.ai/help</a>
                        </div>
                      </Card>
                    </motion.div>
                  )}

                  {connectionStep === "authorizing" && (
                    <motion.div
                      key="auth"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="max-w-xl mx-auto"
                    >
                      <Card variant="glass" className="p-8 text-center bg-white dark:bg-dark-surface">
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-black dark:text-white">
                            <span className="text-bblue-500">M.O.S. Engine</span> wants access to your {selectedProvider} account
                          </h2>
                        </div>

                        <div className="space-y-6 text-left mb-8">
                          <p className="text-sm font-bold text-text-primary dark:text-white">This will allow M.O.S. Engine to:</p>
                          <div className="space-y-4">
                            {[
                              "View your profile information",
                              "View your activity on " + selectedProvider,
                              "Take actions through your account on your behalf"
                            ].map((perm, i) => (
                              <div key={i} className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-gray-500 dark:text-white/40" />
                                  </div>
                                  <span className="text-sm text-gray-700 dark:text-white/70">{perm}</span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              </div>
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-text-secondary mb-8 leading-relaxed">
                          By clicking <b>Allow</b>, you&apos;re authorizing {selectedProvider} to share the information above with M.O.S. Engine. You can turn off this connection at any time through your account settings. {selectedProvider} does not control how M.O.S. Engine handles your data.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          <Button variant="outline" className="rounded-card h-12" onClick={() => setConnectionStep("selection")}>Cancel</Button>
                          <Button className="bg-bblue-600 hover:bg-bblue-500 text-white rounded-card h-12" onClick={() => setConnectionStep("success")}>Allow</Button>
                        </div>
                      </Card>
                    </motion.div>
                  )}

                  {connectionStep === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* Success Alerts */}
                      <div className="space-y-2">
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2 text-green-500 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            <span>Processed 3 businesses: 3 successful, None failed</span>
                          </div>
                          <X className="w-4 h-4 text-green-500/50 cursor-pointer" />
                        </div>
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
                            <span>Business successfully connected: Dmitry Pro, HandyCleaning, Super Paint! 🥳</span>
                          </div>
                          <X className="w-4 h-4 text-green-500/50 cursor-pointer" />
                        </div>
                      </div>

                      {/* Trial CTA */}
                      <Card className="text-center p-8 bg-black/5 dark:bg-dark-surface/50 border border-bblue-500/30">
                        <h3 className="text-bblue-400 font-bold mb-4">Your account is not active</h3>
                        <Button size="sm" className="bg-coral hover:bg-coral-dark text-white rounded-full px-6 h-9 font-bold text-[11px] uppercase tracking-widest">
                          <CreditCard className="w-4 h-4 mr-2" /> Start Free Trial
                        </Button>
                        <p className="text-[10px] text-text-secondary leading-normal max-w-sm mx-auto">
                          After your free trial: $65/week for up to 25 leads, then $2.99 per lead up to 100, and $2.49 per lead after that.<br />
                          Cancel anytime — no commitment. Billed weekly. No upfront payment.
                        </p>
                      </Card>

                      {/* Provider Account Header */}
                      <Card variant="glass" className="p-6">
                        <div className="flex items-center justify-between mb-8">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-bold text-white">{selectedProvider} Pro Account:</h3>
                              <span className="px-3 py-1 bg-bblue-600 rounded-md text-xs font-bold text-white uppercase tracking-wider">Dmitry Superbis</span>
                            </div>
                            <p className="text-sm text-text-secondary">Email: elvin@leadwinner.ai</p>
                            <p className="text-sm text-text-secondary">Number of businesses: 3 <button className="text-bblue-400 ml-1 hover:underline">Hide businesses</button></p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                            <Sliders className="w-5 h-5 text-white/50" />
                          </div>
                        </div>

                        {/* Business Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {["DMITRY PRO", "HANDYCLEANING", "SUPER PAINT"].map((biz, i) => (
                            <div
                              key={i}
                              className="group bg-surface dark:bg-dark-surface rounded-card p-4 transition-all cursor-pointer border border-white/10 hover:border-coral/40"
                            >
                              <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-gray-400" />
                                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">{biz}</span>
                              </div>
                              <p className="text-xs text-text-secondary mb-1">Link: <button className="text-gray-400 underline">{biz} on {selectedProvider}</button></p>
                              <div className="space-y-0.5 mb-4">
                                <p className="text-xs text-text-secondary">Notification phone number: <span className="text-gray-400">Not set</span></p>
                                <p className="text-[11px] text-[#F4A261] font-medium leading-tight">Open settings to set notification phone number</p>
                                <p className="text-xs text-text-secondary">Notification email: <span className="text-gray-400">elvin@leadwinner.ai</span></p>
                                <p className="text-[11px] text-[#F4A261] font-medium mt-1 cursor-pointer hover:underline">Add business data in the settings</p>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-lg bg-[#E6F0FF] border-none text-[#4D8BFF] hover:bg-[#D9E8FF]"
                                  onClick={() => { setSelectedBusiness(biz); setIsModalOpen(true); }}
                                >
                                  <SettingsIcon className="w-3 h-3 mr-1.5" /> Settings
                                </Button>
                                <Button variant="primary" size="sm" className="rounded-lg bg-[#53D081] hover:bg-[#46BD70] border-none">
                                  Activate
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>

                      <div className="text-center pt-8">
                        <p className="text-xs text-text-secondary">Need Help? <a href="#" className="text-bblue-400 hover:underline">mos-engine.ai/help</a></p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {activeTab === "playground" && (
              <Card variant="default" className="h-[500px] flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 p-2 custom-scrollbar">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-[2rem] px-4 py-2 text-sm ${msg.role === 'user'
                        ? 'bg-bblue-600 text-white'
                        : 'bg-black/5 dark:bg-white/10 text-white'
                        }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {testingAI && (
                    <div className="flex justify-start">
                      <div className="bg-black/5 dark:bg-white/10 rounded-[2rem] px-4 py-2 text-sm text-text-secondary flex items-center gap-2">
                        <Bot className="w-3 h-3" /> Thinking...
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4  flex gap-2">
                  <Input
                    placeholder="Ask your AI clone a question..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChatTest()}
                    className="bg-transparent "
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
      {/* Messaging Settings Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="lg"
        className="bg-white dark:bg-white text-gray-900 rounded-[2rem] overflow-hidden p-0" // Specific light style for this modal
      >
        <div className="flex flex-col h-full bg-[#F8FAFC]">
          {/* Modal Header */}
          <div className="p-8 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 border border-bblue-400 text-bblue-600 rounded text-xs font-bold uppercase">{selectedBusiness}</span>
                <span className="text-gray-500 font-medium">Messaging settings</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </Button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup AI Messages and Follow-ups</h2>
            <a href="#" className="text-bblue-500 text-xs hover:underline mb-4 flex items-center gap-1">
              See Supported Commands and Examples
            </a>

            <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 pb-4 border-b border-gray-100">
              Need any help? Call us at <a href="tel:+14156040279" className="text-bblue-500 hover:underline font-bold">+1 (415) 604-0279</a>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-8 border-b border-gray-100">
              {[
                { id: "messaging", label: "Messaging", icon: <MessageSquare className="w-4 h-4" /> },
                { id: "notifications", label: "Calls & Notifications", icon: <Phone className="w-4 h-4" /> },
                { id: "data", label: "Business Data", icon: <LayoutGrid className="w-4 h-4" /> },
                { id: "advanced", label: "Advanced", icon: <Sliders className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setModalTab(tab.id)}
                  className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors relative ${modalTab === tab.id ? "text-bblue-600 border-b-2 border-bblue-600" : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-4 min-h-[500px]">
            {modalTab === "messaging" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-bold text-gray-800">How to Reply to Customers (Instruction for AI)</label>
                    <HelpCircle className="w-4 h-4 text-gray-300 cursor-help" />
                  </div>
                  <p className="text-xs text-gray-400">Explain here as you would explain to a human</p>
                  <Textarea
                    className="w-full h-40 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 p-4 focus:ring-bblue-500"
                    placeholder="Suggest a call to discuss the project details. Ask them to call the company during business hours or suggest calling then if it's after hours. Include company name and contact info when possible."
                  />
                </div>

                <div className="space-y-2">
                  <Accordion title="Follow-Up Instructions" variant="compact" className="bg-[#EBEDF0] border-none rounded-xl">
                    <div className="p-2">
                      <Textarea placeholder="Instructions for follow-ups..." className="bg-white border-gray-200" />
                    </div>
                  </Accordion>
                  <Accordion title="Services Not Offered & Suggested Replies" variant="compact" className="bg-[#EBEDF0] border-none rounded-xl">
                    <div className="p-2">
                      <Textarea placeholder="Instructions for declining services..." className="bg-white border-gray-200" />
                    </div>
                  </Accordion>
                </div>
              </div>
            )}

            {modalTab === "notifications" && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-gray-800">Business Phone Number for SMS Notifications</label>
                      <HelpCircle className="w-3.5 h-3.5 text-gray-300" />
                    </div>
                    <Input placeholder="+1 (555) 555-5555" className="h-10 border-gray-200 text-sm bg-white" />
                    <button className="text-[10px] text-bblue-600 hover:underline">Paste 6501234567</button>
                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 text-bblue-600" defaultChecked />
                      <span className="text-xs text-gray-700">I consent to receive SMS notifications</span>
                      <HelpCircle className="w-3 h-3 text-gray-300" />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-gray-800">Business Email for Notifications</label>
                      <HelpCircle className="w-3.5 h-3.5 text-gray-300" />
                    </div>
                    <Input placeholder="elvin@leadwinner.ai" className="h-10 border-gray-200 text-sm bg-white" />
                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 text-bblue-600" defaultChecked />
                      <span className="text-xs text-gray-700">I consent to receive email notifications</span>
                      <HelpCircle className="w-3 h-3 text-gray-300" />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-full h-px bg-gray-100" />
                    <span className="relative z-10 bg-[#F8FAFC] px-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">WhatsApp Notifications</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Enable WhatsApp Notifications</span>
                      <HelpCircle className="w-3.5 h-3.5 text-gray-300" />
                    </div>
                    <div className="w-10 h-5 bg-gray-200 rounded-full cursor-not-allowed" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-full h-px bg-gray-100" />
                    <span className="relative z-10 bg-[#F8FAFC] px-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Auto-Dial Settings</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        Enable 2-Way Auto-Dial to Connect Business with Customer
                      </div>
                      <div className="w-10 h-5 bg-gray-200 rounded-full" />
                    </div>

                    {/* Auto-Dial Verification Section from Screenshots */}
                    <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-800">Your business phone number to receive calls (Will also be used as a Caller ID when we call your customer)</label>
                        <div className="flex gap-2">
                          <Input placeholder="+1 (555) 555-5555" className="h-10 border-gray-200 flex-1" />
                          <Button variant="secondary" className="px-8 h-12">
                            <Phone className="w-4 h-4 mr-2" /> Verify
                          </Button>
                        </div>
                        <button className="text-[10px] text-bblue-600 font-medium">Paste 6501234567</button>
                        <p className="text-[10px] text-coral font-medium">Not verified - verification required for calls</p>
                      </div>

                      <Accordion title="How Auto-Dial Works" variant="compact" className="bg-white border border-gray-50 rounded-lg">
                        <div className="p-4 bg-bblue-50/30 rounded-lg flex items-start gap-3">
                          <HelpCircle className="w-4 h-4 text-bblue-500 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-gray-800 mb-1">How we connect you with customer:</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              When a qualified lead is received, our system will automatically call your business phone number first. Once you answer, the system will announce the lead details and then call the customer to bridge the two calls together.
                            </p>
                          </div>
                        </div>
                      </Accordion>
                    </div>

                    <p className="text-[10px] text-gray-400 leading-normal">
                      By enabling this feature, you consent to receive automated phone calls notifying you about new leads at any time of day, and to initiate outbound calls to your customers through the platform to connect you with the customer. You can opt out anytime by disabling this feature in settings. <a href="#" className="underline">Terms</a>, <a href="#" className="underline">Privacy Policy</a>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {modalTab === "data" && (
              <div className="space-y-6">
                <div className="bg-[#E6F0FF] border border-bblue-100 rounded-xl p-6 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-bblue-540 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-bblue-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-800">Setup Required</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Enter your ZIP code and business phone number, then we&apos;ll assign you a local phone number in your area.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-800">ZIP/Postal Code <span className="text-coral">*</span></label>
                    <Input placeholder="94102 (for example)" className="h-10 border-gray-200 rounded-lg bg-white" />
                    <p className="text-[10px] text-gray-400">We&apos;ll assign you a local phone number in your area</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-800">Business Phone Number for SMS and Calls <span className="text-coral">*</span></label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input placeholder="6501234567" className="h-10 pl-10 border-gray-200 rounded-lg bg-white" />
                    </div>
                    <p className="text-[10px] text-gray-400">Customer calls and SMS messages to assigned phone number will be forwarded to this number.</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-800">Custom SMS Message Prompt (for GPT) <span className="text-coral">*</span></label>
                  <p className="text-[10px] text-gray-400">Instructions for AI when generating SMS messages to customers.</p>
                  <Textarea
                    className="w-full h-24 border-gray-200 rounded-lg p-3 text-xs leading-relaxed bg-white"
                    placeholder="Start with business name and greeting. Acknowledge their request briefly. Come up with one engaging question about timeline or preferences. Keep conversational and friendly. Stay under 160 characters."
                  />
                </div>

                <Accordion title="How SMS Communication Works" variant="compact" className="bg-white border border-gray-100 rounded-xl">
                  <div className="p-4 bg-bblue-50/30 rounded-lg flex items-start gap-3">
                    <HelpCircle className="w-4 h-4 text-bblue-500 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-gray-800 mb-1">How It Works:</p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        We automatically generate and send an text (SMS) to each client only once. All other messages can be sent manually.
                      </p>
                    </div>
                  </div>
                </Accordion>

                <div className="flex items-start gap-2 pt-2">
                  <input type="checkbox" className="w-4 h-4 rounded mt-0.5" />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    I agree to receive SMS messages and phone calls from customers, and consent to send automated SMS on my behalf from my assigned phone number. I have read and agree to the <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            )}

            {modalTab === "advanced" && (
              <div className="space-y-4">
                <Accordion title="External Data Sources (Real-Time)" variant="compact" className="bg-white border border-gray-100 rounded-xl">
                  <div className="p-4"><p className="text-xs text-gray-500">No external data sources connected.</p></div>
                </Accordion>
                <Accordion title="Schedule & Timing" variant="compact" className="bg-white border border-gray-100 rounded-xl">
                  <div className="p-4"><p className="text-xs text-gray-500">Default scheduling settings active.</p></div>
                </Accordion>
                <Accordion title="Messaging Rules" variant="compact" className="bg-white border border-gray-100 rounded-xl" defaultOpen>
                  <div className="p-6 space-y-6">
                    <div className="space-y-4 pb-6 border-b border-gray-50">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-bold text-gray-800">Limit Outgoing AI Responses Per Lead (excluding follow-ups)</label>
                        <HelpCircle className="w-4 h-4 text-gray-300" />
                      </div>
                      <Select defaultValue="30" className="h-10 border-gray-200">
                        <option value="1">1 (Only Initial Message, no ongoing conversation)</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                      </Select>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-800">Notify me via SMS / Email when limit is reached</span>
                          <HelpCircle className="w-3.5 h-3.5 text-gray-300" />
                        </div>
                        <div className="w-10 h-5 bg-bblue-600 rounded-full flex items-center justify-end px-1 cursor-pointer">
                          <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pb-6 border-b border-gray-100">
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">AI Model</h4>
                        <p className="text-xs text-gray-400">You can change AI Model that we use to generate responses.</p>
                      </div>
                      <Select defaultValue="gpt4" className="h-10 border-gray-200">
                        <option value="gpt4">Default OpenAI Model: Smart and Fast (Recommended)</option>
                        <option value="claude">Anthropic Claude 3.5 Sonnet: Creative and Intelligent</option>
                        <option value="custom">Custom Fine-tuned Model</option>
                      </Select>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-800">Allow Response Before Complete Customer Data Arrives (Faster but less personalized response)</span>
                          <HelpCircle className="w-3.5 h-3.5 text-gray-300" />
                        </div>
                        <div className="w-10 h-5 bg-gray-200 rounded-full flex items-center justify-start px-1 cursor-pointer">
                          <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-bold text-gray-800">Pause bot after manual response</label>
                        <HelpCircle className="w-4 h-4 text-gray-300" />
                      </div>
                      <Select defaultValue="1month" className="h-10 border-gray-200">
                        <option value="1h">1 hour</option>
                        <option value="1d">1 day</option>
                        <option value="1w">1 week</option>
                        <option value="1month">1 month</option>
                        <option value="never">Never pause</option>
                      </Select>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-800">Don&apos;t Stop Follow-ups on First Business Reply</span>
                          <HelpCircle className="w-3.5 h-3.5 text-gray-300" />
                        </div>
                        <div className="w-10 h-5 bg-gray-200 rounded-full flex items-center justify-start px-1 cursor-pointer">
                          <div className="w-3.5 h-3.5 bg-white rounded-full shadow-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion>
                <Accordion title="Notifications" variant="compact" className="bg-white border border-gray-100 rounded-xl">
                  <div className="p-4"><p className="text-xs text-gray-500">Configure notification preferences.</p></div>
                </Accordion>

                <div className="space-y-2 mt-6">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-bold text-gray-800">Additional instructions for AI</label>
                    <HelpCircle className="w-4 h-4 text-gray-300" />
                  </div>
                  <Textarea
                    className="w-full h-48 border-gray-200 rounded-xl p-4 text-sm bg-white"
                    placeholder="Service pricing and the criteria for sending this information;&#10;Business hours and how responses should be adjusted accordingly;&#10;The conditions under which notifications should be sent to the business owner's email and phone;&#10;Conditions under which bot should stop responding to the client.&#10;And any other instructions."
                  />
                  <button className="text-[10px] text-bblue-600 hover:underline">Paste editable template</button>
                </div>

                <p className="text-[10px] text-gray-400 mt-4">Business ID: <span className="font-mono">556660089749225473</span></p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-8 pt-4 flex items-center justify-end gap-3 bg-[#F8FAFC]">
            <Button variant="ghost" className="rounded-xl border border-gray-200 h-11 px-8 text-gray-600 font-bold" onClick={() => setIsModalOpen(false)}>
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
            <Button
              className="rounded-xl bg-bblue-600 hover:bg-bblue-500 text-white h-11 px-8 font-bold flex items-center gap-2"
              onClick={() => {
                setIsModalOpen(false);
                // Trigger success notification
              }}
            >
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </div>

        {/* Verification Overlay Sub-Modal */}
        <AnimatePresence>
          {showVerification && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] bg-black/40 flex items-center justify-center p-8 backdrop-blur-[2px]"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-white rounded-[2rem] w-full max-w-sm p-8 shadow-2xl space-y-6"
              >
                <h3 className="text-xl font-bold text-gray-900">Phone Verification Call</h3>

                <div className="bg-bblue-50/50 p-4 rounded-xl flex items-center gap-3">
                  <Phone className="w-5 h-5 text-bblue-500" />
                  <p className="text-sm font-medium text-gray-700">We are calling: <span className="font-bold">+16501234567</span></p>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-700 font-bold">When you answer the call:</p>
                  <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2 ml-1">
                    <li>Listen to the automated message</li>
                    <li>Enter this validation code on your phone:</li>
                  </ol>
                </div>

                <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-6 text-center">
                  <div className="text-3xl font-mono font-bold tracking-[0.5rem] text-gray-800">608073</div>
                </div>

                <p className="text-[10px] text-gray-400 text-center">This window will close automatically when verification is complete</p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button className="h-10 rounded-xl bg-bblue-600 hover:bg-bblue-500 text-white font-bold" onClick={() => setShowVerification(false)}>
                    Check Status
                  </Button>
                  <Button variant="outline" className="h-10 rounded-xl border-none bg-gray-100 text-gray-600 font-bold" onClick={() => setShowVerification(false)}>
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </div>
  );
}
