"use client";

import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Video, Phone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";

export default function CalendarPage() {
  const days = Array.from({ length: 35 }, (_, i) => i + 1); // Mock calendar grid days

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight text-white flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-pink-500" />
            Smart Schedule
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-black/5 dark:bg-dark-surface/50 rounded-[2rem] p-1">
            <Button variant="ghost" size="sm"><ChevronLeft className="w-4 h-4" /></Button>
            <span className="px-4 text-white font-medium">Октябрь 2025</span>
            <Button variant="ghost" size="sm"><ChevronRight className="w-4 h-4" /></Button>
          </div>
          <Button className="bg-pink-600 hover:bg-pink-500 text-white">Share Link</Button>
        </div>
      </div>

      {/* Module Description */}
      <ModuleDescription
        moduleName="Smart Schedule"
        icon={<CalendarIcon className="w-6 h-6" />}
        shortDescription="Интеллектуальный календарь, который сам назначает встречи. Интегрируется с вашим Google или Outlook календарем, учитывает занятость мастеров и позволяет клиентам записываться на свободные слоты без звонков."
        problem="Диспетчеры тратят до 2 часов в день на согласование времени визита с клиентами. Около 20% записей отменяются или переносятся из-за забывчивости клиентов. Пустые слоты в расписании — это прямые убытки компании."
        businessValue="Для клиента: Сокращение 'телефонного пинг-понга'. Автоматические напоминания клиентам. Мастера видят свое расписание в реальном времени. Возможность внедрить онлайн-бронирование прямо на сайте."
        monetization="Base tier: 1 календарь — включено. Pro tier: До 10 календарей, групповые записи, кастомная страница бронирования — +$50/мес. Enterprise: Безлимит, интеграция с внешними CRM — +$150/мес."
        roi="Сокращение неявок (no-shows) на 40-50% за счет авто-напоминаний. Освобождение 10-15 часов в месяц работы диспетчера. Повышение загрузки мастеров на 15% за счет плотного графика."
        example="Пример: Ссылка на Smart Schedule была добавлена в SMS-рассылку. За ночь 8 клиентов самостоятельно записались на сервисное обслуживание, заполнив календарь на следующий день без участия менеджера."
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
        {/* Calendar Grid */}
        <div className="lg:col-span-3 bg-surface dark:bg-dark-surface rounded-[2rem] flex flex-col">
          <div className="grid grid-cols-7 ">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
              <div key={d} className="py-3 text-center text-xs font-bold text-text-secondary uppercase">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 grid-rows-5 flex-1 p-2 gap-1">
            {days.map((d, i) => (
              <div key={d} className={`rounded-[2rem] p-2 relative ${i === 14 ? 'bg-pink-500/10 ' : 'hover:bg-black/5 dark:bg-dark-surface/50'}`}>
                <span className={`text-sm ${i === 14 ? 'text-pink-400 font-bold' : 'text-text-secondary'}`}>{d <= 31 ? d : ''}</span>

                {/* Mock Events */}
                {d === 14 && (
                  <div className="mt-2 p-1 bg-bblue-600 rounded text-[10px] text-white truncate">
                    Jim Halpert (Install)
                  </div>
                )}
                {d === 16 && (
                  <div className="mt-2 p-1 bg-purple-600 rounded text-[10px] text-white truncate">
                    Pam Beesly (Estimate)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming List */}
        <Card className="lg:col-span-1 p-0 flex flex-col h-full overflow-hidden">
          <div className="p-4  bg-black/5 dark:bg-dark-surface/50">
            <h3 className="font-bold text-white">Upcoming Appointments</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[
              { time: "10:00 AM", name: "Jim Halpert", type: "On-Site Estimate", color: "bg-bblue-500", icon: Video },
              { time: "2:30 PM", name: "Michael Scott", type: "Discovery Call", color: "bg-purple-500", icon: Phone },
              { time: "Tomorrow", name: "Dwight Schrute", type: "Install Review", color: "bg-green-500", icon: CalendarIcon },
            ].map((evt, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-text-secondary">{evt.time.split(' ')[0]}</span>
                  <div className={`w-0.5 h-full ${evt.color}/30 group-last:hidden`} />
                </div>
                <div className="flex-1 pb-4">
                  <div className="bg-black/5 dark:bg-dark-surface/50 p-3 rounded-[2rem] hover: transition-all">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-white text-sm">{evt.name}</h4>
                      <evt.icon className="w-3 h-3 text-text-tertiary" />
                    </div>
                    <p className="text-xs text-text-secondary mt-1">{evt.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
