---
title: '[MySQL]004_索引'
tags:
  - MySQL
categories:
  - MySQL
date: 2016-12-11 18:06:39
---
### 索引概述
1. 什么是索引？

	数据库对象索引与书的目录十分相似，主要是为了提高查找效率。MySQL包括六种索引：
	- 普通索引
	- 唯一索引
	- 全文索引
	- 单列索引
	- 多列索引
	- 空间索引

2. 什么时候需要索引？

	- 经常被查询的字段（在 WHERE 子句出现的）
	- 在分组的字段（GROUP BY 子句出现的）
	- 存在依赖关系的子表和父表的联合查询（主键或外键的字段）
	- 设置唯一完整性约束的字段（UNIQUE）

3. 以下情况不适合用索引
	- 在查询中很少用的字段
	- 拥有许多重复值得字段


### 普通索引

1. 新表创建索引
	```
	CREATE TABLE  t_name(
		字段名  数据类型 ,
		...
		INDEX | KEY [索引名] (字段名 [(长度)]  [ASC | DESC])
	);
	#长度:索引长度
	#ASC:升序排序
	#DESC:降序排序 
	```
	举个栗子：

	```
	CREATE TABLE  user(
		id int,
		name char(10),
		INDEX index_id(id)
	);
	```

2. 旧表上创建索引

	```
	#方式一
	CREATE INDEX 索引名 ON t_name(字段名 [(长度)]  [ASC | DESC])

	#方式二
	ALTER TABLE  t_name 
		ADD INDEX | KEY [索引名] (字段名 [(长度)]  [ASC | DESC])
	```

### 唯一索引

概念：所谓的唯一索引就是 ，创建索引时，限制索引的值必须唯一

操作：把`普通索引`的<font color="red"> `INDEX | KEY` 改成 `UNIQUE  INDEX | KEY`，</font>其他完全一样

### 全文索引

概念：全文索引主要关联CHAR VARCHAR TEXT 数据类型，方便字符串查找

操作：把`普通索引的`<font color="red"> `INDEX | KEY` 改成 `FULLTEXT  INDEX | KEY`</font>，其他完全一样

### 多列索引

概念：所谓多列索引，就是关联的字段不止一个。

1. 新表建多列索引

	```
	CREATE TABLE  t_name(
		字段名1  数据类型 ,
		字段名2  数据类型 ,
		...
		INDEX | KEY [索引名]
			(字段名1 [(长度)]  [ASC | DESC]),
			...
			(字段名n [(长度)]  [ASC | DESC])
	);
	```
2. 旧表创建多列索引

	```
	#方式一
	CREATE INDEX 索引名 ON t_name
		(字段名1 [(长度)]  [ASC | DESC]),
		...
		(字段名n [(长度)]  [ASC | DESC]);

	#方式二
	ALTER TABLE  t_name 
		ADD INDEX | KEY [索引名] 
		(字段名1 [(长度)]  [ASC | DESC]),
		...
		(字段名n [(长度)]  [ASC | DESC])
	```

### 删除索引

```
DROP INDEX index_name ON t_name 
```
