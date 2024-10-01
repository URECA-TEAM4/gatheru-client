import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ],
      },
    }),
    svgr(),
  ],
  server: {
    // 서버 시작 시 브라우저 앱 자동으로 열기
    open: true,
    // 기본 포트 변경
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 백엔드 서버 주소
        changeOrigin: true,
        secure: false,
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  //build 시에 모든 console.log를 제거
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
