---
title: '[AJAX]02_Cookie与JSON.md'
tag: AJAX
category: AJAX
date: 2017-05-24 00:02:00
---



# Cookie 



Jqery ，Cookie的使用需要一个插件的支持： [Jqery-cookie](https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js)  ，前提是有 [Jqery](https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js) .

具体使用参考：[https://www.bootcdn.cn/jquery-cookie/readme/](https://www.bootcdn.cn/jquery-cookie/readme/)



## 基本使用

语法：

```javascript
$.cookie(name,value,{options...}) // 如果值传一个参数，代表取值
//举个例子， 指定数据的保存的 域名，路径， 有效期（天）
$.cookie("password","123445",{domain:"www.demo.com",path:"/",expires:7})
```



###  存储 JSON 数据

注意： cookie 的KV最好（只能）都为 `String`  类型的数据 。所以存储JSON对象可以这样

```javascript
//1. 先将 JSON 对象 转成字符串
var str  = JSON.stringify(user);
//2. 将字符串保存
$.cookie("user",str , {domain:"localhost",path:"/", expires=1})
```



### 获取 JSON 数据

注意： 先将 `String` 类型的数据转成 `JSON` 对象， 然后使用 JSON操作

```javascript
var str = $.cookie("user");
var user = JSON.parse(str);
console.log(user.name);
```



### 删除cookie



1. 删除所有cookie

   ```js
   $.cookie();
   ```

   

2. 删除特定cookie

   ```javascript
   $.removeCookie('name', { path: '/' })
   ```

   

