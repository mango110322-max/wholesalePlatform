# D2_Frontend_Backend_Architecture

## 文档定位

本文件用于记录当前项目中买家端、卖家端、管理端围绕 `product` 商品表形成的前后端协作关系。

当前阶段已经跑通的主链路是：

```text
卖家新增商品
  -> 管理端审核商品
  -> 卖家上架商品
  -> 买家端展示可见商品
```

这份文档重点帮助理解：

- 页面在前端哪个文件里。
- 前端通过哪个 API 文件请求后端。
- 后端由哪个 Controller 接收请求。
- Service 放了哪些业务规则。
- Mapper 如何读写 `product` 表。
- 商品状态如何影响三端展示。

## 当前整体结构

```text
Vue 页面
  ↓ 调用
前端 api 文件
  ↓ HTTP / JSON
Spring Boot Controller
  ↓ 调用
ProductService 业务层
  ↓ 调用
ProductMapper 数据库层
  ↓ SQL
MySQL product 表
```

## 前端页面结构

| 路由 | 页面文件 | 使用端 | 作用 |
| --- | --- | --- | --- |
| `/` | `development/frontend-vue/src/pages/Home.vue` | 角色入口 | 选择买家、卖家或管理员工作台 |
| `/seller/products` | `development/frontend-vue/src/pages/seller/ProductList.vue` | 卖家端 | 查看商品、打开新增商品弹窗、上架商品 |
| `/seller/products` 内部弹窗 | `development/frontend-vue/src/pages/seller/ProductCreate.vue` | 卖家端 | 填写商品基础信息并提交保存 |
| `/admin` | `development/frontend-vue/src/pages/admin/AdminHome.vue` | 管理端 | 查看待审核商品，并执行通过或拒绝 |
| `/buyer/products` | `development/frontend-vue/src/pages/buyer/BuyerProductList.vue` | 买家端 | 查看已审核、已上架、有库存的商品 |

路由入口：

```text
development/frontend-vue/src/router/index.ts
```

## 前端 API 分层

| 文件 | 使用端 | 作用 |
| --- | --- | --- |
| `development/frontend-vue/src/api/sellerProductApi.ts` | 卖家端 | 新增商品、查询卖家商品、上架商品 |
| `development/frontend-vue/src/api/adminProductApi.ts` | 管理端 | 查询管理端商品、审核通过、审核拒绝 |
| `development/frontend-vue/src/api/buyerProductApi.ts` | 买家端 | 查询买家可见商品 |
| `development/frontend-vue/src/api/productTypes.ts` | 三端共用 | 定义商品请求和响应类型 |
| `development/frontend-vue/src/api/apiConfig.ts` | 三端共用 | 定义后端基础地址 |
| `development/frontend-vue/src/api/queryString.ts` | 三端共用 | 拼接查询参数 |

当前前端没有直接在页面里写后端地址，而是把请求封装在 API 文件中。这样页面主要负责展示和交互，API 文件负责和后端通信。

## 后端分层

| 文件 | 层级 | 作用 |
| --- | --- | --- |
| `development/backend/src/main/java/com/wholesaleplatform/controller/SellerProductController.java` | Controller | 卖家端商品接口入口 |
| `development/backend/src/main/java/com/wholesaleplatform/controller/AdminProductController.java` | Controller | 管理端商品审核接口入口 |
| `development/backend/src/main/java/com/wholesaleplatform/controller/BuyerProductController.java` | Controller | 买家端商品展示接口入口 |
| `development/backend/src/main/java/com/wholesaleplatform/service/ProductService.java` | Service | 商品业务规则，例如默认状态、审核后才能上架、买家可见商品查询 |
| `development/backend/src/main/java/com/wholesaleplatform/mapper/ProductMapper.java` | Mapper | 执行 `product` 表的新增、查询、更新 SQL |
| `development/backend/src/main/java/com/wholesaleplatform/entity/Product.java` | Entity | 对应 MySQL `product` 表的一行数据 |
| `development/backend/src/main/java/com/wholesaleplatform/dto/ProductCreateRequest.java` | DTO | 卖家新增商品时提交的数据 |
| `development/backend/src/main/java/com/wholesaleplatform/dto/ProductResponse.java` | DTO | 后端返回给前端的商品数据 |
| `development/backend/src/main/java/com/wholesaleplatform/dto/ProductAuditRequest.java` | DTO | 管理端审核商品时提交的审核状态 |
| `development/backend/src/main/java/com/wholesaleplatform/dto/ProductStatusRequest.java` | DTO | 卖家修改商品上下架状态时提交的状态 |

## 当前接口清单

