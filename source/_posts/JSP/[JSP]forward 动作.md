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

### forward动作语法
语法：`<jsp:forward page="URL"/>`
等同于（服务器内部转发指令）

	request.getRequestDispacher("URL").forward(req,res);

### 四种跳转
- <% response.sendRedirect("login_seccess.jsp"); %>;//告诉浏览器此路不通,你再问问另一页面能解决你的问题不?
- <jsp:forward page="login_fail.jsp"/&gt; //服务器将请求转发到另一页面,浏览器不知情.
- <% pageContext.forward("login_fail.jsp");%&gt; //服务器将请求转发到另一页面,浏览器不知情.
<% request.getRequestDispatcher("login_fail.jsp").forward(request,response);> //服务器将请求转发到另一页面,浏览器不知情