import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fixupConfigRules } from '@eslint/compat'
import { gitignoreToMinimatch } from '@humanwhocodes/gitignore-to-minimatch'
import stylistic from '@stylistic/eslint-plugin'
import type { ESLint, Linter } from 'eslint'
import importX from 'eslint-plugin-import-x'
import pluginN from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
// import pluginReact from 'eslint-plugin-react'
import { findUpSync } from 'find-up'
import globals from 'globals'
import tseslint from 'typescript-eslint'

type Globals = Linter.Globals

type Plugins = {
  '@stylistic': ESLint.Plugin
  'import-x': ESLint.Plugin
  n: ESLint.Plugin
  promise: ESLint.Plugin
  // react: ESLint.Plugin
  'typescript-eslint': typeof tseslint
}

export type NeostandardOptions = {
  env?: (keyof typeof globals)[]
  files?: string[]
  filesTs?: string[]
  globals?: Globals | string[]
  ignores?: string[]
  noJsx?: boolean
  noStyle?: boolean
  semi?: boolean
  ts?: boolean
}

export const plugins: Plugins = {
  '@stylistic': stylistic,
  'import-x': importX,
  n: pluginN,
  promise: pluginPromise,
  // react: pluginReact,
  'typescript-eslint': tseslint,
} as const

const base: Linter.Config = {
  name: 'neostandard/base',
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.es2022,
      ...globals.node,
      document: 'readonly',
      navigator: 'readonly',
      window: 'readonly',
    },
  },
  plugins: {
    n: plugins.n,
  },
  rules: {
    'no-var': 'warn',
    'object-shorthand': ['warn', 'properties'],
    'accessor-pairs': ['error', { setWithoutGet: true, enforceForClassMembers: true }],
    'array-callback-return': [
      'error',
      {
        allowImplicit: false,
        checkForEach: false,
      },
    ],
    camelcase: [
      'error',
      {
        allow: ['^UNSAFE_'],
        properties: 'never',
        ignoreGlobals: true,
      },
    ],
    'constructor-super': 'error',
    curly: ['error', 'multi-line'],
    'default-case-last': 'error',
    'dot-notation': ['error', { allowKeywords: true }],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
    'no-array-constructor': 'error',
    'no-async-promise-executor': 'error',
    'no-caller': 'error',
    'no-case-declarations': 'error',
    'no-class-assign': 'error',
    'no-compare-neg-zero': 'error',
    'no-cond-assign': 'error',
    'no-const-assign': 'error',
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-useless-backreference': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    'no-fallthrough': 'error',
    'no-func-assign': 'error',
    'no-global-assign': 'error',
    'no-implied-eval': 'error',
    'no-import-assign': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-iterator': 'error',
    'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
    'no-lone-blocks': 'error',
    'no-loss-of-precision': 'error',
    'no-misleading-character-class': 'error',
    'no-prototype-builtins': 'error',
    'no-useless-catch': 'error',
    'no-multi-str': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-object-constructor': 'error',
    'no-new-native-nonconstructor': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-proto': 'error',
    'no-redeclare': ['error', { builtinGlobals: false }],
    'no-regex-spaces': 'error',
    'no-return-assign': ['error', 'except-parens'],
    'no-self-assign': ['error', { props: true }],
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'error',
    'no-this-before-super': 'error',
    'no-throw-literal': 'error',
    'no-undef': 'error',
    'no-undef-init': 'error',
    'no-unexpected-multiline': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all',
      },
    ],
    'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'one-var': ['error', { initialized: 'never' }],
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-promise-reject-errors': 'error',
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
    'symbol-description': 'error',
    'unicode-bom': ['error', 'never'],
    'use-isnan': [
      'error',
      {
        enforceForSwitchCase: true,
        enforceForIndexOf: true,
      },
    ],
    'valid-typeof': ['error', { requireStringLiterals: true }],
    yoda: ['error', 'never'],
    'n/handle-callback-err': ['error', '^(err|error)$'],
    'n/no-callback-literal': 'error',
    'n/no-deprecated-api': 'error',
    'n/no-exports-assign': 'error',
    'n/no-new-require': 'error',
    'n/no-path-concat': 'error',
    'n/process-exit-as-throw': 'error',
    'promise/param-names': 'error',
  },
}

const modernization: Linter.Config = {
  name: 'neostandard/modernization-since-standard-17',
  rules: {
    'dot-notation': 'off',
    'n/no-deprecated-api': 'warn',
  },
}

