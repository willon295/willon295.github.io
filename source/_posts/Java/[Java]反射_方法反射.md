---
title: '[Java]反射_方法反射'
tags:
  - java
categories:
  - Java
date: 2017-05-11 16:49:34
---
### 方法反射

看代码：

	
	public class ClassDemo1 {

    public static void main(String[] args) {
        //创建一个A 类型的 对象
        A a1 = new A();
        //调用方法
        a1.print();
        a1.print(10, 20);
        a1.print("hello ", "WORLD");
        System.out.println("----------------");

        //反射步骤：
        //1. 获取实例类的类类型
        //2. 通过 getMethod() 方法获取 类的方法
        //3. 反射该方法
        
        Class ctype = a1.getClass();
        try {
            Method m = ctype.getMethod("print");
            Method m1 = ctype.getMethod("print", int.class, int.class);
            Method m2 = ctype.getMethod("print", String.class, String.class);
            m.invoke(a1);
            m1.invoke(a1, 10, 20);
            m2.invoke(a1, "hello", "WORLD");
        } catch (Exception e) {
            e.printStackTrace();
        }
      }
	}

	class A {

    	public void print() {
        	System.out.println("No param method");
    	}

    	public void print(int a, int b) {
        	System.out.println(a + b);
    	}
    
    	public void print(String a, String b) {
        	System.out.println(a.toUpperCase() + "," + b.toLowerCase());
    	}
	}
	#运行结果
	#No param method
	#30
	#HELLO ,world
	#----------------
	#No param method
	#30
	#HELLO,world

	

### List集合反射

看代码

	public class ListReDemo {

    	public static void main(String[] args) {
        	ArrayList  list1 = new ArrayList();
        	ArrayList <String>  stringlist  =new ArrayList<>();
        // 这些都是编译时的操作
        	stringlist.add("hello");
        	stringlist.add("world");
        	System.out.println("未反射： "+stringlist);
        // stringlist.add(100);报错，stringlist无法添加int 类型数据


        	Class ctype1 = list1.getClass();
        	Class ctype2= stringlist.getClass();
        	System.out.println("list 和 stringlist类类型结果："+(ctype1==ctype2));

        try {
            Method m = ctype1.getMethod("add",Object.class);
            m.invoke(stringlist,100);
            //int 类型的数据被添加进 stringlist；运行时进行
            System.out.println("反射： "+stringlist);
        } catch (Exception e) {
            e.printStackTrace();
        }

      }
	}
	#运行结果
	#未反射： [hello, world]
	#list 和 stringlist类类型结果：true
	#反射： [hello, world, 100]
