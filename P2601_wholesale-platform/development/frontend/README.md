# Frontend

## 模块定位

这里用于放置 Vue 前端工程。

第一阶段不拆三个独立前端项目，先在一个前端工程中用页面目录区分三端：

```text
src/pages/buyer/   买家端页面
src/pages/seller/  卖家端页面
src/pages/admin/   管理端页面
src/api/           调用后端接口的方法
```

第一条链路先做卖家端：

```text
src/pages/seller/ProductCreate.vue
src/pages/seller/ProductList.vue
```

等卖家端商品保存跑通后，再补买家端商品展示和管理端商品审核。
