---
title: '[Redis]02_事务'
category: Redis
tag: Redis
date: 2017-10-11 00:02:00
---



命令: 

- `MULTI` : 标记一个事务块开始

- `DISCARD` :  丢弃所有 MULTI 之后发的命令
- `EXEC`:    执行所有 MULTI 之后发的命令
- `UNWATCH` : 取消事务命令
- `WATCH key [key ...]` : 锁定 key直到执行了 MULTI/EXEC命令



## 正常的执行

没有异常的执行命令

```bash
127.0.0.1:6379> MULTI  #开启事务
OK
127.0.0.1:6379> set k1 vvvv #执行命令, 命令会进入 QUEUE
QUEUED
127.0.0.1:6379> set  k2 sssss
QUEUED
127.0.0.1:6379> EXEC   #提交事务
1) OK
2) OK
127.0.0.1:6379> get k1
"vvvv"
```



## 非正常的执行



### 提交命令抛错



```bash
127.0.0.1:6379> MULTI  #开始事务
OK
127.0.0.1:6379> set k1 vvvvv  #正常
QUEUED
127.0.0.1:6379> set k2 nnnnnn  #正常
QUEUED
127.0.0.1:6379> getaaa  #抛出异常
(error) ERR unknown command `getaaa`, with args beginning with: 
127.0.0.1:6379>  set k3 mmmmmm #再执行其他
QUEUED
127.0.0.1:6379> EXEC   #提交事务,所有命令不执行
(error) EXECABORT Transaction discarded because of previous errors.
127.0.0.1:6379> get k2
"sssss"

```

> 结果: 所有命令都被抛弃, 没有执行

### 执行命令抛错

```bash
127.0.0.1:6379> MULTI  #开始事务
OK
127.0.0.1:6379> set k1 11111
QUEUED
127.0.0.1:6379> set  k2 ssssss
QUEUED
127.0.0.1:6379> INCR k2  #提交执行后才出错
QUEUED
127.0.0.1:6379> get  k1
QUEUED
127.0.0.1:6379> EXEC #提交
1) OK
2) OK
3) (error) ERR value is not an integer or out of range
4) "11111"

```

> 仅出错的语句没有执行, 其他命令正常执行

## 放弃事务



```bash
127.0.0.1:6379> MULTI   #开始事务
OK
127.0.0.1:6379> set k1 1111 
QUEUED
127.0.0.1:6379> set  k2 2222
QUEUED
127.0.0.1:6379> DISCARD #放弃事务
OK
127.0.0.1:6379> get k1
"vvvv"

```





## Watch 监控



当被Watch的 `key` 在 事务 `提交之前` 被 `修改` , `事务失败 `   (相当于 数据库的 `乐观锁`)

工作流程: 

1. 线程A  `watch`  一个 `key` 
2. A 开始事务
3. 中间其他 线程B 修改key的值
4. A 提交事务
5. A发现 key 被修改了, 事务失败

