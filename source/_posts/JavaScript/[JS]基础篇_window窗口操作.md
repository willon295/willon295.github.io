---
title: '[JS] 基础篇--window.close()关闭窗口'
tags:
  - JS
categories:
  - JS
date: 2017-01-08 23:50:06
---
## window.close()
### 用法

	window.close();
	
	#或者<窗口对象>.close(); 


例如:关闭新建的窗口。
	
	<script type="text/javascript">
	   var mywin=window.open('http://www.imooc.com');
	   //将新打的窗口对象，存储在变量mywin中
	   mywin.close();
	</script>
> 注意:上面代码在打开新窗口的同时，关闭该窗口，看不到被打开的窗口。



## window.open()

### 用法
	
	window.open('[URL]', '[窗口名称]', '[参数字符串]')
### 参数说明
> 注意参数使用单引号 `‘ ’`
- `URL`: 可选参数，网址或路径。如果空，那么窗口就不显示任何文档。
- `窗口名称`: 可选参数，被打开窗口的名称。
    1. 该名称由字母、数字和下划线字符组成。
    2. "_top"、"_blank"、"_self"具有特殊意义的名称。
       _blank：在新窗口显示目标网页
       _self：在当前窗口显示目标网页
       _top：框架网页中在上部窗口中显示目标网页
    3. 相同 name 的窗口只能创建一个，要想创建多个窗口则 name 不能相同。
    4. name 不能包含有空格。
    <span style="color: #ff6600;">参数字符串</span>：可选参数，设置窗口参数，各参数用逗号隔开
### 参数表

![](http://oic1wftgk.bkt.clouddn.com/wp-content/uploads/window-option.jpg)


> 例如:打开http://cl95.cc网站，大小为300px * 200px，无菜单，无工具栏，无状态栏，有滚动条窗口：

### 实例
	<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>window.open</title>
	<script type="text/javascript">
	function Wopen(){
	window.open('https://codexz.cn','_top','width=300,height=200,menubar=no,toolbar=no, status=no,scrollbars=yes');
	
	}
	</script>
	</head>
	<body>
	<input name="button" type="button" onClick="Wopen()" value="点击我，打开新窗口!" / >
	</body>
	</html>
