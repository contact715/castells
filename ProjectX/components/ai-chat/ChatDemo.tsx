"use client";

import { useState, useEffect, useRef } from "react";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    role: "user" | "bot";
    text: string;
}

export function ChatDemo({ initialMessage }: { initialMessage: string }) {
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "bot", text: initialMessage }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            text: input
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI delay and response
        setTimeout(() => {
            let botResponse = "I can definitely help with that. Could you provide a bit more detail?";
            const lowerInput = userMsg.text.toLowerCase();

            if (lowerInput.includes("price") || lowerInput.includes("cost")) {
                botResponse = "Our service calls start at $89. We can give you a better estimate if you describe the issue.";
            } else if (lowerInput.includes("schedule") || lowerInput.includes("appointment")) {
                botResponse = "I can check our availability. Would you prefer a morning or afternoon slot?";
            } else if (lowerInput.includes("ac") || lowerInput.includes("cooling")) {
                botResponse = "It sounds like you're having trouble with your cooling system. Is the unit making any noise?";
            }

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "bot",
                text: botResponse
            }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[500px] border border-white/10 rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm">
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
                <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-green-500 absolute bottom-0 right-0 border border-black/50" />
                    <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center text-coral">
                        <Bot className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-sm">AI Assistant (Demo)</h4>
                    <p className="text-xs text-white/40">Typically replies immediately</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === "user"
                                    ? "bg-coral text-white rounded-br-none"
                                    : "bg-white/10 text-white/90 rounded-bl-none"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-white/5 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1">
                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                >
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-black/20 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-coral/50 transition-colors"
                    />
                    <Button
                        type="submit"
                        className="rounded-full w-10 h-10 p-0 flex items-center justify-center shrink-0"
                        disabled={!input.trim() || isTyping}
                    >
                        <Send className="w-4 h-4 ml-0.5" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
