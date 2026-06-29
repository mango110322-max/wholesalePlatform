# Backend

## 模块定位

这里用于放置 Spring Boot 后端工程。

第一阶段只需要打通一条链路：

```text
卖家端新增商品 -> 后端接收请求 -> 保存到 product 表
```

## 后续建议目录

```text
src/main/java/com/wholesaleplatform
  controller/   接收前端请求
  service/      处理业务规则
  mapper/       操作数据库
  entity/       数据库表对应的 Java 对象
  dto/          前端请求和后端响应的数据对象

src/main/resources
  application.yml
```

暂时不要急着填代码，先等数据库和接口设计明确后再逐步创建。
