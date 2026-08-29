/**
 * Analytics utilities for tracking user interactions
 * Supports Google Tag Manager (GTM) and Google Analytics 4
 * 
 * GTM использует dataLayer для отправки событий
 * Все события отправляются через dataLayer.push()
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string | object,
      config?: object
    ) => void;
    dataLayer?: any[];
    GTM_ID?: string;
  }
}

/*
  Идентификаторы счётчиков берутся из окружения и НЕ вписываются сюда числом.

  Почему так, а не как было. Здесь стоял зашитый в код идентификатор GA4
  «G-LEQVB6KG6Y», и он уезжал в сборку на каждой странице. Откуда он взялся, в
  репозитории не записано нигде: ни в журнале, ни в состоянии сессии, ни в
  разборах. Сайт собран из шаблона, из которого мы уже вычистили чужую и
  выдуманную начинку — несуществующую команду, «500+ проектов», «$50M+
  выручки», заголовок «Dominate Your Market». Похоже, что и этот
  идентификатор оттуда же, но доказать это нельзя, и в том и дело.

  Данные никуда не утекали: ни gtag.js, ни контейнер GTM на сайт не
  подключены, поэтому вызовы складывались в dataLayer в памяти вкладки и
  наружу не уходили. Опасность была отложенная: в тот день, когда кто-нибудь
  раскомментировал бы блок GTM в index.html, посетители сайта поехали бы
  считаться в чужое хозяйство.

  Теперь: нет переменной окружения — нет счётчика, и это честное состояние
  вместо тихого. Когда появится наш собственный идентификатор, он придёт
  через VITE_GA_MEASUREMENT_ID, а не через правку этой строки.
*/
export const GA_MEASUREMENT_ID: string =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GA_MEASUREMENT_ID) || '';

export const GTM_ID: string =
  (typeof window !== 'undefined' && window.GTM_ID) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GTM_ID) ||
  '';

/**
 * Initialize Google Analytics / Google Tag Manager
 * GTM автоматически загружается из index.html
 * Эта функция инициализирует dataLayer если его нет
 */
export const initGA = () => {
  if (typeof window === 'undefined') return;

  // Не настроен ни один счётчик — не делаем ничего. Раньше здесь всё равно
  // создавался dataLayer и выполнялся config с зашитым чужим идентификатором:
  // работы это не делало, но выглядело как работающая аналитика.
  if (!GA_MEASUREMENT_ID && !GTM_ID) return;

  // Инициализируем dataLayer для GTM
  window.dataLayer = window.dataLayer || [];

  // Если используется прямой gtag.js (fallback)
  if (!window.gtag && !window.GTM_ID) {
    window.gtag = function() {
      // dataLayer инициализируется выше, но между вызовами его мог кто-то снести:
      // без этой проверки аналитика роняла бы страницу
      (window.dataLayer = window.dataLayer || []).push(arguments);
    };
    
    // Configure GA (если используется прямой gtag)
    if (GA_MEASUREMENT_ID) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: true,
      });
    }
  }
};

/**
 * Track page view
 * Работает с GTM через dataLayer
 */
export const pageview = (url: string) => {
  if (typeof window === 'undefined' || !window.dataLayer) return;

  // Отправляем событие через dataLayer (GTM)
  window.dataLayer.push({
    event: 'page_view',
    page_path: url,
    page_location: typeof window !== 'undefined' ? window.location.href : url,
  });

  // Fallback для прямого gtag.js
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

/**
 * Track custom event
 * Работает с GTM через dataLayer
 */
export const event = ({
  action,
  category,
  label,
  value,
  ...rest
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any;
}) => {
  if (typeof window === 'undefined' || !window.dataLayer) return;

  // Отправляем событие через dataLayer (GTM)
  window.dataLayer.push({
    event: action,
    event_category: category,
    event_label: label,
    value: value,
    ...rest,
  });

  // Fallback для прямого gtag.js
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
  }
};

/**
 * Track form submission
 */
export const trackFormSubmit = (formName: string, formData?: Record<string, any>) => {
  event({
    action: 'submit',
    category: 'Form',
    label: formName,
    form_name: formName,
    ...formData,
  });
};

