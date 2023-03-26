# @kouts/eslint-config

> Custom ESLint and Prettier config with sensible defaults

## Installation

```bash
npm i -D @kouts/eslint-config eslint prettier
```

## Usage

There are 4 ESLint config presets that you can use:

- `@kouts/eslint-config/javascript` for JavaScript / TypeScript projects
- `@kouts/eslint-config/vue2` for Vue.js 2 projects
- `@kouts/eslint-config/vue3` for Vue.js 3 projects
- `@kouts/eslint-config/vue3-typescript` for Vue.js 3 / TypeScript projects
- `@kouts/eslint-config/nuxt3` for Nuxt 3 projects

Add the desired config preset into your `.eslintrc.js` file:

```javascript
module.exports = {
  extends: ['@kouts/eslint-config/vue2']
}
```

Add a `prettier.config.js` file with contents:

```javascript
module.exports = require('@kouts/eslint-config/prettier.config.js')
```

You can add ESLint commands to `.package-json`

```json
{
  "lint": "eslint \"**/*.{vue,ts,js}\"",
  "lint-fix": "eslint --fix \"**/*.{vue,ts,js}\""
}
```

and VS Code settings for autofix on save

`.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Features

- Based on [eslint-config-standard](https://github.com/standard/eslint-config-standard)
- [Prettier](https://prettier.io) for code formatting
- Plugins
  - [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html) for linting inline scripts contained in HTML files
  - [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue/) for linting Vue.js files
  - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) for disabling all rules that conflict with Prettier
  - [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) for using prettier as a code formatter for `eslint --fix`
  - [sort-imports-es6-autofix](https://github.com/marudor/eslint-plugin-sort-imports-es6-autofix) for auto-fixing imports order

## License

[MIT](http://opensource.org/licenses/MIT)
