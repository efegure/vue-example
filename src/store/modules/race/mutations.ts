export const mutations = {
  setRaceSchedule(state: RaceState, raceSchedule: RaceSchedule) {
    state.raceSchedule = raceSchedule
  },
  setLoading(state: RaceState, isLoading: boolean) {
    state.isLoading = isLoading
  },
}
