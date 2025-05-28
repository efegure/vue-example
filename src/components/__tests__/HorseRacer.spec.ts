import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HorseRacer from '../HorseRacer.vue'

describe('HorseRacer', () => {
  it('renders horse info correctly', () => {
    const horse = {
      number: 1,
      name: 'Eşek',
      condition: 85,
      color: 'red',
    }

    const wrapper = mount(HorseRacer, {
      props: { horse, winningOrderIds: [] },
    })

    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.text()).toContain('Eşek')
  })

  it('positions horse at start when there is no results', () => {
    const horse = { number: 1, name: 'Eşek', condition: 85, color: 'red' }
    const wrapper = mount(HorseRacer, {
      props: { horse, winningOrderIds: [] },
    })

    expect(wrapper.attributes('style')).toContain('right: calc(100% - 100px)')
  })

  it('positions horse based on results', () => {
    const horse = { number: 2, name: 'Eşek', condition: 85, color: 'red' }
    const wrapper = mount(HorseRacer, {
      props: {
        horse,
        winningOrderIds: [3, 2, 1], // Horse is in second position
      },
    })

    expect(wrapper.attributes('style')).toContain('transition: right 2s ease-in-out; right: 0%;')
  })
})
