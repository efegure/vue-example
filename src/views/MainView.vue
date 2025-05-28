<template>
  <div class="xl:h-screen flex flex-col">
    <header class="bg-gray-200 p-4">
      <nav class="flex gap-4 justify-between">
        <h1 class="text-2xl font-bold">Horse Racing</h1>
        <RaceControls
          :currentRound="currentRound"
          :raceSchedule="raceSchedule"
          :roundResult="roundResult"
          @startRound="handleStartRound"
          @nextRound="handleNextRound"
          @nextRace="handleNextRace"
        />
      </nav>
    </header>
    <main class="grid grid-cols-12 gap-4 h-full overflow-y-auto flex flex-grow">
      <HorseList
        class="xl:col-span-2 lg:col-span-4 col-span-12"
        :horses="horses"
        :loading="getters.getHorsesLoading"
      />
      <RaceTrack
        :horseMap="horseMap"
        :raceSchedule="raceSchedule"
        :round="round"
        :roundResult="roundResult"
        class="xl:col-span-6 lg:col-span-8 col-span-12"
      />
      <RaceSchedule
        :horseMap="horseMap"
        :raceSchedule="raceSchedule"
        class="xl:col-span-2 lg:col-span-4 col-span-12"
      />
      <RaceResults
        :horseMap="horseMap"
        :raceResult="raceResult"
        :raceSchedule="raceSchedule"
        class="xl:col-span-2 lg:col-span-4 col-span-12"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { HorseList, RaceTrack, RaceSchedule, RaceResults, RaceControls } from '../components'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { onMounted } from 'vue'

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
