---
title: '[MySQL]问题排查_优化'
category: MySQL
tag: MySQL
date: 2018-02-02 00:00:01
---



[TOC]

# 查看是否由 MySQL 引起

使用 `top`  命令查看是否是 由 `MySQL` 导致的 CPU爆满， 如果是进行下一步



# 解决问题



1. 登陆mysql ， 使用命令`show processlist` 查看正在处理的请求

   ```
   +----+-------------+-----------+------+---------+------+------------
   | Id | User        | Host      | db   | Command | Time | State 
   +----+-------------+-----------+------+---------+------+------------
   
   ```

   

2. 找到 `Time`  字段处理时间较高的线程

3. `kill   线程id` 杀死该线程 

   ```
   mysql>  kill 103
   ```

   



# 优化



## explain 查看执行计划

1. 复制刚才请求较慢的线程的   `Info` 字段中的 `SQL` 语句
2. 使用 `explain`  查看执行计划， 进行优化。

一般情况下， 查询花费的时间主要会花在 `order by` ， `group by` , `批量操作` ， `嵌套查询` 上， 所以要重点关注这些sql语句

## 开启慢查询日志

配置文件作出修改

```
[mysqld]
slow_query_log=1  #开启慢查询
long_query_time=5 #慢查询时间
log-slow-queries = /var/log/mysql/slowquery.log #需有写入权限

```

通过查看log日志， 可以简单的查看慢SQL

## 合理建立索引 ？

查询过慢， 首先使用explain查看是否查询类型是全表扫描 `ALL` ， 再观察 `where` 条件后面的字段是否使用索引， 还有索引是否合理， 向下面这个例子就是不合理的索引



```sql
select * from  a  left jion b on a.id = b.id ;     // 索引在  a.id , b.id 没有
```



左连接是以左表为主表 的查询， 所以需要使用右表来限制左表的数据 ， 所以不合理



## 索引失效 ？ 

这就是不合理的使用索引， 或者是索引已经失效

以下这些情况， 会直接导致索引失效

1. 索引字段做`运算` 

   ```sql
   select * from  a where id * 10 > 20; 
   ```

2. 索引条件后 使用 `or` 

   ```sql
   select * from  a where id > 10 or name = 'zhangsan';
   ```

3. 使用 `左前缀` 模糊查询 ` like  %xx`

   ```sql
   select * from  a where name = '%an';
   select * from  a where name = '%an%';
   ```

4. 使用`IS NULL` 、 `IS NOT NULL`

   ```sql
   select * from  a where id is null
   ```



其他情况：  使用  `<>`   、`not in`   、 `not exist` 、 `!=`  ， 会降低查询效率

```sql
select * from a where id <> 1;
```








