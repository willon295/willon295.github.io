---
title: [Struts2]08_Intercetor拦截器
tag: Struts2
category: Struts2

---

# Action拦截

拦截器只用于拦截`Action`,不能拦截 `jsp` 页面的访问

## 部分拦截器

1. 定义拦截器，继承 `AbstractInterceptor` ，并重写其方法
2. 写拦截的规则
3. 配置文件

## 全局拦截器

只是配置文件不同

# 方法拦截
1. 定义拦截器
2. 继承 MethodFilterInteceptor ，重写方法
3. 配置 action -> interceptor-ref -> param 
    - name 的值:
    - includeMethods: 指定拦截哪些方法
    - excludeMethods:  指定不拦截哪些方法

	
4. 代码实现

```
<struts>

    <package name="user" namespace="/user" extends="struts-default">

        <!--1. 配置自己的拦截器-->
        <interceptors>
            <interceptor name="int1" class="interceptors.MethodIntercptor1"/>
        </interceptors>
		
		
        <!--配置全局结果-->
        <global-results>
            <result>/user/login.jsp</result>
        </global-results>
		
		
        <action name="*" class="action.UserAction" method="{1}">
            <result name="ok">/user/{1}.jsp</result>
			
			
            <!--2. 应用拦截器，并且加上系统默认使用的拦截器栈-->
            <interceptor-ref name="int1">
                <param name="excludeMethods">login</param>
            </interceptor-ref>
			
            <!--3. 包含系统默认的拦截器栈-->
            <interceptor-ref name="defaultStack"/>
        </action>
    </package>
</struts>

```