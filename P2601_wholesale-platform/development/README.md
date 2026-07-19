# Development

## 模块定位

`development/` 用于承载服装批发平台的开发实现产物，包括技术方案、前端工程、后端工程、接口设计、数据库设计和开发记录。

## 当前使用方式

- 当前先搭建最小目录框架，用于后续逐步填充“三端 + 后端 + 数据库”的实现内容。
- 第一条学习链路先围绕“卖家端新增商品 -> 后端接口 -> 商品表保存”展开。
- 目录先服务理解和分层，不一次性生成完整业务代码。

## 目录结构

| 目录 | 作用 |
| --- | --- |
| `backend/` | Spring Boot 后端工程位置，后续放 Controller、Service、Mapper、Entity 等代码 |
| `frontend-vue/` | Vue 前端工程位置，先在一个前端工程中区分买家端、卖家端、管理端页面 |
| `database/` | 数据库建表脚本、初始化数据和表结构说明 |
| `api/` | 接口设计、Apifox 导出或接口草稿 |
| `docs/` | 开发学习路线、搭建步骤、技术方案说明 |

## 第一条最小链路

```text
卖家端新增商品页面
  ↓
POST /api/seller/products
  ↓
ProductController
  ↓
ProductService
  ↓
ProductMapper
  ↓
MySQL product 表
```
