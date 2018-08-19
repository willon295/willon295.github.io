---
title: '[Design_Pattern]22_Visitor访问者模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:22:00
---

访问者模式是 `行为模式` 的一种，它的使用前提就是 `数据结构相对稳定`，被访问的元素几乎不会增加/减少。
该模式涉及几个组件

1. Element元素(个数相对稳定，不会发生增加/减少)
2. ObjectStructure结构(提供元素访问的中间件)
3. Visitor访问者（通过中间件访问元素，不同的访问者对元素操作不同）


# 举个例子

一个公司的财务账本(中间件/结构体)， 账本中的元素 `收入 | 支出` ，不会改变，只有者两种元素
，而访问者 老板 只看账本的 收入支出总额，会计则会看每一条明细，符合访问者模式的前提。


## 相关描述

|组件|描述|
|---|---|
|Bill|接口，相当于Element ，定义一个参数为 Visitor 的 accept()方法|
|Visitor|接口，访问者，定义N个重载的方法，参数为具体Element|
|IncomeBill|收入，具体元素|
|ConsumeBill|支出，具体元素|
|Boss|老板，具体访问者。访问方式：只看收入支出总额|
|CPA|会计，具体访问者。访问方式： 看明细|
|BillBook|账本，相当于ObjectStructure,用于容纳N个Element|


![](/images/dp22_visitor_00.png)

## 上代码

- Bill接口
```java

/**
 * Element 接口
 */
public interface Bill {
    //接收一个访问者
    void accept(Visitor visitor);
}
```
- Visitor接口
```java
/**
 * 访问者
 */
public interface Visitor {

    //查看收入
    void view(IncomeBill in);

    //查看支出
    void view(ConsumeBill out);
}
```
- 具体Bill
```java
/**
 * 收入
 */
public class IncomeBill  implements Bill{

    private String  item;
    private double money;


    public IncomeBill(String item, double money) {
        this.item = item;
        this.money = money;
    }

    /**
     * 让访问者访问
     * @param visitor 访问者
     */
    @Override
    public void accept(Visitor visitor) {
        visitor.view(this);
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }
}


/**
 * 支出
 */
public class ConsumeBill implements Bill {

    //收入条目
    private String item;

    //金额
    private double money;

    public ConsumeBill(String item, double money) {
        this.item = item;
        this.money = money;
    }

    /**
     * 让查看者访问
     * @param visitor 访问者
     */
    @Override
    public void accept(Visitor visitor) {
        visitor.view(this);
    }


    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }
}
```
- 具体访问者
```java

/**
 * Boss
 */
public class Boss implements Visitor {


    //只看总收入、支出
    private double totalIncome;
    private double totalConsume;


    @Override
    public void view(IncomeBill in) {

        totalIncome += in.getMoney();
    }

    @Override
    public void view(ConsumeBill out) {

        totalConsume += out.getMoney();
    }

    public double getTotalIncome() {
        return totalIncome;
    }

    public double getTotalConsume() {
        return totalConsume;
    }


}

/**
 * 会计
 */
public class CPA  implements Visitor{

    @Override
    public void view(IncomeBill in) {

        System.out.println("CPA: 收入: "+in.getItem()+"__"+in.getMoney());
    }

    @Override
    public void view(ConsumeBill out) {
        if (out.getItem().equals("salary")){
            System.out.println("工资支出： 这个人缴税没?");
        }
        System.out.println("CPA: 财务支出： "+out.getItem()+"__"+out.getMoney());

    }
}


```
- 测试类
```java

public class Main {

    public static void main(String[] args) {
        BillBook book = new BillBook();


       book.addBill( new IncomeBill("卖产品",10000));
       book.addBill(new IncomeBill("卖广告位",20000));
       book.addBill(new ConsumeBill("salary",5000));
       book.addBill(new ConsumeBill("材料",13000));


        Boss boss = new Boss();
        CPA cpa = new CPA();

        book.show(boss); //老板看
        book.show(cpa); // 会计看

        double totalConsume = boss.getTotalConsume();
        double totalIncome = boss.getTotalIncome();
        System.out.println("Boss: 收入 "+totalIncome+"_支出 "+totalConsume);
        
    }

}
/*
CPA: 收入: 卖产品__10000.0
CPA: 收入: 卖广告位__20000.0
工资支出： 这个人缴税没?
CPA: 财务支出： salary__5000.0
CPA: 财务支出： 材料__13000.0
Boss: 收入 30000.0_支出 18000.0

 */
```

