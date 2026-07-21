import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // must match the GitHub repo name exactly, or assets 404 on Pages
  base: process.env.VERCEL ? '/' : '/Birthday-Card-Website/',
})
