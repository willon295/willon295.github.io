---
title: '[JS] 基础篇--document.getElementById() 通过ID获取元素'
tags:
  - JS
id: 169
categories:
  - JS
date: 2016-12-27 23:56:27
---

### 通过ID获取元素


学过HTML/CSS样式，都知道，网页由标签将信息组织起来，而标签的id属性值是唯一的，就像是每人有一个身份证号一样，只要通过身份证号就可以找到相对应的人。那么在网页中，我们通过id先找到标签，然后进行操作。

### 语法
	document.getElementById("id")

看下面代码:

	<!DOCTYPE HTML>
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>document.getElementById</title>
	</head>
	<body>
	<p id="con">JavaScript</p>
	<script type="text/javascript">
	var mychar= document.getElementById("con");
	document.write("结果:"+mychar);
	//输出获取的P标签。
	</script>
	</body>
	</html>
这里我们获取的仅仅是 &lt;p&gt;标签这个元素（对象），还未对其进行操作，对其操作需要通过属性

## innerHTML 属性

innerHTML 属性用于获取或替换 HTML 元素的内容。

### 语法

	Object.innerHTML


> 注意:
> 1.Object是获取的元素对象，如通过document.getElementById("ID")获取的元素。
> 2.注意书写，innerHTML区分大小写。

我们通过id="con"获取<p> 元素，并将元素的内容输出和改变元素内容，代码如下:


	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>innerHTML</title>
	</head>
	<body>
	<h2 id="con">javascript</h2>
	<script type="text/javascript">
	 var mychar= document.getElementById("con");
	//输出原h2标签内容
	 document.write("原标题:"+mychar.innerHTML+"<br>");
	//输出修改后h2标签内容
	 mychar.innerHTML=" 新的 标题 ";
	 document.write("修改后的标题:"+mychar.innerHTML);
	</script>
	</body>
	</html>