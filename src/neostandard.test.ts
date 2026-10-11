import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import { config } from './index'

describe('neostandard integration', () => {
  it('preserves Node globals in Vue files when browser globals are added', async () => {
    const eslint = new ESLint({ overrideConfigFile: true, overrideConfig: config({ env: ['browser'] }) })
    const [result] = await eslint.lintText(
      "<script setup>\ndefineOptions({ name: 'TestComponent' })\nconsole.log(process.env.NODE_ENV)\n</script>",
      { filePath: 'TestComponent.vue' },
    )

    expect(result.messages).not.toEqual(expect.arrayContaining([expect.objectContaining({ ruleId: 'no-undef' })]))
  })

  it('applies import-x to JavaScript, TypeScript and Vue files', () => {
    const configs = config({ ts: true, noJsx: true })
    const importConfig = configs.find((config) => config.name === 'kouts/import-x')

    expect(importConfig?.files).toEqual(['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.vue'])
    expect(importConfig?.rules?.['import-x/no-self-import']).toBe('error')
  })

  it('applies import-x only to JavaScript files when TypeScript and Vue are disabled', () => {
    const configs = config({ ts: false, vue: false })
    const importConfig = configs.find((config) => config.name === 'kouts/import-x')

    expect(importConfig?.files).toEqual(['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx'])
  })
})
