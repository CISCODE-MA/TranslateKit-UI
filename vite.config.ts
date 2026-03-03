import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ciscode-model',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'i18next', 'react-i18next', 'i18next-browser-languagedetector'],
    },
  },
});
