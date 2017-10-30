---
title: '[Java]学习笔记-接口多态'
tags:
  - java
categories:
  - Java
date: 2016-12-23 16:29:41
---

<div><span style="color: #ff0000;">接口</span>：java没有多继承，只有单继承。如果想实现多继承，java中有另外一种方法，实现多个接口。关键字：<span style="color: #ff0000;">implements.</span></div>

### 接口定义

```
interface Demo{
	static void func(){};//静态方法
	void func1();//无方法体，实现此接口的类必须复写这个方法
}
```

### 接口实现

```
class  C1 implements  Demo{
	public  void func1(){};
}
class  C2 implements  Demo{
	public  void func1(){};
}
```

### 多态

多态只有在有继承关系或者是接口实现关系情况下才有的概念，事实上我们可以把接口理解成可以用来多继承的super类

```
new C1.func1();
emo demo =new C1;
demo.func1();
```

### 实例

```
	interface USB{
	 void usbRun();
	}

	class Computer implements USB {
	 String name = "电脑";
	 @Override
	 public void usbRun() {
	 System.out.println(name+"USB 可传数据，可充电");
	 }
	}
	
	class HardDrive implements USB{
	 String name = "硬盘";
	 @Override
	 public void usbRun() {
	 System.out.println(name+"USB 可传数据");
	 }
	}
	
	class Mp3 implements USB{
	 String name = "Mp3";
	 @Override
	 public void usbRun() {
	 System.out.println(name+"USB 可充电");
	 }
	}
	public class InterfaceDemo1 {
	 public static void main(String[] args) {
	 new Computer().usbRun();
	 new HardDrive().usbRun();
	
	 USB usb =new Computer();
	 usb.usbRun();
	 }
	}
	//输出结果：
	//电脑的USB可充电，可传数据
	//硬盘的USB可传数据
	//电脑的USB可充电，可传数据
```
