---
title: '[Share]学习笔记'
tag: Work
category: Work
date: 2018-09-11 00:00:00看
---





1. 熟悉产品
   首先做的就是了解这个产品 `是什么东西` ,  `有什么用` ,   `怎么用`  ,  `什么人会用` , 搞清楚这些问题有助于快速了解产品, 也能帮助你编写代码时梳理思路

2. 搭建环境

   项目所用 `工具` , `软件`  , `配置文件` , `VPN`  等等,  一般注意各种关键软件的 `版本号` 要一致, 不同环境的配置文件理清楚

3. 看项目

   先看看 `整个产品的项目架构`  ,  再了解 `你会着手哪个项目` ,  理清楚该项目的架构, 从  `B/C`   端  到 `S` 端 整个调用过程, 再之后就该 `详细地` 看 `S` 端, 各个服务之间如何调用, 调用哪些接口, 数据库表结构 , 代码编写规范(这一点看你团队风格, 不能独行其道)

4. 读懂PRD:  不清楚的就问, 不停问, 问到你能完整写出代码为止, 其中可能会问到很多人, 因为会调用]很多不同人编写的接口, 如果没有什么注释,没有文档, 就必须问

5. 接口编写

   接口编写一定要注意,  调用逻辑一定要深入到你 `调用其他项目接口` 为止, 根据 `需求` 提供 `合理友好的返回值` 

6. 解决冲突
   代码冲突是很头疼的一件事, 这个时候看 OA里是否有通知, 有的话根据通知解决 , 如果没有通知, 就问 `架构师` 或者 `TL` 或者 `冲突者` 



# 写代码之后要做的事情



1. pull master 代码, 将 master 代码 merge 进当前分支 , 解决冲突 
2. XXX-SNATSHOT 版本 使用 maven 重新打包, 重新deploy
3. git commit ,  git push
4. 去 noble 将代码 `项目环境`  合并代码 , 重新部署 

# 项目架构

```
xx-project
    |__xx-client    --> 客户端模块
        |__java
            |__annotation   --> 常用注解
            |__constants    --> 约束: 一些枚举类
            |__domain       --> H5外部渲染时所需要的一些 Bean
            |__dto          --> 请求数据 Dto
            |__enums        --> 常用的数据枚举, 里面在根据不同的数据请求分包
            |__request      --> 请求类: 某种实体类查询,新增,删除的请求如: CouponSaveRequest
            |__response     --> 对应请求的数据响应类,如: CouponSaveResponse
            |__service      --> 一般只写一个接口,只用于dubbo对外暴露

    |__xx-provider   --> 业务模块
        |__filters          --> 不同环境配置文件
        |__java
            |__config       --> 配置组件
            |__internal     --> 内部调用使用
                |__bean     --> 一些通用的组件或者Bean
                |__context  --> 待完善
                |__coupon   --> 具体业务对象, 里面还会分包, 其中包括解析器, 配置,路由器
                |__dto      --> 业务对象Dto
                |__enums    --> 业务中需要的各种枚举数据
                |__exception--> 异常
                |__executor --> request 对应的 执行器
                |__facade   --> 用于执行请求的 facade门面模式类
                |__handler  --> 处理器
                |__helper   --> 帮助类
                |__hook     --> 钩子
                |__notify   --> 通知
                |__ratelimit
                |__thread   --> 线程类
            |__logger       --> 项目使用的日志工具
            |__provider     --> 一般只是声明两个
                |__service  --> 暴露本项目的唯一接口
                    |__support  -->支持的类 
            |__utils
        |__resources        --> 配置文件
            |__config       --> 环境,消费者, 提供者
            |__META-INF
            |__application.yml
            |__disconf.properties    --> 远程配置文件
            |__disconf.xml  --> spring远程配置Bean
            |__logback.xml  --> log配置
        |__webapp
```

# 关于请求

## 客户端发送请求

1. 创建 xx-client 里面的  XXRequest 请求类
2. dubbo配置里声明需要调用的 XXClient对象 
3. 调用 xxClient.execute(xxRequest);


## 服务端处理

xxClient.execute(MidwareRequest request) 方法中的大概逻辑


1. 通过 request 类名替换, 找到对应的Executor名称
    String simpleName = request.getClass().getSimpleName().replace("Request", "Executor");
    String executorName = Introspector.decapitalize(simpleName);
2. 通过名称,在Spring容器中找到对应的 Executor
    ApplicationContext applicationContext;
    CouponSendExecutor executor =  applicationContext.getBean(executorName);
3. Executor 执行 `executor(XXRequest request)`方法
    executor.execute(request);
4. Executor 的 execute 方法的内部处理逻辑
- 将 xxRequest 对象封装成 `xxDto` 对象
- 将 `xxDto` 对象 传入路由 `xXRouter.route(XxDto dto)` , 通过路由器动态找到对应的 `XxHandler`
- 通过执行 `xxHandler` 的 `execute(XxDto dto)` 方法, 执行请求.
- xxHandler.execute() 方法 , 需要调用对应的 `XxFacade.xxx(XxDto dto)` , 具体方法看业务
> xxFacade.xxx() 方法
> 1. 参数不一定是Dto, 可以是 Request/其他任意对象
> 2. 一般会调用其他项目接口, 需要在 Facade 类注入一个  OtherXXClient 对象, 调用它的 execute 方法


## 调用流程

1. B/C 端口 发送 XXRequest 
2. XxClient.execute 
3. XxExecutor.execute  --> 可以直接到 7
4. 路由找到 XxHandler  
5. XxHandler.execute  
6. handler 找到对应的 XxFacade 
7. XxFacade执行响应的方法,调用第三方api