---
title: '[zookeeper]01_安装&基本使用'
tag: zookeeper
category: zookeeper
date: 2017-11-01 11:23:00
---

# zookeeper安装以及使用

建议把所有的zookeeper节点放在 datanode 节点上。

## 安装

下载解压之后，删除无用的目录和文件，仅仅保留
```
bin  
conf  
lib  
zookeeper-3.4.10.jar
```
然后进行一下配置
1. 修改配置文件
```
mv conf/zoo_simple.cfg  conf/zoo.cfg
```
修改文件内容， 主要是修改数据缓存目录 `dataDir`，节点名称

```
tickTime=2000
initLimit=10
syncLimit=5
dataDir=/root/zkdata
clientPort=2181
server.1=hdpdn0:2888:38888
server.2=hdpdn1:2888:38888
server.3=hdpdn2:2888:38888
```
2. 每个节点上 `/root/zkdata` 内添加文件 `myid`,内容是 `1` ，`2`，`3` 等id

## 基本使用

1. 启动/停止/状态
```
bin/zkServer.sh start
bin/zkServer.sh status
bin/zkServer.sh stop
```
2. 客户端的使用
```
bin/zkCli.sh
```
进入交互模式，使用 `help` 查看帮助
```
ls  /  == 查看
create /aaa 999 == 创建key为 /aaa ,值为999的对象
get /aaa   == 获取 /aaa 的值
set /aaa 0000 == 修改/aaa的值
set -s /aaa/bbb 33 == 会生成 /aaa/bbb0000000 
set -s /aaa/bbb 46 == 自增生成 /aaa/bbb0000001 
```
这里值得注意的是，zookeeper 的key键比较特殊，以path `/aaa/bbb` 的样式存在，value则是正常的数据，而且多台
zookeeper 节点通讯是是实时的。用它存储的数据最好不要超过 `1M` 


## 快捷启动小脚本

```
#!/bin/bash

for SERVER in hdpdn0 hdpdn1 hdpdn2
do
echo "Starting Server $SERVER....."
ssh $SERVER "source /etc/profile ; /usr/local/zookeeper-3.4.10/bin/zkServer.sh start"
done

for SERVER in hdpdn0 hdpdn1 hdpdn2
do
echo "Checking Status $SERVER...."
ssh $SERVER "source /etc/profile ; /usr/local/zookeeper-3.4.10/bin/zkServer.sh status"
done
```
