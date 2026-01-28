"use client";

import { useState, useEffect, useRef } from "react";
import { Send, User, Bot, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-col h-[500px] rounded-card overflow-hidden bg-black/40 backdrop-blur-md border border-white/5 shadow-2xl">
      {/* Header */}
      <div className="p-4 bg-white/5 border-b border-white/5 flex items-center gap-3">
        <div className="relative">
          <div className="w-2.5 h-2.5 rounded-full bg-success absolute bottom-0 right-0 border-2 border-black z-10 shadow-[0_0_5px_#39FF14]" />
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--accent),0.16)]">
            <Bot className="w-6 h-6" />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-sm text-white flex items-center gap-2">
            Mosco Assistant <span className="px-1.5 py-0.5 rounded text-[9px] bg-primary/20 text-primary border border-primary/30">AI BETA</span>
          </h4>
          <p className="text-xs text-white/40 font-medium">Instant Neural Response</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-5 py-3 text-sm font-medium leading-relaxed shadow-lg backdrop-blur-sm border",
                  msg.role === "user"
                    ? "bg-primary/10 text-primary border-primary/20 rounded-br-sm shadow-[0_0_15px_rgba(var(--accent),0.1)]"
                    : "bg-white/5 text-white/90 border-white/10 rounded-bl-sm"
                )}
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
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
              <span className="text-[10px] text-primary uppercase font-bold mr-2 tracking-wider">Processing</span>
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-black/20 border-t border-white/5">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-3"
        >
          <div className="relative flex-1 group">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Deploy request..."
              className="w-full bg-white/5 rounded-xl px-5 py-3 text-sm text-white placeholder:text-white/20 border border-white/10 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-sans"
            />
            <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
          </div>
          <Button
            type="submit"
            variant="neon"
            disabled={!input.trim() || isTyping}
            className="rounded-xl w-12 h-12 p-0 flex items-center justify-center shrink-0"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
