---
title: '[Hadoop]04_手动启动Namenode和Datanode'
category: Hadoop
tags: Hadoop
date: 2017-08-28 12:22:33
---

# 配置并启动集群

修改以下文件之前先修改 `hadoop-env.sh` 文件中的 `JAVA_HOME`,切所有从节点的配置文件都是一样的
1. 修改 `core-site.xml` 文件(缓存文件目录)
```
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://hdpnn0:9000</value>
    </property>
    <property>
        <name>hadoop.tmp.dir</name>
        <value>/root/hadooptmp</value>
    </property>
</configuration>
```
2. 修改 `hdfs-site.xml` （SecondaryNamenode的配置）
```
<configuration>
    <property>
        <name>dfs.namenode.secondary.http-address>
        <value>hdpnno:50090</value>
    </property>
</configuration>
```
3. 修改 `slaves` 文件 （所有从节点的域名/ip）
```
hdpdn0
hdpdn1
...
hdpdn100
```
4. 单个启动 `hdpnn0` 服务器的 `namenode`
```
hadoop-daemon.sh  start namenode
```
5. 单个启动 `hdpdn100 所有的 `datanode`
```
hadoop-daemon.sh  start datanode
```
6. 一键启动/停止所有节点
```
start-dfs.sh
stop-dfs.sh
```

# 注意事项

1. `namenode` 初始化后， `hadooptmp` 文件夹发生变化， `集群ID` 发生变化，此时如果 `重启` 其他的 `datanode` 会失败。
2. 解决： 删除所有的 `datanode` 的缓存文件夹
