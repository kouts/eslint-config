const base = require.resolve('./base.js')

module.exports = {
  extends: [base, '@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  rules: {
    // Conflicts with sort-imports-es6-autofix
    'import/order': 'off',

    /* Typescript */

    // Prefer T[] instead of Array<T>
    '@typescript-eslint/array-type': ['error', { default: 'array' }]
  }
}
