import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HorseList from '../HorseList.vue'

describe('HorseList.vue', () => {
  const mockHorses = [
    { number: 1, name: 'At', condition: 85, color: 'brown' },
    { number: 2, name: 'Eşek', condition: 90, color: 'black' },
  ]

  it('shows loading', () => {
    const wrapper = mount(HorseList, {
      props: { horses: mockHorses, loading: true },
    })

    // checks if loading is visilbe
    const loadingDiv = wrapper.findAll('div:has(p)').at(1)
    expect(loadingDiv?.exists()).toBe(true)
    expect(loadingDiv?.isVisible()).toBe(true)
    expect(loadingDiv?.text()).toContain('Loading...')

    // checks if list is hidden
    const contentDiv = wrapper.findAll('div.flex.flex-col').at(1)
    expect(contentDiv?.exists()).toBe(true)
    expect(contentDiv?.isVisible()).toBe(false)
  })

  it('shows horse list when not loading', () => {
    const wrapper = mount(HorseList, {
      props: { horses: mockHorses, loading: false },
    })

    // checks if loading is hidden
    const loadingDiv = wrapper.findAll('div:has(p)').at(1)
    expect(loadingDiv?.exists()).toBe(true)
    expect(loadingDiv?.isVisible()).toBe(false)

    // checks if list is visible
    const contentDiv = wrapper.findAll('div.flex.flex-col').at(1)
    expect(contentDiv?.exists()).toBe(true)
    expect(contentDiv?.isVisible()).toBe(true)

    // checks if horse items are rendered
    const horseItems = wrapper.findAll('div.grid')
    expect(horseItems).toHaveLength(mockHorses.length)

    mockHorses.forEach((horse, index) => {
      const item = horseItems[index]
      expect(item.text()).toContain(horse.number)
      expect(item.text()).toContain(horse.name)
      expect(item.text()).toContain(horse.condition)
      expect(item.text()).toContain(horse.color)
    })
  })

  it('shows empty state when no horses', () => {
    const wrapper = mount(HorseList, {
      props: { horses: [], loading: false },
    })

    // checks if list is visible but empty
    const contentDiv = wrapper.find('div.flex.flex-col')
    expect(contentDiv.exists()).toBe(true)
    expect(contentDiv.isVisible()).toBe(true)
    expect(wrapper.findAll('div.grid')).toHaveLength(0)
  })
})
