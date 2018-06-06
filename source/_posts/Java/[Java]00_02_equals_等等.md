---
title: '[Java]00_02_equals_等等'
category: Java
tag: Java
date: 2016-05-12 00:00:02
---

# 基本数据类型

byte, short , char , int  , long , float , double , boolean , String

1. `==` ： 比较内存地址
2. `equals()`: 比较内容


# Stirng


当使用 `new String()` 方式创建时，会产生新的地址。
```
public class Test {
    public static void main(String[] args) {


        String s1 = "Hello";
        String s2 = "Hello";
        System.out.println(s1==s2);  //true
        System.out.println(s1.equals(s2));  //true


        String s3 = new String("Hello");
        System.out.println(s1==s3);   // false
        System.out.println(s1.equals(s3));  //true


        String  s4= s1;
        System.out.println(s4.equals(s2));  //true
        System.out.println(s4 == s2);   //true


        String intern = s1.intern();   //true
        System.out.println(intern==s3); //false
        System.out.println(intern==s4); //true
    }
}

```

# Integer



- `==`：比地址 （int 和 Integer 比较时，比较内容）
- `equals`： 比较内容


1. 当 int 基本数据类型和 Integer 对象比较时，Integer 对象会自动拆箱，然后比较内容
```
int i1 = 10;
Integer i2 = new Integer(10);

System.out.print(i1==i2); //true
System.out.print(i2.equals(i1)); //true
```
2. 自动装箱机制
```
Integer i1 = 10;
Integer i2 = Integer.valueOf(10);
Integer i2 = new Integer(10); //重新创建一个实例
//上面两句是一样的
System.out.println(i2==i1); //true
//这里会首先找IntegerCache， 发现有 10 ，直接把 i1 的引用给 i2 ,所以i1和i2 相同
```

## 啃源码

```
    public static Integer valueOf(int i) {
        if (i >= IntegerCache.low && i <= IntegerCache.high)
            return IntegerCache.cache[i + (-IntegerCache.low)];
        return new Integer(i);
    }
```
1. 所有已经被创建的Integer实例会被缓存进IntegerCache.cache数组，IntegerCache会保存这些值，
2. 再次创建新的对象时，首先会在IntegerCache.cache数组中查找是否已经存在此数据，如果存在直接返回引用，不存在，new 一个
