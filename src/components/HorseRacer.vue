<script setup lang="ts">
import type { HorseRacerProps } from '@/types'

const { horse, winningOrderIds } = defineProps<HorseRacerProps>()
</script>

<template>
  <div
    data-testid="horse-racer"
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
