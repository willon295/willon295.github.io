---
title: '[JS] 基础篇--改变元素样式'
tags:
  - JS
id: 174
categories:
  - JS
date: 2016-12-28 00:22:02
---

### 改变 HTML 样式

<div id="J_CodeDescr" class="code-description">
<div class="code-desc co">

HTML DOM 允许 JavaScript 改变 HTML 元素的样式。如何改变 HTML 元素的样式呢？

**语法:**

<div>
<pre class="code">**Object.style.property=new style;**</pre>
</div>
**注意:**Object是获取的元素对象，如通过document.getElementById("id")获取的元素。

**看看下面的代码:**

改变 &lt;p&gt; 元素的样式，将颜色改为红色，字号改为15,背景颜色改为绿色：

<div>
<pre class="code">
&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
&lt;title&gt;style样式&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
 &lt;h2 id="con"&gt;I love JavaScript&lt;/h2&gt;
 &lt;script type="text/javascript"&gt;
 var mychar= document.getElementById("con");
 mychar.style.color="red";
 mychar.style.backgroundColor="green";
 mychar.style.size="15";
 mychar.style.width="200px"; &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>
</div>
</div>
</div>