/**
 * Track CTA click
 */
export const trackCTAClick = (ctaName: string, location: string) => {
  event({
    action: 'click',
    category: 'CTA',
    label: ctaName,
    cta_location: location,
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: number) => {
  const milestones = [25, 50, 75, 90, 100];
  const milestone = milestones.find(m => depth >= m && depth < m + 5);
  
  if (milestone) {
    event({
      action: 'scroll',
      category: 'Engagement',
      label: `${milestone}%`,
      value: milestone,
    });
  }
};

/**
 * Track time on page
 */
export const trackTimeOnPage = (seconds: number) => {
  const milestones = [30, 60, 120, 300, 600]; // 30s, 1m, 2m, 5m, 10m
  const milestone = milestones.find(m => seconds >= m && seconds < m + 30);
  
  if (milestone) {
    event({
      action: 'time_on_page',
      category: 'Engagement',
      label: `${milestone}s`,
      value: milestone,
    });
  }
};

/**
 * Track outbound link click
 */
export const trackOutboundLink = (url: string, linkText?: string) => {
  event({
    action: 'click',
    category: 'Outbound Link',
    label: linkText || url,
    link_url: url,
  });
};

/**
 * Track video play
 */
export const trackVideoPlay = (videoName: string, videoUrl?: string) => {
  event({
    action: 'play',
    category: 'Video',
    label: videoName,
    video_url: videoUrl,
  });
};

/**
 * Track search
 */
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  event({
    action: 'search',
    category: 'Site Search',
    label: searchTerm,
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

/**
 * Track case study view
 */
export const trackCaseStudyView = (caseStudyId: string, caseStudyName: string) => {
  event({
    action: 'view',
    category: 'Case Study',
    label: caseStudyName,
    case_study_id: caseStudyId,
  });
};

/**
 * Track blog post view
 */
export const trackBlogPostView = (postId: string, postTitle: string) => {
  event({
    action: 'view',
    category: 'Blog',
    label: postTitle,
    post_id: postId,
  });
};

/**
 * Track micro-conversion (small engagement actions)
 */
export const trackMicroConversion = (
  action: string,
  value?: number,
  metadata?: Record<string, any>
) => {
  event({
    action: 'micro_conversion',
    category: 'Engagement',
    label: action,
    value: value,
    ...metadata,
  });
};

/**
 * Track user journey step
 */
export const trackJourneyStep = (
  step: string,
  stepNumber: number,
  journeyType: string = 'default'
) => {
  event({
    action: 'journey_step',
    category: 'User Journey',
    label: step,
    value: stepNumber,
    journey_type: journeyType,
  });
};

/**
 * Track heatmap event (for future heatmap integration)
 */
export const trackHeatmapEvent = (
  element: string,
  position: { x: number; y: number },
  eventType: 'click' | 'hover' | 'scroll' = 'click'
) => {
  event({
    action: 'heatmap_event',
    category: 'Heatmap',
    label: element,
    event_type: eventType,
    position_x: position.x,
    position_y: position.y,
  });
};

/**
 * Track form field interaction
 */
export const trackFormFieldInteraction = (
  formName: string,
  fieldName: string,
  action: 'focus' | 'blur-sm' | 'change'
) => {
  event({
    action: 'form_field_interaction',
    category: 'Form',
    label: `${formName}.${fieldName}`,
    field_name: fieldName,
    form_name: formName,
    interaction_type: action,
  });
};

/**
 * Track CTA visibility
 */
export const trackCTAVisibility = (ctaName: string, location: string) => {
  event({
    action: 'cta_visible',
    category: 'CTA',
    label: ctaName,
    cta_location: location,
  });
};

/**
 * Track video engagement
 */
export const trackVideoEngagement = (
  videoName: string,
  action: 'play' | 'pause' | 'complete' | 'seek',
  progress?: number
) => {
  event({
    action: 'video_engagement',
    category: 'Video',
    label: videoName,
    engagement_action: action,
    progress_percent: progress,
  });
};

