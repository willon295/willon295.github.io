---
title: '[SpringCloud]02_Hystrix_断路器'
tags:
  - Hystrix
  - SpringCloud
  categories:
  - Hystrix
  - SpringCloud
  date: 2018-06-29 00:02:00
---

`断路器`  :  当客户端访问服务器, 发现服务器 `异常不能访问` ,那么客户端执行一个

`fallback` 方法, fallback如何处理由需求决定.

> 注意:  Hystrix 是在消费者客户端基础之上的





#  Hystrix_客户端添加断路器

## Rest+Ribbon 方式设置断路器



1. 引入 `hystrix`   依赖

   ```xml
   <dependency>
   			<groupId>org.springframework.cloud</groupId>
   			<artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
   </dependency>
   
   ```

   

2. 在service处 `注解业务方法` , 定义 `fallback` 方法

   ```java
   @Service
   public class ConsumerService {
   
       public final RestTemplate restTemplate;
   
       @Autowired
       public ConsumerService(RestTemplate restTemplate) {
           this.restTemplate = restTemplate;
       }
   
   
       //指定fallback方法名
       @HystrixCommand(fallbackMethod = "getError")
       public String get(String name) {
           String forObject = restTemplate
                   .getForObject("http://SERVICE-PROVIDER/get?name=" + name, String.class);
           return forObject;
       }
   
       //定义fallback方法
       public String getError(String name) {
   
           return "服务器出现异常...请求的参数是: " + name;
       }
   }
   
   ```

   

3. 入口处启用断路器

   ```java
   
   //启用断路器和仪表盘
   @EnableHystrix
   @EnableDiscoveryClient
   @SpringBootApplication
   public class HystrixApplication {
   
       public static void main(String[] args) {
           SpringApplication.run(HystrixApplication.class, args);
       }
   
       @Bean
       @LoadBalanced
       RestTemplate restTemplate() {
           return new RestTemplate();
       }
   }
   
   ```

   



## Feign方式设置断路器



1. `不需要` 引入 `hystrix` 依赖,自带断路器

2. 自定义一个 `处理器` 实现 `业务接口` , 重写其中的方法

   ```java
   /**
    * 自定义处理器, 实现业务接口, 重写方法
    */
   @Component
   public class FeignServiceHystrix implements FeignService {
       @Override
       public String get(@RequestParam(value = "name") String name) {
           return "访问服务器异常...请求参数"+name;
       }
   }
   
   ```

   

3. 在业务接口处指定处理此接口的 `处理器` 

   ```java
   //指定  回调处理器
   @FeignClient(value = "SERVICE-PROVIDER",fallback = FeignServiceHystrix.class)
   public interface FeignService {
       //指定 服务的 接口
       @GetMapping("/get")
       //指定参数 并且绑定
       String get(@RequestParam(value = "name") String name);
   }
   ```

4. 配置文件中配置

   ```
   feign:
     hystrix:
       enabled: true
   ```

   > 这里 ide 没有提示,但是要加上才能生效

# 思考

1. 断路器相当于预留了一个 `访问服务异常` 的 `回调接口`, 真正如何处理需要手动处理.
2. 那么 如果是真的在现实的生产环境, 应该尝试访问其他提供同样功能的服务而不是手动处理, 这个就是一个运维的问题.
3. 综合考虑: 使用 `Feign`  方式访问业务接口, 处理异常比较方便 





# Hystrix_Dashboard 监控面板

前提是 `客户端使用了断路器` ，  监控面板可以使用在任何 eureka 客户端 ， 监控所有的请求。

## 配置面板

1. 添加依赖

   ```xml
   <!--断路器仪表盘配置-->
   <dependency>
   			<groupId>org.springframework.cloud</groupId>
   			<artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
   </dependency>
   <dependency>
   			<groupId>org.springframework.cloud</groupId>
   			<artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
   </dependency>
   ```

   

2. 暴露接口

   ```
   management:
     endpoints:
       web:
         exposure:
           include: "*"
   ```

3. 入口处使用 `@EnableHystrix` 、 `@EnableHystrixDashboard`

## 简单使用

访问 `http://localhost:8763/hystrix`  即可看到控制面板， 填写的信息可以如下：

![](/images/spring-cloud-hystrix-dashboard.png)



# Turbine 聚合监控

独立开启一个服务用来监控其他的服务断路情况。

## 配置

1. 新建一个spring boot工程， 需要 `turbine` 、`hystrix` 、 `hystrix-dashboard` 依赖

   ```xml
   
    <dependency>
               <groupId>org.springframework.cloud</groupId>
               <artifactId>spring-cloud-starter-netflix-turbine</artifactId>
   </dependency>
   <dependency>
             <groupId>org.springframework.cloud</groupId>
               <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
   </dependency>
   <dependency>
                   <groupId>org.springframework.cloud</groupId>
               <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
   </dependency>
   ```

2. 配置文件

   ```
   server:
     port: 8888
   eureka:
     client:
       service-url:
         # 指定注册中心的地址
         defaultZone: http://localhost:8761/eureka/
   turbine:
     combine-host-port: true
     app-config: service-consumer # 要监听的服务
   management:
     server:
       port: 8889
     endpoints:
       web:
         exposure:
           include: "*"
   spring:
     application:
       name: turbine-test
   ```

   

3. 入口文件，使用以下注解

   ```java
   @EnableTurbine
   @EnableDiscoveryClient
   @EnableHystrix
   @EnableHystrixDashboard
   @SpringBootApplication
   public class TurbineTestApplication {
   
       public static void main(String[] args) {
           SpringApplication.run(TurbineTestApplication.class, args);
       }
   }
   
   ```

## 



