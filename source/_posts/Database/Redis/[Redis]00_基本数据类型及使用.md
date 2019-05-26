---
title: '[Redis]00_基本数据类型及使用'
category: Redis
tag: Redis
date: 2017-10-11 00:00:00
---



# 概述



一个  `K V`  型 `NoSQL`  数据库, 可用于缓存 ,消息队列等等.  

5 大数据类型 

- `strings `: 任意类型 , 可以是 integer ,string , 二进制数据等等  最大支持 521M
- `lists` :  列表数据类型, 默认使用双向链表实现
- `sets` :  集合,内容不能重复
- `hashes` :  由 `key`  ,   `field` ,   `value`  三部分组成,字段和对应的值可以有多个, 可以想象成一个完整的JSON对象 `user:  {name: chen, age:23}`
- `sorted sets` : 包含一个分数一个成员的有序集合

## 基本命令

- `DBSIZE`  : 查询当前数据库的 `key`  的个数
- `KEYS`
  - `KEYS   *`: 查询所有的 key
  - `KEYS  us?`: 查询符合通配符条件的 key
- `FLUSHDB` : 清空 `当前` 数据库
- `FLUSHALL`: 清空 `所有` 数据库

## strings

基本命令 `set` , `get` , `mset ` , `mget` , `del`, `incrby`

1. 新增普通  `k  --> v` 数据

   ```bash
   set k1 v1 nx #如果不存在 k1 , 设置 k1 的 值为 v1;  如果存在,  不创建
   set k1 v1 xx #如果存在 k1 ,设置值为 v1 , 如果不存在, 则不创建
   set k2 v2 ex 20 #设置k2 , 设置其过期时间 20s
   set k2 v2 ex -1 #设置k2永不过期
   get k2 #获取k2
   ttl k2 #查看 time-to-live,还有多久过期
   ```

2. 批量操作

   ```bash
   127.0.0.1:6379> MSET k1 v1 k2 v2 k3 v3 k4 v4  #批量设置
   OK
   127.0.0.1:6379> MGET k1 k2 k3 k4  #批量获取
   1) "v1"
   2) "v2"
   3) "v3"
   4) "v4"
   ```

   

3. 整型数据

   ```bash
   set k1 10  #设置 k1 的值为 10
   127.0.0.1:6379> set mi 10
   OK
   127.0.0.1:6379> INCRBY mi 20 #设置自增,20
   (integer) 30
   127.0.0.1:6379> INCRBY mi 20
   (integer) 50
   127.0.0.1:6379> INCRBY mi 20
   (integer) 70
   
   ```

   

4. 删除

   ```bash
   del k1
   set k2 ex -2
   ```

## hashes



基本命令:  `HSET`, `HGET` , `HGETALL` , `HDEL`

可以想象成 一个完整的 JSON 对象

1. 新增

   ```bash
   hset user name Willon #设置用户名
   hset user age  23     #设置用户age
   hset user gender male #设置gender
   ```

2. 获取

   ```bash
   127.0.0.1:6379> HGET user name   #获取某个字段
   "chen"
   127.0.0.1:6379> HGETALL user      #获取所有字段信息
   1) "name"
   2) "chen"
   3) "id"
   4) "1001"
   ```

3. 删除

   ```bash
   hdel user  #删除
   ```

   

## lists

 双向链表结构

基本命令 `LPUSH` , `RPUSH` , `LRANGE` , `LREM`

1. 左边为入口

   ```bash
   LPUSH lst01  1 2 3 4 5  #向lst01中 插入 数字
   
   127.0.0.1:6379> LRANGE lst01  0 -1 #获取所有数据
   1) "5"
   2) "4"
   3) "3"
   4) "2"
   5) "1"
   
   
   127.0.0.1:6379> LPOP lst01  #弹出一个元素
   "5"
   
   LREM lst 2 4  #删除 2 个 4
   
   ```

2. 右边为入口

   ```bash
   127.0.0.1:6379> RPUSH lst02 1 2 3 4 5 6
   (integer) 6
   
   127.0.0.1:6379> LRANGE lst02 0 -1 #注意仍然是 LRANGE
   1) "1"
   2) "2"
   3) "3"
   4) "4"
   5) "5"
   6) "6"
   127.0.0.1:6379> RPOP lst02
   "6"
   ```

   

## sets

基本命令 :  `SADD` , `SMEMBERS`  , `SREM` 



```bash
127.0.0.1:6379> SADD s1  1 2 2 3 3 3 4 4 5 6 #新增set,设置成员
(integer) 6

127.0.0.1:6379> SMEMBERS s1  #获取所有成员
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
6) "6"

127.0.0.1:6379> SREM s1 2   #删除一个成员
(integer) 1

```



## sorted sets

基本命令  `ZADD` , `ZRANGE`  , `ZREM`

```bash
#添加几个成员以及他们的分数
127.0.0.1:6379> ZADD games  70 tom 60 jack 74 rose
(integer) 3

#查询
127.0.0.1:6379> ZRANGE games 0 -1
1) "jack"
2) "tom"
3) "rose"

#带分数的查询,已经自动排序
127.0.0.1:6379> ZRANGE games 0 -1 withscores
1) "jack"
2) "60"
3) "tom"
4) "70"
5) "rose"
6) "74"

#删除 tom
127.0.0.1:6379> ZREM games tom
(integer) 1

```