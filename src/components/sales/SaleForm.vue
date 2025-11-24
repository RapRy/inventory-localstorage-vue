<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Record Sale</h2>
          <button @click="$emit('close-form')" class="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form @submit.prevent="submit">
          <div class="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Item</label>
              <select v-model="form.itemId" class="w-full px-3 py-2 border rounded">
                <option value="">-- select item --</option>
                <option v-for="it in props.items" :key="it.id" :value="it.id">{{ it.name }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                v-model.number="form.quantity"
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                min="0"
                v-model.number="form.price"
                class="w-full px-3 py-2 border rounded"
                disabled
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Surcharge</label>
              <input
                type="number"
                step="0.01"
                min="0"
                v-model.number="form.surcharge"
                class="w-full px-3 py-2 border rounded"
                disabled
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <input type="text" v-model="form.notes" class="w-full px-3 py-2 border rounded" />
            </div>

            <div>
              <div class="text-sm text-gray-500">
                Total: <span class="font-medium">{{ formatCurrency(total) }}</span>
              </div>
            </div>
          </div>

          <div class="flex gap-4">
            <button type="submit" class="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg">
              Save Sale
            </button>
            <button type="button" @click="reset" class="flex-1 bg-gray-200 px-6 py-3 rounded-lg">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
const props = defineProps({
  items: { type: Array, default: () => [] },
})
const emit = defineEmits(['close-form', 'save-sale'])

const form = ref({
  itemId: '',
  itemName: '',
  quantity: 1,
  surcharge: 0,
  price: 0,
  notes: '',
})

watch(
  () => form.value.itemId,
  (id) => {
    const it = props.items.find((i) => i.id === id)
    if (it) {
      form.value.itemName = it.name
      form.value.price = Number(it.price || 0)
      form.value.surcharge = Number(it.surcharge || 0)
    } else {
      form.value.itemName = ''
      form.value.price = 0
      form.value.surcharge = 0
    }
  },
)

const total = computed(
  () =>
    (Number(form.value.quantity) || 0) *
    ((Number(form.value.price) || 0) + (Number(form.value.surcharge) || 0)),
)

const formatCurrency = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(Number(v || 0))

const reset = () => {
  form.value = { itemId: '', itemName: '', quantity: 1, price: 0, notes: '' }
}

const submit = () => {
  if (!form.value.itemName) {
    alert('Select an item or enter item details')
    return
  }
  const sale = {
    itemId: form.value.itemId || null,
    itemName: form.value.itemName,
    quantity: form.value.quantity,
    price: form.value.price,
    total: total.value,
    notes: form.value.notes,
  }
  emit('save-sale', sale)
  reset()
}
</script>
