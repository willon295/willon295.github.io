---
title: '[JS]04_prompt消息交互对话框'
tag: JavaScript
category: JavaScript
date: 2017-01-08 00:04:00
---

## prompt 消息对话框

**`prompt`**弹出消息对话框,通常用于询问一些需要与用户交互的信息。弹出消息对话框（包含一个确定按钮、取消按钮与一个文本输入框）。

![](http://oic1wftgk.bkt.clouddn.com/wp-content/uploads/promot.jpg)

### 语法

```
	prompt(str1, str2);
```
### 参数说明

- str1: 要显示在消息对话框中的文本，不可修改
- str2：文本框中的内容，可以修改

### 返回值
1. 点确定按钮，文本框中的内容将作为函数返回值
2. 点取消按钮，将返回null

看看下面代码:

```
	var myname=prompt("请输入你的姓名:");
	if(myname!=null)
	  {   alert("你好"+myname); }
	else
	  {  alert("你好 my friend.");  }
```
