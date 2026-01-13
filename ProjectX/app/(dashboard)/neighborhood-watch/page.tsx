"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Radar, ExternalLink, MessageCircle, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";

interface Opportunity {
  id: string;
  platform: string;
  post_content: string;
  author: string;
  detected_at: string;
  suggested_response: string;
  sentiment: string;
}

export default function NeighborhoodWatchPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/v1/agent/spy/opportunities?zip_code=90210", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOpportunities(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight text-white flex items-center gap-3">
            <Radar className="w-8 h-8 text-red-500 animate-pulse" />
            Neighborhood Watch
          </h1>
          <p className="text-text-secondary mt-1">
            AI-агент сканирует Nextdoor и Facebook на наличие ключевых слов...
          </p>
        </div>
        <div className="bg-red-500/10 ed-500/20 text-red-400 px-4 py-2 rounded-[2rem] flex items-center gap-2 text-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          Режим «Watch» отслеживает активность конкурентов и уведомляет вас.
        </div>
      </div>

      {/* Module Description */}
      <ModuleDescription
        moduleName="Neighborhood Watch"
        icon={<Radar className="w-6 h-6" />}
        shortDescription="Ваш тайный агент в гиперлокальных сетях (Nextdoor, Facebook Groups). Система в реальном времени отслеживает запросы на услуги в вашем районе и предлагает готовые ответы, позволяя вам забирать лидов раньше конкурентов."
        problem="Более 40% локальных запросов на услуги (сантехника, ремонт, уборка) происходят в закрытых сообществах и чатах. Пока вы ждете лида из Google, ваши соседи уже нанимают кого-то другого в Nextdoor. Владельцы бизнеса физически не могут мониторить эти площадки 24/7."
        businessValue="Для клиента: Мгновенный доступ к «теплому» спросу в вашем районе. Возможность ответить на запрос первым. Рост доверия за счет рекомендаций соседей. Полная автоматизация мониторинга — вы получаете только уведомление о готовой сделке."
        monetization="Base tier: Мониторинг 1 района (ZIP-код) — включено. Pro tier: До 5 районов, расширенные ключевые слова — +$150/мес. Enterprise: Весь город, приоритетное уведомление — +$400/мес."
        roi="Получение 3-5 дополнительных высокомаржинальных заказов в месяц. Экономия на рекламе: стоимость лида из соцсетей в 5-10 раз ниже, чем в Google Ads. Построение репутации «местного эксперта»."
        example="Пример: В группе Nextdoor житель спросил 'кто посоветует хорошего кровельщика?'. Neighborhood Watch обнаружил пост за 2 секунды и прислал уведомление. Менеджер ответил через 5 минут и закрыл сделку на $12,000. Цена модуля: $150. ROI: 7,900%."
      />

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-20 text-text-secondary">Scanning local networks...</div>
        ) : (
          opportunities.map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-[2rem] hover:ed-500/30 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center font-bold text-white">
                    {opp.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{opp.author}</h4>
                    <div className="flex items-center gap-2 text-xs text-text-tertiary">
                      <span className="text-bblue-400">{opp.platform}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" /> {new Date(opp.detected_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs ed-500/20 uppercase font-bold tracking-wider">
                  {opp.sentiment}
                </span>
              </div>

              <div className="bg-black/5 dark:bg-dark-surface/50 p-4 rounded-[2rem] mb-4 text-text-primary text-sm italic -2 ">
                &quot;{opp.post_content}&quot;
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-text-secondary uppercase font-medium">
                  <MessageCircle className="w-3 h-3" />
                  AI Suggested Reply
                </div>
                <textarea
                  className="w-full bg-bblack/20 rounded-[2rem] p-3 text-sm text-white focus:ring-1 focus:ring-bblue-500 outline-none"
                  readOnly
                  value={opp.suggested_response}
                />
                <div className="flex gap-3">
                  <Button className="bg-bblue-600 hover:bg-bblue-500 text-white flex-1">
                    <Check className="w-4 h-4 mr-2" />
                    Approve & Post Reply
                  </Button>
                  <Button variant="outline" className="text-text-secondary hover:bg-black/5 dark:bg-dark-surface/50">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
