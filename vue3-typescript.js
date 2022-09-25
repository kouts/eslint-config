const javascript = require.resolve('./javascript.js')
const vue = require.resolve('./vue.js')

module.exports = {
  env: {
    'vue/setup-compiler-macros': true
  },
  extends: ['plugin:vue/vue3-recommended', '@vue/eslint-config-typescript/recommended', vue, javascript],
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  ],
  rules: {
    /* Typescript */

    // Disable 'no-unused-vars' as TypeScript has its own version
    'no-unused-vars': 'off',

    // Prefer T[] instead of Array<T>
    '@typescript-eslint/array-type': ['error', { default: 'array' }]
  }
}
