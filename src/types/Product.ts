import { type Review } from './Review'

export interface Product {
  id: number
  categoryId: number
  title: string
  description: string
  images: string[]
  price: number
  shipping_time: string
  reorderLevel: number
  stock: number
  brand: string
  reviews: Review[]
}

export interface ProductStoreState {
  productList: Product[]
  product: Product | null
}
