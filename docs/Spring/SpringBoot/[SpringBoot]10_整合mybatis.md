---
title: '[SpringBoot]10_整合mybatis'
tag: SpringBoot
category: SpringBoot
date: 2018-06-20 00:10:00
---


# 准备


1. 引入依赖
```
        <!--2. 整合mybatis需要的依赖-->

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>1.3.1</version>
        </dependency>
```
2. 配置数据源
```
spring:
  datasource:
    url: jdbc:mysql://localhost/test?useSSL=false&useUnicode=true&characterEncoding=utf-8
    driver-class-name: com.mysql.jdbc.Driver
    username: root
    password: root
```


# 全注解方式

Mapper的自动装配有几种方式：

1. 每个 Mapper上使用 `@Mapper` 注解
2. 不用 @Mappr 注解 ， 在入口使用 `@MapperScan(basepackages="XXX")` 指定Mapper位置

## 步骤

3. 写Mapper
```
@Mapper
public interface UserMapper {

    @Select("select * from t_user where  id = #{id}")
    User findByid(int id);

    @Select("select * from t_user where name = #{name}")
    User findByName(String name);

    @Insert("insert into t_user(age,name) values (#{age},#{name})")
    void add(User user);

    @Select(value = "select * from t_user")
    List<User> findAll();
}
```

# XML 文件方式

1. 写接口,接口 `不需要任何注解`
2. 写 XXmapper.xml 文件
3. 配置文件，取别名，指定xml文件位置
```
mybatis:
  type-aliases-package: cn.willon.bean
  mapper-locations: classpath:mapper/*.xml
```
4. 在 入口处 使用 `@MapperScan` 指定 `接口` 地址
```
@MapperScan(basePackages ="cn.willon.dao" )
```
