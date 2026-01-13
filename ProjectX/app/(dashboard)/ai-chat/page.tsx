"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";
import { ChatDemo } from "@/components/ai-chat/ChatDemo";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import {
    Edit,
    Eye,
    MessageSquare,
    Send,
    Plus,
    ArrowRight,
    ArrowDown,
} from "lucide-react";

interface Chatbot {
    id: string;
    platform: string;
    status: "active" | "inactive";
    conversationsToday: number;
    bookingsMade: number;
}

const mockChatbots: Chatbot[] = [
    {
        id: "1",
        platform: "Google My Business",
        status: "active",
        conversationsToday: 45,
        bookingsMade: 12,
    },
    {
        id: "2",
        platform: "Yelp",
        status: "active",
        conversationsToday: 32,
        bookingsMade: 8,
    },
    {
        id: "3",
        platform: "WhatsApp",
        status: "inactive",
        conversationsToday: 0,
        bookingsMade: 0,
    },
];

export default function AIChatPage() {
    const [selectedBot, setSelectedBot] = useState<string | null>(null);
    const [botName, setBotName] = useState("HVAC Assistant");
    const [botPersona, setBotPersona] = useState(
        "Friendly, helpful, expert in HVAC repair"
    );
    const [bookingIntegration, setBookingIntegration] = useState("google-calendar");
    const [responseTemplate, setResponseTemplate] = useState(
        "Thank you for contacting us! How can I help you today?"
    );

    return (
        <div
            className="space-y-6"
        >
            {/* Module Description */}
            <ModuleDescription
                moduleName="AI Chat"
                icon={<MessageSquare className="w-6 h-6" />}
                shortDescription="Умные AI-агенты, которые общаются с вашими клиентами 24/7. Они мгновенно отвечают на вопросы, квалифицируют лидов и бронируют встречи прямо в ваш календарь. Работают в Google, Yelp, WhatsApp и Facebook Messenger."
                problem="Клиенты ожидают ответа на сообщение в течение 10 минут, но большинство компаний отвечают на следующее утро. Запросы в нерабочее время (60% трафика в выходные) просто теряются, а менеджеры тратят по 3 часа в день на однотипные ответы."
                businessValue="Для клиента: Работа 24/7 без праздников и выходных. Полная квалификация лида перед передачей менеджеру. Автоматическое бронирование: клиент выбирает время сам прямо в чате. Экономия на штате поддержки."
                monetization="Base tier: 1 платформа, 500 диалогов — включено. Pro tier: 3 платформы, до 2,000 диалогов, CRM-синхронизация — +$200/мес. Enterprise: Все платформы, кастомное обучение на вашей базе — +$600/мес."
                roi="Увеличение количества забронированных встреч на 30-40% за счет ночной работы. Экономия 60-80 человеко-часов в месяц на рутинных ответах. Окупаемость (ROI) составляет 500-800% в зависимости от объема трафика."
                example="Пример: Стоматология получает 100 запросов в Yelp/мес. Без бота отвечали на 40 (остальные — поздно). С AI ботом: 100% ответов 24/7. Это дает +15 забронированных приемов/мес × $400 средний чек = $6,000 доп. выручки. Цена бота: $200. ROI: 2,900%."
            />

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-display font-semibold text-text-primary dark:text-white">AI Chat</h1>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Chatbot
                </Button>
            </div>

            {!selectedBot ? (
                <Card variant="default">
                    <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Chatbot Instances</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Platform</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Conversations Today</TableHead>
                                <TableHead>Bookings Made</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockChatbots.map((bot) => (
                                <TableRow key={bot.id}>
                                    <TableCell className="font-medium">{bot.platform}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={bot.status === "active" ? "success" : "default"}
                                        >
                                            {bot.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{bot.conversationsToday}</TableCell>
                                    <TableCell>{bot.bookingsMade}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setSelectedBot(bot.id)}
                                            >
                                                <Edit className="w-4 h-4 mr-1" />
                                                Edit Bot
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Eye className="w-4 h-4 mr-1" />
                                                View Transcripts
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            ) : (
                <div className="space-y-6">
                    <Button variant="outline" onClick={() => setSelectedBot(null)}>
                        ← Back to Chatbots
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Edit Chatbot Form */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card variant="default">
                                <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Edit Chatbot</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                                            Bot Name
                                        </label>
                                        <Input
                                            value={botName}
                                            onChange={(e) => setBotName(e.target.value)}
                                            placeholder="Enter bot name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                                            Bot Persona
                                        </label>
                                        <textarea
                                            value={botPersona}
                                            onChange={(e) => setBotPersona(e.target.value)}
                                            className="w-full rounded-[2rem] bg-black/5 dark:bg-dark-surface/50 px-4 py-3 text-base text-text-primary dark:text-white placeholder:text-black/30 dark:placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-coral/20 transition-all duration-300 font-sans min-h-[100px]"
                                            placeholder="Describe bot personality and expertise"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                                            Booking Integration
                                        </label>
                                        <Select
                                            value={bookingIntegration}
                                            onChange={(e) => setBookingIntegration(e.target.value)}
                                        >
                                            <option value="google-calendar">Google Calendar</option>
                                            <option value="calendly">Calendly</option>
                                            <option value="none">None</option>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                                            Response Templates
                                        </label>
                                        <textarea
                                            value={responseTemplate}
                                            onChange={(e) => setResponseTemplate(e.target.value)}
                                            className="w-full rounded-[2rem] bg-black/5 dark:bg-dark-surface/50 px-4 py-3 text-base text-text-primary dark:text-white placeholder:text-black/30 dark:placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-coral/20 transition-all duration-300 font-sans min-h-[150px]"
                                            placeholder="Enter custom response templates"
                                        />
                                    </div>
                                    <Button className="w-full">
                                        <Send className="w-4 h-4 mr-2" />
                                        Deploy Chatbot
                                    </Button>
                                </div>
                            </Card>

                            {/* Conversation Flow Builder */}
                            <Card variant="default">
                                <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">
                                    Conversation Flow Builder
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-[2rem] bg-black/5 dark:bg-dark-surface/50 ">
                                        <div className="flex items-center gap-2 mb-2">
                                            <MessageSquare className="w-4 h-4 text-coral" />
                                            <span className="font-sans font-medium text-text-primary dark:text-white">If client says:</span>
                                        </div>
                                        <Input
                                            placeholder="e.g., 'I need HVAC repair'"
                                            className="mb-3"
                                        />
                                        <div className="flex justify-center my-2">
                                            <ArrowDown className="w-5 h-5 text-coral" />
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Send className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            <span className="font-sans font-medium text-text-primary dark:text-white">Bot responds:</span>
                                        </div>
                                        <textarea
                                            placeholder="e.g., 'I can help you with that! What type of HVAC issue are you experiencing?'"
                                            className="w-full rounded-[2rem] bg-black/5 dark:bg-dark-surface/50 px-4 py-3 text-base text-text-primary dark:text-white placeholder:text-black/30 dark:placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-coral/20 transition-all duration-300 font-sans min-h-[80px]"
                                        />
                                    </div>
                                    <Button variant="outline" className="w-full">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Flow Rule
                                    </Button>
                                </div>
                            </Card>
                        </div>

                        {/* Preview */}
                        <div>
                            <Card variant="default" className="h-[600px] flex flex-col">
                                <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Live Preview</h3>
                                <ChatDemo initialMessage={responseTemplate} />
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



