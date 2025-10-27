<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="p-12 text-center" v-if="props.categories.length === 0">
      <svg
        class="w-16 h-16 text-gray-400 mx-auto mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <p class="text-gray-500 text-lg">No categories found</p>
      <p class="text-gray-400 mt-2">Add your first category to get started</p>
    </div>
    <div class="overflow-x-auto" v-else>
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th
              @click="sort('name')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              <div class="flex items-center space-x-1">
                <span>Category Name</span>
                <SortIcon :active="sortBy === 'name'" :direction="sortDirection" />
              </div>
            </th>
            <th
              @click="sort('description')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              <div class="flex items-center space-x-1">
                <span>Description</span>
                <SortIcon :active="sortBy === 'description'" :direction="sortDirection" />
              </div>
            </th>
            <th
              @click="sort('itemCount')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              <div class="flex items-center space-x-1">
                <span>Items Count</span>
                <SortIcon :active="sortBy === 'itemCount'" :direction="sortDirection" />
              </div>
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr class="hover:bg-gray-50" v-for="category in sortedCategories" :key="category.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ category.name }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-500">{{ category.description }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <span
                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
              >
                {{ category.itemCount || 0 }} items
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="emitEditCategory(category)"
                class="text-indigo-600 hover:text-indigo-900 mr-4"
              >
                Edit
              </button>
              <button
                @click="emitDeleteCategoryConfirm(true, category.id, category.name)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SortIcon from '../inventory/SortIcon.vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['handle-edit-category', 'handle-delete-category-confirm'])

const sortBy = ref('name')
const sortDirection = ref('asc')

const sort = (column) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortDirection.value = 'asc'
  }
}

const sortedCategories = computed(() => {
  return [...props.categories].sort((a, b) => {
    let compareA = a[sortBy.value]
    let compareB = b[sortBy.value]

    // Convert to numbers for numeric comparisons
    if (sortBy.value === 'itemCount') {
      compareA = Number(compareA || 0)
      compareB = Number(compareB || 0)
    }

    if (sortDirection.value === 'asc') {
      return compareA > compareB ? 1 : -1
    } else {
      return compareA < compareB ? 1 : -1
    }
  })
})

const emitEditCategory = (category) => {
  emit('handle-edit-category', category)
}

const emitDeleteCategoryConfirm = (show, id, name) => {
  emit('handle-delete-category-confirm', show, id, name)
}
</script>
