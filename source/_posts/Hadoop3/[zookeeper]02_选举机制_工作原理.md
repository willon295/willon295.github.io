---
title: '[zookeeper]02_选举机制_Observer模式'
tag: zookeeper
category: zookeeper
date: 2017-11-01 11:23:02
---


# 选举

投票基本规则： 只投myid最大的，myid没有比自己大的时，投自己。 大概流程：
1. 启动 zk 服务
2. 获取 myid 内容
3. 第一台启动时发现只有自己，发现没有 id 比自己大的，投票给自己
4. 第二台机器启动时，新的一轮投票开始，都投id最大的，于是第二台 为 `leader`
5. 第 n 台机器启动，发现已经有 `leader` ，自己成为 `flower`
6. 当 leader 因某种原因挂了， 新的一轮投票开始。


# Observer模式

How to use Observers
Setting up a ZooKeeper ensemble that uses Observers is very simple, and requires just two changes to your config files. Firstly, in the config file of every node that is to be an Observer, you must place this line:
```
peerType=observer
``` 
This line tells ZooKeeper that the server is to be an Observer. Secondly, in every server config file, you must add :observer to the server definition line of each Observer. For example:
```
server.1:localhost:2181:3181:observer
```
