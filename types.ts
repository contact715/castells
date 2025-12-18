import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface GeneratedConcept {
  title: string;
  tagline: string;
  description: string;
  visualCues: string;
}

export type PageView =
  | 'home'
  | 'case-study'
  | 'work'
  | 'about'
  | 'careers'
  | 'blog'
  | 'blog-post'
  | 'contact'
  | 'not-found'
  | 'team'
  | 'service'
  | 'industry'
  | 'services'
  | 'industries'
  | 'company'
  | 'thank-you'
  | 'privacy-policy'
  | 'terms'
  | 'cookie-policy';

// Type for navigation data (project, service, industry)
export interface NavigationData {
  id?: string | number;
  name?: string;
  [key: string]: unknown;
}

export type NavigateFn = (page: PageView, data?: NavigationData) => void;