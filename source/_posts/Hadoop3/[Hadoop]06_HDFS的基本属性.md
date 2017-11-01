---
title: '[Hadoop]06_HDFS的基本属性'
category: Hadoop
tags: Hadoop
date: 2017-08-28 12:22:33
---

HDFS的基本属性
1. 文件的副本数: 3
三个文件的副本可以保证文件的可靠性，当文件发生冲突是，少数服从多数的原则选择文件，这个属性弯曲那可以由客户端决定
```
<property>
    <name>dfs.replication</name>
    <value>4</value>
</property>
```
2. 文件块大小: 128M
这个属性完全可以由客户端决定，修改 `core-site.xml` 中的属性
```
<property>
    <name>dfs.blocksize</name>
    <value>64M</value>
</property>
```
3. `namenode` 负责的事情
namenode只负责存储映射和任务管理，不用于存储数据，当客户端发起请求时，namenode负责分配数据块的 `block_id` 等。
