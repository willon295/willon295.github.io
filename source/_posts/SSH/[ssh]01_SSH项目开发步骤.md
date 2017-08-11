---
title: '[ssh]01_ssh项目开发步骤'
tag: ssh
id: 112
category: ssh
---

### 准备工作

1. jar包：

### 第一步：Struts2.5环境

1. 创建 action(比如UserAction)
2. 核心配置文件 `struts.xml`
3. `web.xml` 添加 Struts2过滤器

### 第二步：Hibernate5环境

1. 实体类
2. 实体类&数据库映射
3. 核心配置文件 `hibernate.cfg.xml`

### 第三步：Spring4环境

1. 创建spring核心配置文件 `applicationContext.xml`
2. 让服务器启动时自动加载配置文件
- 添加监听器
- 指定核心配置文件的位置
```
    <!--2. 配置spring的配置文件名称-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>
    <!--3. spring配置自动加载-->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
```

### 第四步：Struts2&Spring4整合

1. action 在 spring中配置 （action多实例）
2. 把 struts.xml 中 action的 class 改成 spring 里bean的id（需要spring-struts-plugin.jar包支持）

### 第五步：Hibernate&Spring整合

1. 把hibernate中的 数据库信息 在spring配置(一个连接池 dataSource)
2. 把hibernate中的 sessionFactory 在spring配置
```
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
	<property	name="driverClass" value=""  />
	<property	name="jdbcUrl" value=""  />
	<property	name="user" value=""  />
	<property	name="password" value=""  />
</bean>
```
3. sessionFactory 中配置 `dataSource`和 `configlocations`(hibernate配置文件位置) 

```
<bean id="sessionFactory" class="org.springframework.orm.hibernate5.LocalSessionFactoryBean">
	<!-- 指定连接池 -->
	<property	name="dataSource" ref="dataSource"  />
	<!-- 指定hibernate配置文件 -->
	<property	name="configlocations" value="hibernate.cfg.xml"  />
</bean>
```


### 第六步：完成注入关系

1. DAOImpl 中注入 hibernateTemplate 对象
```
@Resource(name="hibernateTemplate ")
private  HibernateTemplate hibernateTemplate;
```
2. hibernateTemplate 对象中注入 sessionFactory
```
<bean id="hibernateTemplate " class="" >
	<property	name="sessionFactory" ref="sessionFactory"  />
</bean>
```
3. service 层注入DAO
4. action中注入 service,实体类

### 第七步：事务配置

1. 配置事务管理 bean ,注入 sessionFactory
```
 <bean id="transactionManager" class="org.springframework.orm.hibernate5.HibernateTransactionManager">
        <property name="sessionFactory" ref="sessionFactory"/>
    </bean>
```
2. 开启事务的注解，指定事务管理器
```
<tx:annotation-driven transaction-manager="transactionManager"/>
```
3. 在 service 层前加入注释 @Transactional