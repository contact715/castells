import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, Shield, TrendingUp, Clock, BarChart3, MessageSquare, 
  FileText, Users, Smartphone, ArrowRight,
  Lock, Sparkles, Target, Rocket
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { cn } from '../../lib/utils';
import AnimatedHeading from '../ui/AnimatedHeading';
import { PageHeader } from '../ui/PageHeader';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import type { NavigateFn } from '../../types';
import { spacing, typography, borderRadius, colors } from '../../lib/designTokens';

interface ProjectXPageProps {
  onNavigate?: NavigateFn;
}

const ProjectXPage: React.FC<ProjectXPageProps> = React.memo(({ onNavigate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Redirect to ProjectX dashboard
    setTimeout(() => {
      window.location.href = 'http://localhost:3000';
    }, 300);
  }, []);

  const benefits = [
    {
      icon: Zap,
      title: 'Автоматизация 80% процессов',
      description: 'Увеличьте эффективность, автоматизировав рутинные задачи обработки лидов и коммуникаций'
    },
    {
      icon: TrendingUp,
      title: 'Увеличение конверсии на 35-60%',
      description: 'AI-профилирование и умная маршрутизация лидов помогают фокусироваться на качественных клиентах'
    },
    {
      icon: Clock,
      title: 'Мгновенный ответ на лиды',
      description: 'Автоматический дозвон в течение 28 секунд увеличивает конверсию в 4-9 раз'
    },
    {
      icon: Shield,
      title: 'Защита репутации 24/7',
      description: 'Автоматический мониторинг и ответы на отзывы на всех платформах'
    },
    {
      icon: BarChart3,
      title: 'Real-time аналитика',
      description: 'Полная картина бизнеса в реальном времени с AI-рекомендациями по оптимизации'
    },
    {
      icon: Target,
      title: 'Снижение CAC на 40-50%',
      description: 'Оптимизация каналов привлечения и фокус на эффективных источниках лидов'
    }
  ];

  const modules = [
    {
      icon: BarChart3,
      title: 'Dashboard',
      description: 'Централизованная панель управления с KPI, воронкой продаж и AI-инсайтами'
    },
    {
      icon: FileText,
      title: 'Smart Forms',
      description: 'Конструктор умных форм с валидацией ZIP-кодов и SMS-верификацией'
    },
    {
      icon: Users,
      title: 'AI Lead Profiler',
      description: 'Автоматическое профилирование и оценка качества лидов с помощью AI'
    },
    {
      icon: Smartphone,
      title: 'Speed-Dialer',
      description: 'Мгновенный автоматический дозвон лидам в течение 28 секунд'
    },
    {
      icon: MessageSquare,
      title: 'AI Chat',
      description: 'Интеллектуальные чатботы для 24/7 поддержки на всех платформах'
    },
    {
      icon: Shield,
      title: 'Review Guardian',
      description: 'Автоматический мониторинг и управление отзывами с AI-генерацией ответов'
    },
    {
      icon: Sparkles,
      title: 'Content Engine',
      description: 'Автоматическая генерация и публикация контента для соцсетей'
    },
    {
      icon: Users,
      title: 'Database Reactivation',
      description: 'Автоматические кампании по реактивации старых клиентов'
    },
    {
      icon: TrendingUp,
      title: 'ROI Analytics',
      description: 'Комплексная аналитика ROI по каждому каналу привлечения'
    }
  ];

  const stats = [
    { value: '400-600%', label: 'ROI для клиентов' },
    { value: '35-60%', label: 'Увеличение конверсии' },
    { value: '28 сек', label: 'Время ответа на лид' },
    { value: '80%', label: 'Автоматизация процессов' }
  ];

  return (
    <>
      <SEO 
        title="ProjectX - M.O.S. Engine | Автоматизация маркетинга и продаж"
        description="Комплексная SaaS-платформа для автоматизации маркетинга и продаж в сфере Home Services. Увеличьте конверсию на 35-60% и снизьте CAC на 40-50%."
      />
      <SchemaMarkup type="SoftwareApplication" />

      <div className="min-h-screen bg-ivory dark:bg-[#191919]">
        {/* Hero Section */}
        <section className={`${spacing.section.lg} ${colors.background.light} ${colors.background.dark} relative overflow-hidden`}>
          <div className={`${spacing.container.default} container mx-auto relative z-10`}>
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-block px-4 py-2 rounded-[2rem] bg-coral/10 text-coral text-xs font-bold uppercase tracking-widest mb-6">
                  M.O.S. Engine
                </span>
              </motion.div>
              
              <AnimatedHeading
                className={cn(typography.heading.h1, "mb-6")}
                text="ProjectX"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={cn(typography.body.xl, colors.text.secondary, "mb-8 max-w-2xl mx-auto")}
              >
                Комплексная SaaS-платформа для автоматизации маркетинга и продаж в сфере Home Services. 
                Увеличьте конверсию лидов на 35-60%, снизьте стоимость привлечения клиента на 40-50% 
                и автоматизируйте 80% рутинных процессов.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-4 mb-12"
              >
                <Button
                  size="lg"
                  onClick={() => {
                    const loginSection = document.getElementById('login-section');
                    loginSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Войти в личный кабинет
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate?.('contact')}
                >
                  Получить демо
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
              >
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-6 rounded-[2rem]",
                      colors.background.surface,
                      colors.border.light,
                      "border text-center"
                    )}
                  >
                    <div className={cn(typography.heading.h3, "text-coral mb-2")}>
                      {stat.value}
                    </div>
                    <div className={cn(typography.body.sm, colors.text.secondary)}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={`${spacing.section.md} ${colors.background.light} ${colors.background.dark} relative`}>
          <div className={`${spacing.container.default} container mx-auto`}>
            <div className="text-center mb-16">
              <AnimatedHeading
                className={cn(typography.heading.h2, "mb-4")}
                text="Почему ProjectX?"
              />
              <p className={cn(typography.body.lg, colors.text.secondary, "max-w-2xl mx-auto")}>
                Решаем реальные проблемы, которые стоят бизнесам десятки тысяч долларов в год
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={cn(
                    "p-8 rounded-[2rem]",
                    colors.background.surface,
                    colors.border.light,
                    "border hover:-translate-y-1 transition-all duration-300"
                  )}
                >
                  <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-coral" />
                  </div>
                  <h3 className={cn(typography.heading.h4, "mb-3")}>
                    {benefit.title}
                  </h3>
                  <p className={cn(typography.body.base, colors.text.secondary)}>
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section className={`${spacing.section.md} ${colors.background.light} ${colors.background.dark} relative`}>
          <div className={`${spacing.container.default} container mx-auto`}>
            <div className="text-center mb-16">
              <AnimatedHeading
                className={cn(typography.heading.h2, "mb-4")}
                text="9 интегрированных модулей"
              />
              <p className={cn(typography.body.lg, colors.text.secondary, "max-w-2xl mx-auto")}>
                Полная экосистема для автоматизации маркетинга и продаж
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={cn(
                    "p-6 rounded-[2rem]",
                    colors.background.surface,
                    colors.border.light,
                    "border hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 group cursor-pointer"
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4 group-hover:bg-coral/10 group-hover:scale-110 transition-all">
                    <module.icon className="w-5 h-5 text-text-primary group-hover:text-coral transition-colors" />
                  </div>
                  <h3 className={cn(typography.heading.h4, "mb-2")}>
                    {module.title}
                  </h3>
                  <p className={cn(typography.body.sm, colors.text.secondary)}>
                    {module.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Login Section */}
        <section 
          id="login-section"
          className={`${spacing.section.md} ${colors.background.light} ${colors.background.dark} relative`}
        >
          <div className={`${spacing.container.default} container mx-auto`}>
            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={cn(
                  "p-8 md:p-12 rounded-[2rem]",
                  colors.background.surface,
                  colors.border.light,
                  "border"
                )}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-[2rem] bg-coral/10 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-coral" />
                  </div>
                  <h2 className={cn(typography.heading.h2, "mb-2")}>
                    Вход в личный кабинет
                  </h2>
                  <p className={cn(typography.body.base, colors.text.secondary)}>
                    Войдите в систему для доступа к вашим данным и аналитике
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <Input
                    type="email"
                    name="email"
                    label="Email (необязательно)"
                    placeholder="your@email.com"
                    formName="projectx-login"
                  />

                  <Input
                    type="password"
                    name="password"
                    label="Пароль (необязательно)"
                    placeholder="••••••••"
                    formName="projectx-login"
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Вход...' : 'Войти'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                  <div className="text-center">
                    <p className={cn(typography.body.sm, colors.text.secondary, "mb-2")}>
                      Нет аккаунта?
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate?.('contact');
                      }}
                    >
                      Связаться с нами
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`${spacing.section.md} ${colors.background.light} ${colors.background.dark} relative`}>
          <div className={`${spacing.container.default} container mx-auto`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={cn(
                "p-12 md:p-16 rounded-[2rem] text-center",
                "bg-gradient-to-br from-coral/10 via-coral/5 to-transparent",
                colors.border.light,
                "border"
              )}
            >
              <Rocket className="w-16 h-16 text-coral mx-auto mb-6" />
              <h2 className={cn(typography.heading.h2, "mb-4")}>
                Готовы увеличить ROI на 400-600%?
              </h2>
              <p className={cn(typography.body.lg, colors.text.secondary, "mb-8 max-w-2xl mx-auto")}>
                Начните использовать ProjectX уже сегодня и получите полный контроль над вашим маркетингом и продажами
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => {
                    const loginSection = document.getElementById('login-section');
                    loginSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Войти в систему
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate?.('contact')}
                >
                  Запросить демо
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
});

ProjectXPage.displayName = 'ProjectXPage';

export default ProjectXPage;
