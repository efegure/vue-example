type Horse = {
  number: number
  name: string
  condition: number
  color: string
}
type RaceSchedule = {
  id: string
  name: string
  date: Date
  rounds: RaceRound[]
}

type RaceRound = {
  length: number
  participantIds: number[]
}

type RaceResult = {
  id: string
  roundResults: RoundResult[]
}

type RoundResult = {
  length: number
  winningOrderIds: number[]
}
