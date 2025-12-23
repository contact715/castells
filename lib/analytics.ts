/**
 * Analytics utilities for tracking user interactions
 * Supports Google Analytics 4 (gtag)
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string | object,
      config?: object
    ) => void;
    dataLayer?: any[];
  }
}

// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = 'G-LEQVB6KG6Y';

/**
 * Initialize Google Analytics
 * Note: gtag.js is already loaded in index.html
 * This function just ensures gtag is available
 */
export const initGA = () => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

  // gtag.js is already loaded in index.html, just ensure it's initialized
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
  }

  // Configure GA (if not already configured)
  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: true,
    });
  }
};

/**
 * Track page view
 */
export const pageview = (url: string) => {
  if (!window.gtag || !GA_MEASUREMENT_ID) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

/**
 * Track custom event
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
  if (!window.gtag || !GA_MEASUREMENT_ID) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...rest,
  });
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

