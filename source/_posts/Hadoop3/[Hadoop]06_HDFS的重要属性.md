---
title: '[Hadoop]06_HDFS的基本属性'
category: Hadoop
tags: Hadoop
date: 2017-08-28 00:06:33
---

HDFS的基本属性

## 文件的副本数
参数: `dfs.replication`，默认是 `3`。
第一个副本： 存在离客户端最近的datanode
第二个副本： 存在同一个机架的另一个datanode上
第三个副本： 存在另一个机架上的某个datanode上
这个属性由客户端决定,,3个文件的副本可以保证文件的可靠性，当文件发生冲突是，少数服从多数的原则选择文件
```
<property>
    <name>dfs.replication</name>
    <value>4</value>
</property>
```
## 文件块大小

参数: `dfs.blocksize`。
默认是 `128M`，这个属性完全可以由客户端决定，修改 `core-site.xml` 中的属性
```
<property>
    <name>dfs.blocksize</name>
    <value>64M</value>
</property>
```
## namenode 元数据的存储目录

参数是： `dfs.namenode.name.dir` 。
就是 `namenode` 的工作目录（服务端用）。实际生产中该目录要安全可靠.
正确做法： 给namenode配置多个目录，且挂载在不同的磁盘
```
<property>
    <name>dfs.namenode.name.dir</name>
    <value>/mnt/disk1,/mnt/disk2,/mnt/disk3,/mnt/disk4</value>
</property>
```

## datanode 文件块存储目录

参数是 `dfs.datanode.data.dir`。
一般情况下，一个datanode指定一个目录，如果挂载多个目录，则是给这一个datanode `扩容`。
```
<property>
    <name>dfs.datanode.data.dir/name>
    <value>/data/disk1,/data/disk2,/data/disk3,/data/disk4</value>
</property>
```
