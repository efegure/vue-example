import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RaceTrack from '../RaceTrack.vue'

describe('RaceTrack.vue', () => {
  const mockHorseMap = new Map([
    [1, { number: 1, name: 'At', condition: 85, color: 'brown' }],
    [2, { number: 2, name: 'Eşek', condition: 90, color: 'black' }],
  ])

  const mockRaceSchedule = {
    id: '1',
    name: 'Test Race',
    date: new Date('2025-05-29'),
    rounds: [{ length: 1000, participantIds: [1, 2] }],
  }

  it('displays loading', () => {
    const wrapper = mount(RaceTrack, {
      props: { loading: true },
    })

    const loadingP = wrapper.findAll('p').at(2)
    expect(loadingP?.exists()).toBe(true)
    expect(loadingP?.text()).toContain('Loading...')
    expect(loadingP?.isVisible()).toBe(true)
  })

  it('displays race track with horses at start', () => {
    const wrapper = mount(RaceTrack, {
      props: {
        horseMap: mockHorseMap,
        raceSchedule: mockRaceSchedule,
        round: { length: 1000, participantIds: [1, 2] },
        loading: false,
      },
    })

    // checks race info is displayed
    expect(wrapper.text()).toContain('Test Race')
    expect(wrapper.text()).toContain('5/29/2025')
    expect(wrapper.text()).toContain('1000m')

    // checks start and finish markers
    expect(wrapper.text()).toContain('Start')
    expect(wrapper.text()).toContain('Finish')

    // Check horse racers are rendered
    const horseRacers = wrapper.findAll('.flex.flex-row.border')
    expect(horseRacers).toHaveLength(2)

    // checks starting position
    const horseElements = wrapper.findAll('.absolute')
    expect(horseElements).toHaveLength(2)
    horseElements.forEach((element) => {
      const style = element.attributes('style')
      expect(style).toContain('right: calc(100% - 100px)')
    })
  })

  it('displays horses at finish line when results', () => {
    const wrapper = mount(RaceTrack, {
      props: {
        horseMap: mockHorseMap,
        raceSchedule: mockRaceSchedule,
        round: { length: 1200, participantIds: [1, 2] },
        roundResult: {
          length: 1200,
          winningOrderIds: [2, 1],
        },
        loading: false,
      },
    })

    // checks horse position
    const horseElements = wrapper.findAll('.absolute')
    expect(horseElements).toHaveLength(2)

    // checks winner places
    const firstHorse = horseElements[0]
    expect(firstHorse.attributes('style')).toContain('right: 0%')
    expect(firstHorse.attributes('style')).toContain('transition: right 2s ease-in-out')

    const secondHorse = horseElements[1]
    expect(secondHorse.attributes('style')).toContain('right: -5%')
    expect(secondHorse.attributes('style')).toContain('transition: right 2s ease-in-out')
  })

  it('handles empty race', () => {
    const wrapper = mount(RaceTrack, {
      props: {
        horseMap: new Map(),
        raceSchedule: { id: '', name: '', date: new Date(), rounds: [] },
        round: { length: 0, participantIds: [] },
        loading: false,
      },
    })

    expect(wrapper.findAll('.absolute')).toHaveLength(0)
  })
})
