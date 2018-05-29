---
title: '[Oracle]04_常用系统表'
category: Oracle
tag: Oracle
date: 2018-05-12 00:04:00
---



# user_objects

1. 查看用户有哪些表
```
select  object_name from user_objects where object_type ='TABLE';
select tname from tab;
```

# user_constraints

1. 查看 `当前用户`  ，`某个表` 所有的 `约束名` 和 `约束类型`

```
select  constraint_name , constraint_type from user_constraints where table_name='S_EMP';
// C => not null , P => PK , R => FK
```

# user_cons_columns

当用户使用的是系统提供的约束名时，查看用户的 `某表的列` 和 `对应的约束`，可通过此表查询到 某表 的 某列 对应的约束名

```
select constraint_name,column_name from user_cons_columns where table_name='S_EMP';
```



