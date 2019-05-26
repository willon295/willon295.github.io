---
title: '[AJAX]03_跨域问题的产生_解决办法'
category: Ajax
tag: Ajax
date: 2018-07-14 00:00:00
---



# 什么是跨域问题

## 发生的条件

1.  `调用方`   和 `被调用方` 不在同一域
2. 浏览器会进行响应跨域校验
3. 发送的是 `XHR`  （XML HttpRequest）类型请求

> 解决跨域问题 只要打破其中一个条件即可

## 产生的问题

1.  `被调用方` ： `正常响应`  请求
2.  `调用方` ： `正常请求` ，不正常的数据响应  `Access-Control-Allow-Origin Not allow`

举个例子 ： http://localhost:63343 请求  http://localhost:8080/get

```
Failed to load http://localhost:8080/get: 
No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:63343' is therefore not allowed access.
```

发生跨域



## Why

说到底还是 `浏览器` 的锅， 每次浏览器发送 `请求` （简单请求，非简单请求）之后，浏览器会做以下几件事情：



### 简单请求

简单请求就是 `get，post`， 浏览器是 `先执行`，`后校验` 

1. 直接执行请求，多出一个Header ： `Access-Control-Allow-Origin`
2. 得到返回数据， 进行数据验证，如果不是同一域， 报错

### 非简单请求

其他 `put` `delete	` 等请求， 浏览器会 `先校验`  ，`再执行`， 如果跨域，直接报错



# 如何解决



##  浏览器设置

这是一个 `不合理` 的解决办法，因为不是每位用户都会操作， 以chrome为例，启动时带上参数： 

```
Chrome --args --disable-web-security
```



##  JSONP方式

首先注意这也是一个 `不怎么友好` 的解决方式， 因为前端 请求数据类型需要改成 `jsonp` ， `被调用方` 需要 `全局过滤器`  设置 `callback` 方法名，注意的是：

1. 发送和返回的数据是 `js 回调函数` ， 不是简单的 JSON 数据
2. 发送的 `callback`  参数名称 必须和 被调用方 `相同` 
3. 只能处理 get 方式请求

## Spring MVC方式

这个解决方式 `比较友好` ，在 每个 `Controller` 之上写 `@CrossOrigin(origins = "*", maxAge = 3600)` ,释义：

1. 允许跨域，增加响应头，浏览器校验到允许跨域之后，请求方正常响应
2. 设置跨域校验时间： 在3600秒内浏览器不再校验

举个实例： 

**后端代码** : 

```java
@RestController
@CrossOrigin(allowedHeaders = "*", maxAge = 3600)
public class IndexController {

    @GetMapping("/get")
    public User get() {
        return new User(1, "willon");
    }
}

```





## Nginx代理解决

这是一个比较好的解决凡是，具体解决则取决于整个 站点的 架构设计， 可以分为两种方式 

1. 显示跨域：  浏览器URL可以看到实际的请求地址
2. 隐式跨域： 浏览器URL还是当前域， 只是请求被Nginx转发

这里介绍 `隐式跨域` ，请求的过程： 

```
请求 a.com/get 
--> Nginx服务器 
--> 代理 a.com/get 请求到 b.com:8080/get
--> b.com:8080/get 处理并返回给 Nginx  
-->  Nginx响应给请求方

```



### 配置文件

1. `a .com`  配置

   ```javascript
   //前台请求代码
   function get() {
           $.ajax({
               url: "/get",
               type: "GET",
               success: function (res) {
                   console.log(res.id + "___" + res.name);
               },
               error: function (res) {
   
                   console.log(res)
               }
   
           })
      }
   ```

   ```nginx
   #nginx配置文件
   upstream b.com{
       server b.com:8080;
   }
   
   server{
       listen 80;
       server_name a.com;
       root  /www/a_com;
       location / {
       }
       #将本地的请求转发给 b.com/get
       location /get {
           proxy_pass http://b.com/get;
       }
   }
   
   ```

   

2.  `b.com` 配置文件,简单的配置

   ```nginx
   #nginx配置
   server{
       listen 80;
       server_name b.com;
   }
   ```

   ```java
   //后端处理
   @RestController
   public class IndexController {
   
       @GetMapping("/get")
       public User get() {
           return new User(1, "willon");
       }
   }
   ```

3. 当 a.com 发送请求之后， b.com 会处理并且响应， 不会发生跨域带来的问题。



从调用者的角度看 ： 发送的请求是这样的

```javascript
Request URL: http://a.com/get
Request Method: GET
Status Code: 200 
Remote Address: 127.0.0.1:80
Referrer Policy: no-referrer-when-downgrade
```

