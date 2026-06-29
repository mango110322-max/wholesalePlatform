# Docs

## 模块定位

这里用于放置开发阶段的学习路线、搭建步骤和技术方案说明。

当前已沉淀：

| 文档 | 作用 |
| --- | --- |
| `D2_Frontend_Backend_Architecture.md` | 梳理买家端、卖家端、管理端围绕商品表形成的前后端架构 |
| `D3_Product_Status_Flow.md` | 梳理商品新增、审核、上架、买家可见的状态流转 |
| `D4_Product_Image_Plan.md` | 设计下一阶段商品主图字段 MVP |

当前已跑通的核心链路：

```text
卖家新增商品
  -> 管理端审核商品
  -> 卖家上架商品
  -> 买家端展示可见商品
```

下一阶段建议先实现：

```text
商品主图字段 MVP
```

也就是：

```text
product 表加 main_image_url
卖家新增商品时填写图片 URL
卖家 / 管理端 / 买家端列表展示主图
```
