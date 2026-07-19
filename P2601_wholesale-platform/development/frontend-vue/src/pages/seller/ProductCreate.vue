<script setup lang="ts">
import { reactive, ref } from 'vue'
import { createProduct } from '../../api/sellerProductApi'
import type { ProductResponse } from '../../api/productTypes'

const emit = defineEmits<{
  saved: [product: ProductResponse]
  cancel: []
}>()

const form = reactive({
  sellerId: 1,
  name: '',
  categoryName: '',
  price: 0,
  stock: 0,
  minOrderQuantity: 1,
  mainImageUrl: '', // 新增 mainImageUrl 字段
})

const saving = ref(false)
const savedProduct = ref<ProductResponse | null>(null)
const errorMessage = ref('')

function resetForm() {
  form.sellerId = 1
  form.name = ''
  form.categoryName = ''
  form.price = 0
  form.stock = 0
  form.minOrderQuantity = 1
  form.mainImageUrl = '' 
}

async function handleSubmit() {
  saving.value = true
  errorMessage.value = ''
  savedProduct.value = null

  try {
    savedProduct.value = await createProduct({
      sellerId: form.sellerId,
      name: form.name,
      categoryName: form.categoryName,
      price: form.price,
      stock: form.stock,
      minOrderQuantity: form.minOrderQuantity,
      mainImageUrl: form.mainImageUrl, 
    })
    emit('saved', savedProduct.value)
    resetForm()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '商品保存失败'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <section class="product-create">
    <form class="product-form" @submit.prevent="handleSubmit">
      <label>
        卖家 ID
        <input v-model.number="form.sellerId" type="number" min="1" />
      </label>

      <label>
        商品名称
        <input v-model="form.name" type="text" placeholder="例如：测试商品-前端页面新增-衬衫" />
      </label>

      <label>
        类目名称
        <input v-model="form.categoryName" type="text" placeholder="例如：外套" />
      </label>

      <label>
        价格
        <input v-model.number="form.price" type="number" min="0" step="0.01" />
      </label>

      <label>
        库存
        <input v-model.number="form.stock" type="number" min="0" />
      </label>

      <label>
        起批量
        <input v-model.number="form.minOrderQuantity" type="number" min="1" />
      </label>

      <label>
        商品图
        <input v-model="form.mainImageUrl" type="text" placeholder="请输入该商品图的链接" />
      </label>

      <div class="actions">
        <button class="secondary" type="button" @click="emit('cancel')">
          取消
        </button>
        <button type="submit" :disabled="saving">
          {{ saving ? '保存中...' : '保存商品' }}
        </button>
      </div>
    </form>

    <p v-if="errorMessage" class="message error">{{ errorMessage }}</p>
  </section>
</template>

<style scoped>
.product-form {
  display: grid;
  gap: 16px;
}

label {
  display: grid;
  gap: 8px;
  font-size: 14px;
  color: #374151;
}

input {
  height: 38px;
  padding: 0 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

button {
  height: 40px;
  padding: 0 18px;
  border: 0;
  border-radius: 6px;
  background: #1677ff;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
}

.secondary {
  background: #f3f4f6;
  color: #374151;
}

button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.message {
  margin-top: 16px;
}

.error {
  color: #b42318;
}
</style>
