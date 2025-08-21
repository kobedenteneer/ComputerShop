<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="navbar">
      <ul class="navbar-list">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/products">Products</router-link></li>
        <li><router-link to="/about">About Us</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </nav>

    <h1>Product Stock Management</h1>
    <table class="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Stock</th>
          <th>Reorder Needed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>
            <img
              :src="product.images[0]"
              alt="Product Image"
              style="max-height: 100px; max-width: 100px"
            />
          </td>
          <td>{{ product.title }}</td>
          <td>{{ product.stock }}</td>
          <td>
            <span
              :style="{
                color: needsReorder(product.stock, product.reorderLevel) ? 'red' : 'green',
              }"
            >
              {{ needsReorder(product.stock, product.reorderLevel) ? 'Yes' : 'No' }}
            </span>
          </td>
          <td>
            <button @click="openStockModal(product)" class="nice-button">Add Stock</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for adding stock -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Add Stock for {{ selectedProduct?.title }}</h2>
        <label for="stockAmount">Amount to Add:</label>
        <input
          id="stockAmount"
          type="number"
          v-model.number="stockAmount"
          min="1"
          class="stock-input"
        />
        <div class="modal-actions">
          <button @click="addStock" class="nice-button">Confirm</button>
          <button @click="closeStockModal" class="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from '@/types/Product'

import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const { productList: products } = storeToRefs(productStore)

const showModal = ref<boolean>(false) // To control the visibility of the modal
const selectedProduct = ref<Product | null>() // The product for which stock is being added

const stockAmount = ref(1) // The amount to add to the stock

onMounted(() => {
  try {
    productStore.retrieveProducts()
  } catch (error) {
    alert('There was an error fetching the products!\n\n' + (error as Error).message)
  }
})

// Open the modal and set the selected product
const openStockModal = (product: Product) => {
  selectedProduct.value = product
  showModal.value = true

  stockAmount.value = 1 // Reset the stock amount
}
const closeStockModal = () => {
  showModal.value = false
  selectedProduct.value = null
}

// Add stock to the selected product
const addStock = async () => {
  if (!selectedProduct.value) return

  try {
    const updatedProduct = {
      ...selectedProduct.value,
      stock: selectedProduct.value.stock + stockAmount.value,
    }

    await productStore.updateProduct(updatedProduct)

    // Close the modal
    closeStockModal()
  } catch (error) {
    console.error('Error updating stock:', error)
    alert('Error updating stock:\n\n' + (error as Error).message)
  }
}

// Check if a product needs to be reordered
const needsReorder = (stock: number, reorderLevel: number) => stock <= reorderLevel
</script>

<style scoped>
/* Navigation Bar Styling */
.navbar {
  background-color: #333;
  padding: 10px 20px;
}

.navbar-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px;
}

.navbar-list li {
  display: inline;
}

.navbar-list a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.navbar-list a:hover {
  text-decoration: underline;
}

h1 {
  margin-bottom: 20px;
}

.product-table {
  width: 100%;
  border-collapse: collapse; /* Remove gaps between table cells */
}

.product-table th,
.product-table td {
  border: 1px solid #ddd; /* Add borders only to the cells */
  padding: 8px;
  text-align: left;
}

.product-table th {
  background-color: #f4f4f4; /* Light background for headers */
}

.product-table td {
  background-color: white; /* White background for cells */
}

button.nice-button {
  padding: 10px 20px;
  background-color: #45a29e; /* Updated to match project style */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.nice-button:hover {
  background-color: #3b8c84; /* Slightly darker hover color */
}

button.nice-button:active {
  background-color: #2f6f68; /* Even darker active color */
}

button.cancel-button {
  padding: 10px 20px;
  background-color: #ccc;
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.cancel-button:hover {
  background-color: #aaa;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Darker overlay for better focus */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
}

.stock-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}
</style>
