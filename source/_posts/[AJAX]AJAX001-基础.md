---
title: '[AJAX]AJAX001_基础'
date: 2017-05-24 19:29:07
tags: 
  - JS
  - Ajax
 
---

## 什么是AJAX

AJAX = 异步 `JavaScript` 和 `XML`。


## 工作流程

### 创建一个 XMLHttpRequest对象

```
var xmlhttp = new XMLHttpRequest();
```

### xmlHttpRequest对象发送请求到服务器

```
xmlhttp.open(method,url,async);
//xmlhttp.setRequestHeader(key,value);请求头
xmlhttp.send();
```


| open()参数 | 说明|
|-----|-----|
|method| GET,POST|
|url|请求服务器资源地址|
|async|true,false:是否异步|

### 服务器响应，web段做出相应的处理

```
var xmlDoc = xmlhttp.responseXML();
var xmlTxt = xmlhttp.responseText();

```

|方法|说明|
|---|---|
|responseXML()|响应对象为xml文档|
|xmlhttp.responseText()|响应对象为txt文档|