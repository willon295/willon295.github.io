---
title: '[JSP]pageContext对象'
tags:
  - java
  - JavaEE
  - JSP
id: 198
categories:
  - JSP
date: 2016-12-29 21:29:37
---

<pre>JSP内置对象 - pageContext
（1）pageContext对象提供了对JSP页面中所有对象及名字空间的访问操作
（2）pageContext对象可以访问本页面的session，可以访问本页面的application对象的任意属性值
（3）pageContext对象是某个页面中所有功能的集大成者
---------------------------------------
pageContext对象的常用方法：
（1）JspWriter getOut() 返回当前客户端相应被使用的JspWriter流（out）
（2）HttpSession getSession() 返回当前页面中HttpSession对象（session）
（3）Object getPage() 返回当前页面的Object对象（page）
（4）ServletRequest getRequest() 返回当前面的ServletRequest对象（request）
（5）servletResponse getResponse() 返回当前页的ServletResponse对象（response）
（6）void setAttribute(Strign name, Object attribute) 设置属性及属性值
（7）Object <span style="color: #ff0000;">getAttribute</span>(String name ,int scope) 在指定范围内取属性值
（8）int getAttributeScope(String name) 返回某属性的作用范围
（9）void forward(String relativeUrlPath) 使当前页面跳转到另外一个页面（服务器转发）
（10）void <span style="color: #ff0000;">include</span>(String relativeUrlPath) 在当前位置包含另一个文件

config对象 常用方法： ServletContext getServletContext()返回含有服务器相关信息的ServletContext对象
String getInitParameter(String name)返回初始化参数的值
Enumeration getInitParameterNames()返回Servlet初始化所需所有参数的枚举</pre>