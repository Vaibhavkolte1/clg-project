import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    hmr: {
      protocol: 'ws',
      host: '127.0.0.1'
    },
    proxy: {
      '/api': {
        target: 'https://e-commarce-backend-1.onrender.com',
        changeOrigin: true,
        secure: true,
        ws: true,
        headers: {
          // make backend see requests as coming from itself
          origin: 'https://e-commarce-backend-1.onrender.com'
        }
      }
    }
  }
})
