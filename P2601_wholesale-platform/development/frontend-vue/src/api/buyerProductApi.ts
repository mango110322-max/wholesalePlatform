import { API_BASE_URL } from './apiConfig'
import type { ProductResponse } from './productTypes'

export async function getBuyerProductList(): Promise<ProductResponse[]> {
  const response = await fetch(`${API_BASE_URL}/api/buyer/products`)

  if (!response.ok) {
    throw new Error('买家端商品列表获取失败')
  }

  return response.json()
}
