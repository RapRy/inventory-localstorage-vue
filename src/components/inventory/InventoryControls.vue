<template lang="">
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <div class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      <div class="flex-1 flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <!-- search -->
        <div class="flex-1">
          <input
            type="text"
            placeholder="Search items..."
            :value="props.searchTerm"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            @input="updateSearchTerm"
          />
        </div>
        <!-- search end -->

        <!-- category filter -->
        <div>
          <select
            :value="props.filterCategory"
            @change="updateFilterCategory"
            class="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Categories</option>
            <option v-for="category in props.categories" :key="category.id" :value="category.name">
              {{ category.name }}
            </option>
          </select>
        </div>
        <!-- category filter end -->
      </div>

      <!-- action buttons -->
      <div class="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <button
          @click="null"
          class="w-full md:w-auto bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          View Sales
        </button>
        <RouterLink
          to="/categories"
          class="w-full md:w-auto bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          Manage Categories
        </RouterLink>
        <button
          @click="updateIsFormOpen"
          class="w-full md:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Item
        </button>
      </div>
      <!-- action buttons end -->
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  searchTerm: {
    type: String,
    required: true,
  },
  filterCategory: {
    type: String,
    default: 'all',
  },
})
const emit = defineEmits(['update:open-form', 'update:searchTerm', 'update:filterCategory'])

const updateIsFormOpen = () => {
  emit('update:open-form')
}
const updateSearchTerm = (event) => {
  const value = event.target.value
  emit('update:searchTerm', value)
}
const updateFilterCategory = (event) => {
  const value = event.target.value
  emit('update:filterCategory', value)
}
</script>
