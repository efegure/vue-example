export type ResultState = {
  raceResult: RaceResult
  currentRound: number
  isLoading: boolean
  isRoundLoading: boolean
}

export type RaceState = {
  raceSchedule?: RaceSchedule
  isLoading: boolean
  error: string | null
}

export type HorsesState = {
  horses?: Horse[]
  isLoading: boolean
}
