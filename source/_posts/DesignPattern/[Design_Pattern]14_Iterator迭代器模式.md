---
title: '[Design_Pattern]14_Iterator迭代器模式'
category: 设计模式
tag: 设计模式
date: 2017-10-11 00:14:00
---

迭代器模式属于 `行为模式` 的一种，这种模式用于顺序的访问集合对象的元素，不需要知道集合对象的底层实现和表示

# 使用场景

不同的方式遍历整个结合对象

# 大概流程

1. 定义 Iterator接口，定义 `hasNext()`  、 `next()`
2. 定义 Container接口，定义 `getIterator()` 返回 Iterator实例
3. 遍历集合时先获取迭代器，再获取其中元素

# 举个例子

一个集合里面存了水果的名字，把这个集合改造成可迭代的

![图片](/images/dp14_iterator_00.png)


1. Iterator、Container接口
```
/**
 * 迭代器接口
 */
public interface Iterator {
    boolean hasNext();
    Object  next();
}


/**
 *  容器接口
 */
public interface Container {
    Iterator getIterator();
}

```
2. 水果集合类
```
/**
 * 一个水果的容器
 */
public class FruitCollection  implements Container{

    private String [] fruits={"Apple","Banana","Orange","Watermelon"};

    @Override
    public Iterator getIterator() {
        return new FruitIterator();
    }

    /**
     * 内部类，用于返回迭代器
     */
    private class FruitIterator implements Iterator{

        int index;

        @Override
        public boolean hasNext() {
            return index < fruits.length;
        }

        @Override
        public Object next() {
            if (this.hasNext()){
                return fruits[index++];
            }
            return null;
        }
    }
}

```
3. 测试类
```
public class Main {

    public static void main(String[] args) {

        FruitCollection fruitCollection = new FruitCollection();
        Iterator iterator = fruitCollection.getIterator();

        while (iterator.hasNext()){
            System.out.println(iterator.next());
        }
    }

    /*运行结果
    Apple
    Banana
    Orange
    Watermelon

    */
}

```