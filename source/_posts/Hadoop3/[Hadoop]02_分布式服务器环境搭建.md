---
title: '[Hadoop]02_分布式服务器网络环境搭建'
category: Hadoop
tags: Hadoop
date: 2017-08-28 12:22:33
---

# 简介

笔记本模拟 `分布式服务器环境` 和 `服务器局域网络环境` 搭建，实现服务器与服务器、宿主机和服务器之间可以相互通信。服务器可以访问外网

# 准备

## 环境准备

- `Linux操作系统宿主机`
- `VirtualBox`：创建多台服务器
- `Centos-server-minimal-x64.iso`: 服务器操作系统

## VirtualBox准备

1. 安装三台服务器： `hdp0 、 hdp1 、hdp2`
2. 网络设置为 `桥接`

# 服务器网络环境配置

## 分配并设置静态IP

先 `ifconfig` 查看 `宿主机` 所处于的 `IP段`,如 `192.168.1.*`段。服务器最好和宿主机处于同一段

1. 分配IP: `hdp0--192.168.1.150 ` ， `hdp1--192.168.1.151` ， `hdp02-192.168.1.152 `
2. 子网掩码: `255.255.255.0`
3. 网关: `192.168.1.1`
4. 修改 `/etc/hosts` 文件，加入对应的映射

## 代码实现

```
cat  >>  /etc/sysconfig/network-scripts/ifcfg-enp0s3 <<EOF
NETMASK="255.255.255.0"
GATEWAY="192.168.1.1"
EOF

cat  > /etc/resolv.conf  <<EOF
nameserver 192.168.1.1
EOF

cat > /etc/hosts  <<EOF
127.0.0.1 localhost
::1 localhost
192.168.1.150  hdp0
192.168.1.151  hdp1
192.168.1.152  hdp2
192.168.1.153  hdp3
EOF

```

# 宿主机配置

1. 主要修改 `/etc/hosts` 文件，加入映射
```
cat > /etc/hosts  <<EOF
127.0.0.1 localhost
::1 localhost
192.168.1.150  hdp0
192.168.1.151  hdp1
192.168.1.152  hdp2
192.168.1.153  hdp3
EOF

```

# 测试

1. 打开各主机，能相互 ping 通，并且都能 ping 到外网则成功
