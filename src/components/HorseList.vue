<script setup lang="ts">
const { horses = [], loading = false } = defineProps<{
  horses: Horse[]
  loading: boolean
}>()
</script>

<template>
  <div class="p-4 gap-2 flex flex-col h-full overflow-y-auto">
    <h2 class="text-xl font-bold">Horse List</h2>
    <div v-show="!loading" class="flex flex-col">
      <div
        class="grid grid-cols-12 gap-2 border border-gray-200 p-2"
        v-for="horse in horses"
        :key="horse.number"
      >
        <span class="col-span-1">{{ horse.number }}</span>
        <span class="col-span-4">{{ horse.name }}</span>
        <span class="col-span-2">{{ horse.condition }}</span>
        <span class="col-span-3">{{ horse.color }}</span>
      </div>
    </div>
    <div v-show="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>
