module.exports = {
  // extends: ['@kouts/eslint-config/vue3-typescript'],
  extends: ['../../vue3-typescript.js'],
  overrides: [
    {
      // Disable multi-word-component-names for pages and layouts
      files: ['src/views/**/*.vue', 'src/layouts/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}
