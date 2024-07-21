import HelloWorld from '@/components/HelloWorld.vue'
import { mount } from '@vue/test-utils'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })

    let testNumber: number = 0

    testNumber = 1

    // Uncomment the following line to see the error
    // testNumber = 'test'

    console.log('testNumber', testNumber)

    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
