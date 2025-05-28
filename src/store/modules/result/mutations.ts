export const mutations = {
  setRoundResult(state: ResultState, raceResult: RaceResult) {
    state.raceResult.roundResults.push(raceResult.roundResults[raceResult.roundResults.length - 1])
  },
  setRaceResult(state: ResultState, raceResult: RaceResult) {
    state.raceResult = raceResult
    state.currentRound = 0
  },
  setNextRound(state: ResultState, round: number) {
    state.currentRound = round
  },
  setLoading(state: ResultState, isLoading: boolean) {
    state.isLoading = isLoading
  },
}
