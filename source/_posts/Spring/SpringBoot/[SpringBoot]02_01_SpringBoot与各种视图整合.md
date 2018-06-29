---
title: '[SpringBoot]02_01_SpringBoot与各种视图整合'
tag: SpringBoot
category: SpringBoot
date: 2018-06-20 00:02:01
---


# JSP

1. pom.xml 修改打包的类型为 `war`
2. 引入 tomcat 支持，jsp支持
```
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.3.RELEASE</version>
    </parent>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.apache.tomcat.embed</groupId>
            <artifactId>tomcat-embed-jasper</artifactId>
            <version>9.0.8</version>
        </dependency>
    </dependencies>
```
3. application.properties配置文件修改
```
spring.mvc.view.prifix=/WEB-INF/jsp
spring.mvc.view.suffix=.jsp
```
4. 在src/main 建立 webapp/WEB-INF/jsp/  目录， 将jsp页面放入其中(如果放在 resources目录会不能访问）
5. web.xml可要可不要


# Freemarker

1. 引入依赖
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-freemarker</artifactId>
</dependency>
```
2. 在 `resources/templates/` 目录中添加 `*.ftl` 文件

# Thymeleaf

1. 引入依赖
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```
2. 在 `resources/templates/` 目录中添加 `*.html` 文件
