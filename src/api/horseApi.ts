import { delay } from '@/utils/delay'
import { mockHorses } from '../mock/mockData'

export const horseApi = {
  fetchHorses: async (): Promise<Horse[]> => {
    // Simulate API delay
    await delay(1000)
    return mockHorses()
  },
}
