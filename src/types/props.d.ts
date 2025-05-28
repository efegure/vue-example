export interface HorseListProps {
  horses: Horse[]
  loading: boolean
}

export interface HorseRacerProps {
  horse?: Horse
  winningOrderIds: number[]
}

export interface RaceScheduleProps {
  raceSchedule?: RaceSchedule
  horseMap?: Map<number, Horse>
  loading?: boolean
}

export interface RaceTrackProps {
  horseMap?: Map<number, Horse>
  raceSchedule?: RaceSchedule
  round?: RaceRound
  roundResult?: RoundResult
  loading?: boolean
}

export interface RaceResultsProps {
  horseMap?: Map<number, Horse>
  raceResult?: RaceResult
  raceSchedule?: RaceSchedule
  loading?: boolean
}

export interface RaceControlsProps {
  currentRound?: number
  raceSchedule?: RaceSchedule
  roundResult?: RoundResult
  loading?: boolean
}
