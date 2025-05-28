<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-col h-full">
      <header class="bg-gray-200 p-4 flex flex-row">
        <nav class="flex gap-4 justify-between w-full">
          <h1 class="text-2xl font-bold">Horse Racing</h1>
          <RaceControls
            :currentRound="currentRound"
            :raceSchedule="raceSchedule"
            :roundResult="roundResult"
            :loading="getters.getIsRoundLoading"
            @startRound="handleStartRound"
            @nextRound="handleNextRound"
            @nextRace="handleNextRace"
          />
        </nav>
      </header>

      <main class="grid grid-cols-12 gap-4 h-full overflow-y-auto">
        <HorseList
          class="xl:col-span-3 lg:col-span-4 col-span-12"
          :horses="horses"
          :loading="getters.getHorsesLoading"
        />
        <RaceTrack
          :horseMap="horseMap"
          :raceSchedule="raceSchedule"
          :round="round"
          :roundResult="roundResult"
          :loading="getters.getResultsLoading && getters.getHorsesLoading"
          class="xl:col-span-5 lg:col-span-8 col-span-12"
        />
        <RaceSchedule
          :horseMap="horseMap"
          :raceSchedule="raceSchedule"
          :loading="getters.getRaceIsLoading"
          class="xl:col-span-2 lg:col-span-4 col-span-12"
        />
        <RaceResults
          :horseMap="horseMap"
          :raceResult="raceResult"
          :raceSchedule="raceSchedule"
          :loading="getters.getResultsLoading"
          class="xl:col-span-2 lg:col-span-4 col-span-12"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HorseList, RaceTrack, RaceSchedule, RaceResults, RaceControls } from '../components'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { onMounted } from 'vue'
import type { Horse } from '@/types'

const { dispatch, getters } = useStore()

const raceSchedule = computed(() => getters.getRaceSchedule)
const horses = computed(() => getters.getHorses)
const raceResult = computed(() => getters.getRaceResult)
const currentRound = computed(() => getters.getCurrentRound)

const round = computed(() => raceSchedule.value?.rounds[currentRound.value])
const roundResult = computed(() => raceResult.value?.roundResults[currentRound.value])

const horseMap = computed(() => {
  const map = new Map<number, Horse>()
  horses.value.forEach((horse: Horse) => {
    map.set(horse.number, horse)
  })
  return map
})

onMounted(() => {
  handleNextRace()
})

const handleNextRace = () => {
  dispatch('fetchRaceSchedule')
  dispatch('fetchHorses')
  dispatch('fetchResults')
}

const handleStartRound = (roundId: number) => {
  dispatch('startRound', roundId)
}
const handleNextRound = (roundId: number) => {
  dispatch('setNextRound', roundId)
}
</script>
