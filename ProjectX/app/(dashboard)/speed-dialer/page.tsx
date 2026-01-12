"use client";

import { RoutingVisualizer } from "@/components/speed-dialer/RoutingVisualizer";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";
import { Modal } from "@/components/ui/Modal";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import {
  Phone,
  Plus,
  Play,
  Power,
  PowerOff,
  Clock,
  User,
} from "lucide-react";

interface SalesManager {
  id: string;
  name: string;
  status: "online" | "offline";
  callsHandled: number;
  available: boolean;
}

interface CallLog {
  id: string;
  leadName: string;
  leadScore: number;
  manager: string;
  callTime: string;
  duration: string;
  status: "connected" | "missed";
}

const mockManagers: SalesManager[] = [
  {
    id: "1",
    name: "Mike Johnson",
    status: "online",
    callsHandled: 12,
    available: true,
  },
  {
    id: "2",
    name: "Sarah Williams",
    status: "online",
    callsHandled: 8,
    available: true,
  },
  {
    id: "3",
    name: "David Brown",
    status: "offline",
    callsHandled: 0,
    available: false,
  },
];

const mockCallLogs: CallLog[] = [
  {
    id: "1",
    leadName: "Jane Smith",
    leadScore: 90,
    manager: "Mike Johnson",
    callTime: "Oct 26, 2024 11:15 AM",
    duration: "5:32",
    status: "connected",
  },
  {
    id: "2",
    leadName: "John Doe",
    leadScore: 95,
    manager: "Sarah Williams",
    callTime: "Oct 26, 2024 11:10 AM",
    duration: "8:15",
    status: "connected",
  },
  {
    id: "3",
    leadName: "Bob Johnson",
    leadScore: 65,
    manager: "N/A",
    callTime: "Oct 26, 2024 11:05 AM",
    duration: "0:00",
    status: "missed",
  },
];

