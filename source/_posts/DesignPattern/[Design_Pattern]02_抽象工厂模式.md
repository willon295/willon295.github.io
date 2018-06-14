---
title: '[Design_Pattern]02_抽象工厂模式'
category: 设计模式
tag: 设计模式
date: 2017-10-11 00:02:00
---

`抽象工厂模式` 属于 `创建模式` ，通俗的理解就是 `工厂的工厂`， 使用`工厂生成类` 获取 `相应的工厂`

# 大概步骤

1. 创建要被生产的接口和实现类（具体的事物）
2. 创建 `抽象工厂类` ，该工厂类声明 `获取实现了产品接口类` 的方法
3. 创建不同的 `工厂类`，继承 `抽象工厂类`， 重写自己该有的方法。
4. 创建一个 `工厂生成类` ， 该类返回 `抽象工厂类型的工厂`，根据参数不同返回不同工厂。


# DEMO

![01](/images/dp02_abstractFactory_01.png);
![02](/images/dp02_abstractFactory_02.png);
![03](/images/dp02_abstractFactory_03.png);


1. 创建手机、电脑的接口和实现类
```
//电脑的接口和具体的实现类
public interface Computer {
    void boot();
}
public class ThinkPad implements Computer {
    @Override
    public void boot() {
        System.out.println("ThinkPad  computer boot....");
    }
}
public class Hasee implements Computer {
    @Override
    public void boot() {
        System.out.println("Hasee computer boot.... ");
    }
}

//手机的接口和具体实现类
public interface MobilePhone {
    void boot();
}
public class Xiaomi implements MobilePhone {
    @Override
    public void boot() {
        System.out.println("XiaoMi mobilePhone boot...");
    }
}
public class Sumsung implements MobilePhone {
    @Override
    public void boot() {

        System.out.println("Sumsung mobile phone boot... ");
    }
}
```
2. 创建 `抽象工厂类`，声明获取手机、电脑的方法
```
public abstract class AbstractFactory {
    abstract Computer getComputer(Integer type);
    abstract MobilePhone getPhone(Integer type);
}
```
3. 创建手机、电脑的 `工厂类`，继承 `抽象工厂类`，重写方法
```
//电脑的工厂类
public class ComputerFactory extends AbstractFactory {

    static final int HASEE = 1;
    static final int THINKPAD = 2;

    //重写获取具体电脑的逻辑
    @Override
    Computer getComputer(Integer type) {
        if (type.equals(ComputerFactory.HASEE)) {
            return new Hasee();
        } else if (type.equals(ComputerFactory.THINKPAD)) {
            return new ThinkPad();
        }
        return null;
    }

    @Override
    MobilePhone getPhone(Integer type) {
        return null;
    }
}

//手机的工厂类
public class MobilePhoneFactory extends AbstractFactory {
    static final Integer XIAOMI = 1;
    static final Integer SUMSUNG = 2;
    @Override
    Computer getComputer(Integer type) {
        return null;
    }

    //重写获取具体手机的逻辑
    @Override
    MobilePhone getPhone(Integer type) {
        if (type.equals(XIAOMI)) {
            return new Xiaomi();
        }

        if (type.equals(SUMSUNG)) {
            return new Sumsung();
        }
        return null;
    }
}
```
4. 创建 `工厂生成类`
```
public class FactoryProducer {
    static final int COMPUTER_FACTORY = 1;
    static final int MOBILE_PHONE_FACTORY = 2;
    
    //根据参数的不同，返回不同的工厂类
    public static AbstractFactory getFactory(Integer facType) {
        if (facType.equals(COMPUTER_FACTORY)) {
            return new ComputerFactory();
        }
        if (facType.equals(MOBILE_PHONE_FACTORY)) {
            return new MobilePhoneFactory();
        }
        return null;
    }
}
```
5. 测试类
```
public class Main {
    public static void main(String[] args) {

        //通过工厂生成类， 获取相应的工厂
        AbstractFactory computer_factory = FactoryProducer.getFactory(FactoryProducer.COMPUTER_FACTORY);
        AbstractFactory mobilePhone_factory = FactoryProducer.getFactory(FactoryProducer.MOBILE_PHONE_FACTORY);
        
        //通过具体工厂类， 获取相应的产品
        Computer hasee = computer_factory.getComputer(ComputerFactory.HASEE);
        Computer thinkpad = computer_factory.getComputer(ComputerFactory.THINKPAD);
        hasee.boot();
        thinkpad.boot();

        MobilePhone sumsung = mobilePhone_factory.getPhone(MobilePhoneFactory.SUMSUNG);
        MobilePhone xiaomi = mobilePhone_factory.getPhone(MobilePhoneFactory.XIAOMI);
        sumsung.boot();
        xiaomi.boot();

    }
}
```