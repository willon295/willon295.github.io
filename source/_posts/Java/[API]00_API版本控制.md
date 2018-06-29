---
title: '[API]00_API版本控制'
tag: API
category: API
date: 2017-10-22 00:00:00
---

版本的不同主要是发生 `URL -- 资源` 访问的变更，可以参考一下方式。

# 通过URL

## 部署，通过Nginx配置

前提： 不同的版本都独立部署
如外部访问： http://demo.com/v1/,   http://demo.com/v2/
内部Nginx配置： 
```
location /v1/{
    proxy_pass http://127.0.0.1:8000/api/;
}
location /v2/{
    proxy_pass http://127.0.0.1:9000/api/;
}
```

## 修改 servletContext

前提： 不同的版本都独立部署
修改 application.servlet.contextPath 

## 通过request参数

添加 version 参数
```
@Getmapping(params="version=1")
public void  getV1(int id){
    
}

@Getmapping(params="version=2")
public void  getV2(int id){
    
}
```

