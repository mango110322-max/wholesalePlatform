# Tables

## product 商品表

`product` 用于保存卖家发布的商品基础信息，是第一条最小链路中的核心表。

当前阶段先服务：

```text
卖家端新增商品 -> 后端保存商品 -> DBeaver 查看商品数据
```

### 字段说明

| 字段 | 类型 | 是否必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT` | 是 | 自增 | 商品 ID，主键 |
| `seller_id` | `BIGINT` | 是 | 无 | 卖家 ID，当前阶段可先用固定值 `1` |
| `name` | `VARCHAR(100)` | 是 | 无 | 商品名称 |
| `category_name` | `VARCHAR(50)` | 否 | `NULL` | 类目名称，当前阶段先用文本保存 |
| `price` | `DECIMAL(10,2)` | 是 | 无 | 商品价格 |
| `stock` | `INT` | 是 | 无 | 当前库存 |
| `min_order_quantity` | `INT` | 是 | 无 | 起批量 |
| `status` | `VARCHAR(30)` | 是 | `DRAFT` | 商品上下架状态 |
| `audit_status` | `VARCHAR(30)` | 是 | `PENDING` | 商品审核状态 |
| `created_at` | `DATETIME` | 是 | 当前时间 | 创建时间 |
| `updated_at` | `DATETIME` | 是 | 当前时间 | 更新时间，数据更新时自动刷新 |

### 状态值

`status` 当前先保留这些候选值：

| 值 | 说明 |
| --- | --- |
| `DRAFT` | 草稿，卖家刚创建或尚未正式上架 |
| `ON_SHELF` | 已上架 |
| `OFF_SHELF` | 已下架 |

`audit_status` 当前先保留这些候选值：

| 值 | 说明 |
| --- | --- |
| `PENDING` | 待审核 |
| `APPROVED` | 审核通过 |
| `REJECTED` | 审核拒绝 |

### 后续可能拆分

当前为了降低学习成本，`category_name`、`stock` 等信息先直接放在 `product` 表中。

后续如果要更接近真实商城，可以继续拆出：

| 表 | 作用 |
| --- | --- |
| `seller` | 卖家账号与资质信息 |
| `shop` | 店铺信息 |
| `category` | 平台类目 |
| `product_sku` | 商品规格、价格、库存 |
| `product_audit_record` | 商品审核记录 |
