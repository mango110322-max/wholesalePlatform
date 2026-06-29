import type { ProductQuery } from './productTypes'

export function buildProductQueryString(query: ProductQuery = {}) {
  const params = new URLSearchParams()

  if (query.status) {
    params.set('status', query.status)
  }

  if (query.auditStatus) {
    params.set('auditStatus', query.auditStatus)
  }

  const queryString = params.toString()

  return queryString ? `?${queryString}` : ''
}
