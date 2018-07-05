---
title: '[Linux]VirtualBox宿主机通信_虚拟机外网可用.md'
tag: NFS
category: Linux
date: 2017-12-30 00:01:00
---

## 



# 需求



1. 宿主机之间可通信
2. 主机更换IP，虚拟机不需更改任何配置
3. 虚拟机可访问外网
4. 虚拟机 IP 固定不变
5. 虚拟机之间可相互通信



# VirtualBox配置

1.  `全局设定`  --> `网络`   中添加 两个网络 `仅主机（HostOnly）` 、 `natnetwork`  （不添加会提示找不到界面）
2. `HostOnly` 默认的网段是`192.168.56.XXX` ， `NatNetwork` 默认的网段是  `10.0.2.0/24`  
3. 新建 centos虚拟机， 在 `设置`  --> `网络` 中添加两个网卡， 一个 `HostOnly` ， 一个 `NatNetwork` 

# Centos配置



加入第一块网卡是 nat方式， 名称为 `enp0s3`， 第二块是 hostonly 方式名称为 `enp0s8` ，那么要做如下配置

1. 修改natnetwork网卡配置

   ```bash
   vi  /etc/sysconfig/network-scripts/ifcfg-enp0s3
   
   #修改成静态IP
   TYPE="Ethernet"
   PROXY_METHOD="none"
   BROWSER_ONLY="no"
   BOOTPROTO="static"
   DEFROUTE="yes"
   IPV4_FAILURE_FATAL="no"
   NAME="enp0s3"
   DEVICE="enp0s3"
   ONBOOT="yes"
   IPADDR="10.0.0.111"
   NETMASK="255.255.255.0"
   GATEWAY="10.0.0.1"
   
   ```

2. 修改hostonly网卡配置

   ```bash
   TYPE=Ethernet
   PROXY_METHOD=none
   BROWSER_ONLY=no
   BOOTPROTO=static
   DEFROUTE=yes
   IPV4_FAILURE_FATAL=no
   IPV6INIT=no
   DEVICE=enp0s8
   ONBOOT=yes
   IPADDR=192.168.56.111
   NETMASK=255.255.255.0
   GATEWAY=195.168.56.1
   ```

3. 修改dns

   ```bash
   vi /etc/resolv.conf
   
   #修改成自己的dns
   nameserver  192.168.56.1
   nameserver  10.0.0.1
   ```

   