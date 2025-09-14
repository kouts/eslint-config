import pluginVitest from '@vitest/eslint-plugin'
import type { Linter } from 'eslint'

export const vitest: Linter.Config[] = [
  {
    name: 'kouts/vitest',
    files: ['test/**', 'tests/**', '**/*.test.{js,ts}*', '**/*.spec.{js,ts}'],
    plugins: {
      vitest: pluginVitest,
    },
    rules: {
      ...pluginVitest.configs.recommended.rules,
      'vitest/expect-expect': [
        'error',
        {
          assertFunctionNames: ['expect', 'assert', 'expectTypeOf'],
        },
      ],
    },
    languageOptions: {
      globals: {
        ...pluginVitest.environments.env.globals,
      },
    },
  },
]
