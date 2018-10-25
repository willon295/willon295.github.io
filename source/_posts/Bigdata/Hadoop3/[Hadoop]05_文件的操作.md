---
title: '[Hadoop]05_文件操作'
category: Hadoop
tags: Hadoop
date: 2017-08-28 00:05:33
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
hadoop fs -rm [-r] 删除文件/文件夹
hadoop fs -ls  查看目录
hadoop fs -put  上传/存储文件
hadoop fs -cat  如果是文本类型的数据可以直接查看
```

# 存储的原理

1. 客户端找到 `core-site.xml` 中的 `hdpnn0:9000` ,向它发起请求
2. `namenode` 接受请求，分配 `datanode` ，并且保存文件的映射
3. 文件被切割成若干块，存储到不同的 `datanode` 中
4. 读取文件时，namenode 根据映射读取文件块，返回客户端
