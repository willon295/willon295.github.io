---
title: '[Oracle]01_基本使用'
category: Oracle
tag: Oracle
date: 2018-05-12 00:01:00
---

# 建表


## 基础建表语句
```
create table t_name(
    字段 数据类型(长度) [CONSTRAINT 约束名] 约束条件,
    ...
)
```

例如

```
create table test(
    id number(7) constraint TEST_ID_PK  primary key,
    name varchar2(10) constraint TEST_NAME_UQ  unique
);

```

## 外键 fk

```
字段名  数据类型   constraint XXX_FK  references 其他表(字段)
```
> 注意事项： 建表时先建没有外键依赖的表，然后建有外键的表


## check 约束
```
create table  person(
   id number(7) primary key,
   gender varchar2(10) check (gender  in  ('male','female'))
  );
// 限制性别只能是 male 和 female

```

## 视图查询建表

```
create table table_name AS select ... from  ...
```

# 删表

```
drop table tab_name;

```
oracle 默认不会完全删除表，而是放入回收站。彻底删除可以使用以下两种方法

1. 彻底删除表：  `drop table table_name  purge`
2. 清空回收站： `purge recyclebin`

# 连接符

`||` ， 双竖线可以连接两个变量或者属性，如果两个  连接符之间有其他的字符串，使用单引号 `' '`
```
select  last_name || ',' || salary from  s_emp;

```



