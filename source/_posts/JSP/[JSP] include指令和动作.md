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

<pre>常用的有page、include、taglib指令这三种指令；
page：位于页面顶端，一个页面可以包含多个page指令
include：将一个外部文件嵌入jsp中，同时解析这个页面中的jsp语句。
taglib：使用标签库，自定义新的标签，在jsp中启动定制行为。</pre>

### include指令

<pre>1.语法 <span style="color: #ff0000;">&lt;%@ include file="地址"%&gt;。</span>
案例：显示当前时间的页面。
（1）写一个只输出时间的方法的date.jsp。
（2）用于显示的页面,包含&lt;% include file="date.jsp"%&gt;

</pre>

### include动作

<pre>include动作指令
语法：
<span style="color: #ff0000;">&lt;jsp:include page = "URL"flush="true|false"/&gt;</span>
**page** 要包含的页面
**flush **被包含的页面是否从缓冲区读取

</pre>

### 区别

<pre>include指令和动作的区别
1、**包含内容**： <span style="color: #ff0000;">指令</span>包含的是【<span style="color: #ff0000;">源代码</span>】，<span style="color: #ff0000;">动作</span>包含的是页面输出的【<span style="color: #ff0000;">结果</span>】
2、生成的servlet：指令会生成一个整体的Servlet；而动作会分别生成两个，即在一个Servlet中调用另一个Servlet
3、其他区别如图：
![](http://oic1wftgk.bkt.clouddn.com/wp-content/uploads/includeaction.jpg)
4、【使用场合】：页面内容不经常变化使用include指令，页面内容经常变化使用&lt;jsp:include&gt;动作

</pre>

### 总结

能用动作解决的别用 指令解决