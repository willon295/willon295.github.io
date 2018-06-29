---
title: '[SpringBoot]00_入门'
tag: SpringBoot
category: SpringBoot
date: 2018-06-20 00:00:00
---

# Spring Boot


1. 快速开发框架
2. 能够帮助我们快速的整合第三放框架（通过Maven依赖关系）
3. 完全采用注解化，简化xml配置
4. 内嵌web服务器
5. 最终以java程序执行(也可以以war方式运行)


## Spring Boot 与 Spring MVC

1. SpringBoot Web 组件集成 Spring MVC
2. Spring MVC 3.0 之后支持注解启动，SpringBoot Web 通过扫描注解启动Spring MVC


## Spring Boot 和 Spring Cloud

1. 一套完整的 `微服务框架` （功能十分强大）。 
2. 注册中心
3. 客户端调用工具
4. 服务治理（负载均衡、断路由、分布式配置中心、网关、服务链路、消息总线等）

微服务开发---RPC远程通讯技术、服务治理


## Spring Boot Demo


1. maven
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>cn.willon</groupId>
    <artifactId>bootDemo</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>
    <name>bootDemo</name>

    <description>test boot</description>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>


    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.3.RELEASE</version>
        <relativePath/>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```
2. 第一个Controller
```
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @RequestMapping("")
    public String index() {
        return "Hello World!";
    }
}
```
3. Main
```
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//APP入口
public class DemoApplication {
    public static void main(String[] args) {

        SpringApplication.run(DemoApplication.class, args);
    }
}
```
4. 此时访问 `http://localhost:8080`


# 注意事项

1. Application 只会扫描当前所在位置的包以及子包。不符合条件的包需要手动使用注解 `@ComonentScan`
