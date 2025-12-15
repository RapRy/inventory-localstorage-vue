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
            <ArchiveBoxIcon class="w-8 h-8 text-purple-600" />
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
            <TagIcon class="w-8 h-8 text-purple-600" />
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
            <ShoppingBagIcon class="w-8 h-8 text-purple-600" />
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
import { ArchiveBoxIcon, TagIcon, ShoppingBagIcon } from '@heroicons/vue/24/solid'
</script>
