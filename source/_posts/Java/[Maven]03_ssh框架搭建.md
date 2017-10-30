---
title: '[Maven]03_ssh依赖'
category: maven
tag: maven
date: 2017-10-08 01:00:51
---

# Maven 基本配置

1. 创建`JavaWeb`项目
```
mvn archetype:generate -DgroupId=组织名 -DartifactId=项目名-模块  -Dversion=版本号 -Dpackage=包名
```
2. 修改`web.xml`文件
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">


</web-app>
```
3. 修改`pom.xml`文件，添加
```
<properties>
  <--这里是解决中文乱码 -->
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  
  <-- 修改编译器版本号-->
  <maven.compiler.source>1.8</maven.compiler.source>
  <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```
# Maven项目依赖

## 主要依赖

1. `junit`： 单元测试
2. `Struts2-core`: struts核心
3. `hibernate-core`: hibernate核心
4. `spring-core`: spring核心
5. `spring-struts`: spring-struts整合插件
6. `spring-hibernate`: spring-hibernate整合插件
7. `spring-tx`: spring事务管理
8. `spring-orm`: orm
9. `aspectj`: aop依赖
10. `c3p0`：数据库连接池
11. `mysql-connector-java`: 数据库驱动

# 配置文件

## web.xml

主要配置Struts过滤器，spring文件的自动加载
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">


    <!--1. 配置struts2的过滤器-->
    <filter>
        <filter-name>struts2</filter-name>
        <filter-class>org.apache.struts2.dispatcher.filter.StrutsPrepareAndExecuteFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>struts2</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>


    <!--2. 配置spring配置文件-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>
    <!--2.1 spring 配置自动加载-->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

</web-app>
```

## hibernate.cfg.xml

主要配置hibernate信息
```
<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <!--设置数据库更新方式-->
        <property name="hbm2ddl.auto">update</property>
        <!--控制台输出 SQL语句 ，格式化SQL语句-->
        <property name="show_sql">true</property>
        <property name="format_sql">true</property>
        <!--配置映射文件-->
        <!--<mapping resource="cn/willon/beans/Customer.hbm.xml"/> -->
    </session-factory>
</hibernate-configuration>
```


## applicationContext.xml

最重要的配置文件，包括三个框架的整合

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd
        http://www.springframework.org/schema/tx
        http://www.springframework.org/schema/tx/spring-tx.xsd">

    <!--1. 配置  注解 自动扫描，以及要扫描的包-->
    <context:component-scan base-package="cn.willon"/>

    <!--2. 配置 Struts2 : Action,Service,DAO-->
    <bean id="customer" class="cn.willon.webapp.entity.Customer"/>


    <!--3. 配置 Hibernate-->
    <!--3.1 配置读取 properties 的 bean-->
    <bean id="propertyConfigurer" class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
        <property name="location" value="classpath:jdbc.mysql.properties"/>
    </bean>
    <!--3.2 配置 dataSource，数据库连接信息-->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="${jdbc.mysql.driverClass}"/>
        <property name="jdbcUrl" value="${jdbc.mysql.jdbcUrl}"/>
        <property name="user" value="${jdbc.mysql.user}"/>
        <property name="password" value="${jdbc.mysql.password}"/>
    </bean>
    <!--3.3 配置 sessionFactory,引入hibernate配置文件-->
    <bean id="sessionFactory" class="org.springframework.orm.hibernate5.LocalSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <property name="configLocations" value="classpath:hibernate.cfg.xml"/>
    </bean>
    <!--3.4 配置 hibernateTemplate ,用于数据库操作-->
    <bean id="hibernateTemplate" class="org.springframework.orm.hibernate5.HibernateTemplate">
        <property name="sessionFactory" ref="sessionFactory"/>
    </bean>

    <!--3.5 配置 事务管理bean-->
    <bean id="transactionManager" class="org.springframework.orm.hibernate5.HibernateTransactionManager">
        <property name="sessionFactory" ref="sessionFactory"/>
    </bean>
    <tx:annotation-driven transaction-manager="transactionManager" proxy-target-class="true"/>

</beans>
```

## jdbc.mysql.properties

配置数据库的连接信息

```
jdbc.mysql.driverClass=com.mysql.jdbc.Driver
jdbc.mysql.jdbcUrl=jdbc:mysql://localhost/maven_ssh_demo
jdbc.mysql.user=root
jdbc.mysql.password=root
```

## log4j.properties

配置log文件的信息

```
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.err
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{ABSOLUTE} %5p %c{1}:%L - %m%n

log4j.appender.file=org.apache.log4j.FileAppender
log4j.appender.file.File=mylog.log
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=%d{ABSOLUTE} %5p %c{1}:%L - %m%n

log4j.rootLogger=info,stdout
```

## Beans.hbm.xml

配置持久层数据

```
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-mapping PUBLIC
        "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
<hibernate-mapping>
    <!--配置映射的类,对应的表-->
    <class name="cn.willon.webapp.entity.Customer">
	<!--主键-->
        <id name="customer_id" column="customer_id" table="t_customer">
            <generator class="native"/>
        </id>
	<!--其他字段-->
        <property name="name"/>
        <property name="password"/>
        <property name="address"/>
        <property name="phone"/>
    </class>

</hibernate-mapping>
```

# Maven部署项目

## 添加tomcat插件

1. 在`pom.xml`文件写入
```
    <build>
        <plugins>
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>tomcat-maven-plugin</artifactId>
                <version>1.1</version>
                <configuration>
                    <path>/maven_ssh_demo</path>
                    <url>http://localhost:8080/manager/</url>
                    <server>tomcat</server>
                </configuration>
            </plugin>
        </plugins>

        <finalName>maven_ssh_demo</finalName>
    </build>
```
2. 在maven的`settings.xml`添加
```
<server>
  <id>tomcat</id>
  <username>admin</username>
  <password>123456</password>
</server>
```
