import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Set to '/<repo-name>/' when deploying to GitHub Pages under a project path.
  base: '/',
  plugins: [react(), tailwindcss()],
})
