import type { Commit } from 'vuex'
import { resultApi } from '@/api/resultApi'
export const actions = {
  async fetchResults({ commit }: { commit: Commit }) {
    const response = await resultApi.fetchRaceResult()
    commit('setRaceResult', response)
  },
  async startRound({ commit }: { commit: Commit }, roundId: number) {
    const response = await resultApi.fetchRoundResult(roundId)
    commit('setRoundResult', response)
  },
  setNextRound({ commit }: { commit: Commit }, roundId: number) {
    commit('setNextRound', roundId)
  },
}
