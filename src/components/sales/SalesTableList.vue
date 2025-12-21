<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="p-6 text-center" v-if="props.sales.length === 0">
      <p class="text-gray-500">No sales recorded</p>
    </div>

    <div class="overflow-x-auto" v-else>
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Date Sold
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Kilogram
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Quantity
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Surcharge
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="s in props.sales" :key="s.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(s.dateSold) }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ s.itemName || '—' }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ s.isKg ? s.kg : '-' }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ !s.isKg ? s.quantity : '-' }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ formatCurrency(s.price) }}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{{ formatCurrency(s.surcharge) }}</td>
            <td class="px-6 py-4 text-sm text-gray-900 font-medium">
              {{ formatCurrency(s.total) }}
            </td>
            <td class="px-6 py-4 text-sm font-medium">
              <button
                @click="$emit('void-sale-confirm', s.id, s.itemName, s.dateSold)"
                class="text-yellow-600 hover:text-yellow-800 mr-4"
              >
                Void
              </button>
              <button
                @click="$emit('delete-sale-confirm', s.id, s.itemName, s.dateSold)"
                class="text-red-600 hover:text-red-800"
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
import { defineProps } from 'vue'
import { formatCurrency, formatDate } from '@/utils/helperfunctions'

const props = defineProps({
  sales: { type: Array, required: true },
})
</script>
