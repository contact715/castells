/**
 * Web Vitals tracking for performance monitoring
 * Tracks Core Web Vitals and sends to Google Analytics 4
 */

import { event } from './analytics';

export interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

/**
 * Get rating for a metric value
 */
const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds: Record<string, { good: number; poor: number }> = {
    CLS: { good: 0.1, poor: 0.25 },
    FID: { good: 100, poor: 300 },
    LCP: { good: 2500, poor: 4000 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
  };

  const threshold = thresholds[name];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

/**
 * Track Web Vital metric
 */
export const trackWebVital = (metric: WebVitalMetric): void => {
  const rating = getRating(metric.name, metric.value);

  // Send to Google Analytics
  event({
    action: 'web_vital',
    category: 'Performance',
    label: metric.name,
    value: Math.round(metric.value),
    metric_name: metric.name,
    metric_value: metric.value,
    metric_id: metric.id,
    metric_delta: metric.delta,
    metric_rating: rating,
  });

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}:`, {
      value: metric.value,
      rating,
      id: metric.id,
    });
  }
};

/**
 * Initialize Web Vitals tracking
 */
export const initWebVitals = (): void => {
  if (typeof window === 'undefined') return;

  // Load web-vitals library dynamically
  import('web-vitals').then(({ onCLS, onLCP, onFCP, onTTFB, onINP }) => {
    onCLS(trackWebVital);
    onLCP(trackWebVital);
    onFCP(trackWebVital);
    onTTFB(trackWebVital);
    onINP(trackWebVital);
  }).catch((err) => {
    console.warn('Failed to load web-vitals:', err);
  });
};

