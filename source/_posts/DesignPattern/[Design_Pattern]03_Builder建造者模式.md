---
title: '[Design_Pattern]03_Builder建造者模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:03:00
---

Builder模式是一步一步创建一个复杂对象的创建型模式，它允许用户在不知道内部构建细节的情况下，可以更精细地控制对象的构造流程。
该模式是为了将构建复杂对象的过程和它的部件解耦，使得构建过程和部件的表示隔离开来。

# 使用内部Builder(简单)

![](images/)
1. 具体实现
```
public class SmartPhone {

    //手机编号
    private int ime;
    //手机型号
    private String name;
    //生产日期
    private Date date;

    /**
     * 该类实例只能 通过建造者生成
     *
     * @param builder 建造器
     */
    private SmartPhone(Builder builder) {
        this.ime = builder.ime;
        this.name = builder.name;
        this.date = builder.date;
    }

    public int getIme() {
        return ime;
    }

    public void setIme(int ime) {
        this.ime = ime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "SmartPhone{" +
                "ime=" + ime +
                ", name='" + name + '\'' +
                ", date=" + date +
                '}';
    }

    //内部建造者
    public static class Builder {
        private int ime;
        private String name;
        private Date date;

        public Builder setIme(int ime) {
            this.ime = ime;
            return this;
        }

        public Builder setName(String name) {
            this.name = name;
            return this;
        }

        public Builder setDate(Date date) {
            this.date = date;
            return this;
        }

        //提供build()方法，将自身作为参数传递
        public SmartPhone build() {
            return new SmartPhone(this);
        }
    }

}

```
2. 测试
```
public class Test {
    public static void main(String[] args) {
        // 可  链式调用
        SmartPhone mi6 = new SmartPhone.Builder()
                .setIme(1001)
                .setDate(new Date())
                .setName("MI6")
                .build();
        
        SmartPhone vivo_nex = new SmartPhone.Builder()
                .setIme(1002)
                .setName("VIVO Nex")
                .setDate(new Date())
                .build();
        
        System.out.println(mi6);
        System.out.println(vivo_nex);
    }
}
```

# 常规的Builder模式

1. 具体的产品
2. 一个抽象建造者，声明有哪些建造的方法、一个build() 方法，返回类型是产品类型，不管内部如何实现（技术主管）
3. 一个具体的建造者，实现具体的建造方法、build()方法 （码农）
4. 一个指挥者,指挥具体的建造者，获得相应的产品 （产品经理）

## 举个例子

1. 产品： 手机
2. 产品经理： 我要 MI8 和 VIVO X21
3. 技术主管： 用什么技术，怎么造
4. 码农： 照着技术埋头造

![img](/images/dp03_builder_01.png)
![img](/images/dp03_builder_00_01.png)

1. 产品
```
public class Phone {
    private String  name;
    private int  id;
    private String function;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFunction() {
        return function;
    }

    public void setFunction(String function) {
        this.function = function;
    }

    @Override
    public String toString() {
        return "Phone{" +
                "id=" + id +
                ", name='" + name  +
                ", function='" + function + '\'' +
                '}';
    }
}

```
2. 抽象建造者类（技术主管）
```
public abstract class PhoneBuilder {

    abstract PhoneBuilder setName(String name);

    abstract PhoneBuilder setId(int id);

    abstract PhoneBuilder setFunction(String  fuc);

    abstract Phone build();
}
```
3. 具体建造者类(码农)
```
public class ConcretePhoneBuilder extends PhoneBuilder {
    private Phone phone;
    private InnerProductCache cache  = new InnerProductCache();
    @Override
    PhoneBuilder setName(String name) {
        cache.setName(name);
        return this;
    }

    @Override
    PhoneBuilder setId(int id) {
        cache.setId(id);
        return this;
    }

    @Override
    PhoneBuilder setFunction(String func) {
        cache.setFunction(func);
        return this;
    }

    
    //真正上线
    @Override
    Phone build() {
        phone= new Phone();
        phone.setId(cache.getId());
        phone.setName(cache.getName());
        phone.setFunction(cache.getFunction());
        return phone;
    }
    

    //产品模型类（缓冲类）
    private class InnerProductCache{
        private String  name;
        private int  id;
        private String function;
        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }
        public int getId() {
            return id;
        }
        public void setId(int id) {
            this.id = id;
        }
        public String getFunction() {
            return function;
        }
        public void setFunction(String function) {
            this.function = function;
        }
    }

}

```
4. Director(产品经理)
```
public class Director {
    
    //喊一个码农过来做产品
    private PhoneBuilder builder = new ConcretePhoneBuilder();

    //告诉码农，我需要Mi8这个产品
    public Phone getMi8() {
        return builder.setName("Mi8").setId(4).setFunction("Play Games").build();
    }

    //再告诉码农，我要Vivo X21这个产品
    public Phone getVIVOX21(){
        return builder.setId(2).setName("VIVO X21").setFunction("so many").build();
    }
}
```
5. 测试

```
    public static void main(String[] args) {
        
        //上来一位产品经理
        Director director = new Director();
        
        //不管你怎么实现，反正我要的是产品
        Phone mi8 = director.getMi8();
        Phone vivox21 = director.getVIVOX21();
        
        System.out.println(mi8);
        System.out.println(vivox21);

    }
```
