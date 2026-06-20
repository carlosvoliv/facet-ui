import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  { ignores: ['dist/**', 'storybook-static/**', 'node_modules/**', 'src/styles/themes.css'] },
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'vue/multi-word-component-names': 'off', // components are Facet*-prefixed
      'vue/require-default-prop': 'off',
      // Formatting is intentionally compact in this codebase; lint enforces
      // correctness, not whitespace. (Prettier/editorconfig owns layout.)
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/html-self-closing': 'off',
      'vue/html-closing-bracket-newline': 'off',
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    languageOptions: { globals: { ...globals.vitest } },
  },
  {
    // FacetIcon renders a static, internal SVG-path constant — no user input
    // reaches v-html, so the XSS rule doesn't apply here.
    files: ['src/components/FacetIcon.vue'],
    rules: { 'vue/no-v-html': 'off' },
  },
]
