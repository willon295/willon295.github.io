---
title: '[SpringCloud]01_服务消费者'
tags:
  - Eureka
  - SpringCloud
categories:
  - Eureka
  - SpringCloud
date: 2018-06-29 00:01:00
---
不管是 `服务提供者` 还是 `服务消费者` ,相对于 `注册中心` 来说都是 `客户端`.

消费中的消费可以分成两种模式,

1. rest + ribbon
2. fegin

# 完整的搭建过程



## Register-Center 注册中心

1. 依赖文件

   ```xml
   	<name>register-center</name>
   	<description>服务注册中心</description>
   
   	<parent>
   		<groupId>org.springframework.boot</groupId>
   		<artifactId>spring-boot-starter-parent</artifactId>
   		<version>2.0.3.RELEASE</version>
   		<relativePath/>
   	</parent>
   
   	<properties>
   		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
   		<java.version>1.8</java.version>
   		<spring-cloud.version>Finchley.RELEASE</spring-cloud.version>
   	</properties>
   
   	<dependencies>
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-actuator</artifactId>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-web</artifactId>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework.cloud</groupId>
   			<artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
   		</dependency>
   
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-test</artifactId>
   			<scope>test</scope>
   		</dependency>
   	</dependencies>
   
   	<dependencyManagement>
   		<dependencies>
   			<dependency>
   				<groupId>org.springframework.cloud</groupId>
   				<artifactId>spring-cloud-dependencies</artifactId>
   				<version>${spring-cloud.version}</version>
   				<type>pom</type>
   				<scope>import</scope>
   			</dependency>
   		</dependencies>
   	</dependencyManagement>
   
   	<build>
   		<plugins>
   			<plugin>
   				<groupId>org.springframework.boot</groupId>
   				<artifactId>spring-boot-maven-plugin</artifactId>
   			</plugin>
   		</plugins>
   	</build>
   ```

2. 配置文件

   ```yml
   server:
     port: 8761
   spring:
     application:
       name: register-center
   eureka:
     instance:
       hostname: localhost
     client:
       ##禁止自身注册
       register-with-eureka: false
       fetch-registry: false
       service-url:
       ##指定注册中心的地址
         defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
   management:
     endpoints:
       web:
         exposure:
           include: "*"
   
   ```
   
3. 入口
```java
//标注为注册中心
@EnableEurekaServer
@SpringBootApplication
public class RegisterCenterApplication {
    public static void main(String[] args) {
        SpringApplication.run(RegisterCenterApplication.class, args);
    }
}
```

## ServiceProvider 服务提供者

服务提供者对外提供接口

1. 引入`eureka-client` 依赖

   ```xml
   <parent>
   		<groupId>org.springframework.boot</groupId>
   		<artifactId>spring-boot-starter-parent</artifactId>
   		<version>2.0.3.RELEASE</version>
   		<relativePath/> <!-- lookup parent from repository -->
   	</parent>
   
   	<properties>
   		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
   		<java.version>1.8</java.version>
   		<spring-cloud.version>Finchley.RELEASE</spring-cloud.version>
   	</properties>
   
   	<dependencies>
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-actuator</artifactId>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-web</artifactId>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework.cloud</groupId>
   			<artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
   		</dependency>
   
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-test</artifactId>
   			<scope>test</scope>
   		</dependency>
   	</dependencies>
   
   	<dependencyManagement>
   		<dependencies>
   			<dependency>
   				<groupId>org.springframework.cloud</groupId>
   				<artifactId>spring-cloud-dependencies</artifactId>
   				<version>${spring-cloud.version}</version>
   				<type>pom</type>
   				<scope>import</scope>
   			</dependency>
   		</dependencies>
   	</dependencyManagement>
   
   	<build>
   		<plugins>
   			<plugin>
   				<groupId>org.springframework.boot</groupId>
   				<artifactId>spring-boot-maven-plugin</artifactId>
   			</plugin>
   		</plugins>
   	</build>
   ```

   

2. 配置文件

   ```
   server:
     port: 8762
   eureka:
     client:
       service-url:
         # 指定注册中心的地址
         defaultZone: http://localhost:8761/eureka/
   management:
     endpoints:
       web:
         exposure:
           include: "*"
   spring:
     application:
       name: service-provider
   ```

   

3. 入口

   ```java
   //标注为 eureka 客户端
   @EnableEurekaClient
   @SpringBootApplication
   public class ServiceProviderApplication {
       public static void main(String[] args) {
           SpringApplication.run(ServiceProviderApplication.class, args);
       }
   }
   ```

4. 简单的Controller访问接口

   ```java
   @RestController
   public class HelloController {
       @GetMapping("/get")
       public String hello( String name) {
           return "Hello.." + name;
       }
   }
   ```

## 服务消费者

服务消费者是指使用服务的一方

### Rest+Ribbon 方式消费

