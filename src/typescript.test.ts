import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import { config } from './index'
import { typescript } from './typescript'

describe('typescript eslint config', () => {
  it('should have no-restricted-syntax rule for TSEnumDeclaration', () => {
    const rule = typescript.find((config) => config.rules?.['no-restricted-syntax'])

    expect(rule).toBeDefined()
    expect(rule?.rules?.['no-restricted-syntax']).toEqual([
      'error',
      {
        selector: 'TSEnumDeclaration',
        message: `Enums introduce unexpected runtime behavior, break TypeScript's structural typing, and add unnecessary complexity. Use union types or 'as const' objects instead.`,
      },
    ])
  })

  it('should flag TSEnumDeclaration as an error', async () => {
    const eslint = new ESLint({
      overrideConfig: {
        ...config,
      },
    })

    const code = `
      enum Colors {
        Red,
        Blue,
        Green,
      }
    `

    const results = await eslint.lintText(code)

    expect(results[0].messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'no-restricted-syntax',
          message: expect.stringContaining('Enums introduce unexpected runtime behavior'),
        }),
      ]),
    )
  })

  it('does not allow non-null assertions using the ! postfix operator', async () => {
    const eslint = new ESLint({
      overrideConfig: {
        ...config,
      },
    })

    const code = `
      const foo: string | null = 'bar'
      const bar = foo!
    `

    const results = await eslint.lintText(code)

    expect(results[0].messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleId: '@typescript-eslint/no-non-null-assertion',
          message: expect.stringContaining('non-null assertion'),
        }),
      ]),
    )
  })
})
