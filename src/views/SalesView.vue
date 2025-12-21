<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- header -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Sales Monitor</h1>
            <p class="text-gray-600">Track sales, totals and recent transactions</p>
          </div>
        </div>
      </div>

      <!-- summary metrics (styled to follow InventoryStatistics pattern but adapted) -->
      <SalesStatistics
        :total-sales="totalSales"
        :transactions="sales.length"
        :avg-sale="avgSale"
        :total-quantity="totalQuantitySold"
        :total-surcharge="totalSurchargeSales"
        :total-price="totalPriceSales"
        :total-kg="totalKgSold"
      />

      <!-- controls: search + new sale button -->
      <SalesControls :search-term="searchTerm" @update:searchTerm="handleSearchTermUpdate">
        <RouterLink
          to="/inventory"
          class="w-full md:w-auto bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <ArchiveBoxIcon class="w-5 h-5" />
          Back to Inventory
        </RouterLink>
        <button
          @click="openForm"
          class="w-full md:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2"
        >
          <PlusIcon class="w-5 h-5 mr-2" />
          New Sale
        </button>
      </SalesControls>

      <!-- table list -->
      <SalesTableList :sales="filteredSales" @delete-sale-confirm="handleDeleteSaleConfirm" />

      <!-- Sale form modal -->
      <SaleForm
        v-if="isFormOpen"
        :items="items"
        @close-form="closeForm"
        @save-sale="handleSaveSale"
      />

      <!-- delete confirmation -->
      <DeleteModal
        v-if="deleteConfirm.modal"
        :text="`Delete sale of '${deleteConfirm.name}' on ${formatDate(deleteConfirm.date)}?`"
        @confirm-delete="confirmDelete"
        @cancel-delete="cancelDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SalesTableList from '@/components/sales/SalesTableList.vue'
import SalesControls from '@/components/sales/SalesControls.vue'
import SaleForm from '@/components/sales/SaleForm.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import SalesStatistics from '@/components/sales/SalesStatistics.vue'
import { SALES_STORAGE_KEY, STORAGE_KEY } from '@/utils/constant'
import { PlusIcon, ArchiveBoxIcon } from '@heroicons/vue/24/solid'
import { formatDate } from '@/utils/helperfunctions'

const sales = ref([])
const items = ref([])
const isFormOpen = ref(false)
const deleteConfirm = ref({ modal: false, id: null, name: '', date: '' })
const searchTerm = ref('')

onMounted(() => {
  loadSales()
  loadItems()
})

const loadSales = () => {
  try {
    const raw = localStorage.getItem(SALES_STORAGE_KEY)
    sales.value = raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('Failed to load sales from localStorage', e)
    sales.value = []
  }
}

const loadItems = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    items.value = raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('Failed to load items from localStorage', e)
    items.value = []
  }
}

const persistSales = () => {
  try {
    localStorage.setItem(SALES_STORAGE_KEY, JSON.stringify(sales.value))
  } catch (e) {
    console.error('Failed to persist sales to localStorage', e)
  }
}

const openForm = () => {
  isFormOpen.value = true
}
const closeForm = () => {
  isFormOpen.value = false
}

const handleSaveSale = (sale) => {
  const newSale = { id: Date.now(), date: new Date().toISOString(), ...sale }
  sales.value.unshift(newSale)

  if (sale.itemId) {
    const idx = items.value.findIndex((i) => i.id === sale.itemId)
    if (idx > -1) {
      items.value[idx].quantity = Math.max(
        0,
        (Number(items.value[idx].quantity) || 0) - Number(sale.quantity || 0),
      )
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
      } catch (e) {
        console.error('Failed to persist items to localStorage', e)
      }
    }
  }

  persistSales()
  closeForm()
}

const handleDeleteSaleConfirm = (id, name, date) => {
  deleteConfirm.value = { modal: true, id, name, date }
}

const confirmDelete = () => {
  if (deleteConfirm.value.id == null) return
  sales.value = sales.value.filter((s) => s.id !== deleteConfirm.value.id)
  persistSales()
  cancelDelete()
}

const cancelDelete = () => {
  deleteConfirm.value = { modal: false, id: null, name: '', date: '' }
}

const handleSearchTermUpdate = (term) => {
  searchTerm.value = term || ''
}

const filteredSales = computed(() => {
  const q = (searchTerm.value || '').trim().toLowerCase()
  if (!q) return sales.value
  return sales.value.filter((s) => {
    return (s.itemName || '').toLowerCase().includes(q) || (s.notes || '').toLowerCase().includes(q)
  })
})

const totalSales = computed(() => sales.value.reduce((acc, s) => acc + (Number(s.total) || 0), 0))
const totalQuantitySold = computed(() =>
  sales.value.reduce((acc, s) => acc + (Number(s.quantity) || 0), 0),
)
const totalKgSold = computed(() => sales.value.reduce((acc, s) => acc + (Number(s.kg) || 0), 0))
const avgSale = computed(() => (sales.value.length ? totalSales.value / sales.value.length : 0))

const totalSurchargeSales = computed(() =>
  sales.value.reduce(
    (acc, s) => acc + (Number(s.surcharge) * (s.isKg ? s.kg : s.quantity) || 0),
    0,
  ),
)

const totalPriceSales = computed(() =>
  sales.value.reduce((acc, s) => acc + (Number(s.price) * (s.isKg ? s.kg : s.quantity) || 0), 0),
)
</script>
