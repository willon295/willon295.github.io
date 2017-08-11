---
title: '[Hibernate]配置文件'
tag: Hibernate
id: 99
category: Hibernate
---

# 核心配置文件

`hibernate.cfg.xml` 是hibernate的核心配置文件，框架只会自动加载这个配置文件
## 注意：

- 名称和位置是固定的：`src` 目录、`hibernate.cfg.xml` 名字

## 详解

```
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <!--1. 必要部分-->
        <!-- 驱动，URL，数据库用户名密码-->
        <property name="connection.driver_class">com.mysql.jdbc.Driver</property>
        <property name="connection.url">jdbc:mysql://localhost:3306/demo?useUnicode=true&amp;characterEncoding=UTF-8</property>
        <property name="connection.username">root</property>
        <property name="connection.password">root</property>

        <!--2. 可选部分-->
        <!--数据库自动ddl , 显示格式化sql语句，方言-->
        <property name="hbm2ddl.auto">update</property>
        <property name="format_sql">true</property>
        <property name="show_sql">true</property>
        <property name="dialect">org.hibernate.dialect.MySQL57Dialect</property>
        
        <!--3. 资源映射文件-->
        <mapping resource="entity/User.hbm.xml"/>
        <mapping class="entity.Students"/>
    </session-factory>
</hibernate-configuration>

```

# 映射文件

框架体现了ORM思想(具体百度),映射文件的名称和位置没有具体要求，但是要在框架的核心文件引用。
建议名称为： `实体类.hbm.xml`

## 对应关系

- 实体类 --> 表名
- 类属性 --> 列名

## 详解

```
<!-- User.hbm.xml 映射文件 -->
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-mapping PUBLIC
    "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
    "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
<hibernate-mapping>
	<!--  1. 类名 和 表名-->
    <class name="entity.User" table="user" >
		<!-- 2. id 对应主键 -->
        <id name="id" column="id">
			<!-- id规则，native标识自增 -->
            <generator class="native"/>
        </id>
		<!-- 3. 其他属性和对应的列名，和属性的数据类型 -->
        <property name="username" column="username" type="string"/>
        <property name="password" column="password" type="string"/>
    </class>
</hibernate-mapping>
```