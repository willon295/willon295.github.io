---
title: '[Java]JDK8中HashMap存储结构[修正版]'
tag: Java
category: Java
date: 2018-07-29 00:00:00
---



具体有两种实现：

1.  数组 + 链表
2. 数组 + 红黑树

## 关键词定义、解释

1. `size()` : Map 中 元素的总数
2. `threshold` : 阈值
3. `capcity` : 容量
4. `loadFactor` : 加载因子
5. `Node<K,V>` : 链表，可以 大于 8
6. `TreeNode<K,V>` : 树



## 数组+链表存储结构

map刚初始化时，采用本结构进行存储。

### 关键属性

```java
    static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; //默认 capcity = 16，之后每次 * 2
    static final float DEFAULT_LOAD_FACTOR = 0.75f;  // 默认加载 0.75
    static final int TREEIFY_THRESHOLD = 8;         // 树化 或者 扩容的 阈值 
    static final int MIN_TREEIFY_CAPACITY = 64;    // 树化的 capcity 最低值
 int threshold; // map 的属性， 初始化时为 16 × 0.75 = 12， 之后每次 × 2
```



###  数组 

```java
    //定义一个  链表 数组
    transient Node<K,V>[] table;
```



### 链表

```java
/**
 *  链表  结构
 */
static class Node<K,V> implements Map.Entry<K,V> {
        final int hash;    //用来定位数组索引位置
        final K key;
        V value;
        Node<K,V> next;   //链表的下一个node
        Node(int hash, K key, V value, Node<K,V> next) { ... }
        public final K getKey(){ ... }
        public final V getValue() { ... }
        public final String toString() { ... }
        public final int hashCode() { ... }
        public final V setValue(V newValue) { ... }
        public final boolean equals(Object o) { ... }
}
```



### 什么时候扩容

```java
((size()  / loadFactor) > threshold ) 
|| (table[i].length > TREEIFY_THRESHOLD && capcity < MIN_TREEIFY_CAPACITY ) 
```

> 原来 链表中的元素,   重新 `hash` 存放进  `新的数组` 

## put() 方法

```java
    public V put(K key, V value) {
    	//对 key 求 hash值
        return putVal(hash(key), key, value, false, true);
    }
    
    /**
     * hash 具体算法
     */
   static final int hash(Object key) {
        int h;
      // h = key.hashCode() 为第一步 取hashCode值
      // h ^ (h >>> 16)  为第二步 高位参与运算
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }

	/**
	 * 具体存储过程
	 */
    final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
        Node<K,V>[] tab; Node<K,V> p; int n, i;
        //如果数组长度为null/链表长度为0，先扩容
        if ((tab = table) == null || (n = tab.length) == 0)
            n = (tab = resize()).length;
        if ((p = tab[i = (n - 1) & hash]) == null)
            tab[i] = newNode(hash, key, value, null);
        else {
            Node<K,V> e; K k;
            if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k))))
                e = p;
            else if (p instanceof TreeNode)
                //如果是树节点，向树内存放元素
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            else {
                for (int binCount = 0; ; ++binCount) {
                    if ((e = p.next) == null) {
                        //向链表中添加元素
                        p.next = newNode(hash, key, value, null);
                        if (binCount >= TREEIFY_THRESHOLD - 1) 
                            //如果大于 8 ，具体扩容还是树化分情况  ----> #treeifyBin()
                            // 如果是 扩容， 那么只要遍历到 链表长度大于 8 的， 扩容
                            treeifyBin(tab, hash);
                        break;
                    }
                    if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k))))
                        break;
                    p = e;
                }
            }
            if (e != null) { // existing mapping for key
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null)
                    e.value = value;
                afterNodeAccess(e);
                return oldValue;
            }
        }
        ++modCount;
        if (++size > threshold)
            resize();
        afterNodeInsertion(evict);
        return null;
    }
    
   //  --->  #treeifyBin : 具体树化还是  扩容由此方法决定
    final void treeifyBin(Node<K,V>[] tab, int hash) {
        int n, index; Node<K,V> e;
        //如果 capcity  < 64 ,扩容
        if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
            resize(); // threshold、capcity 都 × 2
        //如果 capcity > 64 树化
        else if ((e = tab[index = (n - 1) & hash]) != null) {
            TreeNode<K,V> hd = null, tl = null;
            do {
                TreeNode<K,V> p = replacementTreeNode(e, null);
                if (tl == null)
                    hd = p;
                else {
                    p.prev = tl;
                    tl.next = p;
                }
                tl = p;
            } while ((e = e.next) != null);
            if ((tab[index] = hd) != null)
                hd.treeify(tab);
        }
    }


```



