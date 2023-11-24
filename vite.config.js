import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import ViteImages from 'vite-plugin-vue-images'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.js', // Основная точка входа
      },
    },
  },
  plugins: [
    Vue(),
    ViteImages() 
  ],
  server: {
    port: 10091,
    host: "0.0.0.0"

  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})