const promise = fixupConfigRules(pluginPromise.configs['flat/recommended'] as Linter.Config)
const promiseConfigs = Array.isArray(promise) ? promise : [promise]

const modernizationStyles: Linter.Config = {
  name: 'neostandard/style/modernization-since-standard-17',
  rules: {
    '@stylistic/comma-dangle': [
      'warn',
      {
        arrays: 'ignore',
        enums: 'ignore',
        exports: 'ignore',
        imports: 'ignore',
        objects: 'ignore',
      },
    ],
    '@stylistic/no-multi-spaces': ['error', { ignoreEOLComments: true }],
  },
}

const style: Linter.Config = {
  name: 'neostandard/style',
  plugins: {
    '@stylistic': plugins['@stylistic'],
  },
  rules: {
    '@stylistic/array-bracket-spacing': ['error', 'never'],
    '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
    '@stylistic/block-spacing': ['error', 'always'],
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    '@stylistic/comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    '@stylistic/comma-spacing': ['error', { before: false, after: true }],
    '@stylistic/comma-style': ['error', 'last'],
    '@stylistic/computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
    '@stylistic/dot-location': ['error', 'property'],
    '@stylistic/eol-last': 'error',
    '@stylistic/func-call-spacing': ['error', 'never'],
    '@stylistic/generator-star-spacing': ['error', { before: true, after: true }],
    '@stylistic/indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
        ignoredNodes: [
          'TemplateLiteral *',
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXFragment',
          'JSXOpeningFragment',
          'JSXClosingFragment',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild',
        ],
        offsetTernaryExpressions: true,
      },
    ],
    '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true }],
    '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
    '@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    '@stylistic/multiline-ternary': ['error', 'always-multiline'],
    '@stylistic/new-parens': 'error',
    '@stylistic/no-extra-parens': ['error', 'functions'],
    '@stylistic/no-floating-decimal': 'error',
    '@stylistic/no-mixed-operators': [
      'error',
      {
        groups: [
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: true,
      },
    ],
    '@stylistic/no-mixed-spaces-and-tabs': 'error',
    '@stylistic/no-multi-spaces': 'error',
    '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    '@stylistic/no-tabs': 'error',
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/no-whitespace-before-property': 'error',
    '@stylistic/object-curly-newline': ['error', { multiline: true, consistent: true }],
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@stylistic/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
    '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before', '|>': 'before' } }],
    '@stylistic/padded-blocks': ['error', { blocks: 'never', switches: 'never', classes: 'never' }],
    '@stylistic/quote-props': ['error', 'as-needed'],
    '@stylistic/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    '@stylistic/rest-spread-spacing': ['error', 'never'],
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/semi-spacing': ['error', { before: false, after: true }],
    '@stylistic/space-before-blocks': ['error', 'always'],
    '@stylistic/space-before-function-paren': ['error', 'always'],
    '@stylistic/space-in-parens': ['error', 'never'],
    '@stylistic/space-infix-ops': 'error',
    '@stylistic/space-unary-ops': ['error', { words: true, nonwords: false }],
    '@stylistic/spaced-comment': [
      'error',
      'always',
      {
        line: { markers: ['*package', '!', '/', ',', '='] },
        block: { balanced: true, markers: ['*package', '!', ',', ':', '::', 'flow-include'], exceptions: ['*'] },
      },
    ],
    '@stylistic/template-curly-spacing': ['error', 'never'],
    '@stylistic/template-tag-spacing': ['error', 'never'],
    '@stylistic/wrap-iife': ['error', 'any', { functionPrototypeMethods: true }],
    '@stylistic/yield-star-spacing': ['error', 'both'],
  },
}

const jsxIgnores = ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.ts']

