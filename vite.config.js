import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/festivhall/', // 👈 le nom exact de ton repo GitHub
  server: {
    port: 5173,
    open: true,
  },
})
