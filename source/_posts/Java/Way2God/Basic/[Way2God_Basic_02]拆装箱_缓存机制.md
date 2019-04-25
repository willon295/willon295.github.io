---
title: '[Way2God_Basic_02]拆装箱_缓存机制'
category: Way2God
tag: Basic
date: 2019-04-24 00:00:01
---

本文知识点：

1. 包装类型、自动拆装箱

2. Integer 的缓存机制

# 包装类型

这得从 基本类型谈起，JAVA有 8 种基本数据类型， 这8中基本数据类型都有对应的包装类：

`Byte、Char 、Short 、 Integer 、 Float 、 Long、Double、Boolean`



## 为什么要有包装类



个人觉得，原因可能有以下几点： 

1.  方便基本数据类型与String之间的转换：
   先看一段代码：

   ```java
   // 低精度 -> 高精度
   byte a = 123;
   int b = a;
   
   // 高精度 -> 低精度
   int c = 12;
   byte d = (byte) c;
   
   
   String  e = "20"; 
   a  = e;// 编译不通过
   ```

   如果引入包装类， 那么不仅可以实现基本数据类型的转化， 还可以扩展其他的功能， 如 String 与各种类型之间的转化。

   

2. 包装类继承自 Object， 方便统一操作
   这一点在集合List、 Map 的操作中有所体现：

   ```java
   List<Integer> ints = new ArrayList<Integer>();
   ```

   其中集合的元素类型必须是 Object 类型， 而基本数据类型不属于 Object 的范围， 所以引入包装类可以统一操作。

# Integer缓存机制

先看一段代码， 了解Integer的神奇之处： 

```java
Integer a = Integer.valueOf(-128);
Integer b = Integer.valueOf(-128);
System.out.println(a == b);

Integer c = Integer.valueOf(127);
Integer d = Integer.valueOf(127);
System.out.println(c == d);

Integer e = Integer.valueOf(-129);
Integer f = Integer.valueOf(-129);
System.out.println(e == f);

Integer g = Integer.valueOf(128);
Integer h = Integer.valueOf(128);
System.out.println(g == h);
```

输出结果是： 

```java
true
true
false
false
```

为什么会有 `false` 结果出现？ 

我们可以简单猜测：  `-127 ~  128 ` 之间的Integer 对象， 如果再次通过 `Integer.valueOf`方法 创建， 获取的是 `相同` 的对象。
为了验证猜想， 我们走进 `Integer.valueOf` 源码：

```java
public static Integer valueOf(int i) {
    
        // 如果 在 -127 ～128 之间 ， 从缓存数组中获取对象
        if (i >= IntegerCache.low && i <= IntegerCache.high)
            return IntegerCache.cache[i + (-IntegerCache.low)];
    	// 否则创建新的对象
        return new Integer(i);
}
```
那么其中的 `IntegerCache.cache` 数组是个什么东西 ？再次走进源码：

```java

    private static class IntegerCache {
        static final int low = -128;
        static final int high;
        static final Integer cache[];
        static {
            // high value may be configured by property
            int h = 127;
            String integerCacheHighPropValue = sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
            if (integerCacheHighPropValue != null) {
                try {
                    int i = parseInt(integerCacheHighPropValue);
                    i = Math.max(i, 127);
                    // Maximum array size is Integer.MAX_VALUE
                    h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
                } catch( NumberFormatException nfe) {
                    // If the property cannot be parsed into an int, ignore it.
                }
            }
            high = h;

            cache = new Integer[(high - low) + 1];
            int j = low;
            for(int k = 0; k < cache.length; k++)
                cache[k] = new Integer(j++);

            // range [-128, 127] must be interned (JLS7 5.1.7)
            assert IntegerCache.high >= 127;
        }

        private IntegerCache() {}
    }
```
可以看出： `-128 ～ 127` 之间的 `Integer对象` 会被放进 `cache[]` 数组中 ， 当调用 `Integer.valueOf()` 方法时： 直接是从数组中获取的对象。

这就解释了为什么会有 `true` 和 `false` 两种结果。



# 自动拆装箱



## 装箱



那么问题又来了， 如果不使用 `Integer.valueOf()` 获取Integer对象呢 ？ 

