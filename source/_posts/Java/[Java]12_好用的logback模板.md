---
title: '[Java]12_Logback_模板.md'
tag: Logback
category: Java
date: 2016-05-12 00:12:00
---


1. 日志记录在 控制台，文件中保存
2. 一天记录一个日志文件
3. 文件名为 log-日期


```

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration>
<configuration scan="true">
    <!-- 控制台输出 -->
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

        <!-- 正式部署时使用此配置 -->
        <!--
            <file>${app.home}/logs/log.log</file>
            <append>true</append>
            <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
                <fileNamePattern>${app.home}/logs/log.%i.log.zip
                </fileNamePattern>
                <minIndex>1</minIndex>
                <maxIndex>7</maxIndex>
            </rollingPolicy>

            <encoder>
                <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger -
                    %msg%n
                </pattern>
            </encoder>

            <triggeringPolicy
                class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
                <maxFileSize>50MB</maxFileSize>
            </triggeringPolicy>
         -->
    </appender>
    <logger name="com.log.agent" level="DEBUG" />
    <logger name="com.log" level="INFO" />
    <root level="INFO">
        <appender-ref ref="STDOUT" />
        <appender-ref ref="RollingFile" />
    </root>
</configuration>
```
