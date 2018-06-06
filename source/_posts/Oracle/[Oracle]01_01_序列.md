---
title: '[Oracle]01_01_序列'
category: Oracle
tag: Oracle
date: 2018-05-12 00:01:01
---

序列(SEQUENCE)是序列号生成器，可以为表中的行自动生成序列号，产生一组等间隔的数值(类型为数字)。
其主要用途是生成表的主键值，可以在插入语句中引用，也可以通过查询检查当前值，或使序列增至下一个值。

基础语法

```
　　CREATE SEQUENCE 序列名
　　[INCREMENT BY n]
　　[START WITH n]
　　[{MAXVALUE/ MINVALUE n| NOMAXVALUE}]
　　[{CYCLE|NOCYCLE}]
　　[{CACHE n| NOCACHE}];
```

# 实现主键自增

## 创建序列

```
create sequence student_id --序列名
increment  by 2         --每次增加2
start with  1;          --从1开始
```

## 使用序列

```
--使用 序列名.nextval 获取自增的值
insert  into student values(student_id.nextval,'张三');
```
