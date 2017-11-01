---
title: '[Hadoop]05_文件的操作'
category: Hadoop
tags: Hadoop
date: 2017-08-28 12:22:33
---

在hdfs中，分成很多 `块`，每块 `128M` , 所有存储的文件都会被切割成若干块，并且有 `三份` 用于备份，分布存储于不同的 `datanode`

# 什么是 hdfs 客户端

`hdfs客户端` 顾名思义就是客户端， 像 hadoop 服务器段发起文件存储的请求，而客户端的所有依赖的文件和脚本也都封装在 Hadoop 安装包内
例如：
```
hadoop  fs -put  /root/aaa.tar.gz  /root
```
将文件 `aaa.tar.gz` 存储到 `hdfs` 的 `/root` 目录，如果不写目录会报错

# 常用的基本命令

```
hadoop fs -rm
hadoop fs -ls
hadoop fs -put
hadoop fs -cat
```
