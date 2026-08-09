<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { updateProduct, getProductById } from '../../api/sellerProductApi'
import type { ProductResponse, ProductUpdateRequest } from '../../api/productTypes'

type ProductForm = Omit<ProductResponse, 'mainImageUrl'> & {
    mainImageUrl: string
}

// const updateProductId = ref<number>(1)
const emit = defineEmits<{
    saved: [product: ProductResponse]
    cancel: []
}>()

const props = defineProps<{
    updateProductId: number
}>()

const createEmptyForm = (): ProductForm => ({
    id: 0,
    sellerId: 1,
    name: '',
    categoryName: '',
    price: 0,
    stock: 0,
    minOrderQuantity: 1,
    mainImageUrl: '', // 新增 mainImageUrl 字段
    status: '',
    auditStatus: '',
})

const form = reactive<ProductForm>(createEmptyForm())
const originalForm = reactive<ProductForm>(createEmptyForm()) // 用于存储原始表单数据

const saving = ref(false)
const savedProduct = ref<ProductResponse | null>(null)
const errorMessage = ref('')

function getUpdateFields(): ProductUpdateRequest {
    const updateFields: ProductUpdateRequest = {}

    if (form.name !== originalForm.name) {
        updateFields.name = form.name
    }

    if (form.categoryName !== originalForm.categoryName) {
        updateFields.categoryName = form.categoryName
    }

    if (form.price !== originalForm.price) {
        updateFields.price = form.price
    }

    if (form.stock !== originalForm.stock) {
        updateFields.stock = form.stock
    }

    if (form.minOrderQuantity !== originalForm.minOrderQuantity) {
        updateFields.minOrderQuantity = form.minOrderQuantity
    }

    if (
        form.mainImageUrl !== originalForm.mainImageUrl &&
        form.mainImageUrl.trim() !== ''
    ) {
        updateFields.mainImageUrl = form.mainImageUrl
    }

    return updateFields
}

function initializeForms(product: ProductResponse) {
    const initialForm: ProductForm = {
        ...product,
        mainImageUrl: product.mainImageUrl ?? '',
    }

    Object.assign(form, initialForm)
    Object.assign(originalForm, structuredClone(initialForm))
}

async function handleSubmit() {
    saving.value = true
    errorMessage.value = ''
    savedProduct.value = null
    const updateFields = getUpdateFields()

    try {
        savedProduct.value = await updateProduct(props.updateProductId, updateFields)
        emit('saved', savedProduct.value)
    } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : '商品保存失败'
    } finally {
        saving.value = false
    }
}
onMounted(async () => {
  try {
    const product = await getProductById(props.updateProductId)
    initializeForms(product)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '商品详情获取失败'
  }
})
</script>

<template>
  <section class="product-update">
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

      <label>
        商品状态
        <input v-model="form.status" type="text" disabled />
      </label>

      <label>
        审核状态
        <input v-model="form.auditStatus" type="text" disabled />
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
