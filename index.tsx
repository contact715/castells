import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';

// Function to get system theme preference
const getSystemTheme = (): 'dark' | 'light' => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

// Function to apply theme
const applyTheme = (theme: 'dark' | 'light') => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Initialize theme: check localStorage first, then system preference
const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
if (savedTheme === 'dark' || savedTheme === 'light') {
  // Use saved theme from localStorage
  applyTheme(savedTheme);
} else {
  // No saved theme, use system preference
  const systemTheme = getSystemTheme();
  applyTheme(systemTheme);
  localStorage.setItem('theme', systemTheme);
}

// Listen for system theme changes
if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    // Only apply system theme if user hasn't manually set a preference
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      const newTheme = e.matches ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);