<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-4">Confirm Delete Category</h3>
      <p class="text-gray-600 mb-6">
        {{ props.text }}
      </p>
      <div class="flex gap-4">
        <button
          @click="emit('confirm-delete')"
          class="flex-1 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
        >
          Delete
        </button>
        <button
          @click="emit('cancel-delete')"
          class="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['confirm-delete', 'cancel-delete'])
</script>
