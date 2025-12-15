<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm">Total Sales</p>
          <p class="text-3xl font-bold text-gray-900">{{ formatCurrency(totalSales) }}</p>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-none">
          <CurrencyDollarIcon class="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm">Total Surcharge Sale</p>
          <p class="text-3xl font-bold text-gray-900">{{ formatCurrency(totalSurcharge) }}</p>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-none">
          <CurrencyDollarIcon class="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm">Total Price Sale</p>
          <p class="text-3xl font-bold text-gray-900">{{ formatCurrency(totalPrice) }}</p>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-none">
          <CurrencyDollarIcon class="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm">Transactions</p>
          <p class="text-3xl font-bold text-gray-900">{{ transactions }}</p>
        </div>
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-none">
          <CreditCardIcon class="w-6 h-6 text-green-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm">Avg Sale</p>
          <p class="text-3xl font-bold text-gray-900">{{ formatCurrency(avgSale) }}</p>
        </div>
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-none">
          <ChartBarIcon class="w-6 h-6 text-purple-600" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm">Quantity Sold</p>
          <p class="text-3xl font-bold text-gray-900">{{ totalQuantity }}</p>
        </div>
        <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-none">
          <ShoppingCartIcon class="w-6 h-6 text-teal-600" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CurrencyDollarIcon,
  CreditCardIcon,
  ChartBarIcon,
  ShoppingCartIcon,
} from '@heroicons/vue/24/solid'
import { formatCurrency } from '@/utils/helperfunctions'

const props = defineProps({
  totalSales: { type: Number, required: true },
  transactions: { type: Number, required: true },
  avgSale: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
  totalSurcharge: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
})
</script>
