import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
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
    proxy: {
      '/api/lead-form': {
        target: 'https://castells.media',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Vite 8 минифицирует через oxc (движок rolldown), esbuild больше не нужен
    minify: 'oxc',
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/framer-motion') ||
              id.includes('node_modules/lenis')) {
            return 'animation-vendor';
          }
          if (id.includes('node_modules/@radix-ui') ||
              id.includes('node_modules/lucide-react')) {
            return 'ui-vendor';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        // Вырезаем console.* и debugger из боевой сборки.
        // Раньше это стояло в build.esbuild — неподдерживаемом поле, и не работало.
        minify: {
          compress: { dropConsole: true, dropDebugger: true },
          mangle: true,
          codegen: true,
        },
      },
    },
  },
});
