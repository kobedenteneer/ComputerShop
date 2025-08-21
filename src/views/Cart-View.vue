<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/userStore'
import { useOrderStore } from '@/stores/orderStore'
import router from '@/router/router'
import type { CreateOrder, Order } from '@/types/Order'

const cart = useCartStore()
const userStore = useUserStore()
const orderStore = useOrderStore()
const cartItems = cart.getItems

function handleOrder() {
  const order: CreateOrder = {
    userId: userStore.userId,
    userName: userStore.username,
    items: cartItems.map((item) => ({
      title: item.title,
      productId: item.id,
      quantity: 1,
      price: item.price,
    })),
    totalPrice: cart.totalPrice,
  }

  orderStore.postOrder(order).then((createdOrder: Order | null) => {
    if (createdOrder) {
      router.push(`/order/${createdOrder.id}`)
    } else {
      console.error('Error: Created order is null.')
    }
  })

  cart.clearCart()
}
</script>

<template>
  <div class="cart-container">
    <div class="cart">
      <h3>Shopping Cart ({{ cart.itemCount }})</h3>
      <ul v-if="cart.itemCount > 0" class="cart-list">
        <li v-for="item in cart.items" :key="item.id" class="cart-item">
          <div class="item-details">
            <span class="item-title">{{ item.title }}</span>
            <span class="item-price">€{{ item.price }}</span>
          </div>
          <button class="remove-btn" @click="cart.removeFromCart(item.id)">Remove</button>
        </li>
      </ul>

      <p v-if="cart.itemCount > 0" class="total-price">Total: €{{ cart.totalPrice }}</p>

      <div class="cart-actions">
        <button v-if="cart.itemCount > 0" class="clear-btn" @click="cart.clearCart">
          Clear Cart
        </button>
        <button v-if="cart.itemCount > 0" class="checkout-btn" @click="handleOrder">
          Checkout
        </button>
      </div>

      <p v-if="cart.itemCount === 0" class="empty-cart">Your cart is empty.</p>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 70vh;
  background-color: #f4ecd8;
  padding: 20px;
}

.cart {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.cart-list {
  max-height: 300px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-list::-webkit-scrollbar {
  width: 8px;
}

.cart-list::-webkit-scrollbar-thumb {
  background-color: #1e3a5f;
  border-radius: 4px;
}

.cart-list::-webkit-scrollbar-track {
  background: #ddd;
}

.cart {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #1e3a5f;
}

.cart-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.item-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.item-title {
  font-weight: bold;
  color: #333;
}

.item-price {
  font-size: 0.9rem;
  color: #666;
}

.remove-btn {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
}

.remove-btn:hover {
  background: #cc0000;
}

.total-price {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
  color: #1e3a5f;
}

.cart-actions {
  margin-top: 20px;
}

.clear-btn {
  background: #fcc203;
  color: black;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}

.clear-btn:hover {
  background: #d4af37;
}

.empty-cart {
  font-size: 1.2rem;
  color: #777;
  margin-top: 20px;
}

.checkout-btn {
  background: #1e3a5f;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
  margin-left: 2em;
}

.checkout-btn:hover {
  background: #14263d;
}
</style>
