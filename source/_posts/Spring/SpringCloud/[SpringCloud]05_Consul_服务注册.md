---
title: '[SpringCloud]05_Consul_服务注册'
categories:
  - SpringCloud
  - Consul
tags:
  - SpringCloud
  - Consul
---

Consul是服务注册中心的一种， 它是独立的软件
官网 ： 
[https://www.consul.io/intro/getting-started/agent.html](https://www.consul.io/intro/getting-started/agent.html)

下载之后运行 

```bash
consul agent -dev
```

consul默认监听的是  `8500`  端口



# Spring Cloud中使用 Consul

1. 一如 consul注册发现依赖

   ```xml
   <dependency>
   			<groupId>org.springframework.cloud</groupId>
   			<artifactId>spring-cloud-starter-consul-discovery</artifactId>
   </dependency>
   
   ```

   

2. 修改配置文件

   ```
   server:
     port: 8762
   spring:
     cloud:
     #指定consul的地址
       consul:
         host: localhost
         port: 8500
   management:
     endpoints:
       web:
         exposure:
           include: "*"
   spring:
     application:
       name: service-provider
   
   ```

3. 服务注册之后效果如下

![](/images/spring_cloud_consul_00.png)