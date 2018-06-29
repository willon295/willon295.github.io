---
title: '[Spring]06_Transactional注解'
tag: Spring
category: Spring
date: 2016-10-12 00:06:00
---

@Transational 注解用于管理事务， 一般用于 `业务层`，注解在方法之上，也可以注解在类之上，一般不同的业务方法抛出的异常不同、需要处理的方式不同，所以一般注解在方法之上。

# 参数

|参数|作用|
|---|---|
|name|当配置文件中存在多个TransactionManager，此参用于指定哪个管理器|
|rollbackFor|指定异常类型，发生时回滚|
|noRollbackFor|指定异常类型，发生时不回滚|
|propagation|事务传播类型|
|isolation|事务隔离级别|
|timeout|事务的执行时间，超时则回滚|

## rollbackFor、noRollbackFor

- 作用： 什么时候回滚，什么时候不会滚，执行时会首先判断不会滚的条件
```
    //发生WebServiceException继续执行，发生RuntimeException回滚
    @Transactional(
            rollbackFor = RuntimeException.class,
            noRollbackFor = WebServiceException.class)
    public void oederAndNotify() throws Exception {

    }
```

## propagation 事务传播

- Propagation.REQUIRED:  如果存在事务，加入事务，没有则new个事务
- Propagation.NOT_SUPPORTED: 不为此方法开启事务
- Propagation.REQUIRES_NEW： 不管，立马new一个事务，把原来的事务挂起
- Propagation.MANDATORY： 必须在已有的事务中执行， 否则异常
- Propagation.NEVER： 必须在没有的事务中执行，否则报错
- Propagation.SUPPORTS： 被调用时，如果调用者存在事务，则用事务，没有则不用
- Propagation.NESTED: 嵌套事务，佛系选项，有也行，没有也行


```
public class A{

    @Autowired B b;
    
    @Transational(propagation=Propagation.REQUIRED)
    public void doA(){
        b.doB();
    }
}

public class B{
  
    @Transational(propagation=Propagation.REQUIRED)
    public void doB(){
       //.....
    }
}
```

A B 会在同一个事务中执行。


