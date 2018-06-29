---
title: '[SpringBoot]07_使用lombok简化代码'
tags:
  - lombok
  - SpringBoot
category: SpringBoot
date: 2018-06-20 00:07:00
---

# 安装 lombok 插件

以 idea 的 安装为例：

settings --> plugins --> browse from repository --> 搜索并且安装 lombok

# 配置文件

1. pom.xml 添加依赖
```
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.0</version>
        </dependency>
```
2. logback.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration>
<configuration scan="true">
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} ---[%thread] %-5level %logger{36} - %msg%n
            </pattern>
        </encoder>
    </appender>
    <appender name="RollingFile"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>TRACE</level>
        </filter>

        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/log-%d{yyyy-MM-dd}.log
            </fileNamePattern>
            <maxHistory>10</maxHistory>
        </rollingPolicy>

        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} ---[%thread] %-5level %logger - %msg%n
            </pattern>
        </encoder>
    </appender>
    <logger name="com.log.agent" level="DEBUG" />
    <logger name="com.log" level="INFO" />
    <root level="INFO">
        <appender-ref ref="STDOUT" />
        <appender-ref ref="RollingFile" />
    </root>
</configuration>
```

# 基本使用


|注解|使用说明|
|---|---|
|@Setter|生成setter，注解 类、字段|
|@Getter|生成getter，注解 类、字段|
|@ToString|生成toString，注解 类、字段|
|@EqulsAndHashCode|同|
|@Data|相当于生成上面的所有|
|@NoArgsConstructor/@RequiredArgsConstructor /@AllArgsConstructor|三种构造器|
|@Cleanup|自动释放资源，注解在实例的声明/构建 处|
|@Synchronized|同步锁，一般用在方法之上，实际生成的代码中，锁的是代码块|
|@Nonnull|判断不为空，否则抛出空指针异常|
|@SneakyThrows|相当于try-catch包裹方法异常，传入参数为自定义的异常|
|@Slf4j|注入一个名为 `log` 的 Logger 实例|


1. Bean，自动生成setter、getter、toStrng方法
```
@Setter
@Getter
@ToString
public class User {

    private Integer id;
    private String name;

    public User() {
    }

    public User(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
}
/*  原理: 字节码 ams技术，修改字节码文件，生成对应的方法  */
```
2. @Slf4j、注入日志工具
```
@Data
@Slf4j
public class User {

    private Integer id;
    private String name;

    public User() {
    }

    public User(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public static void main(String[] args) {

        User user = new User(1001,"willon");
        log.info(user.toString());
    }
}

```
3. @Cleanup，释放资源
```
@Cleanup  InputStream in = new FileInputStream("file");

//相当于
InputStream in=null;
try{
     in = new FileInputStream("file");
}catch(Excption e){
    ...
}finaly{
    if(in!=null){
      in.close();
    }

}

```

