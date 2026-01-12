"use client";

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
import { Star, MessageSquare, Phone, CheckCircle } from "lucide-react";

interface Review {
  id: string;
  platform: string;
  rating: number;
  reviewText: string;
  status: "published" | "internal";
  date: string;
}

interface NegativeFeedback {
  id: string;
  customerName: string;
  phone: string;
  problemDescribed: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    platform: "Google",
    rating: 5,
    reviewText: "Excellent service! The technician was professional and fixed our AC quickly.",
    status: "published",
    date: "Oct 25, 2024",
  },
  {
    id: "2",
    platform: "Yelp",
    rating: 4,
    reviewText: "Good service overall, but had to wait a bit longer than expected.",
    status: "published",
    date: "Oct 24, 2024",
  },
  {
    id: "3",
    platform: "Google",
    rating: 3,
    reviewText: "Service was okay, but the price seemed a bit high.",
    status: "internal",
    date: "Oct 23, 2024",
  },
];

const mockNegativeFeedback: NegativeFeedback[] = [
  {
    id: "1",
    customerName: "John Smith",
    phone: "+1 (555) 123-4567",
    problemDescribed: "AC unit still not working properly after service",
    date: "Oct 22, 2024",
  },
  {
    id: "2",
    customerName: "Mary Johnson",
    phone: "+1 (555) 234-5678",
    problemDescribed: "Technician arrived late and didn't complete the work",
    date: "Oct 21, 2024",
  },
];

