"use client";

import { motion } from "framer-motion";
import { Wrench, CheckCircle, Navigation, Camera, Phone, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";

export default function TechPortalPage() {
  return (
    <div className="max-w-md mx-auto space-y-6 pb-20">
      {/* Module Description */}
      <ModuleDescription
        moduleName="Field Tech App (Tech Portal)"
        icon={<Wrench className="w-6 h-6" />}
        shortDescription="Мобильное рабочее место для ваших мастеров в полях. Позволяет управлять расписанием, прокладывать маршруты к клиенту, фиксировать результаты работы через фотоохоту и подписывать акты прямо на смартфоне."
        problem="Потеря информации при передаче заказа от диспетчера мастеру. Отсутствие фото-доказательств выполненных работ. Медленная отчетность: менеджер узнает о завершении работы только в конце дня. Лишние пробеги из-за неоптимальных маршрутов."
        businessValue="Для клиента: Мгновенная синхронизация статусов работ с CRM. Профессиональный сервис: клиент получает уведомление, когда мастер выезжает. Качественный сбор контента (фото 'До' и 'После') для SEO и соцсетей."
        monetization="Base tier: До 3 активных мастеров — включено. Pro tier: До 10 мастеров, оффлайн режим, расширенные чек-листы — +$150/мес. Enterprise: Безлимит, интеграция с GPS-трекерами — +$400/мес."
        roi="Сокращение 'пустых' пробегов на 20% за счет навигации. Рост производительности мастеров на 15-20%. Исключение конфликтных ситуаций с клиентами благодаря фото-фиксации работ. ROI модуля: 300-500%."
        example="Пример: Мастер использует портал для загрузки фото выполненной очистки дымохода. Эти фото автоматически уходят в Content Engine для поста в GMB и в CRM для отчета клиенту. Это экономит мастеру 15 минут на каждом заказе."
      />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-white flex items-center gap-2">
            <Wrench className="w-6 h-6 text-yellow-500" />
            Field Tech App
          </h1>
          <p className="text-sm text-text-secondary">PWA Mode: Online</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center font-bold text-white">
          JD
        </div>
      </div>

      {/* Current Job */}
      <Card className="bg-bblue-600 ">
        <div className="flex justify-between items-start mb-4">
          <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded">IN PROGRESS</span>
          <span className="text-white text-xs opacity-80">Started: 8:30 AM</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">Smith Residence</h2>
        <div className="flex items-center gap-2 text-bblue-100 text-sm mb-6">
          <MapPin className="w-4 h-4" /> 123 Oak St, Beverly Hills
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-white text-bblue-600 hover:bg-bblue-50 w-full"><Navigation className="w-4 h-4 mr-2" /> Navigate</Button>
          <Button className="bg-bblue-500 text-white hover:bg-bblue-400 w-full "><Phone className="w-4 h-4 mr-2" /> Call</Button>
        </div>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card variant="glass" className="flex flex-col items-center justify-center py-6 gap-2 hover:bg-black/5 dark:bg-dark-surface/50 cursor-pointer">
          <Camera className="w-8 h-8 text-purple-400" />
          <span className="text-sm font-medium text-white">Add Photos</span>
        </Card>
        <Card variant="glass" className="flex flex-col items-center justify-center py-6 gap-2 hover:bg-black/5 dark:bg-dark-surface/50 cursor-pointer">
          <CheckCircle className="w-8 h-8 text-green-400" />
          <span className="text-sm font-medium text-white">Mark Complete</span>
        </Card>
      </div>

      {/* Today's Schedule */}
      <div>
        <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Clock className="w-4 h-4" /> Next Jobs</h3>
        <div className="space-y-3">
          {[
            { time: "11:00 AM", name: "Starbucks HQ", type: "Preventative Maintenance", status: "Pending" },
            { time: "2:00 PM", name: "Metro Station", type: "Emergency Repair", status: "Pending" },
          ].map((job, i) => (
            <div key={i} className="bg-surface p-4 rounded-[2rem] flex items-center justify-between opacity-60">
              <div>
                <div className="text-lg font-bold text-white">{job.time}</div>
                <div className="text-sm font-medium text-text-primary">{job.name}</div>
                <div className="text-xs text-text-secondary">{job.type}</div>
              </div>
              <Button variant="ghost" size="sm" disabled>View</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
