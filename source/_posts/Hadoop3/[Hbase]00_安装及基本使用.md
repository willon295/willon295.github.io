---
title: '[Hbase]安装及基本使用'
tag: Hbase
category: Hbase
date: 2017-11-01 11:24:33
---

# 简介

hbase是nosql一种，不支持sql语句。

表--> 行-->列族

一个表有多个行，,行有 `行键`（不可相同）， `一行` 可以有 `多个列族`，一个 `列族` 可以插入许多 `不同记录`，

# 安装

注意，hbase 启动依赖 `zookeeper` 和 `hdfs`，所以启动hbase前必须先启动这两个
可以所有的集群节点上 都安装 hbase
去apache官网或者 阿里镜像站 下载 hbase安装包，删除无用的 txt和doc文档

## 修改配置文件

### hbase-env.sh

修改 `JavaHOme`,不使用自带的 `zookeeper`
```
export JAVA_HOME=/usr/local/jdk-8
export HBASE_MANAGES_ZK=false
```

### hbase-site.xml

修改默认的文件的储存路径，是否使用集群，配置所有的zookeeper的通信地址
```
<configuration>
<property>
        <name>hbase.rootdir</name>
        <value>hdfs://hdpnn0:9000/hbasedata</value>
</property>
<property>
        <name>hbase.cluster.distributed</name>
        <value>true</value>
</property>

<property>
        <name>hbase.zookeeper.quorum</name>
        <value>hdpdn0:2181,hdpdn1:2181,hdpdn2:2181</value>
</property>
</configuration>
```

### regionservers 

修改这个文件的作用是： 让主节点知道和哪些节点通信.配置IP或者是主机名即可
```
hdpdn0
hdpdn1
hdpdn2
```

### 分发安装包

将配置好的 `hbase` 文件夹发送给所有节点

## 启动及测试

1. 启动
```
bin/start-hbase.sh
```
2. Jps查看是否成功
主节点会显示以下进程
```
1187 NameNode
3642 Jps
3339 HMaster
1388 SecondaryNameNode
```
从节点会显示
```
2801 HRegionServer
2151 DataNode
2999 Jps
1933 QuorumPeerMain
```

# 使用

hbase是nosql的一种，所以不支持sql语句，但是默认使用 ruby语言

## 基本命令

`bin/hbase  shell` 进入交互界面
1. 查看数据库： list
2. 查看表： scan 't_user'
3. 创建表： 
```
create 'test:t_user','base_info','extra_info'
//或者是下面这样， 
create 'test:t_user',{NAME='baseinfo',VERSIONS=1},{NAME='extrainfo',VERSIONS=1}
```
> test是命名空间,t_user是表，base_info和extra_info是列族
4. 创建名称空间 
```
create_namespace 'nas0001'
```
5. 在指定名称空间创建表：
```
create 'db0001:t_student','fam1','fam2' 
```
6. 插入记录：
```
put 't_user','rowkey001','base_info:username','zhangsan'
//(rowkey001是行键，username是键，zhangsan是值)
```
7. 删除记录： 
```
delete 't_user','rowkey001','base_info:username'
```
8. 删除表(先屏蔽，再删除)： 
```
disable 't_user'; drop 't_user'.
```
具体看表：

|操作| 表达	| 
|---|---|
|创建表 |  create '表名称', '列名称1','列名称2','列名称N'|
|添加记录		|  put '表名称', '行名称', '列名称:', '值'|
|查看记录		|	get '表名称', '行名称'|
|查看表中的记录总数		|	count  '表名称'|
|删除记录		|	delete  '表名' ,'行名称' , '列名称'|
|删除一张表	|	先要屏蔽该表，才能对该表进行删除，第一步 disable '表名称' 第二步 drop '表名称'|
|查看所有记录		|	scan "表名称"  
|查看某个表某个列中所有数据	|	scan "表名称" , ['列名称:']|
|更新记录就是重写一遍进行覆盖|


