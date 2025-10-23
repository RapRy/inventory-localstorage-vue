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
          <tr class="hover:bg-gray-50" v-for="item in props.filteredItems" :key="item.id">
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
              {{ item.price }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ item.quantity * Number(item.price) }}
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
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  filteredItems: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['handle-edit-item', 'handle-delete-item-confirm'])

const emitEditItem = (item) => {
  emit('handle-edit-item', item)
}

const emitDeleteItemConfirm = (show, id, name) => {
  emit('handle-delete-item-confirm', show, id, name)
}
</script>
