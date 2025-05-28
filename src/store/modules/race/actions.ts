import type { Commit } from 'vuex'
import { raceApi } from '@/api/raceApi'

export const actions = {
  async fetchRaceSchedule({ commit }: { commit: Commit }) {
    const response = await raceApi.fetchRaceSchedule()
    commit('setRaceSchedule', response)
  },
}
