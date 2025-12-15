<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <div class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      <div class="flex-1">
        <input
          type="text"
          placeholder="Search categories..."
          :value="props.searchTerm"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          @input="updateSearchTerm"
        />
      </div>

      <div class="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <RouterLink
          to="/inventory"
          class="w-full md:w-auto bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <ArchiveBoxIcon class="w-5 h-5" />
          Back to Inventory
        </RouterLink>
        <button
          @click="updateIsFormOpen"
          class="w-full md:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <PlusIcon class="w-5 h-5" />
          Add Category
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ArchiveBoxIcon, PlusIcon } from '@heroicons/vue/24/solid'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  searchTerm: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:open-form', 'update:searchTerm'])

const updateIsFormOpen = () => {
  emit('update:open-form')
}

const updateSearchTerm = (event) => {
  const value = event.target.value
  emit('update:searchTerm', value)
}
</script>
