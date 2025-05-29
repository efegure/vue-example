<script setup lang="ts">
import type { RaceControlsProps } from '@/types'

const {
  currentRound = 0,
  raceSchedule = { name: '', date: '', rounds: [] },
  roundResult = { winningOrderIds: [] },
  loading = false,
} = defineProps<RaceControlsProps>()

const emit = defineEmits<{
  startRound: [id: number] // named tuple syntax
  nextRound: [id: number]
  nextRace: []
}>()

const startRace = () => {
  emit('startRound', currentRound)
}

const nextRound = () => {
  if (currentRound < raceSchedule.rounds.length - 1) {
    emit('nextRound', currentRound + 1)
  }
}
const nextRace = () => {
  emit('nextRace')
}
</script>

<template>
  <div data-testid="race-controls" class="flex flex-row gap-2 items-center justify-end">
    <p class="text-lg font-semibold text-gray-600" v-show="loading">Horses are running...</p>
    <button
      v-if="!roundResult?.winningOrderIds?.length"
      class="bg-green-600 text-white p-2 cursor-pointer font-bold"
      @click="startRace"
    >
      Start Round {{ currentRound + 1 }}/{{ raceSchedule?.rounds?.length }}
    </button>
    <button
      v-if="
        currentRound < raceSchedule?.rounds.length - 1 && roundResult?.winningOrderIds?.length > 0
      "
      class="bg-green-600 text-white p-2 cursor-pointer font-bold"
      @click="nextRound"
    >
      Next Round
    </button>
    <!-- <span class="text-lg font-semibold text-gray-600"
      >{{ currentRound + 1 }}/{{ raceSchedule?.rounds?.length }}</span
    > -->
    <span
      class="text-lg font-semibold text-red-600"
      v-if="
        currentRound === raceSchedule?.rounds?.length - 1 &&
        roundResult?.winningOrderIds?.length > 0
      "
      >Race Finished</span
    >
    <button @click="nextRace" class="bg-green-600 text-white p-2 cursor-pointer font-bold">
      Next Race
    </button>
  </div>
</template>
