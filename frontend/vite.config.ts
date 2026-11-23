import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

// One .env at the repo root is shared with the backend. Vite only exposes its VITE_* variables to the app.
const envDir = fileURLToPath(new URL('..', import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir, '');
  // FastAPI dev server that /api requests are forwarded to.
  const apiTarget = env.VITE_DEV_API_PROXY || 'http://localhost:8000';

  return {
    envDir,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      proxy: {
        '/api': { target: apiTarget, changeOrigin: true },
        // Scanned register PDFs served by FastAPI.
        '/files': { target: apiTarget, changeOrigin: true },
      },
    },
  };
});
