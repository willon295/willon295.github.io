---
title: '[SpringBoot]自定义SpringBootStarter'
category: SpringBoot
tag: SpringBoot
date: 2019-04-10 00:00:00
---

用过各种 `SpringBootStarter` 的都知道。 开箱即用， 可以省去很多复杂的配置。 那么，如何优雅构建属于自己的 `SpringBootStarter`  



# 项目架构以及简单介绍



首先得说说简单的项目架构： 大致分为两大模块



```
hello-spring-boot-starter 

hello-spring-boot-starter-autoconfigure
```



1. `hello-spring-boot-starter `： 以后使用的 `starter`, 依赖 `hello-spring-boot-starter-autoconfigure`
2. `hello-spring-boot-starter-autoconfigure`： 从`YAML` 文件读取配置信息 （或者不读取）， 进行自动配置



# hello-spring-boot-starter 

简单的 `空的meven` 工程： 完整的pom文件如下

```xml

    <groupId>cn.willon</groupId>
    <artifactId>hello-spring-boot-starter</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>
    <dependencies>
        <dependency>
            <groupId>cn.willon</groupId>
            <artifactId>hello-spring-boot-starter-autoconfigure</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>
```





# hello-spring-boot-starter-autoconfigure

简单的SpringBootWeb工程，不需要 `spring-boot-maven`插件, 完整pom文件：

```xml

    <groupId>cn.willon</groupId>
    <artifactId>hello-spring-boot-starter-autoconfigure</artifactId>
    <version>1.0-SNAPSHOT</version>
	<!--jar-->
    <packaging>jar</packaging>
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>
	<!--spring-boot-parent-->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.9.RELEASE</version>
        <relativePath/>
    </parent>
    <dependencies>
        <!--spring-web-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
```



## 配置信息存储Properties类 

在 `autoconfigure` 模块中 新建 `HelloProperties` 用于存放配置

```java
@ConfigurationProperties(prefix = "hello")
public class HelloProperties {
	// 在spring配置文件：  hello.msg=XXX
    private String msg;
	// 省略 setter ..getter
}
```



## 需要使用配置Service与实现类ServiceImpl

在 `autoconfigure` 模块中 新建 `HelloService` 接口 和   `HelloServiceImpl` 实现类

```java
// 接口
public interface HelloService {
    String say(String name);
}

// 实现类
@Service
public class HelloServiceImpl implements HelloService {

    @Resource
    private HelloProperties helloProperties;

    @Override
    public String say(String name) {
        // 使用读取到的配置信息
        return name + helloProperties.getMsg();
    }
}
```

## 自动化配置 AutoConfiguration类

此类需要配置  所有的` Properties类` ,所有使用 `Properties` 的 `ServiceImpl 类` 

```java
@Configuration

// 和注明webApplication相关。（暂时不知实际原理）
@ConditionalOnWebApplication

// 参数是数组， 配置所有的 Properties 类
@EnableConfigurationProperties({HelloProperties.class}) 

// 参数是数组， 配置所有的 使用Properties 的 ServiceImpl 类
@Import({HelloServiceImpl.class})

public class HelloAutoConfiguration {

}
```



## 让Spring扫描AutoConfiguration 并使其生效



由于 `@EnableAutoConfiguration` 最终关键执行的方法是 `SpringFactoriesLoader.loadFactoryNames()` 加载 `resource/META-INF/factories`  文件， 扫描对应的信息， 完成自动配置， 所以需要定义 `factories` 文件 ， 指定 configuration 类

```properties
org.springframework.boot.autoconfigure.EnableAutoConfiguration=cn.willon.autoconfigure.conf.HelloAutoConfiguration
```



# 使用自定义的 Starter

1. `mvn install`   hello-spring-boot-starter-autoconfigure   到本地仓库

2. `mvn install` hello-spring-boot-starter 到本地仓库

3. 新建空的maven工程 `demo`， 只引入依赖

   ```xml
   <dependency>
       <groupId>cn.willon</groupId>
        <artifactId>hello-spring-boot-starter</artifactId>
         <version>1.0-SNAPSHOT</version>
   </dependency>
   ```

4. 新建 入口 `cn.willon.demo.DemoApplication`

   ```java
   @SpringBootApplication
   public class DemoApplication {
       public static void main(String[] args) {
           SpringApplication.run(DemoApplication.class, args);
       }
   }
   ```

5. 新建 `cn.willon.demo.controller.HelloController` 

   ```java
   @RestController
   public class HelloController {
   
       @Resource
       private HelloService helloService;
       
       @GetMapping("/say/{name}")
       public String hello(@PathVariable String name) {
           return helloService.say(name);
       }
   }
   ```

6. `application.yaml` 文件配置

   ```yaml
   hello:
   	msg: 你好
   ```

7. 浏览器访问 `localhost:8080/say/11111`





# 元数据的配置(让IDE给出提示)



配置的元数据定义文件为 `resources/META-INF/spring-configuration-metadata.json`

实例
```json
{
  "groups": [
    {
      "name": "hello",
      "sourceType": "cn.willon.autoconfigure.props.HelloProperties",
      "type": "cn.willon.autoconfigure.props.HelloProperties"
    }
  ],

  "properties": [
    {
      "name": "hello.msg",
      "type": "java.lang.String",
      "defaultValue": "HELLO",
      "sourceType": "cn.willon.autoconfigure.props.HelloProperties",
      "description": "打招呼内容"
    }
  ],


  "hints": [
    {
      "name": "hello.msg",
      "values": [
        {
          "value": "你好",
          "description": "中文方式打招呼"
        },
        {
          "value": "Hi",
          "description": "英文方式打招呼"
        }
      ]
    }
  ]
}
```



效果图： 

![](/springbootstarter01.png)
![](/springbootstarter02.png)



# 注意的问题

使用 `application.properties ` 中文乱码， 使用 `application.yaml` 解决