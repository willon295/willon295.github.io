---
title: '[Tomcat]记一次Tomcat'
tags:
  - Tomcat
id: 34
categories:
  - JSP
date: 2017-03-31 20:45:09
---

事情是这样的，心血来潮的new了一个Struts项目，然后决定在Tomcat 下Run一下，然后就是跑出了下面的错误

java.lang.ClassNotFoundException

那么，我明明是导入了`jar` 包的，为什么会报这个错呢？于是请教了牛掰的印度大佬 `DaBing`，然后简单几句就解决了。
![](http://i.imgur.com/cvVv5Qc.jpg)

于是真的惭愧，心里暗叹：印度阿三果真厉害！

然后我就hin认真的 去百度了一波 Tomcat 是如何部署项目的 。大概看了一下

### 部署大概过程

1、将整个项目cpoy 进 Tomcat的工作空间
2、加载web.xml文件
3、开始编译所有的 java文件。

### 思考

那么我的 `java.lang.ClassNotFoundException`的根本原因就是 我的jar包在项目部署的时候 Tomcat没有自动copy过去。这个具体为什么我就不知道了，可能我用的是IDEA （据说同学们在`MyEclipse`建Web项目时候，项目的源文件实在`Tomcat/webapps` 目录下面的。可能这种方式的Tomcat可以找到jar包）.