const jsx: Linter.Config = {
  name: 'neostandard/jsx',
  ignores: [...jsxIgnores],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  /*
   * React support is temporarily disabled.
   * plugins: {
   *   react: plugins.react,
   * },
   * settings: {
   *   react: {
   *     version: '17',
   *   },
   *   linkComponents: ['Link'],
   * },
   * rules: {
   *   'react/jsx-boolean-value': 'error',
   *   'react/jsx-fragments': ['error', 'syntax'],
   *   'react/jsx-handler-names': 'error',
   *   'react/jsx-key': [
   *     'error',
   *     {
   *       checkFragmentShorthand: true,
   *     },
   *   ],
   *   'react/jsx-no-comment-textnodes': 'error',
   *   'react/jsx-no-duplicate-props': 'error',
   *   'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
   *   'react/jsx-no-undef': ['error', { allowGlobals: true }],
   *   'react/jsx-uses-react': 'error',
   *   'react/jsx-uses-vars': 'error',
   *   'react/no-children-prop': 'error',
   *   'react/no-danger-with-children': 'error',
   *   'react/no-deprecated': 'error',
   *   'react/no-direct-mutation-state': 'error',
   *   'react/no-find-dom-node': 'error',
   *   'react/no-is-mounted': 'error',
   *   'react/no-string-refs': [
   *     'error',
   *     {
   *       noTemplateLiterals: true,
   *     },
   *   ],
   *   'react/no-unescaped-entities': [
   *     'error',
   *     {
   *       forbid: ['>', '}'],
   *     },
   *   ],
   *   'react/no-render-return-value': 'error',
   *   'react/require-render-return': 'error',
   *   'react/self-closing-comp': 'error',
   * },
   */
}

const jsxStyles: Linter.Config = {
  name: 'neostandard/style/jsx',
  ignores: [...jsxIgnores],
  rules: {
    '@stylistic/jsx-quotes': ['error', 'prefer-single'],
    '@stylistic/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    '@stylistic/jsx-closing-tag-location': 'error',
    '@stylistic/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
      },
    ],
    '@stylistic/jsx-curly-newline': [
      'error',
      {
        multiline: 'consistent',
        singleline: 'consistent',
      },
    ],
    '@stylistic/jsx-curly-spacing': [
      'error',
      {
        attributes: { when: 'never', allowMultiline: true },
        children: { when: 'never', allowMultiline: true },
      },
    ],
    '@stylistic/jsx-equals-spacing': ['error', 'never'],
    '@stylistic/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    '@stylistic/jsx-indent': [
      'error',
      2,
      {
        checkAttributes: false,
        indentLogicalExpressions: true,
      },
    ],
    '@stylistic/jsx-indent-props': ['error', 2],
    '@stylistic/jsx-pascal-case': ['error', { allowAllCaps: false }],
    '@stylistic/jsx-props-no-multi-spaces': 'error',
    '@stylistic/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    '@stylistic/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'ignore',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'ignore',
      },
    ],
  },
}

const semiConfig: Linter.Config = {
  name: 'neostandard/semi',
  rules: {
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/no-extra-semi': 'error',
  },
}

const jsImportRules: Linter.Config = {
  name: 'neostandard/import-x',
  files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx'],
  plugins: {
    'import-x': plugins['import-x'],
  },
  rules: {
    'import-x/export': 'error',
    'import-x/first': 'error',
    'import-x/no-absolute-path': ['error', { esmodule: true, commonjs: true, amd: false }],
    'import-x/no-duplicates': 'error',
    'import-x/no-named-default': 'error',
    'import-x/no-webpack-loader-syntax': 'error',
    // Custom rules
    'import-x/no-mutable-exports': 'error',
    'import-x/newline-after-import': ['error', { count: 1 }],
    'import-x/no-self-import': 'error',
  },
}

const isNonEmpty = (value: object) => Object.keys(value).length > 0

export const resolveIgnoresFromGitignore = (): string[] => {
  const configFile = findFlatConfigFileSync()

  if (!configFile) {
    return []
  }

  const result: string[] = []

  try {
    const content = readFileSync(join(dirname(configFile), '.gitignore'), 'utf8')

    for (let line of content.split('\n')) {
      line = line.trim()

      if (line && !line.startsWith('#')) {
        result.push(gitignoreToMinimatch(line))
      }
    }
  } catch {}

  return result
}

function findFlatConfigFileSync(): string | undefined {
  return findUpSync([
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs',
    'eslint.config.ts',
    'eslint.config.mts',
    'eslint.config.cts',
  ])
}

