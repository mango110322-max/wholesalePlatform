<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getSellerProductList, publishProduct } from '../../api/sellerProductApi'
import type { ProductResponse } from '../../api/productTypes'
import ProductCreate from './ProductCreate.vue'

const products = ref<ProductResponse[]>([])
const loading = ref(false)
const errorMessage = ref('')
const showCreateDialog = ref(false)

async function refreshProductList() {
  loading.value = true
  errorMessage.value = ''

  try {
    products.value = await getSellerProductList()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '商品列表获取失败'
  } finally {
    loading.value = false
  }
}

async function handleProductSaved(product: ProductResponse) {
  console.log('Product saved:', product.name)

  showCreateDialog.value = false
  await refreshProductList()
}

async function handlePublishProduct(productId: number) {
  loading.value = true
  errorMessage.value = ''

  try {
    await publishProduct(productId)
    await refreshProductList()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '商品上架失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  refreshProductList()
})
</script>

<template>
  <main class="page">
    <section class="toolbar">
      <h1>商品管理</h1>
      <div class="toolbar-actions">
        <button class="secondary" type="button" @click="refreshProductList" :disabled="loading">
          {{ loading ? '刷新中...' : '刷新列表' }}
        </button>
        <button type="button" @click="showCreateDialog = true">
          添加商品
        </button>
      </div>
    </section>

    <section class="table-section">
      <p v-if="errorMessage" class="message error">{{ errorMessage }}</p>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>商品图</th>
            <th>商品名称</th>
            <th>类目</th>
            <th>价格</th>
            <th>库存</th>
            <th>起批量</th>
            <th>商品状态</th>
            <th>审核状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="products.length === 0">
            <td colspan="10" class="empty">暂无商品</td>
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
            <td>{{ product.categoryName }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.minOrderQuantity }}</td>
            <td>{{ product.status }}</td>
            <td>{{ product.auditStatus }}</td>
            <td>
              <button
                v-if="product.auditStatus === 'APPROVED' && product.status !== 'ON_SHELF'"
                class="publish"
                type="button"
                :disabled="loading"
                @click="handlePublishProduct(product.id)"
              >
                上架
              </button>
              <span v-else class="muted">-</span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <div v-if="showCreateDialog" class="dialog-mask">
      <section class="dialog">
        <header class="dialog-header">
          <h2>添加商品</h2>
          <button class="icon-button" type="button" @click="showCreateDialog = false">
            x
          </button>
        </header>
        <ProductCreate
          @saved="handleProductSaved"
          @cancel="showCreateDialog = false"
        />
      </section>
    </div>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 32px;
  background: #f6f7f9;
  color: #111827;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-width: 1120px;
  margin: 0 auto 16px;
}

h1,
h2 {
  margin: 0;
}

h1 {
  font-size: 24px;
}

h2 {
  font-size: 18px;
}

.toolbar-actions {
  display: flex;
  gap: 12px;
}

button {
  height: 38px;
  padding: 0 16px;
  border: 0;
  border-radius: 6px;
  background: #1677ff;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
}

.secondary {
  background: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
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

.publish {
  background: #16a34a;
}

.muted {
  color: #9ca3af;
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

.dialog-mask {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgb(17 24 39 / 52%);
}

.dialog {
  width: min(720px, 100%);
  max-height: calc(100vh - 48px);
  overflow: auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.icon-button {
  width: 32px;
  height: 32px;
  padding: 0;
  background: #f3f4f6;
  color: #374151;
}
</style>
