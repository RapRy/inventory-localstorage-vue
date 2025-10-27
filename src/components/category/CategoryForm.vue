<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ editingCategory ? 'Edit Category' : 'Add New Category' }}
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

        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Category Name * </label>
              <input
                type="text"
                name="name"
                v-model="formData.name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"> Description </label>
              <textarea
                name="description"
                v-model="formData.description"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              class="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              {{ editingCategory ? 'Update Category' : 'Add Category' }}
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
import { ref, onMounted } from 'vue'

const props = defineProps({
  editingCategory: {
    type: Object,
    default: null,
  },
  isFormOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close-form', 'save-category'])

const formData = ref({
  name: '',
  description: '',
})

onMounted(() => {
  if (props.editingCategory) {
    formData.value = { ...props.editingCategory }
  }
})

const closeForm = () => {
  emit('close-form')
}

const resetForm = () => {
  formData.value = {
    name: '',
    description: '',
  }
}

const handleSubmit = () => {
  if (!formData.value.name) {
    alert('Please fill in the category name.')
    return
  }

  emit('save-category', {
    ...formData.value,
  })
  resetForm()
}
</script>
