---
title: '[Design_Pattern]17_Observer观察者模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:17:00
---

观察者模式 是 `行为模式` 的一种 ， 最最简单的理解就是： 当一个对象更新时，自动通知依赖它的所有对象。
比如： 微信公众号的消息推送，微信公众号更新文章时，它的订阅者（观察者）会自动收到更新

# 角色划分

- Subject:  被订阅的会更新的对象
- Observer：  依赖/跟随 Subject 的订阅者/观察者


# 实例讲解

## Demo1

Subject `1 --> N` Observer, 例如： 微信推送了版本更新信息，已经注册的用户可以收到推送！

![](/images/dp17_observer_demo01_00.png)

### 代码

- 微信服务器
```java
public class Subject {

    private String message;

    private List<Observer> observers;

    public Subject() {
        this.observers = new ArrayList<>();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
        notifyAllObservers();
    }

    /**
     * 当用户订阅时，将用户添加进订阅者集合
     * @param observer 用户
     */
    public void attach(Observer observer) {
        observers.add(observer);
        System.out.println(observer.getName() + " 注册了新帐号 !");
    }

    /**
     * 通知所有用户
     */
    public void notifyAllObservers() {
        for (Observer observer : observers) {
            observer.update();
        }
    }

    /**
     * 当用户不再订阅时
     * @param observer 用户
     */
    public void unAttach(Observer observer) {
        if (observers != null) {
            observers.remove(observer);
        }
        System.out.println("用户： "+observer.getName()+" 注销了帐号 ！");
    }
}
```
- 用户
```java
public  class Observer {

    private String name;

    private Subject subject;

    public Observer(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    /**
     * 添加新的订阅号
     * @param subject 订阅的项目
     */
    public void setSubject(Subject subject) {
        this.subject = subject;
        subject.attach(this);
    }


    /**
     * 不再订阅
     */
    public void  removeSubject(){
        subject.unAttach(this);
        subject=null;
    }

    public void update() {
        System.out.println(name+" 收到推送 :  " + subject.getMessage());
    }

}
```
- 测试类
```java
public class Main {
    public static void main(String[] args) {

        Subject subject = new Subject();

        Observer zhangsan = new Observer("zhangsan");
        Observer lisi = new Observer("lisi");
        Observer wangwu = new Observer("wangwu");

        zhangsan.setSubject(subject);
        lisi.setSubject(subject);
        wangwu.setSubject(subject);
        System.out.println();

        subject.setMessage("微信新版本 6.10  发布 ！ ");

        System.out.println();
        lisi.removeSubject();

        subject.setMessage("微信新版本 7.02  发布 ！");
        
        /*
        
        zhangsan 注册了新帐号 !
        lisi 注册了新帐号 !
        wangwu 注册了新帐号 !

        zhangsan 收到推送 :  微信新版本 6.10  发布 ！ 
        lisi 收到推送 :  微信新版本 6.10  发布 ！ 
        wangwu 收到推送 :  微信新版本 6.10  发布 ！ 
        
        用户： lisi 注销了帐号 ！
        zhangsan 收到推送 :  微信新版本 7.02  发布 ！
        wangwu 收到推送 :  微信新版本 7.02  发布 ！
        
       
        * */

    }
}
```

## Demo02

订阅者 `N --> N` 话题.
![](/images/dp17_observer_demo02_00.png)

### 代码



- 普通订阅者
```java
public class NormalUser {

    private String name;
    private List<Item> items;


    public NormalUser(String name) {
        items = new ArrayList<>();
        this.name = name;
    }

    public String getName() {
        return name;
    }

    /**
     * 订阅
     * @param item 订阅的话题
     */
    public void follw(Item item) {
        items.add(item);
        item.attach(this);
    }

    public void unFollw(Item item) {
        if (items != null) {
            items.remove(item);
        }
        item.unAttach(this);
    }

    /**
     * 更新话题
     * @param item 更新的话题
     */
    public void update(Item item){
        System.out.println(name+" Get Message "+item.getMessage()+" From "+item.getClass().getSimpleName());
    }
}


```
- 抽象话题基类
```java
public abstract class Item {

    protected  String  message;

    protected List<NormalUser> users;

    /**
     * 添加新的用户
     * @param user 用户
     */
    abstract void attach(NormalUser user);
    abstract void unAttach(NormalUser user);

    /**
     * 通知所有用户
     */
    abstract void notifyAllUser();

    public String getMessage() {
        return message;
    }
}
```
- 具体实现类
```java

/* Java 话题 */
public class JavaItem extends Item {
    public JavaItem() {
        users = new ArrayList<>();
    }

    @Override
    void attach(NormalUser user) {
        users.add(user);
    }

    @Override
    void unAttach(NormalUser user) {
        if (users != null) {
            users.remove(user);
        }
    }

    @Override
    void notifyAllUser() {
        for (NormalUser user : users) {
            user.update(this);
        }
    }

    /**
     * 推送新消息
     * @param message 消息
     */
    public void postNewMessage(String message) {
        this.message =  message;
        //马上通知所有用户
        notifyAllUser();
    }
}

/* Python 话题*/
public class PythonItem extends Item {

    public PythonItem() {
        users = new ArrayList<>();
    }

    @Override
    void attach(NormalUser user) {
        users.add(user);
    }

    @Override
    void unAttach(NormalUser user) {
        if (users != null) {
            users.remove(user);
        }
    }

    @Override
    void notifyAllUser() {
        for (NormalUser user : users) {
            user.update(this);
        }
    }

    public void postNewMessage(String message) {
        this.message = message;
        notifyAllUser();
    }
}
```
- 测试类
```java
public class Main {
    public static void main(String[] args) {

        JavaItem javaItem = new JavaItem();
        PythonItem pythonItem = new PythonItem();


        NormalUser u1 = new NormalUser("u1");
        NormalUser u2 = new NormalUser("u2");
        NormalUser u3 = new NormalUser("u3");
        NormalUser u4 = new NormalUser("u4");


        u1.follw(javaItem);
        u1.follw(pythonItem);
        u2.follw(pythonItem);
        u3.follw(javaItem);
        u4.follw(javaItem);


        javaItem.postNewMessage("java 8 have released");
        pythonItem.postNewMessage("python 4.0 released");


        System.out.println();

        u1.unFollw(pythonItem);


        javaItem.postNewMessage("java 10 have released");
        pythonItem.postNewMessage("python 5.0 released");

    }
}

/*

u1 Get Message java 8 have released From JavaItem
u3 Get Message java 8 have released From JavaItem
u4 Get Message java 8 have released From JavaItem
u1 Get Message python 4.0 released From PythonItem
u2 Get Message python 4.0 released From PythonItem

u1 Get Message java 10 have released From JavaItem
u3 Get Message java 10 have released From JavaItem
u4 Get Message java 10 have released From JavaItem
u2 Get Message python 5.0 released From PythonItem

 */
```