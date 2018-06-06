---
title: '[Oracle]01_00_DDL语句'
category: Oracle
tag: Oracle
date: 2018-05-12 00:01:00
---


# DDL

## 建表

### 基础建表语句

```
create table t_name(
字段 数据类型(长度) [CONSTRAINT 约束名] 约束条件,
...
)
```

例如

```
create table test(
id number(7) constraint TEST_ID_PKprimary key,
name varchar2(10) constraint TEST_NAME_UQunique
);

```

### 外键 fk

```
字段名数据类型 constraint XXX_FKreferences 其他表(字段)
```
> 注意事项： 建表时先建没有外键依赖的表，然后建有外键的表


### check 约束
```
create tableperson(
 id number(7) primary key,
 gender varchar2(10) check (genderin('male','female'))
);
// 限制性别只能是 male 和 female

```

### 视图查询建表

```
create table table_name AS select ... from...
```

# 删表



```
drop table tab_name;

```
oracle 默认不会完全删除表，而是放入回收站。彻底删除可以使用以下两种方法

1. 彻底删除表：`drop table table_name purge`
2. 清空回收站： `purge recyclebin`

# 连接符

`||` ， 双竖线可以连接两个变量或者属性，如果两个连接符之间有其他的字符串，使用单引号 `' '`
```
selectlast_name || ',' || salary froms_emp;

```



# 修改表


1. `ADD`
- 增加新列
```
ALTER TABLE s ADD s_city VARCHAR2(20);
```
- 增加新的约束
```
ALTER TABLE s ADD CONSTRAINT S_NAME_UQ unique(name);
```

2. `RENAME`
- 修改表名
```
ALTER TABLE s RENAME TO s_table;
```
- 修改列名
```
ALTER TABLE s_table RENAME COLUMN s_city TO s_country;
```
3. `MODIFY`
- 修改字段类型
```
ALTER TABLE s_table MODIFY s_country NUMBER(20);
```
4. `DROP`
- 删除表列
```
ALTER TABLE s_table DROP COLUMN s_country;
```
5. 其他操作
-- 注意: 增加和修改列是不需要加关键字COLUMN，否则会报错ora-00905。
-- 其次，对删除单列/重命名单列，一定要加COLUMN
```
--增加多列：
ALTER TABLE s_table ADD (test1 VARCHAR2(10),test2 NUMBER);

--修改多列：
ALTER TABLEs_table MODIFY (test1 VARCHAR2(20),test2 VARCHAR2(20));

--删除多列：
ALTER TABLE s_table DROP (test1,test2);

--单列中要加关键字COLUMN，删除多列的时候，不能加COLUMN关键字。
```
