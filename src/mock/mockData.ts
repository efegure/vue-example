import { shuffle } from '@/utils/shuffle'
import { faker } from '@faker-js/faker'
import { UniqueEnforcer } from 'enforce-unique'

const uniqueEnforcerNumber = new UniqueEnforcer()
const uniqueEnforcerColor = new UniqueEnforcer()

// we are mocking a db for consistency between schedule and results
const mockDb: {
  horses: Horse[]
  raceSchedule: RaceSchedule
  raceResult: RaceResult
  colors: string[]
} = {
  horses: [],
  raceSchedule: {
    id: '',
    name: '',
    date: new Date(),
    rounds: [],
  },
  raceResult: {
    id: '',
    roundResults: [],
  },
  colors: [],
}

// creates unique array of participantIds to decide race participants randomly
const participantIds = () => {
  uniqueEnforcerNumber.reset()
  return Array.from({ length: 10 }).map(() => {
    // this guarantees unique numbers
    return uniqueEnforcerNumber.enforce(() => {
      return faker.number.int({
        min: 1,
        max: 20,
      })
    })
  })
}

// creates unique array of colors
const getColors = () => {
  uniqueEnforcerColor.reset()
  mockDb.colors = Array.from({ length: 20 }).map(() => {
    // this guarantees unique colors
    return uniqueEnforcerColor.enforce(() => {
      return faker.color.human()
    })
  })
}

const ROUND_LENGTH = [1200, 1400, 1600, 1800, 2000, 2200]

// creates unique array of horses
export const mockHorses: () => Horse[] = () => {
  getColors()
  mockDb.horses = Array.from({ length: 20 }).map((_, i) => ({
    number: i + 1,
    name: faker.animal.horse(),
    condition: faker.number.int({ min: 1, max: 100 }),
    color: mockDb.colors[i],
    jockey: faker.person.firstName(),
  }))
  return JSON.parse(JSON.stringify(mockDb.horses))
}

// creates unique race schedule
export const mockRaceSchedule: () => RaceSchedule = () => {
  mockDb.raceSchedule = {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    date: faker.date.past(),
    rounds: Array.from({ length: 6 }).map((_, i) => ({
      length: ROUND_LENGTH[i],
      participantIds: participantIds(),
      result: null,
    })),
  }

  return JSON.parse(JSON.stringify(mockDb.raceSchedule))
}

// creates unique race result
export const mockRaceResult: () => RaceResult = () => {
  mockDb.raceResult = {
    id: faker.string.uuid(),
    roundResults: [],
  }
  return JSON.parse(JSON.stringify(mockDb.raceResult))
}

// creates unique round result using the existing race schedule
export const mockRoundResult = (roundId: number) => {
  const round = mockDb.raceSchedule.rounds[roundId]
  // we are shuffling the participantIds to simulate random winners and losers
  const shuffledParticipantIds = shuffle([...round.participantIds])
  mockDb.raceResult.roundResults.push({
    length: round.length,
    winningOrderIds: shuffledParticipantIds,
  })
  return JSON.parse(JSON.stringify(mockDb.raceResult))
}
