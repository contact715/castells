"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ModuleDescription } from "@/components/dashboard/ModuleDescription";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  Calendar,
  FileImage,
  FileText,
  Sparkles,
  Check,
  X,
  Edit,
} from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";
import { format } from "date-fns";

interface ScheduledPost {
  id: string;
  date: Date;
  platform: string;
  topic: string;
  status: "scheduled" | "published";
}

interface AwaitingPost {
  id: string;
  topic: string;
  platform: string;
  text: string;
  image: string;
  date: Date;
}

const mockScheduledPosts: ScheduledPost[] = [
  {
    id: "1",
    date: new Date(2024, 9, 28),
    platform: "GMB",
    topic: "Fall HVAC Maintenance",
    status: "scheduled",
  },
  {
    id: "2",
    date: new Date(2024, 9, 30),
    platform: "Yelp",
    topic: "Winter Preparation Tips",
    status: "scheduled",
  },
];

const mockAwaitingPosts: AwaitingPost[] = [
  {
    id: "1",
    topic: "Spring HVAC maintenance deal",
    platform: "Google My Business",
    text: "Get your HVAC system ready for spring! Book a maintenance check and save 20% on all services. Limited time offer!",
    image: "/api/placeholder/400/300",
    date: new Date(),
  },
];

export default function ContentEnginePage() {
  const [topic, setTopic] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("gmb");
  const [generatedText, setGeneratedText] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateText = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/marketing/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic || "HVAC Maintenance", platform: selectedPlatform }),
      });
      const data = await response.json();
      setGeneratedText(data.text_content);
    } catch (e) {
      console.error(e);
      alert("Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/marketing/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic || "HVAC Maintenance", platform: selectedPlatform }),
      });
      const data = await response.json();
      setGeneratedImage(data.image_url);
    } catch (e) {
      console.error(e);
      alert("Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const currentDate = new Date();
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Module Description */}
      <ModuleDescription
        moduleName="Content Engine"
        icon={<FileImage className="w-6 h-6" />}
        shortDescription="Автоматизированная система генерации и публикации контента для соцсетей и бизнес-профилей (Google My Business, Yelp, Facebook). Использует AI для создания текстов, изображений и планирования публикаций. Регулярные посты без затрат времени: 3-5 постов в неделю на автомате."
        problem="73% малого бизнеса не публикуют контент регулярно из-за нехватки времени. Регулярные публикации повышают видимость на 40-60%. Активные профили получают на 35-50% больше обращений. Создание качественного контента занимает 2-3 часа на пост. Без контента бизнес теряет видимость и клентов."
        businessValue="Для клиентов: Регулярные посты без усилий (3-5 шт/неделю), рост видимости на 40-60%, увеличение обращений с GMB/Yelp на 35-50%, экономия времени (6-10 часов/неделю = $2,400-4,000/мес), профессиональный контент без найма копирайтера."
        monetization="Base tier: До 10 постов/мес, 2 платформы — включено. Pro tier: До 30 постов/мес, 4 платформы, расширенные шаблоны — +$150/мес. Enterprise: Безлимит постов, все платформы, кастомные шаблоны — +$400/мес."
        roi="Рост обращений на 35-50%: при 100 лидах/мес = +35-50 лидов × $1,000 × 20% = $7,000-10,000 доп. выручки. Экономия на контенте: $2,400-4,000/мес (копирайтер + дизайнер). Общий ROI: 500-700%."
        example="Пример: Клиент получает 80 лидов/мес с GMB/Yelp. Без Content Engine: 80 лидов, 10% конверсия = 8 сделок × $1,200 = $9,600. С Content Engine: 112-120 лидов (+40%), 12% конверсия (лучше видимость) = 13-14 сделок × $1,200 = $15,600-16,800. Доп. выручка: $6,000-7,200/мес. Стоимость: $150/мес. ROI: 3,900-4,700%."
      />

      <h1 className="text-3xl font-display font-semibold text-text-primary dark:text-white">Content Engine</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Calendar */}
        <div className="lg:col-span-2">
          <Card variant="default">
            <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Content Calendar</h3>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day) => (
                  <div key={day} className="text-center text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">
                    {day}
                  </div>
                )
              )}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {days.map((day) => {
                const post = mockScheduledPosts.find(
                  (p) => p.date.getDate() === day
                );
                return (
                  <div
                    key={day}
                    className="aspect-square p-1 border border-black/5 dark:border-white/5 rounded-xl"
                  >
                    <div className="text-xs font-sans text-text-secondary dark:text-white/70 mb-1">{day}</div>
                    {post && (
                      <div className="flex gap-1">
                        <Badge
                          variant="info"
                          className="text-xs p-0.5"
                        >
                          {post.platform}
                        </Badge>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Create New Post */}
        <div>
          <Card variant="default">
            <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Create New Post</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                  Topic/Keywords
                </label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Spring HVAC maintenance deal"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                  Platform
                </label>
                <Select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                >
                  <option value="gmb">Google My Business</option>
                  <option value="yelp">Yelp</option>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleGenerateText}
                  disabled={isGenerating}
                >
                  {isGenerating ? <Spinner className="w-4 h-4 mr-2" /> : <FileText className="w-4 h-4 mr-2" />}
                  Generate Text
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleGenerateImage}
                  disabled={isGenerating}
                >
                  {isGenerating ? <Spinner className="w-4 h-4 mr-2" /> : <FileImage className="w-4 h-4 mr-2" />}
                  Generate Image
                </Button>
              </div>
              {generatedText && (
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <p className="text-sm font-sans text-text-primary dark:text-white">{generatedText}</p>
                </div>
              )}
              {generatedImage && (
                <div className="rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <div className="w-full h-32 bg-gradient-to-br from-coral/20 to-coral-dark/20 flex items-center justify-center">
                    <FileImage className="w-8 h-8 text-coral" />
                  </div>
                </div>
              )}
              <Button
                className="w-full"
                onClick={() => setShowScheduleModal(true)}
                disabled={!generatedText}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Awaiting Approval */}
      <Card variant="default">
        <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Awaiting Approval</h3>
        <div className="space-y-4">
          {mockAwaitingPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="info">{post.platform}</Badge>
                    <span className="font-sans font-medium text-text-primary dark:text-white">{post.topic}</span>
                  </div>
                  <p className="text-sm font-sans text-text-secondary dark:text-white/70">{post.text}</p>
                </div>
              </div>
              {post.image && (
                <div className="mb-3 rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <div className="w-full h-32 bg-gradient-to-br from-coral/20 to-coral-dark/20 flex items-center justify-center">
                    <FileImage className="w-8 h-8 text-coral" />
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1">
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Schedule Modal */}
      <Modal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        title="Schedule Post"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
              Select Date
            </label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
              Select Time
            </label>
            <Input type="time" />
          </div>
          <Button
            className="w-full"
            onClick={() => {
              setShowScheduleModal(false);
              setSelectedDate("");
            }}
          >
            Schedule
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
}



