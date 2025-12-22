import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        // Improved caching strategy
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.fontshare\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fontshare-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
        ],
      },
    }),
    // Bundle analyzer - запускается только при сборке с флагом --analyze
    process.env.ANALYZE === 'true' && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Отключаем sourcemap в продакшене для меньшего размера
    minify: 'esbuild', // esbuild быстрее и уже встроен
    cssMinify: true,
    chunkSizeWarningLimit: 1000, // Предупреждение при чанках > 1MB
    rollupOptions: {
      // Более агрессивное tree shaking
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        manualChunks: (id) => {
          // React и React DOM
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Three.js и связанные библиотеки
          if (id.includes('node_modules/three') || 
              id.includes('node_modules/@react-three')) {
            return 'three-vendor';
          }
          // Анимации
          if (id.includes('node_modules/framer-motion') || 
              id.includes('node_modules/gsap') ||
              id.includes('node_modules/lenis')) {
            return 'animation-vendor';
          }
          // UI библиотеки
          if (id.includes('node_modules/@radix-ui') ||
              id.includes('node_modules/lucide-react')) {
            return 'ui-vendor';
          }
          // Остальные node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Оптимизация имен файлов для кэширования
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        // Компактный вывод для меньшего размера
        compact: true,
      },
    },
    // esbuild options для удаления console в продакшене
    esbuild: {
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    },
  },
});

