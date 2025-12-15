<template>
  <span v-if="active" class="inline-block ml-1">
    <ChevronUpIcon v-if="direction === 'asc'" class="w-4 h-4 text-gray-700 inline" />
    <ChevronDownIcon v-else class="w-4 h-4 text-gray-700 inline" />
  </span>
  <span v-else class="inline-block ml-1 opacity-30">
    <ChevronUpDownIcon class="w-4 h-4 text-gray-500 inline" />
  </span>
</template>

<script setup>
import { ChevronUpIcon, ChevronDownIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'

defineProps({
  active: Boolean,
  direction: String,
})
</script>
