---
title: '[Design_Pattern]18_State状态模式'
category: 设计模式
tag: 设计模式
date: 2018-06-10 00:18:00
---

状态模式是 `行为模式` 的一种， 当一个类的`行为` 随着 `状态的改变而改变` 时，需要使用 状态模式。

## 举例说明

一个篮球运动员 ，场均得分 ： 正常状态可得 10, 疲惫状态可得 5，超常状态可得 15 , 伪代码如下

```
if(state=="normal"){
    getScore(10);
}else if(state=="exhausted"){
    getScore(5);
}else if(state=="better"){
    getScore()15;
}
```
如果此时运动员 `多了一种状态`： `病态`，只能得分 `2`， 那么目前能做的就是，增加 `if..else` 结构语句，显然这是不友好的做法。

## 如何解决

1. 将 `状态` 独立的抽象出来
2. 让`运动员` 持有一个 `状态属性`
3. 不同 `具体状态` 的内部实现 `具体的行为`
4. `具体行为` 中需要 `改变实体状态` 为 `当前状态`，并且实现其他操作
5. 结构图
![](/images/dp18_state_00.png)

## 上代码

- 运动员类
```
public class Athlete {

    //持有一个状态实例
    private State state;

    public Athlete() {
        state = null;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }
}

```
- 抽象的状态接口
```
/**
 * 抽象的状态接口
 */
public interface State {
    void getScore(Athlete athlete);
}
```
- 具体状态和具体的行为
```$xslt
/**
 * 正常状态
 */
public class NormalState implements State {
    
    //正常状态的行为
    @Override
    public void getScore(Athlete athlete) {
        athlete.setState(this);
        System.out.println(10);
    }

    @Override
    public String toString() {
        return "Normal";
    }
}

/**
 * 超常状态
 */
public class BetterState implements State {
    
    //超常状态的行为
    @Override
    public void getScore(Athlete athlete) {
        athlete.setState(this);
        System.out.println(15);
    }

    @Override
    public String toString() {
        return "Better";
    }
}


/**
 * 疲惫状态
 */
public class ExhaustedState  implements State{
    
    //疲惫状态的行为
    @Override
    public void getScore(Athlete athlete) {
        athlete.setState(this);
        System.out.println(5);
    }

    @Override
    public String toString() {
        return "ExhaustedState";
    }
}

```
- 测试类
```
public class Main {

    public static void main(String[] args) {



        Athlete athlete = new Athlete();


        NormalState normalState = new NormalState();
        BetterState betterState = new BetterState();

        State curState;//用于记录当前的状态

        normalState.getScore(athlete); //正常状态得分
        curState = athlete.getState();
        System.out.println("Current State: "+curState+"\n");


        betterState.getScore(athlete); //超常状态得分
        curState = athlete.getState();
        System.out.println("Current State: "+curState+"\n");

        ExhaustedState exhaustedState = new ExhaustedState();
        exhaustedState.getScore(athlete); //疲惫状态得分
        curState=athlete.getState(); 
        System.out.println("Current State: "+curState+"\n");
    }
}
/*运行结果

10
Current State: Normal

15
Current State: Better

5
Current State: ExhaustedState
*/

```

# 其他应用场景

当然除了在不同的状态有不同的行为之外，还可以用于切换状态，建立一套完整的工作流。如：
计算机开机，先启动，开始初始化，初始化完毕之后进入开机状态，这是一套完整的流程。

1. 启动状态, 完毕之后设置状态为 初始化状态 ( `setState(new InitState())`)
2. 初始化状态, 完毕之后设置状态为  开机状态 (`  setState(new StartedState())` )
3. 开机状态, 完毕之后设置状态为 待机状态 ( `setState(new SleepState)` )