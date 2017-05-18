---
title: '[JS] 基础篇--window.close()关闭窗口'
tags:
  - JS
id: 165
categories:
  - JS
date: 2016-12-27 23:23:57
---

close()关闭窗口

**用法：**

<div>
<pre class="code">window.close();   //关闭本窗口</pre>

或

<pre class="code">&lt;窗口对象&gt;.close();   //关闭指定的窗口</pre>
</div>

例如:关闭新建的窗口。

<div>
<pre class="code">&lt;script type="text/javascript"&gt;
   var mywin=window.open('http://www.imooc.com'); 
   //将新打的窗口对象，存储在变量mywin中
   mywin.close();
&lt;/script&gt;</pre>
</div>

**注意:上面代码在打开新窗口的同时，关闭该窗口，看不到被打开的窗口。**