---
title: '[JS] 基础篇--改变className 属性'
tags:
  - JS
id: 178
categories:
  - JS
date: 2016-12-28 00:37:21
---

## 控制类名（className 属性）

className 属性设置或返回元素的class 属性。

**语法：**

<pre class="code">**object.className = classname**</pre>

**作用:**

1.获取元素的class 属性

2\. 为网页内的某个元素指定一个css样式来更改该元素的外观

### DEMO

<pre>
&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=gb2312"&gt;
&lt;title&gt;className属性&lt;/title&gt;
&lt;style&gt;
 body{ font-size:16px;}
 .one{
 border:1px solid #eee;
 width:230px;
 height:50px;
 background:#ccc;
 color:red;
 }
 .two{
 border:1px solid #ccc;
 width:230px;
 height:50px;
 background:#9CF;
 color:blue;
 }
 &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
 &lt;p id="p1" &gt; 第一个段落 。&lt;/p&gt;
 &lt;input type="button" value="添加样式" onclick="add()"/&gt;
 &lt;p id="p2" class="one"&gt; 第二个段落 &lt;/p&gt;
 &lt;input type="button" value="更改外观" onclick="modify()"/&gt;

&lt;script type="text/javascript"&gt;
 function add(){
 var p1 = document.getElementById("p1");
 p1.className="one";
 }
 function modify(){
 var p2 = document.getElementById("p2");
 p2.className="two";
 }
 &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>