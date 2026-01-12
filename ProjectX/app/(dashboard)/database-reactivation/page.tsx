"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";
import { motion } from "framer-motion";
import { Database } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Plus, Sparkles, Calendar, Clock, TrendingUp } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  targetAudience: string;
  lastRun: string;
  leadsGenerated: number;
  status: "active" | "paused";
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "HVAC Reactivation 2024",
    targetAudience: "Past HVAC Clients (12mo ago)",
    lastRun: "Oct 25, 2024",
    leadsGenerated: 45,
    status: "active",
  },
  {
    id: "2",
    name: "Plumbing Follow-up",
    targetAudience: "Past Plumbing Clients",
    lastRun: "Oct 20, 2024",
    leadsGenerated: 28,
    status: "active",
  },
  {
    id: "3",
    name: "Lost Leads Recovery",
    targetAudience: "Leads without conversion",
    lastRun: "Oct 15, 2024",
    leadsGenerated: 12,
    status: "paused",
  },
];

export default function DatabaseReactivationPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [targetSegment, setTargetSegment] = useState("");
  const [messageTemplate, setMessageTemplate] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const handleGenerateAIMessage = () => {
    setMessageTemplate(
      `Hi! We noticed you haven't used our services in a while. We'd love to help you again! Special offer: 15% off your next service. Reply to this message to claim your discount.`
    );
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Module Description */}
      <ModuleDescription
        moduleName="Database Reactivation"
        icon={<Database className="w-6 h-6" />}
        shortDescription="Автоматическая система для реанимации старых клиентов и неконвертированных лидов. Использует AI для персонализации сообщений и авто-отправки через SMS, email, звонки. Реанимация старых клиентов в 5-10 раз дешевле привлечения новых. Один из самых прибыльных модулей с ROI 2,400-9,000%."
        problem="60-70% клиентской базы неактивна (не обращались 12+ месяцев). Конверсия реактивационных кампаний: 8-15% (против 2-5% у холодных лидов). Бизнес теряет $20,000-50,000/год на «спящей» базе."
        businessValue="Для клиентов: Монетизация неактивной базы: 8-15% конверсия в заказ, низкая стоимость лида: $5-15 против $150-300 у новых, увеличение LTV (пожизненной ценности) клиента на 30-50%, автоматизация рутинных рассылок: экономия 3-5 часов в неделю."
        monetization="Base tier: До 500 контактов/мес, 1 канал — включено. Pro tier: До 2,000 контактов/мес, все каналы, A/B тесты — +$200/мес. Enterprise: Безлимит, кастомные сценарии, интеграция в CRM — +$500/мес."
        roi="Реактивация 100 старых клиентов/мес: 10-15 новых сделок × $1,200 = $12,000-18,000/мес. Стоимость кампании: $200-500/мес. ROI: 2,400-9,000% (один из самых прибыльных модулей)."
        example="Пример: У клиента база 1,000 спящих клиентов. Кампания на 200 клиентов/мес: 20-30 реактиваций (10-15% конверсия) × $1,200 = $24,000-36,000. Стоимость кампании: $300/мес. Чистая прибыль: $23,700-35,700/мес. Стоимость модуля: $200/мес. ROI: 11,750-17,750%."
      />

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-semibold text-text-primary dark:text-white">Database Reactivation</h1>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Campaign
        </Button>
      </div>

      {/* Campaign Analytics Visualization */}
      <Card variant="default" className="p-6">
        <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">
          Campaign Performance Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 rounded-xl bg-coral/10 border border-coral/20">
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans mb-1">
              Total Campaigns
            </p>
            <p className="text-3xl font-display font-semibold text-coral">
              {mockCampaigns.length}
            </p>
          </div>
          <div className="text-center p-4 rounded-xl bg-green-600/10 dark:bg-green-400/10 border border-green-600/20 dark:border-green-400/20">
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans mb-1">
              Total Leads Generated
            </p>
            <p className="text-3xl font-display font-semibold text-green-600 dark:text-green-400">
              {mockCampaigns.reduce((sum, c) => sum + c.leadsGenerated, 0)}
            </p>
          </div>
          <div className="text-center p-4 rounded-xl bg-coral/10 border border-coral/20">
            <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans mb-1">
              Active Campaigns
            </p>
            <p className="text-3xl font-display font-semibold text-coral">
              {mockCampaigns.filter((c) => c.status === "active").length}
            </p>
          </div>
        </div>
      </Card>

      {/* Campaign Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="default">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-coral/10">
              <TrendingUp className="w-6 h-6 text-coral" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">Total Messages Sent</p>
              <p className="text-2xl font-display font-semibold text-coral">1,245</p>
            </div>
          </div>
        </Card>
        <Card variant="default">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-600/10 dark:bg-green-400/10">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">Response Rate</p>
              <p className="text-2xl font-display font-semibold text-green-600 dark:text-green-400">18.5%</p>
            </div>
          </div>
        </Card>
        <Card variant="default">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-coral/10">
              <Plus className="w-6 h-6 text-coral" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">New Leads Generated</p>
              <p className="text-2xl font-display font-semibold text-coral">85</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaigns Table */}
        <div className="lg:col-span-2">
          <Card variant="default">
            <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">
              Reactivation Campaigns
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Target Audience</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Leads Generated</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">
                      {campaign.name}
                    </TableCell>
                    <TableCell>{campaign.targetAudience}</TableCell>
                    <TableCell>{campaign.lastRun}</TableCell>
                    <TableCell>{campaign.leadsGenerated}</TableCell>
                    <TableCell>
                      <Badge
                        variant={campaign.status === "active" ? "success" : "warning"}
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Create Campaign Form */}
        {showCreateForm && (
          <div>
            <Card variant="default">
              <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">
                Create New Campaign
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                    Campaign Name
                  </label>
                  <Input
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="Enter campaign name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                    Target Segment
                  </label>
                  <Select
                    value={targetSegment}
                    onChange={(e) => setTargetSegment(e.target.value)}
                  >
                    <option value="">Select segment</option>
                    <option value="hvac-past">Past HVAC Clients</option>
                    <option value="plumbing-past">Past Plumbing Clients</option>
                    <option value="no-conversion">
                      Leads without conversion
                    </option>
                  </Select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                    Message Template
                  </label>
                  <textarea
                    value={messageTemplate}
                    onChange={(e) => setMessageTemplate(e.target.value)}
                    className="w-full rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 px-4 py-3 text-base text-text-primary dark:text-white placeholder:text-black/20 dark:placeholder:text-white/20 focus:outline-none focus:border-coral dark:focus:border-coral focus:bg-white dark:focus:bg-white/10 transition-all duration-300 font-sans min-h-[120px]"
                    placeholder="Enter message template"
                  />
                  <Button
                    variant="outline"
                    className="mt-2 w-full"
                    onClick={handleGenerateAIMessage}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate AI Message
                  </Button>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                    Schedule
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <Button className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </motion.div>
  );
}



