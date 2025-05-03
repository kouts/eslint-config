import { config } from '@kouts/eslint-config'

export default [
  ...config({
    env: ['browser'],
  }),
  {
    // Disable multi-word-component-names for pages and layouts
    files: ['src/App.vue', 'src/views/**/*.vue', 'src/layouts/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'kouts/vue-require-name-in-setup': 'off',
    },
  },
]
