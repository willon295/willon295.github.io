---
title: '[SpringMVC]01_开始使用'
tag: SpringMVC
category: SpringMVC
date: 2017-10-23 00:00:00
---

# 开始项目

1. 新建Javaweb 项目
2. maven中引入依赖
```
<dependency>
	<groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>4.3.12.RELEASE</version>
</dependency>
```
3. 修改Maven编译器版本号
```
    <properties>
        <!--重新编码-->
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <!--修改编译器版本-->
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>
```
4. `web.xml` 配置
这里加载springMVC核心过滤器，并且加载配置文件
```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">
          
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-mvc.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
    
</web-app>

```
5. `spring-mvc.xml` 配置
spring-mvc的配置文件
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 1. 配置注解扫描路径-->
    <context:component-scan base-package="controller"/>

    <!--2. 视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/" /><!--前缀-->
        <property name="suffix" value=".jsp"/><!--后缀-->
    </bean>

</beans>
```
6. 控制器 `HelloHandler`
处理发起的请求，返回一个.
```
@Controller
public class HelloHandler {
	
	//接受hello的请求，并且相应一个 success 的界面
    @RequestMapping(value = "/hello")
    public  String  hello(){
        System.out.println("走到hello");
        return "success";
    }
}
```

7. 视图 `index.jsp` 和 `success.jsp`
`index.jsp` ： 点击发起请求 `hello`
```
<html lang="en">
<head>
    <title>index</title>
</head>
<body>
<a href="hello">hello</a>
</body>
</html>
```
`success.jsp`: 请求成功的结果页面
```
<html lang="en">
<head>
    <title>index</title>
</head>
<body>
<h2>Success</h2>
</body>
</html>
```

# 大概执行流程

1. 加载配置文件
2. 发起请求
3. 根据 `Controller` 请求找到 `Handler`
4. 根据 `Requestmapping` 找到对应的处理 `method()`
5. 得到返回值，根据返回值得到返回视图
