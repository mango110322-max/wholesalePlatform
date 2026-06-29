## 构思
1. 我理解是需要在前端的pages文件中增加admin文件夹来承载
2. admin前端需要增加
	1. API
		1. 向后端发起
	2. 
3. 后端需要增加
	1. API
		1. 查询符合条件的商品，条件1: audit_status 为PENDING 的商品，并返回




## 问题
### Q1. admin端和buyer端是否需要开新的端口来承载(已解决)

### Q2. 不同端的API 是否应该分开来存放
### Q3. 查询特定条件商品的前后端实现
发起查询请求是不是应该传入一些要查询的参数呢？这样后端就不需要重复写过多的API了，比如前端调用getAuditProductList() 时，就发起一个筛选条件为：audit_status 为PENDING 的查询，调用getDraftProductList() 时，就发起一个筛选条件为：status 为 DRAFT 的查询，后端就只需要写一个API方法就可以了，比如getProductListBy(参数1: 属性, 参数2: 值)，然后返回对应的List<ProductResponse>，如果更进一步是不是前端也封装成一个方法API: getProductListBy(参数1: 属性, 参数2: 值) 
这个是不是在fetch() 方法的body 可以写条件呢？不然这个条件要写在哪里呢？


那前端目前getProductList 这个方法就是2个重载方法对吧？getProductList() 和getProductList(query: ProductQuery = {}) 是吧，第一个用于返回默认商品列表，第二个用于返回带有筛选条件的商品列表。是这样吧，那后端是不是也是这样呢？