直接将 `基础数据类型`int  赋值给 `Integer 对象` 会发生什么?  于是我们作出如下调整：

```java
Integer a = -128;
Integer b = -128;
System.out.println(a == b);

Integer c = 127;
Integer d = 127;
System.out.println(c == d);

Integer e = -129;
Integer f = -129;
System.out.println(e == f);

Integer g = 128;
Integer h = 128;
System.out.println(g == h);
```

运行结果：

```java
true
true
false
false
```

可以看出貌似和调用 `Integer.valueOf` 结果没有差别。

 此时若想拨开迷雾， 我们只能通过 `反编译字节码` 。 以下是 `前 3 行` 代码的反编译片段

```java
public static void main(java.lang.String[]);
    Code:
       0: bipush        -128
       2: invokestatic  #2                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
       5: astore_1
       6: bipush        -128
       8: invokestatic  #2                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
      11: astore_2
      12: getstatic     #3                  // Field java/lang/System.out:Ljava/io/PrintStream;
      15: aload_1
      16: aload_2
      17: if_acmpne     24
      20: iconst_1
      21: goto          25
      24: iconst_0
      25: invokevirtual #4                  // Method java/io/PrintStream.println:(Z)V
      ...
      126: return
```

通过阅读字节码文件 ， 我们发现确实在 `编译`  时期， 最终还是生成了调用 `Integer.valueOf` 方法 的代码。

于是我们可以称这个由 `基础数据类型` 转化成 `包装类型对象` 的过程为 ： `自动装箱`



## 拆箱



我们不妨再类比推理， 是否 `Integer` 对象也会被自动转化称 `int` 基础数据类型？

于是又作出如下调整：

```java

Integer a = Integer.valueOf(-128);
int  b = Integer.valueOf(-128);
System.out.println(a == b);

Integer c = Integer.valueOf(127);
int  d = Integer.valueOf(127);
System.out.println(c == d);

Integer e = Integer.valueOf(-129);
int  f = Integer.valueOf(-129);
System.out.println(e == f);

Integer g = Integer.valueOf(128);
int  h = Integer.valueOf(128);
System.out.println(g == h);
```

运行结果： 

```java
true
true
true
true
```

看到这个结果,  加以思考：

1. b 是int基础数据类型，非对象;  a 是Integer 包装类型的对象; 
2.  对象和基础数据类型, 如果比较只能比较 `字面值`， 无法比较内存地址
3. `int  b = Integer.valueOf(-128)`  之所以能通过编译， 肯定发生了转化

于是为了再次究其原理， 我们再次反编译字节码文件， 以下是 `前 3 行`  代码的反编译片段：

```java
  public static void main(java.lang.String[]);
    Code:
       0: bipush        -128
       2: invokestatic  #2                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
       5: astore_1
       6: bipush        -128
       8: invokestatic  #2                  // Method java/lang/Integer.valueOf:(I)Ljava/lang/Integer;
      11: invokevirtual #3                  // Method java/lang/Integer.intValue:()I
      14: istore_2
      15: getstatic     #4                  // Field java/lang/System.out:Ljava/io/PrintStream;
      18: aload_1
      19: invokevirtual #3                  // Method java/lang/Integer.intValue:()I
      22: iload_2
      23: if_icmpne     30
      26: iconst_1
      27: goto          31
      30: iconst_0
      31: invokevirtual #5                  // Method java/io/PrintStream.println:(Z)V
```



不难发现，这段代码可以看出两个问题 ：

- 调用了 `Integer.intValue()` 方法
- 调用  **` 2`**  次 `Integer.intValue()` 方法

那么我们可以很果断的作出以下结论：

1. Integer 对象转化成 int 基础数据类型时， 在 `编译阶段` 通过调用 `Integer.intValue()` 方法完成操作。
2. Integer 对象与 int 基础数据类型 `进行运算` 时 ， 参与运算的是 `字面值` 
3. Integer 对象与 int 基础数据类型 `进行运算` 时， Integer 会通过 `Integer.intValue()` 自动转化成 int 基础数据类型， 然后进行运算。

可以看出，其实 `3` 结论可以直接解释 `2` 结论。

于是我们把 `3` 结论称之为 `自动 拆箱`





