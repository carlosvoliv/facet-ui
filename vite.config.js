import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Relative base so the built styleguide works on GitHub Pages (project subpath).
export default defineConfig({
  plugins: [vue()],
  base: './',
})
