---
title: '[Java]Clone详解'
category: Java
tag: Java
date: 2018-08-11 00:00:00
---

# 调用 Object clone

如果要实现克隆，， 必须注意一下几点

1. `clone()` 是 `Object` 的 方法，且访问权限是 `protected` 
```java
protected native Object clone() throws CloneNotSupportedException;
``` 


一个简单错误的例子： 

```java
public class Street {

    private String name;
    private Integer code;
	// get...set..
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```
1. 其他包之外无权访问 clone 方法
2. 有权访问也会抛出 `CloneNotSupportedException` 异常


所以， 一个类如果想通过`Object.clone()` 方法 实现 clone 的功能， 
1. 必须实现 `Cloneable` 
2. 重写 `clone()` 方法

正确的例子
```java
public class Street implements Cloneable {

    private String name;
    private Integer code;
    
	// get...set..
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

## 深拷贝_浅拷贝	

### 浅拷贝例子

1. 问题来源
对象的属性 不是基本数据类型，拷贝的 `只是引用` 

举个例子：

**人物** 包含 **地址** ， **地址** 包含 **街道**， 三者都是 实体类

```java
/**
 *人物类
 */
public class Person implements Cloneable {
    private Integer age;
    private String name;
    private Address address;  //地址
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}


/**
 *Address 地址信息类
 */
public class Address implements Cloneable {
    private String province;
    private String city;
    private Street street;  // 街道

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
package cn.willon.clone;

/**
 *Street 街道
 */
public class Street implements Cloneable {
    private String name;
    private Integer code;
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

```

### 浅拷贝测试结果

```java
    @Test
    public void test() throws CloneNotSupportedException {

        Street street = new Street("南京路", 888);
        Address address = new Address("江苏省", "南京市", street);
        Person zhangsan = new Person(23, "张三", address);
		// clone 一份实例
        Person lisi = (Person) zhangsan.clone();

		// 输出实例的属性，对比是否相同
        System.out.println(zhangsan == lisi);
        System.out.println(zhangsan.getAddress() == lisi.getAddress());
        System.out.println(zhangsan.getAddress().getStreet() == lisi.getAddress().getStreet());
    }
```

运行结果是
```
false
true
true
```

**说明** zhangsan、lisi 的住址街道等信息都是 `同一个` 实例， 并没有真正的拷贝

### 深拷贝

将所依赖的实体的 clone 方法内， 将 依赖的对象也重新 `clone` 一份， 如

1. clone 住址时，顺便 clone 一份他的 street
2. clone Person，顺便 clone 一份 他的 address 

```java
public class Address implements Cloneable {
    private String province;
    private String city;
    private Street street; 
	// 住址深度拷贝
    @Override
    protected Object clone() throws CloneNotSupportedException {
        Address address = (Address) super.clone();
        address.street = (Street) street.clone();
        return address;
    }
}



public class Person implements Cloneable {
    private Integer age;
    private String name;
    private Address address;
	// Person的深度拷贝
    @Override
    protected Object clone() throws CloneNotSupportedException {
        Person person = (Person) super.clone();
        person.address = (Address) address.clone();
        return person;
    }
}

```

### 深度拷贝测试结果


```java
    @Test
    public void test() throws CloneNotSupportedException {

        Street street = new Street("南京路", 888);
        Address address = new Address("江苏省", "南京市", street);
        Person zhangsan = new Person(23, "张三", address);
		// clone 一份实例
        Person lisi = (Person) zhangsan.clone();

		// 输出实例的属性，对比是否相同
        System.out.println(zhangsan == lisi);
        System.out.println(zhangsan.getAddress() == lisi.getAddress());
        System.out.println(zhangsan.getAddress().getStreet() == lisi.getAddress().getStreet());
    }
```

运行结果是
```
false
false
false
```

# 通过序列化实现深度拷贝

通过  `先序列化` --->  `再反序列化` ， 可以生成一个新的克隆实例对象，且是深度拷贝，不会存在共享 引用的问题
1. 被序列化的实体类必须实现 `Serializable` 接口
2. 不用实现 Cloneable 接口，不需要 clone 方法

举个例子，先自定义一个克隆的工具类

```java
/**
 * Created By willon
 *
 * @author willon
 * @version 1.0
 */
public class CloneUtil {
    public static <T extends Serializable> T clone(T t) throws IOException, ClassNotFoundException {

        // 先将对象序列化  到 字节缓存 中
        ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(byteOut);
        oos.writeObject(t);
        oos.close();
        
		// 再从 字节缓存 中 反序列化出 对象
        ByteArrayInputStream byteIn = new ByteArrayInputStream(byteOut.toByteArray());
        ObjectInputStream ois = new ObjectInputStream(byteIn);
        ois.close();

        return (T) ois.readObject();
    }
}
```

## 测试结果


```java
    @Test
    public void test() throws CloneNotSupportedException, IOException, ClassNotFoundException {

        Street street = new Street("南京路", 888);
        Address address = new Address("江苏省", "南京市", street);
        Person zhangsan = new Person(23, "张三", address);

		// 使用序列化方式克隆对象
        Person lisi = CloneUtil.clone(zhangsan);

        System.out.println(zhangsan == lisi);
        System.out.println(zhangsan.getAddress() == lisi.getAddress());
        System.out.println(zhangsan.getAddress().getStreet() == lisi.getAddress().getStreet());
    }
```

结果

```
false
false
false
```