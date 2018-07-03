---
title: '[SpringCloud]04_Zipkin链路追踪'
tags:
  - Zipkin
  - SpringCloud
  categories:
  - Zipkin
  - SpringCloud
  date: 2018-06-29 00:04:00
---



`zipkin` 是一个简单的链路追踪器,是第三方工具,不是spring的项目, spring只是支持,  官网:  [Zipkin.io](http://zipkin.io)

使用 spring cloud 的zipkin组件之前需要启动 zipkin



# Zipkin的安装与启动

1. 官网的介绍

   ```bash
   curl -sSL https://zipkin.io/quickstart.sh | bash -s
   java -jar zipkin.jar
   ```

2. 启动之后默认监听的端口是: `9411` 



# Spring Cloud Zipkin的使用

zipkin 在任何地方都可以使用, 相当于一个额外的组件, 只需要做几件事:

1. 引入依赖

   ```xml
   		<!--链路追踪-->
   <dependency>
   			       <groupId>org.springframework.cloud</groupId>
   			<artifactId>spring-cloud-starter-zipkin</artifactId>
   </dependency>
   ```

   

2. 修改配置文件

   ```
   spring:
     zipkin:
       #指定zipkin的监听地址
       base-url: http://localhost:9411
       enabled: true
   
   ```

   

3. 入口处不需要修改



# 测试的效果

![](/images/spring-cloud-zipkin-00.png)