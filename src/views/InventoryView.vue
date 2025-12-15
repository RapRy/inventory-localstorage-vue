<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Inventory Management</h1>
            <p class="text-gray-600">Manage your inventory items and stock levels</p>
          </div>
        </div>
      </div>
      <!-- end header -->

      <!-- statistic cards -->
      <InventoryStatistics
        :totalItems="items.length"
        :totalQuantity="totalQuantity"
        :totalValue="totalValue"
        :lowStockItems="lowStockItems"
        :totalSurchargeValue="totalSurchargeValue"
        :totalPriceValue="totalPriceValue"
      />
      <!-- end statistic -->

      <!-- controls -->
      <InventoryControls
        :categories="categories"
        :searchTerm="searchTerm"
        :filter-category="filterCategory"
        @update:open-form="handleOpenForm"
        @update:searchTerm="handleSearchTermUpdate"
        @update:filter-category="handleFilterCategoryUpdate"
      />
      <!-- end controls -->

      <!-- table of items will go here -->
      <TableList
        :filtered-items="filteredItems"
        @handle-edit-item="handleEditItem"
        @handle-delete-item-confirm="handleDeleteItemConfirm"
      />
      <!-- add or edit item form modal -->
      <ItemForm
        v-if="isFormOpen"
        :editing-item="editingItem"
        :categories="categories"
        :isFormOpen="isFormOpen"
        @close-form="handleCloseForm"
        @load-items="loadItems"
      />

      <DeleteModal
        v-if="deleteConfirm.modal"
        :text="`Are you sure you want to delete ${deleteConfirm.name}? This action cannot be undone.`"
        @confirm-delete="handleDelete(deleteConfirm.id)"
        @cancel-delete="handleDeleteItemConfirm(false, null, '')"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import ItemForm from '@/components/inventory/ItemForm.vue'
import TableList from '@/components/inventory/TableList.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import InventoryControls from '@/components/inventory/InventoryControls.vue'
import InventoryStatistics from '@/components/inventory/InventoryStatistics.vue'
import { STORAGE_KEY, CATEGORY_STORAGE_KEY } from '@/utils/constant'
import { PlusIcon } from '@heroicons/vue/24/solid'

const items = ref([])
const isFormOpen = ref(false)
const editingItem = ref(null)
const searchTerm = ref('')
const filterCategory = ref('all')
const deleteConfirm = ref({
  modal: false,
  id: null,
  name: '',
})
const categories = localStorage.getItem(CATEGORY_STORAGE_KEY)
  ? JSON.parse(localStorage.getItem(CATEGORY_STORAGE_KEY))
  : []

onMounted(() => {
  loadItems()
})

const loadItems = () => {
  const inventoryitems = localStorage.getItem(STORAGE_KEY)
  if (inventoryitems) {
    items.value = JSON.parse(inventoryitems)
  }
}

const handleFilterCategoryUpdate = (category) => {
  filterCategory.value = category
}

const handleSearchTermUpdate = (term) => {
  searchTerm.value = term
}

const handleOpenForm = () => {
  isFormOpen.value = true
}

const handleCloseForm = () => {
  isFormOpen.value = false
  editingItem.value = null
}

const handleEditItem = (item) => {
  editingItem.value = { ...item }
  isFormOpen.value = true
}

const handleDeleteItemConfirm = (modal, id, name = '') => {
  deleteConfirm.value = {
    modal,
    id,
    name,
  }
}

const handleDelete = (id) => {
  items.value = items.value.filter((item) => item.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  handleDeleteItemConfirm(false, null, '')
}

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesCategory = filterCategory.value === 'all' || item.category === filterCategory.value
    return matchesSearch && matchesCategory
  })
})

const totalQuantity = computed(() => {
  return items.value.reduce((total, item) => total + item.quantity, 0)
})
const totalValue = computed(() => {
  return items.value.reduce(
    (total, item) => total + item.quantity * (Number(item.price) + Number(item.surcharge)),
    0,
  )
})

const totalSurchargeValue = computed(() =>
  items.value.reduce((acc, s) => acc + (Number(s.surcharge) * s.quantity || 0), 0),
)
const totalPriceValue = computed(() =>
  items.value.reduce((acc, s) => acc + (Number(s.price) * s.quantity || 0), 0),
)

console.log(totalPriceValue)
const lowStockItems = computed(() => {
  return items.value.filter((item) => item.quantity < 2).length
})
</script>
