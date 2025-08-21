import { createPinia, setActivePinia } from 'pinia'
import { describe, beforeEach, it, expect } from 'vitest'
import { useCartStore } from '../stores/cart'
import type { Product } from '@/types/Product'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'Test Description',
    images: ['test.jpg'],
    categoryId: 1,
    shipping_time: '',
    reorderLevel: 0,
    stock: 0,
    brand: '',
    reviews: [],
  }

  const mockProduct2: Product = {
    id: 2,
    title: 'Test Product 2',
    price: 200,
    description: 'Test Description 2',
    images: ['test2.jpg'],
    categoryId: 2,
    shipping_time: '',
    reorderLevel: 0,
    stock: 0,
    brand: '',
    reviews: [],
  }

  it('starts with an empty cart', () => {
    const cart = useCartStore()
    expect(cart.items).toHaveLength(0)
    expect(cart.itemCount).toBe(0)
    expect(cart.totalPrice).toBe(0)
  })

  it('can add items to cart', () => {
    const cart = useCartStore()
    cart.addToCart(mockProduct)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0]).toEqual(mockProduct)
    expect(cart.itemCount).toBe(1)
    expect(cart.totalPrice).toBe(100)
  })

  it('can remove items from cart', () => {
    const cart = useCartStore()
    cart.addToCart(mockProduct)
    cart.addToCart(mockProduct2)
    expect(cart.itemCount).toBe(2)

    cart.removeFromCart(mockProduct.id)
    expect(cart.itemCount).toBe(1)
    expect(cart.items[0]).toEqual(mockProduct2)
  })

  it('calculates total price correctly', () => {
    const cart = useCartStore()
    cart.addToCart(mockProduct)
    cart.addToCart(mockProduct2)
    expect(cart.totalPrice).toBe(300)
  })

  it('can clear the cart', () => {
    const cart = useCartStore()
    cart.addToCart(mockProduct)
    cart.addToCart(mockProduct2)
    expect(cart.itemCount).toBe(2)

    cart.clearCart()
    expect(cart.itemCount).toBe(0)
    expect(cart.items).toHaveLength(0)
    expect(cart.totalPrice).toBe(0)
  })

  it('returns all items through getItems getter', () => {
    const cart = useCartStore()
    cart.addToCart(mockProduct)
    cart.addToCart(mockProduct2)

    const items = cart.getItems
    expect(items).toHaveLength(2)
    expect(items).toEqual([mockProduct, mockProduct2])
  })
})
