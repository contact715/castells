"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { FileText, Database, Code, Shield, BrainCircuit, Activity } from "lucide-react";

export function DocumentationViewer() {
    const [activeDoc, setActiveDoc] = useState("overview");

    return (
        <div className="h-full flex flex-col gap-6">
            <Card className="p-1 rounded-full w-fit bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 mx-auto">
                <Tabs value={activeDoc} onValueChange={setActiveDoc} className="w-full">
                    <TabsList className="bg-transparent p-0 gap-1">
                        <TabsTrigger value="overview" className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-none data-[state=active]:shadow-sm">
                            <FileText className="w-3 h-3 mr-2" /> Overview
                        </TabsTrigger>
                        <TabsTrigger value="spec" className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-none data-[state=active]:shadow-sm">
                            <Activity className="w-3 h-3 mr-2" /> Tech Spec
                        </TabsTrigger>
                        <TabsTrigger value="api" className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-none data-[state=active]:shadow-sm">
                            <Code className="w-3 h-3 mr-2" /> API
                        </TabsTrigger>
                        <TabsTrigger value="ai" className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-none data-[state=active]:shadow-sm">
                            <BrainCircuit className="w-3 h-3 mr-2" /> AI Logic
                        </TabsTrigger>
                        <TabsTrigger value="db" className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 shadow-none data-[state=active]:shadow-sm">
                            <Database className="w-3 h-3 mr-2" /> DB Schema
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </Card>

            <Card className="flex-1 overflow-y-auto p-8 bg-surface dark:bg-black/20 border-black/5 dark:border-white/5">
                {activeDoc === "overview" && (
                    <article className="prose dark:prose-invert max-w-none">
                        <h1>🚀 Проект mosco.ai — Пакет документации и прототипов</h1>
                        <p>Привет! В этом архиве собраны все материалы по архитектуре и дизайну системы автоматизации mosco.ai.</p>
                        <p>Система предназначена для мгновенной обработки лидов (Speed-to-Lead), использования ИИ для анализа звонков и геймификации отдела продаж.</p>

                        <h3>📂 Структура архива</h3>

                        <h4>1. Визуализация и Демонстрация</h4>
                        <ul>
                            <li><strong>system_flow.html (Обязательно к просмотру!)</strong>: Интерактивная карта пути клиента.</li>
                            <li><strong>prototype.jsx</strong>: Исходный код интерфейса (React). Показывает, как выглядит Dashboard РОПа, карточка лида и AI Coaching Lab.</li>
                        </ul>

                        <h4>2. Техническая Документация</h4>
                        <ul>
                            <li><strong>mosco_ai_spec.md</strong>: Главное Техническое Задание (ТЗ). Описание всех 8 модулей.</li>
                            <li><strong>api_documentation.md</strong>: Документация для интеграции (Webhooks, CRM).</li>
                        </ul>

                        <h4>3. Архитектура и Логика</h4>
                        <ul>
                            <li><strong>ai_recap_logic.md</strong>: Детальное описание алгоритма работы ИИ.</li>
                            <li><strong>database_schema.sql</strong>: Готовая структура базы данных PostgreSQL.</li>
                        </ul>
                    </article>
                )}

                {activeDoc === "spec" && (
                    <article className="prose dark:prose-invert max-w-none">
                        <h1>Техническая спецификация mosco.ai — Система «Мгновенная Охота»</h1>
                        <p>mosco.ai — это SaaS-платформа уровня Enterprise для автоматизации Speed-to-Lead. Система спроектирована для рынков с высокой конкуренцией (США, Канада, Европа), где скорость ответа в первые 30 секунд определяет вероятность закрытия сделки.</p>

                        <h3>1. Модуль «Первое касание» (Instant Engagement)</h3>
                        <ul>
                            <li><strong>Нативные интеграции (CRM) (i):</strong> Двусторонняя синхронизация с Salesforce, HubSpot, а также Home Service CRM (Housecall Pro, ServiceTitan, Jobber).</li>
                            <li><strong>Smart WhatsApp/SMS Welcome (i):</strong> Автоматическая отправка сообщения быстрее, чем менеджер поднимет трубку.</li>
                            <li><strong>Instant Booking Integration (i):</strong> Вставка ссылки на живой календарь (Calendly, HubSpot) прямо в первое сообщение.</li>
                            <li><strong>Fraud & Spam Guard (i):</strong> ИИ-фильтрация мусорных заявок до запуска прозвона.</li>
                        </ul>

                        <h3>2. Модуль «Охота» (The Hunt Engine)</h3>
                        <ul>
                            <li><strong>Параллельный прозвон (i):</strong> Система звонит всем свободным менеджерам одновременно.</li>
                            <li><strong>Multilingual Intelligent Routing (Новое!) (i):</strong> Логика распределения на основе языка лида.
                                <p className="text-sm mt-2 opacity-80">Как работает: Система анализирует метаданные лида (язык браузера, регион или выбор в форме). Если лид говорит на испанском, вызов идет только в группу менеджеров со знанием испанского (Spanish Speaking Group).</p>
                                <p className="text-sm opacity-80">Зачем: Устраняет языковой барьер и повышает конверсию на мультикультурных рынках США (например, Техас, Флорида, Калифорния).</p>
                            </li>
                            <li><strong>Dynamic Routing (VIP Priority) (i):</strong> Лиды с высоким чеком направляются только «Top Hunters».</li>
                            <li><strong>AI Whisper Script (i):</strong> Бот произносит в трубку менеджеру: "New Estimate Lead! Language: Spanish. Client: John. Press 1".</li>
                        </ul>

                        <h3>3. Система мотивации и ЦКП (Value-Based KPI)</h3>
                        <ul>
                            <li><strong>Настройка стоимости ЦКП (i):</strong> Награда за забронированный Estimate или встречу.</li>
                            <li><strong>AI Post-Call Recap (i):</strong> ИИ слушает запись звонка и автоматически заполняет отчет в CRM.</li>
                        </ul>

                        <h3>4. Логика «Умных ретраев» и A/B Тестирование</h3>
                        <ul>
                            <li><strong>Sequence A/B Testing (i):</strong> Тестирование разных текстов и интервалов звонков.</li>
                            <li><strong>Omnichannel Sequence (i):</strong> Переключение между WhatsApp, SMS и Voicemail.</li>
                        </ul>

                        <h3>5. Дисциплина и «Период охлаждения»</h3>
                        <ul>
                            <li><strong>Auto-Penalty System (i):</strong> Временное отключение менеджера от линии за пропуски звонков.</li>
                            <li><strong>Manager Scorecard (i):</strong> Еженедельный отчет об эффективности каждого сотрудника.</li>
                        </ul>

                        <h3>6. Модуль «ROI Аналитика и Прогнозирование»</h3>
                        <ul>
                            <li><strong>Интеграция с Ad Spend (i):</strong> Сквозная аналитика от клика (LSA/Meta) до инвойса в CRM.</li>
                            <li><strong>Saved Revenue (i):</strong> Расчет потенциального убытка, который предотвратила система за счет скорости.</li>
                        </ul>

                        <h3>7. Модуль «AI Coaching Lab»</h3>
                        <ul>
                            <li><strong>Sentiment Analysis (i):</strong> ИИ определяет настроение клиента.</li>
                            <li><strong>Script Adherence (i):</strong> Проверка следования менеджера скрипту.</li>
                            <li><strong>Personalized AI Coaching (i):</strong> Индивидуальные советы по точкам роста для каждого сейлза.</li>
                        </ul>

                        <h3>8. Безопасность и Шифрование (Новое!)</h3>
                        <ul>
                            <li><strong>Шифрование AES-256 (At Rest) (i):</strong> Все персональные данные клиентов, записи звонков и транскрипты хранятся в зашифрованном виде. Ключи шифрования хранятся в изолированных HSM-модулях.</li>
                            <li><strong>TLS 1.3 (In Transit) (i):</strong> Все данные, передаваемые между системой и CRM или браузером пользователя, защищены протоколом TLS последнего поколения.</li>
                            <li><strong>Masking Data (i):</strong> Возможность частичного маскирования номеров телефонов и e-mail для менеджеров до момента установления связи.</li>
                            <li><strong>Compliance (SOC2/GDPR/HIPAA Ready) (i):</strong> Архитектура соответствует строгим стандартам защиты данных Enterprise-уровня.</li>
                        </ul>
                    </article>
                )}

                {activeDoc === "api" && (
                    <article className="prose dark:prose-invert max-w-none">
                        <h1>API Документация mosco.ai — Интеграция и Протоколы</h1>
                        <p>Данный документ предназначен для технических специалистов и описывает способы передачи данных в систему mosco.ai, а также методы получения аналитики.</p>

                        <h3>🔐 1. Аутентификация</h3>
                        <p>Все запросы к API должны содержать заголовок авторизации с использованием Bearer Token.</p>
                        <pre className="bg-slate-900 border border-white/10 p-4 rounded-xl"><code>{`Authorization: Bearer <YOUR_API_KEY>
Content-Type: application/json`}</code></pre>

                        <h3>📥 2. Входящие заявки (Webhooks)</h3>
                        <p>Основной метод получения лидов из внешних источников (Web-формы, Zapier, Make, HighLevel).</p>
                        <p><code>POST /v1/webhooks/incoming-lead</code></p>
                        <pre className="bg-slate-900 border border-white/10 p-4 rounded-xl"><code>{`{
  "source": "google_lsa",
  "client": {
    "first_name": "John",
    "last_name": "Smith",
    "phone": "+15550001122",
    "email": "john.smith@example.com",
    "address": "123 Maple St, Austin, TX"
  },
  "lead_details": {
    "service_type": "AC Repair",
    "urgency": "high",
    "budget_estimate": 500,
    "notes": "Units is making a loud noise and not cooling."
  },
  "metadata": {
    "click_id": "gclid_12345",
    "utm_source": "google",
    "external_id": "titan_lead_9988"
  }
}`}</code></pre>

                        <h3>📞 3. Управление «Охотой» (The Hunt Events)</h3>
                        <p>События, генерируемые телефонией (Twilio/SignalWire) во время прозвона менеджеров.</p>
                        <p><code>POST /v1/calls/hunt-status</code></p>
                        <p>Статусы (status):</p>
                        <ul>
                            <li><code>ringing</code>: Вызов направлен группе менеджеров.</li>
                            <li><code>manager_accepted</code>: Менеджер нажал «1».</li>
                            <li><code>bridged</code>: Соединение с клиентом установлено.</li>
                            <li><code>no_answer</code>: Клиент не поднял трубку (запуск ретрая).</li>
                        </ul>

                        <h3>🧠 4. AI Analytics & Recap</h3>
                        <p>Метод получения результатов анализа звонка после его завершения.</p>
                        <p><code>GET /v1/calls/{`{call_id}`}/recap</code></p>
                        <pre className="bg-slate-900 border border-white/10 p-4 rounded-xl"><code>{`{
  "call_id": "ca_99887766",
  "ai_analysis": {
    "summary": "Client needs a full system replacement. Manager handled price objection well.",
    "sentiment": "positive",
    "script_compliance": 0.95,
    "detected_keywords": ["warranty", "estimate", "financing"],
    "target_action_met": true,
    "suggested_ckp_bonus": 25.00
  },
  "transcription_url": "https://api.mosco.ai/v1/transcripts/ca_99887766.txt"
}`}</code></pre>

                        <h3>🏠 5. CRM Sync (ServiceTitan / Housecall Pro)</h3>
                        <p>Методы для синхронизации данных о ЦКП (Ценном Конечном Продукте).</p>
                        <p><code>PATCH /v1/leads/{`{external_id}`}/status</code></p>
                        <p>Поля:</p>
                        <ul>
                            <li><code>status</code>: "Estimate Scheduled", "Sold", "Job Completed".</li>
                            <li><code>invoice_amount</code>: Сумма сделки для расчета ROI.</li>
                        </ul>

                        <h3>⚠️ 6. Коды ошибок</h3>
                        <ul>
                            <li><strong>200 OK</strong>: Успешно.</li>
                            <li><strong>401 Unauthorized</strong>: Неверный API ключ.</li>
                            <li><strong>422 Unprocessable Entity</strong>: Ошибка валидации данных.</li>
                            <li><strong>429 Too Many Requests</strong>: Превышен лимит запросов.</li>
                        </ul>
                    </article>
                )}

                {activeDoc === "ai" && (
                    <article className="prose dark:prose-invert max-w-none">
                        <h1>Алгоритм AI Post-Call Recap: Техническая логика mosco.ai</h1>
                        <p>Этот документ описывает процесс обработки аудиозаписи звонка после его завершения для автоматического извлечения данных и начисления бонусов.</p>

                        <h3>🛠 1. Технологический стек</h3>
                        <ul>
                            <li><strong>STT (Speech-to-Text):</strong> Whisper v3 Large (для максимальной точности на английском и испанском).</li>
                            <li><strong>Diarization:</strong> Анализ каналов (Менеджер vs Клиент) для разделения ролей.</li>
                            <li><strong>LLM:</strong> Gemini 2.5 Flash (высокая скорость, контекстное окно для длинных звонков).</li>
                        </ul>

                        <h3>🔄 2. Пошаговый пайплайн обработки</h3>
                        <ol>
                            <li><strong>Шаг 1: Транскрибация и Диаризация</strong>
                                <p>Система берет аудиофайл из облака (Twilio/SignalWire). На выходе получаем структурированный текст с разделением ролей.</p>
                            </li>
                            <li><strong>Шаг 2: Системный промпт (Contextual Analysis)</strong>
                                <p>ИИ получает транскрипт и инструкцию: проанализировать разговор, понять достигнут ли ЦКП и соблюдался ли скрипт.</p>
                            </li>
                            <li><strong>Шаг 3: Извлечение сущностей (Entity Extraction)</strong>
                                <p>ИИ ищет: тип проблемы, дату встречи, бюджет, возражения.</p>
                            </li>
                            <li><strong>Шаг 4: Оценка KPI и Начисление бонуса</strong>
                                <p>Проверка чек-листа: приветствие, отработка возражений, предложение времени, назначение встречи.</p>
                            </li>
                        </ol>

                        <h3>📊 3. Выходной JSON (Payload для CRM)</h3>
                        <pre className="bg-slate-900 border border-white/10 p-4 rounded-xl"><code>{`{
  "outcome": "SUCCESS_ESTIMATE",
  "data": {
    "scheduled_at": "2024-10-25T14:00:00Z",
    "problem_summary": "Storm damage on the west side of the roof",
    "budget": "Unknown",
    "empathy_score": 0.92,
    "script_adherence": 0.85
  },
  "bonus_logic": {
    "amount": 25.00,
    "status": "pending_verification"
  }
}`}</code></pre>

                        <h3>🛡 4. Обработка спорных моментов</h3>
                        <p>Если ИИ не уверен (score &lt; 0.7), заявка отправляется в Human-in-the-loop Queue (Очередь на проверку РОПом).</p>
                    </article>
                )}

                {activeDoc === "db" && (
                    <article className="prose dark:prose-invert max-w-none">
                        <h1>PostgreSQL Database Schema — mosco.ai</h1>
                        <p>Поддержка логов «Охоты», бонусов и мультиязычности.</p>

                        <pre className="bg-slate-900 border border-white/10 p-4 rounded-xl text-xs overflow-x-auto"><code>{`
-- 1. Таблица организаций (Клиенты mosco.ai)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    api_key_hash TEXT UNIQUE NOT NULL,
    settings JSONB DEFAULT '{}', -- Глобальные настройки
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Таблица менеджеров (Охотников)
CREATE TABLE managers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id),
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    languages VARCHAR(10)[] DEFAULT '{en}', -- Массив языков
    is_active BOOLEAN DEFAULT true,
    penalty_until TIMESTAMP WITH TIME ZONE, -- Дата окончания штрафа
    ckp_rate DECIMAL(10, 2) DEFAULT 25.00, -- Индивидуальный кост ЦКП
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Таблица Лидов
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organizations(id),
    external_crm_id VARCHAR(100),
    client_name VARCHAR(255),
    client_phone VARCHAR(20) NOT NULL,
    language_detected VARCHAR(10) DEFAULT 'en',
    source VARCHAR(100), -- google_lsa, yelp, facebook
    status VARCHAR(50) DEFAULT 'incoming',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Таблица Логов «Охоты» (The Hunt Logs)
CREATE TABLE hunt_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id),
    manager_ids UUID[] NOT NULL,
    winner_manager_id UUID REFERENCES managers(id),
    call_sid VARCHAR(100),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE
);

-- 5. Таблица бонусов и ЦКП (Earnings)
CREATE TABLE bonuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    manager_id UUID REFERENCES managers(id),
    lead_id UUID REFERENCES leads(id),
    amount DECIMAL(10, 2) NOT NULL,
    action_type VARCHAR(50), -- estimate, meeting, sale
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Таблица записей и ИИ-аналитики
CREATE TABLE call_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hunt_log_id UUID REFERENCES hunt_logs(id),
    recording_url_encrypted TEXT,
    sentiment VARCHAR(20),
    script_compliance_score DECIMAL(5, 2),
    ai_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}</code></pre>
                    </article>
                )}
            </Card>
        </div>
    );
}
