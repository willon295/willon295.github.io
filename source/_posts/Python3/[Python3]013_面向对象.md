---
title: '[Python3]013_面向对象'
tags:
  - python3
id: 332
categories:
  - Python3
date: 2017-04-16 20:59:50
---

Python也是一门面向对象的语言

### 类定义

用保留字`class` 定义一个类。

*   属性： 属性可以在类中定义，也可以在实例中扩展。
*   方法：包括`内置的方法`和`用户定义的方法`，而且方法的第一个参数必须是`self`，当然亦可以改成其他的名字.

举个栗子：

    class FClass:
        #定义一个成员a
        a=78

        #定义一个方法setdata()
        def setdata(self,value):
            self.data=value

        #定义一个方法display()
        def display(self):
            print(self.data)
    `</pre>

    还有世界上最简单的python类:

    <pre>`class C:
        pass
    `</pre>

    ### 类对象

    类的对象是类的实例，类的实例可以调用类的方法，可以访问成员。`还可以创建一个新的属性并且赋值`。

    举个栗子

    <pre>`class FClass:
        #定义一个成员a
        a=78

        #定义一个方法setdata()
        def setdata(self,value):
            self.data=value

        #定义一个方法display()
        def display(self):
            print(self.data)

    #实例化对象
    aa=FClass()

    #打印aa的a属性
    print(aa.a)

    #调用方法，进行赋值
    aa.setdata("a data")
    aa.display()

    #创建一个新的属性，并且进行赋值
    aa.another="another"
    print(aa.another)
    `</pre>

    运行结果

    <pre>`78
    a data
    another
    `</pre>

    ### 类方法

    类的方法包括`内置的方法`和`用户定义的方法`，而且方法的第一个参数必须是`self`，当然亦可以改成其他的名字.

    ### 继承

    类的继承：

    `class SubClass(BaseClass1,BaseClass2...)`

    举个栗子

    <pre>`#这是一个基类
    class BaseClass:
        a=66
        def f(self):
            print("baseclass")

    #继承基类
    class SubClass(BaseClass):
        b=33
        def f2(self):
            print("subclass")
    `</pre>

    那么，`Subclass`的 `实例`会有所有父类属性和方法。并且方法是可以重写。

    ### 访问权限

    1、`私有成员`： `__private_attrs`

    两个下划线开头，声明该属性为私有，不能在类地外部被使用或直接访问。在类内部的方法中使用时 `self.__private_attrs`。

    2、`私有方法`：`__private_method()`

    两个下划线开头，声明该方法为私有方法，不能在类地外部调用。在类的内部调用。

    举个栗子

    <pre>`class ClassOne:

        #定义一个共有成员
        aa="public aa"

        #定义一个私有成员
        __bb="private bb"

        #定义一个共有方法
        def func(self):
            print("public method")

        #定义一个私有方法
        def __func(self):
            print("private method")

    #实例化
    demo=ClassOne()

    #访问
    print(demo.aa)
    demo.func()
    #上面的会正常运行，下面的两个会报错

    print(demo.__bb)
    demo.__func()
    `</pre>

    运行结果

    <pre>`public aa
    public method
    #报错
    Traceback (most recent call last):
    File "E:\桌面内容\Python笔记\test.py", line 25, in &lt;module&gt;
    print(demo.__bb)
    AttributeError: 'ClassOne' object has no attribute '__bb'

###　类的专有方法

1.  `__init__` : 构造函数，在生成对象时调用
2.  `__del__` : 析构函数，释放对象时使用
3.  `__repr__` : 打印，转换
4.  `__setitem__`: 按照索引赋值
5.  `__getitem__`: 按照索引获取值
6.  `__len__`: 获得长度
7.  `__cmp__`: 比较运算
8.  `__call__`: 函数调用
9.  `__name__`:类的名字