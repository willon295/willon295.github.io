---
title: '[ssh]02_SSH_Demo'
tag: ssh
id: 113
category: ssh
---

## 项目结构

```
[application]
-[src]
--[action]
---UserAction.java
--[bean]
---User.java
--[service]
---UserService.java
--[dao]
---UserDAO.java
---UserDAOImpl.java
--log4j.properties
-[web]
--[WEN-INF]
---[lib]
----antlr-2.7.7.jar
----aopalliance-1.0.jar
----xxxx.jar
--index.jsp
--login.jsp
```

## 配置文件

### web.xml配置

```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">


    <!--1. 配置struts2过滤器-->
    <filter>
        <filter-name>struts2</filter-name>
        <filter-class>org.apache.struts2.dispatcher.filter.StrutsPrepareAndExecuteFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>struts2</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
    <!--2. 配置spring的配置文件名称-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>
    <!--3. spring配置自动加载-->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

</web-app>
```

### Struts2.5核心配置

1. `struts.xml`
```
<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE struts PUBLIC
        "-//Apache Software Foundation//DTD Struts Configuration 2.5//EN"
        "http://struts.apache.org/dtds/struts-2.5.dtd">

<struts>
    <constant name="struts.enable.DynamicMethodInvocation" value="true"/>
    <package name="customer" namespace="/" extends="struts-default">
		<global-allowed-methods>regex:.*</global-allowed-methods>
        <action name="login" class="customerAction" method="login">
            <result name="login" >login.jsp</result>
            <result name="loginsuccess">index.jsp</result>
        </action>
    </package>
</struts>
```

### Hibernate5核心配置

1. `hibernate.cfg.xml` 文件配置

```
<?xml version="1.0" encoding="utf-8"?>

<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <!--5. 设置数据库更新方式-->
        <property name="hbm2ddl.auto">update</property>
        <!--控制台输出 SQL语句 ，格式化SQL语句-->
        <property name="show_sql">true</property>
        <property name="format_sql">true</property>
        <!--配置映射文件-->
        <mapping resource="cn/willon/beans/Customer.hbm.xml"/>
    </session-factory>
</hibernate-configuration>
```

### Spring4.39配置

1. `applicationContext.xml` 配置

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


    <!--配置  注解 自动扫描，以及要扫描的包-->
    <context:component-scan base-package="cn.willon"/>


    <!--1. Struts2.5 && Spring  的 action 配置-->
    <bean id="customerAction" class="cn.willon.actions.CustomerAction" scope="prototype"/>

    <!--1.1. DAO 和 Service-->
    <bean id="customerDAO" class="cn.willon.dao.CustomerDAOImpl"/>
    <bean id="customerService" class="cn.willon.service.CustomerService"/>


    <!--2 Hibernate &&  Spring  配置-->

    <!--2.1  配置 dataSource-->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="com.mysql.jdbc.Driver"/>
        <property name="jdbcUrl" value="jdbc:mysql://localhost/customer"/>
        <property name="user" value="root"/>
        <property name="password" value="root"/>
    </bean>

    <!--2.2 配置sessionFactory-->
    <bean id="sessionFactory" class="org.springframework.orm.hibernate5.LocalSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <property name="configLocations" value="classpath:hibernate.cfg.xml"/>
    </bean>

    <!--2.3 配置 hibernateTemplate-->
    <bean id="hibernateTemplate" class="org.springframework.orm.hibernate5.HibernateTemplate">
        <property name="sessionFactory" ref="sessionFactory"/>
    </bean>

    <!--2.4 配置事务bean -->
    <bean id="transactionManager" class="org.springframework.orm.hibernate5.HibernateTransactionManager">
        <property name="sessionFactory" ref="sessionFactory"/>
    </bean>
    <tx:annotation-driven transaction-manager="transactionManager" proxy-target-class="true"/>

</beans>
```

### 注意事项

1. Hibernate中不能将事务绑定本地线程，否则spring无法接管事务，会报错
2. Struts2.5 DMI调用：
```
<!-- 全局属性 DMI 设置为true -->
<constant name="struts.enable.DynamicMethodInvocation" value="true"/>
<package  >
		<!-- 允许调用的方法，所有 -->
		<global-allowed-methods>regex:.*</global-allowed-methods>
		...
</package>
```
3. jsp页面的<s:action> 标签可以直接调用action
4. input标签的value属性内用 <s:property value="" /> 取值的时候，前后不能带空格，否则最后取出来的值也有空格，如果是执行更新操作的话无法正常使用

