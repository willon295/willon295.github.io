---
title: '[JS] 基础篇--display属性(隐藏/显示元素)'
tags:
  - JS
id: 176
categories:
  - JS
date: 2016-12-28 00:29:34
---

网页中经常会看到显示和隐藏的效果，可通过display属性来设置。

**语法：**

<pre class="code">Object.style.**display** = value</pre>
**注意:**Object是获取的元素对象，如通过document.getElementById("id")获取的元素。

**value取****值:
none**: 不显示
**block**: 显示

### **实例**

<pre>&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=gb2312"&gt;
&lt;title&gt;display&lt;/title&gt;
 &lt;script type="text/javascript"&gt; 
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
 &lt;/script&gt; 
&lt;/head&gt; 
&lt;body&gt; 
 &lt;h1&gt;JavaScript&lt;/h1&gt; 
 &lt;p id="con"&gt; 这是将要操作的 段落 &lt;/p&gt; 
 &lt;form&gt;
 &lt;input type="button" onclick="hidetext()" value="隐藏内容" /&gt; 
 &lt;input type="button" onclick="showtext()" value="显示内容" /&gt; 
 &lt;/form&gt;
&lt;/body&gt; 
&lt;/html&gt;</pre>