import { defineStore } from 'pinia'

import type { Product, ProductStoreState } from '@/types/Product.ts'
import type { Review } from '@/types/Review'

import axios, { type AxiosResponse } from 'axios'
import deepEqual from 'deep-equal'

export const useProductStore = defineStore('products', {
  state: (): ProductStoreState => {
    return {
      productList: [],
      product: null,
    }
  },
  actions: {
    async createProduct(productData: object): Promise<Product> {
      const createProductRequest: AxiosResponse = await axios.post(
        'http://localhost:3000/products',
        productData,
      )
      const createdProduct: Product = createProductRequest.data

      this.productList.push(createdProduct)
      return createdProduct
    },
    async retrieveProducts(): Promise<boolean> {
      const retrieveProductsRequest: AxiosResponse = await axios.get(
        'http://localhost:3000/products',
      )

      const retrievedProducts: Product[] = retrieveProductsRequest.data
      for (let i = 0; i < retrievedProducts.length; i++) {
        this.addProduct(retrievedProducts[i])
      }

      return true
    },
    async retrieveProduct(productId: number): Promise<Product> {
      const retrieveProductRequest: AxiosResponse = await axios.get(
        `http://localhost:3000/products?id=${productId}`,
      )

      const retrieved: Product = retrieveProductRequest.data[0]
      this.addProduct(retrieved)

      return retrieved
    },
    async updateProduct(product: Product): Promise<Product> {
      const updateProductRequest: AxiosResponse = await axios.put(
        `http://localhost:3000/products/${product.id}`,
        JSON.stringify(product),
      )

      const updated: Product = updateProductRequest.data
      this.replaceProduct(await this.retrieveProduct(product.id), updated)

      return updated
    },
    async updateReviewsForProduct(productId: number, review: Review): Promise<Product> {
      const storedProduct = this.productList.find((p) => p.id === productId)
      if (!storedProduct) throw 'Product was somehow not in cache'

      const highestId = Math.max(...storedProduct.reviews.map((r) => r.id), 0)
      review.id = highestId + 1

      storedProduct.reviews.push(review)

      const patchProductRequest: AxiosResponse = await axios.patch(
        `http://localhost:3000/products/${productId}`,
        JSON.stringify({ reviews: storedProduct.reviews }),
      )

      this.replaceProduct(storedProduct, patchProductRequest.data)

      return patchProductRequest.data
    },
    /**
     * Adds a product to the product list.
     * When a product with the same id already exists,
     * verify the equality and replace if needed.
     * @param product The product to add
     */
    addProduct(product: Product): void {
      const existing = this.productList.find((p) => p.id === product.id)

      if (!existing) {
        this.productList.push(product)
      } else if (!deepEqual(product, existing)) {
        this.replaceProduct(existing, product)
      }
    },
    /**
     * Replaces a product in the product list.
     * @param old The old product from the list
     * @param product The product to replace with
     */
    replaceProduct(old: Product, product: Product): void {
      const index = this.productList.indexOf(old)
      this.productList[index] = product
    },
  },
})