## 数组 + 红黑树存储



## 关键属性

```java
    static final int TREEIFY_THRESHOLD = 8;  //树化的链表最小长度
    static final int UNTREEIFY_THRESHOLD = 6; //转成 非树化 的最小因子
    static final int MIN_TREEIFY_CAPACITY = 64; // 树化的最小容量
```



## 树化及非树化

1. 容量 大于 `64`  时，树化
2. 阈值小于 6 时 ，转化成 ` 数组 +  链表` 



### 树的定义

```java
 static final class TreeNode<K,V> extends LinkedHashMap.Entry<K,V> {
        TreeNode<K,V> parent;  // red-black tree links
        TreeNode<K,V> left;
        TreeNode<K,V> right;
        TreeNode<K,V> prev;    // needed to unlink next upon deletion
        boolean red;  //是否为 红色
```



### 转换成树的方法



```java

    /**将原来的数据转存进 树 内
     * Replaces all linked nodes in bin at index for given hash unless
     * table is too small, in which case resizes instead.
     */
    static final int MIN_TREEIFY_CAPACITY = 64;
    final void treeifyBin(Node<K,V>[] tab, int hash) {
        int n, index; Node<K,V> e;
        
        //如果容量小于 64 ,优先扩容，而不是树化
        if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY){
            resize();
        else if ((e = tab[index = (n - 1) & hash]) != null) {
            TreeNode<K,V> hd = null, tl = null;
            do {
                 //将元素存进树内
                TreeNode<K,V> p = replacementTreeNode(e, null);
                if (tl == null)
                    hd = p;
                else {
                    p.prev = tl;
                    tl.next = p;
                }
                tl = p;
            } while ((e = e.next) != null);
            if ((tab[index] = hd) != null)
                hd.treeify(tab);
        }
    }
```





### 存放元素的方法



```java
        /**
         * Tree version of putVal.
         */
        final TreeNode<K,V> putTreeVal(HashMap<K,V> map, Node<K,V>[] tab,
                                       int h, K k, V v) {
            Class<?> kc = null;
            boolean searched = false;
            TreeNode<K,V> root = (parent != null) ? root() : this;
            //每次添加元素，从根结点开始遍历
            for (TreeNode<K,V> p = root;;) {
                int dir, ph; K pk;
                //对比 hash 
                if ((ph = p.hash) > h)
                    dir = -1;
                else if (ph < h)
                    dir = 1;
                else if ((pk = p.key) == k || (k != null && k.equals(pk)))
                    //如果hash，key相同，返回当前 节点 
                    return p;
                else if ((kc == null &&
                          (kc = comparableClassFor(k)) == null) ||
                         (dir = compareComparables(kc, k, pk)) == 0) {
                    //没找到，但是hash相同，去孩子节点找
                    if (!searched) {
                        TreeNode<K,V> q, ch;
                        searched = true;
                        if (((ch = p.left) != null &&
                             (q = ch.find(h, k, kc)) != null) ||
                            ((ch = p.right) != null &&
                             (q = ch.find(h, k, kc)) != null))
                            return q;
                    }
                    dir = tieBreakOrder(k, pk);
                }

                TreeNode<K,V> xp = p;
                if ((p = (dir <= 0) ? p.left : p.right) == null) {
                    Node<K,V> xpn = xp.next;
                    TreeNode<K,V> x = map.newTreeNode(h, k, v, xpn);
                    if (dir <= 0)
                        xp.left = x;
                    else
                        xp.right = x;
                    xp.next = x;
                    x.parent = x.prev = xp;
                    if (xpn != null)
                        ((TreeNode<K,V>)xpn).prev = x;
                    //平衡调整
                    moveRootToFront(tab, balanceInsertion(root, x));
                    return null;
                }
            }
        }

```

