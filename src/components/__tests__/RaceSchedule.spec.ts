import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RaceSchedule from '../RaceSchedule.vue'

describe('RaceSchedule.vue', () => {
  const mockHorseMap = new Map([
    [1, { number: 1, name: 'At', condition: 85, color: 'brown' }],
    [2, { number: 2, name: 'Eşek', condition: 90, color: 'black' }],
  ])

  const mockRaceSchedule = {
    id: '1',
    name: 'Test Race',
    date: new Date('2025-05-29'),
    rounds: [
      { length: 1200, participantIds: [1, 2] },
      { length: 1400, participantIds: [2, 1] },
    ],
  }

  it('displays loading', () => {
    const wrapper = mount(RaceSchedule, {
      props: { loading: true },
    })

    const loadingDiv = wrapper.findAll('p').at(3)
    expect(loadingDiv?.exists()).toBe(true)
    expect(loadingDiv?.text()).toContain('Loading...')
    expect(loadingDiv?.isVisible()).toBe(true)
  })

  it('displays race schedule information', () => {
    const wrapper = mount(RaceSchedule, {
      props: {
        raceSchedule: mockRaceSchedule,
        horseMap: mockHorseMap,
        loading: false,
      },
    })

    // Check race info is displayed
    expect(wrapper.text()).toContain('Test Race')
    expect(wrapper.text()).toContain('5/29/2025')

    // Check rounds are displayed
    const roundTitles = wrapper.findAll('p.text-xl')
    expect(roundTitles).toHaveLength(2)
    expect(roundTitles[0].text()).toContain('Round 1 1200m')
    expect(roundTitles[1].text()).toContain('Round 2 1400m')

    // Check participants
    const participantRows = wrapper.findAll('div.grid')
    expect(participantRows).toHaveLength(4) // 2 rounds × 2 participants each

    // Check first round participants
    expect(participantRows[0].text()).toContain('1')
    expect(participantRows[0].text()).toContain('At')
    expect(participantRows[1].text()).toContain('2')
    expect(participantRows[1].text()).toContain('Eşek')

    // Check second round participants (order is reversed)
    expect(participantRows[2].text()).toContain('1')
    expect(participantRows[2].text()).toContain('Eşek')
    expect(participantRows[3].text()).toContain('2')
    expect(participantRows[3].text()).toContain('At')
  })

  it('handles empty schedule', () => {
    const wrapper = mount(RaceSchedule, {
      props: {
        raceSchedule: { id: '', name: '', date: new Date(), rounds: [] },
        loading: false,
      },
    })

    expect(wrapper.text()).not.toContain('Round')
    expect(wrapper.findAll('div.grid')).toHaveLength(0)
  })
})