export default function ReviewGuardianPage() {
  const [aiPersona, setAiPersona] = useState(
    "Professional, apologetic for negative, grateful for positive"
  );
  const [autoPublish, setAutoPublish] = useState(true);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showRespondModal, setShowRespondModal] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-black/20 dark:text-white/20"
              }`}
          />
        ))}
      </div>
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
        moduleName="Review Guardian"
        icon={<Star className="w-6 h-6" />}
        shortDescription="Автоматизированная система мониторинга, управления и ответов на отзывы на всех площадках (Google, Yelp, Facebook). Использует AI для генерации персонализированных ответов и авто-публикации позитивных. Повышает рейтинг на 0.3-0.5 звезды и конверсию на 15-25%."
        problem="88% потребителей читают отзывы перед выбором подрядчика. 1 звезда рейтинга снижает конверсию на 5-10%. Средний рейтинг 4.5+ повышает конверсию на 17%. 68% негативных отзывов остаются без ответа (снижает доверие на 30-40%). Ответ на негативный отзыв за 24 часа восстанавливает 33% доверия."
        businessValue="Для клиентов: Рост рейтинга на 0.3-0.5 звезды за счет быстрых ответов, рост конверсии на 15-25% за счет репутации, снижение влияния негатива на 60-70%, экономия времени (1-2 часа/день на ответы = $800-1,600/мес), авто-выявление проблемных клиентов для проактивного решения."
        monetization="Base tier: Мониторинг 3 платформ, до 50 отзывов/мес — включено. Pro tier: 5 платформ, безлимит отзывов, расширенная аналитика — +$100/мес. Enterprise: Все платформы, кастомные шаблоны, интеграция в CRM — +$300/мес."
        roi="Рост конверсии на 15-25% за счет репутации. При 100 лидах/мес: +15-25 лидов × $1,000 × 20% конверсия = $3,000-5,000 доп. выручки. Снижение влияния негатива: спасение сделок на $2,000-4,000/мес. Экономия времени: $800-1,600/мес. Общий ROI: 400-600%."
        example="Пример: Клиент получает 50 отзывов/мес. Без RG: рейтинг 4.2, конверсия 12% = 12 сделок из 100 лидов = $14,400. С RG: рейтинг 4.7, конверсия 18% = 18 сделок из 100 лидов = $21,600. Доп. выручка: $7,200/мес. Стоимость RG: $100/мес. ROI: 7,100%."
      />

      <h1 className="text-3xl font-display font-semibold text-text-primary dark:text-white">Review Guardian</h1>

      {/* Overall Reputation Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="default">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-coral/10">
              <Star className="w-8 h-8 text-coral fill-coral" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">Google Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-display font-semibold text-coral">4.8</p>
                <div className="flex gap-1">
                  {renderStars(5)}
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card variant="default">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-green-600/10 dark:bg-green-400/10">
              <Star className="w-8 h-8 text-green-600 dark:text-green-400 fill-green-600 dark:fill-green-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 font-sans">Yelp Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-display font-semibold text-green-600 dark:text-green-400">4.6</p>
                <div className="flex gap-1">
                  {renderStars(5)}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reviews */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="default">
            <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Recent Reviews</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Platform</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review Text</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.platform}</TableCell>
                    <TableCell>{renderStars(review.rating)}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {review.reviewText}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          review.status === "published" ? "success" : "warning"
                        }
                      >
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedReview(review);
                            setAiResponse(
                              `Thank you for your feedback! We appreciate you taking the time to share your experience. ${review.rating >= 4 ? "We're thrilled to hear you had a positive experience!" : "We're sorry to hear about your experience and would like to make things right."} Please contact us directly so we can address your concerns.`
                            );
                            setShowRespondModal(true);
                          }}
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Respond
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Star className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Negative Feedback */}
          <Card variant="default">
            <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">Negative Feedback</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Problem Described</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockNegativeFeedback.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell className="font-medium">
                      {feedback.customerName}
                    </TableCell>
                    <TableCell>{feedback.phone}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {feedback.problemDescribed}
                    </TableCell>
                    <TableCell>{feedback.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="ghost" size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolved
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* AI Response Settings */}
        <div>
          <Card variant="default">
            <h3 className="text-xl font-display font-semibold mb-4 text-text-primary dark:text-white">AI Response Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                  AI Persona for Responses
                </label>
                <textarea
                  value={aiPersona}
                  onChange={(e) => setAiPersona(e.target.value)}
                  className="w-full rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 px-4 py-3 text-base text-text-primary dark:text-white placeholder:text-black/20 dark:placeholder:text-white/20 focus:outline-none focus:border-coral dark:focus:border-coral focus:bg-white dark:focus:bg-white/10 transition-all duration-300 font-sans min-h-[100px]"
                  placeholder="Describe AI response style"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoPublish}
                    onChange={(e) => setAutoPublish(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-sans text-text-primary dark:text-white">
                    Auto-publish AI responses for 4-5 star reviews
                  </span>
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Respond with AI Modal */}
      <Modal
        isOpen={showRespondModal}
        onClose={() => {
          setShowRespondModal(false);
          setSelectedReview(null);
          setAiResponse("");
        }}
        title={selectedReview ? `Respond to Review - ${selectedReview.platform}` : "Respond to Review"}
        size="lg"
        footer={
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setShowRespondModal(false);
                setSelectedReview(null);
                setAiResponse("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                // TODO: Implement publish response
                alert("Response published successfully!");
                setShowRespondModal(false);
                setSelectedReview(null);
                setAiResponse("");
              }}
            >
              Publish Response
            </Button>
          </div>
        }
      >
        {selectedReview && (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                Original Review
              </p>
              <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 border border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(selectedReview.rating)}
                  <Badge
                    variant={selectedReview.status === "published" ? "success" : "warning"}
                  >
                    {selectedReview.status}
                  </Badge>
                </div>
                <p className="text-sm font-sans text-text-primary dark:text-white">
                  {selectedReview.reviewText}
                </p>
                <p className="text-xs font-sans text-text-secondary dark:text-white/70 mt-2">
                  {selectedReview.date}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-secondary dark:text-white/70 mb-2 font-sans">
                AI-Generated Response
              </p>
              <textarea
                value={aiResponse}
                onChange={(e) => setAiResponse(e.target.value)}
                className="w-full rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 px-4 py-3 text-base text-text-primary dark:text-white placeholder:text-black/20 dark:placeholder:text-white/20 focus:outline-none focus:border-coral dark:focus:border-coral focus:bg-white dark:focus:bg-white/10 transition-all duration-300 font-sans min-h-[150px]"
                placeholder="AI-generated response will appear here..."
              />
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => {
                  // Regenerate AI response
                  setAiResponse(
                    `Thank you for your feedback! We appreciate you taking the time to share your experience. ${selectedReview.rating >= 4 ? "We're thrilled to hear you had a positive experience!" : "We're sorry to hear about your experience and would like to make things right."} Please contact us directly so we can address your concerns.`
                  );
                }}
              >
                Regenerate Response
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}



