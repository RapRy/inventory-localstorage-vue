<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="p-12 text-center" v-if="props.filteredItems.length === 0">
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
              @click="sort('name')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              <div class="flex items-center space-x-1">
                <span>Item Name</span>
                <SortIcon :active="sortBy === 'name'" :direction="sortDirection" />
              </div>
            </th>
            <th
              @click="sort('category')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              Category
              <SortIcon :active="sortBy === 'category'" :direction="sortDirection" />
            </th>
            <th
              @click="sort('kg')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              Kilogram
              <SortIcon :active="sortBy === 'quantity'" :direction="sortDirection" />
            </th>
            <th
              @click="sort('quantity')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              Quantity
              <SortIcon :active="sortBy === 'quantity'" :direction="sortDirection" />
            </th>
            <th
              @click="sort('price')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              Price
              <SortIcon :active="sortBy === 'price'" :direction="sortDirection" />
            </th>
            <th
              @click="sort('surcharge')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              Surcharge
              <SortIcon :active="sortBy === 'price'" :direction="sortDirection" />
            </th>
            <th
              @click="sort('totalValue')"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            >
              Total Value
              <SortIcon :active="sortBy === 'totalValue'" :direction="sortDirection" />
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr class="hover:bg-gray-50" v-for="item in sortedItems" :key="item.id">
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
                {{ item.category.name }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                v-if="item.isKg"
                :class="{ 'text-red-600': item.kg < 2, 'text-gray-900': item.kg >= 2 }"
              >
                {{ item.kg }}
                <span class="ml-1 text-xs" v-if="item.kg < 2">(Low)</span>
              </span>
              <span v-else>-</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                v-if="!item.isKg"
                :class="{ 'text-red-600': item.quantity < 2, 'text-gray-900': item.quantity >= 2 }"
              >
                {{ item.quantity }}
                <span class="ml-1 text-xs" v-if="item.quantity < 2">(Low)</span>
              </span>
              <span v-else>-</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ item.price }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ item.surcharge }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{
                item.isKg
                  ? (Number(item.price) + Number(item.surcharge)) * item.kg
                  : (Number(item.price) + Number(item.surcharge)) * item.quantity
              }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="emitEditItem(item)"
                class="text-indigo-600 hover:text-indigo-900 mr-4"
              >
                Edit
              </button>
              <button
                @click="emitDeleteItemConfirm(true, item.id, `${item.name} (${item.quantity})`)"
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
import SortIcon from './SortIcon.vue'

const props = defineProps({
  filteredItems: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['handle-edit-item', 'handle-delete-item-confirm'])

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

const sortedItems = computed(() => {
  return [...props.filteredItems].sort((a, b) => {
    let compareA = a[sortBy.value]
    let compareB = b[sortBy.value]

    // Handle total value calculation
    if (sortBy.value === 'totalValue') {
      compareA = a.quantity * Number(a.price)
      compareB = b.quantity * Number(b.price)
    }

    // Convert to numbers for numeric comparisons
    if (['quantity', 'price', 'totalValue', 'surcharge'].includes(sortBy.value)) {
      compareA = Number(compareA)
      compareB = Number(compareB)
    }

    if (sortDirection.value === 'asc') {
      return compareA > compareB ? 1 : -1
    } else {
      return compareA < compareB ? 1 : -1
    }
  })
})

const emitEditItem = (item) => {
  emit('handle-edit-item', item)
}

const emitDeleteItemConfirm = (show, id, name) => {
  emit('handle-delete-item-confirm', show, id, name)
}
</script>
