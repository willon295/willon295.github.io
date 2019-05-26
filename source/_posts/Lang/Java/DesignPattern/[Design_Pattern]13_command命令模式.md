---
title: '[Design_Pattern]13_command命令模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:13:00
---

命令模式就是对命令的封装 (`行为模式` 的一种)，它主要将一条命令执行过程细分： 请求者（Invoker）、命令接口|基类（Command）、命令实现类（ConcreteCommand）、接收者（Receiver）.

- `Invoker`: 持有一个Command的实例引用，调用其方法
- `Command`: 抽象的接口或者抽象类或普通基类
- `ConcreteCommand`: 持有一个Receiver 对象，调用其方法
- `Receiver`: 真正执行请求

# 使用场景

某些场合，比如需要对行为进行记录、撤销或重做、事务等处理时。

# 举个例子

遥控器(Invoker)、 命令(Command)、关机开机换台菜单（ConcreteCommand）、电视（Receiver）

# 实现

将遥控器、具体命令、电视分离。

具体结构图：

![](/images/dp13_command_00.png)

1. 电视
```java

/**
 * Receiver 电视
 */
public class TV {
    private int channel= 1;

    public void turnON() {
        System.out.println("TV on...");
    }

    public void turnOFF() {

        System.out.println("TV off...");
    }

    public void changeChannel() {
        channel++;
        System.out.println("Channel change to "+channel);
    }
}

```
2. 命令接口和具体实现类
- 接口
```java
/**
 * Command命令接口
 */
public interface Command {

    void execute();
}
```
- 开机命令
```java
/**
 * 具体命令类 -  打开
 */
public class CommandON implements Command {

    private TV tv;

    public CommandON(TV tv) {
        this.tv = tv;
    }

    @Override
    public void execute() {
        tv.turnON();
    }
}
```
- 关机命令
```java
/**
 * 具体命令 -- 关机
 */
public class CommandOFF implements Command {
    private TV tv;

    public CommandOFF(TV tv) {
        this.tv = tv;
    }


    @Override
    public void execute() {
        tv.turnOFF();
    }
}
```
- 换台
```java
/**
 * 具体命令 -- 换台
 */
public class CommandChangeChannel implements Command {

    private TV tv;

    public CommandChangeChannel(TV tv) {
        this.tv = tv;
    }

    @Override
    public void execute() {
        tv.changeChannel();
    }
}
```
3. 遥控器
```java
/**
 * Invoker:  遥控器
 */
public class Controller {

    //维护一个命令实例
    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void execute(){
        command.execute();
    }
}
```
4. 测试类
```java
public class Client {
    public static void main(String[] args) {
        TV tv = new TV();

        Controller controller = new Controller();


        controller.setCommand(new CommandON(tv));
        controller.execute();

        controller.setCommand(new CommandOFF(tv));
        controller.execute();

        controller.setCommand(new CommandChangeChannel(tv));
        controller.execute();



        /*运行结果

        TV on...
        Channel change to 2
        TV off...

        */

    }
}
```