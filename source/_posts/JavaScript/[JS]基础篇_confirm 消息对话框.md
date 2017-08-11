---
title: '[JS]基础篇--confirm 消息对话框'
tags:
  - JS
id: 20
categories:
  - JS
date: 2016-12-27 22:55:06
---

## confirm 消息对话框

confirm 消息对话框通常用于允许用户做选择的动作，如：“你对吗？”等。弹出对话框(包括一个确定按钮和一个取消按钮)。

### 语法

	confirm(str);

### 参数说明
- str：在消息对话框中要显示的文本
- 返回值: Boolean值


### 返回值

- 当用户点击"确定"按钮时，返回true
- 当用户点击"取消"按钮时，返回false
> 注:通过返回值可以判断用户点击了什么按钮

看下面的代码:

	<script type="text/javascript">
	    var mymessage=confirm("你喜欢JavaScript吗?");
	    if(mymessage==true)
	    {   document.write("很好,加油!");   }
	    else
	    {  document.write("JS功能强大，要学习噢!");   }
	</script>