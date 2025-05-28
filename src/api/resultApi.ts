import { delay } from '@/utils/delay'
import { mockRaceResult, mockRoundResult } from '../mock/mockData'
export const resultApi = {
  fetchRoundResult: async (roundId: number) => {
    await delay(1000)
    const data = mockRoundResult(roundId)
    return data
  },
  fetchRaceResult: async () => {
    await delay(1000)
    const data = mockRaceResult()
    return data
  },
}
