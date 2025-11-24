<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Inventory Management System</h1>
        <p class="text-xl text-gray-600 mb-8">Manage your inventory and categories with ease</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <RouterLink
          to="/inventory"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div class="flex items-center mb-4">
            <svg
              class="w-8 h-8 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h2 class="text-2xl font-bold text-gray-900 ml-3">Inventory</h2>
          </div>
          <p class="text-gray-600">
            Manage your inventory items, track quantities, and monitor stock levels
          </p>
        </RouterLink>

        <RouterLink
          to="/categories"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div class="flex items-center mb-4">
            <svg
              class="w-8 h-8 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <h2 class="text-2xl font-bold text-gray-900 ml-3">Categories</h2>
          </div>
          <p class="text-gray-600">
            Organize your inventory with custom categories and manage them efficiently
          </p>
        </RouterLink>

        <RouterLink
          to="/sales"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div class="flex items-center mb-4">
            <svg
              class="w-8 h-8 text-purple-600"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
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
                stroke-width="2"
              ></rect>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11v2M8 11v2M3 7h18"
              ></path>
            </svg>
            <h2 class="text-2xl font-bold text-gray-900 ml-3">Sales</h2>
          </div>
          <p class="text-gray-600">
            Record and monitor sales, view totals, and track sold quantities
          </p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
