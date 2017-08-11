
---
title: '[Java]反射_Class类&静态加载&动态加载'
tags:
  - java
categories:
  - Java
id: 15
date: 2017-05-11 16:43:34
---
### Class类

在Java中万事万物解释对象，比如一个 `class Fu{}` ，这个 `Fu `类其实也是一个 对象。是 `java.lang.Class` 的对象 。 那么这个对象该如何表示。

```java
class Fu {
    void show() {
        System.out.println("Fu's  show method ");
      }
	}

public class ClassDemo1 {
	public static void main(String[] args) {
       Fu FuInstance = new Fu();

        //如何表示Fu 类类型,通过以下三种方式
        //方式一：通过类的 class 属性
        Class c1 = Fu.class;

        // 方式二： 通过类实例 的  getClass() 方法；
        Class c2 = FuInstance.getClass();

        //方式三：通过类的全称
        try {
            Class c3 = Class.forName("cn.codexz.Fu");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        //比较 c1  c2 是否是同一种类类型
        System.out.println(c1 == c2);

        //通过 Fu类的类类型c1,c2,c3创建该类的对象,
        try {
            Fu ff = (Fu) c1.newInstance();
            ff.show();

        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }

      }
	}
	//运行结果==>
	//true
	//Fu's  show method 
```


### 类的静态加载

比如说有一个`Office`程序，可以打开`word`,`excel`等类型文件。

**问题**：`Word` 和 `Excel` 任何一个类有问题，`Office` 编译不通过

```java
	public class Office {
    public static void main(String[] args) {
		//Office 程序静态加载 Word类和Excel类
        if ("Word".equals(args[0])){
            Word w= new Word();
            w.star();
        }
        if ("Excel".equals(args[0])){
            Excel e = new Excel();
            e.star();
        }
      }
	}

```




### 类的动态加载

1. 第一步
	创建一个`Word`,`Excel` 所有程序的接口（规范）
	```
	interface  OfficeAble {
	public  void  start();
	}
	```

2. 第二步

	让`Word`,`Excel` 实现该接口
	```
	/*Word类*/
	public class Word implements  OfficeAble{
	@Override
	public void start() {
	    System.out.println("word__start");
	  }
	}
	/*Excel类*/
	public class Excel implements  OfficeAble{
	    @Override
	    public void start() {
	        System.out.println("excel__start");
	      }
		}
	```

3. 第三步

	`Office` 程序动态加载类

	```
	public class Office {
	public static void main(String[] args) {
	   try {
			//创建一个某类的类类型
	        Class oft  = Class.forName(arg[0]);
				
			//实例化 
	        OfficeAble  ofb = (OfficeAble) oft.newInstance();
	        ofb.start();
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	      }
		}
		//javac Word.java
		//javac Office.java 
		//java  Office  Word
		//运行结果==> word__start
	```