import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'REACT_APP_');
  return {
    plugins: [react()],
    define: Object.fromEntries(Object.entries(env).map(([key, value]) => ['process.env.' + key, JSON.stringify(value)])),
    server: { port: 3000, proxy: { '/api': 'http://localhost:5000', '/logs': 'http://localhost:5000', '/techs': 'http://localhost:5000' } },
    build: { outDir: 'build', emptyOutDir: true },
    test: { environment: 'jsdom', globals: true }
  };
});
