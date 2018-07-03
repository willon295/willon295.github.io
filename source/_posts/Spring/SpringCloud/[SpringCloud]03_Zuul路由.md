---
title: '[SpringCloud]03_Zuul网关'
tags:
  - Zuul
  - SpringCloud
categories:
  - Zuul
  - SpringCloud
date: 2018-06-29 00:03:00
---

相当于一个 `路由` 中心, 可以做到 `请求转发` . 比如: 

路由服务器的 ip 是:  `192.168.1.100` 

那么可以将 `/user/**`  转发给 指定的服务器, 举个例子:

```
server:
  port: 8888
zuul:
  routes:
    #自定义的路由名称
    myRibbon:
      #拦截的请求路径
      path: /ribbon/**
      #转发给注册中心某个 service,指定 serviceId (名称)
      serviceId: service-provider
```

> 将   http://192.168.1.100:8888/ribbon/get?name=zhang
>
> 的 `/get?name=zhang`    转发给 注册中心服务名为 ` service-provider` 的服务处理



# 具体配置



1. 需要的依赖 `eureka-client`  , ` zuul` 

   ```xml
   	<parent>
   		<groupId>org.springframework.boot</groupId>
   		<artifactId>spring-boot-starter-parent</artifactId>
   		<version>2.0.3.RELEASE</version>
   		<relativePath/> <!-- lookup parent from repository -->
   	</parent>
   
   	<properties>
   		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
   		<java.version>1.8</java.version>
   		<spring-cloud.version>Finchley.RELEASE</spring-cloud.version>
   	</properties>
   
   	<dependencies>
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-actuator</artifactId>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-web</artifactId>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework.cloud</groupId>
   			<artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework.cloud</groupId>
   			<artifactId>spring-cloud-starter-netflix-zuul</artifactId>
   		</dependency>
   
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-test</artifactId>
   			<scope>test</scope>
   		</dependency>
   
   	</dependencies>
   
   	<dependencyManagement>
   		<dependencies>
   			<dependency>
   				<groupId>org.springframework.cloud</groupId>
   				<artifactId>spring-cloud-dependencies</artifactId>
   				<version>${spring-cloud.version}</version>
   				<type>pom</type>
   				<scope>import</scope>
   			</dependency>
   		</dependencies>
   	</dependencyManagement>
   ```

2. 基本配置和转发

   ```
   spring:
     application:
       name: zull-application
   server:
     port: 8766
   eureka:
     client:
       service-url:
         defaultZone: http://localhost:8761/eureka/
   zuul:
     routes:
       #自定义的路由名称
       myRibbon:
         #拦截的请求路径
         path: /ribbon/**
         #转发给注册中心某个 service,指定 serviceId (名称)
         serviceId: service-provider
       myFeign:
         path: /feign/**
         serviceId: service-provider2
   
   ```

3. 入口文件,加入注解 `@EnableZuulProxy` 

   ```java
   @EnableZuulProxy
   @SpringBootApplication
   public class CloudZuulApplication {
   
   	public static void main(String[] args) {
   		SpringApplication.run(CloudZuulApplication.class, args);
   	}
   }
   
   ```

4. 测试

   ```
   http://localhost:8766/ribbon/get?name=zhangsan
   ```

   





# 总结

1. 其实就是一个类似 `nginx`  反向代理的功能,但是在 `nginx` 对比下, Zuul这个路由功能貌似有点鸡肋