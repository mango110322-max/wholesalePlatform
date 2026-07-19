export type ProductCreateRequest = {
  sellerId: number
  name: string
  categoryName: string
  price: number
  stock: number
  minOrderQuantity: number
  mainImageUrl: string | null
}

export type ProductResponse = ProductCreateRequest & {
  id: number
  status: string
  auditStatus: string
}

export type ProductQuery = {
  status?: string
  auditStatus?: string
}
