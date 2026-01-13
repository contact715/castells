"use client";

import { motion } from "framer-motion";
import { Shield, AlertTriangle, Lock, FileText, CheckCircle, Ban } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-emerald-500" />
            Compliance Guardian
          </h1>
          <p className="text-text-secondary mt-1">Статус: <span className="text-emerald-400 font-bold">АКТИВЕН</span> (Защита TCPA и DNC включена)</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><FileText className="w-4 h-4 mr-2" /> Export Audit Log</Button>
        </div>
      </div>

      {/* Module Description */}
      <ModuleDescription
        moduleName="Compliance Guardian"
        icon={<Shield className="w-6 h-6" />}
        shortDescription="Ваша юридическая броня в мире цифрового маркетинга. Система автоматически фильтрует контакты через реестры DNC (Do Not Call), проверяет согласия TCPA и обеспечивает полное соответствие законам о рекламе США и Канады."
        problem="Нарушение закона TCPA может стоить бизнесу от $500 до $1,500 за каждый нежелательный звонок или SMS. Один массовый обзвон без проверки базы может привести к многомиллионным штрафам и мгновенной блокировке всех телефонных номеров компании."
        businessValue="Для клиента: Полное спокойствие и защита от юридических рисков. Автоматическая очистка базы от 'опасных' номеров. Сохранение репутации отправителя (sender score), что гарантирует доставку ваших сообщений клиентам."
        monetization="Base tier: Проверка по DNC реестрам — включено. Pro tier: Расширенные аудит-логи, защита от судебных исков — +$150/мес. Enterprise: Выделенный комплаенс-офицер, страхование рисков — +$500/мес."
        roi="Предотвращение штрафов: потенциальная экономия от $10,000 до $1M+. Сокращение времени на юридическую проверку баз. ROI модуля невозможно оценить в процентах, так как это 'страховка', спасающая бизнес от закрытия."
        example="Пример: Перед запуском кампании на 5,000 номеров, Compliance Guardian выявил 420 номеров в черном списке DNC. Это превентивно спасло компанию от потенциального штрафа в $210,000 (420 × $500)."
      />

      {/* Risk Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="glass" className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <div className="text-sm text-text-secondary">Risk Score</div>
            <div className="text-2xl font-bold text-white">Low (2%)</div>
          </div>
        </Card>
        <Card variant="glass" className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
            <Ban className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <div className="text-sm text-text-secondary">Blocked Numbers (DNC)</div>
            <div className="text-2xl font-bold text-white">1,420</div>
          </div>
        </Card>
        <Card variant="glass" className="p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-bblue-500/20 flex items-center justify-center">
            <Lock className="w-6 h-6 text-bblue-500" />
          </div>
          <div>
            <div className="text-sm text-text-secondary">Data Erasure Requests</div>
            <div className="text-2xl font-bold text-white">3</div>
          </div>
        </Card>
      </div>

      {/* Activity Log */}
      <Card className="p-0 overflow-hidden ">
        <div className="p-4  bg-black/5 dark:bg-dark-surface/50">
          <h3 className="font-bold text-white">Recent Compliance Actions</h3>
        </div>
        <div className="divide-y divide-white/10">
          {[
            { action: "Blocked Call", reason: "DNC Registry Match", time: "2 mins ago", icon: Ban, color: "text-red-400" },
            { action: "Scrubber Check", reason: "Valid Mobile Number", time: "5 mins ago", icon: CheckCircle, color: "text-emerald-400" },
            { action: "Data Encryption", reason: "Daily Backup Secured", time: "1 hour ago", icon: Lock, color: "text-bblue-400" },
            { action: "Opt-Out Request", reason: "User replied STOP", time: "2 hours ago", icon: AlertTriangle, color: "text-yellow-400" },
          ].map((item, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-black/5 dark:bg-dark-surface/50 transition-colors">
              <div className="flex items-center gap-4">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <div>
                  <div className="text-sm font-medium text-white">{item.action}</div>
                  <div className="text-xs text-text-secondary">{item.reason}</div>
                </div>
              </div>
              <div className="text-xs text-text-tertiary">{item.time}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
