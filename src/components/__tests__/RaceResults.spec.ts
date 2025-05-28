import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RaceResults from '../RaceResults.vue'

describe('RaceResults.vue', () => {
  const mockHorseMap = new Map([
    [1, { number: 1, name: 'At', condition: 85, color: 'brown' }],
    [2, { number: 2, name: 'Eşek', condition: 90, color: 'black' }],
  ])

  const mockRaceSchedule = {
    id: '1',
    name: 'Test Race',
    date: new Date('2025-05-29'),
    rounds: [{ length: 1200, participantIds: [1, 2] }],
  }

  const mockRaceResult = {
    id: '1',
    roundResults: [{ length: 1200, winningOrderIds: [2, 1] }],
  }

  it('displays loading', () => {
    const wrapper = mount(RaceResults, {
      props: {
        loading: true,
      },
    })

    expect(wrapper.text()).toContain('Loading...')
    expect(wrapper.findAll('div[class*="gap-2"]').at(1)?.isVisible()).toBe(false)
  })

  it('displays race schedule information', () => {
    const wrapper = mount(RaceResults, {
      props: {
        raceSchedule: mockRaceSchedule,
        loading: false,
      },
    })

    expect(wrapper.text()).toContain('Test Race')
    expect(wrapper.text()).toContain('5/29/2025')
  })

  it('displays race results with correct order', () => {
    const wrapper = mount(RaceResults, {
      props: {
        raceSchedule: mockRaceSchedule,
        raceResult: mockRaceResult,
        horseMap: mockHorseMap,
        loading: false,
      },
    })

    // checks if round information is displayed
    expect(wrapper.text()).toContain('Round 1 1200m')

    // checks if results are displayed in correct order
    const resultRows = wrapper.findAll('div[class*="grid"]')
    expect(resultRows).toHaveLength(2) // 2 horses in the results

    expect(resultRows[0].text()).toContain('1')
    expect(resultRows[0].text()).toContain('Eşek')

    expect(resultRows[1].text()).toContain('2')
    expect(resultRows[1].text()).toContain('At')
  })

  it('displays empty state when no results', () => {
    const wrapper = mount(RaceResults, {
      props: {
        raceSchedule: mockRaceSchedule,
        raceResult: { id: '1', roundResults: [] },
        loading: false,
      },
    })

    expect(wrapper.text()).not.toContain('Round')
  })
})
