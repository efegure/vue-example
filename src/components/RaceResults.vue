<script setup lang="ts">
import type { Horse, RaceResultsProps } from '@/types'

const {
  raceSchedule = { name: '', date: '', rounds: [] },
  raceResult = { roundResults: [] },
  horseMap = new Map<number, Horse>(),
  loading = false,
} = defineProps<RaceResultsProps>()
</script>

<template>
  <div data-testid="race-results" class="p-4 gap-2 flex flex-col xl:h-full xl:overflow-y-auto">
    <h2 class="text-xl font-bold">Race Results</h2>
    <div v-show="!loading" class="flex flex-row gap-2 items-center">
      <p class="text-lg font-semibold text-green-600">{{ raceSchedule?.name }}</p>
      <p class="text-lg font-semibold">-</p>
      <p class="text-lg font-semibold text-gray-600">
        {{ new Date(raceSchedule?.date).toLocaleDateString() }}
      </p>
    </div>
    <div v-show="!loading" class="gap-2 flex flex-col">
      <div
        class="gap-2 flex flex-col"
        v-for="(roundResult, index) in raceResult.roundResults"
        :key="index"
      >
        <p class="text-xl font-semibold">Round {{ index + 1 }} {{ roundResult.length }}m</p>
        <div class="flex flex-col col-span-1">
          <span class="text-lg font-semibold">Results</span>
          <div
            class="grid grid-cols-12 gap-2 border border-gray-200 p-1"
            v-for="(horseId, index) in roundResult?.winningOrderIds"
            :key="horseId"
          >
            <span class="col-span-2">{{ index + 1 }}</span>
            <span class="col-span-10">{{ horseMap.get(horseId)?.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <p v-show="loading">Loading...</p>
  </div>
</template>
