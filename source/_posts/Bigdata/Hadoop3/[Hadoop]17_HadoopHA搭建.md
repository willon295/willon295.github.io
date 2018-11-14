---
title: '[Hadoop]17_Hadoop-HA搭建'
category: Hadoop
tags: Hadoop
date: 2017-08-28 00:17:33
---

Hadoop HA(High Availability) 包括 `HDFS-HA` 和 `YARN-HA` ，主要解决单点故障问题，此处主要通过 `zookeeper` 工具搭建


# HDFS-HA 搭建


##  节点准备

|节点|安装软件|Jps|
|---|---|---|
|node-00| JDK,Hadoop | NameNode,DFSZKFailoverController,JournalNode,ResourceManager |
|node-01| JDK,Hadoop | NameNode,DFSZKFailoverController,JournalNode,ResourceManager |
|node-10| JDK,Hadoop,zookeeper  | DataNode,QuorumPeerMain,JournalNode,NodeManager |
|node-11| JDK,Hadoop,zookeeper  | DataNode,QuorumPeerMain,JournalNode,NodeManager |
|node-12| JDK,Hadoop,zookeeper  | DataNode,QuorumPeerMain,JournalNode,NodeManager |


## core-site.xml

```xml
<configuration>

    <!-- Set cluster name -->
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://mycluster</value>
    </property>

    <!-- Set zookerper address -->
    <property>
        <name>ha.zookeeper.quorum</name>
        <value>node-11:2181,node-12:2181,node-13:2181</value>
    </property>

    <!-- Set tmpdir -->
    <property>
        <name>hadoop.tmp.dir</name>
        <value>/root/hadoopData/tmp</value>
    </property>
</configuration>
```

## hdfs-site.xml

主要配置通信节点
```xml
<configuration>

    <!-- Set nameservices,which is the same as  in core-site.xml-->
    <property>
        <name>dfs.nameservices</name>
        <value>mycluster</value>
    </property>

    <!--Set namesevices  IDs -->
    <property>
        <name>dfs.ha.namenodes.mycluster</name>
        <value>nn1,nn2</value>
    </property>

    <!--Set rpc-address -->
    <property>
        <name>dfs.namenode.rpc-address.mycluster.nn1</name>
        <value>node-01:9000</value>
    </property>
    <property>
        <name>dfs.namenode.rpc-address.mycluster.nn2</name>
        <value>node-02:9000</value>
    </property>

    <!--Set http-address  IDs -->
    <property>
        <name>dfs.namenode.http-address.mycluster.nn1</name>
        <value>node-01:50070</value>
    </property>
    <property>
        <name>dfs.namenode.http-address.mycluster.nn2</name>
        <value>node-02:50070</value>
    </property>

    <!--Set the path of jounalNode -->
    <property>
        <name>dfs.namenode.shared.edits.dir</name>
        <value>qjournal://node-11:8485;node-12:8485;node-13:8485/mycluster</value>
    </property>
    <property>
          <name>dfs.journalnode.edits.dir</name>
          <value>/root/hadoopData/journal</value>
    </property>

    <!--Enable automatic failover -->
    <property>
        <name>dfs.ha.automatic-failover.enabled</name>
        <value>true</value>
    </property>
    <property>
        <name>dfs.client.failover.proxy.provider.mycluster</name>
        <value>org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider</value>
    </property>
    <property>
        <name>dfs.ha.fencing.methods</name>
        <value>shell(/bin/true)</value>
    </property>
    <!--ssh免登陆 -->
    <property>
        <name>dfs.ha.fencing.ssh.private-key-files</name>
        <value>/root/.ssh/id_rsa</value>
    </property>

    <!-- set local  dir of namenode and datanode -->
    <property>
       <name>dfs.name.dir</name>
       <value>/root/hadoopData/hdfs/name</value>
    </property>
    <property>
       <name>dfs.data.dir</name>
       <value>/root/hadoopData/hdfs/data</value>
    </property>

    <property>
        <name>dfs.permissions</name>
        <value>false</value>
    </property>
</configuration>
                                   

```

## slaves

只能配置 datanode 的地址

```
node-11
node-12
node-13
```

## 格式化以及启动集群

1. 启动 zk 集群 =>  node-11,node-12,node-13
```
zkServer.sh start
//出现进程  QuorumPeerMain
```

2. 启动 `journalnode`，格式化 ZK => node-01, node-02其中一台
```
hadoop-daemon.sh start journalnode
// 出现进程JournalNode
hdfs zkfc -formatZK
//出现进程  DFSZKFailoverController
```
3. 格式化 namenode => node-01
```
hadoop  namenode  -format
```
4. 启动 dfs集群  => node-01
```
start-dfs.sh 
```
5. 启动 standby => node-02
```
hdfs namenode -bootstrapstandby
```
此时会有一个  `active` ,一个 `standby`



# Yarn-HA 搭建

## mapred-site.xml

```xml
<configuration>
	<property>
		<name>mapreduce.framework.name</name>
		<value>yarn</value>
	</property>
</configuration>
```




## yarn-site.sh


```xml
<configuration>

    <property>
            <name>yarn.resourcemanager.ha.enabled</name>
            <value>true</value>
    </property>


    <property>
            <name>yarn.resourcemanager.cluster-id</name>
            <value>yarncluster</value>
    </property>

    <property>
            <name>yarn.resourcemanager.ha.rm-ids</name>
            <value>rm1,rm2</value>
    </property>

    <property>
            <name>yarn.resourcemanager.hostname.rm1</name>
            <value>node-01</value>
    </property>
    <property>
            <name>yarn.resourcemanager.hostname.rm2</name>
            <value>node-02</value>
    </property>


    <property>
            <name>yarn.resourcemanager.webapp.address.rm1</name>
            <value>node-01:8088</value>
    </property>
    <property>
            <name>yarn.resourcemanager.webapp.address.rm2</name>
            <value>node-02:8088</value>
    </property>



    <property>
            <name>yarn.resourcemanager.zk-address</name>
            <value>node-11:2181,node12:2181,node-13:2181</value>
    </property>

    <property>
            <name>yarn.nodemanager.aux-services</name>
            <value>mapreduce_shuffle</value>
    </property>


</configuration>

```


## 启动 yarn-ha集群

1. 启动 yarn 集群 => node-01
```
start-yarn.sh
```
2. 启动 resourcemanager => node02
```
yarn-daemon.sh start resourcemanger
```

