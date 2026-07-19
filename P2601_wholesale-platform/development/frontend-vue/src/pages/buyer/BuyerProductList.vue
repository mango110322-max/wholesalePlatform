<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getBuyerProductList } from '../../api/buyerProductApi'
import type { ProductResponse } from '../../api/productTypes'

const categories = ['Women', 'Men', 'Kid']
const products = ref<ProductResponse[]>([])
const loading = ref(false)
const errorMessage = ref('')
const failedImageIds = ref(new Set<number>())

function handleImageError(productId: number) {
  failedImageIds.value = new Set(failedImageIds.value).add(productId)
}

async function refreshProducts() {
  loading.value = true
  errorMessage.value = ''

  try {
    products.value = await getBuyerProductList()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '商品列表获取失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  refreshProducts()
})
</script>

<template>
  <main class="buyer-page">
    <nav class="category-bar">
      <button
        v-for="category in categories"
        :key="category"
        class="category-button"
        type="button"
      >
        {{ category }}
      </button>
    </nav>

    <section class="product-section">
      <header class="section-header">
        <h1>商品列表</h1>
        <button type="button" @click="refreshProducts" :disabled="loading">
          {{ loading ? '刷新中...' : '刷新列表' }}
        </button>
      </header>

      <p v-if="errorMessage" class="message error">{{ errorMessage }}</p>

      <div v-if="products.length === 0" class="empty">
        暂无可展示商品
      </div>

      <div v-else class="product-list">
        <article v-for="product in products" :key="product.id" class="product-item">
          <div class="product-media">
            <img
              v-if="product.mainImageUrl && !failedImageIds.has(product.id)"
              class="product-image"
              :src="product.mainImageUrl"
              :alt="product.name"
              @error="handleImageError(product.id)"
            />
            <span v-else class="image-placeholder">暂无图片</span>
          </div>

          <div class="product-content">
            <h2>{{ product.name }}</h2>
            <dl>
              <div>
                <dt>价格</dt>
                <dd>{{ product.price }}</dd>
              </div>
              <div>
                <dt>库存</dt>
                <dd>{{ product.stock }}</dd>
              </div>
              <div>
                <dt>起批量</dt>
                <dd>{{ product.minOrderQuantity }}</dd>
              </div>
            </dl>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.buyer-page {
  min-height: 100vh;
  padding: 28px 32px;
  background: #f6f7f9;
  color: #111827;
  color-scheme: light;
}

.category-bar {
  display: flex;
  justify-content: center;
  gap: 12px;
  max-width: 1120px;
  margin: 0 auto 24px;
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

.category-button {
  min-width: 96px;
  background: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
}

.product-section {
  max-width: 1120px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

h1 {
  margin: 0;
  color: #111827;
  font-size: 24px;
  font-weight: 600;
}

.message {
  margin: 16px 0;
}

.error {
  color: #b42318;
}

.empty {
  padding: 48px 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #6b7280;
  text-align: center;
}

.product-list {
  display: grid;
  gap: 12px;
}

.product-item {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  min-height: 168px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.product-media {
  position: relative;
  display: grid;
  min-height: 168px;
  place-items: center;
  overflow: hidden;
  background: #eef1f4;
  border-right: 1px solid #e5e7eb;
}

.product-image {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  color: #8a94a3;
  font-size: 13px;
}

.product-content {
  display: flex;
  min-width: 0;
  padding: 22px 24px;
  flex-direction: column;
  justify-content: center;
}

h2 {
  margin: 0 0 14px;
  color: #111827;
  font-size: 18px;
  font-weight: 600;
}

dl {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
}

dt {
  color: #6b7280;
  font-size: 13px;
}

dd {
  margin: 4px 0 0;
  color: #111827;
  font-size: 15px;
}

@media (max-width: 640px) {
  .buyer-page {
    padding: 20px 16px;
  }

  .category-bar {
    flex-wrap: wrap;
  }

  .product-item {
    grid-template-columns: 112px minmax(0, 1fr);
  }

  .product-content {
    padding: 16px;
  }

  dl {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>
