import { defineConfig } from 'vite';

// 서버와 통신할 때 필요한 포트
export default defineConfig({
  build: {
    // 빌드 시 컴파일 해주는 역할이 필요함.
    target: 'esnext',
  },
  server: {
    // dev 관련 설정
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: { port: 9090 },
});
