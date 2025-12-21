<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Category Management</h1>
            <p class="text-gray-600">Manage your inventory categories</p>
          </div>
        </div>
      </div>

      <!-- Category Controls -->
      <CategoryControls
        :search-term="searchTerm"
        @update:open-form="handleOpenForm"
        @update:searchTerm="handleSearchTermUpdate"
      />

      <!-- Category Table -->
      <TableList
        :categories="filteredCategories"
        @handle-edit-category="handleEditCategory"
        @handle-delete-category-confirm="handleDeleteCategoryConfirm"
      />

      <!-- Category Form Modal -->
      <CategoryForm
        v-if="isFormOpen"
        :editing-category="editingCategory"
        :isFormOpen="isFormOpen"
        @close-form="handleCloseForm"
        @save-category="handleSaveCategory"
      />

      <!-- Delete Confirmation Modal -->
      <DeleteModal
        v-if="deleteConfirm.modal"
        :title="`Confirm Delete Category`"
        :text="`Are you sure you want to delete category '${deleteConfirm.name}'? This action cannot be undone.`"
        @confirm-delete="handleDelete(deleteConfirm.id)"
        @cancel-delete="handleDeleteCategoryConfirm(false, null, '')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { CATEGORY_STORAGE_KEY, STORAGE_KEY } from '@/utils/constant'
import DeleteModal from '@/components/DeleteModal.vue'
import CategoryForm from '@/components/category/CategoryForm.vue'
import TableList from '@/components/category/TableList.vue'
import CategoryControls from '@/components/category/CategoryControls.vue'

const categories = ref([])

onMounted(() => {
  loadCategories()
})

const loadCategories = () => {
  const storedCategories = localStorage.getItem(CATEGORY_STORAGE_KEY)
  const storedInventories = localStorage.getItem(STORAGE_KEY)
  if (storedCategories) {
    categories.value = JSON.parse(storedCategories)
    categories.value.forEach((category) => {
      category.itemCount = storedInventories
        ? JSON.parse(storedInventories).filter((item) => item.category.id === category.id).length
        : 0
    })
  }
}

const isFormOpen = ref(false)
const editingCategory = ref(null)
const deleteConfirm = ref({
  modal: false,
  id: null,
  name: '',
})
const searchTerm = ref('')

const handleOpenForm = () => {
  isFormOpen.value = true
}

const handleCloseForm = () => {
  isFormOpen.value = false
  editingCategory.value = null
}

const handleEditCategory = (category) => {
  editingCategory.value = { ...category }
  isFormOpen.value = true
}

const handleDeleteCategoryConfirm = (modal, id, name = '') => {
  deleteConfirm.value = {
    modal,
    id,
    name,
  }
}

const handleDelete = (id) => {
  categories.value = categories.value.filter((category) => category.id !== id)
  const storedInventories = localStorage.getItem(STORAGE_KEY)
  if (storedInventories) {
    const filteredInventories = JSON.parse(storedInventories).filter(
      (item) => item.category.id !== id,
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredInventories))
  }
  localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories.value))
  deleteConfirm.value = {
    modal: false,
    id: null,
    name: '',
  }
}

const handleSaveCategory = (categoryData) => {
  if (editingCategory.value) {
    const index = categories.value.findIndex((c) => c.id === editingCategory.value.id)
    categories.value[index] = { ...categoryData }
  } else {
    categories.value.push({
      id: Date.now(),
      ...categoryData,
    })
  }
  localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories.value))
  if (editingCategory.value) {
    const storedInventories = localStorage.getItem(STORAGE_KEY)

    const updatedInventory = JSON.parse(storedInventories).map((item) => ({
      ...item,
      category:
        item.category.id === editingCategory.value.id
          ? { ...item.category, name: categoryData.name }
          : item.category,
    }))

    if (storedInventories) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInventory))
    }
  }
  handleCloseForm()
}

const handleSearchTermUpdate = (term) => {
  searchTerm.value = term
}

const filteredCategories = computed(() => {
  return categories.value.filter((category) => {
    const searchLower = searchTerm.value.toLowerCase()
    return (
      category.name.toLowerCase().includes(searchLower) ||
      category.description.toLowerCase().includes(searchLower)
    )
  })
})
</script>
