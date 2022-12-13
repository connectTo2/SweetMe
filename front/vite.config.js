import { defineConfig } from 'vite';

// 서버와 통신할 때 필요한 포트
export default defineConfig({
  server: {
    proxy: {
      '/signin': 'http://localhost:9000',
      '/signup': 'http://localhost:9000',
      '/vacalist': 'http://localhost:9000',
      '/wordlist': 'http://localhost:9000',
      '/game': 'http://localhost:9000',
    },
  },
});
