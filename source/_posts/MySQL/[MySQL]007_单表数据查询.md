---
title: '[MySQL]007_单表数据查询'
tags:
  - MySQL
categories:
  - MySQL
date: 2016-12-13 16:59:39
---
## 单表数据查询
### 基本操作

```
SELECT  [DISTINCT] field [other_field]  FROM 表名 WHERE  条件;
```
> `DISTINCT`: 去除重复。
> 
> `other_field`:将查询结果放在新字段中
> 
> 字段可以是多个


举个栗子

```
SELECT  name  名字 FROM user;
```
运行结果

```
|名字|
|----|
|user1|
|user2|
|user3|
```
### 多条件查询

WHERE 之后的条件语句可以用以下运算符组合

|运算符|说明|
|----|----|
|AND |与  |
|OR  |或 |
|NOT | 非|
|IS NULL| 为空|
|BETWEEN AND|在..之间|
|IN | 包含于|

举个栗子

```
SELECT name FROM salary WHERE sal>1000 AND  sal <2000;
SELECT name FROM salary WHERE sal BETWEEN 1000 AND 2000;
```

### 模糊查询

关键字：`LIKE`

```
SLECT * FROM table_name WHERE  field LIKE 匹配对象;  
```
 

#### 通配符

1. `%`: 匹配0个1个或者多个
	```
	SELECT  name  FROM user WHERE name LIKE 'A%';
	#查询 A 开头的姓名
	```

2. `_` :匹配任意字符
	```
	SELECT name FROM user WHERE name  LIKE '_A%';
	#查询 第二个字母以A 开头的姓名 
	```

> `%%`:所有

> `%55%`：包含数字`55`



### 排序查询

关键字：`ORDER BY` 


1. 单字段排序

	```
	SELECT * FROM table_name ORDER BY field [ASC | DESC] 
	#ASC 升序，DESC 降序，默认是升序
	```

2. 多字段排序
	```
	SELECT * FROM user ORDER BY salary ASC , hiredate  DESC;
		#先按salary升序排完，salary相同的按 hiredate 降序排序
	```


### 限制查询结果数目

基本语法：

```
SELECT field FROM table_name WHERE 条件 
	LIMIT r_start ,r_count;
```

- r_start:开始行数-- 0代表第一行，可以没有。
- r_count: 一共显示多少条（可少于此数目）

### 统计函数

- `COUNT()`:统计表中记录条数
- `AVG()`:计算字段值的平均值
- `SUM()`:计算字段值的总和
- `MAX()`:查询字段值的最大值
- `MIN()`:查询字段值得最小值

举个栗子

```
SELECT AVG(salary) 工资 FROM user;
```


