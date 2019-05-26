---
title: '[SpringJPA]原理解析[待续]'
date: 2018-03-02 00:00:01
tag: Spring
category: Java
---

# 环境准备

spring启动时会加载， AbstractRepositoryPopulatorFactoryBean ， Spring启动时加载配置文件，填充 Repository 到上下文
ResourceReaderRepositoryPopulator#populate  填充具体Repository

# 保存


## 组件  

1. InvokerFactory 反射执行器的 工厂类， 负责 获取Invoker实例
2. RepositoryPopulator：  Repository填充器， 负责填充具体的Repository
3. Repository: 具体执行数据库操作的类
4. EntityManager：   用于与持久性上下文交互的接口。
5. SessionImpl ： Hibernate中 EntityManager的实现类，
保存的业务最后调用： 
```
EntityManager.persist()
```

最后调用： 
```
org.hibernate.internal.SessionImpl#persist(Object)
```
所以还是调用hibernate的代码