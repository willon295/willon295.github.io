---
title: '[MySQL]002_表'
tags:
  - MySQL
categories:
  - MySQL
id: 41
date: 2016-12-10 17:00:34
---
### 创建表

```
    CREATE  TABLE  table_name(
        字段1  数据类型，
		字段2  数据类型，
		....
		字段n  数据类型 
    );
```


### 删除表

```
	DROP TABLE  table_name;
```
### 查看表

```
	DESC TABLE  t_name;
```

### 修改表

**修改表名：**

```
	ALTER  TABLE  old_t_name  RENAME [TO] new_t_name ;
```


**字段操作：**

1. 增加字段：

	- 在末尾添加字段
		```
		ALTER  TABLE  t_name ADD 字段名 数据类型;
		```

	- 在首部添加字段
		```
		ALTER  TABLE  t_name ADD 字段名 数据类型 FIRST;
		```
	- 在某字段之后添加

		```
		ALTER  TABLE  t_name ADD 新字段名 数据类型 AFTER 字段名;
		```

2. 删除字段：

	```
	ALTER  TABLE  t_name DROP 字段名;
	```

3. 修改字段：

	- 数据类型修改
		```
		ALTER  TABLE  t_name MODIFY 字段名  数据类型;
		```

	- 字段名修改
		```
		ALTER  TABLE  t_name CHANGE 旧字段名  新字段名  旧数据类型;
		```

	- 字段名和数据类型修改
		```
		ALTER  TABLE  t_name CHANGE 旧字段名  新字段名  新数据类型;
		```
	- 字段顺序修改

		- 字段一移至首位
		
			```
			ALTER  TABLE  t_name MODIFY 字段1 数据类型  FIRST;
			```

		- 字段一移至字段二之后
			```
			ALTER  TABLE  t_name MODIFY 字段1 数据类型  AFTER 字段二;
			```


### 完整性约束


- `NOT  NULL`:  字段的值不为空
- `DEFAULT`:    字段的默认值
- `UNIQUE KEY (UK)`: 值的唯一性
- `PRIMARY KEY (PK)`: 表的主键
- `AUTO_INCREMENT`: 字段值自增
- `FOREIGN KEY (FK)`: 外键


举个栗子

```
CREATE TABLE student(
    id  int  PRIMARY KEY AUTO_INCREMENT,
	studentid INT UNIQUE, 
	courseid INT ,
    name CHAR(20) DEFAULT '小明'
);
#id 主键自增，username不能重复，name默认‘小明’
```

如果想给 `PK`,`UK`取名字，可以这么做(当然也可以不取)

```
[CONSRAINT uk_studentid ] UNIQUE(studentid)；
[CONTRAINT pk_id ] PRIMARY KEY(id);
```

**设置外键**

```
#假如  sc_table 也有一个courseid 字段
FOREIGN KEY(courseid) REFERENCES sc_table(courseid);
```