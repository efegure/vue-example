import { delay } from '@/utils/delay'
import { mockRaceSchedule } from '../mock/mockData'
import type { RaceSchedule } from '@/types'
export const raceApi = {
  fetchRaceSchedule: async (): Promise<RaceSchedule> => {
    await delay(1000)
    const data = mockRaceSchedule()
    return data
  },
}
