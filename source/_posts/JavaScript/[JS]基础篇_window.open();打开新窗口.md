---
title: '[JS]基础篇--window.open();打开新窗口'
tags:
  - JS
id: 158
categories:
  - JS
date: 2016-12-27 23:15:25
---

open() 方法可以查找一个已经存在或者新建的浏览器窗口。

**语法：**

<div>
<pre class="code">window.open('[URL]', '[窗口名称]', '[参数字符串]')</pre>
</div>
**参数说明:**
<div>
<pre class="code">**<span style="color: #ff6600;">注意参数使用单引号 ‘ ’</span>
<span style="color: #ff6600;">URL</span>：**可选参数，网址或路径。如果空，那么窗口就不显示任何文档。
**<span style="color: #ff6600;">窗口名称</span>：**可选参数，被打开窗口的名称。
    1.该名称由字母、数字和下划线字符组成。
    2."_top"、"_blank"、"_self"具有特殊意义的名称。
       _blank：在新窗口显示目标网页
       _self：在当前窗口显示目标网页
       _top：框架网页中在上部窗口中显示目标网页
    3.相同 name 的窗口只能创建一个，要想创建多个窗口则 name 不能相同。
   4.name 不能包含有空格。
**<span style="color: #ff6600;">参数字符串</span>：**可选参数，设置窗口参数，各参数用逗号隔开。</pre>
**参数表:**

![](http://oic1wftgk.bkt.clouddn.com/wp-content/uploads/window-option.jpg)

</div>
例如:打开http://cl95.cc网站，大小为300px * 200px，无菜单，无工具栏，无状态栏，有滚动条窗口：

**实例:**
<pre class="code"><span style="font-size: 10pt;">&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
&lt;title&gt;window.open&lt;/title&gt;
&lt;script type="text/javascript"&gt;
function Wopen(){
window.open('https://codexz.cn','_top','width=300,height=200,menubar=no,toolbar=no, status=no,scrollbars=yes');

}
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;input name="button" type="button" onClick="Wopen()" value="点击我，打开新窗口!" / &gt;
&lt;/body&gt;
&lt;/html&gt;
</span></pre>