---
title: '[Maven]管理多环境配置_属性注入'
category: Maven
tag: Maven
date: 2018-12-17 00:00:00
---

现实项目中， 因为一些属性、参数在 `不同的环境` 下是不相同的。
所以我们会把一个工程分为各种环境如： 开发环境， 预发环境， 生产环境等。
在不同的环境下指定编译不同的配置文件， 达到动态注入不同的属性值。

## 需求分析

需求应该是这样的：  

1. `user.phone` 这个值在不同的环境中需要不同的值

    ```xml
    <users>
        <user  value="${user.phone}"/>
    </users>
    ```
2. 那么这个值可以放在 `xx.properties` 配置文件中
3. 不同的环境有不同的配置文件  -->  配置文件有多个
4. 编译时指定环境 ，自动编译对应的环境配置文件 ， 注入相应的属性




## Maven 实现

实现需求首先要考虑几点：
1. 多环境配置
2. 环境激活、编译、启动
3. 配置文件加载
4. 值注入

### 配置、激活多环境

使用maven可以简单的实现多环境的配置， 配置如下
```xml
    <profiles>
        <profile>
            <id>dev</id>
            <properties>
                <env>dev</env>
            </properties>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
        </profile>
        <profile>
            <id>pre</id>
            <properties>
                <env>pre</env>
            </properties>
        </profile>
        <profile>
            <id>publish</id>
            <properties>
                <env>publish</env>
            </properties>
        </profile>
    </profiles>
```
配置说明： 
- 分为三个环境： `dev` ，`pre` ， `publish` 分别代表 `项目` ，`预发`， `生产` 环境
- dev 为默认激活的环境

**激活不同的环境**
可以在编译时指定具体的环境： 

```bash
mvn  compile -Ppublish
```
**如何工作**

mvn 会根据  `-P` 参数找到  `prfile`  对应的 id
1. 如果 id 不存在, 加载默认的环境
2. 如果 id 存在， 加载对应的 `profile` 中的所有属性

### 动态加载配置文件， 注入属性

配置如下： 

```xml
    <build>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
                <includes>
                    <include>**/*.*</include>
                </includes>
            </resource>
        </resources>
        <filters>
            <filter>src/main/filters/${env}.properties</filter>
        </filters>
    </build>
```
配置理解： 
`${....}`  这样的字段会被替换成相应的值

1. 过滤出 `src/main/filters/${env}.properties` 文件， `${env}` 这个值在上一步中会传入并注入
2. 加载了配置文件之后， 扫描 `src/main/resources` 所有文件（包括子目录）
3. 找到 `${...}` 与配置文件中的值进行匹配， 并且完成注入


## 完整Demo


1. 项目架构
```
── pom.xml
── src
   ├── main
      ├── filters
      │   ├── dev.properties
      │   ├── pre.properties
      │   └── publish.properties
      ├── java
      └── resources
          └── conf
              └── test.xml
```
2. pom文件
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>cn.willon</groupId>
    <artifactId>test</artifactId>
    <version>1.0-SNAPSHOT</version>
    
    <build>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
                <includes>
                    <include>**/*.*</include>
                </includes>
            </resource>
        </resources>
        <filters>
            <filter>src/main/filters/${env}.properties</filter>
        </filters>
    </build>

    <profiles>
        <profile>
            <id>dev</id>
            <properties>
                <env>dev</env>
            </properties>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
        </profile>
        <profile>
            <id>pre</id>
            <properties>
                <env>pre</env>
            </properties>
        </profile>
        <profile>
            <id>publish</id>
            <properties>
                <env>publish</env>
            </properties>
        </profile>
    </profiles>
</project>
```
3. 三个 `*.properties` 文件
```
#不同文件中这个值不同
user.phone=111111 
```
4. `test.xml` 文件
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<users>
    <user id="user" value="${user.phone}"/>
</users>
```
5. 编译 `pre` 环境配置
```bash
mvn  compile -Ppre
```

## 参考文档

1. [http://maven.apache.org/plugins/maven-resources-plugin/examples/filter.html](http://maven.apache.org/plugins/maven-resources-plugin/examples/filter.html)
2. [http://maven.apache.org/guides/introduction/introduction-to-profiles.html](http://maven.apache.org/guides/introduction/introduction-to-profiles.html)