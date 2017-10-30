---
title: '[Hadoop]01_安装配置测试'
tag: Hadoop
category: Hadoop
date: 2017-08-28 12:22:33
---


# Hadoop安装

## 准备工作

### 下载Hadoop和jdk
1. Hadoop
点击 [官网链接](http://hadoop.apache.org)，下载相应的版本的`hadoop-xxx-bin.tar.gz`包
2. jdk1.8
点击[官网链接](http://www.oracle.com/technetwork/java/javase/downloads/),下载Linux版本的文件。

### 安装jdk

1. 解压到 `/usr/local/lib/`目录下
2. 配置`java环境变量`，分为两种，为所有用户配置`/etc/profile`,为当前用户配置`~/.bashrc`，追加以下代码
```
#set java enviroment
export JAVA_HOME=/usr/local/lib/jdk1.8.0_131
export CLASSPATH=.:$JAVA_HOME/lib/tools.jar
export PATH=$JAVA_HOME/bin:$PATH
```
3. 保存重新加载`.bashrc`或者是`profile`,输入`which java`测试


### 安装Hadoop

1. 解压到`/usr/local/lib`目录
2. 配置`Hadoop环境变量`，编辑 `/usr/local/lib/hadoop3/etc/hadoop/hadoop-env.sh` 文件，追加以下代码
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
3. 完成之后使用 cd 到 `hadoop3/sbin/`目录，执行`start-all.sh`


## hadoop web页面端口占用情况
管理界面：http://localhost:8088

NameNode界面：http://localhost:50070

HDFS NameNode界面：http://localhost:8042


