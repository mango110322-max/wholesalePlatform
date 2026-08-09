### 功能说明

1. 卖家可以对已添加的商品进行再次编辑，
2. 编辑商品也采用弹窗形式，相比于添加商品在结尾处增加商品状态和审核状态两项（后续再采用页面来承载）
    1. 商品状态: 纯展示
    2. 审核状态：纯展示审核状态字段，若为拒绝状态，会增加拒绝理由说明的展示
    3. 底部操作按钮
        1. 按钮1: 取消，关闭该弹窗，不做改动，即便有改动也不做保存
        2. 按钮2: 保存商品，
3. 表格操作列按钮修改为文字按钮，正常（编辑、上架）为蓝色，管理端的“拒绝”使用红色，“通过”使用绿色
4. 前端
    1. 页面
        1. 卖家端
            1. 商品列表操作列增加“编辑”按钮(页面：ProductList.vue)
                
                1. 触发按钮：@click="showEditDialog = true"  
                    增加：const showEditDialog = ref(false)  
                    
                2. 弹窗显隐v-if，调用ProductEdit.vue  组件
                    `<div v-if="showEditDialog" class="dialog-mask">`
                    
                    <ProductCreate @saved=“handleProductSaved” @cancel=“showEditDialog = false”/>
                    
                    结构：dialog → dialog-header → ProductEdit组件
                    
            1. 增加“编辑商品”弹窗组件(页面：ProductEdit.vue)  
                相比于添加商品在结尾处增加商品状态和审核状态两项
                
                1. 商品状态: 纯展示
                2. 审核状态：纯展示审核状态字段，若为拒绝状态，会增加拒绝理由说明的展示
                3. 底部操作按钮
                    1. 按钮1: 取消，关闭该弹窗，不做改动，即便有改动也不做保存
                    2. 按钮2: 保存商品，调用 handleSubmit()方法，该方法中调用Seller端的API：updateProduct()
				4. 获取商品信息并回填到弹窗各项中
                        1. 增加获取商品信息的方法：getProductInfo([product.id](http://product.id)) 返回类型：productResponse (增加到sellerProductApi.ts API中)
                        2. 实现方式构思：这里我在想要不要将getProductInfo() 方法放到sellerProductApi.ts中，然后ProductEdit.vue中写个handleProductInfo()方法，将getProductInfo() 方法获取到的productResponse 赋给ProductEdit.vue 中的form，这样就实现了回现商品信息的功能了。绑定完成后，将这个值复制到originalForm 这个初始表单中，方便后续做修改前后的对比。
				5. 增加对比商品信息方法，返回更新字段的 ProductResponse（非更新字段值为null）
		            getUpdateFields(originalProduct: productCreate, formData productCreate): ProductResponse{
				        let updateFields: ProductResponse
				        if(originalProduct.name === formData.name){
					        updateFields.name = null
				        }else{
					        updateFields.name = formData.name
				        }
				        if(originalProduct.categoryName === formData.categoryName){
				        }else{
				        }
				        …
				        return updateFields
		            }
    1. API
        1. 卖家端（sellerProductApi.ts）
	        1. 增加更新商品信息方法
		        updateProduct(product: ProductCreateRequest) : Promise< ProductResponse>{
		        }
            2. 增加
                



### 进阶功能：修改的商品信息为不需要审核的信息或者未做修改的处理方式
未改信息就直接提交如何处理
只改了价格、库存、MOQ该如何处理
如何判断是否有修改，如何判断修改了哪几项

### 遗留问题

1. 当前 PATCH 更新以 `null` 表示字段未提交，因此暂不支持通过 `mainImageUrl: null` 主动删除商品图。后续需要删除商品图时，应增加能够区分“字段未提交”和“明确提交 null”的三态处理。


### 功能说明
1. 卖家可以对已添加的商品进行再次编辑，
2. 编辑商品也采用弹窗形式，相比于添加商品在结尾处增加商品状态和审核状态两项（后续再采用页面来承载）
	1. 商品状态: 纯展示
	2. 审核状态：纯展示审核状态字段，若为拒绝状态，会增加拒绝理由说明的展示
	3. 底部操作按钮
		1. 按钮1: 取消，关闭该弹窗，不做改动，即便有改动也不做保存
		2. 按钮2: 保存商品，
3. 表格操作列按钮修改为文字按钮，正常（编辑、上架）为蓝色，管理端的“拒绝”使用红色，“通过”使用绿色



4. 前端
	1. 页面
		1. 卖家端
			1. 商品列表操作列增加“编辑”按钮(页面：ProductList.vue)
				```<div v-if="showEditDialog" class="dialog-mask">```
				@click="showEditDialog = true"
				增加：const showEditDialog = ref(false)
				//按钮绑定方法：@click="handleEditProduct(product.id)"
			2. 增加组件(页面：ProductEdit.vue)
				相比于添加商品在结尾处增加商品状态和审核状态两项
				1.  商品状态: 纯展示
				2. 审核状态：纯展示审核状态字段，若为拒绝状态，会增加拒绝理由说明的展示
				3. 底部操作按钮
					1. 按钮1: 取消，关闭该弹窗，不做改动，即便有改动也不做保存
					2. 按钮2: 保存商品
	2. API
		1. 卖家端（sellerProductApi.ts）
			1. 增加方法
				handleEditProduct(product.id){
					
				}


