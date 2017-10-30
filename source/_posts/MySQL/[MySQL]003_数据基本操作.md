---
title: '[MySQL]003_数据基本操作'
tags:
  - MySQL
categories:
  - MySQL
date: 2016-12-10 17:20:45
---
### 数据插入

1. 姿势一：按照字段顺序插入相应的值

	```
	INSERT  INTO  table_name  VALUES (value1 , value2 ,...,valuesn);
	```

2. 姿势二：插入特定字段 相应的值

	```
	INSERT  INTO  table_name (字段1，字段2，...，字段n)  
	VALUES (
	value1 , value2 ,...,valuesn
	);
	```

3. 姿势三：多条数据插入

	```
	INSERT  INTO  table_name (字段1，字段2，...，字段n)  
	VALUES  (value1 , value2 ,...,valuesn),
			(value1 , value2 ,...,valuesn),
			...
			(value1 , value2 ,...,valuesn);
	```

4. 姿势四：插入查询结果

	```
	#语句嵌套使用，将查询到的结果插入新表中
	INSERT  INTO  table_name (字段1，字段2，...，字段n)
		SELECT (字段1，字段2，...，字段n)
			FROM table_name2
			WHERE 条件;
	```

	> 注意：如果有自增的字段，则可以不插入值

### 删除数据

```
DELETE FROM  table_name WHERE  条件;
```

### 更新数据

```
UPDATE table_name
	SET 字段1=value1,
		字段2=value2,
	WHERE 条件;
```

### 查询数据

1. 单表查询

	```
	#`*`号表示所有
	SELECT * FROM table_name  WHERE 条件;

	#查询部分信息
	SELECT 字段1,字段2 FROM table_name  WHERE 条件;

	#避免重复：DISTINCT
	SELECT DISTINCT 字段1,字段2  FROM table_name  WHERE 条件;
	```
2. 多表查询

	```
	#基本操作
	SELECT 字段 FROM table_name,table_name2 WHERE 条件;
	```
