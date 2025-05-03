# @kouts/eslint-config

> Custom ESLint and Prettier config with Vue.js support and sensible defaults

> [!NOTE]  
> Starting from v1, this ESLint config uses the [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new) and is only compatible with ESLint v9 or v8.50.0+.  
> If you're looking for the previous version, checkout the [README]('./README_V0.md') here.

## Installation

```bash
pnpm i -D @kouts/eslint-config eslint prettier
```

## Usage

### ESLint config

Add an `eslint.config.js` (or `eslint.config.cjs` if your project is CommonJS) that imports the `config` function:

```javascript
import { config } from '@kouts/eslint-config'

export default [
  ...config({
    env: ['browser'], // Add your environment globals here
  }),
  {
    // Add custom rules here
  },
]
```

#### Customizing the config

The configuration comes with default settings that extend the [neostandard](https://github.com/neostandard/neostandard/tree/main?tab=readme-ov-file#configuration-options) config. You can further customize it by passing an object to the `config` function:

**Config settings defaults:**

| Option     | Type       | Description                   | Default |
| ---------- | ---------- | ----------------------------- | ------- |
| ts         | `boolean`  | Enable TypeScript support     | `true`  |
| noJsx      | `boolean`  | No jsx rules will be added    | `true`  |
| noStyle    | `boolean`  | No style rules will be added  | `true`  |
| semi       | `boolean`  | Use semicolons                | `false` |
| vue        | `boolean`  | Enable Vue.js support         | `true`  |
| vueVersion | `2` or `3` | Specify the version of Vue.js | `3`     |
| vitest     | `boolean`  | Enable Vitest support         | `true`  |

**Example:**

```javascript
config({
  ts: false,
  vue: true
  vueVersion: 3,
  vitest: false,
})
```

### Prettier config

Create a `prettier.config.js` file with the following content:

```javascript
import prettierConfig from '@kouts/eslint-config/prettier'

export default prettierConfig
```

### package.json scripts

Add the following ESLint commands to your `.package-json` for linting and autofixing:

```json
{
  "lint": "eslint \"**/*.{vue,ts,js}\"",
  "lint-fix": "eslint --fix \"**/*.{vue,ts,js}\""
}
```

### VS Code settings

Ad the following settings to your VS Code project settings for autofix on save:

`.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Features

- Based on [neostandard](https://github.com/neostandard/neostandard)
- [Prettier](https://prettier.io) for code formatting
- Plugins
  - [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html) for linting inline scripts contained in HTML files
  - [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue/) for linting Vue.js files
  - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) for disabling all rules that conflict with Prettier
  - [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) for using Prettier as a code formatter with `eslint --fix`
  - [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort) for auto-fixing imports order
  - [eslint-plugin-vitest](https://github.com/vitest-dev/eslint-plugin-vitest) for linting Vitest test files

## Vue-specific Rules

This configuration extends the [ESLint plugin Vue recommended preset](https://eslint.vuejs.org/rules/#priority-c-recommended-potentially-dangerous-patterns) but makes several modifications to enhance code quality and consistency in Vue components.

### Disabled Rules

- `vue/max-attributes-per-line`: Turned off to allow flexibility in attribute formatting
- `vue/singleline-html-element-content-newline`: Turned off for cleaner code with fewer line breaks

### Strengthened Rules (set to 'error')

- `vue/attributes-order`: Enforces consistent order of component attributes
- `vue/block-order`: Enforces consistent order of component blocks
- `vue/no-lone-template`: Prevents unnecessary template wrappers
- `vue/no-multiple-slot-args`: Prevents passing multiple arguments to slots
- `vue/no-v-html`: Prevents use of v-html to mitigate XSS risks
- `vue/order-in-components`: Enforces consistent order of component options
- `vue/this-in-template`: Prevents usage of this in templates
- `vue/require-prop-types`: Requires type definitions for props
- `vue/component-name-in-template-casing`: Enforces PascalCase for component names in templates
- `vue/no-static-inline-styles`: Prevents inline styles in templates
- `vue/require-explicit-emits`: Requires explicit emit declarations
- `vue/require-name-property`: Requires components to have a name property
- `vue/html-self-closing`: Enforces self-closing style for components with no content
- `vue/dot-notation`: Enforces dot notation where possible in templates

### Custom Vue Rules

- `kouts/vue-require-name-in-setup`: Enforces that Vue components using `<script setup>` must have a component name.

### Customizing/Disabling Vue Rules

You can customize or disable any of these rules in your ESLint config:

```js
// eslint.config.js
import { config } from '@kouts/eslint-config'

export default [
  ...config(),
  {
    rules: {
      // Disable custom rule
      'kouts/vue-require-name-in-setup': 'off',

      // Modify strengthened Vue rules
      'vue/attributes-order': 'warn',
      'vue/no-v-html': 'off',

      // Re-enable rules that were turned off
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 3 },
          multiline: { max: 1 },
        },
      ],
    },
  },
]
```

## License

[MIT](http://opensource.org/licenses/MIT)
