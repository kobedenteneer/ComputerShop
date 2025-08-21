<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()
const route = useRoute()
const orderId = route.params.orderId as string

onMounted(async () => {
  await orderStore.loadOrder(orderId)
})
</script>

<template>
  <div class="checkout">
    <div class="checkout-content">
      <h1>Order Confirmation</h1>

      <div v-if="orderStore.order">
        <h2>Order Summary</h2>
        <div class="order-info">
          <p><strong>Order ID:</strong> {{ orderStore.order.id }}</p>
          <p><strong>Total Price:</strong> €{{ orderStore.order.totalPrice.toFixed(2) }}</p>
        </div>

        <h3>Items:</h3>
        <ul>
          <li v-for="item in orderStore.order.items" :key="item.productId">
            <div class="item">
              <p>
                <strong>{{ item.title }}</strong>
              </p>
              <p>Price: €{{ item.price.toFixed(2) }}</p>
            </div>
          </li>
        </ul>

        <h3>User Information</h3>
        <div class="user-info">
          <p><strong>Name:</strong> {{ orderStore.order.userName }}</p>
          <p><strong>Customer ID: </strong>{{ orderStore.order.userId }}</p>
        </div>
      </div>

      <div v-else>
        <p class="empty-message">Loading order details...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 70vh;
  background-color: #f4ecd8;
  padding: 20px;
}

.checkout-content {
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h1,
h2,
h3 {
  color: #1e3a5f;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

h2 {
  font-size: 1.4rem;
  margin-top: 20px;
  margin-bottom: 10px;
}

h3 {
  font-size: 1.2rem;
  margin-top: 20px;
}

.order-info,
.user-info {
  margin-bottom: 20px;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

.item {
  background: #f9f9f9;
  padding: 0.5em;
  border-radius: 8px;
}

.item p {
  margin: 4px 0;
  color: #333;
}

.item strong {
  color: #1e3a5f;
}

.empty-message {
  text-align: center;
  color: #777;
  font-size: 1.2rem;
  margin-top: 30px;
}
</style>
