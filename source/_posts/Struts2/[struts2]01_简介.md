---
title: '[Struts2]01_简介'
tag: Struts2
date: 2016-10-13 12:22:33
category: Struts2
---

### 简介

Struts2是Apache公司旗下产品，与Struts1 可以说是完全不同的工作机制，Struts2本名并非如此。Struts2有JIVE团队开发 ，由Apache收购，并命名为Struts2.
官方网站：[http://struts.apache.org/](http://struts.apache.org/)

### 工作原理

Struts2通过过滤器过滤用户发送的请求，然后找到配置文件， 通过配置文件找到相应的处理Action，进行业务操作。具体工作原理可以参考官方的 文档。

### 配置

1、下载相应的jar包

Apache Struts2最新版的下载地址：[点击这里](http://mirrors.tuna.tsinghua.edu.cn/apache/struts/2.5.10.1/struts-2.5.10.1-all.zip)
解压之后会发现很多的jar包，根据项目的不同需求导入不同的包。一般情况下，最常用的`jar包` 如下：

	asm.jar
	adm-commens.jar
	asm-tree.jar
	commons-fileupload.jar
	commons-io.jar
	commons-lang.jar
	freemarker.jar
	ognl.jar
	struts2-core.jar
	xwork-core.jar


## 开始项目

### 手动配置

1. 新建一个`web项目` ，在项目中新建`lib`目录，导入jar包。
2. 在`web.xml`文件中进行如下配置:
	```
	<filter>
	<filter-name>struts2</filter-name>
	<filter-class>
	org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter
	</filter-class>
	</filter>
	<filter-mapping>
	<filter-name>struts2</filter-name>
	<url-pattern>/*</url-pattern>
	</filter-mapping>
	```

3. 在`src`目录下新建 `struts.xml`文件，代码如下：
	```
	<?xml version="1.0" encoding="UTF-8"?>
	<!DOCTYPE struts PUBLIC
	"-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
	"http://struts.apache.org/dtds/struts-2.3.dtd">
	<struts>
	//这是struts的核心配置文件
	</struts>
	```

4. 自动配置
    `IDEA` 和 `MyEclipse`都可以自动进行配置，在MyEclipse中，新建web项目之后可以导入Struts2框架。在IDEA则可以直接创建一个 Struts2项目，所有的准备工作会自动完成。</p>

### Demo
1. `struts.xml`代码
	```
	<struts>
	<package name="com.action" namespace="/"  extends="struts-default">
		<action name="hello" class="com.action.LoginAction">
			<result name="success" >/helloworld.jsp</result>
			<result name="error" >/index.jsp</result>
		</action>
	</package>
	</struts>
	```

2. `HelloWorld.java`代码
	```
	package com.action;
	import com.opensymphony.xwork2.ActionSupport;
	public class LoginAction extends ActionSupport {
		 //所有的Action 默认执行的 方法
		 public  String  execute(){
		 //这里写处理的逻辑
		 return "success";
		 //或者 return SUCCESS;
		   }
	}
	```
		 
3. URL访问
	```
	http://localhost:2002/hello.action
	//或者下面的这个url,访问后缀可以修改，默认情况下是 没有后缀 、.action
	http://localhost:2002/hello
	```
