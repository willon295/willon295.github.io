---
title: '[Struts2]04_标签'
tag: Struts2
id: 91
category: Struts2
---

1. `<s:property value="" />`: 通用的取值输出标签
2. `<s:set var="变量名" value="值" scope="域"/>`:  简单的set标签 
3.  `<s:bean name="类全名" var="变量名"/>`:  等同于new 一个对象
4.  `<s:if  test=" 条件" >  执行语句 </s:if>`:  简单的if语句，配套的还有 elseif ，else
5.  `<s:iterator value="遍历对象" var="变量"> 循环体 </s:iterator>`:  foreach循环
6. `<s:debug/>`: 简单的调试标签
### 取值操作

1. `<s:property value="#session.userlist" />`---> 解释：`#session` 在session中取值，取`userlist`

2.  `<s:property value="#userlist" />`---> 解释: 在值栈 取值

3. `<s:property value="#parameters['userlist']" />`---> 解释: 在ActionContext 取值