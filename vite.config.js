import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// `vite build`            → builds the styleguide site (for GitHub Pages)
// `vite build --mode lib` → builds the installable component library
export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [vue()],
      build: {
        lib: {
          entry: 'src/index.js',
          name: 'FacetUI',
          formats: ['es', 'umd'],
          fileName: (format) => `facet-ui.${format === 'es' ? 'js' : 'umd.cjs'}`,
        },
        rollupOptions: {
          external: ['vue'],
          output: { globals: { vue: 'Vue' }, assetFileNames: 'facet-ui.[ext]' },
        },
      },
    }
  }
  return { plugins: [vue()], base: './' }
})
