---
title: '[Design_Pattern]02_01_工厂模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:02:01
---


1. 工厂模式是创造模式的一种，用于创建实例
2. 工厂模式的好处就是集中生产

# 大概步骤

1. 创建 `接口A`
2. 需要被创建的类 `实现接口A`
3. 创建工厂类，提供获取 `A类型实例` 的 `静态方法`，通过判断参数，返回不同实例
4. 使用： 通过工厂类的静态方法，获取想要的实例

# Demo

生产汽车为例

![图片](images/dp02_normalFactory_00.png)

1. 创建 `Car` 接口
```
public interface Car {
    void run();
}
```
2. 创建具体的实现类 `BMW`， `BenCi` 实现 `Car`接口
```
public class BenCi  implements Car{
    @Override
    public void run() {
        System.out.println("BenCi Run...");
    }
}

public class BMW implements Car {
    @Override
    public void run() {
        System.out.println("BMW Run...");
    }
}
```
3. 创建工厂
```
public class CarFactory {
    static final Integer  BMW = 1;
    static final Integer  BENCI = 2;
    public static Car getCar(Integer carType) {
        if (carType == null) {
            return null;
        } else if (carType.equals(BMW)) {
            return new BMW();
        } else if (carType.equals(BENCI)) {
            return new BenCi();
        }

        return null;
    }
}
```
4. 具体使用
```
public class Customer {
    public static void main(String[] args) {
        Car bmw = CarFactory.getCar(CarFactory.BMW);
        bmw.run();

        Car benci = CarFactory.getCar(CarFactory.BENCI);
        benci.run();
    }
}

```