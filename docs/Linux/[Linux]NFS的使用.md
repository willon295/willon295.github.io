---
title: '[Linux]NFS的使用'
tag: NFS
category: Linux
date: 2017-12-30 00:00:00
---

# 简介

`NFS` 即 网络文件系统，现在许多商业公司、网吧hi使用这种技术


## 服务端安装NFS

1. 安装
```
sudo apt install  nfs-common nfs-kernel-server
```
2. 配置，修改 `/etc/exports` 文件
```
共享目录  主机(参数)
/home/shares    192.168.43.115(rw,sysn,no-root-squash)
/home/share2    *(ro)
```

## 客户端使用

客户端挂载即可使用

```
mount -t nfs 服务器地址:/共享目录    /本机挂载目录
```

## 开机自动挂载

```
192.168.163.128：/nfsdir      /nfsdir      nfs  defaults,_rnetdev  1  1
```
