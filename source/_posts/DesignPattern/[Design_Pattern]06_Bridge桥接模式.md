---
title: '[Design_Pattern]06_Bridge桥接模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:06:00
---


# 专业表述


`桥接模式`  是 `结构模式` 的一种，用于抽象部分和实现部分的分离。


# 个人理解

1. 当一件事情是 `多个维度` 、  `同时变化` (即 `NP`) ,通常的实现需要 `N*P`种实现类满足所有需求
举个例子：
- 有7种颜色、大小中3种型号的 笔
- `每种颜色` 就各有 `3 种型号`
- 需要 `7×3=21` 个产品实现
2. 桥接在此该场景的应用就是
- 造 大中小 3支 可换笔芯的笔
- 造 7 种颜色的笔芯
- 共需要 `3+7=10` 种实现类
- 使用时，动态搭配笔和笔芯，达到想要的效果
3. 如何桥接？
- 在一个维度的 `父类` 中持有一个 `另一维度的实例`
- 不同的维度处理各自的逻辑

# 举个例子

发送消息
1. 消息类型： 普通消息， 加急消息，特急消息
2. 发送方式： 邮件，短信
3. 关系图
![图1](/images/dp06_bridge_00.png)


## 代码

1. 不同发送形式消息的实现
- 通用接口
```
/**
 * 用于规范
 * 不同形式的消息 的发送接口 (短信，邮件，微信....)
 * */

public interface Messager {

    /**
     * 发送消息方法
     * @param content 消息内容
     * @param toUser 接收人
     */
    void send(String  content , String  toUser);
}

```
- 短信
```
/**
 * 短信
 */
public class MessageSMS implements Messager {

    @Override
    public void send(String content, String toUser) {
        System.out.println("短信  方式，发送《"+content+"》给 《"+toUser+"》");
    }
}
```
- 邮件
```
/**
 * 邮件 消息
 */
public class MessageEmail implements Messager {
    @Override
    public void send(String content, String toUser) {
        System.out.println("邮件 方式，发送《"+content+"》给 《"+toUser+"》");
    }
}

```
2. 不同处理级别的消息
- 抽象类
```

/**
 * 抽象消息类，所有消息类型的父类（普通消息，加急消息，特急消息...）
 */
public  abstract class AbstractMessage {


    /**
     * 持有实现部分的一个对象*/
    Messager messager;
    public AbstractMessage(Messager messager) {
        this.messager = messager;
    }

    /**
     * 委派给实现部分发送消息
     * @param content 消息内容
     * @param toUser 接收者
     * */
    void sendMessage(String  content,String toUser){
        this.messager.send(content,toUser);
    }
}
```
- 普通消息
```
/**
 * 普通消息
 */
public class CommonMessage extends AbstractMessage {
    public CommonMessage(Messager messager) {
        super(messager);
    }

    /**
     * 普通的消息调用父类的消息发送消息即可
     * @param content 消息内容
     * @param toUser 接收者
     */
    @Override
    void sendMessage(String content, String toUser) {
        super.sendMessage(content, toUser);
    }
}
```
- 加急消息
```
/**
 * 加急消息
 * */
public class UrgengcyMessage  extends  AbstractMessage{
    public UrgengcyMessage(Messager messager) {
        super(messager);
    }

    /**
     * 加急的消息处理
     * @param content 消息内容
     * @param toUser 接收者
     */
    @Override
    void sendMessage(String content, String toUser) {
        content="<!加急>__"+content;
        super.sendMessage(content,toUser);

    }
    /**
     * 扩展的功能，可以自由实现
     * @param messageId 消息id
     * @return 消息的处理状态
     */
    public Object watch(String  messageId){
        return null;
    }
}
```
- 特急消息
```

/**
 * 特急消息
 */
public class SpecialUrgencyMessage  extends AbstractMessage{
    public SpecialUrgencyMessage(Messager messager) {
        super(messager);
    }


    /**
     * 特急的处理方式
     * @param content 消息内容
     * @param toUser 接收者
     */
    @Override
    void sendMessage(String content, String toUser) {
        content="<!!!!特急>__"+content;
        super.sendMessage(content,toUser);
    }
}
```
3. 测试不同形式发送不同级别消息
```
public class TestMessage {
    public static void main(String[] args) {

        Messager m = new MessageSMS(); //短信形式消息
        CommonMessage commonMessage = new CommonMessage(m); //短信形式 的 普通消息
        commonMessage.sendMessage("申请加薪", "老总");


        Messager m2 = new MessageEmail(); //邮件形式的消息
        UrgengcyMessage urgengcyMessage = new UrgengcyMessage(m2); // 邮件形式的 加急 消息
        urgengcyMessage.sendMessage("给我昨天的报表", "小李");


        SpecialUrgencyMessage specialUrgencyMessage = new SpecialUrgencyMessage(new MessageSMS());
        specialUrgencyMessage.sendMessage("马上来会议室","小陈");
    }
    
//短信  方式，发送《申请加薪》给 《老总》
//邮件  方式，发送《<!加急>__给我昨天的报表》给 《小李》
//短信  方式，发送《<!!!!特急>__马上来会议室》给 《小陈》
    
}
```