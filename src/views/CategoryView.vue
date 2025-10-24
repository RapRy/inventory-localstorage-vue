<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Categories</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="category in categories" :key="category.id" class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold">{{ category.name }}</h2>
        <p class="text-gray-600">{{ category.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const categories = ref([
  { id: 1, name: 'Electronics', description: 'Electronic devices and accessories' },
  { id: 2, name: 'Furniture', description: 'Home and office furniture' },
  { id: 3, name: 'Books', description: 'Books and publications' },
])
</script>
