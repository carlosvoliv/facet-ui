/** @type { import('@storybook/vue3-vite').StorybookConfig } */
export default {
  stories: ['../src/**/*.stories.@(js|ts)'],
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/vue3-vite', options: {} },
}
