<script setup lang="ts">
const { horse, winningOrderIds } = defineProps<{ horse?: Horse; winningOrderIds: number[] }>()
</script>

<template>
  <div
    v-if="horse"
    class="absolute top-0 w-[100px] flex flex-col items-start"
    :style="{
      transition: winningOrderIds.length > 0 ? 'right 2s ease-in-out' : '',
      right:
        winningOrderIds.length > 0
          ? `${(winningOrderIds.indexOf(horse.number) - 1) * 5}%`
          : 'calc(100% - 100px)',
    }"
  >
    <img class="w-[48px]" src="@/assets/horse-black-silhouette-svgrepo-com.svg" alt="" />
    <span class="text-xs">{{ horse.name }}</span>
  </div>
</template>
