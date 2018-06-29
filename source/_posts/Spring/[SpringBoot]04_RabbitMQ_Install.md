---
title: '[SpringBoot]04_RabbitMQ_Install'
tags:
  - SpringBoot
  - RabbitMQ
category: SpringBoot
date: 2018-06-20 00:04:00
---

# What?

`RabbitMQ` 是开源的 `消息队列` 框架。特点是： 异步，高性能



# 安装

基于 Fedora

1. 安装 `erlang`
```
dnf install  erlang
```
2. 安装 `rabbitmq-server`
```
dnf  install rabbitmq-server
```
3. 安装 `web管理页面`
```
rabbitmq-plugins enable management
```
4. 添加用户
```
rabbitmqctl add_user willon  123456
rabbitmqctl  set_user_tags  willon management
rabbitmqctl  set_permissions  willon ".*" ".*" ".*"
```
5. 查看 `127.0.0.1:15672` 即可

