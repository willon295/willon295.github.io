---
title: '[Oracle]00_安装及其启动'
category: Oracle
tag: Oracle
date: 2018-05-12 00:00:00
---

# Linux环境安装 Oracle Database 11g


## 准备

1. 下载数据包
[链接](http://www.oracle.com/technetwork/database/enterprise-edition/downloads/index.html)， 一共两个zip文件，全部下载。
2. 将两个文件解压在同一个目录
3. 检查软件包依赖，将未安装的软件包安装。
```
rpm -q binutils compat-libstdc++ elfutils-libelf elfutils-libelf-devel elfutils-libelf-devel-static gcc gcc-c++ glibc glibc-common glibc-devel glibc-headers kernel-headers ksh libaio libaio-devel libgcc libgomp libstdc++ libstdc++-devel make sysstat unixODBC unixODBC-devel
```

## 配置内核参数

1. 修改 `/etc/sysctl.conf`

```
fs.aio-max-nr = 1048576
fs.file-max = 6815744
kernel.shmall = 2097152
kernel.shmmax = 536870912
kernel.shmmni = 4096
kernel.sem = 250 32000 100 128
net.ipv4.ip_local_port_range = 9000 65500
net.core.rmem_default = 262144
net.core.rmem_max = 4194304
net.core.wmem_default = 262144
net.core.wmem_max = 1048586
```
2. 使设置生效
```
 /sbin/sysctl -p
```
3. 修改 `/etc/security/limits.conf`
```
oracle           soft    nproc   2047
oracle           hard    nproc   16384
oracle           soft    nofile  1024
oracle           hard    nofile  65536
```


## 安装

1. 运行 `runInstaller` 脚本
2. 按照步骤，主要注意选 `server`版， 密码，OracleSID，安装完成之后的目录一般在  `/home/XXX/app/XXX/product/11.2.0/dbhome_1/`
3. 配置环境变量 `ORACLE_HOME` 、 `ORACLE_SID`

## 启动

1. 启动监听
```
lsnrctl start
```
2. 启动数据库
```
sqlplus / as sysdba
startup
```



# 用户的创建

1. 创建用户
```
create user u1 identified by u1;
```
2. 授权
```
grant resource,connect to u1;
```
3. 切换用户
```
conn u1/u1;
```

# 解决终端方向键不能用的问题

1. 下载 `readline`  ,  `rlwrap`
2. 环境变量中追加
```
alias  sqlplus='/usr/bin/rlwrap  sqlplus'
```

# 解决启动监听 support no services

修改 `$ORACLE_HOME/network/admin/listener.ora` 文件，添加
```
SID_LIST_LISTENER =
(SID_LIST =
  (SID_DESC =
  (GLOBAL_DBNAME = orcl)
  (SID_NAME = oracleSID)
  )
)
```
