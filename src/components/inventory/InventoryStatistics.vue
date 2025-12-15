<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm">Total Items</p>
          <p class="text-3xl font-bold text-gray-900">{{ totalItems }}</p>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <ArchiveBoxIcon class="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm">Total Quantity</p>
          <p class="text-3xl font-bold text-gray-900">{{ totalQuantity }}</p>
        </div>
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <CubeIcon class="w-6 h-6 text-green-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm">Total Value</p>
          <p class="text-3xl font-bold text-gray-900">{{ formatCurrency(totalValue) }}</p>
        </div>
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <CurrencyDollarIcon class="w-6 h-6 text-purple-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm">Low Stock Items</p>
          <p class="text-3xl font-bold text-gray-900">{{ lowStockItems }}</p>
        </div>
        <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
          <ExclamationTriangleIcon class="w-6 h-6 text-red-600" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ArchiveBoxIcon,
  CubeIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/solid'

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  totalValue: {
    type: Number,
    required: true,
  },
  lowStockItems: {
    type: Number,
    required: true,
  },
})

const formatCurrency = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(Number(v || 0))
</script>
