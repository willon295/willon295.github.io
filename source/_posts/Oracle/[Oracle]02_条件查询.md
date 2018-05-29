---
title: '[Oracle]02_条件查询'
category: Oracle
tag: Oracle
date: 2018-05-12 00:02:00
---


# Order By

默认是 升序排序，`desc` 表示降序

使用数字表示字段，从 `1` 开始，如

```
select id,name,salary  form s_dept order by 1 desc; //按照id降序排序
```

# 模糊查询  

`LIKE` ： 模糊查询

- `_`: 一个字符

- `%`: 任意字符
- `\`: 转义使用，`\_` 就是 `_`, 一般配合 `escape` 使用

```
select name from  s_emp where name  like '%A%';
select name  from s_dept where  name  like '\_%' escape '\';
```


# UNION,UNION ALL

`UNION`: 将结果进行合并，去重
`UNION ALL`: 直接将结果进行合并，不去重

```
select id from student where  id!=10
UNION
select id from student where id>15;
```

# minus , intersect

`minus` : 求差集，第一个减去第二个
`intersect` : 求交集
```
select  id from s_emp where id > 15
minus 
select id from  s_emp where id > 20; 
```

# group by

分组:  select 查询出现的字段一定要在group by中出现，否则编译不通过

```
select  dept_id,count(*) from student group by dept_id;
//select last_name,dept_id from student group by dept_id; 错误！！ 
```

> 如果要对组函数进行约束，必须使用 `having`, `不能` 使用 `where` 进行约束

```
select  sum(salary),avg(salary) from   s_emp    group by dept_id  having avg(salary)>1400;
```

# 子查询

在select的where语句中嵌套另外一个select语句

1. 查看薪资大于chang员工经理的经理所在区域的最低工资的员工的信息(18行）
```
select * from s_emp where salary > (select  min(salary) from s_emp where id in (select id from s_emp where dept_id in ( select id from s_dept where region_id = (select region_id from s_dept where id = ( select dept_id from s_emp  where id=(select manager_id from s_emp where last_name='chang'))))));
```
