---
title: '[Hadoop]00_Hadoop-HA搭建'
category: Hadoop
tags: Hadoop
date: 2018-11-12 00:17:33
---


# 基本了解

1. 什么是 Hadoop ?
大数据处理框架 , 包含两个核心组件: 
- HDFS:  分布式文件系统（Hadoop Distributed File System)
- MapReduce: 分布式计算框架
2. 什么是 Hadoop-HA ?
对于一个集群而言, 需满足高可用(High Availability), Hadoop-HA 则需要满足
- 分布式文件系统高可用   --->  HDFS-HA --->  Namenode(主节点)高可用 ---> 依赖 zookeeper
- 分布式计算高可用  ---> 任务调度工具 (YARN-HA)  --->  ResourceManager(高可用) 


# 搭建基本步骤

## Preparation

### 节点准备

|节点|安装软件|Jps|
|---|---|---|
|node-01| JDK,Hadoop | NameNode,DFSZKFailoverController,JournalNode,ResourceManager |
|node-02| JDK,Hadoop | NameNode,DFSZKFailoverController,JournalNode,ResourceManager |
|node-11| JDK,Hadoop,zookeeper  | DataNode,QuorumPeerMain,JournalNode,NodeManager |
|node-12| JDK,Hadoop,zookeeper  | DataNode,QuorumPeerMain,JournalNode,NodeManager |
|node-13| JDK,Hadoop,zookeeper  | DataNode,QuorumPeerMain,JournalNode,NodeManager |
|node-14| JDK,Hadoop,zookeeper  | DataNode,QuorumPeerMain,JournalNode,NodeManager |

### 环境准备

1. 关闭所有节点防火墙,Selinux
2. Java环境准备
3. 2台 `主节点` 可以免密登录任意 `数据节点`


## HDFS-HA


## YARN-HA
