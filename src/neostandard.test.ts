import { describe, expect, it } from 'vitest'
import { config } from './index'

describe('neostandard integration', () => {
  it('keeps import-x scoped to JavaScript files', () => {
    const configs = config({ ts: true, noJsx: true })
    const importConfig = configs.find((config) => config.name === 'kouts/import-x')

    expect(importConfig?.files).toEqual(['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx'])
    expect(importConfig?.rules?.['import-x/no-self-import']).toBe('error')
  })
})
