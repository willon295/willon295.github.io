---
title: '[Design_Pattern]10_Facade外观模式'
category: 设计模式
tag: 设计模式
date: 2017-10-11 00:10:00
---

# 个人理解

简化用户的操作，提供一个办事部(方法工厂)，该部门可以通知其他相关部门完成用户需求（该工厂可以调用其他模块的方法）


# 举个例子

电脑开机： 完成CPU、硬盘、内存初始化
用户关心: 电脑开机-可以用了
结构图：
![](/images/dp10_facade_00.png)

1. 通用接口
```
/**
 * 基本的组件接口
 */
public interface Component {
    void start();
    void shutdown();
}
```
2. 具体的组件类
- CPU
```
public class CPU implements Component {
    @Override
    public void start() {
        System.out.println("CPU start ..");
    }

    @Override
    public void shutdown() {
        System.out.println("CPU shutdown..");
    }
}
```
- 内存
```

public class Memory implements Component {
    @Override
    public void start() {
        System.out.println("Memory start ..");
    }

    @Override
    public void shutdown() {
        System.out.println("Memory shutdown..");
    }
}

```
- 硬盘
```
public class Disk implements Component {
    @Override
    public void start() {
        System.out.println("Disk start ..");
    }

    @Override
    public void shutdown() {

            System.out.println("Disk shutdown..");

    }
}
```
3. 电脑
```
public class Computer {

    private CPU cpu;
    private Memory memory;
    private Disk disk;

    public Computer() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.disk = new Disk();
    }

    public void start() {
        System.out.println("Computer starting ..");
        cpu.start();
        disk.start();
        memory.start();
        System.out.println("Computer success! ");
    }

    public void shutdown() {
        System.out.println("Computer  shutdown...");
        disk.shutdown();
        memory.shutdown();
        cpu.shutdown();

        System.out.println("Computer shutdown success !");

    }
}
```
4. 测试，用户使用
```

public class TestFacade {
    public static void main(String[] args) {

        Computer computer = new Computer();
        computer.start();

        System.out.println("用户使用中。。");
        System.out.println("用户使用完毕。。");

        computer.shutdown();
        
        
        /*        
        Computer starting ..
        CPU start ..
        Disk start ..
        Memory start ..
        Computer success!
        用户使用中。。
        用户使用完毕。。
        Computer  shutdown...
        Disk shutdown..
        Memory shutdown..
        CPU shutdown..
        Computer shutdown success !
        
        */
    }
}
```