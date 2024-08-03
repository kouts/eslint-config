# @kouts/eslint-config

> Custom ESLint and Prettier config with sensible defaults

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
  ...config(),
  {
    // Add custom rules here
  }
]
```

You can customize the config by passing an object to the `config` function:

```javascript
config({
  ts: true,
  vue: true
  vueVersion: 3
})
```

Available options:

| Option     | Type       | Description                   | Default |
| ---------- | ---------- | ----------------------------- | ------- |
| ts         | `boolean`  | Enable TypeScript support     | `true`  |
| vue        | `boolean`  | Enable Vue.js support         | `true`  |
| vueVersion | `2` or `3` | Specify the version of Vue.js | `3`     |

### Prettier config

Add a `prettier.config.js` file with contents:

```javascript
import prettierConfig from '@kouts/eslint-config/prettier'

export default prettierConfig
```

### package.json scripts

You can add ESLint commands to `.package-json` for linting and autofixing:

```json
{
  "lint": "eslint \"**/*.{vue,ts,js}\"",
  "lint-fix": "eslint --fix \"**/*.{vue,ts,js}\""
}
```

### VS Code settings

Put the following into VS Code project settings for autofix on save

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
  - [eslint-plugin-import-x](https://github.com/lydell/eslint-plugin-simple-import-sort) for auto-fixing import/export syntax, and prevent issues with misspelling of file paths and import names

## License

[MIT](http://opensource.org/licenses/MIT)
