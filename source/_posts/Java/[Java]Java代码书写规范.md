---
title: '[JAVA]JAVA代码书写规范'
tags:
  - java
categories:
  - Java
date: 2016-12-23 16:29:41
---

### 一般原则

1.  尽量使用完整的英文描述符
2.  采用适用于相关领域的术语
3.  采用大小写混合增强可读性
4.  尽量少用缩写，但如果用了，要明智地使用，且在整个工程中统一
5.  避免使用长的名字
6.  避免使用类似的名字，或者仅仅是大小写不同的名字
7.  避免使用下划线（除静态常量等）

### 命名的字母大小写问题

1.  包名： 字母全小写     例如:  cn.coderstory.Activity.Main
2.  类，接口 ：首字母大写，其他全小写 例如: class Container
3.  方法，变量 ：第二个单词开始首字母大写 例如:  seedMessage
4.  常量： 大写，单词用“_”分割 例如: final static MIN_WIDTH = 4
5.  接口 ：首字母大写 ，后缀Impl 例如: class ContainerImpl
6.  异常类： 首字母大写， 后缀Exception 例如: DataNotFoundException
7.  抽象类 ：首字母大写， 前缀Abstract 例如: AbstractBeanDefinition
8.  Test类： 首字母大写， 后缀Test 例如: public Location newLocation()

### 方法的命名

1.  类中获取值方法，一般要求被方法名使用被访问字段名，前面加上前缀get，如getLastUser(), getUserCount()
2.  返回布尔型的判断方法一般要求方法名使用单词 is 做前缀，如isPersistent(),isString()。或者使用具有逻辑意义的单词，例如equal 或equals
3.  用于修改某些设置的方法（一般返回类型为void）：被访问字段名的前面加上前缀 set，如setFirstName(),setLastName()，setWarpSpeed()。</p>
4.  已办的方法一般采用完整的英文描述说明成员方法功能，第一个单词尽可能采用一个生动的动词，第一个字母小写，如 openFile(), addAccount()。

5.  接口 ：首字母大写 ，后缀Impl 例如: class ContainerImpl
6.  异常类： 首字母大写， 后缀Exception 例如: DataNotFoundException
7.  抽象类 ：首字母大写， 前缀Abstract 例如: AbstractBeanDefinition
8.  Test类： 首字母大写， 后缀Test 例如: public Location newLocation()

### Java注释约定

1.  类的整体注释：遵循JavaDoc的规范，在每一个源文件的开头注明该CLASS的作用, 作简要说明, 并写上源文件的作者, 编写日期。如果是修改别人编写的源文件，要在修改信息上注明修改者和修改日期。例如：

	    /**
	    *   @（#）:CLASSNAME.java
	    *   @description: Description of this java
	    *   @author: PROGRAMMER’S NAME YYYY/MM/DD
	    *   @version: Version No.
	    *   @modify:
	    *   @Copyright: 版权由拥有
		*/
2.  类中方法的注释：遵循JavaDoc的规范，在每个方法的前部用块注释的方法描述此方法
的作用，以及传入，传出参数的类型和作用，以及需要捕获的错误。
例如：

		/**
		*  方法的描述
		* @param 参数的描述
		* @return 返回类型的描述
		* @exception 出错信息的描述
		*/

3.  行注释：使用//…的注释方法来注释需要表明的内容。并且把注释的内容放在需要注释的代码的前面一行或同一行。

4.  块注释：使用 /&#42;&#42; 和&#42;/注释的方法来注释需要表明的内容。并且把注释的内容放在需要注释的代码的前面。

5.  注释哪些部分：类的目的（即类所完成的功能）、设置接口的目的以及应如何被使用

6.  成员方法注释（对于设置与获取成员方法，在成员变量已有说明的情况下，可以不加注释；普通成员方法要求说明完成什么功能，参数含义是什么？返回什么？）、普通成员

7.  方法内部注释（控制结构、代码做了些什么以及为什么这样做，处理顺序等）、实参和形参的含义以及其他任何约束或前提条件、字段或属性描述。而对于局部变量，如无特别意义的情况下不加注释。

### JAVA文件声明顺序

类或接口应该按以下顺序声明（其实是加载顺序的问题）：

1.  包的定义
impot类（输入包的顺序、避免使用_）输入包应该   按照java._._，javax._._，org._.* ，com._._   的顺序import在import的时候不应该使用* (例如:  java.util.*)
2.  类或接口的定义

    1.  静态变量定义，按public，protected，private顺序
    2.  实例变量定义，按public，protected，private顺序
    3.  构造方法
	方法定义顺序按照public方法(类自己的方法)，实现接口的方法，重载的public法，受保护方法，包作用域方法和私有方法。建议：类中每个方法的代码行数不要超过100行。
