<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="name" placeholder="Item name" required />
    <input v-model.number="quantity" type="number" min="0" placeholder="Quantity" required />
    <input v-model.number="price" type="number" min="0" placeholder="Price" required />
    <select v-model="category" required>
      <option value="meat">Meat</option>
      <option value="vegetable">Vegetable</option>
    </select>
    <button type="submit">Add Item</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['add-item'])

const name = ref('')
const quantity = ref(0)
const price = ref(0)
const category = ref('vegetable')

function handleSubmit() {
  emit('add-item', {
    name: name.value,
    quantity: quantity.value,
    price: price.value,
    category: category.value,
  })

  // Reset form
  name.value = ''
  quantity.value = 0
  price.value = 0
  category.value = 'vegetable'
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
