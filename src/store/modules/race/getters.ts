import type { RaceState } from '@/types'

export const getters = {
  getRaceSchedule(state: RaceState) {
    return state.raceSchedule
  },
  getRaceIsLoading(state: RaceState) {
    return state.isLoading
  },
}
