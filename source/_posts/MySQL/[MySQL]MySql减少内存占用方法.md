---
title: MySql减少内存占用方法
tags:
  - MySQL
id: 258
categories:
  - MySQL
date: 2017-03-02 11:06:26
---

默认设置下，mysql会初始化很大的内存块用于缓存数据库查询数据。

&nbsp;

但我的小主机只有946mb的内存，top查询发现他吃了我20% 的内存总量，差不多200MB。

但这个数据库里只有几MB的数据，感觉这设置很不合理。

经过爬文，终于把内存占用降到了128MB

### 配置方法

&nbsp;

直接修改 /etc/mysql/mysql.conf.d/mysqld.cnf

&nbsp;

在配置末尾追加如下配置

&nbsp;

performance_schema_max_table_instances=150

table_definition_cache=150

table_open_cache=64

&nbsp;

然后 service mysql restart 重启服务即可