---
title: '[Idea]解决Idea中maven的几个问题'
category: 分享
tag: 分享
date: 2018-07-06 00:00:00
---


强迫症，受不了 idea中 maven 的几个问题。
1. 总是提示 `java 1.5 将在将来的版本中移除...`
2. 卡在 `Downloading plugins for XXXX`


# 解决java编译版本1.5的问题

1. 在 `settings ->Build -> Java Compler`  修改java版本为 8
2. 修改 maven 的 `conf/settings.xml` 文件：
```xml
<profile>
  <id>jdk-1.8</id>
  <activation>
    <activeByDefault>true</activeByDefault>
    <jdk>1.8</jdk>
  </activation>
  <properties>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
  </properties>
</profile>
```
3. 或者在项目的 pom.xml文件中
```xml
  <properties>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
  <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
  </properties>
```


# 解决Downloading plugins for XX 问题

1. 下载  [archetype-catalog.xml](http://repo.maven.apache.org/maven2/archetype-catalog.xml) 文件
2. 将文件移动至 maven本地仓库 `.m2/repository/org/apache/maven/archetype/archetype-catalog/3.0.1/` 文件夹中
3. 退出 idea ，全局设定 `settings -> Build tools -> Maven -> Runner -> VM options` 处 填写：  `-DarchetypeCatalog=local`