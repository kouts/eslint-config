import js from '@eslint/js'
import pluginVitest from '@vitest/eslint-plugin'
import type { Linter } from 'eslint'
import pluginHtml from 'eslint-plugin-html'
import pluginImport from 'eslint-plugin-import-x'
import pluginPrettier from 'eslint-plugin-prettier/recommended'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import neostandard, { type NeostandardOptions, plugins, resolveIgnoresFromGitignore } from 'neostandard'
import { typescript } from './typescript'
import { vue } from './vue'

type Options = {
  vue?: boolean
  vueVersion?: 2 | 3
  vitest: boolean
} & NeostandardOptions

const config = (options?: Options) => {
  const opts: Options = {
    noJsx: true,
    noStyle: true,
    semi: false,
    ts: true,
    vue: true,
    vueVersion: 3,
    vitest: true,
    ...options,
  }

  const linterConfig: Linter.Config[] = [
    {
      name: 'kouts/ignores',
      ignores: [
        '**/node_modules/**',
        '{tmp,temp}/**',
        '**/*.min.js',
        'vendor/**',
        'dist/**',
        'public/**',
        ...resolveIgnoresFromGitignore(),
      ],
    },

    // JavaScript
    {
      name: 'kouts/javascript',
      ...js.configs.recommended,
    },

    // TypeScript
    ...(opts.ts ? typescript : []),

    // Neostandard
    ...neostandard(opts),
    {
      name: 'kouts/neostandard-overrides',
      rules: {
        // Enforce blank lines between the given 2 kinds of statements
        'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: '*', next: 'return' },
          { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
          { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
          { blankLine: 'always', prev: 'directive', next: '*' },
          { blankLine: 'any', prev: 'directive', next: 'directive' },
        ],
        // Console and debugger settings depending whether we're on production or not
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      },
    },

    // Import
    {
      name: 'kouts/import',
      plugins: {
        import: pluginImport,
      },
      rules: {
        'import/export': 'error',
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/no-absolute-path': ['error', { esmodule: true, commonjs: true, amd: false }],
        'import/newline-after-import': ['error', { count: 1 }],
      },
    },

    // Sort imports
    {
      name: 'kouts/sort-imports',
      plugins: {
        'simple-import-sort': pluginSimpleImportSort,
      },
      rules: {
        'simple-import-sort/imports': [
          'error',
          // Remove all blank lines between imports
          {
            groups: [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.']],
          },
        ],
        'simple-import-sort/exports': 'error',
      },
    },

    // HTML
    {
      name: 'kouts/html',
      files: ['**/*.html'],
      plugins: {
        html: pluginHtml,
      },
    },

    // Vue
    ...(opts.vue ? vue({ version: opts.vueVersion, ts: opts.ts }) : []),

    // Vitest
    ...(opts.vitest
      ? [
          {
            name: 'kouts/vitest',
            files: ['test/**', 'tests/**', '**/*.test.{js,ts}*', '**/*.spec.{js,ts}'],
            plugins: {
              vitest: pluginVitest,
            },
            rules: {
              ...pluginVitest.configs.recommended.rules,
            },
            languageOptions: {
              globals: {
                ...pluginVitest.environments.env.globals,
              },
            },
          },
        ]
      : []),

    // Prettier
    {
      name: 'kouts/prettier',
      ...pluginPrettier,
    },
  ]

  return linterConfig
}

export { config, plugins }
