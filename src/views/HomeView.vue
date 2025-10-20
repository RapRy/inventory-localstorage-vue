<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Inventory Management System</h1>
            <p class="text-gray-600">Manage your inventory with local storage persistence</p>
          </div>
        </div>
      </div>
      <!-- end header -->

      <!-- statistic cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Total Items</p>
              <p class="text-3xl font-bold text-gray-900">{{ items.length }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Total Quantity</p>
              <p class="text-3xl font-bold text-gray-900">{{ totalItems }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Total Value</p>
              <p class="text-3xl font-bold text-gray-900">{{ totalValue.toFixed(2) }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Low Stock</p>
              <p class="text-3xl font-bold text-gray-900">{{ lowStockItems }}</p>
            </div>
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg
                class="w-6 h-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <!-- end statistic -->

      <!-- controls -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div class="flex-1 flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <!-- search -->
            <div class="flex-1">
              <input
                type="text"
                placeholder="Search items..."
                v-model="searchTerm"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <!-- search end -->

            <!-- category filter -->
            <div>
              <select
                v-model="filterCategory"
                class="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Categories</option>
                <option v-for="category in categories" :key="category.id" :value="category.name">
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
            <button
              @click="null"
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
            </button>
            <button
              @click="isFormOpen = true"
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
      <!-- end controls -->

      <!-- table of items will go here -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-12 text-center" v-if="filteredItems.length === 0">
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
          <p class="text-gray-500 text-lg">No items found</p>
          <p class="text-gray-400 mt-2">Add your first item to get started</p>
        </div>
        <div class="overflow-x-auto" v-else>
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Item Name
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Value
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr class="hover:bg-gray-50" v-for="item in filteredItems" :key="item.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                    <div class="text-sm text-gray-500" v-if="item.description">
                      {{ item.description }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800"
                  >
                    {{ item.category }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="{
                      'item.quantity < 10': 'text-red-600',
                      'item.quantity > 10': 'text-gray-900',
                    }"
                  >
                    {{ item.quantity }}
                    <span class="ml-1 text-xs" v-if="item.quantity < 10">(Low)</span>
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.price.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ (item.quantity * item.price).toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="null" class="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                  </button>
                  <button @click="null" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- add or edit item form modal -->
      <ItemForm
        v-if="isFormOpen"
        :editing-item="editingItem"
        :categories="categories"
        :isFormOpen="isFormOpen"
        @close-form="isFormOpen = false"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import ItemForm from '@/components/ItemForm.vue'

const items = ref([])
const categories = ref([])
const isFormOpen = ref(false)
const editingItem = ref(null)
const searchTerm = ref('')
const filterCategory = ref('all')
const deleteConfirm = ref(null)
const isConfirmOpen = ref(false)
const editingCategory = ref(null)
const categoryFormData = ref({ name: '', description: '' })
const deleteCategoryConfirm = ref(null)

onMounted(() => {
  const inventoryitems = localStorage.getItem('inventoryItems')
  if (inventoryitems) {
    items.value = JSON.parse(inventoryitems)
  }
})

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesCategory = filterCategory.value === 'all' || item.category === filterCategory.value
    return matchesSearch && matchesCategory
  })
})

const totalItems = computed(() => {
  return items.value.reduce((total, item) => total + item.quantity, 0)
})
const totalValue = computed(() => {
  return items.value.reduce((total, item) => total + item.quantity * item.price, 0)
})
const lowStockItems = computed(() => {
  return items.value.filter((item) => item.quantity < 10).length
})
</script>
