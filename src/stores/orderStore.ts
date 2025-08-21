import { defineStore } from 'pinia'
import axios from 'axios'
import type { CreateOrder, Order } from '@/types/Order'

export const useOrderStore = defineStore('order', {
  state: () => ({
    order: null as Order | null,
  }),

  actions: {
    async loadOrder(orderId: string) {
      try {
        const response = await axios.get<Order>(`http://localhost:3000/orders/${orderId}`)
        this.order = response.data
        console.log('Fetched order:', this.order)
      } catch (error) {
        console.error('Error fetching order details:', error)
      }
    },

    async postOrder(order: CreateOrder): Promise<Order | null> {
      try {
        const response = await axios.post<Order>('http://localhost:3000/orders', order)
        return response.data
      } catch (error) {
        console.error('Error adding order:', error)
        return null
      }
    },
  },
})
