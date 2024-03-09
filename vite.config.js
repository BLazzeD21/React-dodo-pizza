import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  build: {
    outDir: './build',
    emptyOutDir: true,
  },
  plugins: [react()],
  server: {
    port: 5500,
    open: true,
  },
});
