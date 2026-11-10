import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src/app'),
      '@layout': resolve(__dirname, 'src/app/layout'),
      '@pages': resolve(__dirname, 'src/app/pages'),
      '@routes': resolve(__dirname, 'src/app/routes'),
      '@shared': resolve(__dirname, 'src/app/shared'),
    },
  },
});
