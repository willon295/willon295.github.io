---
title: '[MySQL]005_触发器'
tags:
  - MySQL
categories:
  - MySQL
id: 44
date: 2016-12-11 18:59:39
---
### 一、触发器概述
1. 什么是触发器？
	```
	触发器（TRIGGER）与编程语言的函数十分相似，需要声明，执行等。由事件触发，自动执行
	```
2. 什么时候会执行？

	以下语句会执行触发器

	- DELETE
	- UPDATE
	- INSERT


### 二、创建触发器

基本语法

```
CREATE TRIGGER trigger_name 
	BEFORE | AFTER trigger_event
		ON table_name FOR EACH ROW
			trigger_STMT;
```
参数说明：

|   参数        |   说明                    |
|----------    |---------                  |
|BEFORE        |触发器事件之前，执行触发器语句 |
|AFTER         |触发器事件之后，执行触发器语句 |
|trigget_event |即DELETE,UPDATE,INSERT     |
|FOR EACH ROW  |任意一条记录满足，即触发该触发器|
|trigger_STMT  |触发器触发后执行的语句			|
<br><br>



1. 单执行句触发器
	```
	CREATE TRIGGER trigger_name 
		BEFORE | AFTER trigger_event
			ON table_name FOR EACH ROW
				trigger_STMT;
	```
2. 多执行句触发器
	```
	CREATE TRIGGER trigger_name 
		BEFORE | AFTER trigger_event
			ON table_name FOR EACH ROW
			BEGIN
				trigger_STMT1;
				...
				trigger_STMTn;
			END
	```

	> 因为多语句`;`分号回影响语句结束，所以可以使用
	> 
	> `DELIMITER  $$` ，先标记`$$`为语句结束符，在`END` 之后再 `DELIMITER ;`改回


**举个栗子**


> 假设存在两个基本表 `user`和 `diary`

`user`

| id | name  |
|----|-------|
|  1 | user1 |
|  2 | user2 |
|  3 | user3 |



`diary`

| dno | dname| dtime|
| --| --|


功能：当向`user`表插入一条数据，`diary`表记录一条日志

实现：

```
CREATE TRIGGER user_diary 
AFTER INSERT
	ON user FOR EACH ROW
		INSERT INTO diary VALUES(1,'userdiary',now());
```