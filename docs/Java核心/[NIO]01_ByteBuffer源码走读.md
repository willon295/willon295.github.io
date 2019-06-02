---
title: '[NIO]01_ByteBuffer源码走读'
category: Java
tag: NIO
date: 2018-07-01 00:00:01
---

在 NIO编程中，  最常用的缓存就是 ByteBuffer ,  它也几乎是万能的 、  既然它如此重要， 底层实现就很有必要看一看 

# 类的结构

```java
public abstract class ByteBuffer
    extends Buffer
    implements Comparable<ByteBuffer>
```

从此处我们得到的结论是：

1. 抽象类： 不可以new,  本身 `没有实例` ， 我们用的实例是他的 `子类` 
2. 继承 `Buffer` ， 猜测 Buffer 基类封装了所有缓存的 `通用属性`、 `方法` 
3. 可比较

# 基类 Buffer

源码如下

```java

public abstract class Buffer {
    // Invariants: mark <= position <= limit <= capacity
    private int mark = -1;
    private int position = 0;
    private int limit;
    private int capacity;
}
```

这里有几个比较重要的属性， 暂时直译， 不知其作用， 再看源码

- mark ： 标记 （某种标记作用）
- position： 位置 （可能与读写的指针有关）
- limit: 限制（暂时不知道什么用处）
- capacity： 容量， 缓存容量

## 测试基类属性

多次向缓存中存放数据， 观察 `position` , `limit `  , `capacity` 变化

```java
     @Test
    public void testBuffer() throws IOException {

        String a = "abcde";
        String b = "fghjk";
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        System.out.println("--------写模式-------");
        System.out.println(buffer.position() + "\t" + buffer.limit() + "\t" + buffer.capacity());
        buffer.put(a.getBytes());
        System.out.println(buffer.position() + "\t" + buffer.limit() + "\t" + buffer.capacity());
        buffer.put(b.getBytes());
        System.out.println(buffer.position() + "\t" + buffer.limit() + "\t" + buffer.capacity());
        
        
        System.out.println("--------读模式-------");
        buffer.flip();
        System.out.println(buffer.position() + "\t" + buffer.limit() + "\t" + buffer.capacity());
        byte[] bytes = new byte[buffer.limit()];
        // 读取2个
        buffer.get(bytes, 0, 2);
        System.out.println(buffer.position() + "\t" + buffer.limit() + "\t" + buffer.capacity());
        // 读取5个
        buffer.get(bytes,2,5);
        System.out.println(buffer.position() + "\t" + buffer.limit() + "\t" + buffer.capacity());
    }

```

输出结果

```
--------写模式-------
0	1024	1024
5	1024	1024
10	1024	1024
--------切换成读模式-------
0	10	1024
2	10	1024
7	10	1024
```

## flip()

源码：

```java
    public final Buffer flip() {
        limit = position;
        position = 0;
        mark = -1;
        return this;
    }
```

结论： 

1. 将limit 赋值为 `写入` 的数据字节长度
2. 初始位置从 0 开始
3. 没有标记



## 测试结论

1. position 表示本次操作的指针位置
2. limit 表示本次操作的上限
   - 写： 能写的位置上限
   - 读： 可读数据的位置上限
3. capacity： 不变，数组容量

## mark(), reset() 

源码

```java

    /**
     * Sets this buffer's mark at its position.
     */
    public final Buffer mark() {
        mark = position;
        return this;
    }

    /**
     * Resets this buffer's position to the previously-marked position.
     */
    public final Buffer reset() {
        int m = mark;
        if (m < 0)
            throw new InvalidMarkException();
        position = m;
        return this;
    }
```

结论： 

1. mark() : 标记当前操作指针 position 的位置
2. reset(): 将 position 复原至上次标记的位置



## clear()


```java
public final Buffer clear() {
    position = 0;
    limit = capacity;
    mark = -1;
    return this;
}
```
观察源码发现， 只是改变了 `指针` 的位置， 并没有真正清空数组数据 

# allocate_allocateDirect

```java
    public static ByteBuffer allocate(int capacity) {
        if (capacity < 0) throw new IllegalArgumentException();
        return new HeapByteBuffer(capacity, capacity);
    }

    public static ByteBuffer allocateDirect(int capacity) {
        return new DirectByteBuffer(capacity);
    }

```

再往下就是底层代码， 看不到