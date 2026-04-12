import { describe, expect, it } from 'vitest'
import { neostandard } from './neostandard'

describe('neostandard compatibility layer', () => {
  it('keeps import-x scoped to JavaScript files', () => {
    const configs = neostandard({ ts: true, noJsx: true })
    const baseConfig = configs.find((config) => config.name === 'neostandard/base')
    const importConfig = configs.find((config) => config.name === 'neostandard/import-x')
    const tsConfig = configs.find((config) => config.name === 'neostandard/ts')

    expect(baseConfig?.rules?.['import-x/export']).toBeUndefined()
    expect(importConfig?.files).toEqual(['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx'])
    expect(importConfig?.rules?.['import-x/no-self-import']).toBe('error')
    expect(tsConfig?.rules?.['import-x/no-self-import']).toBeUndefined()
  })

  it('rejects filesTs when TypeScript is disabled', () => {
    expect(() => neostandard({ ts: false, filesTs: ['src/**/*.ts'] })).toThrow('"filesTs" is only usable with the "ts" option')
  })
})
