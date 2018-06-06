---
title: '[Java]10_多线程[待完善]'
tag: Java
category: Java
date: 2016-05-12 00:10:00
---

# 多线程


**基本概念**

1. 程序： 程序是指代码和数据的有序集合
2. 进程： 进程是系统进行资源分配和调度的基本单位，操作系统会给每个程序分配一定的资源。
3. 线程： 程序执行的基本单元
4. 并行： 并发是进程之间的关系 ，多个进程同时运行为并行
5. 并发： 并发是线程之间的关系， 多个线程之间同时运行为并发
6. 主线程和其他线程的关系的平等的，主线程的执行状态不会影响其他线程
7. 只有调用线程对象的 `start()` 方法， 才是真正的启动一个线程。

**关系**
1. 一个进程可以对应多个线程

## 继承Thread类,重写run()方法

1. 需要同步的资源需要将其声明为 `static` , 静态单例，否则会出现读写脏数据

## 实现Runnable接口，重写run()方法


1. 通过重写Runnable接口，运行时需要将该 `类的实例` 放入 `线程` 中，执行线程实例的 `start()` 方法
2. 共享资源可以不声明为静态，因为对像是单例
```

public class RunnaImpl implements Runnable{

    private static int t = 100;

    public void run() {

        while (t > 0) {
            t--;
            System.out.println(Thread.currentThread().getName()+": "+t);
        }
    }

    public static void main(String[] args) {
        RunnaImpl t = new RunnaImpl();
        new Thread(t).start();
        new Thread(t).start();
        new Thread(t).start();
        new Thread(t).start();

    }

}
``` 



## 通过Callable和FutureTask创建线程

待完善

## 通过线程池创建线程


1. 创建线程池
2. 添加要执行的任务，任务必须是线程类
3. 关闭线程池

```
public class ThreadPoolImpl {

    public static void main(String[] args) {
        Test t = new Test();

        //创建线程池 ， 线程数量为5
        ExecutorService es = Executors.newFixedThreadPool(5);//创建只有5 个线程的线程池

        //执行  6 个任务
        for (int i = 0; i < 6; i++) {
            //开始线程
            es.execute(t);
        }
        

        System.out.println(es);

        //关闭线程池
        es.shutdown();
    }


}

class Test implements Runnable {
    private static int t = 100;

    public void run() {
        while (t > 0) {
            t--;
            look();
        }
    }

    public void  look(){
        System.out.println(Thread.currentThread().getName()+"---"+t);
    }
}

```

# 线程同步


1. `synchronized` 关键字
- 修饰方法： 该方法是同步方法，调用是会有内置锁。(同步资源消耗较大，不建议同步整个方法)
- 修饰代码块: 该段代码块被执行时，会被加锁
2. 举个例子

```
package com.briup.thread;

public class Account {
    private int balance;

    public Account(int balance) {
        this.balance = balance;
    }

    public Account() {
    }

    public synchronized void withdraw(int money) {
        if (money > balance) {
            System.out.println(Thread.currentThread().getName() + "消费：" + money + "，余额：" + balance + "，不可消费");
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } else {
            balance -= money;
            System.out.println(Thread.currentThread().getName() + "消费：" + money + "，余额：" + balance);
        }


    }

    public synchronized void deposit(int money) {
        balance += money;
        System.out.println(Thread.currentThread().getName() + "存入：" + money + "，余额：" + balance);
        notifyAll();
    }


    public static void main(String[] args) {
        final Account account = new Account();


        
        //消费的线程 一
        new Thread(new Runnable() {
            public void run() {
                while (true) {
                    int  m = ((int) (Math.random() * 1000));
                    account.withdraw(m);
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                }
            }
        },"lili").start();

        
        //消费的线程 二
        new Thread(new Runnable() {
            public void run() {

                while (true) {
                    int  m = ((int) (Math.random() * 1000));
                    account.withdraw(m);
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                }
            }
        },"rose").start();

        new Thread(new Runnable() {
            public void run() {
                while (true){
                    int  m = ((int) (Math.random() * 100));
                    account.deposit(m);
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        },"jack").start();
        
    }
}

```
