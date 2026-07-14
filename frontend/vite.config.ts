import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
      define: {
        // This is just generic value for the GEMINI API key.
        // This is not used at all, and can be ignored!
        'process.env.API_KEY' : JSON.stringify('api-key-this-is-not-used-can-be-ignored!'),
      },
      server: {
        proxy: {
          //Target your Node.js backend
          '/api-proxy': 'http://127.0.0.1:5000',
          '/sheet-proxy': 'http://127.0.0.1:5000',
          '/api': 'http://127.0.0.1:5000',
          '/ws-proxy': {target: 'ws://127.0.0.1:5000', ws: true},
          '/ws-chat': {target: 'ws://127.0.0.1:5000', ws: true},
        },
      },
      build: {
        outDir: '../backend/public',
        emptyOutDir: true,
      },
      plugins: react(),
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
