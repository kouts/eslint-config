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

  it('keeps import-x scoped to JavaScript files', () => {
    const configs = config({ ts: true, noJsx: true })
    const importConfig = configs.find((config) => config.name === 'kouts/import-x')

    expect(importConfig?.files).toEqual(['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx'])
    expect(importConfig?.rules?.['import-x/no-self-import']).toBe('error')
  })
})
