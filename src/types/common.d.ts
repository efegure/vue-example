export type Horse = {
  number: number
  name: string
  condition: number
  color: string
}

export type RaceSchedule = {
  id: string
  name: string
  date: Date
  rounds: RaceRound[]
}

export type RaceRound = {
  length: number
  participantIds: number[]
}

export type RaceResult = {
  id: string
  roundResults: RoundResult[]
}

export type RoundResult = {
  length: number
  winningOrderIds: number[]
}
