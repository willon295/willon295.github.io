---
title: '[JS] 基础篇--display属性(隐藏/显示元素)'
tags:
  - JS
categories:
  - JS
date: 2017-01-08 23:50:06
---

网页中经常会看到显示和隐藏的效果，可通过display属性来设置。

## 语法

	Object.style.display = value

> 注意:**Object是获取的元素对象，如通过document.getElementById("id")获取的元素。

### value取值:
- none: 不显示
- block: 显示

### 实例
	
	<!DOCTYPE HTML>
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
	<title>display</title>
	 <script type="text/javascript"> 
	 function hidetext() 
	 { 
	 var mychar = document.getElementById("con");
	 mychar.style.display="none"
	 } 
	 function showtext() 
	 { 
	 var mychar = document.getElementById("con");
	 mychar.style.display="block";
	 }
	 </script> 
	</head> 
	<body> 
	 <h1>JavaScript</h1> 
	 <p id="con"> 这是将要操作的 段落 </p> 
	 <form>
	 <input type="button" onclick="hidetext()" value="隐藏内容" /> 
	 <input type="button" onclick="showtext()" value="显示内容" /> 
	 </form>
	</body> 
	</html>