export default function SpeedDialerPage() {
  const [managers, setManagers] = useState(mockManagers);
  const [ringAll, setRingAll] = useState(true);
  const [maxRingTime, setMaxRingTime] = useState(30);
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);
  const [showListenModal, setShowListenModal] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showSimulateModal, setShowSimulateModal] = useState(false);

  const toggleAvailability = (id: string) => {
    setManagers(
      managers.map((m) =>
        m.id === id ? { ...m, available: !m.available } : m
      )
    );
  };

  const startSimulation = () => {
    setShowSimulateModal(true);
    setIsSimulating(true);
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
        moduleName="Speed-Dialer"
        icon={<Phone className="w-6 h-6" />}
        shortDescription="Система автоматического дозвона с интеллектуальной маршрутизацией. Соединяет с клиентом через 28 секунд после отправки формы, повышая конверсию на 400-900%. Снижает вероятность потери лида на 400%, если звонок не сделан в первые 5 минут."
        problem="Критическая статистика: Вероятность конверсии падает на 400%, если звонок не сделан в течение 5 минут, и на 900% в течение 10 минут. Среднее время ответа традиционных компаний: 2-4 часа. К этому времени 78% лидов уже нашли другого подрядчика."
        businessValue="Для клиентов: Увеличение конверсии на 200-400% за счет мгновенного отклика, снижение количества пропущенных звонков на 80-90%, повышение продуктивности менеджеров на 150-200% и автоматизация рутинного набора номера. Speed-Dialer гарантирует, что ни один лид не останется без ответа."
        monetization="Base: До 500 звонков/мес — включено. Pro: До 2,000 звонков/мес, расширенная аналитика — +$150/мес. Enterprise: Безлимит, кастомные сценарии, интеграция телефонии — +$500/мес."
        roi="Рост конверсии с 10% до 25-30% (мгновенный отклик). При 100 лидах/мес: было 10 сделок, стало 25-30 = +15-20 сделок × $1,000 = $15,000-20,000 доп. выручки. Снижение пропущенных звонков: экономия $2,000-5,000/мес. Общий ROI: 600-900%."
        example="Пример: Клиент получает 150 лидов/мес. Без Speed-Dialer: 15 сделок (10% конверсия) × $1,200 = $18,000. С Speed-Dialer: 37-45 сделок (25-30% конверсия) × $1,200 = $44,400-54,000. Доп. выручка: $26,400-36,000/мес. Стоимость: $150/мес. ROI: 17,500-23,900%."
      />

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-semibold text-text-primary dark:text-white">Speed-Dialer</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={startSimulation} className="border-coral/20 text-coral hover:bg-coral/10">
            <Play className="w-4 h-4 mr-2" />
            Simulate Incoming Lead
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Sales Manager
          </Button>
        </div>
      </div>

      {/* Live Dialer Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="default">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-coral/10">
              <Phone className="w-6 h-6 text-coral" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">Current Leads in Queue</p>
              <p className="text-2xl font-display font-semibold text-coral">3</p>
            </div>
          </div>
        </Card>
        <Card variant="default">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-600/10 dark:bg-green-400/10">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">Avg. Connection Time</p>
              <p className="text-2xl font-display font-semibold text-green-600 dark:text-green-400">28s</p>
            </div>
          </div>
        </Card>
        <Card variant="default">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-coral/10">
              <User className="w-6 h-6 text-coral" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">Last Connected Lead</p>
              <p className="text-lg font-display font-semibold text-text-primary dark:text-white">Jane Smith, 90/100</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Team Table */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="default">
            <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">
              Sales Team Availability
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Manager Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Calls Handled Today</TableHead>
                  <TableHead>Availability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {managers.map((manager) => (
                  <TableRow key={manager.id}>
                    <TableCell className="font-medium">{manager.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={manager.status === "online" ? "success" : "default"}
                      >
                        {manager.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{manager.callsHandled}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAvailability(manager.id)}
                      >
                        {manager.available ? (
                          <Power className="w-4 h-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <PowerOff className="w-4 h-4 text-red-600 dark:text-red-400" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Call Log */}
          <Card variant="default">
            <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Call Log</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead Name</TableHead>
                  <TableHead>Lead Score</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Call Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCallLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.leadName}</TableCell>
                    <TableCell>
                      <Badge variant="info">{log.leadScore}/100</Badge>
                    </TableCell>
                    <TableCell>{log.manager}</TableCell>
                    <TableCell>{log.callTime}</TableCell>
                    <TableCell>{log.duration}</TableCell>
                    <TableCell>
                      <Badge
                        variant={log.status === "connected" ? "success" : "danger"}
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCall(log);
                          setShowListenModal(true);
                        }}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Listen
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Dialer Settings */}
        <div>
          <Card variant="default">
            <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Dialer Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ringAll}
                    onChange={(e) => setRingAll(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-sans text-text-primary dark:text-white">
                    Ring All Managers Simultaneously
                  </span>
                </label>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                  Max Ring Time (seconds)
                </label>
                <Input
                  type="number"
                  value={maxRingTime}
                  onChange={(e) => setMaxRingTime(Number(e.target.value))}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Simulation Modal */}
      <Modal
        isOpen={showSimulateModal}
        onClose={() => setShowSimulateModal(false)}
        title="Live Call Simulation"
        size="lg"
      >
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-bold mb-2">Connecting to Lead...</h3>
            <p className="text-white/60">System is automatically routing to the best available manager.</p>
          </div>

          <RoutingVisualizer
            active={isSimulating}
            onComplete={() => console.log("Simulation complete")}
          />

          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              onClick={() => setShowSimulateModal(false)}
            >
              Cancel Simulation
            </Button>
          </div>
        </div>
      </Modal>

      {/* Listen to Recording Modal */}
      <Modal
        isOpen={showListenModal}
        onClose={() => {
          setShowListenModal(false);
          setSelectedCall(null);
        }}
        title={selectedCall ? `Call Recording: ${selectedCall.leadName}` : "Call Recording"}
        size="lg"
      >
        {selectedCall && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-1 font-sans">
                  Lead Name
                </p>
                <p className="text-lg font-display font-semibold text-text-primary dark:text-white">
                  {selectedCall.leadName}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-1 font-sans">
                  Lead Score
                </p>
                <Badge variant="info">{selectedCall.leadScore}/100</Badge>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-1 font-sans">
                  Manager
                </p>
                <p className="text-sm font-sans text-text-primary dark:text-white">
                  {selectedCall.manager}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-1 font-sans">
                  Duration
                </p>
                <p className="text-sm font-sans text-text-primary dark:text-white">
                  {selectedCall.duration}
                </p>
              </div>
            </div>

            <div className="bg-black/5 dark:bg-white/5 rounded-xl p-6 border border-black/5 dark:border-white/5">
              <div className="flex flex-col items-center justify-center gap-4">
                {/* Simulated Waveform */}
                <div className="flex items-center gap-1 h-12">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-coral rounded-full"
                      animate={{ height: [10, 40, 15, 30, 10] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                <Button variant="primary" size="lg" className="w-full">
                  <Play className="w-5 h-5 mr-2" />
                  Play Recording
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}