1. 需要引入`ribbon` 依赖

   ```xml
   <parent>
   		<groupId>org.springframework.boot</groupId>
   		<artifactId>spring-boot-starter-parent</artifactId>
   		<version>2.0.3.RELEASE</version>
   		<relativePath/> <!-- lookup parent from repository -->
   	</parent>
   
   	<properties>
   		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
   		<java.version>1.8</java.version>
   		<spring-boot-admin.version>2.0.1</spring-boot-admin.version>
   		<spring-cloud.version>Finchley.RELEASE</spring-cloud.version>
   	</properties>
   
   	<dependencies>
   		<dependency>
   			<groupId>de.codecentric</groupId>
   			<artifactId>spring-boot-admin-starter-server</artifactId>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework.cloud</groupId>
   			<artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
   		</dependency>
   		<!--负载均衡使用-->
   		<dependency>
   			<groupId>org.springframework.cloud</groupId>
   			<artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-test</artifactId>
   			<scope>test</scope>
   		</dependency>
   	</dependencies>
   
   	<dependencyManagement>
   		<dependencies>
   			<dependency>
   				<groupId>org.springframework.cloud</groupId>
   				<artifactId>spring-cloud-dependencies</artifactId>
   				<version>${spring-cloud.version}</version>
   				<type>pom</type>
   				<scope>import</scope>
   			</dependency>
   			<dependency>
   				<groupId>de.codecentric</groupId>
   				<artifactId>spring-boot-admin-dependencies</artifactId>
   				<version>${spring-boot-admin.version}</version>
   				<type>pom</type>
   				<scope>import</scope>
   			</dependency>
   		</dependencies>
   	</dependencyManagement>
   
   ```

   

2. 配置文件

   ```
   server:
     port: 8763
   eureka:
     client:
       service-url:
         defaultZone: http://localhost:8761/eureka/
   management:
     endpoints:
       web:
         exposure:
           include: "*"
   spring:
     application:
       name: service-consumer
   ```

   

3. 入口文件

   ```java
   /**
    * 使用 `@EnableDiscoveryClient` 表示是消费者
    */
   @EnableDiscoveryClient
   @SpringBootApplication
   public class ServiceConsumerApplication {
   
       public static void main(String[] args) {
           SpringApplication.run(ServiceConsumerApplication.class, args);
       }
   
   
       //注入一个 restTemplate 供service层注入使用
       @Bean
       @LoadBalanced
       RestTemplate restTemplate() {
   
           return new RestTemplate();
       }
   }
   
   ```

   

4. 消费者Service从注册中心获取接口

   ```java
   @Service
   public class ConsumerService {
       
       //注入一个 restTemplate
       @Autowired
       public RestTemplate restTemplate;
   
       //指定  需要的服务的名称  和对应的接口地址
       public String  get(String name){
           String forObject = restTemplate
                   .getForObject("http://service-provider/get?name="+name, String.class);
           return forObject;
       }
   }
   
   ```

   

5. 消费者Controller

   ```java
   
   @RestController
   public class ConsumerController {
       //注入一个 service
       private final ConsumerService consumerService;
   
       @Autowired
       public ConsumerController(ConsumerService consumerService) {
           this.consumerService = consumerService;
       }
   
       @GetMapping("/get")
       public String get(String name) {
           return consumerService.get(name);
       }
   }
   ```

6. 测试

   ```
   http://localhost:8763/get?name=HIHIHIHI
   ```

7. 结果:  消费者从注册中心找到 服务接口 然后对其进行调用,返回结果



### Feign 方式消费

feign方式是面向接口式开发,比较方便

1. 引入 `open-feign` 依赖

   ```xml
   
   	<properties>
   		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
   		<java.version>1.8</java.version>
   		<spring-cloud.version>Finchley.RELEASE</spring-cloud.version>
   	</properties>
   
   	<dependencies>
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-actuator</artifactId>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-web</artifactId>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework.cloud</groupId>
   			<artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework.cloud</groupId>
   			<artifactId>spring-cloud-starter-openfeign</artifactId>
   		</dependency>
   
   		<dependency>
   			<groupId>org.springframework.boot</groupId>
   			<artifactId>spring-boot-starter-test</artifactId>
   			<scope>test</scope>
   		</dependency>
   	</dependencies>
   
   	<dependencyManagement>
   		<dependencies>
   			<dependency>
   				<groupId>org.springframework.cloud</groupId>
   				<artifactId>spring-cloud-dependencies</artifactId>
   				<version>${spring-cloud.version}</version>
   				<type>pom</type>
   				<scope>import</scope>
   			</dependency>
   		</dependencies>
   	</dependencyManagement>
   ```

   

2. 配置文件

   ```
   server:
     port: 8764
   eureka:
     client:
       service-url:
         defaultZone: http://localhost:8761/eureka/
   management:
     endpoints:
       web:
         exposure:
           include: "*"
   spring:
     application:
       name: feign-consumer
   ```

   

3. 入口文件

   ```java
   //标注使用 feign
   @EnableFeignClients
   @SpringBootApplication
   public class ConsumerFeignApplication {
   
   	public static void main(String[] args) {
   		SpringApplication.run(ConsumerFeignApplication.class, args);
   	}
   }
   
   ```

   

4. Feign消费者Service接口

   ```java
   
   
   @Service
   //  指定 服务名称  <全大写>
   @FeignClient(value = "SERVICE-PROVIDER")
   public interface FeignService {
   
       
       //指定 服务的 接口
       @GetMapping("/get")
       
       //指定参数 并且绑定
       String get(@RequestParam(value = "name") String name);
   }
   
   ```

   

5. Feign消费者Controller

   ```java
   @RestController
   public class FeignController {
   
       @Autowired
       private FeignService feignService;
   
       @GetMapping("/get")
       public String get(String name) {
   
           return feignService.get(name);
       }
   }
   
   ```

   

6. 测试

   ```
   http://localhost:8764/get?name=hahhahah
   ```

# 总结



1. 再次发现官网的 doc不可靠, 依赖配置文件可以参 spring github的样例
2. `服务提供者` 入口文件用的是: `@@EnableEurekaClient` 
3. `服务消费者` 入口文件用的是: `@EnableDiscoveryClient`  
4. 如果是 `Feign消费者` 方式,入口文件用的是: `@EnableFeignClient` 

