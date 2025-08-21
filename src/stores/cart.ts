import { defineStore } from 'pinia'
import type { Product } from '@/types/Product'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Product[],
  }),
  actions: {
    addToCart(product: Product) {
      this.items.push(product)
    },
    removeFromCart(productId: number) {
      const index = this.items.findIndex((item) => item.id === productId)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },
    clearCart() {
      this.items = []
    },
  },
  getters: {
    itemCount: (state) => state.items.length,
    totalPrice: (state) => parseFloat(state.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)),
    getItems: (state) => state.items,
  },
  persist: {
    storage: localStorage,
  },
})
