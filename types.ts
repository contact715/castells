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

// Type for navigation data (project, service, industry)
export interface NavigationData {
  id?: string;
  name?: string;
  [key: string]: unknown;
}