| 使用端 | 接口 | 方法 | 前端函数 | 后端入口 | 作用 |
| --- | --- | --- | --- | --- | --- |
| 卖家端 | `/api/seller/products` | `POST` | `createProduct()` | `SellerProductController.createProduct()` | 新增商品 |
| 卖家端 | `/api/seller/products` | `GET` | `getSellerProductList()` | `SellerProductController.getProductList()` | 查询卖家商品列表 |
| 卖家端 | `/api/seller/products/{productId}/status` | `PATCH` | `publishProduct()` | `SellerProductController.updateProductStatus()` | 修改商品上下架状态 |
| 管理端 | `/api/admin/products?auditStatus=PENDING` | `GET` | `getAdminProductList()` | `AdminProductController.getProductList()` | 查询待审核商品 |
| 管理端 | `/api/admin/products/{productId}/audit` | `PATCH` | `approveProduct()` / `rejectProduct()` | `AdminProductController.auditProduct()` | 审核通过或拒绝商品 |
| 买家端 | `/api/buyer/products` | `GET` | `getBuyerProductList()` | `BuyerProductController.getVisibleProductList()` | 查询买家可见商品 |

## 数据对象关系

```text
ProductCreateRequest
  卖家新增商品时提交的数据
  包含 sellerId、name、categoryName、price、stock、minOrderQuantity

Product
  后端内部使用的商品对象
  对应 product 表的一行数据

ProductResponse
  后端返回给前端的数据
  包含商品基础字段、status、auditStatus

ProductAuditRequest
  管理端审核时提交 auditStatus

ProductStatusRequest
  卖家端修改上下架状态时提交 status
```

## 商品新增链路

```text
ProductCreate.vue 表单
  ↓
sellerProductApi.createProduct()
  ↓
POST /api/seller/products
  ↓
SellerProductController.createProduct()
  ↓
ProductService.createProduct()
  ↓
补默认状态：status = DRAFT, auditStatus = PENDING
  ↓
ProductMapper.insert()
  ↓
MySQL product 表新增一行
  ↓
返回 ProductResponse 给前端
```

## 管理端审核链路

```text
AdminHome.vue 页面加载
  ↓
adminProductApi.getAdminProductList({ auditStatus: 'PENDING' })
  ↓
GET /api/admin/products?auditStatus=PENDING
  ↓
AdminProductController.getProductList()
  ↓
ProductService.getProductList()
  ↓
ProductMapper.findByCondition()
  ↓
返回待审核商品列表
```

审核按钮链路：

```text
点击“通过”或“拒绝”
  ↓
adminProductApi.approveProduct() / rejectProduct()
  ↓
PATCH /api/admin/products/{productId}/audit
  ↓
AdminProductController.auditProduct()
  ↓
ProductService.auditProduct()
  ↓
ProductMapper.updateAuditStatus()
  ↓
重新查询商品并返回 ProductResponse
  ↓
管理端刷新待审核商品列表
```

## 卖家上架链路

```text
ProductList.vue 点击“上架”
  ↓
sellerProductApi.publishProduct()
  ↓
PATCH /api/seller/products/{productId}/status
  ↓
SellerProductController.updateProductStatus()
  ↓
ProductService.updateProductStatus()
  ↓
判断 auditStatus 是否为 APPROVED
  ↓
ProductMapper.updateStatus()
  ↓
重新查询商品并返回 ProductResponse
```

关键规则：

| 规则 | 当前实现 |
| --- | --- |
| 审核未通过能否上架 | 不能 |
| 审核通过后是否自动上架 | 不自动上架 |
| 谁触发上架 | 卖家手动点击上架 |

## 买家商品展示链路

```text
BuyerProductList.vue 页面加载
  ↓
buyerProductApi.getBuyerProductList()
  ↓
GET /api/buyer/products
  ↓
BuyerProductController.getVisibleProductList()
  ↓
ProductService.getBuyerVisibleProductList()
  ↓
ProductMapper.findBuyerVisibleProducts()
  ↓
只查询 status = ON_SHELF、audit_status = APPROVED、stock > 0 的商品
  ↓
返回 ProductResponse[] 给买家端展示
```

买家端可见条件：

| 字段 | 条件 |
| --- | --- |
| `status` | `ON_SHELF` |
| `audit_status` | `APPROVED` |
| `stock` | 大于 `0` |

## 数据库文件

| 文件 / 对象 | 作用 |
| --- | --- |
| `development/database/init.sql` | 建库建表脚本 |
| `development/database/sample-data.sql` | 测试商品数据 |
| `development/database/tables.md` | 当前表结构说明 |
| MySQL `product` 表 | 保存商品基础信息、状态和审核状态 |

## 当前架构理解重点

| 问题 | 当前答案 |
| --- | --- |
| 页面是否直接操作数据库 | 不直接操作，页面只调前端 API |
| 前端 API 是否写业务规则 | 尽量不写，只负责请求后端 |
| Controller 是否直接写 SQL | 不写，只接收请求并调用 Service |
| Service 负责什么 | 业务规则和流程组织 |
| Mapper 负责什么 | 数据库 SQL |
| 买家端为什么看不到待审核商品 | 后端查询时已经过滤掉 |

## 下一阶段可能变化

商品图片能力加入后，这条链路会新增字段：

```text
main_image_url
```

它会影响：

- `product` 表字段。
- `Product` Entity。
- `ProductCreateRequest`。
- `ProductResponse`。
- `ProductMapper` 的 insert / select SQL。
- 卖家新增商品表单。
- 卖家、管理端、买家端列表展示。
