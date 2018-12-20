---
title: '[SpringBoot]多环境配置管理分析与实践'
category: SpringBoot
tag: SpringBoot
date: 2018-12-20 00:01:00
---



# 两种不同划分分析

##  1. 按环境划分

这个方式划分会有多个配置文件， 每个配置文件对应一个环境, 那么文件的结构应该是这样


```
application.yml
application-pre.yml 
application-publish.yml
```
默认的配置文件是 `dev` 环境, 每个yml文件中的配置都是独立的


## 2. 按配置业务类型划分

这样做的好处是不同业务型的配置写在不同的文件中， 易于区分， 文件结构是这样的
```
application.yml
application-user.yml
application-db.yml
application-other.yml
```
注意几点：
- `application.yml` 只需要 `指定激活的环境` 以及 `通用的数据项` 配置， 激活的环境可以通过 `maven` 编译时传入
- `application-xxx.yml` 需要区分各种不同的环境中的各种配置

## 两种划分的优缺点分析

###  按环境划分优点

1. 优点
- yml配置文件数量相对少， 与环境多少成正比
- 编译打包时不需要指定环境， 运行时需要用 `-Dspring.profiles.active=XXX` 指定环境
2. 缺点
- 单个配置文件内的数据 `多` ，`杂` ， 修改配置时 `定位较难`

###  按配置业务类型划分优点

1. 优点
- 修改，增加配置时容易定位
- mvn编译时需要指定环境，运行时不需要指定环境
2. 缺点
- 配置文件个数与数据业务类型成正比， 可能较多
- 增加环境时，每个文件需要增加环境配置（这点基本可以忽略，一般环境的个数是确定的）


# 实践

## 按环境划分

1. 文件结构
```
application.yml
application-pre.yml
application-publish.yml
```
2. 配置文件内容， 每个文件所拥有的字段基本一致， 值不同
```yaml
server:
  port: xxxx
spring:
  datasource:
    url: jdbc:mysql://xxxxx
    username: xxxx
    password: xxxx
```
3. 打包运行
```bash
#编译打包
mvn package
#运行指定环境
java  -jar -Dspring.profiles.active=pre  app.jar 
```

## 按业务类型划分

1. 文件结构
```
application.yml
application-user.yml
application-db.yml
```
2. 配置文件内容
- `application.yml`

  ```yaml
  spring:
    profiles:
      #这个环境值通过maven配置取得
      active: @spring.profiles.active@
      include: demo,db
  ```

- `application-user.yml` , 需要分别配置多个环境

  ```yaml
  ---
  spring:
    profiles: dev
  user:
    phone: 111111
  server:
    port: 8001
  ---
  spring:
    profiles: pre
  user:
    phone: 222222
  server:
    port: 8002
  ---
  spring:
    profiles: publish
  user:
    phone: 33333
  server:
    port: 8003
  ```

- `application-db.yml`

  ```yaml
  ---
  spring:
    profiles: dev
    datasource:
      url: jdbc:mysql://10.0.0.100:3306/test
      username: root
      password: root
  ---
  spring:
    profiles: pre
    datasource:
      url: jdbc:mysql://10.0.0.111:3306/test
      username: root
      password: root
  ---
  spring:
    profiles: publish
    datasource:
      url: jdbc:mysql://123.121.121.100:3306/test
      username: root
      password: root
  ```

3. pom文件配置

   ```xml
    <profiles>
        <profile>
            <id>dev</id>
            <properties>
                <spring.profiles.active>dev</spring.profiles.active>
            </properties>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
        </profile>
        <profile>
            <id>pre</id>
            <properties>
                <spring.profiles.active>pre</spring.profiles.active>
            </properties>
        </profile>
        <profile>
            <id>publish</id>
            <properties>
                <spring.profiles.active>publish</spring.profiles.active>
            </properties>
        </profile>
    </profiles>
   ```

4. 打包运行

   ```bash
   #打包时指定环境id
   mvn  package -Ppre
   #运行时不需要指定
   java -jar app.jar
   ```
