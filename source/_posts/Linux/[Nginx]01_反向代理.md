---
title: '[Nginx]01_反向代理'
tag: Nginx
category: Linux
date: 2017-05-01 00:01:00
---

# 正向代理

`正向代理` 就是 用户通过 `代理服务器` ，获取相应的 `目标服务器` 内容。

1. 大概流程
`用户发送请求` ==> `代理接受请求` ==> `代理服务器获取并缓存目标服务器内容` ==> `代理服务器返回内容给用户`。
2. 举个实例： FQ(科学上网)


# 反向代理

听名字很高大上，简单概括就是： `请求分发`

1. 大概流程
`用户发送请求` ==> `代理服务器`  ==> `转发给幕后N台服务器`  ==> `幕后服务器处理用户请求`
2. 举个实例：百度搜索东西
`发送请求` ==> `代理服务器` ==> `寻找与用户最近/同一网段的服务器` ==> `最近/同一网段的服务器处理用户请求`

## 反向代理的好处

1. 负载均衡
2. 访问加速


# Nginx反向代理配置

**简单介绍**
1. 两台 `tomcat` 服务器, tomcat1监听 `8080` ,tomcat2监听 `8081`
2. 一台 `Nginx` 代理服务器，监听 `80`

**hosts解析**

```
127.0.0.1 tomcat1.com
127.0.0.1 tomcat2.com
```

**配置**

```
upstream tomcat1{
    #真正处理tomcat1.com的服务器
    server 127.0.0.1:8080;
}

upstream tomcat2{
    #真正处理tomcat2.com的服务器
    server 127.0.0.1:8081;
}



server {
    listen  80;
    server_name tomcat1.com;
    location / {
        #将tomcat1.com请求转发给tomcat1
        proxy_pass http://tomcat1;
        index index.html index.php index.htm;
    }

}



server {

    listen  80;
    server_name tomcat2.com;

    location / {
        #将tomcat2.com请求转发给tomcat2
        proxy_pass http://tomcat2;
        index index.html index.php index.htm;
    }

}

```
