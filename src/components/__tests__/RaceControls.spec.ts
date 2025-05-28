import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RaceControls from '../RaceControls.vue'

describe('RaceControls.vue', () => {
  const mockRaceSchedule = {
    id: '1',
    name: 'Test Race',
    date: new Date('2025-05-29'),
    rounds: [
      { length: 1000, participantIds: [1, 2, 3] },
      { length: 2000, participantIds: [1, 2, 3] },
    ],
  }

  it('emits startRound event when start button is clicked', async () => {
    const wrapper = mount(RaceControls, {
      props: {
        currentRound: 0,
        raceSchedule: mockRaceSchedule,
        loading: false,
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('startRound')).toBeTruthy()
    expect(wrapper.emitted('startRound')?.[0]).toEqual([0])
  })

  it('shows next round button when not max', () => {
    const wrapper = mount(RaceControls, {
      props: {
        currentRound: 0,
        raceSchedule: mockRaceSchedule,
        roundResult: { length: 1200, winningOrderIds: [1, 2, 3] },
        loading: false,
      },
    })

    const nextRoundBtn = wrapper.find('button')
    expect(nextRoundBtn.exists()).toBe(true)
    expect(nextRoundBtn.text()).toContain('Next Round')
  })

  it('emits nextRound event when next round button is clicked', async () => {
    const wrapper = mount(RaceControls, {
      props: {
        currentRound: 0,
        raceSchedule: mockRaceSchedule,
        roundResult: { length: 1200, winningOrderIds: [1, 2, 3] },
        loading: false,
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('nextRound')).toBeTruthy()
    expect(wrapper.emitted('nextRound')?.[0]).toEqual([1])
  })

  it('shows loading text when loading is true', () => {
    const wrapper = mount(RaceControls, {
      props: {
        currentRound: 0,
        raceSchedule: mockRaceSchedule,
        loading: true,
      },
    })

    expect(wrapper.text()).toContain('Horses are running...')
  })
})
