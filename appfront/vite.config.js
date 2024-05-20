import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: './mock',
        localEnabled: command === 'serve',
      }),
    ],
    resolve:{
      //设置路径别名
      alias: {
        '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
      host: '127.0.0.1',
      port: 5173,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },
    base: '/Spsystem/',
    build: {
      chunkSizeWarningLimit: 2500,
      rollupOptions: {
        output:{
          manualChunks(id) {
            if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    }
  }
})
