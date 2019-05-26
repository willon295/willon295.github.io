---
title: '[SpringCloud]00_Eureka'
tags:
  - Eureka
  - SpringCloud
categories:
  - Eureka
  - SpringCloud
date: 2018-06-29 00:00:00
---


Eureka 是一个注册服务框架, 与其类似的还有  zookeeper  Consul ,Consul 是取中心化的架构, zookeeper 也是.

# Eureka-Server安装出现的问题

因为使用的是最新的版本,所以坑非常多.

1. 能正常访问,但是抛出异常
```
com.netflix.discovery.shared.transport.TransportException: Cannot execute request on any known server
```

解决: 
```
eureka:
  instance:
    hostname: localhost
  client:
    register-with-eureka: false #加入者两行配置即可
    fetch-registry: false
```
2. 能正常访问,但是 读取不了 `registered-replicas` ,	`unavailable-replicas`	
`available-replicas` 信息

**解决**:  不用 `yml` 文件, 用 `properties` 配置就解决了.(玄学!!)

# Eureka-client注册出现的问题

1. 从官网下载下来的模板并不能成功启动,
```
Caused by: java.lang.ClassNotFoundException: org.springframework.http.ResponseEntity
```
**解决:**添加 `web依赖` 
```
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
```
2. 不能注册
```
can't register for any know server
```
**解决:**把 服务端的端口 改成 `8761` 即可.
3. 如果在同一台机器,客户端貌似不需要指定 eureka-server 的地址就能注册.


# 多个服务注册Server出现问题

红色警告:
```
EMERGENCY! EUREKA MAY BE INCORRECTLY CLAIMING INSTANCES ARE UP WHEN THEY'RE
```
**解决:** 给每个服务客户端指定不同的 `instance.appname`

# 完整的配置


1. eureka-server
```
server:
  port: 8761
eureka:
  instance:
    hostname: localhost
    appname: eureka-server-instance
  client:
    register-with-eureka: false
    fetch-registry: false
    service-url:
      defalutZone: http://${eureka.instance.hostname}:${server.port}/eureka/
```
2. eureka-client
```
server:
  port: 8888
spring:
  application:
    name: eureka-client
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
  instance:
    appname: eureka-client-instance
```
3. 启动: 在入口处加上注解 `@EnableEurekaServer` 或者 `@EnableEurekaClient`

# 总结

1. 官方的 2.0.3 Eureka Quick Start Demo不靠普
2. 当本地有多个服务需要注册时,不需要指定 server的地址,如果是不同的机器那么客户端就要`指定server地址`, `自身实例名称`
```
server:
  port: 9999
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
  instance:
    appname: member-service  #Application处显示的名称
    hostname: member-service-hostName #Stutus 对应Url的真实连接主机名
    ip-address: 127.0.0.1  # 该实例主机对应的 ip
    prefer-ip-address: true  # 优先使用ip
spring:
  application:
    name: member-service-appName # Status 处明文显示的名称

```