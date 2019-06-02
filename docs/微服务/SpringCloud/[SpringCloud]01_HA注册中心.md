---
title: '[SpringCloud]01_01_HA注册中心'
tags:
  - Eureka
  - SpringCloud
categories:
  - Eureka
  - SpringCloud
date: 2018-06-29 00:01:01
---


说白就是 `多个注册中心` 之间可以 `相互注册` , 实现冗余备份的功能.

那么 `服务提供者`  就不能只向一台机器注册, 必须 `同时指定多个注册中心` 

这样才能达到注册中心高可用的效果.



# 配置过程



先说明架构, 三个注册中心, 两个服务提供者, 一个消费者

| 名称        | 端口 |
| ----------- | ---- |
| reg-node01  | 9001 |
| reg-node02  | 9002 |
| reg-node03  | 9003 |
| provider-01 | 8001 |
| provider-02 | 8002 |
| consumer    | 9999 |

## 修改hosts映射

```
127.0.0.1 reg-node01
127.0.0.1 reg-node02
127.0.0.1 reg-node03
```

## 注册中心配置

1. 配置文件

   ```yaml
   server:
     port: 9001
   spring:
     application:
       name: reg-node01
   eureka:
     instance:
       #指定主机名
       hostname: reg-node01
     client:
       register-with-eureka: false
       fetch-registry: false
       service-url:
         #指定其他注册中心地址
         defaultZone: http://reg-node02:9002/eureka/,http://reg-node03:9003/eureka/
   management:
     endpoints:
       web:
         exposure:
           include: "*"
   
   ```

2. 其他的注册中心类似, 修改 `eureka.instance.hostname`  和 `端口` ,同样指定其他注册中心的地址



## 服务提供者配置



1. 指定所有注册中心的地址

   ```yaml
   server:
     port: 8001
   eureka:
     client:
       service-url:
         # 指定多个中心的地址
         defaultZone: http://reg-node01:9001/eureka/,http://reg-node02:9002/eureka/,http://reg-node03:9003/eureka/
   management:
     endpoints:
       web:
         exposure:
           include: "*"
   spring:
     application:
       name: service-provider
   
   ```

   

# 测试结果

1. 当一个服务注册时,  `所有注册中心` 会发现服务,并且在本机注册
2. 当某一台注册中心宕机或者异常, 其他注册中心依然可以提供服务发现
3. 当机器重启之后,服务会自动注册

# 总结

HA机制在大数据领域应用比较广泛, 比如 `HDFS` 的  `standby/secondaryNamenode` ,  `Spark` 的 `standby` , `YARN` 等等. 

但是注册中心的冗余备份似乎并不是特别友好, 体现在以下几点:

1. 注册中心之间, 需要相互注册, 这样势必会形成 N*N 的网状结构, 当然可以通过,先 纵向注册横、再横向注册,形成树状结构.
2. 每个服务提供方也必须指定所有注册中心
3. 只有同时满足 `1` , `2` 条件才能实现高可用.

# 思考

显然这个高可用注册中心十分不友好, 分析一下:

1. 如果新增一台注册中心机器,我们要做什么?
   如果是树状结构, 可以在某个叶子节点下追加；如果是网状结构,那就很麻烦,要修改所有的注册中心配置文件. 

2. 如果新增一个服务我们要做什么?

   每个服务提供者指定所有注册中心.