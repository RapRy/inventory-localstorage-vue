<template>
  <nav class="bg-gray-800 text-white p-4">
    <RouterLink to="/" class="hover:text-gray-300 mr-4">Home</RouterLink>
    <RouterLink to="/categories" class="hover:text-gray-300">Categories</RouterLink>
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
