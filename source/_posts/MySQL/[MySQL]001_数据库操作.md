---
title: '[MySQL]001_数据库操作'
tags:
  - MySQL
categories:
  - MySQL
id: 40
date: 2016-12-10 16:49:34
---
## MySQL的安装和使用

以`fedora` 下安装`mysql`为例

1. 执行命令

```
dnf install community-mysql-server-5.17.xxxx
```
2. 修改密码，默认密码是空的
```
#第一种
mysqladmin  -uroot -p旧密码  password 新密码
#第二种
mysql> use mysql; 
mysql> update user set password=password('123') where user='root' and host='localhost'; 
mysql> flush privileges; 
```

## 数据库基本操作

### 创建数据库

```
CREATE CATABASE [IF NOT EXISTS] db_name;
```

`db_name`的命名规范：

- 由字母，数字，下划线，@ # $ 符号组成
- 首字母不能为`数字`和`$`
- 标识符不能为MySQL的保留字
- 长度小于 128位

### 查看数据库

```
SHOW DATABASE;
```

### 选择数据库

```
USE db_name;
```

### 删除数据库

```
DROP DATABASE db_name;
```

## 存储引擎
### 数据类型
- `INT` : 整数类型，4字节
- `FLOAT` : 浮点类型，4字节
- `DOUBLE` : 浮点类型，8字节
- `BIT(M)`: 位类型，1-8字节
- `DATE`: 时间类型，1000-01-01~9999-12-31，4字节
- `DATETIME`: 时间类型，1000-01-01 00:00:00~9999-12-31 23:59:59，8字节
- `YEAR`: 1901-2155，1字节
- `CHAR(M)`: 字符串类型，M字节
- `VARCHAR(M)`: 字符串类型，M字节
- `TEXT`:字符串类型
- `BINARY(M)`:字符串类型，M字节
- `VARBINARY(M)`:字符串类型，M字节
