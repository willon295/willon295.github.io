---
title: '[Java]JVM_Java内存模型(待续)'
category: Java
tag: Java
date: 2017-02-02: 00:00:00
---



# JVM内存模型

简单说就是 JVM 运行程序的时候是如何管理内存，指令，数据等

![](/images/jvm.png)



## 数据区

- 堆： 存储对象实例， 线程共享，动态分配
- 方法区： 线程共享，存储类型信息，字段信息，方法信息，其他信息

## 指令区

- 程序计数器： 记录当前线程执行的字节码 行号，控制语句依赖这个
- 本地方法栈： 调用底层C语言程序
- 虚拟机栈： 方法每执行一次，会创建 一个 `栈帧` 用来存储本次方法执行所需资源，栈帧包括以下组件： 
  - 局部变量表： 用于 存储变量
  - 操作数栈： 用于操作各个变量
  - 动态链接： 动态链接到不同的实例对象==> Java的面向接口编程，多态等
  - 出口： 程序退出的指令（ return）

# JVM调节参数

##  栈、堆设置

-  **-Xss128k**  : 设置每个线程的  `栈帧`  大小为128k
-  **-Xms** : jvm初始化  `堆 ` 大小
- **-Xmx** :  最大堆大小
- **-Xmn** : 设置老代大小
- **-XX:NewSize=n** ： 新生代 大小
- **-XX:NewRatio=n** : 设置新生代 和 老代的大小比例

> 建议 把 -Xms  -Xmx 设置成相同的值， 减少 JVM动态调节频率

## GC设置

- **-XX:+UseSerialGC** ： 使用串行收集器
- **-XX:+UseParallelGC**： 使用并行收集器
- **-XX:+UseParalledlOldGC** ： 使用 并行 老代收集器
- **-XX:+UseConcMarkSweepGC** ： 使用 并发收集器

### 并行收集器设置

- **-XX:ParallelGCThreads=n**： 使用的线程数
- **-XX:MaxGCPauseMillis=n**: 最大暂停时间
- **-XX:GCTimeRatio=n** ： 回收时间占程序运行时间比  （1/(n+1)）

### 并发收集器设置

- **-XX:+CMSIncrementalMode**: 增量模式
- **-XX:ParallelGCThreads=n** ： 线程数

# 