import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  build: {
    outDir: './build',
    emptyOutDir: true,
  },
  server: {
    port: 5500,
    open: true,
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    react(),
  ],
});
