---
title: '[JS]基础篇-- DOM概念'
tags:
  - JS
id: 167
categories:
  - JS
date: 2016-12-27 23:45:42
---

## 认识DOM


文档对象模型DOM（Document Object Model）定义访问和处理HTML文档的标准方法。DOM 将HTML文档呈现为带有元素、属性和文本的树结构（节点树）。

HTML文档可以说由节点构成的集合，三种常见的DOM节点:

1. 元素节点：<html>,<body>等都是元素节点，即标签。

2. 文本节点: 向用户展示的内容

3. 属性节点:元素属性，如`<a> `标签的链接属性`href="http://www.imooc.com"`


看下面代码:

	<a href="http://www.imooc.com">JavaScript DOM</a>

- 元素节点：<span style="color: #ff6600;">a </span>
- 属性节点：<span style="color: #ff6600;">href="http://www.imooc.com"</span>
- 文本节点：<span style="color: #ff6600;">JavaScript DOM</span>