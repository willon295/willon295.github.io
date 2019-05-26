---
title: '[Spring]05_JDK代理_CGLib代理'
tag: Spring
date: 2016-10-12 00:05:00
category: Spring
---

Spring AOP 的主要通过代理实现，而其中主要的代理方式就是 `JDK 代理` 和 `CGlib`代理

## JDK 代理

`JDK代理` 使用了 `java.lang.reflect` 下面的两个类

- `Proxy` ： 用于动态创建目标对象的代理对象。
- `InvocationHandler` : `接口`， 它的实现类用于执行增强逻辑，将目标的方法和增强的逻辑进行`组装`。

### 举个例子

- 定义业务逻辑的接口
```
public interface DAO {

    void add();
    
}
```
- 具体业务类
```
//目标对象
public class DAOImpl  implements DAO{
    
    //切点
    public void add() {

        System.out.println("DAOImpl add  call ... ");
    }
}

```
- 增强类
```
//切面

public class MethodCallMonitor {

    //增强
    public static  void  start(){
        System.out.println("method start  time "+System.currentTimeMillis());
    }
    public static  void  end(){
        System.out.println("method end time "+System.currentTimeMillis());
    }
}
```
- 进行引入的类
```
/**
 * 引入
 * */
public class JDKProxy implements InvocationHandler {

    private Object target;


    public Object getProxy(Object object){
        this.target=object;
        return Proxy.newProxyInstance(target.getClass().getClassLoader(),target.getClass().getInterfaces(),this);
    }


    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        //前置通知
        MethodCallMonitor.start();
        //方法执行
        Object invoke = method.invoke(target, args);

        //后置通知
        MethodCallMonitor.end();
        
        return invoke;
    }
}

```
- 测试
```
public class Main {

    public static void main(String[] args) {

        DAOImpl dao = new DAOImpl();

        DAO proxy = (DAO) new JDKProxy().getProxy(dao);

        proxy.add();
    }
}
/*
method start  time 1530014443742
DAOImpl add  call ...
method end time 1530014443744
 */

```


## CGLib代理

CGlib代理，采用底层的字节码技术，为类创建一个`子类`，并在子类中采用 `方法拦截` 的技术 `拦截所有父类` 调用的方法，并顺势植入横切逻辑

- 引入依赖
```
        <dependency>
            <groupId>cglib</groupId>
            <artifactId>cglib</artifactId>
            <version>3.1</version>
        </dependency>
```
- 同上生成 `业务接口` 、 `业务实现类`
- 代理生成类
```
public class CGlibProxy implements MethodInterceptor {

    //业务对象
    private Object target;


    public Object getProxy(Object object) {
        this.target = object;
        Enhancer enhancer = new Enhancer();//创建增强器类，用于创建动态代理对象
        enhancer.setSuperclass(this.target.getClass()); //设置父类为 目标业务类
        enhancer.setCallback(this); //设置回调
        return enhancer.create(); //创建动态代理对象，返回

    }

    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        System.out.println("method start ...");
        Object o = proxy.invokeSuper(obj, args);//调用业务父类的方法
        System.out.println("method end ...");
        return o;
    }
}

```
- 测试
```

public class Main {

    public static void main(String[] args) {

        DAOImpl dao = new DAOImpl();
        CGlibProxy cGlibProxy = new CGlibProxy();
        //获取代理对象
        DAO proxy = (DAO) cGlibProxy.getProxy(dao);
        proxy.add();

    }
}
/*
method start ...
DAOImpl add  call ...
method end ...
 */
```

