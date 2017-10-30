---
title: '[Spring4]04_AOP操作'
tag: Spring4
date: 2016-10-12 12:22:33
category: Spring4
---

## AOP术语

- 切点：需要被增强的类
- 切面：用于增强的类
- 增强：前置（方法执行前），后置（方法return之后），环绕（方法执行之前之后）
> 大概顺序是 ：前置--> 环绕的前--> 方法执行--> 环绕的后--> 后置


## AOP的准备

1. jar 包：
- aopalliance.jar
- aspectjweaver.jar
- spring-aspects-4.xx.jar
- spring-aop-4.xx.jar

2. 切入点表达式
`execution(<修饰符>?<返回类型><方法名>(参数)<异常>)`
- execution(* cn.willon.User.add(..))  :  User类的add 方法
- execution(* cn.willon.*(..))  : 对所有的类的所有方法
3. 配置文件
这里需要引入 `aop` 约束
```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="
        http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd"> <!-- bean definitions here -->

    <context:component-scan base-package="cn.willon"/>

    <!--1. 配置用于增强的 类（切面）-->
    <bean id="myAop" class="cn.willon.aop.UserAOP"/>

    <!--2. 配置一个 aop -->
    <aop:config>

        <!--3. 配置一个切点，用表达式表示指定 切点-->
        <aop:pointcut id="pointcut_userService" expression="execution(* cn.willon.service.UserService.add(..))"/>


        <!--4. 配置一个切面，选择切面的类-->
        <aop:aspect id="aspect_user" ref="myAop">

            <!--5. 配置增强的方式，前置后置环绕，指定被增强的切点-->
            <aop:before method="front" pointcut-ref="pointcut_userService"/>

            <aop:around method="around" pointcut-ref="pointcut_userService"/>

            <aop:after method="end" pointcut-ref="pointcut_userService"/>
        </aop:aspect>
    </aop:config>

</beans>
```
4. 切面类
```
public class UserAOP {
    public void  front(){
        System.out.println("前置.....");
    }

    public void  end(){
        System.out.println("后置.....");
    }
    public void  around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("环绕前.....");

        //这里被增强的方法会被执行
        proceedingJoinPoint.proceed();


        System.out.println("环绕后.....");
    }
}
```
