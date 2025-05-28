export const getters = {
  getHorses(state: HorsesState) {
    return state.horses
  },
  getHorsesLoading(state: HorsesState) {
    return state.isLoading
  },
}
