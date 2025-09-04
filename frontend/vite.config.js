import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,              // Frontend runs at http://localhost:3000
    proxy: {                 // Proxy API & auth calls to backend
      '/api': 'http://localhost:5000',
      '/auth': 'http://localhost:5000'
    }
  }
});
