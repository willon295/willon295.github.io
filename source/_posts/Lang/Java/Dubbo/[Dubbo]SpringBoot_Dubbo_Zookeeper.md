---
title: '[Dubbo]SpringBoot_Dubbo_Zookeeper'
category: 'Java'
tags:
  - Java
  - Dubbo
date: 2018-09-21 00:00:00 
---

# 功能实现

Spring Boot 整合 Dubbo , 注册中心使用 zookeeper , 实现最简单的服务注册发现, 并且调用


## Zookeeper 集群搭建

zk集群共 3 台机器
1. 下载文件, 官网: [点击这里](https://zookeeper.apache.org)
2. 解压配置
```bash
mkdir -p /usr/local/app
tar -zxf   zookeeper-3.4.13.tar.gz  -C /usr/local/app/
mv /usr/local/app/zookeeper-3.4.13  /usr/local/app/zookeeper-3
mkdir -p  /usr/local/app/zookeeper-3/zkdata

#不同的zk机器写入对应的 id
echo "1" > /usr/local/app/zookeeper-3/zkdata/myid

cat  > /usr/local/app/zookeeper-3/conf/zoo.cfg << EOF
tickTime=2000
initLimit=10
syncLimit=5
dataDir=/usr/local/app/zookeeper-3/zkdata
clientPort=2181
server.1=zk01.willon.cn:2888:38888
server.2=zk02.willon.cn:2888:38888
server.3=zk03.willon.cn:2888:38888
EOF

cat >> /etc/profile << EOF
##__ZK_HOME__##
export ZK_HOME=/usr/local/app/zookeeper-3
export PATH=$ZK_HOME/bin:$PATH
EOF
```

> 已做 hosts 映射

3. 配置一键zk启动, 停止脚本

- **zkStartAll.sh**
```
#!/bin/bash

SERVERS="zk01.willon.cn zk02.willon.cn zk03.willon.cn"
for SERVER in $SERVERS
do
   ssh ${SERVER} "source /etc/profile; /usr/local/app/zookeeper-3.4/bin/zkServer.sh  start"
done
for SERVER in $SERVERS
do
   ssh ${SERVER} "source /etc/profile; /usr/local/app/zookeeper-3.4/bin/zkServer.sh  status"
done
```
- **zkStopAll.sh**
```
#!/bin/bash

SERVERS="zk01.willon.cn zk02.willon.cn zk03.willon.cn"
for SERVER in $SERVERS
do
   ssh ${SERVER} "source /etc/profile; /usr/local/app/zookeeper-3.4/bin/zkServer.sh  stop"
done
for SERVER in $SERVERS
do
   ssh ${SERVER} "source /etc/profile; /usr/local/app/zookeeper-3.4/bin/zkServer.sh  status"
done
```

# SpringBoot整合Dubbo

整合区分一下 `提供者`  ,`消费者`


## 提供者

1. Maven依赖
```xml
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.5.9.RELEASE</version>
        <relativePath/>
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
          <!--如果需要消费其他服务, 则需要引入对应的jar包 -->
        <!--Springboot 配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <!--dubbo 配置-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo</artifactId>
            <version>2.6.3</version>
        </dependency>

        <!--spring-boot-dubbo 配置-->
        <dependency>
            <groupId>io.dubbo.springboot</groupId>
            <artifactId>spring-boot-starter-dubbo</artifactId>
            <version>1.0.0</version>
            <!--解决版本冲突问题-->
            <exclusions>
                <exclusion>
                    <groupId>com.alibaba</groupId>
                    <artifactId>dubbo</artifactId>
                </exclusion>
            </exclusions>
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
```
2. **application.properties**
```
##端口号
server.port=8880
## Dubbo 服务提供者配置
spring.dubbo.application.name=dubbo_server
spring.dubbo.registry.address=zookeeper://zk01.willon.cn:2181?back=zk02.willon.cn:2181,zk03.willon.cn:2181
spring.dubbo.protocol.name=dubbo
spring.dubbo.protocol.port=20880
spring.dubbo.scan=com.demo.dubboprovider
```
3. 编写业务类
```java
public interface IUserService {
    String  say(String word);
}

@Service
public class UserService implements IUserService {
    @Override
    public String say(String word) {
        return "hello__" + word;
    }
}
```
4. 对外暴露的接口配置: `xx-provider.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
       xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans 
       http://www.springframework.org/schema/beans/spring-beans.xsd 
       http://code.alibabatech.com/schema/dubbo 
       http://code.alibabatech.com/schema/dubbo/dubbo.xsd">
       
    <dubbo:provider timeout="10000" delay="-1" threadpool="fixed" threads="10" loadbalance="leastactive"/>
    <dubbo:service interface="com.demo.dubboprovider.service.IUserService" ref="userService" version="1.0.0"/>
</beans>
```
5. 启动类关键配置, 引入配置文件
```
@SpringBootApplication
@ImportResource(locations = "classpath:*.xml")
public class DubboConsumerApplication {

    public static void main(String[] args) {

        SpringApplication.run(DubboConsumerApplication.class, args);
    }
}
```



## 消费者

1. Maven依赖相同
2. **application.properties**
```
##端口号
server.port=8888
## Dubbo 服务提供者配置
spring.dubbo.application.name=dubbo_server
spring.dubbo.registry.address=zookeeper://zk01.willon.cn:2181?back=zk02.willon.cn:2181,zk03.willon.cn:2181
spring.dubbo.protocol.name=dubbo
spring.dubbo.protocol.port=20880
spring.dubbo.scan=com.demo.dubboconsumer
```
3. 配置文件 `xx-consumer.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://code.alibabatech.com/schema/dubbo http://code.alibabatech.com/schema/dubbo/dubbo.xsd">

    <dubbo:consumer timeout="500" check="false" filter="executelimit"/>
    <dubbo:reference id="userService"   interface="com.demo.dubboprovider.service.IUserService"  version="1.0.0"/>
</beans>
```
4. Controller编写
```java
@RestController
@RequestMapping("/")
public class UserController {

    @Resource
    IUserService userService;


    @GetMapping(value = "/get/{name}")
    public String get(@PathVariable(name = "name") String name) {
        return userService.say(name);
    }
}
```
5. 启动入口引用资源
```java
@SpringBootApplication
@ImportResource(locations = "classpath:*.xml")
public class DubboConsumerApplication {

    public static void main(String[] args) {

        SpringApplication.run(DubboConsumerApplication.class, args);
    }
}

```

## 验证

浏览器输入 `localhost:8889/get/willon`
