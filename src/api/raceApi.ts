import { delay } from '@/utils/delay'
import { mockRaceSchedule } from '../mock/mockData'
export const raceApi = {
  fetchRaceSchedule: async () => {
    await delay(1000)
    const data = mockRaceSchedule()
    return data
  },
}
