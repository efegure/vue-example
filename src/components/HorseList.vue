<script setup lang="ts">
import type { HorseListProps } from '@/types'

const { horses = [], loading = false } = defineProps<HorseListProps>()
</script>

<template>
  <div data-testid="horse-list" class="p-4 gap-2 flex flex-col xl:h-full xl:overflow-y-auto">
    <h2 class="text-xl font-bold">Horse List</h2>
    <div v-show="!loading" class="flex flex-col">
      <div
        class="grid grid-cols-12 gap-2 border border-gray-200 p-2"
        v-for="horse in horses"
        :key="horse.number"
      >
        <span class="col-span-1">{{ horse.number }}</span>
        <span class="col-span-5">{{ horse.name }}</span>
        <span class="col-span-2">{{ horse.condition }}</span>
        <span class="col-span-2">{{ horse.color }}</span>
      </div>
    </div>
    <div v-show="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>
