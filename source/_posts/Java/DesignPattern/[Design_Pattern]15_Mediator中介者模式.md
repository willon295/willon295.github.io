---
title: '[Design_Pattern]15_Mediator中介者模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:15:00
---

中介者模式是 `行为模式` 的一种，它使得两个对象都独立与中介者交互，从而实现两个对象之间的交互行为解耦。

比如： MVC模式 中的 控制器(Controller) ,房产中介，WTO。



# 举个例子

QQ 聊天，QQ就是一个中介者

1. QQUser
```java
public class QQUser {

    private String name;

    public QQUser(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /**
     * 发送消息
     * @param msg 消息
     */
    public void sendMessage(String msg) {
        QQ.showMessage(this, msg);
    }
}
```
2. QQ
```java
public class QQ {

    public static void  showMessage(QQUser user,String  msg){

        String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
        System.out.println(user.getName()+"\t"+date);
        System.out.println(msg);

    }
}

```
3. 测试类
```java
public class Main {
    public static void main(String[] args) throws Exception {

        QQUser mike = new QQUser("Mike");
        mike.sendMessage("Good morning !");

        Thread.sleep(5000L);

        QQUser lucy = new QQUser("Lucy");
        lucy.sendMessage("Morning");
        
        /*
          Mike	2017-10-11 07:31:34
          Good morning !
          Lucy	2017-10-11 07:31:39
          Morning
        * */
    }
}


```