---
title: '[Hibernate]09_检索策略与优化'
tag: Hibernate
date: 2016-10-12 12:22:33
category: Hibernate
---


## 检索策略

hibernate 中分为两类检索
1. 立即检索： 事务提交之后立马执行sql语句
2. 延迟检索：事务提交之后不会立即发送语句，而是在使用非id 属性的其他属性时才执行

> 区别： 立即检索使用 `session.get()`, 延迟检索使用 `session.load()`,延迟检索更节省资源

### 设置延迟级别

在需要延迟的类中的加入属性 

```
<class name="entity.Students" lazy="true">
```
如果该类存在 set 属性，可以增强该属性的延迟
```
<set name="roleSet" table="t_rs" cascade="save-update" lazy="extra">
```
### batch-size属性

该属性在 set 标签和 class 标签都可以使用，数值越大，效率越高。
无论是立即检索还是延迟检索，都可以指定关联查询的数量，这就需要使用 batch-size 属性来指定，指定关联查询数量，以减少批量检索的数据数目。

```
<set name="roleSet" table="t_rs" cascade="save-update" batch-size="10">
```

> 在一对多，多对多的检索中更需要改属性来提高检索的效率，减少SQL语句的发送次数
