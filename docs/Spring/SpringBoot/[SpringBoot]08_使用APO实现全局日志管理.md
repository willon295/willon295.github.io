---
title: '[SpringBoot]08_使用APO实现全局日志管理'
tag: SpringBoot
category: SpringBoot
date: 2018-06-20 00:08:00
---

1.  依赖、需要AOP，lombok
```
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.3.RELEASE</version>
    </parent>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.0</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>
    </dependencies>
```

2. 自定义增强类
```
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Enumeration;

@Slf4j
@Aspect
@Component
public class WebLogAspect {

    @Pointcut("execution(* cn.willon.controller..*.*(..))")
    public void weblog() {
    }
    @Before("weblog()")
    public void doBefore(JoinPoint joinPoint) {

        HttpServletRequest request = ((ServletRequestAttributes)
                RequestContextHolder.getRequestAttributes()).getRequest();

        log.info("URL : " + request.getRequestURL().toString());
        log.info("HTTP_METHOD : " + request.getMethod());
        log.info("IP : " + request.getRemoteAddr());
        log.info("CLASS_METHOD : " + joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature
                ().getName());
        log.info("ARGS : " + Arrays.toString(joinPoint.getArgs()));

        Enumeration<String> params = request.getParameterNames();
        while (params.hasMoreElements()) {
            String arg = params.nextElement();
            log.info(arg + "=" + request.getParameter(arg));

        }
    }

    @AfterReturning(returning = "res", pointcut = "weblog()")
    public void doAfterReturning(Object res) {
        HttpServletResponse response = ((ServletRequestAttributes)
                RequestContextHolder.getRequestAttributes()).getResponse();
        int status = response.getStatus();
        log.info("STATUS : " + String.valueOf(status));
        log.info("RESPONSE : " + res);
    }
}
```
