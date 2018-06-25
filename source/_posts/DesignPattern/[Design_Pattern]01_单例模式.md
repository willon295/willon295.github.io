---
title: '[Design_Pattern]01_单例模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:01:00
---


`单例模式` 属于 `创建模式`， 设计初衷是某类的 `实例唯一`，有且仅有一个实例对象

# 大概步骤


1. 声明private的该类类型的成员
2. 私有化构造方法、使其不可通过 new 创建实例
3. 提供public、static的获取唯一实例的方法
4. 至于实例成员什么时候实例化，分为两种模式： `懒汉` ， `饿汉`



# 饿汉模式

在类加载时就创建唯一实例
```
public class SingletonStarve {

    //声明并且创建唯一实例
    private static SingletonStarve instance = new SingletonStarve();

    //私有化构造方法
    private SingletonStarve() {
    }
    
    //提供获取实例的方法
    public static SingletonStarve getInstance() {
        return instance;
    }

}
```

# 懒汉模式

在调用获取实例方法时创建实例

```
public class SingletonLazy {

    private static SingletonLazy instance;

    private SingletonLazy() {
    }
    
    //只有调用此方法时才创建实例
    public static SingletonLazy getInstance() {
        if (instance == null) {
            instance =  new SingletonLazy();
        }
        return instance;
    }
}
```

# 具体使用

```
    public static void main(String[] args) {
        SingletonLazy i1 = SingletonLazy.getInstance();
        SingletonLazy i2 = SingletonLazy.getInstance();
        SingletonLazy i3 = SingletonLazy.getInstance();

        System.out.println(i1 == i2); //true
        System.out.println(i2 == i3); //true


        SingletonStarve s1 = SingletonStarve.getInstance();
        SingletonStarve s2 = SingletonStarve.getInstance();
        SingletonStarve s3 = SingletonStarve.getInstance();

        System.out.println(s1==s2); //true
        System.out.println(s2==s3); //true
    }

```

# 线程安全问题

- 测试类

```
public class Main {


    public static void main(String[] args) {

        for (int i = 0; i < 5; i++) {
            new Thread(() -> {
                SingletonLazy instance = SingletonLazy.getInstance();
                System.out.println("lazy: "+instance.hashCode());
            }).start();
        }


        for (int i = 0; i < 5; i++) {

            new Thread(() -> {
                SingletonStarve instance = SingletonStarve.getInstance();
                System.out.println("stave: "+instance.hashCode());
            }).start();
        }
    }
}

/*

lazy: 1506862609
lazy: 546952365
lazy: 1506862609
lazy: 1163972460
lazy: 1506862609
stave: 357399586
stave: 357399586
stave: 357399586
stave: 357399586
stave: 357399586

 */
```
可以看出

1. 饿汉模式不会产生线程安全问题，因为在 `类加载时唯一实例就已经创建`
2. 懒汉模式`会产生` 线程安全问题，所以在 饿汉模式需要将方法加锁 `synchronized`