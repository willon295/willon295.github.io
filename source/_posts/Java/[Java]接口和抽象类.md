---
title: '[Java]接口和抽象类'
category: Java
tag: Java
date: 2015-11-12 00:00:00
---

# 接口

jdk 1.8之后, 接口可以将方法实现,一下两种情况,方法体必须实现
- default修饰
- static 修饰 (默认权限为public)

编译之后: 
1. default  --->  public , 所以 实际上 是被 public 修饰, 只不过使用 default 标记它可以有实现体
2. 实现该接口的类 , 会拥有 接口中的 default 方法, 且 修饰符转化为 public 

举个例子: 

源代码: 

```java
public interface IService {

    static void test() {
        System.out.println("test");
    }
    default void test2() {
        System.out.println("test2");
    }
}
```
编译后: 

```java
public interface cn.willon.clone.IService {
  public static void test();
    Code:
       0: getstatic     #1
       3: ldc           #2
       5: invokevirtual #3 
       8: return
  public void test2();
    Code:
       0: getstatic     #1
       3: ldc           #4
       5: invokevirtual #3
       8: return
}
```

# 抽象类

1. 抽象类可以有 `抽象方法` , `具体方法` 
2. 抽象类的子类可以是 `抽象子类` ,抽象子类 可以不实现 父类抽象方法
3. 抽象类的子类是普通类, 必须重写 抽象方法