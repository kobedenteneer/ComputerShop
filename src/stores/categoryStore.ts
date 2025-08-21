import { defineStore } from 'pinia'

import type { Category } from '@/types/Category.ts'
interface CategoryStoreState {
  categoryList: Category[]
}

import axios, { type AxiosResponse } from 'axios'

export const useCategoryStore = defineStore('categories', {
  state: (): CategoryStoreState => {
    return {
      categoryList: [],
    }
  },
  actions: {
    async retrieveCategories(): Promise<void> {
      const retrieveCategoryRequest: AxiosResponse = await axios.get(
        'http://localhost:3000/categories',
      )

      this.categoryList = retrieveCategoryRequest.data
    },
  },
})
