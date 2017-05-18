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
### 语法

	object.className = classname
### 作用

1. 获取元素的class 属性
2. 为网页内的某个元素指定一个css样式来更改该元素的外观

### DEMO
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
	<title>className属性</title>
	<style>
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
	 </style>
	</head>
	<body>
	 <p id="p1" > 第一个段落 。</p>
	 <input type="button" value="添加样式" onclick="add()"/>
	 <p id="p2" class="one"> 第二个段落 </p>
	 <input type="button" value="更改外观" onclick="modify()"/>
	
	<script type="text/javascript">
	 function add(){
	 var p1 = document.getElementById("p1");
	 p1.className="one";
	 }
	 function modify(){
	 var p2 = document.getElementById("p2");
	 p2.className="two";
	 }
	 </script>
	</body>
	</html>