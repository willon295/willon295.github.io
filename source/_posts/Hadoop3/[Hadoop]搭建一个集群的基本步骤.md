---
title: '[Hadoop]搭建一个集群的基本步骤'
category: Hadoop
tags: Hadoop
date: 2017-09-28 12:22:33
---


# 配置免密登录

方便服务器集群管理， 配置免密十分必要。

1. 生成 ssh-key
一般此密钥只在主节点生成，然后分发公钥给其他节点。
```
ssh-keygen  -t rsa
```
2. 分发公钥脚本编写
```
#! /usr/bin/bash

#所有服务器的地址/域名
SERVERS="hdp0 hdp1 hdp2";

#其他服务器的密码
PASSWORD=hadoop

#实现输入密码登录
auto_ssh_copy_id(){
	expect -c "set timeout -1;
	spawn ssh-copy-id $1;
	expect {
		*yes/no* {send -- yes\r;exp_continue;}
		*assword:* {send -- $2\r;exp_continue;}
		eof {exit 0;}
	}";
}
#分发公钥到所有服务器
ssh_copy_id_to_all(){
	for SERVER in $SERVERS
	do
		auto_ssh_copy_id $SERVER $PASSWORD
	done
}

#开始执行
ssh_copy_id_to_all
```

# JDK环境准备

1. 下载 `jdk8` 版本的压缩包
2. 解压到 `/usr/local/lib/jdk8`
3. 配置 `$JAVA_HOME`环境变量，编辑 `/etc/profile`
```
export JAVA_HOME=/usr/local/lib/jdk8
export PATH=$JAVA_HOME/bin:$PATH
```

# HADOOP集群搭建

## 基本环境准备

主要配置环境变量
1. 下载 `Hadoop-XXX-bin.tagr.gz`包，解压到 `/usr/local/apps/hadoop`
2. 配置 `$HADOOP_HOME` 环境变量,编辑 `/etc/profile`
```
export HADOOP_HOME=/usr/local/apps/hadoop
export PATH=$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$PATH
```
3. 配置 HADDOOP 环境变量，编辑 `$HADOOP_HOME/etc/hadoop/hadoop-env.sh`
```
#set hadoop environment
export HADOOP_HOME=/usr/local/lib/hadoop3
export HADOOP_INSTALL=$HADOOP_HOME
export HADOOP_MAPRED_HOME=$HADOOP_HOME
export HADOOP_COMMON_HOME=$HADOOP_HOME
export HADOOP_HDFS_HOME=$HADOOP_HOME
export YARN_HOME=$HADOOP_HOME
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native
export HADOOP_OPTS="-Djava.library.path=${HADOOP_HOME}/lib/native/"
export PATH=$PATH:$HADOOP_HOME/sbin:$HADOOP_HOME/bin
```

## HDFS配置

1. `core-site.xml` ,配置缓存目录，主节点通信地址
```
<configuration>
	<property>
		<name>fs.defaultFS<name>
		<!-- 主节点的 IP 和端口 -->
		<value>hdfs://hdpnn0:9000</value>
	</property>
	<property>
		<name>hadoop.tmp.dir<name>
		<!-- 缓存目录 -->
		<value>/root/hadooptmp</value>
	</property>
</configuration>
```
2. `hdfs-site.xnml`,配置 `SecondaryNamenode`地址
```
<configuration>
	<property>
		<name>dfs.namenode.secondary.http-address<name>
		<!-- secondaryNamenode节点的 IP 和端口 -->
		<value>hdpnn0:50090/value>
	</property>
</configuration>
```
3. `slaves` ,配置所有从节点的IP地址
```
hdpdn0
hdpdn1
...
hdpdn2000
```
4. 拷贝当前 `hadoop` 文件夹到所有字节点
```
SERVERS='hdpdn0 hdpdn1 hdpdn2'
for SERVER in $SERVER
do
	scp /etc/profile  root@$SERVER:/etc
	scp -r /usr/local/apps/hadoop root@$SERVER:/usr/local/
done
```
## 启动集群

1. 一键启动
```
start-all.sh
```
2. 手动启动
```
start-dfs.sh
start-yarn.sh
```

# HBase的搭建

一般HBase会是哟该默认的 `zookeeper`,此处使用自定义的

## Zookeeper的安装和配置

1. 下载解压之后，删除无用目录，保留
```
bin  
conf  
lib  
zookeeper-3.4.10.jar
```
2. 拷贝配置文件
```
mv conf/zoo_simple.cfg  conf/zoo.cfg
```
3. 修改配置文件
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
4. 每个节点上 `/root/zkdata` 内添加文件 `myid` ,内容是 1 ，2，3 等id
5. 快速启动所有节点 `zookeeper`
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
## HBase配置

### hbase-env.sh

修改 `JAVA_HOME`,不使用自带的 `zookeeper`
```
export JAVA_HOME=/usr/local/jdk-8
export HBASE_MANAGES_ZK=false
```
### hbase-site.xml

修改 `默认的文件的储存路径`，是否使用集群，配置所有的zookeeper的 `通信地址`
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

修改这个文件的作用是： 让 `主节点` 知道 `和哪些节点通信`.配置IP或者是主机名即可
```
hdpdn0
hdpdn1
hdpdn2
```

### 分发安装包

将配置好的 `hbase 文件夹` 发送给所有节点

### 启动测试

注意：在这之前先启动 hadoop

1. 启动Hbase
```
bin/start-hbase.sh
```
2. `jps`查看
主节点会有
```
1187 NameNode
3642 Jps
3339 HMaster
```
从节点会有
```
2801 HRegionServer
2151 DataNode
2999 Jps
1933 QuorumPeerMain
```

# 搭建结束
