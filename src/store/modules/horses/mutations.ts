import type { Horse } from '@/types'

export const mutations = {
  setHorses(state: HorsesState, horses: Horse[]) {
    state.horses = horses
  },
  setLoading(state: HorsesState, isLoading: boolean) {
    state.isLoading = isLoading
  },
}
