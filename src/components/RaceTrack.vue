<script setup lang="ts">
import type { Horse, RaceTrackProps } from '@/types'
import HorseRacer from './HorseRacer.vue'

const {
  horseMap = new Map<number, Horse>(),
  raceSchedule = { name: '', date: '', rounds: [] },
  round = { length: 0, participantIds: [] },
  roundResult = { winningOrderIds: [] },
  loading = false,
} = defineProps<RaceTrackProps>()
</script>

<template>
  <div class="p-4 gap-2 flex flex-col xl:h-full xl:overflow-y-auto">
    <h2 class="text-xl font-bold">Race Track</h2>
    <div v-show="!loading" class="flex flex-col h-full">
      <div class="flex flex-row gap-2">
        <span class="text-lg font-semibold text-green-600">{{ raceSchedule?.name }}</span>
        <span class="text-lg font-semibold">-</span>
        <span class="text-lg font-semibold text-gray-600">
          {{ new Date(raceSchedule?.date).toLocaleDateString() }}
        </span>
        <span class="text-lg font-semibold text-gray-600">{{ round?.length }}m</span>
      </div>

      <div class="flex flex-col h-full gap-2">
        <div class="flex flex-row justify-between">
          <p class="bg-green-200 p-2 font-semibold">Start</p>
          <p class="bg-gray-200 p-2 font-semibold">Finish</p>
        </div>
        <div v-for="(horseId, index) in round?.participantIds" :key="horseId">
          <div class="flex flex-row border border-gray-200">
            <span class="bg-green-200 p-2 w-[36px] text-center content-center font-semibold">{{
              index + 1
            }}</span>
            <div class="flex flex-col relative h-[64px] w-full">
              <HorseRacer
                :horse="horseMap.get(horseId)"
                :winningOrderIds="roundResult?.winningOrderIds"
              />
            </div>
            <span class="bg-gray-200 p-2 w-[36px]"></span>
          </div>
        </div>
      </div>
    </div>
    <p v-show="loading">Loading...</p>
  </div>
</template>
