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
    shortDescription="Ваша персональная фабрика контента на базе AI. Генерируйте профессиональные статьи, посты для GMB и Yelp, а также визуальный контент за считанные секунды. Планируйте публикации на недели вперед и поддерживайте активность своего бренда без усилий."
    problem="У 70% локальных бизнесов профили в GMB и соцсетях выглядят заброшенными, потому что у владельца нет времени писать посты. Заброшенные профили получают на 40% меньше лидов, так как клиенты сомневаются в активности компании."
    businessValue="Для клиента: Экономия 10-15 часов в месяц на создании контента. Постоянное присутствие в ленте клиентов. Рост органического охвата в Google и Yelp. Профессиональный стиль общения, повышающий доверие к бренду."
    monetization="Base tier: До 10 постов/мес, 2 платформы — включено. Pro tier: До 30 постов/мес, 4 платформы, AI-генерация изображений — +$150/мес. Enterprise: Полный автопилот контента — +$400/мес."
    roi="Рост посещаемости профиля GMB на 30-50% за счет регулярности. Сокращение затрат на SMM-специалиста: экономия $1,500-3,000/мес. Повышение конверсии из посетителя в лид на 15% за счет 'живого' образа компании."
    example="Пример: HVAC компания начала публиковать 3 совета по уходу за кондиционером в неделю через Content Engine. Через 2 месяца звонки из GMB выросли на 45%. Доп. доход: $5,200/мес. Цена модуля: $150. ROI: 3,367%."
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
          className="aspect-square p-1 rounded-[2rem]"
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
        <div className="p-3 rounded-[2rem] bg-black/5 dark:bg-dark-surface/50 ">
         <p className="text-sm font-sans text-text-primary dark:text-white">{generatedText}</p>
        </div>
       )}
       {generatedImage && (
        <div className="rounded-[2rem] overflow-hidden bg-black/5 dark:bg-dark-surface/50 ">
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
       className="p-4 rounded-[2rem] bg-black/5 dark:bg-dark-surface/50 "
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
        <div className="mb-3 rounded-[2rem] overflow-hidden bg-black/5 dark:bg-dark-surface/50 ">
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



