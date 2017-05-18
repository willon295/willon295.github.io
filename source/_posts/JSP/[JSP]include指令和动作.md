---
title: '[JSP] include指令和动作'
tags:
  - java
  - JavaEE
  - JS
id: 201
categories:
  - JSP
date: 2016-12-29 23:10:28
---

常用的有`page`、`include`、`taglib`指令这三种指令；
- `page`：位于页面顶端，一个页面可以包含多个page指令
- `include`：将一个外部文件嵌入jsp中，同时解析这个页面中的jsp语句。
- `taglib`：使用标签库，自定义新的标签，在jsp中启动定制行为。</pre>

### include指令

1.语法 :

	<%@ include file="地址"%>

案例：显示当前时间的页面。
- 写一个只输出时间的方法的`date.jsp`
- 用于显示的页面,包含`<% include file="date.jsp" %>`


### include动作

语法：

	<jsp:include page = "URL"flush="true|false"/>
	#page 要包含的页面
	#flush 被包含的页面是否从缓冲区读取



### 区别
include指令和动作的区别
1. 包含内容: `指令`包含的是`源代码`.`动作`包含的是`页面输出的结果`
2. 生成的servlet：指令会生成一个整体的Servlet；而动作会分别生成两个，即在一个Servlet中调用另一个Servlet
3. 其他区别如图：
![](http://oic1wftgk.bkt.clouddn.com/wp-content/uploads/includeaction.jpg)
4. 【使用场合】：页面内容不经常变化使用`includ`e指令，页面内容经常变化使用`<jsp:include>`动作



### 总结
能用动作解决的别用 指令解决