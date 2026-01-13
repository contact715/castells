"use client";

import { motion } from "framer-motion";
import { MapPin, Image as ImageIcon, TrendingUp, RefreshCw, UploadCloud } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";

export default function LocalSEOPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight text-white flex items-center gap-3">
            <MapPin className="w-8 h-8 text-bblue-500" />
            Local SEO Engine
          </h1>
          <p className="text-text-secondary mt-1">Управление профилем Google Business (GMB) и инъекция сущностей.</p>
        </div>
        <Button className="bg-bblue-600 hover:bg-bblue-500 text-white"><RefreshCw className="w-4 h-4 mr-2" /> Sync GMB Data</Button>
      </div>

      {/* Module Description */}
      <ModuleDescription
        moduleName="Local SEO Engine"
        icon={<MapPin className="w-6 h-6" />}
        shortDescription="Мощный движок для доминирования в локальном поиске. Автоматически внедряет гео-теги в фото, оптимизирует сущности (entities) и синхронизирует данные вашей компании в 50+ справочниках, чтобы вы всегда были в ТОП-3 Google Maps."
        problem="90% кликов в локальном поиске уходят компаниям из 'Google Map Pack' (первые три места). Если вас там нет — вы невидимы. Поддержание актуальности данных вручную и SEO-оптимизация GMB требует глубоких технических знаний и 20+ часов работы в месяц."
        businessValue="Для клиента: Гарантированное присутствие в ТОП выдачи по ключевым запросам 'рядом со мной'. Рост звонков напрямую из карт. Техническое превосходство над конкурентами за счет скрытых SEO-инъекций (EXIF, Schema, Local Entities)."
        monetization="Base tier: Синхронизация GMB — включено. Pro tier: Гео-тэгирование фото, расширенная сеть каталогов — +$200/мес. Enterprise: Доминирование в нескольких городах, кастомная SEO-стратегия — +$600/мес."
        roi="Увеличение охвата целевой аудитории на 40-70%. Снижение стоимости лида в 3 раза по сравнению с контекстной рекламой. Постоянный поток бесплатных звонков из карт, который только растет со временем."
        example="Пример: Сантехническая компания активировала Local SEO Engine. Через месяц фото с гео-тегами и синхронизация по 52 каталогам подняли их с 15-го на 2-е место в Map Pack. Количество звонков выросло с 15 до 85 в месяц. Доп. прибыль: $35,000+. Цена: $200. ROI: 17,400%."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="default" className="lg:col-span-2">
          <h3 className="text-lg font-bold text-white mb-4">Rank Tracking (Map Pack)</h3>
          <div className="h-64 flex items-center justify-center bg-black/5 dark:bg-dark-surface/50 rounded-[2rem] ">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-bblue-500/50 mx-auto mb-2" />
              <p className="text-text-secondary">Dominates &quot;Near Me&quot; searches by syncing with 50+ directories.</p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card variant="glass" className="p-6">
            <div className="text-sm text-text-secondary mb-1">Total Profile Views</div>
            <div className="text-4xl font-bold text-white">4,291</div>
            <div className="text-xs text-green-400 mt-2">+12% vs last month</div>
          </Card>
          <Card variant="glass" className="p-6">
            <div className="text-sm text-text-secondary mb-1">Calls from GMB</div>
            <div className="text-4xl font-bold text-white">128</div>
            <div className="text-xs text-green-400 mt-2">+8% vs last month</div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white flex gap-2 items-center"><ImageIcon className="w-5 h-5 text-purple-400" /> Geo-Tagged Photo Injection</h3>
            <Button size="sm" variant="outline">Upload New</Button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-4 p-3 bg-black/5 dark:bg-dark-surface/50 rounded-[2rem] ">
                <img src="https://placehold.co/600x400/101010/FFF?text=SEO+Map+Grid" alt="SEO Map Grid" className="rounded-[2rem] shadow-2xl " />
                <div className="w-16 h-12 bg-bblack/40 rounded flex items-center justify-center text-xs text-text-tertiary">IMG_{i}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Project_Site_{i}.jpg</div>
                  <div className="text-xs text-green-400">EXIF Injected: 34.0522° N, 118.2437° W</div>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            ))}
          </div>
        </Card>

        <Card variant="default" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-bblue-500/5 z-0" />
          <div className="relative z-10 text-center py-12">
            <UploadCloud className="w-16 h-16 text-bblue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Automated Posting</h3>
            <p className="text-text-secondary max-w-sm mx-auto mb-6">
              AI will automatically post &quot;Project Spotlights&quot; to your GMB profile 3x a week to boost local relevance.
            </p>
            <Button className="bg-white text-black hover:bg-gray-200">Configure Schedule</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
