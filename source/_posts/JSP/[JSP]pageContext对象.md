---
title: '[JSP]pageContext对象'
tags:
  - java
  - JavaEE
  - JSP
categories:
  - JSP
date: 2016-12-29 23:17:48
---

## JSP内置对象 - pageContext
- `pageContext`对象提供了对JSP页面中所有对象及名字空间的访问操作
- `pageContext`对象可以访问本页面的session，可以访问本页面的application对象的任意属性值
- `pageContex`t对象是某个页面中所有功能的集大成者

## pageContext对象的常用方法：
- `JspWriter getOut()` 返回当前客户端相应被使用的JspWriter流（out）
- `HttpSession getSession()` 返回当前页面中HttpSession对象（session）
- `Object getPage() `返回当前页面的Object对象（page）
- `ServletRequest getRequest()` 返回当前面的ServletRequest对象（request）
- `servletResponse getResponse()`: 返回当前页的ServletResponse对象（response）
- `void setAttribute(Strign name, Object attribute) `设置属性及属性值
- `Object.getAttribute(String name ,int scope)` 在指定范围内取属性值
- `int getAttributeScope(String name)` 返回某属性的作用范围
- `void forward(String relativeUrlPath)` 使当前页面跳转到另外一个页面（服务器转发）
- `void .include(String relativeUrlPath) `在当前位置包含另一个文件

### config对象 常用方法
- `ServletContext getServletContext()`:返回含有服务器相关信息的ServletContext对象
- `String getInitParameter(String name)`:返回初始化参数的值
- `Enumeration getInitParameterNames()`:返回Servlet初始化所需所有参数的枚举</pre>
