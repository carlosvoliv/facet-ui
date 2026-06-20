import '../src/styles/tokens.css'
import '../src/styles/themes.css'
import '../src/styles/base.css'
import themes from '../src/themes.json'

const themeItems = [
  { value: '', title: 'Facet · Auto (system)' },
  { value: 'facet-dark', title: 'Facet Dark' },
  ...themes.map((t) => ({ value: t.name, title: t.label })),
]

export const globalTypes = {
  theme: {
    description: 'Facet theme',
    defaultValue: '',
    toolbar: {
      title: 'Theme',
      icon: 'paintbrush',
      items: themeItems,
      dynamicTitle: true,
    },
  },
}

const withTheme = (story, context) => {
  const t = context.globals.theme
  if (t) document.documentElement.dataset.theme = t
  else delete document.documentElement.dataset.theme
  return story()
}

export const decorators = [withTheme]

/** @type { import('@storybook/vue3').Preview } */
export const parameters = {
  layout: 'centered',
  controls: { expanded: true },
  backgrounds: { disable: true },
}
