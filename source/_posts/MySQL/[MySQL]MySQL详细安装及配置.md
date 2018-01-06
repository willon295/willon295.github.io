---
title: '[MySQL]MySQL安装及配置及远程登录' 
tag: MySQL
category: MySQL
date: 2016-10-12 12:34:22
---

# windows安装MySQL

## zip绿色安装

1. 官网下载mysql的压缩包，解压到相应的目录，比如 `D:\env\mysql5556`
2. 进入 `bin` 目录，在此处打开 `cmd`
3. 执行 `mysqld --install` 进行mysql的服务安装
4. 版本不同， `5.7之后` 的版本需要进行初始化
```
mysqld --initialize
```
初始化之后会默认生成一个 `root` 用户，密码为空
5. 到此安装结束，启动mysql服务： `netstat start  mysql5556`

## MSI安装

MSI安装提供图形化界面，比较容易。  
在选择自定义安装时，可以自定义 安装的服务，监听的端口，服务的名称，用户名以及密码等等。安装完成后，输入
```
service.msc
```
启动mysql服务

# 简单使用

1. 打开 `cmd` 窗口
2. 输入 `mysql -u用户名   -p密码`  ， 登录mysql
3. 出现 `mysql>`  提示符表示成功


# Ubuntu安装mysql

## 手动安装

1. 下载 mysql deb版的归档包
2. 解压deb包到任意目录
3. 先安装 mysql-common libmysqlclient libmysqlXXX  
4. 在选择安装 mysql-community-client mysql-community-server包

## 自动安装

1. 使用命令安装
- debina系列： sudo apt install community-mysql-server
- redhat系列： yum install  mysql-server
注意： 最新的 debian9，Centos7,Fedora27 系列已经不再使用mysql，而是使用 MariaDB


# mysql配置

## 端口及字符编码

1. 修改 `/etc/mysql/mysqld.conf.d/mysqld.conf`，写入：
```
[mysqld]
#修改端口
port=5700
#指定默认字符编码
character-set-server=utf8
```

## 远程登录配置

1. 修改 `/etc/mysql/mysqld.conf.d/mysqld.conf`，注释
```
bindaddress = 127.0.0.1
```
2. 修改数据库 `mysql.user.Host`字段
```
use mysql;
update user set Host='%' where user='用户名'; 
```
3. 重启mysql服务
