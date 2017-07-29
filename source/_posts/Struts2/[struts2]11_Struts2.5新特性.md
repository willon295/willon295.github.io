---
title: [Struts2]11_2.5新特性
tag: Struts2
category: Struts2

---

1. `web.xml` 文件配置

```
    <filter>
        <filter-name>struts2</filter-name>
	
		//原来的是长这样的
        //<filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class>
		
		//变了
        <filter-class>org.apache.struts2.dispatcher.filter.StrutsPrepareAndExecuteFilter</filter-class>
    </filter>
```

2. result 结果的配置 前面不需要加 斜线 ` / `，否则404

3. DMI 调用

```
<!-- 动态调用设置为 true -->
	<constant name="struts.enable.DynamicMethodInvocation" value="true" />
    <package name="userpackage" extends="struts-default" namespace="/" >
	
	<!-- 允许匹配 -->
        <global-allowed-methods>regex:.*</global-allowed-methods>
      
        <action name="User_*" class="actions.UserAction" method="{1}">
            <result name="success" >{1}.jsp</result>
        </action>
    </package>

```