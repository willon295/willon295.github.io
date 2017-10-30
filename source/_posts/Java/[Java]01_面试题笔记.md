---
title: '[Java]01_面试题笔记'
tile: java
category: java
date: 2016-12-23 16:29:41
---

1. String 类型的数据是不可变的，重新赋值也是引用新的地址.
```
class A1 {
    private String s = "6";
    public static void main(String[] args) {
        A1 a = new A1();
        System.out.println(a.s.hashCode());
        change(a.s);
        System.out.println(a.s.hashCode());

    }

    private static  void  change(String s){
        s="20";
    }
}
//运行结果是 54 54
```
2. 有`public`修饰的类名必须与文件名相同，无`public`修饰的类可以任意
3. 枚举类型`enum`，N个实例，在访问时会创建N个对象实例。
```
enum AccountType
{
    SAVING, FIXED, CURRENT;
    private AccountType()
    {
        System.out.println(“create”);
    }
}
class EnumOne
{
    public static void main(String[]args)
    {
        System.out.println(AccountType.FIXED);
    }
}

//运行结果 create create create FIXED
```
