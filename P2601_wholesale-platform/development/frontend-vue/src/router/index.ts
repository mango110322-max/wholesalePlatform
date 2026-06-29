import { createRouter, createWebHistory } from 'vue-router'
import AdminHome from '../pages/admin/AdminHome.vue'
import BuyerProductList from '../pages/buyer/BuyerProductList.vue'
import Home from '../pages/Home.vue'
import ProductList from '../pages/seller/ProductList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/seller/products',
      component: ProductList,
    },
    {
      path: '/admin',
      component: AdminHome,
    },
    {
      path: '/buyer/products',
      component: BuyerProductList,
    },
  ],
})

export default router
