---
title: '[Design_Pattern]05_适配器模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:05:00
---

`适配器模式`  属于 `结构模式`， 作为两个不兼容的接口之间的桥梁。生活中适配器的例子：
1. 110v 转 220v 电压适配器
2. Type-C 转接头

# 设计步骤

1. 新增 适配器类， 实现通用接口
2. 在 `需要兼容的类` 中添加此适配器
3. 在 `需要兼容的类` 调用具体实现方法时，调用适配器的实现方法


# 举个例子

110V 转 220V

1. 通用接口
```java
public interface Charger {


    void chargging(int dy);
}

```
2. 具体实现类
```java
public class USCharger implements Charger {

 
    @Override
    public void chargging(int dy) {
        if (dy == 110) {
            System.out.println("Chargging.." + dy);
        } 
    }
}
public class CNCharger implements Charger {

    @Override
    public void chargging(int dy) {

        if (dy==220){
            System.out.println("Chargging .. "+dy);
        }else {
            System.out.println("Cann't chargging .." +dy);
        }

    }
}

```
3. 适配器
```java

public class USChargerAdapter implements Charger {

    private Charger charger;

    public USChargerAdapter(int  dy) {
        if (dy==110){
            charger = new USCharger();
        }else if (dy==220){
            charger = new CNCharger();
        }

    }

    @Override
    public void chargging(int dy) {
        charger.chargging(dy);
    }
}
```
4. 让需要转的类拥有此适配器
```java
public class USCharger implements Charger {

    USChargerAdapter adapter;

    @Override
    public void chargging(int dy) {
        if (dy == 110) {
            System.out.println("Chargging.." + dy);
        } else if (dy == 220) {
            adapter = new USChargerAdapter(dy);
            adapter.chargging(dy);
        }
    }
}
```
5. 测试类
```java
public class ChargerTest {
    public static void main(String[] args) {

        USCharger usCharger = new USCharger();
        usCharger.chargging(220);

    }
}
```


# 经常使用



一个 C类  需要 A 接口的某个方法, 但是又 `不需要` 实现 `全部` 的方法, 这个时候我们需要:



1. 创建一个父类B 实现 A接口
2. 让C类继承 B 类



属于简单且典型的桥接