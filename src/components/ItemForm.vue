<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ props.editingItem ? 'Edit Item' : 'Add New Item' }}
          </h2>
          <button @click="closeForm" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="{2}"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form @submit="handleFormSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Item Name * </label>
              <input
                type="text"
                name="name"
                v-model="formData.name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Category * </label>
              <select
                name="category"
                v-model="formData.category"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select a category</option>
                <option
                  v-for="category in props.categories"
                  :key="category.id"
                  :value="category.name"
                >
                  {{ category.name }}
                </option>
              </select>
              <p v-if="categories.length === 0" class="text-sm text-red-600 mt-1">
                Please create a category first using "Manage Categories"
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Quantity * </label>
              <input
                type="number"
                name="quantity"
                v-model="formData.quantity"
                min="0"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Price ($) * </label>
              <input
                type="number"
                name="price"
                v-model="formData.price"
                step="0.01"
                min="0"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2"> Description </label>
            <textarea
              name="description"
              v-model="formData.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              class="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              {{ props.editingItem ? 'Update Item' : 'Add Item' }}
            </button>
            <button
              type="button"
              @click="resetForm"
              class="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { STORAGE_KEY } from '@/constant'
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  editingItem: {
    type: Object,
    default: null,
  },
  categories: {
    type: Array,
    required: true,
  },
})

const formData = ref({
  name: '',
  description: '',
  category: '',
  quantity: 0,
  price: 0.0,
})

const emit = defineEmits(['close-form', 'load-items'])

const closeForm = () => {
  emit('close-form')
}

const resetForm = () => {
  formData.value = {
    name: '',
    description: '',
    category: '',
    quantity: 0,
    price: 0.0,
  }
}

const handleFormSubmit = (event) => {
  event.preventDefault()

  if (
    !formData.value.name ||
    !formData.value.category ||
    !formData.value.quantity ||
    !formData.value.price
  ) {
    alert('Please fill in all required fields.')
    return
  }

  const itemData = {
    id: props.editingItem ? props.editingItem.id : Date.now(),
    name: formData.value.name,
    description: formData.value.description,
    category: formData.value.category,
    quantity: Number(formData.value.quantity),
    price: parseFloat(formData.value.price).toFixed(2),
    dateAdded: props.editingItem ? props.editingItem.dateAdded : new Date().toISOString(),
  }

  const existingItems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  if (props.editingItem) {
    console.log('Editing item:', itemData)
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingItems, itemData]))
  }

  resetForm()
  emit('load-items')
}
</script>
