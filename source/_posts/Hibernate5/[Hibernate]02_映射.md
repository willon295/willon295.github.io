---
title: '[Hibernate]01_开始_关系映射'
tag: Hibernate
date: 2016-10-12 12:22:33
category: Hibernate
---

# 框架介绍

Hibernate将数据库的关系语句转换成面向对象语句，降低耦合。主要工作：

1.  `hibernate.cfg.xml`  ：数据库连接信息，持久化类映射文件，其他全局配置
2. `Model.hbm.xml` : model 类和数据库表列的映射关系
3. `session`: 进行数据库访问的回话，所有的数据库操作语句由此对象完成



# 主要步骤

1. 新建项目，导入jar 包
2. 新建 `hibernate.cfg.xml` 配置文件（醒目配置等信息）
3. 新建 映射文件 `Model.hbm.xml` （实体类与数据库映射 ）

# 配置文件

```
<hibernate-configuration>
    <session-factory>
        <!--1. 驱动名-->
        <property name="connection.driver_class">com.mysql.jdbc.Driver</property>
        
        <!--2. URL地址-->
        <property name="connection.url">jdbc:mysql://localhost/hibernate?useUnicode=true&amp;characterEncoding=UTF-8</property>
        
        <!--3. 方言，用的什么数据库就指定什么-->
        <property name="dialect">org.hibernate.dialect.MySQL57Dialect</property>
        
        <!--4.  用户名 密码-->
        <property name="connection.username">root</property>
        <property name="connection.password">root</property>
        
        
        <!--控制台输出 SQL语句 ，格式化SQL语句-->
        <property name="show_sql">true</property>
        <property name="format_sql">true</property>
        
    </session-factory>
</hibernate-configuration>

```

# Model映射

## xml 映射

### User类代码

```
package entity;

public class User {
    private int id;
    private String username;
    private String password;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

}
```

### hibernate.cfg.xml配置

```
<!-- 同时配置 entity类  和 xml 文件 -->
<mapping class="entity.User"/>
<mapping resource="entity/User.hbm.xml"/>
```

### User.hbm.xml配置

```
<hibernate-mapping>
    <class name="entity.User" table="user" schema="demo">
        <id name="id" column="id"/>
        <property name="username" column="username"/>
        <property name="password" column="password"/>
    </class>
</hibernate-mapping>
```



## 注解映射

### Students类

```
package entity;
import javax.persistence.*;
import java.util.Date;

/**
 * 1. 类名之前指定  表名
 * 2. get方法前指定  列名
 * 3. 也可以在属性前直接指定 列名，不推荐
 */
@Entity
@Table(name = "students")
public class Students {
    private int id;
    private String sid;
    private String name;
    private Integer age;
    private Date birthday;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "sid")
    public String getSid() {
        return sid;
    }
    public void setSid(String sid) {
        this.sid = sid;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    @Basic
    @Column(name = "age")
    public Integer getAge() {
        return age;
    }
    public void setAge(Integer age) {
        this.age = age;
    }
    @Basic
    @Column(name = "birthday")
    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }


}
```

### hibernate.cfg.xml配置

```
<!-- 只需要配置entity 类 -->
<mapping class="entity.Students"/>
```

