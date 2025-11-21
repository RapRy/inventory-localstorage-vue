<template>
  <nav class="bg-gray-800 text-white p-4">
    <RouterLink to="/" class="hover:text-gray-300 mr-4">Home</RouterLink>
    <RouterLink to="/inventory" class="hover:text-gray-300 mr-4">Inventory</RouterLink>
    <RouterLink to="/categories" class="hover:text-gray-300 mr-4">Categories</RouterLink>
    <RouterLink to="/sales" class="hover:text-gray-300">Sales</RouterLink>
  </nav>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
nav {
  padding: 1rem;
}

nav a {
  margin-right: 1rem;
}
</style>
