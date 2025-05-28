import type { Commit } from 'vuex'
import { raceApi } from '@/api/raceApi'

export const actions = {
  async fetchRaceSchedule({ commit }: { commit: Commit }) {
    try {
      commit('setLoading', true)
      const response = await raceApi.fetchRaceSchedule()
      commit('setRaceSchedule', response)
    } catch (error) {
      commit('setError', error)
    } finally {
      commit('setLoading', false)
    }
  },
}
