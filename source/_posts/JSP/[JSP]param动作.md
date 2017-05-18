---
title: '[JSP] param动作'
tags:
  - java
  - JavaEE
  - JSP
id: 208
categories:
  - JSP
date: 2016-12-29 23:24:55
---

<pre>param动作，传递方法为post
1、语法：&lt;jsp:param name="参数名" value="参数值"&gt;
2、【常常与&lt;jsp:forward&gt;&lt;/jsp:forward&gt;一起使用】，并作为其【子标签】。
3、用于传递新参数或者【修改原有参数值】，修改参数时使用form表单里的参数名称即可。同样用request.getParameter("参数名")获取
必须与forward、include及plugin动作配合使用。通常与forward动作一起使用，作为它的子标签，它的作用是指定某个参数值，可以用于传递参数，
&lt;jsp:forward page="url"&gt; 
&lt;jsp:param value="123@qq.com" name="email"/&gt;</pre>
<pre>&lt;jsp:param value="88888" name="password"/&gt;
 //此处是修改表单输入的password值
&lt;/jsp:forward&gt;</pre>