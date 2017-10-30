---
title: '[JS] 基础篇--改变元素样式'
tags:
  - JS
categories:
  - JS
date: 2017-01-08 23:50:06
---

## 改变 HTML 样式


HTML DOM 允许 JavaScript 改变 HTML 元素的样式。如何改变 HTML 元素的样式呢？

### 语法
	Object.style.property=new style;

> 注意:**Object是获取的元素对象，如通过document.getElementById("id")获取的元素。

看下面的代码:

改变 &lt;p&gt; 元素的样式，将颜色改为红色，字号改为15,背景颜色改为绿色：

	
	<!DOCTYPE HTML>
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>style样式</title>
	</head>
	<body>
	 <h2 id="con">I love JavaScript</h2>
	 <script type="text/javascript">
	 var mychar= document.getElementById("con");
	 mychar.style.color="red";
	 mychar.style.backgroundColor="green";
	 mychar.style.size="15";
	 mychar.style.width="200px"; </script>
	</body>
	</html>
