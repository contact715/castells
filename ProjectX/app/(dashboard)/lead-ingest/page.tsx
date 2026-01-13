"use client";

import { SmartLeadForm } from "@/components/dashboard/SmartLeadForm";
import { motion } from "framer-motion";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";
import { LogIn } from "lucide-react";

export default function LeadIngestPage() {
  return (
    <div className="min-h-screen p-8 flex flex-col items-center relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <div className="w-full max-w-5xl mb-12">
        <ModuleDescription
          moduleName="Smart Gateway (Lead Ingest)"
          icon={<LogIn className="w-6 h-6" />}
          shortDescription="Интеллектуальные 'ворота' для входящего трафика. Этот модуль обеспечивает бесшовный прием лидов из любых источников, проводит мгновенную верификацию данных и защищает вашу CRM от ботов и невалидных контактов."
          problem="До 30% лидов из платной рекламы могут быть 'мусором' (неверные телефоны, боты, случайные нажатия). Менеджеры тратят ценное время на попытки дозвониться до несуществующих клиентов, а вы платите за клики, которые никогда не окупятся."
          businessValue="Для клиента: Мгновенная SMS-верификация номера телефона. Проверка географии (ZIP-код) до создания карточки клиента. Защита от спам-атак. Гарантия того, что в работу попадет только качественный, квалифицированный лид."
          monetization="Входит в базовый пакет Smart Forms. Расширенные API-интеграции (Webhook) для внешних систем — +$50/мес."
          roi="Экономия до 30% рабочего времени отдела продаж. Снижение CAC (стоимости привлечения) за счет фильтрации нецелевого трафика. Повышение точности маркетинговой аналитики."
          example="Пример: Система Smart Gateway заблокировала 150 спам-заявок за неделю, которые могли бы парализовать работу двух менеджеров. Вместо этого менеджеры сфокусировались на 50 реальных клиентах и закрыли 12 сделок."
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral/10 /20 text-coral text-xs font-bold uppercase tracking-widest">
            Live Demo
          </div>
          <h1 className="text-5xl font-display font-bold text-white">
            Smart Gateway <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-orange-600">Testing Environment</span>
          </h1>
          <p className="text-xl text-white/60 max-w-lg">
            This interface demonstrates the end-user experience for lead ingestion. It showcases real-time validation, geo-fencing checks, and SMS verification.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-black/5 dark:bg-dark-surface/50 p-4 rounded-[2rem] ">
              <div className="text-2xl font-bold text-white mb-1">400ms</div>
              <div className="text-xs text-white/40">Response Latency</div>
            </div>
            <div className="bg-black/5 dark:bg-dark-surface/50 p-4 rounded-[2rem] ">
              <div className="text-2xl font-bold text-green-400 mb-1">100%</div>
              <div className="text-xs text-white/40">Spam Filtered</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SmartLeadForm />
        </motion.div>
      </div>
    </div>
  );
}
