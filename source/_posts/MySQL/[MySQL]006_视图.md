---
title: '[MySQL]006_视图'
tags:
  - MySQL
categories:
  - MySQL
date: 2016-12-12 10:59:39
---
### 一、视图概述
1. 什么是视图？

	视图就是一张虚拟的表，可以映射基本表的数据，能提高数据的安全性

2. 视图的特点

	- 视图的列可以来自不同的表
	- 视图是基本表产生的表
	- 视图的建立和删除不影响基本表
	- 对视图内容的更新（增删改），直接影响基本表


### 二、视图的创建

	CREATE VIEW view_name AS 查询语句;

举个栗子
	
	CREATE VIEW view_user AS SELECT * FROM user;
	#创建一个user表的视图

### 各种功能的视图

基本表

|  id | name |
|-----|------|
|  1  | user1|
|  2  | user2|
|  3  | user3|



1. 实现查询常量的语句的视图

		CREATE VIEW  view_v1 AS SELECT 3.1415;

2. 封装聚合函数（SUM,MIN,MAX,COUNT等）的视图

		CREATE VIEW  view_v2 AS 
			SELECT COUNT(name) FROM user;

	运行结果view_v2

		  +-------------+
		  | COUNT(name) |
		  +-------------+
		  |           3 |
		  +-------------+
3. 实现排序（ORDER BY）的视图

		CREATE VIEW  view_v3 AS 
			SELECT name FROM user ORDER BY  id DESC;
		#DESC表示降序；

	运行结果view_v3
		
		+-------+
		| name  |
		+-------+
		| user3 |
		| user2 |
		| user1 |
		+-------+

### 三、查看视图

视图本身就是一种表，所以可以用和表一样查看

	#查看所有表，包括视图	
	SHOW TABLES;
	
	#查看某表的内容
	SELECT * FROM view_name;

### 四、删除视图

	#同时删除多个view
	DROP VIEW view_name1 [,view_name2..,view_namen];

### 五、修改视图

1. 方式一：删后新建

		DROP VIEW  view_old;
		CREATE VIEW view_new AS 查询条件;

2. 方式二：直接替换

		CREATE OR  REPLACE VIEW  view_name AS 查询语句;

3. 方式三：alter方式
		
		ALTER VIEW  view_name AS 查询语句; 

### 六、视图内容操作

1. 查询数据

		SELECT  * FROM view_name;

2. 添加数据

		INSER INTO view_name VALUES (vlaue1,...,values);

3. 删除数据

		DELETE  FROM view_name WHERE 条件语句;

4. 更新数据

		UPDATE view_name SET filed=value [,...,filed2=value2]  WHERE 条件;

> 注意：视图内容的 `增---删---改` 会影响基本表`user`的内容 