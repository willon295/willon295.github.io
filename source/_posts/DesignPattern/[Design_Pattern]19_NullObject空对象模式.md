---
title: '[Design_Pattern]19_NullObject空对象模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:19:00
---

空对象模式是 `行为模式` 的一种， 一个自定义的空对象取代 NULL 对象，有时候可以避免空指针异常。

## 举例说明

根据 `名称` 创建 `具体对象` 时，如果该名称不存在则会返回 `NULL` ，对NULL对象进行操作，会产生空指针异常。


## 实例

通过编码工厂获取编码实例，如果不存在，返回一个自定义的空编码对象

![](/images/dp19_nullObject_00.png)


- 抽象基类
```java
public abstract class AbstractEncType {
    protected String name;
    abstract  boolean isNil();
    abstract String getName();
}

```
- 具体实现类
```java
/**
 * GBK类
 */
public class EncGBK  extends AbstractEncType {
    public EncGBK(String name) {
        this.name=name;
    }

    @Override
    boolean isNil() {
        return false;
    }

    @Override
    String getName() {
        return "GBK";
    }
}


/**
 * UTF8类
 */
public class EncUTF8  extends AbstractEncType {


    public EncUTF8(String name) {
        this.name=name;
    }

    @Override
    boolean isNil() {
        return false;
    }

    @Override
    String getName() {
        return "UTF8";
    }
}

/**
 * 自定义空类型
 */
public class EncNULL extends AbstractEncType {
    @Override
    boolean isNil() {
        return true;
    }
    @Override
    String getName() {
        return "Not available ";
    }
}

```
- 工厂类
```java
public class EncTypeFactory {

    private static final String UTF8 = "UTF8";
    private static final String GBK = "GBK";

    //根据传入的名字 创建相应的实例
    public static AbstractEncType get(String name) {
        if (Objects.equals(name, UTF8)) {
            return new EncUTF8(UTF8);
        } else if (Objects.equals(name, GBK)) {
            return new EncGBK(GBK);
        }
        //不存在则返回一个自定义空类型的实例
        return new EncNULL();

    }
}
```
- 测试类
```java
public class Main {
    public static void main(String[] args) {

        AbstractEncType utf8 = EncTypeFactory.get("UTF8");
        AbstractEncType gbk = EncTypeFactory.get("GBK");
        AbstractEncType utf16 = EncTypeFactory.get("UTF16");
        AbstractEncType utf32 = EncTypeFactory.get("UTF16");

        System.out.println(utf8.getName()+"__"+utf8.isNil());
        System.out.println(gbk.getName()+"__"+gbk.isNil());
        System.out.println(utf16.getName()+"__"+utf16.isNil());
        System.out.println(utf32.getName()+"__"+utf32.isNil());

    }
}

/*

UTF8__false
GBK__false
Not available __true
Not available __true

 */
```