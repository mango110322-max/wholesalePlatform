import { API_BASE_URL } from './apiConfig'
import { buildProductQueryString } from './queryString'
import type { ProductCreateRequest, ProductQuery, ProductResponse, ProductUpdateRequest } from './productTypes'

export async function createProduct(
  product: ProductCreateRequest,
): Promise<ProductResponse> {
  const response = await fetch(`${API_BASE_URL}/api/seller/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })

  if (!response.ok) {
    throw new Error('商品保存失败')
  }

  return response.json()
}

export async function getSellerProductList(
  query: ProductQuery = {},
): Promise<ProductResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/seller/products${buildProductQueryString(query)}`,
  )

  if (!response.ok) {
    throw new Error('商品列表获取失败')
  }

  return response.json()
}

export async function getProductById(productId: number): Promise<ProductResponse> {
  const response = await fetch(`${API_BASE_URL}/api/seller/products/${productId}`)

  if (!response.ok) {
    throw new Error('商品详情获取失败')
  }

  return response.json()
}

async function updateProductStatus(
  productId: number,
  status: 'ON_SHELF' | 'OFF_SHELF' | 'DRAFT',
): Promise<ProductResponse> {
  const response = await fetch(`${API_BASE_URL}/api/seller/products/${productId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
  })

  if (!response.ok) {
    throw new Error('商品状态更新失败')
  }

  return response.json()
}

export function publishProduct(productId: number): Promise<ProductResponse> {
  return updateProductStatus(productId, 'ON_SHELF')
}

// Function to update product details
export async function updateProduct(
  updateProductId: number,
  updateFields: ProductUpdateRequest,
): Promise<ProductResponse> {
  const response = await fetch(`${API_BASE_URL}/api/seller/products/${updateProductId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateFields),
  })

  if (!response.ok) {
    throw new Error('商品信息更新失败')
  }

  return response.json()
}
