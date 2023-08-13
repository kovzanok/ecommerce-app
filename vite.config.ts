import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        global: true,
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './setupTest.ts',
    coverage: {
      provider: 'istanbul',
      reporter: 'text',
    },
  },
});
