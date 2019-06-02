---
title: '[Design_Pattern]23_Proxy代理模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:23:00
---

代理模式 是 `结构模式` 的一种，代理模式的功能是在 `客户端` 与 `目标对象` 之间增加一层`代理层`， 代理层可以(在不影响目标对象前提下)提供目标类相同的功能，
代理也 细分为 `静态代理` ， `动态代理`。

# 适用的场景

1. 对 `被代理类` 具体行为进行 `功能增强`（前置/后置）。
2. 提供 `被代理类` 的相同功能的方法，屏蔽/隐藏 `被代理类` 的内部实现，提高 `被代理类` 的安全性。


# 静态代理

静态代理比较简单。
1. 创建统一接口
2. 实例类实现接口，重写方法
3. 代理类实现接口，持有一个实例类的引用
4. 代理类的重写的方法中调用实例的方法，并且可增强

## 功能增强

对用户吃饭睡觉进行功能增强

![](/images/dp23_proxy_static_00.png)

- 接口
```java

/**
 * 用户行为的统一接口
 */
public interface Action {

    void  eat();
    void  sleep();
}

```
- 用户类
```java
/**
 * 具体用户实现类
 */
public class User implements Action {
    private String name;

    public User(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public void eat() {
        System.out.println(name+"吃水果");
    }

    @Override
    public void sleep() {

        System.out.println(name+"睡觉");
    }
}
```
- 代理类
```java
/**
 * 代理类
 */
public class UserProxy implements Action{

    //持有一个用户实例引用
    private User user;
    
    public UserProxy(User user) {
        this.user = user;
    }


    /**
     * 对用户原有的方法增强
     */
    @Override
    public void eat() {
        System.out.println("洗苹果");
        user.eat();
        System.out.println("垃圾扔进垃圾桶");

    }

    @Override
    public void sleep() {
        System.out.println("洗澡");
        user.sleep();
    }
}

```
- 测试类
```java
public class Main {
    public static void main(String[] args) {


        UserProxy userProx = new UserProxy(new User("Jack"));
        userProx.eat();
        System.out.println();
        userProx.sleep();

    }
}
/*

洗苹果
Jack吃水果
垃圾扔进垃圾桶

洗澡
Jack睡觉

 */
```

## 提高目标类安全性

查看图片，首先从硬盘加载（不对外开放），再显示图片

![](/images/dp23_proxy_static_01.png)

- 接口
```java
public interface Image {

    void display();
}
```
- 具体图片类
```java
/**
 * 具体实现类
 */
public class GIFImage  implements Image{

    private String  name;

    public GIFImage(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }


    /**
     * 这个功能安全级别很高，不能被外部访问
     */
    private  void load(){
        System.out.println("私密加载。。");
    }

    /**
     * 显示图片
     */
    @Override
    public void display() {
        load();
        System.out.println("显示图片 : "+name);
    }
}

```
- 代理类
```java
public class ImageProxy implements Image {

    private String name;
    private Image image;

    public ImageProxy(String name) {
        this.name = name;
        image = new GIFImage(this.name);
    }

    public String getName() {
        return name;
    }


    /**
     * 代理功能，屏蔽加载的细节
     */
    @Override
    public void display() {
        image.display();
    }
}
```
- 测试类
```java
public class Main {
    public static void main(String[] args) {


        ImageProxy imageProxy = new ImageProxy("screen-shot.gif");
        imageProxy.display();
    }
}

/*

私密加载。。
显示图片 : screen-shot.gif

*/
```

## 静态代理缺点

1. 要给每个具体对象创建代理类，代理类内需要维护一个目标引用
2. 如果接口增加方法，后期维护不友好



# 动态代理

## 能解决的问题

1. 不用给每个目标创建独立的代理类
2. 可以代理 `实现接口` 的所有类的实例
3. 如果代码通用，可以动态生成任何 代理


## 举个例子

卖火车票、机票，使用动态代理实现： 只要是票，都可以代理

![](/images/dp23_proxy_dynamic_00.png)
- 接口
```java
/**
 * 票
 */
public interface Ticket {
    void sell();
}
```
- 具体票
```java
/**
 * 火车票
 */
public class TrainTicket implements Ticket {

    private double price;

    public TrainTicket(double price) {
        this.price = price;
    }

    public double getPrice() {
        return price;
    }

    @Override
    public void sell() {
        System.out.println("火车票："+price);
    }
}

/**
 * 飞机票
 */
public class AirTicket  implements Ticket{


    private double price;

    public AirTicket(double price) {
        this.price = price;
    }

    public double getPrice() {
        return price;
    }

    @Override
    public void sell() {
        System.out.println("飞机票： "+price);
    }
}
```
- 动态代理类
```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class DynamicProxy implements InvocationHandler {


    //被代理的对象
    private  Ticket target;
    /**
     * 获取动态代理对象
     * @return 代理对象
     */
    public Ticket getProxy(Ticket t) {
        target=t;
        return (Ticket) Proxy.newProxyInstance(target.getClass().getClassLoader(), target.getClass().getInterfaces(), this);
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("代理" + proxy.getClass().getSimpleName());
        return method.invoke(target, args);
    }
}
```
- 测试类
```java
public class Main {

    public static void main(String[] args) {
        TrainTicket trainTicket = new TrainTicket(110.5);
        AirTicket airTicket = new AirTicket(750);
        
        DynamicProxy dynamicProxy = new DynamicProxy();

        Ticket p1 = dynamicProxy.getProxy(trainTicket);
        p1.sell();


        Ticket p2 = dynamicProxy.getProxy(airTicket);
        p2.sell();
    }
}
/*
代理$Proxy0
火车票：110.5
代理$Proxy0
飞机票： 750.0
 */
```