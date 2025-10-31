import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 👈 important pour que index.html trouve les assets
  server: {
    port: 5173,
    open: true,
  },
})
