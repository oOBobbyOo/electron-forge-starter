import angular from '@analogjs/vite-plugin-angular'
import { defineConfig } from 'vite'

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    mainFields: ['module'],
  },
  plugins: [angular()],
})
