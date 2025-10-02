<template>
  <div>
    <h2>Inventory Items</h2>
    <div v-if="items.length === 0">No items in inventory.</div>
    <ul v-else>
      <li v-for="item in items" :key="item.id">
        <strong>{{ item.name }}</strong> ({{ item.category }}) –
        {{ item.quantity }} pcs @ ${{ item.price }}
        <button @click="$emit('edit-item', item)">Edit</button>
        <button @click="$emit('delete-item', item.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: Array
})
defineEmits(['delete-item', 'edit-item'])
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 0.5rem;
}
button {
  margin-left: 0.5rem;
}
</style>
