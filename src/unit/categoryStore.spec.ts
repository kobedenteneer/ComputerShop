import { createPinia, setActivePinia } from 'pinia'
import { describe, beforeEach, it, expect, vi } from 'vitest'
import { useCategoryStore } from '../stores/categoryStore'
import axios from 'axios'

// Mock axios
vi.mock('axios')

describe('Category Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  const mockCategories = [
    { id: 1, name: 'Laptops' },
    { id: 2, name: 'Desktops' },
  ]

  it('starts with an empty category list', () => {
    const store = useCategoryStore()
    expect(store.categoryList).toHaveLength(0)
  })

  it('can retrieve categories from API', async () => {
    const store = useCategoryStore()

    // Mock the axios get request
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: mockCategories,
    })

    await store.retrieveCategories()

    // Verify axios was called with correct URL
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/categories')

    // Verify the categories were stored
    expect(store.categoryList).toEqual(mockCategories)
    expect(store.categoryList).toHaveLength(2)
  })

  it('handles API errors gracefully', async () => {
    const store = useCategoryStore()

    // Mock a failed request
    vi.mocked(axios.get).mockRejectedValueOnce(new Error('API Error'))

    // Ensure the error doesn't crash our app
    await expect(store.retrieveCategories()).rejects.toThrow('API Error')

    // Verify the store state remains unchanged
    expect(store.categoryList).toHaveLength(0)
  })
})
