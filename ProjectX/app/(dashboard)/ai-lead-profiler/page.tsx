"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";
import { Modal } from "@/components/ui/Modal";
import { motion } from "framer-motion";
import { UserSearch } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Eye, Facebook, Twitter, Linkedin, FileText } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  zip: string;
  leadScore: number;
  propertyValue: string;
  socialProfiles: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  aiSummary: string;
  salesCheatSheet?: string[];
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    email: "john.doe@email.com",
    zip: "10005",
    leadScore: 95,
    propertyValue: "$1.2M",
    socialProfiles: {
      facebook: "facebook.com/johndoe",
      linkedin: "linkedin.com/in/johndoe",
    },
    aiSummary: "High-value homeowner, active on social media, previous HVAC service history",
    salesCheatSheet: [
      "💰 High-Value Property: Pitch premium 'Inverter' systems.",
      "⚠️ Home built before 2000: HVAC likely nearing end of life.",
      "👔 Decision Maker: Likely values time over lowest price."
    ]
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "+1 (555) 234-5678",
    email: "jane.smith@email.com",
    zip: "10010",
    leadScore: 78,
    propertyValue: "$850K",
    socialProfiles: {
      twitter: "twitter.com/janesmith",
    },
    aiSummary: "Mid-value property, new homeowner, interested in maintenance services",
    salesCheatSheet: [
      "🏠 New Homeowner: Pitch 'Peace of Mind' maintenance plan.",
      "⚡ Energy Conscious: Mention SEER2 ratings."
    ]
  },
  {
    id: "3",
    name: "Bob Johnson",
    phone: "+1 (555) 345-6789",
    email: "bob.j@email.com",
    zip: "10020",
    leadScore: 65,
    propertyValue: "$600K",
    socialProfiles: {},
    aiSummary: "Lower engagement, needs nurturing, potential for long-term value",
    salesCheatSheet: [
      "📉 Budget Conscious: Lead with financing options.",
      "🔧 Repair vs Replace: Focus on extending unit life."
    ]
  },
  {
    id: "4",
    name: "Alice Williams",
    phone: "+1 (555) 456-7890",
    email: "alice.w@email.com",
    zip: "10001",
    leadScore: 88,
    propertyValue: "$1.5M",
    socialProfiles: {
      facebook: "facebook.com/alicew",
      linkedin: "linkedin.com/in/alicew",
      twitter: "twitter.com/alicew",
    },
    aiSummary: "Premium client, strong social presence, multiple properties",
    salesCheatSheet: [
      "🏢 Mutli-Property Owner: Pitch portfolio maintenance deal.",
      "🌟 VIP Status: Offer priority dispatch."
    ]
  },
];

