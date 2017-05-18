---
title: '[JSP] session对象'
tags:
  - JavaEE
  - JSP
id: 192
categories:
  - JSP
date: 2016-12-29 21:02:40
---

### 简介:

<pre>用户打开浏览器访问服务器那一刻开始，就开始了一个会话，一个会话保存在一个session中 ，直到用户关闭所有与服务器的连接。
会话结束.
有关会话session的正确描述：
1.session是用来保存用户状态的一种机制
2.会话保存在<span style="color: #ff0000;">服务器</span>的内存里
3.每一个会话对应一个唯一的sessionId
4.session对象中可以保存数据，通过setAattribute(key,object)方法保存对象，session 的任何页面可以通过get</pre>
<pre>Aattribute(key)方法获取value。

</pre>

### SESSION生命周期

<pre>创建：当客户端第一次访问某个jsp或者Servlet时候，服务器会为当前回话创建一个SessionId，每次客户端向服务端发送请求时，都会将此SessionId携带过去，服务端会对此SessionId进行校验。
活动：
      1、某次回话当中通过超链接打开的新页面属于同一次回话。
      2、只要当前回话页面没有全部关闭，重新打开新的浏览器窗口访问同一个项目资源时数据域同一次回话。
      3、除非本次会哈的所有页面都关闭后再重新访问某个jsp或者Servlet将会床架新的回话。
      注意：注意原有会话还存在，只是这个旧的SessionId仍然存在于服务端，只不过在也没有客户端会携带它让后交予服务端校验。
销毁：Session的销毁只有三种方式：
     1、调用了session。invalidate()方法
     2、Session过期
     3、服务器重新启动</pre>
&nbsp;