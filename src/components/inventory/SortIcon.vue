<template>
  <span class="inline-flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-3 w-3"
      :class="{
        'text-gray-400': !active,
        'text-gray-700': active,
      }"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        v-if="direction === 'asc'"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 15l7-7 7 7"
      />
      <path
        v-else
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </span>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: 'asc',
  },
})
</script>
