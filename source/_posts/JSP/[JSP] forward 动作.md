---
title: '[JSP] forward 动作'
tags:
  - java
  - JavaEE
  - JSP
id: 206
categories:
  - JSP
date: 2016-12-29 23:17:48
---

<pre>**forward动作语法**
语法：<span style="color: #ff0000;">&lt;jsp:forward page="URL"/&gt;</span>
等同于（服务器内部转发指令）
<span style="color: #ff0000;"> request.getRequestDispacher("URL").forward(req,res);</span>

**四种跳转**
&lt;% response.sendRedirect("login_seccess.jsp"); %&gt;//告诉浏览器此路不通,你再问问另一页面能解决你的问题不?
&lt;jsp:forward page="login_fail.jsp"/&gt; //服务器将请求转发到另一页面,浏览器不知情.
&lt;% pageContext.forward("login_fail.jsp");%&gt; //服务器将请求转发到另一页面,浏览器不知情.
&lt;% request.getRequestDispatcher("login_fail.jsp").forward(request,response);%&gt; //服务器将请求转发到另一页面,浏览器不知情.</pre>