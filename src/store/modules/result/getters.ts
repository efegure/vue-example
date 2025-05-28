export const getters = {
  getRaceResult(state: ResultState) {
    return state.raceResult
  },
  getCurrentRound(state: ResultState) {
    return state.currentRound
  },
  getResultsLoading(state: ResultState) {
    return state.isLoading
  },
}