function typescriptify(
  configs: Linter.Config[],
  options: {
    files?: string[]
    ignores?: string[]
    name?: string
    project?: string[] | string | boolean | null
    tsconfigRootDir?: string
    typeChecking?: boolean
  },
): Linter.Config {
  const { files, ignores, name, project, tsconfigRootDir, typeChecking = false } = options

  const deactivatedRules: Record<string, 'off'> = {}
  const replacementRules: Linter.RulesRecord = {}

  const tsPlugin = tseslint.plugin as unknown as {
    rules: Record<
      string,
      {
        meta?: {
          docs?: {
            extendsBaseRule?: boolean
            requiresTypeChecking?: boolean
          }
        }
      }
    >
  }

  for (const config of configs) {
    for (const ruleId of Object.keys(tsRedundant)) {
      if (config.rules?.[ruleId]) {
        deactivatedRules[ruleId] = 'off'
      }
    }

    for (const [ruleId, ruleDefinition] of Object.entries(tsPlugin.rules)) {
      const currentRule = config.rules?.[ruleId]

      if (currentRule === undefined) {
        continue
      }

      if (!ruleDefinition.meta?.docs || typeof ruleDefinition.meta.docs !== 'object') {
        continue
      }

      const docs = ruleDefinition.meta.docs

      if (!docs.extendsBaseRule) {
        continue
      }

      if (docs.requiresTypeChecking && !typeChecking) {
        continue
      }

      deactivatedRules[ruleId] = 'off'

      if (ruleId !== 'dot-notation') {
        replacementRules[`@typescript-eslint/${ruleId}`] = currentRule
      }
    }
  }

  return {
    ...(name ? { name } : {}),
    ...(files ? { files } : {}),
    ...(ignores ? { ignores } : {}),
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: project === undefined ? typeChecking : project,
        ...(tsconfigRootDir ? { tsconfigRootDir } : {}),
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...deactivatedRules,
      ...replacementRules,
    },
  }
}

const tsRedundant = {
  'getter-return': 'off',
  'constructor-super': 'off',
  'no-const-assign': 'off',
  'no-dupe-args': 'off',
  'no-dupe-class-members': 'off',
  'no-dupe-keys': 'off',
  'no-func-assign': 'off',
  'no-import-assign': 'off',
  'no-new-native-nonconstructor': 'off',
  'no-obj-calls': 'off',
  'no-redeclare': 'off',
  'no-setter-return': 'off',
  'no-this-before-super': 'off',
  'no-undef': 'off',
  'no-unreachable': 'off',
  'no-unsafe-negation': 'off',
} as const

const getJsConfigs = (opts: Required<Pick<NeostandardOptions, 'noJsx' | 'noStyle' | 'semi'>>) => {
  const jsxConfigs = opts.noJsx ? [] : [jsx, ...(opts.noStyle ? [] : [jsxStyles])]
  const styleConfigs = opts.noStyle ? [] : [style, modernizationStyles, ...(opts.semi ? [semiConfig] : [])]

  return [...promiseConfigs, base, modernization, ...jsxConfigs, ...styleConfigs, jsImportRules]
}

export const neostandard = (options?: NeostandardOptions): Linter.Config[] => {
  const {
    env,
    files: rawFiles,
    filesTs,
    globals: rawGlobals,
    ignores,
    noJsx = false,
    noStyle = false,
    ts = false,
    semi = false,
  } = options || {}

  if (filesTs && !ts) {
    throw new Error('"filesTs" is only usable with the "ts" option')
  }

  const resolvedGlobals: Globals = Array.isArray(rawGlobals)
    ? Object.fromEntries(rawGlobals.map((global) => [global, true]))
    : { ...rawGlobals }

  for (const key of env || []) {
    if (!globals[key]) {
      throw new Error(`Invalid env definition: ${env}`)
    }

    const envGlobals = globals[key]

    for (const [name, value] of Object.entries(envGlobals)) {
      resolvedGlobals[name] = resolvedGlobals[name] || value
    }
  }

  const files = [...(rawFiles || []), ...(noJsx ? [] : ['**/*.jsx'])]

  const jsConfigs = getJsConfigs({ noJsx, noStyle, semi })

  return [
    ...(ignores ? [{ ignores }] : []),
    ...(files.length
      ? [
          {
            name: 'neostandard/additional-files',
            files,
          },
        ]
      : []),
    ...(isNonEmpty(resolvedGlobals)
      ? [
          {
            name: 'neostandard/globals',
            languageOptions: { globals: resolvedGlobals },
          },
        ]
      : []),
    ...jsConfigs,
    ...(ts
      ? [
          typescriptify(jsConfigs, {
            files: ['**/*.ts', ...(noJsx ? [] : ['**/*.tsx']), ...(filesTs || [])],
            ignores,
            name: 'neostandard/ts',
          }),
        ]
      : []),
  ]
}

export default neostandard
