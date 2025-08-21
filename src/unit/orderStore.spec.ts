import { createPinia, setActivePinia } from 'pinia'
import { describe, beforeEach, it, expect, vi } from 'vitest'
import { useOrderStore } from '../stores/orderStore'
import type { CreateOrder, Order } from '@/types/Order'
import axios from 'axios'

// Mock axios
vi.mock('axios')

describe('Order Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  const mockCreateOrder: CreateOrder = {
    userId: 1,
    userName: 'Test User',
    items: [
      {
        title: 'Test Product',
        productId: 1,
        quantity: 2,
        price: 100,
      },
    ],
    totalPrice: 200,
  }

  const mockOrder: Order = {
    ...mockCreateOrder,
    id: 123,
  }

  it('starts with null order', () => {
    const store = useOrderStore()
    expect(store.order).toBeNull()
  })

  it('can load an order successfully', async () => {
    const store = useOrderStore()

    // Mock the axios get request
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: mockOrder,
    })

    await store.loadOrder('123')

    // Verify axios was called with correct URL
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/orders/123')

    // Verify the order was stored
    expect(store.order).toEqual(mockOrder)
  })

  it('handles loadOrder error gracefully', async () => {
    const store = useOrderStore()
    const consoleSpy = vi.spyOn(console, 'error')

    // Mock a failed request
    vi.mocked(axios.get).mockRejectedValueOnce(new Error('API Error'))

    await store.loadOrder('123')

    // Verify error was logged
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching order details:', expect.any(Error))

    // Verify the store state remains unchanged
    expect(store.order).toBeNull()
  })

  it('can post a new order successfully', async () => {
    const store = useOrderStore()

    // Mock the axios post request
    vi.mocked(axios.post).mockResolvedValueOnce({
      data: mockOrder,
    })

    const result = await store.postOrder(mockCreateOrder)

    // Verify axios was called with correct URL and data
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/orders', mockCreateOrder)

    // Verify the returned order matches
    expect(result).toEqual(mockOrder)
  })

  it('handles postOrder error gracefully', async () => {
    const store = useOrderStore()
    const consoleSpy = vi.spyOn(console, 'error')

    // Mock a failed request
    vi.mocked(axios.post).mockRejectedValueOnce(new Error('API Error'))

    const result = await store.postOrder(mockCreateOrder)

    // Verify error was logged
    expect(consoleSpy).toHaveBeenCalledWith('Error adding order:', expect.any(Error))

    // Verify null is returned on error
    expect(result).toBeNull()
  })
})
