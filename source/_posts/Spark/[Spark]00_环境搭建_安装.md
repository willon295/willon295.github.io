---
title: '[Spark]00_环境搭建_安装.md'
category: Spark
tag: Spark
date: 2018-03-01 00:00:00
---

# 基本集群搭建

## 安装准备

1. JDK环境
2. [Spark官网](http://spark.apache.org/downloads.html) 下载相应的版本
3. SSh免密

## 开始搭建

1. 进入 `conf` 文件夹，修改环境配置文件 `cp spark-env.sh.template  spark-env.sh` ,加入
```
#JDK环境
export JAVA_HOME=/usr/local/jdk-1.8
#Master主机地址
export  SPARK_MASTER_IP=192.168.10.1
#Master的RPC通信端口
export SPARK_MASTER_PORT=7077
```
2. `slaves` 文件，写入从节点(Worker)主机地址
```
192.168.10.2
192.168.10.3
192.168.10.4
```
3. 将配置好的 文件拷贝到其他节点

## 启动

在 Master 机器上启动 
```
start-all.sh
```

jps查看进程，分别有 Master 、 Worker 进程，在 `8080` 端口可以查看集群的基本信息


# 高可用集群搭建

基本集群搭建存在 `单点故障` 问题，要解决此问题就要借助  `zookeeper` ，启动最少 2 个Master

## 规划

此处只创建  2 个 Master，3 个 Worker
- node1 ，node2 是 Master
- node3, node4 ,node5 是 Worker

## 开始搭建

1. `spark-env.sh` ,删掉 `SPARK_MASTER_IP`，添加
```
export JAVA_HOME=/usr/local/jdk-1.8
#Master的RPC通信端口，如果是 7077可以省略
export SPARK_MASTER_PORT=7077
#zk集群的主机地址，spark在zk中的文件存储路径
export SPARK_DAEMON_JAVA_OPTS="-Dspark.deploy.recoveryMode=ZOOKEEPER  -Dspark.deploy.zookeeper.url=zk1,zk2,zk3 -Dspark.deploy.zookeeper.dir=/spark"
```
2. node1 节点上 修改该 slaves 为 Worker 节点地址
```
node3
node4
node5
```
3. 拷贝 配置文件到所有节点
4. node1 上执行 `start-all.sh`, 会启动整个集群
5. node2 上启动执行 `start-master.sh`
