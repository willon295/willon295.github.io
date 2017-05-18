---
title: '[Java]学习笔记-接口多态'
tags:
  - java
id: 128
categories:
  - Java
date: 2016-12-23 16:29:41
---

<div><span style="color: #ff0000;">接口</span>：java没有多继承，只有单继承。如果想实现多继承，java中有另外一种方法，实现多个接口。关键字：<span style="color: #ff0000;">implements.</span></div>

### 接口定义

<div>
<pre> interface Demo{
  static void func(){};//静态方法
   void func1();//无方法体，实现此接口的类必须复写这个方法
}</pre>
</div>

### 接口实现

<pre> class  C1 implements  Demo{
       public  void func1(){};
}</pre>
<pre> class  C2 implements  Demo{
       public  void func1(){};
}</pre>
<div>**如果实现多个接口，用 “ <span style="color: #ff0000;">，</span> ”隔开**</div>
<div></div>

### 多态

多态只有在有继承关系或者是接口实现关系情况下才有的概念，事实上我们可以把接口理解成可以用来多继承的super类
<div>举个栗子：</div>
<div>new C1.func1();</div>
<div></div>
<div>Demo demo =new  C1;</div>
<div>demo.func1();</div>
<div></div>
<div>上面两种情况运行的结果是一样一样的。</div>
<div></div>
<div></div>

### 实例

<pre>/**
 * Created by CL on 16.11.17.
 */

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

}</pre>
<div>输出结果：</div>
<div>电脑的USB可充电，可传数据</div>
<div>硬盘的USB可传数据</div>
<div>电脑的USB可充电，可传数据</div>
<div></div>