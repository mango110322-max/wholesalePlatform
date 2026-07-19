### 开发设计思路
原则：后端应该先改类的实体entity，前端先改 type

1. 前端增加
    1. 界面
        1. 卖家端：
            1. 添加商品弹窗 中增加“商品图片URL” 的字段（ProductCreate.vue）  
                1. setup: form, resetForm(), handleSubmit()
                2. ```<label>商品图<input v-model.imageUrl="form.imageUrl" type="text" placeholder="请输入该商品图的链接" /></label>```
            2. 商品管理页 第2列（ID后面的列）增加商品图片展示（ProductList.vue）
	            1. 表头的```<th>ID</th>``` 后要增加 ```<th>商品图</th>```
	            2. 表格内容```<td>{{ product.id }}</td>``` 后增加```<td>{{ product.imageUrl }}</td>```  Q：此处该如何实现出将链接展示为图片，暂不清楚，后续清楚后再修改此处
        2. 管理端：
            1. 商品审核页 第2列（ID后面的列）增加商品图片展示（AdminHome.vue）、
	            1.  表头的```<th>ID</th>``` 后要增加 ```<th>商品图</th>```
	            2. 表格内容```<td>{{ product.id }}</td>``` 增加```<td>{{ product.imageUrl }}</td>```  Q：此处该如何实现出将链接展示为图片，暂不清楚，后续清楚后再修改此处
        3. 买家端：
            1. 商品列表页 每个商品的最左侧空间 增加商品图片展示（BuyerProductList.vue）
	            1. product-item 中增加商品图的展示  Q：此处该如何实现出将链接展示为图片，暂不清楚，后续清楚后再修改此处
    2. API
        1. 卖家端：不需要增加
        2. 管理端：不需要增加
        3. 买家端：不需要增加
        4. productTypes.ts 中 type ProductCreateRequest  minOrderQuantity 后增加 imageUrl: string
2. 后端增加
    1. entity
        1. 增加“商品图片URL”字段：String imageUrl，及其get, set方法
            位置：Product.java 中MOQ下方
    3. dto
        1. 增加“商品图片URL”字段：String imageUrl
            位置ProductResponse.java 中MOQ下方
		2. ProductCreateRequest.java
    4. Controller 貌似不需要增加字段
    5. service
        1. createProduct 方法需要增加setImageUrl
            位置：ProductService.java
    6. mapper
3. 数据库增加
	1. product 表增加商品图链接（Q1: 如果后续多图该如何承载？）




升级后旧数据处理方式：无商品图的旧数据，商品图显示为一个通用的“无商品”站位图


```text
Vue 页面
  ↓ 调用
前端 api 文件
  ↓ fetch 发送 HTTP 请求，body 中放 JSON
Spring Boot Controller
  ↓ 通过 @RequestBody / @PathVariable / @RequestParam 接收请求数据
    - @RequestBody：接收 body 中的 JSON，并转成 Request DTO
    - @PathVariable：接收路径中的变量，例如 /products/{productId}
    - @RequestParam：接收 URL 后面的查询参数，例如 ?status=ON_SHELF
ProductService 业务层
  ↓ 调用
ProductMapper 数据库层
  ↓ SQL
MySQL product 表
```