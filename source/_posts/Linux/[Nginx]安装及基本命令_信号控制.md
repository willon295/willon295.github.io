---
title: '[Nginx]安装以及基本命令_信号控制'
category: Nginx
tag: Nginx
date: 2019-03-03 00:00:00
---


# Nginx安装

操作系统为 Centos7

1. 环境准备： 需要准备编译安装需要的工具
```bash
yum install gcc   pcre  pcre-devel  zlib zlib-devel  -y
```
> gcc为编译需要， pcre,zlib为HTTP模块依赖

2. 编译安装
```bash
wget http://nginx.org/download/nginx-1.14.2.tar.gz
tar zxf nginx-1.14.2.tar.gz 
cd nginx-1.14.2
./configure  --prefix=/usr/local/nginx
make && make install 
```
> --prefix 参数指定安装前缀

3. 安装完成之后， 多出目录 `/usr/local/nginx/` , 该目录的文件结构为 
```
conf: 配置文件目录
html: 默认虚拟机站点根目录
sbin: 二进制可执行文件目录
logs: 日志文件目录
```
`logs`  目录在nginx启动之后会出现三个文件， 
- access.log(访问日志) 
- error.log(错误日志) 
- nginx.pid（master进程id）

# 常用命令

1. 启动
```bash
/usr/local/nginx/sbin/nginx
```
2. 停止
```bash
/usr/local/nginx/sbin/nginx -s stop
```
3. 重新启动
```bash
/usr/local/nginx/sbin/nginx  -s reload
```


# 信号控制 

命令为：  `kill  信号控制参数   master进程pid`， 

|参数|解释|
|---|---|
|TERM,INT|快速销毁|
|QUIT|优雅关闭进程，等待请求结束之后再关闭|
|HUP|当配置文件被修改时，平滑加载配置文件|
|USR1|重新读取日志，在日志按月日划分时可用|
|USR2|平滑升级|
|WINCH|优雅关闭woker进程，配合USR2进行升级|

