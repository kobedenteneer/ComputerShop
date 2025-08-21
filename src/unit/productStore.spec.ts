import { createPinia, setActivePinia } from 'pinia'
import { describe, beforeEach, it, expect, vi } from 'vitest'
import { useProductStore } from '../stores/productStore'
import type { Product } from '@/types/Product'
import type { Review } from '@/types/Review'
import axios from 'axios'

// Mock axios
vi.mock('axios')

describe('Product Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  const mockProduct: Product = {
    id: 1,
    categoryId: 1,
    title: 'Test Product',
    description: 'Test Description',
    images: ['test.jpg'],
    price: 100,
    shipping_time: '3-5 days',
    reorderLevel: 10,
    stock: 50,
    brand: 'Test Brand',
    reviews: [],
  }

  const mockProduct2: Product = {
    ...mockProduct,
    id: 2,
    title: 'Test Product 2',
  }

  const mockReview: Review = {
    id: 1,
    name: 'Test User',
    description: 'Great product!',
    rating: 5,
  }

  it('starts with empty product list and null product', () => {
    const store = useProductStore()
    expect(store.productList).toHaveLength(0)
    expect(store.product).toBeNull()
  })

  it('can create a product', async () => {
    const store = useProductStore()

    vi.mocked(axios.post).mockResolvedValueOnce({
      data: mockProduct,
    })

    const result = await store.createProduct(mockProduct)

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/products', mockProduct)
    expect(result).toEqual(mockProduct)
  })

  it('can retrieve all products', async () => {
    const store = useProductStore()

    vi.mocked(axios.get).mockResolvedValueOnce({
      data: [mockProduct, mockProduct2],
    })

    const result = await store.retrieveProducts()

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/products')
    expect(result).toBe(true)
    expect(store.productList).toHaveLength(2)
    expect(store.productList).toContainEqual(mockProduct)
    expect(store.productList).toContainEqual(mockProduct2)
  })

  it('can retrieve a single product', async () => {
    const store = useProductStore()

    vi.mocked(axios.get).mockResolvedValueOnce({
      data: [mockProduct],
    })

    const result = await store.retrieveProduct(1)

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/products?id=1')
    expect(result).toEqual(mockProduct)
    expect(store.productList).toContainEqual(mockProduct)
  })

  it('can update a product', async () => {
    const store = useProductStore()
    const updatedProduct = { ...mockProduct, title: 'Updated Title' }

    // First add the original product
    store.productList.push(mockProduct)

    vi.mocked(axios.put).mockResolvedValueOnce({
      data: updatedProduct,
    })
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: [updatedProduct],
    })

    const result = await store.updateProduct(updatedProduct)

    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:3000/products/1',
      JSON.stringify(updatedProduct),
    )
    expect(result).toEqual(updatedProduct)
    expect(store.productList[0]).toEqual(updatedProduct)
  })

  it('can update reviews for a product', async () => {
    const store = useProductStore()
    const productWithReview = { ...mockProduct, reviews: [mockReview] }

    // Add the product to the store first
    store.productList.push(mockProduct)

    vi.mocked(axios.patch).mockResolvedValueOnce({
      data: productWithReview,
    })

    const result = await store.updateReviewsForProduct(1, mockReview)

    expect(axios.patch).toHaveBeenCalledWith(
      'http://localhost:3000/products/1',
      JSON.stringify({ reviews: [mockReview] }),
    )
    expect(result).toEqual(productWithReview)
    expect(store.productList[0].reviews).toContainEqual(mockReview)
  })

  it('throws error when updating reviews for non-existent product', async () => {
    const store = useProductStore()

    await expect(store.updateReviewsForProduct(999, mockReview)).rejects.toBe(
      'Product was somehow not in cache',
    )
  })

  it('adds new product to list', () => {
    const store = useProductStore()
    store.addProduct(mockProduct)

    expect(store.productList).toContainEqual(mockProduct)
  })

  it('replaces existing product when adding with same id but different data', () => {
    const store = useProductStore()
    const updatedProduct = { ...mockProduct, title: 'Updated Title' }

    store.addProduct(mockProduct)
    store.addProduct(updatedProduct)

    expect(store.productList).toHaveLength(1)
    expect(store.productList[0]).toEqual(updatedProduct)
  })

  it('does not replace product when adding with same id and same data', () => {
    const store = useProductStore()

    store.addProduct(mockProduct)
    store.addProduct({ ...mockProduct })

    expect(store.productList).toHaveLength(1)
    expect(store.productList[0]).toEqual(mockProduct)
  })
})
