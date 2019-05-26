---
title: '[Design_Pattern]21_Template模板模式'
category: 设计模式
tag: 设计模式
date: 2018-08-23 00:21:00
---

模板模式 是 `行为模式` 的一种， 他的主要作用是将一系列行为、执行顺序相同的行为抽象处来，
所有的子类实现具体的方法，但是必须遵守父类的执行规则。

大白话： 制定游戏规则/游戏执行套路


# 上代码

![](/images/dp21_template_00.png)

- 抽象基类
```java
/**
 * 游戏规则
 */
public abstract class Game {

     abstract void prepare();

     abstract void startPlay();

     abstract void endPlay();

    //制定游戏规则，必须遵从这个步骤
     void play() {
        prepare();
        startPlay();
        endPlay();
    }
}
```
- 具体游戏
```java

/**
 * 篮球
 */
public class Basketball extends Game {
    @Override
    void prepare() {
        System.out.println("10 People ready ...");
    }

    @Override
    void startPlay() {

        System.out.println("playing ...");
    }

    @Override
    void endPlay() {

        System.out.println("Basketball game end !");
    }
}

/**
 * 足球
 */
public class Football extends Game {
    @Override
    void prepare() {
        System.out.println("22 people ready");
    }

    @Override
    void startPlay() {

        System.out.println("playing...");
    }

    @Override
    void endPlay() {

        System.out.println("Football game end !");
    }
}
```
- 测试类
```java
public class Main {

    public static void main(String[] args) {


        Basketball basketball = new Basketball();
        Football football = new Football();


        basketball.play();
        System.out.println();
        football.play();

    }
}
/*

10 People ready ...
playing ...
Basketball game end !

22 people ready
playing...
Football game end !

 */

```