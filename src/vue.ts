import type { Linter } from 'eslint'
import pluginVue from 'eslint-plugin-vue'
import { plugins } from 'neostandard'

type Options = {
  version?: 2 | 3
  ts?: boolean
}

const vue = (options?: Options) => {
  const opts: Options = {
    version: 3,
    ts: true,
    ...options,
  }

  const vueConfig = opts.version === 3 ? pluginVue.configs['flat/recommended'] : pluginVue.configs['flat/vue2-recommended']

  const languageOptions = opts.ts
    ? {
        languageOptions: {
          parserOptions: {
            parser: plugins['typescript-eslint'].parser,
          },
        },
      }
    : {}

  const config: Linter.Config[] = [
    ...vueConfig,
    {
      name: 'kouts/vue',
      files: ['*.vue', '**/*.vue'],
      ...languageOptions,
      rules: {
        // Custom rules
        'kouts/vue-require-name-in-setup': 'error',

        // Overrides for vue/(vue3-)recommended preset
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',

        // Strengthen vue/(vue3-)recommended preset for autofix
        // https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/configs/recommended.js
        'vue/attributes-order': 'error',
        'vue/block-order': 'error',
        'vue/no-lone-template': 'error',
        'vue/no-multiple-slot-args': 'error',
        'vue/no-v-html': 'error',
        'vue/order-in-components': 'error',
        'vue/this-in-template': 'error',
        'vue/require-prop-types': 'error',

        // Enforce PascalCase for Vue components
        'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false, ignores: [] }],

        // Do not allow inline styles
        'vue/no-static-inline-styles': ['error', { allowBinding: false }],

        // Require explicit emits
        'vue/require-explicit-emits': 'error',

        // Require component to have a name property
        'vue/require-name-property': 'error',

        // Require components that don't have any content to self-close
        'vue/html-self-closing': [
          'error',
          {
            html: {
              void: 'always',
              normal: 'never',
              component: 'always',
            },
            svg: 'always',
            math: 'always',
          },
        ],

        // Enforce dot notation whenever possible in `<template>`
        'vue/dot-notation': ['error'],
      },
    },
  ]

  return config
}

export { vue }
