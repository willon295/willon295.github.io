---
title: '[Redis]01_基本配置'
category: Redis
tag: Redis
date: 2017-10-11 00:01:00
---



一些默认的配置:



1. 数据库个数:  `16` 
2. strings 最大: `512M`
3. 默认备份文件: `dump.rdb` 
   如果没有指定 `rdb` 文件的存放路径, ,默认路径是 `启动redis的位置` , 配置文件中的默认写法 `./dump.rdb` ,
4. 默认会自动持久化, 自动恢复数据


