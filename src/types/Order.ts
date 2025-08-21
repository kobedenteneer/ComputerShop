export type CreateOrder = {
  userId: number | undefined
  userName: string
  items: {
    title: string
    productId: number
    quantity: number
    price: number
  }[]
  totalPrice: number
}

export type Order = CreateOrder & {
  id: number
}
