<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm">Total Sales</p>
          <p class="text-3xl font-bold text-gray-900">{{ formatCurrency(totalSales) }}</p>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <p class="text-gray-500 text-sm">Transactions</p>
          <p class="text-3xl font-bold text-gray-900">{{ transactions }}</p>
        </div>
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-none">
          <!-- new transactions icon: credit-card (balanced, fixed size) -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            class="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            style="display: block"
          >
            <rect
              x="2"
              y="5"
              width="20"
              height="14"
              rx="2"
              ry="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <rect
              x="6"
              y="9"
              width="4"
              height="3"
              rx="0.5"
              ry="0.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M15 11h3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 16h10" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm">Avg Sale</p>
          <p class="text-3xl font-bold text-gray-900">{{ formatCurrency(avgSale) }}</p>
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
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm">Quantity Sold</p>
          <p class="text-3xl font-bold text-gray-900">{{ totalQuantity }}</p>
        </div>
        <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
          <!-- new quantity sold icon: shopping-cart -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            preserveAspectRatio="xMidYMid meet"
            class="w-6 h-6 flex-shrink-0 text-teal-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  totalSales: { type: Number, required: true },
  transactions: { type: Number, required: true },
  avgSale: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
})

const formatCurrency = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(v || 0))
</script>
