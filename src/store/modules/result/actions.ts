import type { Commit } from 'vuex'
import { resultApi } from '@/api/resultApi'
export const actions = {
  async fetchResults({ commit }: { commit: Commit }) {
    try {
      commit('setLoading', true)
      const response = await resultApi.fetchRaceResult()
      commit('setRaceResult', response)
    } catch (error) {
      commit('setError', error)
    } finally {
      commit('setLoading', false)
    }
  },
  async startRound({ commit }: { commit: Commit }, roundId: number) {
    try {
      commit('setIsRoundLoading', true)
      const response = await resultApi.fetchRoundResult(roundId)
      commit('setRoundResult', response)
    } catch (error) {
      commit('setError', error)
    } finally {
      commit('setIsRoundLoading', false)
    }
  },
  setNextRound({ commit }: { commit: Commit }, roundId: number) {
    commit('setNextRound', roundId)
  },
}
