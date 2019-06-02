---
title: '[Oracle]00_01_archlinux安装oracle'
category: Oracle
tag: Oracle
date: 2018-05-12 00:00:01
---

# Oracle 软件安装

1. 从AUR安装
```
yaourt  -S  oracle-xe-11g
```
2. 修改 `pkgbuild` 文件
- 删除下载文件 `oracle-xe-11.2.0-1.0.x86_64.rpm` 相关的行
- 删除解压 `oracle-xe-11.2.0-1.0.x86_64.rpm` 相关的行
- 删除 md5 矩阵内的 `第一行`
3. 从 这里下载 `oracle-xe-11.2.0-1.0.x86_64.rpm` 文件
4. 解压该rpm包内的文件到 `/tmp/yao-tmp-用户名/aur-orcle-xe-11g/src`
5. 修改  `/tmp/yao-tmp-用户名/aur-orcle-xe-11g/src` 目录下所有文件的owner
```
chown -R  willon:willon /tmp/yao-tmp-willon/aur-orcle-xe-11g/src/
```
6. 继续执行， 在构建打包完成之后， oracle安装完成， 进入后续配置


# Oracle 后续配置

1. 将 root 、当前用户 加入 `dba` 组
```
usermod  -a -G dba willon
```
2. oracle初始化配置, 输入命令之后默认回车即可
```
/etc/rc.d/oracle-xe  configure
```
3. 配置 `ORACLE_HOME` , `ORACLE_SID` 环境变量
```
export ORACLE_HOME=/usr/lib/oracle/product/11.2.0/xe
export PATH=$ORACLE_HOME/bin:$PATH
export ORACLE_SID=XE
```

# Oracle 服务管理

1. 开始、重启等操作

```
/etc/rc.d/oracle-xe  start | restart | stop 等
```
2. 登陆
```
sqlplus / as sysdba
```


