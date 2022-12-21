import { defineConfig } from 'vite';

// 서버와 통신할 때 필요한 포트
export default defineConfig({
  server: {
    proxy: {
      '/': 'http://localhost:8000',
    },
  },
});
