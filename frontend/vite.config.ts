import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: { // This proxy block makes it so that whenever any request to a path startin with /api it forwards it to http:/localhost:3001
      '/api': 'http://localhost:3001'
    },
  },
})


