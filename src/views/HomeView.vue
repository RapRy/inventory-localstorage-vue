<template>
  <div class="container">
    <h1>Meat & Vegetable Inventory</h1>

    <InventoryForm
      :edit-item="selectedItem"
      @add-item="addItem"
      @update-item="updateItem"
      @clear-edit="clearEdit"
    />

    <InventoryList
      :items="items"
      @delete-item="deleteItem"
      @edit-item="startEdit"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import InventoryForm from '@/components/InventoryForm.vue'
import InventoryList from '@/components/InventoryList.vue'

const STORAGE_KEY = 'meatVegInventory'

const items = ref([])
const selectedItem = ref(null)

// Load items from localStorage when app starts
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    items.value = JSON.parse(saved)
  }
})

// Save to localStorage whenever items change
watch(items, (newItems) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
}, { deep: true })

function addItem(item) {
  items.value.push({ ...item, id: Date.now() })
}

function deleteItem(id) {
  items.value = items.value.filter(item => item.id !== id)
  if (selectedItem.value?.id === id) selectedItem.value = null
}

function updateItem(updatedItem) {
  const index = items.value.findIndex(i => i.id === updatedItem.id)
  if (index !== -1) items.value[index] = { ...updatedItem }
  selectedItem.value = null
}

function startEdit(item) {
  selectedItem.value = { ...item }
}

function clearEdit() {
  selectedItem.value = null
}
</script>

<style>
.container {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  font-family: sans-serif;
}
</style>
