<script setup lang="ts">
const {
  raceSchedule = { name: '', date: '', rounds: [] },
  horseMap = new Map<number, Horse>(),
  loading = false,
} = defineProps<{
  raceSchedule: RaceSchedule
  horseMap: Map<number, Horse>
  loading: boolean
}>()
</script>

<template>
  <div class="p-4 gap-2 flex flex-col xl:h-full xl:overflow-y-auto">
    <h2 class="text-xl font-bold">Race Program</h2>
    <div v-show="!loading" class="flex flex-row gap-2 items-center">
      <p class="text-lg font-semibold text-green-600">{{ raceSchedule?.name }}</p>
      <p class="text-lg font-semibold">-</p>
      <p class="text-lg font-semibold text-gray-600">
        {{ new Date(raceSchedule?.date).toLocaleDateString() }}
      </p>
    </div>
    <div v-show="!loading" class="gap-2 flex flex-col">
      <div class="gap-2 flex flex-col" v-for="(round, index) in raceSchedule?.rounds" :key="index">
        <p class="text-xl font-semibold">Round {{ index + 1 }} {{ round.length }}m</p>
        <div class="flex flex-col col-span-1">
          <span class="text-lg font-semibold">Participants</span>
          <div
            class="grid grid-cols-12 gap-2 border border-gray-200 p-1"
            v-for="(horseId, index) in round.participantIds"
            :key="horseId"
          >
            <span class="col-span-2">{{ index + 1 }}</span>
            <span class="col-span-9">{{ horseMap.get(horseId)?.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <p v-show="loading">Loading...</p>
  </div>
</template>
