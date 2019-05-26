---
title: '[Redis]01_基本配置'
category: Redis
tag: Redis
date: 2017-10-11 00:01:00
---



一些默认的配置:

# RDB

配置的选项为 :   `dbfilename  dump.rdb `

1. 数据库个数:  `16` 
2. strings 最大: `512M`
3. 默认备份文件: `dump.rdb` 
   如果没有指定 `rdb` 文件的存放路径, ,默认路径是 `启动redis的位置` , 配置文件中的默认写法 `./dump.rdb` ,
4. 默认会自动持久化, 自动恢复数据, 操作的文件名称 都为 `dump.rdb`,
5. 手动恢复文件:  `CONFIG GET   备份文件路径`
6. 数据检查: `redis-check-rdb --fix`



# AOF

`Append Only File`  ,  配置选项为  `appendonly  no`, 默认没有开启.

工作原理:  

1. 记录服务端执行每条 `命令` 
2. 将命令写入 `appendonly.aof` 文件中
3. 下次重新启动时, 加载aof文件, 按照文件 `重新执行` 一遍命令, 达到恢复
4. 数据检查:  `redis-check-aof  --fix`  

