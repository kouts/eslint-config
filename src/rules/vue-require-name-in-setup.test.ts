import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import { config } from '../index'

describe('vue-require-name-in-setup rule', () => {
  it('should be enabled with error severity in the configuration', async () => {
    const eslint = new ESLint({
      overrideConfig: {
        ...config,
      },
    })

    const configs = await eslint.calculateConfigForFile('test-component.vue')
    const ruleSetting = configs.rules?.['kouts/vue-require-name-in-setup']

    expect(ruleSetting).toBeDefined()
    expect(ruleSetting[0] === 2 || ruleSetting[0] === 'error').toBe(true)
  })

  it('should report an error when <script setup> component has no defineOptions name', async () => {
    const eslint = new ESLint({
      overrideConfig: {
        ...config,
      },
    })

    const code = `
<template>
  <div>Hello World</div>
</template>

<script setup lang="ts">
  const test = 'test'

  console.log(test)
</script>
`

    const results = await eslint.lintText(code, {
      filePath: 'test-component.vue',
    })

    expect(results[0].messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'kouts/vue-require-name-in-setup',
          message: expect.stringContaining('Component name is required'),
        }),
      ]),
    )
  })

  it('should report an error when <script setup> component has defineOptions but no name', async () => {
    const eslint = new ESLint({
      overrideConfig: {
        ...config,
      },
    })

    const code = `
<template>
  <div>{{ test }}</div>
</template>

<script setup lang="ts">
  defineOptions({
    inheritAttrs: false,
  })
  
  const test = 'test'
</script>
`

    const results = await eslint.lintText(code, {
      filePath: 'test-component.vue',
    })

    expect(results[0].messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'kouts/vue-require-name-in-setup',
          message: expect.stringContaining('Component name is required'),
        }),
      ]),
    )
  })

  it('should not report an error when <script setup> has defineOptions with name', async () => {
    const eslint = new ESLint({
      overrideConfig: {
        ...config,
      },
    })

    const code = `
<template>
  <div>{{ test }}</div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'TestComponent' })
  
  const test = 'test'
</script>
`

    const results = await eslint.lintText(code, {
      filePath: 'test-component.vue',
    })

    const hasVueRequireNameError = results[0].messages.some((message) => message.ruleId === 'kouts/vue-require-name-in-setup')

    expect(hasVueRequireNameError).toBe(false)
  })

  it('should not report an error for Vue components without <script setup>', async () => {
    const eslint = new ESLint({
      overrideConfig: {
        ...config,
      },
    })

    const code = `
<template>
  <div>{{ test }}</div>
</template>

<script lang="ts">
export default {
  name: 'TestComponent',
  setup() {
    const test = 'test'
    return { test }
  }
}
</script>
`

    const results = await eslint.lintText(code, {
      filePath: 'test-component.vue',
    })

    const hasVueRequireNameError = results[0].messages.some((message) => message.ruleId === 'kouts/vue-require-name-in-setup')

    expect(hasVueRequireNameError).toBe(false)
  })
})
