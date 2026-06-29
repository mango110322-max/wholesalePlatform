import { API_BASE_URL } from './apiConfig'
import { buildProductQueryString } from './queryString'
import type { ProductQuery, ProductResponse } from './productTypes'

export async function getAdminProductList(
  query: ProductQuery = {},
): Promise<ProductResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/products${buildProductQueryString(query)}`,
  )

  if (!response.ok) {
    throw new Error('管理端商品列表获取失败')
  }

  return response.json()
}

async function updateProductAuditStatus(
  productId: number,
  auditStatus: 'APPROVED' | 'REJECTED',
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/admin/products/${productId}/audit`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      auditStatus,
    }),
  })

  if (!response.ok) {
    throw new Error('商品审核状态更新失败')
  }
}

export function approveProduct(productId: number): Promise<void> {
  return updateProductAuditStatus(productId, 'APPROVED')
}

export function rejectProduct(productId: number): Promise<void> {
  return updateProductAuditStatus(productId, 'REJECTED')
}
