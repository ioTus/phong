import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/phong/' : '/',
  server: {
    port: 3000,
    open: true,
  },
  publicDir: false,  // we serve extracted/ via the root
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        viewer: resolve(__dirname, 'viewer/index.html'),
      },
    },
  },
}));
