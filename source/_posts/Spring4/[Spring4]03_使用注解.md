---
title: '[Spring4]03_使用注解'
tag: Spring4
id: 110
category: Spring4
---

## 导入 jar包

需要aop 包

- log4j-1.2.17.jar
- commons-logging-1.2.jar
- spring-aop-4.3.9.RELEASE.jar
- spring-beans-4.3.9.RELEASE.jar
- spring-context-4.3.9.RELEASE.jar
- spring-core-4.3.9.RELEASE.jar
- spring-expression-4.3.9.RELEASE.jar

## 引入约束

这里需要引入 `context` 约束 

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context" xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd"> <!-- bean definitions here -->

		
    <context:component-scan base-package="entity"/>
</beans>
```

## 开启扫描

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context" xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd"> <!-- bean definitions here -->

		//开启扫描，指定扫描的包名
		//它会对 所有的类，属性方法进行注解扫描
    <context:component-scan base-package="entity"/>
</beans>
```

## 注解创建对象

spring中有四种创建对象的注解方式，目前没有任何区别
- @Component
- @Service
- @Controller
- @Repository

在类的名称之前介入这个注解即可创建对象
举个例子：
```
@Component(value = "user")
@Scope(value = "prototype")

//@Component("user") : value可以省略，其他不可以
//效果等价于 <bean id="user" class="entity.User"  scope="prototype" />
public class User {
    private  String  username;
	//setter and getter
	}
```

## 注解注入属性

第一种： `@Autowired`注入

```
@Service("userService")
public class UserService {

	//通过类的名称直接new实例，自动注入
    @Autowired
    private UserDAO userDAO;

    public  void  add(){
        System.out.println("userService add .....");
        userDAO.add();
    }
}
```

第二种：`@Resource`注入
这种注入必须注意注入的属性  @Resource(name = "资源名")  和 DAO层一致

DAO层代码
```
@Component("myUserDAO")
public class UserDAO {
    public  void  add(){
        System.out.println("UserDAO  add...");
    }
}
```
Service层代码
```
@Service("userService")
public class UserService {

	//name指定的名称和DAO的一致
    @Resource(name = "myUserDAO")
    private UserDAO userDAO;

    public  void  add(){
        System.out.println("userService add .....");
        userDAO.add();
    }
}
```

## 注解xml混用

- 对象创建： xml 文件配置
- 属性注入： 注解方式