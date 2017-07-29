---
title: [Struts2]07_防止表单重复提交
tag: Struts2
category: Struts2

---


# 原理

在服务器与客户端之间创建一个 token 值，提交表单同时将此 Struts.token 提交，并且与服务器进行匹配。若不匹配，则报错。若匹配不报错

## 使用步骤

主要包括 
1. 配置文件中`添加 token 拦截器`
2. jsp 加入`token 代码`
3. 配置重复提交的`invalid.token`结果
4. Action不做特殊配置

###   struts.xml 配置

```
<struts>
    <package name="userp" namespace="/" extends="struts-default" >
        <default-action-ref name="index"/>
        <action name="index" >
            <result>/404.jsp</result>
        </action>
        <action name="user_login" class="actions.UserAction" method="login">
		    <!-- 加入token拦截器和默认的拦截器栈 -->
            <interceptor-ref name="token"/>
            <interceptor-ref name="defaultStack"/>
			
            <result name="success" >/index.jsp</result>
			
			<!-- 配置重复提交的错误结果 -->
            <result name="invalid.token">/500.jsp</result>
			
            <result name="failed" >/login.jsp</result>
        </action>
    </package>
</struts>

```


### jsp 代码

```
<form action="login.action" >
    <!-- 加入这行token代码 -->
    <s:token />
    <input type="text" name="username" >
    <input type="text" name="password" >
    <input type="submit"  value="提交" >
</form>

```