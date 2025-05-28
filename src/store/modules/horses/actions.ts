import { horseApi } from '@/api/horseApi'
import type { Commit } from 'vuex'

export const actions = {
  async fetchHorses({ commit }: { commit: Commit }) {
    try {
      commit('setLoading', true)
      const response = await horseApi.fetchHorses()
      commit('setHorses', response)
    } catch (error) {
      commit('setError', error)
    } finally {
      commit('setLoading', false)
    }
  },
}
