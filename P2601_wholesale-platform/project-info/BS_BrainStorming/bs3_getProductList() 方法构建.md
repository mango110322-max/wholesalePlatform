
问题1: ProductListResponse类前端要怎么创建，这应该是一个存放product的集合
	后端要怎么创建这个ProductListResponse dto类，用Java中的集合来存放吗？
问题2: 如果商品过多（上万条），要怎么处理，分页吗？数据传输还是通过json 文件吗？


前端增加getProductList()方法，返回类型：ProductListResponse

后端增加@GetMapping  getProductList()方法，dto 中增加ProductListResponse类