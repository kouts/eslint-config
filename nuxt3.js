const base = require.resolve('./base.js')

module.exports = {
  extends: [base, '@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  rules: {
    /* Typescript */

    // Prefer T[] instead of Array<T>
    '@typescript-eslint/array-type': ['error', { default: 'array' }]
  }
}
