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
### param动作，传递方法为post
1、语法：`<jsp:param name="参数名" value="参数值">`
2、【常常与`<jsp:forward></jsp:forward>`一起使用】，并作为其【子标签】。
3、用于传递新参数或者【修改原有参数值】，修改参数时使用form表单里的参数名称即可。同样用`request.getParameter("参数名")`获取,必须与`forward`、`include`及`plugin`动作配合使用。通常与`forward`动作一起使用，作为它的子标签，它的作用是指定某个参数值，可以用于传递参数，

	<jsp:forward page="url">
	<jsp:param value="123@qq.com" name="email"/>
	<jsp:param value="88888" name="password"/>
	 //此处是修改表单输入的password值
	</jsp:forward