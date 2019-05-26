---
title: '[Design_Pattern]09_Decorator装饰模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:09:00
---

# 专业表述

装饰模式 是 `结构模式` 的一种 ，在 `不改变` 原有类的结构的前提下，对其 `对象` 提供附加功能。

# 个人理解

1. 前提： `不改变` 类 原有结构
2. 实现： 对 `对象` 而不是 类 实现 `功能增强（装饰）`


# 具体实现

1. 抽象接口/基类： 规范行为（若是类，则规范其共有属性）
2. 具体实体类： 实现接口/继承基类
3. 抽象装饰类： 实现接口/继承基类，持有该接口/基类实例
4. 具体装饰类： 继承 `抽象装饰类`，写装饰逻辑


# 举2个例子

## Demo1

需求： 画圆和矩形，对其进行装饰，比如颜色，边框样式
结构图：

![](/images/dp09_decorator_01_00.png)

1. 接口
```java
/**
 * 形状， 统一接口
 * */
public interface Shape {

    //画形状的方法
    void draw();
}
```
2. 形状的具体实现类
```java
/**
 * 圆
 */
public class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Shape: Circle ");
    }
}


/**
 * 矩形
 */
public class Rectangle  implements Shape{
    @Override
    public void draw() {
        System.out.println("Shape: Rectangle");
    }
}
```
3. 抽象装饰类
```java

/**
 * 抽象装饰类
 */
public abstract class ShapeDecorator implements Shape {

    //需要被装饰的形状, 注意使用 protected 修饰
    protected Shape decoratedShape;

    public ShapeDecorator(Shape decoratedShape) {
        this.decoratedShape = decoratedShape;
    }

    /**
     * 直接委派为已经装饰过的对象
     */
    @Override
    public void draw() {
        decoratedShape.draw();
    }
}

```
4. 具体的装饰类
- 红颜色修饰类
```java
/**
 * 1. 红颜色修饰类
 */
public class ColorDecrator extends ShapeDecorator{
    public ColorDecrator(Shape decoratedShape) {
        super(decoratedShape);
    }

    @Override
    public void draw() {
        decoratedShape.draw();
        //进行功能装饰
        setColor2Red(decoratedShape);

    }
    
    /**
     * 增前的功能
     * @param decoratedShape 需要修饰的对象
     */
    public void setColor2Red(Shape decoratedShape){
        System.out.println("Color: Red");
    }
}
```
- 边框修饰类
```java
/**
 * 2. 边框修饰类
 */
public class BorderDecorator extends ShapeDecorator {
    public BorderDecorator(Shape decoratedShape) {
        super(decoratedShape);
    }

    //对原有的功能进行增强
    @Override
    public void draw() {
        decoratedShape.draw();
        setBorder2Dash(decoratedShape);
    }


    //增强的功能
    public void setBorder2Dash(Shape decoratedShape){
        System.out.println("Border: Dash");
    }


}
```
5. 测试类
```java
public class TestDecorator {
    public static void main(String[] args) {

        Shape   redCircle  = new ColorDecrator(new Circle());
        redCircle.draw();

        System.out.println();

        Shape  rec = new BorderDecorator(new Rectangle());
        rec.draw();
        
        
        /*运行结果
        
        Shape: Circle
        Color: Red
        
        Shape: Rectangle
        Border: Dash
        
        */
    }
}

```

### 注意点

1. 无论是实体类还是装饰器类，都要 `实现统一接口`
2. 只能对 `对象实例` 进行装饰
3. `抽象装饰类` 中持有的 `实例` 修饰符为 `protected`


## Demo2

需求： 饮料有 奶茶、奶昔， 配料有 绿豆、珍珠，模拟买饮料
结构图：
![](/images/dp09_decorator_02_00.png)

1. 抽象饮料基类
```java
/**
 * 抽象饮料类
 */
public abstract class Beverage {
    //饮料的名
    String  name="Unknown Beverage";
    //饮料的价格
    abstract double price();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

```
2. 具体饮料类
- 奶昔
```java
/**
 * 奶昔类
 */
public class MikeShake extends Beverage {
    public MikeShake() {
        name = "MikeShake";
    }

    @Override
    double price() {
        return 4.5;
    }
}

```
- 奶茶
```java
/**
 * 奶茶
 */
public class MikeTea extends Beverage {

    public MikeTea() {
        name = "MikeTea";
    }

    @Override
    public double price() {
        return 4.0;
    }
}

```
3. 辅料基类
```java
/**
 * 辅料基类
 */
public abstract class CondimentDecorator  extends Beverage{
    protected Beverage beverage;
    public CondimentDecorator(Beverage beverage) {
        this.beverage = beverage;
    }
}
```
4. 辅料实现类
- 绿豆类
```java
/**
 * 绿豆类
 */
public class Mung  extends CondimentDecorator{

    public Mung(Beverage beverage) {
        super(beverage);
    }
    
    @Override
    public String getName() {
        return beverage.getName()+",Mung";
    }

    @Override
    double price() {
        return beverage.price()+1.5 ;
    }
}

```
- 珍珠类
```java
/**
 * 珍珠类
 */
public class Pearl  extends CondimentDecorator{


    public Pearl(Beverage beverage) {
        super(beverage);
    }

    @Override
    public String getName() {
        return beverage.getName()+",Pearl";
    }

    @Override
    double price() {
        return beverage.price()+2.0;
    }
}
```
5. 测试类
```java
public class TestDecorator2 {
    public static void main(String[] args) {


        Beverage mikeTea = new MikeTea();
        mikeTea = new Pearl(mikeTea); //加珍珠
        mikeTea= new Mung(mikeTea);  //加绿豆
        System.out.println(mikeTea.getName()+"---"+mikeTea.price());


        Beverage mung = new Mung(new Pearl(new MikeShake()));
        System.out.println(mung.getName()+"---"+mung.price());

        //MikeTea,Pearl,Mung---7.5
        //MikeShake,Pearl,Mung---8.0
    }
}

```
