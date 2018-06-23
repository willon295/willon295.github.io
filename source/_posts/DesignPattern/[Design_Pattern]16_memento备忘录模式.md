---
title: '[Design_Pattern]16_memento备忘录模式'
category: 设计模式
tag: 设计模式
date: 2017-10-11 00:16:00
---

备忘录模式是 `行为模式` 的一种，用于保存/恢复对象的某个状态。
比如后悔药，游戏存档，数据库的事务管理。

# 简介

包括三大组件： `Memento`、 `Originator` 、 `CareTaker`。

1. 组件介绍
- `Memento`: 备忘数据的封装类
- `Originator`: 需要被存储的对象（内部状态需要被保存/恢复），发出备忘/回复请求的对象
- `CareTaker`: 用于存储/获取备忘录封装对象的类
2. 工作流程
- 备忘流程
```
获取Originator的状态 --> 封装成一个 Memento 对象 --> 存储进CareTaker --> 保存完毕
```
- 恢复流程
```
从CareTaker获取Memento对象 -->  从 Memento 对象中获取相应的信息 --> 将信息赋给 Originator --> 恢复成功
```

# 举个例子

结构图：

![](/images/dp16_memento_00.png)



- Originator
```
/**
 * 内部状态  需要被备忘的  实体类
 */
public class Originator {

    //这个属性需要被备忘
    private String state;
    private int id;


    public Originator(int id) {
        this.id = id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
        System.out.println(id+"_当前： "+state);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    /**
     * 将自身状态 封装成 一个 Memento 对象
     * @return Memento备忘实例
     */
    public Memento saveState2Memento() {
        return new Memento(id,state);
    }

    /**
     *从备忘实例中获取状态信息， 并恢复
     * @param memento 备忘实例
     */
    public void getStateFromMemento(Memento memento) {
        this.state = memento.getState();
        System.out.println(id+"_恢复至： "+state);
    }

}
```
- Memento
```
/**
 * 用于存储备忘信息的 封装类
 */
public class Memento {
    //与Originator 需要备忘的属性相同
    private  int id ;
    private String  state;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Memento(int id, String state) {
        this.id = id;
        this.state = state;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


}
```
- CareTaker
```
/**
 * 一个容器，用于存储和获取 备忘实例
 */
public class CareTaker {

    private Map<Integer, Memento> map = new HashMap<>();

    /**
     * 存储保存备忘对象
     * @param memento 备忘实例
     */
    public void add(Memento memento) {

        System.out.println(memento.getId()+"_备忘:     "+memento.getState());

        map.put(memento.getId(), memento);
    }


    /**
     *  获取备忘对象
     * @param id id
     * @return 备忘实例
     */
    public Memento get(int id) {
        return map.get(id);
    }
}

```
- 测试类
```
public class Main {
    public static void main(String[] args) {

        CareTaker taker = new CareTaker();

        Originator o1 = new Originator(1001);
        o1.setState("#1");
        o1.setState("#2");
        taker.add(o1.saveState2Memento());
        o1.setState("#3");


        Originator o2 = new Originator(2002);
        o2.setState("#1");
        taker.add(o2.saveState2Memento());
        o2.setState("#2");

        System.out.println("================");


        o1.getStateFromMemento(taker.get(o1.getId()));
        o2.getStateFromMemento(taker.get(o2.getId()));

    }
}

/**
1001_当前： #1
1001_当前： #2
1001_备忘:     #2
1001_当前： #3
2002_当前： #1
2002_备忘:     #1
2002_当前： #2
================
1001_恢复至： #2
2002_恢复至： #1
**/

```
