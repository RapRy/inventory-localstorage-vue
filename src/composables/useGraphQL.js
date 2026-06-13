import { ref, computed } from 'vue'

const API_URL = 'https://inventory-api-rho-ten.vercel.app/graphql/'

// Helper function to make GraphQL requests
export const graphqlFetch = async (query, variables = {}) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  const data = await response.json()

  if (data.errors) {
    throw new Error(data.errors[0].message)
  }

  return data.data
}

// Category composable
export const useCategories = () => {
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      const query = `
        query {
          categories {
            id
            name
            description
            createdAt
            updatedAt
          }
        }
      `
      const data = await graphqlFetch(query)
      categories.value = data.categories
    } catch (err) {
      error.value = err.message
      console.error('Error fetching categories:', err)
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (name, description = '') => {
    try {
      const query = `
        mutation CreateCategory($name: String!, $description: String) {
          createCategory(name: $name, description: $description) {
            id
            name
            description
          }
        }
      `
      const data = await graphqlFetch(query, { name, description })
      categories.value.push(data.createCategory)
      return data.createCategory
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const updateCategory = async (id, name, description) => {
    try {
      const query = `
        mutation UpdateCategory($id: ID!, $name: String, $description: String) {
          updateCategory(id: $id, name: $name, description: $description) {
            id
            name
            description
          }
        }
      `
      const data = await graphqlFetch(query, { id, name, description })
      const index = categories.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        categories.value[index] = data.updateCategory
      }
      return data.updateCategory
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const deleteCategory = async (id) => {
    try {
      const query = `
        mutation DeleteCategory($id: ID!) {
          deleteCategory(id: $id)
        }
      `
      await graphqlFetch(query, { id })
      categories.value = categories.value.filter((c) => c.id !== id)
      return true
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}

// Inventory Items composable
export const useInventoryItems = () => {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchItems = async () => {
    loading.value = true
    error.value = null
    try {
      const query = `
        query {
          inventoryItems {
            id
            name
            description
            category {
              id
              name
            }
            quantity
            kg
            isKg
            price
            pricePerKg
            surcharge
            minStockLevel
            isLowStock
            totalValue
            createdAt
            updatedAt
          }
        }
      `
      const data = await graphqlFetch(query)
      items.value = data.inventoryItems
    } catch (err) {
      error.value = err.message
      console.error('Error fetching items:', err)
    } finally {
      loading.value = false
    }
  }

  const createItem = async (itemData) => {
    try {
      const query = `
        mutation CreateInventoryItem(
          $name: String!
          $description: String
          $categoryId: ID!
          $quantity: Int
          $kg: Float
          $isKg: Boolean!
          $price: Float!
          $pricePerKg: Float
          $surcharge: Float
          $minStockLevel: Int
        ) {
          createInventoryItem(
            name: $name
            description: $description
            categoryId: $categoryId
            quantity: $quantity
            kg: $kg
            isKg: $isKg
            price: $price
            pricePerKg: $pricePerKg
            surcharge: $surcharge
            minStockLevel: $minStockLevel
          ) {
            id
            name
            description
            category {
              id
              name
            }
            quantity
            kg
            isKg
            price
            pricePerKg
            surcharge
            minStockLevel
            isLowStock
            totalValue
            createdAt
          }
        }
      `
      const data = await graphqlFetch(query, itemData)
      items.value.push(data.createInventoryItem)
      return data.createInventoryItem
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const updateItem = async (id, itemData) => {
    try {
      const query = `
        mutation UpdateInventoryItem(
          $id: ID!
          $name: String
          $description: String
          $categoryId: ID
          $quantity: Int
          $kg: Float
          $isKg: Boolean
          $price: Float
          $pricePerKg: Float
          $surcharge: Float
          $minStockLevel: Int
        ) {
          updateInventoryItem(
            id: $id
            name: $name
            description: $description
            categoryId: $categoryId
            quantity: $quantity
            kg: $kg
            isKg: $isKg
            price: $price
            pricePerKg: $pricePerKg
            surcharge: $surcharge
            minStockLevel: $minStockLevel
          ) {
            id
            name
            description
            category {
              id
              name
            }
            quantity
            kg
            isKg
            price
            pricePerKg
            surcharge
            minStockLevel
            isLowStock
            totalValue
            updatedAt
          }
        }
      `
      const data = await graphqlFetch(query, { id, ...itemData })
      const index = items.value.findIndex((i) => i.id === id)
      if (index !== -1) {
        items.value[index] = data.updateInventoryItem
      }
      return data.updateInventoryItem
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const deleteItem = async (id) => {
    try {
      const query = `
        mutation DeleteInventoryItem($id: ID!) {
          deleteInventoryItem(id: $id)
        }
      `
      await graphqlFetch(query, { id })
      items.value = items.value.filter((i) => i.id !== id)
      return true
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const getInventoryStatistics = async () => {
    try {
      const query = `
        query {
          inventoryStatistics {
            totalItems
            totalQuantity
            totalKg
            totalValue
            lowStockItems {
              id
              name
            }
            totalSurchargeValue
            totalPriceValue
          }
        }
      `
      const data = await graphqlFetch(query)
      return data.inventoryStatistics
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  return {
    items,
    loading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    getInventoryStatistics,
  }
}

// Sales composable
export const useSales = () => {
  const sales = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchSales = async () => {
    loading.value = true
    error.value = null
    try {
      const query = `
        query {
          sales {
            id
            item {
              id
              name
              category {
                name
              }
            }
            quantity
            kg
            isKg
            pricePerUnit
            totalPrice
            surcharge
            finalPrice
            status
            notes
            createdAt
          }
        }
      `
      const data = await graphqlFetch(query)
      sales.value = data.sales
    } catch (err) {
      error.value = err.message
      console.error('Error fetching sales:', err)
    } finally {
      loading.value = false
    }
  }

  const createSale = async (saleData) => {
    try {
      const query = `
        mutation CreateSale(
          $itemId: ID!
          $quantity: Int
          $kg: Float
          $isKg: Boolean!
          $pricePerUnit: Float!
          $totalPrice: Float!
          $surcharge: Float
          $finalPrice: Float!
          $notes: String
        ) {
          createSale(
            itemId: $itemId
            quantity: $quantity
            kg: $kg
            isKg: $isKg
            pricePerUnit: $pricePerUnit
            totalPrice: $totalPrice
            surcharge: $surcharge
            finalPrice: $finalPrice
            notes: $notes
          ) {
            id
            item {
              id
              name
              category {
                name
              }
            }
            quantity
            kg
            isKg
            pricePerUnit
            totalPrice
            surcharge
            finalPrice
            status
            notes
            createdAt
          }
        }
      `
      const data = await graphqlFetch(query, saleData)
      sales.value.push(data.createSale)
      return data.createSale
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const voidSale = async (id) => {
    try {
      const query = `
        mutation VoidSale($id: ID!) {
          voidSale(id: $id) {
            id
            status
          }
        }
      `
      const data = await graphqlFetch(query, { id })
      const index = sales.value.findIndex((s) => s.id === id)
      if (index !== -1) {
        sales.value[index].status = 'voided'
      }
      return data.voidSale
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const deleteSale = async (id) => {
    try {
      const query = `
        mutation DeleteSale($id: ID!) {
          deleteSale(id: $id)
        }
      `
      await graphqlFetch(query, { id })
      sales.value = sales.value.filter((s) => s.id !== id)
      return true
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const getSalesStatistics = async () => {
    try {
      const query = `
        query {
          salesStatistics {
            totalSales
            transactionCount
            avgSale
            totalQuantitySold
            totalKgSold
            totalSurchargeSales
            totalPriceSales
          }
        }
      `
      const data = await graphqlFetch(query)
      return data.salesStatistics
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  return {
    sales,
    loading,
    error,
    fetchSales,
    createSale,
    voidSale,
    deleteSale,
    getSalesStatistics,
  }
}
