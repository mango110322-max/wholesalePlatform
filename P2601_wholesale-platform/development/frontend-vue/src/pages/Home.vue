<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <main class="home-page">
    <section class="hero">
      <p class="eyebrow">Wholesale Platform</p>
      <h1>请选择进入的工作台</h1>
      <div class="actions">
        <button class="secondary" type="button" @click="router.push('/buyer/products')">
          我是买家
        </button>
        <button type="button" @click="router.push('/seller/products')">
          我是卖家
        </button>
        <button class="secondary" type="button" @click="router.push('/admin')">
          我是管理员
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
  background: #f6f7f9;
  color: #111827;
  color-scheme: light;
}

.hero {
  width: min(680px, 100%);
  text-align: center;
}

.eyebrow {
  margin-bottom: 12px;
  color: #6b7280;
  font-size: 14px;
}

h1 {
  margin: 0 0 28px;
  color: #111827;
  font-size: 32px;
  font-weight: 600;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

button {
  height: 42px;
  padding: 0 22px;
  border: 0;
  border-radius: 6px;
  background: #1677ff;
  color: #ffffff;
  font-size: 15px;
  cursor: pointer;
}

.secondary {
  background: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
}
</style>
