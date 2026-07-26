import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/three/')) return 'desktop-3d';
          if (id.includes('/node_modules/lenis/')) return 'desktop-scroll';
          if (id.includes('/node_modules/gsap/') || id.includes('/node_modules/@gsap/react/')) {
            return 'motion';
          }
          if (id.includes('/node_modules/lucide-react/')) return 'icons';
          return undefined;
        },
      },
    },
  },
});
