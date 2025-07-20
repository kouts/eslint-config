declare module 'eslint-plugin-html'
declare module 'eslint-plugin-import-x'
declare module 'eslint-plugin-vue'

// TODO: Remove this when https://github.com/vitest-dev/eslint-plugin-vitest/issues/737 is resolved
declare module '@vitest/eslint-plugin' {
  import type { ESLint, Linter } from 'eslint'

  type VitestPlugin = ESLint.Plugin & {
    configs: {
      recommended: Linter.Config
      all: Linter.Config
    }
    environments: {
      env: {
        globals: Record<string, boolean>
      }
    }
  }

  declare const plugin: VitestPlugin
  export = plugin
}
