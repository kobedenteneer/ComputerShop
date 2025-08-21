import type { Product } from '@/types/Product'

export interface Sorter {
  title: string
  value(products: Product[]): Product[]
}
