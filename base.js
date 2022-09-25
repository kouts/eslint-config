const configVars = require('./configVars.js')

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: ['standard'],
  plugins: ['html', 'sort-imports-es6-autofix'],
  ignorePatterns: ['**/node_modules/**', '{tmp,temp}/**', '**/*.min.js', 'vendor/**', 'dist/**', 'public/**'],
  overrides: [
    {
      files: ['*.json'],
      rules: {
        quotes: [2, 'double']
      }
    },
    {
      files: ['**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    // Sort imports
    'sort-imports-es6-autofix/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none']
      }
    ],

    // Enforce a new line after the imports section
    'import/newline-after-import': ['error', { count: 1 }],

    // Enforce blank lines between the given 2 kinds of statements
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' }
    ],

    // Console and debugger settings depending whether we're on production or not
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // Print width setting
    'max-len': [
      'error',
      {
        code: configVars.printWidth,
        ignoreComments: true,
        ignoreUrls: true
      }
    ]
  }
}
