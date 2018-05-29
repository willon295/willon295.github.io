---
title: '[Java]Java程序执行的顺序'
category: Java
tag: Java
date: 2017-12-12 00:00:00
---



# Java类的执行顺序


1. 父类的 `静态成员的赋值` 和 `静态代码块`
2. 子类的 `静态成员的赋值` 和 `静态代码块`
3. 父类的 `实例成员赋值` 和 `实例代码块`
4. 父类的 `构造器` 和 `其他语句`
5. 子类的 `实例成员赋值` 和 `实例代码块`
6. 子类的 `构造器` 和 `其他语句`


```
public class Happy{
	static{
		System.out.print("Happy");
	}
	public static void main(String[] args){
		System.out.print("(1)");
		new D();

	}
}
class E{
	E(){
		System.out.print("(2)");
	}
	public void funcOfE(){
		System.out.print("(3)");
	}
}
class F{
	F(){
		System.out.print("(4)");
	}
	public void funcOfF(){
		System.out.print("(5)");
	}
}
class B{
	E e=new E();
	static F f=new F();
	public String sb=getSb();
	static{
		System.out.print("(6)");
		f.funcOfF();
	}
	{
		System.out.print("(7)");
	}

	B(){
		System.out.print("(8)");
		e.funcOfE();
	}
	public String getSb(){
		System.out.print("(9)");
		return "sb";
	}
}
class C extends B{
	static{
		System.out.print("(10)");
	}
	{
		System.out.print("(11)");
	}
	
	C(){
		System.out.print("(12)");
	}
}
class D extends C{
	public String sd1=getSd1();
	public static String sd=getSd();
	static{
		System.out.print("(13)");
	}
	{
		System.out.print("(14)");
	}
	D(){
		System.out.print("(15)"+sb+" "+sd+" "+sd1);
	}
	static public String getSd(){
		System.out.print("(16)");
		return "sd";
	}
	public String getSd1(){
		System.out.print("(17)");
		return "sd1";
	}
}
```
