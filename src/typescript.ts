import type { Linter } from 'eslint'
import { plugins } from 'neostandard'

export const typescript: Linter.Config[] = [
  ...(plugins['typescript-eslint'].configs.recommended as Linter.Config[]),
  {
    name: 'kouts/typescript',
    rules: {
      // Disable 'no-unused-vars' since TypeScript has its own version
      'no-unused-vars': 'off',

      // Prefer T[] instead of Array<T>
      '@typescript-eslint/array-type': ['error', { default: 'array' }],

      // Prefer type over interface for objects
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // Fix type imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      // Allow _ for unused variables
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'none',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          vars: 'all',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]
