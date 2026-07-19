<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  approveProduct,
  getAdminProductList,
  rejectProduct,
} from '../../api/adminProductApi'
import type { ProductResponse } from '../../api/productTypes'

const products = ref<ProductResponse[]>([])
const loading = ref(false)
const errorMessage = ref('')

async function refreshPendingProducts() {
  loading.value = true
  errorMessage.value = ''

  try {
    products.value = await getAdminProductList({ auditStatus: 'PENDING' })
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '待审核商品获取失败'
  } finally {
    loading.value = false
  }
}

async function agreeProduct(productId: number) {
  loading.value = true
  errorMessage.value = ''

  try {
    await approveProduct(productId)
    await refreshPendingProducts()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '商品审核通过失败'
  } finally {
    loading.value = false
  }
}

async function refuseProduct(productId: number) {
  loading.value = true
  errorMessage.value = ''

  try {
    await rejectProduct(productId)
    await refreshPendingProducts()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '商品审核拒绝失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  refreshPendingProducts()
})
</script>

<template>
  <main class="admin-page">
    <section class="toolbar">
      <div>
        <h1>商品审核</h1>
        <p>待审核商品</p>
      </div>
      <button type="button" @click="refreshPendingProducts" :disabled="loading">
        {{ loading ? '刷新中...' : '刷新列表' }}
      </button>
    </section>

    <section class="table-section">
      <p v-if="errorMessage" class="message error">{{ errorMessage }}</p>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>商品图</th>
            <th>商品名称</th>
            <th>卖家 ID</th>
            <th>类目</th>
            <th>价格</th>
            <th>库存</th>
            <th>起批量</th>
            <th>审核状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="products.length === 0">
            <td colspan="10" class="empty">暂无待审核商品</td>
          </tr>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>
              <img
                v-if="product.mainImageUrl"
                class="product-thumbnail"
                :src="product.mainImageUrl"
                :alt="product.name"
              />
              <span v-else class="image-placeholder">暂无图片</span>
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.sellerId }}</td>
            <td>{{ product.categoryName }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.minOrderQuantity }}</td>
            <td>{{ product.auditStatus }}</td>
            <td>
              <div class="row-actions">
                <button
                  class="approve"
                  type="button"
                  :disabled="loading"
                  @click="agreeProduct(product.id)"
                >
                  通过
                </button>
                <button
                  class="reject"
                  type="button"
                  :disabled="loading"
                  @click="refuseProduct(product.id)"
                >
                  拒绝
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<style scoped>
.admin-page {
  min-height: 100vh;
  padding: 32px;
  background: #f6f7f9;
  color: #111827;
  color-scheme: light;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-width: 1120px;
  margin: 0 auto 16px;
}

h1 {
  margin: 0 0 6px;
  color: #111827;
  font-size: 24px;
  font-weight: 600;
}

p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

button {
  height: 36px;
  padding: 0 14px;
  border: 0;
  border-radius: 6px;
  background: #1677ff;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
}

button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.table-section {
  max-width: 1120px;
  margin: 0 auto;
  overflow-x: auto;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px 14px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
  font-size: 14px;
  white-space: nowrap;
}

th {
  background: #f9fafb;
  color: #4b5563;
  font-weight: 600;
}

tbody tr:last-child td {
  border-bottom: 0;
}

.empty {
  height: 96px;
  color: #6b7280;
  text-align: center;
}

.message {
  margin: 16px;
}

.error {
  color: #b42318;
}

.row-actions {
  display: flex;
  gap: 8px;
}

.approve {
  background: #16a34a;
}

.reject {
  background: #dc2626;
}

.product-thumbnail {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 4px;
  object-fit: cover;
}

.image-placeholder {
  color: #9ca3af;
  font-size: 12px;
}
</style>
