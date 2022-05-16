import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8090
  }
})