---
title: '[Hadoop]07_动态扩容'
category: Hadoop
tags: Hadoop
date: 2017-08-28 00:07:33
---

# 什么是动态扩容？

`动态扩容` 就是在整个集群不停机不下线的情况下，进行存储空间扩张。简单说就是
1. 我的所有集群在工作
2. 买了一台新的 `datanode` 服务器
3. 不想停止集群，把新机器加入集群

# 动态扩容的操作

## 新机器的配置

1. 防火墙
2. IP
3. 域名映射
4. 免密登录
5. Java环境 `jdk` , `/etc/profile`
6. 拷贝任意一台 `datanode` 的 `hadoop` 安装包

## Namenode配置

1. 修改配置 `slave` 文件，增加新机器的域名

```
hdpdn0
hdpdn1
hdpdn2
```
2. 如果是局域网/外网不通，最好修改 hosts 文件
```
hdpdn2 192.168.1.162
```
3. 拷贝免密登录公钥
```
ssh-copy-id  hdpdn2
```
4. 直接执行 `start-dfs.sh` 
