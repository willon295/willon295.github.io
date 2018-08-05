---
title: '[Java]集合与容器'
tag: Java
category: Java
date: 2016-12-11 10:00:00
---

# ArrayList

1. 底层使用  `数组`  实现， 线程不安全
2. 默认容量是 10
3. 扩容的规则是 `len + (len >> 1)`  : 原来基础之上加  `n + n/2`   

源代码

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{

    private static final int DEFAULT_CAPACITY = 10;
   transient Object[] elementData;
   public ArrayList(int initialCapacity) {
        if (initialCapacity > 0) {
            this.elementData = new Object[initialCapacity];
        } else if (initialCapacity == 0) {
            this.elementData = EMPTY_ELEMENTDATA;
        } else {
            throw new IllegalArgumentException("Illegal Capacity: "+
                                               initialCapacity);
        }
    }
    
    //扩容的方法
   private void grow(int minCapacity) {
        // overflow-conscious code
        int oldCapacity = elementData.length;
        //扩容   n + n/2
        int newCapacity = oldCapacity + (oldCapacity >> 1);
        if (newCapacity - minCapacity < 0)
            newCapacity = minCapacity;
        if (newCapacity - MAX_ARRAY_SIZE > 0)
            newCapacity = hugeCapacity(minCapacity);
        // 调用  Arrays 工具
        elementData = Arrays.copyOf(elementData, newCapacity);
    }
    
    // ....... 其他方法
    }
```



底层扩容的实现

```java
       // c 是原始的数组
       int[] c = {1, 23, 4, 6, 3, 9, 3, 4, 7};
		
		// 使用底层的 System.arraycopy方法扩容
        int newLength = c.length + (c.length >> 1);
        int[] newA = new int[newLength];
        System.arraycopy(c, 0, newA, 0, c.length);
```







# LinkedList



1. 使用链表实现
2. 可向头部，尾部，任意位置添加元素

源码：

```java

public class LinkedList<E>
    extends AbstractSequentialList<E>
    implements List<E>, Deque<E>, Cloneable, java.io.Serializable
{
    transient int size = 0;
    transient Node<E> first;
    transient Node<E> last;
    public LinkedList() {
    }
	// 链表内部类
    private static class Node<E> {
        E item;
        Node<E> next;
        Node<E> prev;

        Node(Node<E> prev, E element, Node<E> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
    }

    // 向 末尾  添加
    void linkLast(E e) {
        final Node<E> l = last;
        final Node<E> newNode = new Node<>(l, e, null);
        last = newNode;
        if (l == null)
            first = newNode;
        else
            l.next = newNode;
        size++;
        modCount++;
    }
    //向 头部  添加
   private void linkFirst(E e) {
        final Node<E> f = first;
        final Node<E> newNode = new Node<>(null, e, f);
        first = newNode;
        if (f == null)
            last = newNode;
        else
            f.prev = newNode;
        size++;
        modCount++;
    }
    
    //向任意位置 添加元素
    void linkBefore(E e, Node<E> succ) {
        // assert succ != null;
        final Node<E> pred = succ.prev;
        final Node<E> newNode = new Node<>(pred, e, succ);
        succ.prev = newNode;
        if (pred == null)
            first = newNode;
        else
            pred.next = newNode;
        size++;
        modCount++;
    }
}

```



# Vector

1. 底层使用数组实现，默认容量是 10
2. 可以指定每次扩容的 大小， 如果不设置，  n*2
3. 线程安全

源代码：

```java
public class Vector<E>
    extends AbstractList<E>
    implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    protected Object[] elementData;
    public Vector() {
        this(10);
    }
    //指定 每次 扩容的大小
    protected int capacityIncrement;
    public Vector(int initialCapacity, int capacityIncrement) {
        super();
        if (initialCapacity < 0)
            throw new IllegalArgumentException("Illegal Capacity: "+
                                               initialCapacity);
        this.elementData = new Object[initialCapacity];
        this.capacityIncrement = capacityIncrement;
    }
	//最大可扩容量
    private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;

	//扩容的方法
    private void grow(int minCapacity) {
        int oldCapacity = elementData.length;
        
        //如果用户手动指定，则增加手动指定的大小  n + x
        // 如果没有指定 ， n * 2
        int newCapacity = oldCapacity + ((capacityIncrement > 0) ?
                                         capacityIncrement : oldCapacity);
        if (newCapacity - minCapacity < 0)
            newCapacity = minCapacity;
        if (newCapacity - MAX_ARRAY_SIZE > 0)
            newCapacity = hugeCapacity(minCapacity);
        
        elementData = Arrays.copyOf(elementData, newCapacity);
    }
    
    //线程安全的  添加方法
    public synchronized boolean add(E e) {
        modCount++;
        ensureCapacityHelper(elementCount + 1);
        elementData[elementCount++] = e;
        return true;
    }
    
    // ......其他方法
}
```



# HashSet、TreeSet

1. 底层都是使用  Map 实现
2. HashSet使用 Hash实现， TreeSet使用树实现

> JDK 8 之后， HashMap采用 红黑树实现，所以 HashSet 容量超过 8 时，也是用树存储

## HashSet源码



```java
public class HashSet<E>
    extends AbstractSet<E>
    implements Set<E>, Cloneable, java.io.Serializable
{
    static final long serialVersionUID = -5024744406713321676L;

    private transient HashMap<E,Object> map;
    // Dummy value to associate with an Object in the backing Map
    private static final Object PRESENT = new Object();
    public HashSet() {
    	//直接创建一个 HashMap
        map = new HashMap<>();
    }
    //add 的方法，
    // 元素 保存在 HashMap 的  key 字段 ，所以 Set 的元素不能重复
    public boolean add(E e) {
        return map.put(e, PRESENT)==null;
    }
    
    //迭代器 ， 只获取 所有的 key
    public Iterator<E> iterator() {
        return map.keySet().iterator();
    }

```



## TreeSet 源码

```java
public class TreeSet<E> extends AbstractSet<E>
    implements NavigableSet<E>, Cloneable, java.io.Serializable
{

    private transient NavigableMap<E,Object> m;

    private static final Object PRESENT = new Object();
    TreeSet(NavigableMap<E,Object> m) {
        this.m = m;
    }
    public TreeSet() {
    	//使用 TreeMap 实现， 只使用 key 保存元素
        this(new TreeMap<E,Object>());
    }
    
 }
```