export default function AILeadProfilerPage() {
  const [propertyWeight, setPropertyWeight] = useState(60);
  const [socialWeight, setSocialWeight] = useState(30);
  const [requireTrueCaller, setRequireTrueCaller] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const getScoreBadge = (score: number) => {
    if (score >= 90) return <Badge variant="success">{score}/100</Badge>;
    if (score >= 70) return <Badge variant="info">{score}/100</Badge>;
    if (score >= 50) return <Badge variant="warning">{score}/100</Badge>;
    return <Badge variant="danger">{score}/100</Badge>;
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
        moduleName="AI Lead Profiler"
        icon={<UserSearch className="w-6 h-6" />}
        shortDescription="Автоматическая система анализа и скоринга качества лидов на базе AI. Анализирует соцсети, данные о недвижимости, историю взаимодействий и присваивает каждому лиду балл от 0 до 100. Увеличивает конверсию на 35-60%, фокусируя менеджеров на качественных лидах и экономя 3-5 часов в день."
        problem="Менеджеры тратят 60-70% времени на «холодных» лидов с низкой вероятностью сделки. Средняя конверсия всех лидов: 8-15%. Качественных лидов (90+ баллов): конверсия 45-60%. Без профилирования менеджеры не знают, кому звонить, теряя время и упуская горячих клиентов."
        businessValue="Для клиентов: Рост конверсии на 35-60% (фокус на качестве), экономия времени менеджера (3-5 часов/день = $2,000-4,000/мес), увеличение среднего чека на 25-35% (фокус на дорогих клиентах), снижение выгорания менеджеров (меньше стресса от холодных звонков)."
        monetization="Base tier: Профилирование до 500 лидов/мес — включено. Pro tier: До 2,000 лидов/мес, расширенная аналитика — +$200/мес. Enterprise: Безлимит, кастомные алгоритмы, API — +$800/мес."
        roi="Экономия времени менеджера: $2,000-4,000/мес. Рост конверсии с 10% до 15% = +50% сделок. При 100 лидах/мес: было 10 сделок, стало 15 = +5 сделок × $1,000 = $5,000 доп. выручки. Общий ROI: 500-700%."
        example="Пример: Клиент получает 200 лидов/мес. Без профилирования: 20 сделок (10% конверсия) × $1,200 = $24,000. С AI Profiler: 30 сделок (15% конверсия, фокус на качестве) × $1,500 (выше чек) = $45,000. Доп. выручка: $21,000/мес. Стоимость Profiler: $200/мес. ROI: 10,400%."
      />

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-semibold text-text-primary dark:text-white">AI Lead Profiler</h1>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Lead Score Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Table */}
        <div className="lg:col-span-2">
          <Card variant="default">
            <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Recent Profiled Leads</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>ZIP</TableHead>
                    <TableHead>Lead Score</TableHead>
                    <TableHead>Property Value</TableHead>
                    <TableHead>Social Profiles</TableHead>
                    <TableHead>AI Summary</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.zip}</TableCell>
                      <TableCell>{getScoreBadge(lead.leadScore)}</TableCell>
                      <TableCell>{lead.propertyValue}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {lead.socialProfiles.facebook && (
                            <Facebook className="w-4 h-4 text-blue-500" />
                          )}
                          {lead.socialProfiles.twitter && (
                            <Twitter className="w-4 h-4 text-blue-400" />
                          )}
                          {lead.socialProfiles.linkedin && (
                            <Linkedin className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {lead.aiSummary}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowProfileModal(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        {/* Lead Score Configuration */}
        <div>
          <Card variant="default">
            <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">
              Lead Score Configuration
            </h3>
            <div className="space-y-6">
              <div>
                <Slider
                  label="Weight for Property Value"
                  min={0}
                  max={100}
                  value={propertyWeight}
                  onChange={(e) =>
                    setPropertyWeight(Number(e.target.value))
                  }
                />
              </div>
              <div>
                <Slider
                  label="Weight for Social Presence"
                  min={0}
                  max={100}
                  value={socialWeight}
                  onChange={(e) => setSocialWeight(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireTrueCaller}
                    onChange={(e) => setRequireTrueCaller(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-sans text-text-primary dark:text-white">
                    Require TrueCaller Verification for max score
                  </span>
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* View Full Profile Modal */}
      <Modal
        isOpen={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          setSelectedLead(null);
        }}
        title={selectedLead ? `Lead Profile: ${selectedLead.name}` : "Lead Profile"}
        size="lg"
      >
        {selectedLead && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-1 font-sans">
                  Lead Score
                </p>
                <div className="text-3xl font-display font-semibold text-coral">
                  {selectedLead.leadScore}/100
                </div>
                {getScoreBadge(selectedLead.leadScore)}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-1 font-sans">
                  Property Value
                </p>
                <div className="text-2xl font-display font-semibold text-text-primary dark:text-white">
                  {selectedLead.propertyValue}
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                Contact Information
              </p>
              <div className="space-y-2">
                <p className="text-sm font-sans text-text-primary dark:text-white">
                  <span className="font-medium">Phone:</span> {selectedLead.phone}
                </p>
                <p className="text-sm font-sans text-text-primary dark:text-white">
                  <span className="font-medium">Email:</span> {selectedLead.email}
                </p>
                <p className="text-sm font-sans text-text-primary dark:text-white">
                  <span className="font-medium">ZIP Code:</span> {selectedLead.zip}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                Social Profiles
              </p>
              <div className="flex gap-4">
                {selectedLead.socialProfiles.facebook && (
                  <div className="flex items-center gap-2">
                    <Facebook className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-sans text-text-primary dark:text-white">Facebook</span>
                  </div>
                )}
                {selectedLead.socialProfiles.twitter && (
                  <div className="flex items-center gap-2">
                    <Twitter className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-sans text-text-primary dark:text-white">Twitter</span>
                  </div>
                )}
                {selectedLead.socialProfiles.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-sans text-text-primary dark:text-white">LinkedIn</span>
                  </div>
                )}
                {Object.keys(selectedLead.socialProfiles).length === 0 && (
                  <p className="text-sm font-sans text-text-secondary dark:text-white/70">
                    No social profiles found
                  </p>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                AI Summary
              </p>
              <p className="text-sm font-sans text-text-primary dark:text-white leading-relaxed">
                {selectedLead.aiSummary}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}



