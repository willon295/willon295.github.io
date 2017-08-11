---
title: '[Struts2]02_基础配置'
tag: Struts2
id: 89
category: Struts2
---


# 基本配置和默认action配置

```
<struts>
    //定义包名，一定要继承struts-default，否则无法加载，服务器无法启动
    <package name="hello_action" namespace="/" extends="struts-default">

        //设置默认action ，当找不到用户的请求时，用此action处理。
        //注意：默认的result的name 不能指定为error这是系统保留的关键字。
        //定义默认的action指向之后，创建一个action，名字必须和指向的名字一样
        <default-action-ref name="error"/>
        <action name="error" >
            <result >/error.jsp</result>
        </action>



        //其他action的配置，名字，指定类名。默认执行类的execute()方法
        //action的name必须和 类的返回值相同
        <action name="hello" class="action.HelloWorld">
            <result name="hello" >/hello.jsp</result>
        </action>

    </package>
</struts>
```

# 访问的后缀配置和include

```
<struts>
    //修改访问的后缀，多个后缀可以用逗号隔开
    <constant name="struts.action.extension" value="html,"/>

    //include标签可以包含其他的配置文件
    <include file="xml/hello.xml"/>
</struts>
```

# 注意事项

1. 自定义的 struts.xml 文件必须继承 struts-default.xml 否则无法加载，服务器无法启动
2. 记得配置一个默认的action结果，用来处理 404
3. namespace 是指定浏览器 URL 访问的路径