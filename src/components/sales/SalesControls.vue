<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <div class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      <div class="flex-1">
        <input
          type="text"
          placeholder="Search sales..."
          :value="props.searchTerm"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          @input="updateSearchTerm"
        />
      </div>
      <div class="flex gap-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  searchTerm: { type: String, required: true }
})
const emit = defineEmits(['update:searchTerm'])
const updateSearchTerm = (e) => emit('update:searchTerm', e.target.value)
</script>